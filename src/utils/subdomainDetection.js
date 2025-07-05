/**
 * Subdomain Detection Utility
 * Handles routing logic for different subdomains
 */

export const SubdomainDetection = {
  /**
   * Get the current subdomain
   * @returns {string|null} - The subdomain or null if none
   */
  getCurrentSubdomain: () => {
    const hostname = window.location.hostname;

    // Handle localhost development
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      // Check for subdomain in the URL hash or search params for development
      const searchParams = new URLSearchParams(window.location.search);
      const hashSubdomain = window.location.hash.includes("#choreo")
        ? "choreo"
        : null;
      return searchParams.get("subdomain") || hashSubdomain;
    }

    // Production domain handling
    const parts = hostname.split(".");

    // If we have subdomains (e.g., choreo.revolvo.tech)
    if (parts.length >= 3) {
      const subdomain = parts[0];

      // Known subdomains
      const validSubdomains = ["choreo", "admin", "api", "cdn"];

      if (validSubdomains.includes(subdomain)) {
        return subdomain;
      }
    }

    return null;
  },

  /**
   * Check if current request is for Choreo subdomain
   * @returns {boolean}
   */
  isChoreoSubdomain: () => {
    const subdomain = SubdomainDetection.getCurrentSubdomain();
    return subdomain === "choreo";
  },

  /**
   * Check if current request is for Admin subdomain
   * @returns {boolean}
   */
  isAdminSubdomain: () => {
    const subdomain = SubdomainDetection.getCurrentSubdomain();
    return subdomain === "admin";
  },

  /**
   * Get the appropriate app component based on subdomain
   * @returns {string} - App type: 'main', 'choreo', 'admin'
   */
  getAppType: () => {
    const subdomain = SubdomainDetection.getCurrentSubdomain();

    switch (subdomain) {
      case "choreo":
        return "choreo";
      case "admin":
        return "admin";
      default:
        return "main";
    }
  },

  /**
   * Generate URL for a specific subdomain
   * @param {string} subdomain - The subdomain to generate URL for
   * @param {string} path - The path to append
   * @returns {string} - Full URL
   */
  generateSubdomainUrl: (subdomain, path = "/") => {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;

    // Development mode - use query params
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
      return `${baseUrl}${path}?subdomain=${subdomain}`;
    }

    // Production mode - use actual subdomains
    const baseDomain = hostname.split(".").slice(-2).join(".");
    return `${protocol}//${subdomain}.${baseDomain}${path}`;
  },

  /**
   * Redirect to a specific subdomain
   * @param {string} subdomain - The subdomain to redirect to
   * @param {string} path - The path to redirect to
   */
  redirectToSubdomain: (subdomain, path = "/") => {
    const url = SubdomainDetection.generateSubdomainUrl(subdomain, path);
    window.location.href = url;
  },

  /**
   * Check if we're in development mode
   * @returns {boolean}
   */
  isDevelopment: () => {
    const hostname = window.location.hostname;
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      process.env.NODE_ENV === "development"
    );
  },

  /**
   * Get environment-specific configuration
   * @returns {Object} - Environment configuration
   */
  getEnvironmentConfig: () => {
    const isDev = SubdomainDetection.isDevelopment();
    const subdomain = SubdomainDetection.getCurrentSubdomain();

    return {
      isDevelopment: isDev,
      subdomain,
      appType: SubdomainDetection.getAppType(),
      hostname: window.location.hostname,
      baseUrl: isDev
        ? `${window.location.protocol}//${window.location.hostname}${
            window.location.port ? `:${window.location.port}` : ""
          }`
        : `${window.location.protocol}//${window.location.hostname}`,
    };
  },
};

export default SubdomainDetection;
