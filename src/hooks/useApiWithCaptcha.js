import { useState, useCallback, useRef } from "react";

const API_BASE_URL = "https://choreo.revolvo.tech";

/**
 * Custom hook for making API calls with automatic captcha integration
 * Handles error code 428 (Precondition Required) by triggering captcha verification
 */
export const useApiWithCaptcha = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const captchaTokenRef = useRef(null);
  const pendingRequestRef = useRef(null);

  // Clear any stored captcha token
  const clearCaptchaToken = useCallback(() => {
    captchaTokenRef.current = null;
    sessionStorage.removeItem("captcha_token");
    sessionStorage.removeItem("captcha_action");
    sessionStorage.removeItem("captcha_verified_at");
  }, []);

  // Get stored captcha token if it's still valid (within 5 minutes)
  const getStoredCaptchaToken = useCallback(() => {
    const token = sessionStorage.getItem("captcha_token");
    const verifiedAt = sessionStorage.getItem("captcha_verified_at");

    if (token && verifiedAt) {
      const timeDiff = Date.now() - parseInt(verifiedAt);
      const fiveMinutes = 5 * 60 * 1000;

      if (timeDiff < fiveMinutes) {
        return token;
      } else {
        // Token expired, clear it
        clearCaptchaToken();
      }
    }

    return null;
  }, [clearCaptchaToken]);

  // Open captcha verification window/page
  const openCaptchaVerification = useCallback(
    (action = "verify", reason = null) => {
      return new Promise((resolve, reject) => {
        const currentUrl = window.location.href;
        const params = new URLSearchParams({
          returnUrl: currentUrl,
          action: action,
        });

        if (reason) {
          params.set("reason", reason);
        }

        const captchaUrl = `${
          window.location.origin
        }/auth/captcha?${params.toString()}`;

        // Try to open in a popup first
        const popup = window.open(
          captchaUrl,
          "captcha-verification",
          "width=600,height=700,scrollbars=yes,resizable=yes,centerscreen=yes"
        );

        if (!popup) {
          // Popup blocked, redirect to captcha page
          window.location.href = captchaUrl;
          return;
        }

        // Listen for messages from the popup
        const handleMessage = (event) => {
          if (event.origin !== window.location.origin) {
            return;
          }

          if (event.data.type === "CAPTCHA_SUCCESS") {
            cleanup();
            captchaTokenRef.current = event.data.token;

            // Store token for future use
            sessionStorage.setItem("captcha_token", event.data.token);
            sessionStorage.setItem("captcha_action", event.data.action);
            sessionStorage.setItem(
              "captcha_verified_at",
              Date.now().toString()
            );

            resolve(event.data.token);
          } else if (event.data.type === "CAPTCHA_CANCELLED") {
            cleanup();
            reject(new Error("Captcha verification was cancelled"));
          }
        };

        // Check if popup is closed manually
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            cleanup();
            reject(new Error("Captcha verification was cancelled"));
          }
        }, 1000);

        const cleanup = () => {
          window.removeEventListener("message", handleMessage);
          clearInterval(checkClosed);
          if (!popup.closed) {
            popup.close();
          }
        };

        window.addEventListener("message", handleMessage);
      });
    },
    []
  );

  // Enhanced fetch function with captcha support
  const apiCall = useCallback(
    async (url, options = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        // Prepare request options
        const requestOptions = {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          credentials: "include",
          ...options,
        };

        // Add captcha token if available
        const storedToken = getStoredCaptchaToken() || captchaTokenRef.current;
        if (storedToken && options.body) {
          const bodyData =
            typeof options.body === "string"
              ? JSON.parse(options.body)
              : options.body;

          bodyData.captchaToken = storedToken;
          requestOptions.body = JSON.stringify(bodyData);
        }

        // Make the API call
        const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
        const response = await fetch(fullUrl, requestOptions);

        // Handle different response statuses
        if (response.status === 428) {
          // Captcha required - trigger verification
          console.log("Captcha required (428), triggering verification...");

          const responseData = await response.json().catch(() => ({}));
          const reason =
            responseData.message || "Additional security verification required";
          const action = responseData.action || "verify";

          // Clear any existing token since it wasn't sufficient
          clearCaptchaToken();

          // Open captcha verification
          const captchaToken = await openCaptchaVerification(action, reason);

          // Retry the original request with the new captcha token
          const retryBodyData =
            typeof options.body === "string"
              ? JSON.parse(options.body)
              : options.body || {};

          retryBodyData.captchaToken = captchaToken;

          const retryOptions = {
            ...requestOptions,
            body: JSON.stringify(retryBodyData),
          };

          const retryResponse = await fetch(fullUrl, retryOptions);

          if (!retryResponse.ok) {
            const retryErrorData = await retryResponse.json().catch(() => ({}));
            throw new Error(
              retryErrorData.message ||
                `Request failed: ${retryResponse.status}`
            );
          }

          const retryData = await retryResponse.json();
          setIsLoading(false);
          return retryData;
        } else if (!response.ok) {
          // Other errors
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Request failed: ${response.status}`
          );
        }

        // Success
        const data = await response.json();
        setIsLoading(false);
        return data;
      } catch (err) {
        console.error("API call error:", err);
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    [getStoredCaptchaToken, clearCaptchaToken, openCaptchaVerification]
  );

  // Convenience methods for common HTTP verbs
  const get = useCallback(
    (url, options = {}) => {
      return apiCall(url, { ...options, method: "GET" });
    },
    [apiCall]
  );

  const post = useCallback(
    (url, data, options = {}) => {
      return apiCall(url, {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    [apiCall]
  );

  const put = useCallback(
    (url, data, options = {}) => {
      return apiCall(url, {
        ...options,
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    [apiCall]
  );

  const del = useCallback(
    (url, options = {}) => {
      return apiCall(url, { ...options, method: "DELETE" });
    },
    [apiCall]
  );

  return {
    isLoading,
    error,
    clearError: () => setError(null),
    clearCaptchaToken,
    apiCall,
    get,
    post,
    put,
    delete: del,
  };
};

/**
 * Higher-order function to wrap existing API functions with captcha support
 * Usage: const secureApiCall = withCaptcha(originalApiCall);
 */
export const withCaptcha = (apiFunction) => {
  return async (...args) => {
    try {
      return await apiFunction(...args);
    } catch (error) {
      // Check if it's a 428 error that requires captcha
      if (error.status === 428 || error.message?.includes("428")) {
        const { openCaptchaVerification } = useApiWithCaptcha();

        // Trigger captcha verification
        const captchaToken = await openCaptchaVerification();

        // Retry the original function with captcha token
        // This assumes the API function accepts a captcha token parameter
        return await apiFunction(...args, { captchaToken });
      }

      throw error;
    }
  };
};

export default useApiWithCaptcha;
