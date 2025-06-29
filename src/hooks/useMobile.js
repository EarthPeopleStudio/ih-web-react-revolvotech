import { useState, useEffect } from 'react';

export const useMobile = () => {
  // Initialize with immediate check to prevent flash
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const mobile = width <= 768;
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return mobile || (touchDevice && width <= 1024);
    }
    return false;
  });

  const [screenWidth, setScreenWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      
      // Mobile breakpoint at 768px
      const mobile = width <= 768;
      
      // Also check for touch devices
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(mobile || (touchDevice && width <= 1024));
    };

    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, screenWidth };
}; 