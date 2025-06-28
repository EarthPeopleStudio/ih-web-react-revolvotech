import React, { createContext, useContext, useState } from 'react';

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

// Motion presets for consistent animations
export const motionPresets = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  
  // Reveal animations
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  
  // Stagger animations
  staggerContainer: {
    animate: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  },
  
  // Hover effects
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  
  // Button animations
  buttonHover: {
    scale: 1.02,
    y: -3,
    filter: 'brightness(1.1)',
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

export const AnimationProvider = ({ children }) => {
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  const [isAnimating, setIsAnimating] = useState(false);

  const value = {
    currentAnimation,
    setCurrentAnimation,
    isAnimating,
    setIsAnimating,
    motionPresets
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}; 