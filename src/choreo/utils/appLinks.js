/**
 * App Link Handler for Choreo
 * Handles deep linking to mobile app with web fallback
 */

// Configuration
const APP_CONFIG = {
  // App Package Names
  androidPackage: "tech.revolvo.choreo",
  iosAppId: "YOUR_APP_STORE_ID", // Replace with actual App Store ID

  // Custom URL Schemes
  customScheme: "choreo",

  // Universal Link Domain (for iOS)
  universalLinkDomain: "choreo.revolvo.tech",

  // App Store URLs
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=tech.revolvo.choreo",
  appStoreUrl: "https://apps.apple.com/app/choreo/id123456789", // Replace with actual App Store URL

  // Fallback timeout (how long to wait before showing fallback)
  fallbackTimeout: 3000,
};

// Device detection
const DeviceDetection = {
  isAndroid: () => /Android/i.test(navigator.userAgent),
  isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
  isMobile: () => DeviceDetection.isAndroid() || DeviceDetection.isIOS(),
  isInAppBrowser: () => {
    const ua = navigator.userAgent;
    return /FBAN|FBAV|Twitter|Instagram|Line|WhatsApp|Telegram/i.test(ua);
  },
  supportsCustomSchemes: () => {
    // Custom schemes work on most mobile browsers except some in-app browsers
    return DeviceDetection.isMobile() && !DeviceDetection.isInAppBrowser();
  },
};

// App Link Generator
const AppLinkGenerator = {
  /**
   * Generate deep link URL for the app
   * @param {Object} params - Parameters for the deep link
   * @returns {string} - Generated deep link URL
   */
  generateDeepLink: (params = {}) => {
    const { action, token, email, type, ...otherParams } = params;

    let path = "";
    const queryParams = new URLSearchParams();

    // Build path based on action
    switch (action) {
      case "verify":
        path = "/verify";
        if (token) queryParams.append("token", token);
        if (email) queryParams.append("email", email);
        if (type) queryParams.append("type", type);
        break;

      case "reset":
        path = "/reset";
        if (token) queryParams.append("token", token);
        if (email) queryParams.append("email", email);
        break;

      case "auth":
        path = "/auth";
        break;

      case "market":
        path = "/market";
        break;

      case "onboarding":
        path = "/onboarding";
        break;

      default:
        path = "/";
    }

    // Add any additional params
    Object.entries(otherParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const fullPath = `${path}${queryString ? `?${queryString}` : ""}`;

    return `${APP_CONFIG.customScheme}://${fullPath}`;
  },

  /**
   * Generate Universal Link (iOS) or Intent URL (Android)
   * @param {Object} params - Parameters for the link
   * @returns {string} - Generated universal/intent link
   */
  generateUniversalLink: (params = {}) => {
    const deepLink = AppLinkGenerator.generateDeepLink(params);

    if (DeviceDetection.isAndroid()) {
      // Android Intent URL
      const intentUrl = new URL("intent://verify");
      intentUrl.protocol = "intent:";
      intentUrl.searchParams.append(
        "S.browser_fallback_url",
        window.location.href
      );
      intentUrl.hash = `Intent;scheme=${APP_CONFIG.customScheme};package=${APP_CONFIG.androidPackage};end`;

      return intentUrl.toString();
    } else if (DeviceDetection.isIOS()) {
      // iOS Universal Link (fallback to custom scheme)
      const universalUrl = `https://${
        APP_CONFIG.universalLinkDomain
      }${deepLink.replace(`${APP_CONFIG.customScheme}://`, "/")}`;
      return universalUrl;
    }

    return deepLink;
  },
};

// App Link Handler
export const AppLinkHandler = {
  /**
   * Attempt to open the mobile app
   * @param {Object} params - Parameters for the deep link
   * @returns {Promise<boolean>} - Whether the app was likely opened
   */
  openApp: async (params = {}) => {
    return new Promise((resolve) => {
      // Don't attempt on desktop
      if (!DeviceDetection.isMobile()) {
        console.log("Desktop detected, not attempting app link");
        resolve(false);
        return;
      }

      const deepLink = AppLinkGenerator.generateDeepLink(params);
      const universalLink = AppLinkGenerator.generateUniversalLink(params);

      console.log("Attempting to open app with:", { deepLink, universalLink });

      let appOpened = false;
      let timeoutId;

      // Track if page becomes hidden (likely means app opened)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          appOpened = true;
          clearTimeout(timeoutId);
          resolve(true);
        }
      };

      // Track if page loses focus (another indicator app opened)
      const handleBlur = () => {
        appOpened = true;
        clearTimeout(timeoutId);
        resolve(true);
      };

      // Set up event listeners
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleBlur);

      // Cleanup function
      const cleanup = () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        window.removeEventListener("blur", handleBlur);
      };

      // Set timeout to determine if app opened
      timeoutId = setTimeout(() => {
        cleanup();
        if (!appOpened) {
          console.log("App did not open within timeout");
          resolve(false);
        }
      }, APP_CONFIG.fallbackTimeout);

      // Attempt to open the app
      try {
        if (DeviceDetection.isIOS()) {
          // iOS: Try universal link first, then custom scheme
          AppLinkHandler.tryOpenURL(universalLink).then((success) => {
            if (!success && !appOpened) {
              AppLinkHandler.tryOpenURL(deepLink);
            }
          });
        } else if (DeviceDetection.isAndroid()) {
          // Android: Try custom scheme or intent
          if (DeviceDetection.supportsCustomSchemes()) {
            AppLinkHandler.tryOpenURL(deepLink);
          } else {
            // For browsers that don't support custom schemes well
            AppLinkHandler.tryOpenURL(universalLink);
          }
        } else {
          // Fallback for other mobile browsers
          AppLinkHandler.tryOpenURL(deepLink);
        }
      } catch (error) {
        console.error("Error attempting to open app:", error);
        cleanup();
        resolve(false);
      }
    });
  },

  /**
   * Try to open a URL (for app links)
   * @param {string} url - URL to open
   * @returns {Promise<boolean>} - Whether the URL was successfully opened
   */
  tryOpenURL: (url) => {
    return new Promise((resolve) => {
      try {
        // Method 1: Try using window.location
        const currentLocation = window.location.href;
        window.location.href = url;

        // If we're still here after a brief moment, the app probably didn't open
        setTimeout(() => {
          if (window.location.href === currentLocation) {
            resolve(false);
          } else {
            resolve(true);
          }
        }, 100);
      } catch (error) {
        console.error("Error opening URL:", error);
        resolve(false);
      }
    });
  },

  /**
   * Show app store for download
   * @param {string} platform - 'ios' or 'android' or 'auto'
   */
  showAppStore: (platform = "auto") => {
    let storeUrl;

    if (platform === "auto") {
      platform = DeviceDetection.isIOS() ? "ios" : "android";
    }

    switch (platform) {
      case "ios":
        storeUrl = APP_CONFIG.appStoreUrl;
        break;
      case "android":
        storeUrl = APP_CONFIG.playStoreUrl;
        break;
      default:
        console.warn("Unknown platform for app store");
        return;
    }

    window.open(storeUrl, "_blank");
  },

  /**
   * Generate smart banner meta tags for app promotion
   * @param {Object} params - Parameters for the smart banner
   * @returns {Object} - Meta tags for smart banner
   */
  generateSmartBannerTags: (params = {}) => {
    const deepLink = AppLinkGenerator.generateDeepLink(params);

    return {
      // iOS Smart App Banner
      "apple-itunes-app": `app-id=${APP_CONFIG.iosAppId}, app-argument=${deepLink}`,

      // Google Play Smart Banner
      "google-play-app": `app-id=${APP_CONFIG.androidPackage}`,

      // App Link Meta Tags
      "al:android:url": deepLink,
      "al:android:package": APP_CONFIG.androidPackage,
      "al:android:app_name": "Choreo",

      "al:ios:url": deepLink,
      "al:ios:app_store_id": APP_CONFIG.iosAppId,
      "al:ios:app_name": "Choreo",

      // Twitter App Card
      "twitter:card": "app",
      "twitter:app:name:iphone": "Choreo",
      "twitter:app:id:iphone": APP_CONFIG.iosAppId,
      "twitter:app:url:iphone": deepLink,
      "twitter:app:name:googleplay": "Choreo",
      "twitter:app:id:googleplay": APP_CONFIG.androidPackage,
      "twitter:app:url:googleplay": deepLink,
    };
  },
};

// Export utilities
export { DeviceDetection, AppLinkGenerator, APP_CONFIG };

// Default export
export default AppLinkHandler;
