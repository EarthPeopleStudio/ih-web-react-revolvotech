import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [loadingSubtext, setLoadingSubtext] = useState("Please wait...");
  const [loadingKey, setLoadingKey] = useState(0);
  
  // Keep track of active timeout to clear it when needed
  const timeoutRef = React.useRef(null);

  const showLoading = (message = "Loading...", subtext = "Please wait...") => {
    // Clear any existing timeout to prevent conflicts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setLoadingMessage(message);
    setLoadingSubtext(subtext);
    setLoadingKey(prev => prev + 1); // Force skeleton to re-render
    setGlobalLoading(true);
  };

  const hideLoading = () => {
    // Clear timeout when manually hiding
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setGlobalLoading(false);
  };

  const triggerLoading = (message, subtext, duration = 1000) => {
    showLoading(message, subtext);
    
    if (duration > 0) {
      // Clear any existing timeout first
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        hideLoading();
        timeoutRef.current = null;
      }, duration);
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value = {
    isLoading: globalLoading,
    loadingMessage,
    loadingSubtext,
    loadingKey, // Add key for forcing re-renders
    showLoading,
    hideLoading,
    triggerLoading,
    setLoadingMessage,
    setLoadingSubtext
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext; 