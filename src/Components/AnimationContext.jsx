import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const DEFAULT_ANIMATION = 'Grin';
const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [currentAnimation, setCurrentAnimation] = useState(DEFAULT_ANIMATION);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationTimeoutRef = useRef(null);
  const pendingAnimationRef = useRef(null);

  // Debounced animation setter to prevent rapid switching
  const setAnimationWithDelay = (animationName) => {
    // If we're currently transitioning, store the pending animation
    if (isTransitioning) {
      pendingAnimationRef.current = animationName;
      return;
    }

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // If trying to set the same animation, ignore
    if (animationName === currentAnimation) {
      return;
    }

    // Set transitioning state
    setIsTransitioning(true);

    // For ping-pong animations, add a delay to let current cycle complete
    const delay = currentAnimation !== DEFAULT_ANIMATION ? 800 : 200;
    
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentAnimation(animationName);
      
      // Reset transitioning state after animation has time to start
      setTimeout(() => {
        setIsTransitioning(false);
        
        // If there's a pending animation, apply it
        if (pendingAnimationRef.current && pendingAnimationRef.current !== animationName) {
          const nextAnimation = pendingAnimationRef.current;
          pendingAnimationRef.current = null;
          setAnimationWithDelay(nextAnimation);
        } else {
          pendingAnimationRef.current = null;
        }
      }, 300);
    }, delay);
  };

  // Smart animation setter that considers current state
  const setSmartAnimation = (animationName) => {
    // If it's the default animation, apply immediately (no ping-pong needed)
    if (animationName === DEFAULT_ANIMATION) {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      pendingAnimationRef.current = null;
      setIsTransitioning(false);
      setCurrentAnimation(animationName);
      return;
    }

    // For other animations, use the debounced setter
    setAnimationWithDelay(animationName);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AnimationContext.Provider value={{ 
      currentAnimation, 
      setCurrentAnimation: setSmartAnimation,
      isTransitioning,
      DEFAULT_ANIMATION 
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}; 