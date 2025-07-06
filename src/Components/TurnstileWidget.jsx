import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TurnstileContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${(props) => (props.show ? "65px" : "0")};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.show ? 1 : 0)};
  overflow: hidden;
`;

const ErrorMessage = styled.div`
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(74, 144, 226, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color, #4a90e2);
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const RetryButton = styled.button`
  background: transparent;
  border: 1px solid var(--primary-color, #4a90e2);
  color: var(--primary-color, #4a90e2);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: var(--primary-color, #4a90e2);
    color: white;
  }
`;

const TurnstileWidget = ({
  onSuccess,
  onError,
  onExpire,
  show = false,
  theme = "auto",
  size = "normal",
  resetTrigger = null,
}) => {
  const turnstileRef = useRef(null);
  const widgetId = useRef(null);
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // API configuration
  const API_BASE_URL = "https://choreo.revolvo.tech";
  const CONFIG_ENDPOINT = `${API_BASE_URL}/api/v1/captcha/widget-config`;
  const TURNSTILE_SCRIPT_URL =
    "https://challenges.cloudflare.com/turnstile/v0/api.js";

  // Fetch widget configuration
  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(CONFIG_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch captcha config: ${response.status}`);
      }

      const data = await response.json();

      if (!data.siteKey) {
        throw new Error("No site key received from configuration");
      }

      setConfig(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching Turnstile config:", err);
      setError(`Configuration error: ${err.message}`);
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  // Load Turnstile script
  const loadTurnstileScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.turnstile) {
        setScriptLoaded(true);
        resolve(window.turnstile);
        return;
      }

      // Check if script element already exists
      const existingScript = document.querySelector(
        `script[src="${TURNSTILE_SCRIPT_URL}"]`
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          setScriptLoaded(true);
          resolve(window.turnstile);
        });
        existingScript.addEventListener("error", reject);
        return;
      }

      // Create and load script
      const script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setScriptLoaded(true);
        resolve(window.turnstile);
      };

      script.onerror = () => {
        reject(new Error("Failed to load Turnstile script"));
      };

      document.head.appendChild(script);
    });
  }, []);

  // Render Turnstile widget
  const renderWidget = useCallback(() => {
    if (!window.turnstile || !config || !turnstileRef.current) {
      return;
    }

    try {
      // Remove existing widget if present
      if (widgetId.current !== null) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch (e) {
          console.warn("Failed to remove existing Turnstile widget:", e);
        }
        widgetId.current = null;
      }

      // Clear the container
      turnstileRef.current.innerHTML = "";

      // Render new widget
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: config.siteKey,
        theme: theme,
        size: size,
        callback: (token) => {
          console.log("Turnstile success:", { tokenLength: token?.length });
          setError(null);
          onSuccess?.(token);
        },
        "error-callback": (errorCode) => {
          console.error("Turnstile error:", errorCode);
          const errorMessage = getTurnstileErrorMessage(errorCode);
          setError(errorMessage);
          onError?.(errorMessage);
        },
        "expired-callback": () => {
          console.log("Turnstile expired");
          setError("Captcha expired. Please try again.");
          onExpire?.();
        },
        "timeout-callback": () => {
          console.log("Turnstile timeout");
          setError("Captcha timed out. Please try again.");
          onError?.("Captcha timed out");
        },
      });

      setError(null);
    } catch (err) {
      console.error("Error rendering Turnstile widget:", err);
      setError(`Widget error: ${err.message}`);
      onError?.(err.message);
    }
  }, [config, theme, size, onSuccess, onError, onExpire]);

  // Get user-friendly error messages
  const getTurnstileErrorMessage = (errorCode) => {
    const errorMessages = {
      "network-error":
        "Network error. Please check your connection and try again.",
      "parse-error": "Invalid response. Please refresh and try again.",
      "internal-error": "Internal error. Please try again later.",
      "invalid-input-secret": "Configuration error. Please contact support.",
      "missing-input-secret": "Configuration error. Please contact support.",
      "invalid-input-response": "Invalid captcha response. Please try again.",
      "missing-input-response": "Please complete the captcha verification.",
    };

    return errorMessages[errorCode] || `Captcha error: ${errorCode}`;
  };

  // Reset widget
  const resetWidget = useCallback(() => {
    if (window.turnstile && widgetId.current !== null) {
      try {
        window.turnstile.reset(widgetId.current);
        setError(null);
      } catch (err) {
        console.error("Error resetting Turnstile widget:", err);
        // If reset fails, try to re-render
        renderWidget();
      }
    }
  }, [renderWidget]);

  // Retry logic
  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
      setError(null);

      if (config && scriptLoaded) {
        renderWidget();
      } else {
        fetchConfig();
      }
    } else {
      setError("Maximum retry attempts reached. Please refresh the page.");
    }
  }, [retryCount, config, scriptLoaded, renderWidget, fetchConfig]);

  // Initialize component
  useEffect(() => {
    if (show) {
      fetchConfig();
    }
  }, [show, fetchConfig]);

  // Load script when config is available
  useEffect(() => {
    if (config && !scriptLoaded && !loading) {
      loadTurnstileScript().catch((err) => {
        console.error("Script loading error:", err);
        setError("Failed to load captcha. Please refresh and try again.");
        onError?.(err.message);
      });
    }
  }, [config, scriptLoaded, loading, loadTurnstileScript, onError]);

  // Render widget when both script and config are ready
  useEffect(() => {
    if (config && scriptLoaded && show) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(renderWidget, 100);
      return () => clearTimeout(timer);
    }
  }, [config, scriptLoaded, show, renderWidget]);

  // Handle reset trigger
  useEffect(() => {
    if (resetTrigger && show) {
      resetWidget();
    }
  }, [resetTrigger, show, resetWidget]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.turnstile && widgetId.current !== null) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch (e) {
          console.warn("Failed to cleanup Turnstile widget:", e);
        }
      }
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <TurnstileContainer show={show}>
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LoadingSpinner />
          <span
            style={{ fontSize: "0.9rem", color: "var(--text-secondary, #666)" }}
          >
            Loading security check...
          </span>
        </div>
      )}

      {error && (
        <div style={{ textAlign: "center" }}>
          <ErrorMessage>{error}</ErrorMessage>
          {retryCount < 3 && (
            <RetryButton onClick={handleRetry}>
              Retry ({3 - retryCount} attempts left)
            </RetryButton>
          )}
        </div>
      )}

      {!loading && !error && (
        <div
          ref={turnstileRef}
          style={{ display: "flex", justifyContent: "center" }}
        />
      )}
    </TurnstileContainer>
  );
};

TurnstileWidget.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onExpire: PropTypes.func,
  show: PropTypes.bool,
  theme: PropTypes.oneOf(["light", "dark", "auto"]),
  size: PropTypes.oneOf(["normal", "compact"]),
  resetTrigger: PropTypes.any,
};

export default TurnstileWidget;
