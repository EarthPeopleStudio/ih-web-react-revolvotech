import { useState, useEffect, useCallback } from "react";

// Debounce hook for performance optimization
const useDebounce = (func, delay) => {
  return useCallback(
    (...args) => {
      const timeoutId = setTimeout(() => func(...args), delay);
      return () => clearTimeout(timeoutId);
    },
    [func, delay]
  );
};

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Debounced resize handler
  const debouncedCheckMobile = useDebounce(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
  }, 100); // 100ms debounce

  useEffect(() => {
    // Initial check
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();

    // Add passive event listener for better performance
    window.addEventListener("resize", debouncedCheckMobile, { passive: true });

    return () => {
      window.removeEventListener("resize", debouncedCheckMobile);
    };
  }, [debouncedCheckMobile]);

  return { isMobile };
};
