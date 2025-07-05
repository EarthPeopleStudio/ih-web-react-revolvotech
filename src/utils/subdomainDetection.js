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
    const origin = window.location.origin;

    // Handle localhost development
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      // Check for subdomain in the URL hash or search params for development
      const searchParams = new URLSearchParams(window.location.search);
      const hashSubdomain = window.location.hash.includes("#choreo")
        ? "choreo"
        : null;

      // Also check for path-based routing in dev (e.g., localhost:3000/choreo)
      const pathSubdomain = window.location.pathname.startsWith("/choreo")
        ? "choreo"
        : window.location.pathname.startsWith("/admin")
        ? "admin"
        : null;

      return searchParams.get("subdomain") || hashSubdomain || pathSubdomain;
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

    // Check if this is a Netlify preview or branch deploy with subdomain in origin
    if (origin.includes("choreo") || hostname.includes("choreo")) {
      return "choreo";
    }

    if (origin.includes("admin") || hostname.includes("admin")) {
      return "admin";
    }

    return null;
  },

  /**
   * Check if current request is for Choreo subdomain
   * @returns {boolean}
   */
  isChoreoSubdomain: () => {
    const subdomain = SubdomainDetection.getCurrentSubdomain();
    const isChoreoDomain = window.location.hostname === "choreo.revolvo.tech";
    const isChoreoPath = window.location.pathname.startsWith("/choreo");
    const hasChoreoParam =
      new URLSearchParams(window.location.search).get("subdomain") === "choreo";

    return (
      subdomain === "choreo" || isChoreoDomain || isChoreoPath || hasChoreoParam
    );
  },

  /**
   * Check if current request is for Admin subdomain
   * @returns {boolean}
   */
  isAdminSubdomain: () => {
    const subdomain = SubdomainDetection.getCurrentSubdomain();
    const isAdminDomain = window.location.hostname === "admin.revolvo.tech";
    const isAdminPath = window.location.pathname.startsWith("/admin");
    const hasAdminParam =
      new URLSearchParams(window.location.search).get("subdomain") === "admin";

    return (
      subdomain === "admin" || isAdminDomain || isAdminPath || hasAdminParam
    );
  },

  /**
   * Get the appropriate app component based on subdomain
   * @returns {string} - App type: 'main', 'choreo', 'admin'
   */
  getAppType: () => {
    if (SubdomainDetection.isChoreoSubdomain()) {
      return "choreo";
    }

    if (SubdomainDetection.isAdminSubdomain()) {
      return "admin";
    }

    return "main";
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

    // Development mode - use query params or path prefixes
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
      // Try path-based routing first, fallback to query params
      return `${baseUrl}/${subdomain}${path !== "/" ? path : ""}`;
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
      hostname.includes("gitpod.io") ||
      hostname.includes("stackblitz.com") ||
      hostname.includes("codesandbox.io") ||
      process.env.NODE_ENV === "development" ||
      import.meta.env.DEV
    );
  },

  /**
   * Get environment-specific configuration
   * @returns {Object} - Environment configuration
   */
  getEnvironmentConfig: () => {
    const isDev = SubdomainDetection.isDevelopment();
    const subdomain = SubdomainDetection.getCurrentSubdomain();
    const appType = SubdomainDetection.getAppType();

    return {
      isDevelopment: isDev,
      subdomain,
      appType,
      hostname: window.location.hostname,
      origin: window.location.origin,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      isChoreoSubdomain: SubdomainDetection.isChoreoSubdomain(),
      isAdminSubdomain: SubdomainDetection.isAdminSubdomain(),
      baseUrl: isDev
        ? `${window.location.protocol}//${window.location.hostname}${
            window.location.port ? `:${window.location.port}` : ""
          }`
        : `${window.location.protocol}//${window.location.hostname}`,
    };
  },
};

export default SubdomainDetection;
