import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageLoading = (customDuration = 800) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading Page");
  const [loadingSubtext, setLoadingSubtext] = useState("Initializing components...");

  const getLoadingMessage = (pathname) => {
    switch(pathname) {
      case '/':
        return { message: "Loading Home", subtext: "Initializing 3D experience..." };
      case '/about-us':
        return { message: "Loading About Us", subtext: "Preparing team information..." };
      case '/our-work':
        return { message: "Loading Our Work", subtext: "Showcasing our projects..." };
      case '/tech-showcase':
        return { message: "Loading Tech Showcase", subtext: "Setting up interactive demos..." };
      case '/pricing':
        return { message: "Loading Pricing", subtext: "Calculating your perfect plan..." };
      case '/contact-us':
        return { message: "Loading Contact", subtext: "Preparing contact form..." };
      case '/blog':
        return { message: "Loading Blog", subtext: "Fetching latest articles..." };
      case '/projects':
        return { message: "Loading Projects", subtext: "Displaying our portfolio..." };
      case '/careers':
        return { message: "Loading Careers", subtext: "Finding opportunities..." };
      case '/testimonials':
        return { message: "Loading Testimonials", subtext: "Loading client reviews..." };
      case '/privacy-policy':
        return { message: "Loading Privacy Policy", subtext: "Preparing legal document..." };
      case '/terms-of-service':
        return { message: "Loading Terms of Service", subtext: "Loading service terms..." };
      case '/cookie-policy':
        return { message: "Loading Cookie Policy", subtext: "Preparing cookie information..." };
      default:
        if (pathname.startsWith('/blog/')) {
          return { message: "Loading Article", subtext: "Preparing blog post..." };
        } else if (pathname.startsWith('/projects/')) {
          return { message: "Loading Project", subtext: "Showcasing project details..." };
        }
        return { message: "Loading Page", subtext: "Initializing components..." };
    }
  };

  const startLoading = (pathname = location.pathname) => {
    const { message, subtext } = getLoadingMessage(pathname);
    setLoadingMessage(message);
    setLoadingSubtext(subtext);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  // Manual loading control
  const triggerLoading = (message, subtext, duration = customDuration) => {
    setLoadingMessage(message);
    setLoadingSubtext(subtext);
    setIsLoading(true);
    
    if (duration > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, duration);
    }
  };

  return {
    isLoading,
    loadingMessage,
    loadingSubtext,
    startLoading,
    stopLoading,
    triggerLoading,
    setLoadingMessage,
    setLoadingSubtext
  };
};

export default usePageLoading; 