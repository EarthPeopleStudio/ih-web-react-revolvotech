import React, { createContext, useState, useContext } from 'react';

const DEFAULT_ANIMATION = 'Grin';
const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [currentAnimation, setCurrentAnimation] = useState(DEFAULT_ANIMATION);

  return (
    <AnimationContext.Provider value={{ currentAnimation, setCurrentAnimation, DEFAULT_ANIMATION }}>
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