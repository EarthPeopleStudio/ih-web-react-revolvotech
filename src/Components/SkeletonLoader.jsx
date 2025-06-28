import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../assets/logo.svg';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const arrowFlick = keyframes`
  0% { transform: translateX(0); }
  30% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;



const progressBarAnimation = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const progressPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 10px rgba(251, 182, 4, 0.8), 0 0 20px rgba(251, 182, 4, 0.4); 
  }
  50% { 
    box-shadow: 0 0 25px rgba(251, 182, 4, 1), 0 0 40px rgba(251, 182, 4, 0.8), 0 0 60px rgba(251, 182, 4, 0.4); 
  }
`;

const electricSpark = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
`;

// Transparent overlay for page transitions
const PageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: transparent;
  z-index: 9998;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease;
  pointer-events: none;
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  animation: ${arrowFlick} 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(251, 182, 4, 0.5));
`;

const ProgressContainer = styled.div`
  width: 100px;
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, 
    #fbb604 0%, 
    #f1df36 25%, 
    #ffeb3b 50%, 
    #f1df36 75%, 
    #fbb604 100%
  );
  background-size: 400% 100%;
  border-radius: 20px;
  width: ${props => props.progress}%;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
  animation: ${progressPulse} 1.5s ease-in-out infinite;
  filter: brightness(1.2) saturate(1.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      #fbb604, 
      #f1df36, 
      #ffeb3b, 
      #f1df36, 
      #fbb604
    );
    background-size: 400% 100%;
    animation: shimmer 1.5s linear infinite;
    border-radius: 20px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 6px;
    height: 12px;
    background: radial-gradient(circle, #ffeb3b, #fbb604);
    border-radius: 50%;
    animation: ${electricSpark} 0.8s ease-in-out infinite;
    filter: brightness(1.5);
  }
`;

const SkeletonLoader = ({ showOverlay = false, progress }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Apply scrollbar immediately on render (synchronous)
  if (typeof document !== 'undefined') {
    document.body.style.overflowY = 'scroll';
  }

  // Keep scrollbar visible to maintain layout consistency (synchronous to prevent shift)
  useLayoutEffect(() => {
    // Force scrollbar to remain visible immediately before paint
    document.body.style.overflowY = 'scroll';

    // Cleanup function
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  // Reset progress and manage intervals properly
  useEffect(() => {
    // Always reset progress when component mounts or progress prop changes
    setLoadingProgress(0);
    
    let interval = null;
    
    if (progress !== undefined) {
      setLoadingProgress(progress);
    } else {
      // Auto-simulation with proper cleanup
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          const increment = Math.random() * 8 + 5; // 5-13% increments
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            if (interval) {
              clearInterval(interval);
              interval = null;
            }
            return 100;
          }
          return newProgress;
        });
      }, 50);
    }

    // Cleanup function that ensures interval is always cleared
    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [progress]); // Re-run when progress prop changes

  // Additional cleanup on unmount to prevent stuck states
  useEffect(() => {
    return () => {
      setLoadingProgress(0);
    };
  }, []);

  return (
    <>
      {showOverlay && <PageOverlay show={showOverlay} />}
      <LoaderContainer>
        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
        
        <ProgressContainer>
          <ProgressBar progress={loadingProgress} />
        </ProgressContainer>
      </LoaderContainer>
    </>
  );
};

export default SkeletonLoader; 