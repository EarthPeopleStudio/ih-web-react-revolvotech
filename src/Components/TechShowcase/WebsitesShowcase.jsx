import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from 'framer-motion';

// Styled components
const CodeShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;
`;

const CodeShowcaseItem = styled.div`
  background: #121212;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 84, 112, 0.3);
  }
`;

const CodeShowcaseHeader = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, rgba(18, 18, 18, 0.9), rgba(30, 30, 30, 0.9));
`;

const CodeShowcaseTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  font-weight: 600;
  
  svg {
    margin-right: 10px;
    color: #ff5470;
  }
`;

const CodeShowcaseDescription = styled.p`
  padding: 16px 28px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin: 0;
`;

const CodeDemoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 28px 28px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CodeSnippetContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CodeHeader = styled.div`
  background: #252525;
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #e0e0e0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const CodeFileName = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const CodeLanguage = styled.span`
  background: rgba(255, 84, 112, 0.2);
  padding: 3px 10px;
  border-radius: 4px;
  color: #ff5470;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PreBlock = styled.pre`
  margin: 0;
  padding: 18px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  max-height: 350px;
  color: #ffffff;
  background: #1a1a1a;
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  
  /* Set all code to white */
  .keyword, .string, .comment, .function, .variable, .operator, .number {
    color: #ffffff;
  }
  
  /* Add font smoothing for better readability */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const DemoContainer = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, #ff5470, #ff8a5b);
    z-index: 2;
  }
`;

// Custom Rainbow code component with no syntax highlighting
const RainbowCode = ({ code, language }) => {
  // Prevent copy functionality
  const handleCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const nonCopyableStyles = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitTouchCallout: 'none',
    pointerEvents: 'auto',
    color: '#ffffff',
    width: '100%',
    height: '100%',
    fontFamily: "'Fira Code', monospace",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  };

  return (
    <PreBlock>
      <code 
        className={`language-${language}`} 
        style={nonCopyableStyles}
        onCopy={handleCopy}
        onCut={handleCopy}
        onContextMenu={handleContextMenu}
        data-nocopy="true"
      >
        {code}
      </code>
    </PreBlock>
  );
};

// Responsive Portfolio Demo Component
const ResponsivePortfolioDemo = () => {
  const [activeSection, setActiveSection] = useState('work');
  const [viewMode, setViewMode] = useState('desktop');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [animatedHeader, setAnimatedHeader] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [shapesVisible, setShapesVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [autoDemo, setAutoDemo] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const autoResumeTimeoutRef = useRef(null);

  // References for animations
  const shapesRef = useRef(null);
  const containerRef = useRef(null);
  
  // Optimize loading sequence
  useEffect(() => {
    // Preload all states immediately to avoid cascading timeouts
    setInitialized(true); // Initialize immediately
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setLoadingComplete(true);
      
      // Stagger shape animations with reduced delay
      setTimeout(() => {
        setShapesVisible(true);
      }, 150); // Reduced from 400ms
    });
    
    return () => {
      // Clean up any potential memory leaks
      if (autoResumeTimeoutRef.current) {
        clearTimeout(autoResumeTimeoutRef.current);
      }
    };
  }, []); // Only run on mount
  
  // Resume auto demo after period of inactivity
  useEffect(() => {
    if (autoDemo) return; // Skip if already in auto mode
    
    // Clear any existing auto-resume timeout
    if (autoResumeTimeoutRef.current) {
      clearTimeout(autoResumeTimeoutRef.current);
    }
    
    // Set a new timeout to resume auto demo after inactivity (10 seconds)
    autoResumeTimeoutRef.current = setTimeout(() => {
      const now = Date.now();
      const inactiveTime = now - lastInteraction;
      
      // If user has been inactive for more than 10 seconds, resume auto demo
      if (inactiveTime > 10000) {
        setAutoDemo(true);
      }
    }, 10000);
    
    return () => {
      if (autoResumeTimeoutRef.current) {
        clearTimeout(autoResumeTimeoutRef.current);
      }
    };
  }, [autoDemo, lastInteraction]);
  
  // Handle user interaction
  const handleUserInteraction = () => {
    setLastInteraction(Date.now());
    setAutoDemo(false);
  };
  
  // Optimize cycling animations - only start when component is fully loaded
  useEffect(() => {
    if (!autoDemo || !loadingComplete) return;
    
    const sections = ['work', 'about', 'contact'];
    const currentIndex = sections.indexOf(activeSection);
    
    // Reduced time from 6000ms to 5000ms for faster cycling
    const sectionTimer = setTimeout(() => {
      setActiveSection(sections[(currentIndex + 1) % sections.length]);
    }, 5000);
    
    return () => clearTimeout(sectionTimer);
  }, [activeSection, autoDemo, loadingComplete]);
  
  // Optimize device mode cycling
  useEffect(() => {
    if (!autoDemo || !loadingComplete) return;
    
    const modes = ['desktop', 'tablet', 'mobile'];
    const currentIndex = modes.indexOf(viewMode);
    
    // Reduced time from 10000ms to 8000ms for faster cycling
    const modeTimer = setTimeout(() => {
      setViewMode(modes[(currentIndex + 1) % modes.length]);
    }, 8000);
    
    return () => clearTimeout(modeTimer);
  }, [viewMode, autoDemo, loadingComplete]);
  
  // Optimize project card hover effect
  useEffect(() => {
    if (!autoDemo || !loadingComplete || activeSection !== 'work') return;
    
    let currentProject = null;
    
    // Reduced time from 3000ms to 2500ms for faster cycling
    const hoverTimer = setInterval(() => {
      if (currentProject !== null) {
        setHoveredProject(null);
        currentProject = null;
      } else {
        currentProject = Math.floor(Math.random() * projects.length);
        setHoveredProject(currentProject);
      }
    }, 2500);
    
    return () => clearInterval(hoverTimer);
  }, [activeSection, autoDemo, loadingComplete]);
  
  // Optimize shape animations for better performance
  useEffect(() => {
    if (!shapesVisible || !shapesRef.current) return;
    
    // Use more performant CSS properties (prefer transform over others)
    const shapeElements = shapesRef.current.children;
    if (shapeElements && shapeElements.length > 0) {
      Array.from(shapeElements).forEach((shape, index) => {
        // Use transform-based animations instead of multiple properties
        shape.style.animation = `float ${2 + index % 2}s infinite ease-in-out`; // Reduced animation time
        shape.style.animationDelay = `${index * 0.3}s`; // Reduced delay
      });
    }
  }, [shapesVisible]);
  
  // Device frame based on viewMode
  const getDeviceFrame = () => {
    if (viewMode === 'desktop') {
      return {
        outerStyle: {
    width: '100%',
          maxWidth: '600px',
          margin: '0 auto 20px',
          padding: '20px 20px 30px',
          background: '#333',
          borderRadius: '16px 16px 6px 6px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 -3px 0 rgba(255,255,255,0.1), inset 0 1px 10px rgba(0,0,0,0.8)',
          position: 'relative',
          zIndex: 2,
          transform: initialized ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          opacity: initialized ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s', // Faster transition
          boxSizing: 'border-box',
          willChange: 'transform, opacity' // Performance hint for browser
        },
        standStyle: {
          position: 'absolute',
          bottom: '-15px',
          left: '50%',
          width: '140px',
          height: '20px',
          background: 'linear-gradient(to bottom, #333 0%, #222 100%)',
          transform: 'translateX(-50%)',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 5px 10px rgba(0,0,0,0.2)'
        },
        screenStyle: {
          width: '100%',
          height: '400px',
          background: '#FAFAFA',
          borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
          boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.1), inset 0 0 20px rgba(0,0,0,0.05)',
          border: '1px solid #e0e0e0'
        },
        cameraStyle: {
          position: 'absolute',
          top: '10px',
          left: '50%',
          width: '6px',
          height: '6px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5)'
        }
      };
    } else if (viewMode === 'tablet') {
      return {
        outerStyle: {
          width: '100%',
          maxWidth: '450px',
          margin: '0 auto 20px',
          padding: '20px',
          background: 'linear-gradient(to bottom, #444 0%, #333 100%)',
          borderRadius: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.05), inset 0 0 10px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 2,
          transform: initialized ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          opacity: initialized ? 1 : 0,
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
        },
        buttonStyle: {
          position: 'absolute',
          top: '50%',
          right: '6px',
          width: '4px',
          height: '40px',
          background: '#222',
          borderRadius: '2px',
          transform: 'translateY(-50%)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
        },
        screenStyle: {
          width: '100%',
          height: '400px',
          background: '#FAFAFA',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.1), inset 0 0 20px rgba(0,0,0,0.05)',
          border: '1px solid #e0e0e0'
        },
        cameraStyle: {
          position: 'absolute',
          top: '10px',
          left: '50%',
          width: '5px',
          height: '5px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5)'
        }
      };
    } else {
      return {
        outerStyle: {
          width: '100%',
          maxWidth: '280px',
          margin: '0 auto 20px',
          padding: '15px 10px',
          background: 'linear-gradient(to bottom, #444 0%, #222 100%)',
          borderRadius: '30px',
          boxShadow: '0 15px 30px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.05), inset 0 0 10px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 2,
          transform: initialized ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          opacity: initialized ? 1 : 0,
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          boxSizing: 'border-box'
        },
        speakerStyle: {
          position: 'absolute',
          top: '12px',
          left: '50%',
          width: '60px',
          height: '6px',
          background: '#222',
          borderRadius: '3px',
          transform: 'translateX(-50%)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
        },
        notchStyle: {
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '120px',
          height: '25px',
          background: '#222',
          borderRadius: '0 0 12px 12px',
          transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 -2px 5px rgba(0,0,0,0.2)'
        },
        notchCameraStyle: {
          width: '8px',
          height: '8px',
          background: '#111',
          borderRadius: '50%',
          marginRight: '5px',
          boxShadow: 'inset 0 0 2px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.1)'
        },
        notchSpeakerStyle: {
          width: '35px',
          height: '4px',
          background: '#111',
          borderRadius: '2px',
          boxShadow: 'inset 0 0 2px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.1)'
        },
        screenStyle: {
          width: '100%',
          height: '450px',
          background: '#FAFAFA',
          borderRadius: '20px',
          overflow: 'hidden',
    position: 'relative',
          boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.1), inset 0 0 20px rgba(0,0,0,0.05)',
          border: '1px solid #e0e0e0'
        },
        buttonStyle: {
          position: 'absolute',
          top: '120px',
          right: '-2px',
          width: '3px',
          height: '30px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '2px 0 0 2px',
          boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.3)'
        },
        volumeButtonsStyle: {
          position: 'absolute',
          top: '80px',
          left: '-2px',
    display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        },
        volumeButtonStyle: {
          width: '3px',
          height: '25px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '0 2px 2px 0',
          boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.3)'
        }
      };
    }
  };

  const deviceFrame = getDeviceFrame();
  
  const backgroundGradient = {
      position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: '120%',
    height: '120%',
    background: 'linear-gradient(-45deg, rgba(244,114,182,0.2) 0%, rgba(59,130,246,0.2) 50%, rgba(16,185,129,0.2) 100%)',
    zIndex: 0,
    borderRadius: '100%',
    filter: 'blur(50px)',
    animation: 'rotateBg 30s linear infinite',
    opacity: loadingComplete ? 0.6 : 0
  };
  
  const contentStyle = {
    padding: viewMode === 'desktop' ? '20px 25px' : 
             viewMode === 'tablet' ? '18px 22px' : '16px',
    height: viewMode === 'desktop' ? '360px' : viewMode === 'tablet' ? '360px' : '420px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: viewMode === 'mobile' ? '18px' : '25px',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    className: 'hide-scrollbar',
    position: 'relative',
    background: '#FAFAFA',
    transition: 'opacity 0.4s ease',
    opacity: loadingComplete ? 1 : 0
  };
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: viewMode === 'desktop' ? '14px 25px' : 
             viewMode === 'tablet' ? '12px 22px' : '10px 16px',
    background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(245,245,250,0.95))',
    borderBottom: '1px solid #EAEAEA',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
    backdropFilter: 'blur(5px)',
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: animatedHeader ? 'translateY(-100%)' : 'translateY(0%)',
    opacity: animatedHeader ? 0 : 1,
    position: 'sticky',
    top: 0,
    zIndex: 5
  };
  
  const projectCardStyle = (index) => ({
    position: 'relative',
    height: viewMode === 'desktop' ? '170px' : 
            viewMode === 'tablet' ? '150px' : '120px',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'white',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transform: hoveredProject === index ? 'translateY(-8px)' : 'translateY(0)',
    boxShadow: hoveredProject === index ? 
      '0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)' : 
      '0 5px 15px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03)',
    border: '1px solid #EAEAEA',
    animation: loadingComplete ? `fadeIn 0.5s forwards ${0.2 + index * 0.1}s` : 'none',
    opacity: 0
  });
  
  const shapeStyle = (size, top, left, delay, type, color) => ({
    position: 'absolute',
    width: size,
    height: type === 'circle' ? size : type === 'square' ? size : size/2,
    top: top,
    left: left,
    background: color,
    borderRadius: type === 'circle' ? '50%' : type === 'triangle' ? '0' : '4px',
    clipPath: type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
    opacity: shapesVisible ? 0.7 : 0,
    transform: shapesVisible ? 'translateY(0) rotate(0)' : 'translateY(20px) rotate(-20deg)',
    transition: `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s`,
    animation: shapesVisible ? `float ${3 + Math.random() * 4}s infinite ease-in-out` : 'none',
    zIndex: 1
  });
  
  const projects = [
    { 
      color: 'linear-gradient(135deg, #FFF4E5 0%, #FFE8CC 100%)',
      accent: '#FF9900',
      title: 'Brand Identity',
      icon: '✦',
      year: '2023',
      tools: ['Figma', 'Photoshop']
    },
    { 
      color: 'linear-gradient(135deg, #E8F4FF 0%, #D1E9FF 100%)',
      accent: '#2D7FF9',
      title: 'Mobile App UI',
      icon: '◎',
      year: '2023',
      tools: ['React Native', 'Sketch']
    },
    { 
      color: 'linear-gradient(135deg, #F0FFF4 0%, #DCFFE7 100%)',
      accent: '#38A169',
      title: 'Web Dashboard',
      icon: '◩',
      year: '2022',
      tools: ['React', 'D3.js']
    },
    { 
      color: 'linear-gradient(135deg, #FFF1F3 0%, #FFE4E8 100%)',
      accent: '#E53E3E',
      title: 'Social Platform',
      icon: '◇',
      year: '2022',
      tools: ['Vue.js', 'Firebase']
    },
  ];

  const shapes = [
    { size: '60px', top: '15%', left: '10%', delay: 0.1, type: 'circle', color: 'rgba(255, 153, 0, 0.15)' },
    { size: '40px', top: '70%', left: '8%', delay: 0.3, type: 'square', color: 'rgba(45, 127, 249, 0.15)' },
    { size: '30px', top: '40%', left: '85%', delay: 0.4, type: 'circle', color: 'rgba(56, 161, 105, 0.15)' },
    { size: '50px', top: '80%', left: '75%', delay: 0.2, type: 'triangle', color: 'rgba(229, 62, 62, 0.15)' },
    { size: '25px', top: '20%', left: '75%', delay: 0.5, type: 'square', color: 'rgba(102, 126, 234, 0.15)' }
  ];

  const animations = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(3deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes rotateBg {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  
  return (
    <>
      <div style={{ position: 'relative', padding: '20px 0 60px' }}>
        <style>{animations}</style>
        
        <div style={backgroundGradient}></div>
        
        {/* Device Frame */}
        <div style={{
          ...deviceFrame.outerStyle,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }} ref={containerRef}>
          {viewMode === 'desktop' && <div style={deviceFrame.standStyle}></div>}
          {viewMode === 'tablet' && <div style={deviceFrame.buttonStyle}></div>}
          {viewMode === 'mobile' && <div style={deviceFrame.speakerStyle}></div>}
          
          <div style={{
            ...deviceFrame.screenStyle,
            transition: 'all 0.4s ease'
          }}>
            {viewMode !== 'mobile' && <div style={deviceFrame.cameraStyle}></div>}
            
            {/* Mobile device notch and speaker */}
            {viewMode === 'mobile' && (
              <div style={deviceFrame.notchStyle}>
                <div style={deviceFrame.notchCameraStyle}></div>
                <div style={deviceFrame.notchSpeakerStyle}></div>
          </div>
            )}
            
            {/* Side buttons for mobile */}
            {viewMode === 'mobile' && (
              <>
                <div style={deviceFrame.buttonStyle}></div>
                <div style={deviceFrame.volumeButtonsStyle}>
                  <div style={deviceFrame.volumeButtonStyle}></div>
                  <div style={deviceFrame.volumeButtonStyle}></div>
            </div>
              </>
            )}
            
            {/* Background shapes */}
            <div ref={shapesRef}>
              {shapes.map((shape, i) => (
                <div
                  key={i}
                  style={shapeStyle(
                    shape.size,
                    shape.top,
                    shape.left,
                    shape.delay,
                    shape.type,
                    shape.color
                  )}
                />
              ))}
            </div>
            
            {/* Header */}
            <div style={{
              ...headerStyle,
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <div style={{
                fontWeight: '700',
                fontSize: viewMode === 'desktop' ? '1.3rem' : 
                          viewMode === 'tablet' ? '1.2rem' : '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#222',
                position: 'relative'
              }}>
                <span style={{
                  fontSize: '1.4rem',
                  color: '#222',
                  background: 'linear-gradient(135deg, #ff9900, #ff5470)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>◮</span>
                <span>Portfolio</span>
              </div>
              <div style={{
                display: 'flex',
                gap: viewMode === 'desktop' ? '30px' : 
                    viewMode === 'tablet' ? '20px' : '15px'
              }}>
                {['Work', 'About', 'Contact'].map((item) => (
                  <div 
                    key={item}
                    style={{
                      color: activeSection === item.toLowerCase() ? '#222' : '#777',
                      fontWeight: activeSection === item.toLowerCase() ? '600' : '500',
                      fontSize: viewMode === 'desktop' ? '0.95rem' : 
                                viewMode === 'tablet' ? '0.85rem' : '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      padding: '6px 0',
                      borderBottom: activeSection === item.toLowerCase() ? '2px solid #ff5470' : '2px solid transparent'
                    }}
                    onClick={() => {
                      handleUserInteraction();
                      setActiveSection(item.toLowerCase());
                    }}
                  >
                    {item}
            </div>
                ))}
          </div>
        </div>
        
            {/* Content area with interactive sections */}
            <div 
              style={{
                ...contentStyle,
                transition: 'opacity 0.6s ease'
              }} 
              className="hide-scrollbar"
              onMouseMove={handleUserInteraction}
              onClick={handleUserInteraction}
            >
          {activeSection === 'work' && (
            <>
              <div style={{
                    color: '#222', 
                    fontSize: viewMode === 'desktop' ? '1.6rem' : '1.4rem', 
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                    justifyContent: 'space-between',
                position: 'relative',
                    paddingBottom: '15px',
                    marginBottom: '5px',
                    borderBottom: '1px solid #EAEAEA',
                    zIndex: 2
                  }}>
                    <span>Projects</span>
                <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: 'white',
                      background: 'linear-gradient(to right, #ff9900, #ff5470)',
                      padding: '5px 12px',
                  borderRadius: '20px',
                      boxShadow: '0 4px 10px rgba(255, 84, 112, 0.2)'
                }}>
                  4 projects
                </span>
              </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: viewMode === 'desktop' ? 'repeat(auto-fill, minmax(200px, 1fr))' : 
                                          viewMode === 'tablet' ? 'repeat(2, 1fr)' : '1fr',
                    gap: '16px'
                  }}>
                {projects.map((project, index) => (
                  <div 
                    key={index}
                        style={projectCardStyle(index)}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div style={{
                      position: 'absolute',
                          top: '0',
                          left: '0',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          padding: '16px',
                          boxSizing: 'border-box',
                          flexDirection: 'column',
                          transition: 'transform 0.4s ease',
                          transform: hoveredProject === index ? 'translateY(-60px)' : 'translateY(0)',
                          background: 'white',
                          zIndex: 2
                        }}>
                          <div style={{
                            fontSize: '28px',
                            marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                            width: '50px',
                            height: '50px',
                            background: project.color,
                            borderRadius: '8px',
                            color: project.accent,
                            boxShadow: '0 4px 10px rgba(0,0,0,0.07)'
                    }}>
                      {project.icon}
                    </div>
                      <div style={{
                            fontSize: '1rem',
                        fontWeight: '600',
                            color: '#222',
                            marginBottom: '6px'
                      }}>
                        {project.title}
                      </div>
                      <div style={{
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                            <span>{project.year}</span>
                          </div>
                        </div>
                        
                        {/* Details panel that slides up on hover */}
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          width: '100%',
                          padding: '16px',
                          boxSizing: 'border-box',
                          background: project.color,
                          transition: 'transform 0.4s ease',
                          transform: hoveredProject === index ? 'translateY(0)' : 'translateY(100%)',
                          borderTop: `3px solid ${project.accent}`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          zIndex: 1
                        }}>
                          <div style={{
                            display: 'flex',
                            gap: '5px',
                            flexWrap: 'wrap'
                          }}>
                            {project.tools.map((tool, i) => (
                              <span key={i} style={{
                                background: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                                fontSize: '0.7rem',
                                color: '#444',
                                fontWeight: '500',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                                {tool}
                        </span>
                            ))}
                      </div>
                          
                          <button style={{
                            border: 'none',
                            background: 'white',
                            color: '#222',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px',
                            alignSelf: 'flex-start',
                            transition: 'transform 0.2s ease'
                          }}>
                            View Project <span style={{marginLeft: '2px'}}>→</span>
                          </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
              {/* About section */}
          {activeSection === 'about' && (
            <div style={{
                  color: '#444', 
                  fontSize: '0.95rem', 
              lineHeight: '1.6',
                  animation: 'fadeIn 0.5s forwards',
                  zIndex: 2
            }}>
              <h2 style={{
                    color: '#222', 
                    marginTop: '0',
                    marginBottom: '20px', 
                    fontSize: viewMode === 'desktop' ? '1.6rem' : '1.3rem',
                    fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                    paddingBottom: '15px',
                    borderBottom: '1px solid #EAEAEA'
                  }}>
                    <span style={{
                      fontSize: '1rem',
                      background: 'linear-gradient(to right, #ff9900, #ff5470)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: '600'
                    }}>01.</span> About Me
              </h2>
                  
              <div style={{
                display: 'flex',
                flexDirection: viewMode === 'desktop' ? 'row' : 'column',
                    gap: '25px'
              }}>
                <div style={{
                  position: 'relative',
                      width: viewMode === 'desktop' ? '110px' : '90px',
                      height: viewMode === 'desktop' ? '110px' : '90px',
                      background: 'linear-gradient(135deg, #fff4e5, #ffe8cc)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                      fontSize: '44px',
                      alignSelf: viewMode === 'desktop' ? 'flex-start' : 'flex-start',
                      marginBottom: viewMode === 'desktop' ? '0' : '5px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.07)',
                      border: '1px solid #EAEAEA',
                      animation: 'float 5s infinite ease-in-out'
                }}>
                  👋
                </div>
                    
                <div>
                      <p style={{marginTop: 0, marginBottom: '15px'}}>I'm a UI/UX designer and front-end developer with 5+ years of experience creating beautiful and functional digital experiences.</p>
                      
                      <p style={{marginTop: '0', marginBottom: '20px'}}>My expertise includes responsive web design, mobile app interfaces, and interactive prototypes with a focus on accessibility and user engagement.</p>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                        marginTop: '20px'
                  }}>
                    {['React', 'Vue.js', 'Figma', 'UX Research', 'Responsive Design'].map((skill, index) => (
                      <span key={index} style={{
                            background: 'white',
                            padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                            color: '#444',
                            fontWeight: '500',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                            border: '1px solid #EAEAEA'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
              {/* Contact section */}
          {activeSection === 'contact' && (
            <div style={{
                  color: '#444', 
                  fontSize: '0.95rem',
                  animation: 'fadeIn 0.5s forwards',
                  zIndex: 2
            }}>
              <h2 style={{
                    color: '#222', 
                    marginTop: '0',
                    marginBottom: '20px', 
                    fontSize: viewMode === 'desktop' ? '1.6rem' : '1.3rem',
                    fontWeight: '700',
                    paddingBottom: '15px',
                    borderBottom: '1px solid #EAEAEA'
                  }}>
                    <span style={{
                      fontSize: '1rem',
                      background: 'linear-gradient(to right, #ff9900, #ff5470)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: '600'
                    }}>02.</span> Get In Touch
              </h2>
                  
              <div style={{
                    background: 'white', 
                padding: '20px', 
                    borderRadius: '14px', 
                    marginBottom: '16px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #EAEAEA',
                    position: 'relative',
                    overflow: 'hidden'
              }}>
                <div style={{
                      marginBottom: '14px', 
                      color: '#222',
                  display: 'flex',
                  alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        background: 'linear-gradient(135deg, #fff4e5, #ffe8cc)',
                        color: '#FF9900',
                        borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                  }}>
                    ✉️
                </div>
                <div style={{
                        fontWeight: '600',
                        fontSize: '1.05rem'
                      }}>Email</div>
                    </div>
                    
                    <div style={{
                      color: '#222',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#F9F9F9',
                      border: '1px solid #EAEAEA',
                      marginLeft: '50px',
                      fontWeight: '500'
                }}>
                  hello@portfolio.com
                </div>
              </div>
                  
              <div style={{
                    background: 'white', 
                padding: '20px', 
                    borderRadius: '14px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #EAEAEA'
              }}>
                <div style={{
                      marginBottom: '14px', 
                      color: '#222',
                  display: 'flex',
                  alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        background: 'linear-gradient(135deg, #e8f4ff, #d1e9ff)',
                        color: '#2D7FF9',
                        borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                  }}>
                    🔗
                </div>
                      <div style={{
                        fontWeight: '600',
                        fontSize: '1.05rem'
                      }}>Social</div>
                    </div>
                    
                <div style={{
                  display: 'flex', 
                  gap: '10px',
                      marginLeft: '50px',
                      flexWrap: 'wrap'
                }}>
                  {['Twitter', 'LinkedIn', 'Dribbble'].map((social, index) => (
                    <div key={index} style={{
                      cursor: 'pointer',
                          padding: '8px 14px',
                      borderRadius: '6px',
                          fontWeight: '500',
                          color: '#222',
                          background: '#F9F9F9',
                          border: '1px solid #EAEAEA',
                          transition: 'all 0.2s ease'
                    }}>
                      {social}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
        </div>
        
        {/* View mode selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
          marginTop: '30px',
          position: 'relative',
          zIndex: 5
      }}>
          {['Desktop', 'Tablet', 'Mobile'].map((mode) => (
        <button 
              key={mode}
          style={{
                padding: '7px 14px',
                background: viewMode === mode.toLowerCase() 
                  ? 'linear-gradient(to right, #ff9900, #ff5470)' 
                  : 'white',
                color: viewMode === mode.toLowerCase() ? 'white' : '#777',
                border: viewMode === mode.toLowerCase() 
                  ? 'none' 
                  : '1px solid #EAEAEA',
            borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: viewMode === mode.toLowerCase() ? '600' : '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
                boxShadow: viewMode === mode.toLowerCase() 
                  ? '0 4px 12px rgba(255,84,112,0.3)' 
                  : '0 2px 5px rgba(0,0,0,0.05)'
              }}
              onClick={() => {
                handleUserInteraction();
                setViewMode(mode.toLowerCase());
              }}
            >
              {mode}
        </button>
          ))}
        </div>
      </div>
    </>
  );
};

// Product Showcase Demo Component
const ProductShowcaseDemo = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const products = [
    {
      name: 'Pro Wireless Headphones',
      price: '$249',
      color: 'Midnight Black',
      features: ['Active Noise Cancellation', '36hr Battery Life', 'Hi-Fi Sound'],
      background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
      accent: '#5a5a5a'
    },
    {
      name: 'Air Comfort Earbuds',
      price: '$179',
      color: 'Sky Blue',
      features: ['Touch Controls', 'Water Resistant', 'Ambient Sound Mode'],
      background: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
      accent: '#00a1fb'
    },
    {
      name: 'Studio Monitor Headphones',
      price: '$329',
      color: 'Premium Gold',
      features: ['Studio-grade Sound', 'Wired + Wireless', 'Foldable Design'],
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      accent: '#f8c76e'
    }
  ];
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeProduct + 1) % products.length;
      changeProduct(nextIndex);
    }, 4200); // Adjusted to account for animation delays
    
    return () => clearInterval(interval);
  }, [activeProduct]);
  
  const changeProduct = (index) => {
    if (index === activeProduct) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveProduct(index);
      setTimeout(() => {
        setAnimating(false);
      }, 400);
    }, 400);
  };
  
  const containerStyle = {
    width: '100%',
    height: '420px',
    background: products[activeProduct].background,
    borderRadius: '14px',
    padding: '25px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    transition: 'background 0.8s ease'
  };
  
  const contentWrapperStyle = {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px'
  };
  
  const productInfoStyle = {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    opacity: animating ? 0 : 1,
    transform: animating ? 'translateY(20px)' : 'translateY(0)',
    transition: 'all 0.4s ease'
  };
  
  const productImageContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1000px'
  };
  
  const productImageStyle = {
    width: '200px',
    height: '200px',
    background: products[activeProduct].accent,
    borderRadius: '20px',
    transform: `rotateY(${animating ? 90 : 0}deg)`,
    opacity: animating ? 0 : 1,
    transition: 'all 0.4s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  };
  
  const productSelectorsStyle = {
    position: 'absolute',
    bottom: '25px',
    left: '25px',
    display: 'flex',
    gap: '10px'
  };
  
  const selectorStyle = (isActive) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: isActive ? 'white' : 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });
  
  const featureStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '5px'
  };
  
  const ctaButtonStyle = {
    background: 'white',
    color: '#000',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '25px',
    fontWeight: '600',
    marginTop: '20px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease'
  };
  
  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <div style={productInfoStyle}>
          <div style={{fontSize: '0.9rem', opacity: 0.8, marginBottom: '5px'}}>
            {products[activeProduct].color}
          </div>
          <h2 style={{fontSize: '1.8rem', fontWeight: '700', marginBottom: '10px'}}>
            {products[activeProduct].name}
          </h2>
          <div style={{fontSize: '1.6rem', fontWeight: '700', marginBottom: '20px'}}>
            {products[activeProduct].price}
          </div>
          
          <div style={{marginBottom: '20px'}}>
            {products[activeProduct].features.map((feature, index) => (
              <div key={index} style={featureStyle}>
                <span style={{color: products[activeProduct].accent}}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          <button style={ctaButtonStyle}>
            Add to Cart
            <span style={{fontSize: '1.2rem'}}>→</span>
          </button>
        </div>
        
        <div style={productImageContainerStyle}>
          <div style={productImageStyle}>
            <div style={{
              fontSize: '3rem', 
              color: 'rgba(255,255,255,0.8)',
              fontWeight: '700',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              {activeProduct === 0 ? '🎧' : activeProduct === 1 ? '🎵' : '🎚️'}
            </div>
          </div>
        </div>
      </div>
      
      <div style={productSelectorsStyle}>
        {products.map((_, index) => (
          <div 
            key={index}
            style={selectorStyle(index === activeProduct)}
            onClick={() => 
              changeProduct(index)
            }
          />
        ))}
      </div>
    </div>
  );
};

// Main WebsitesShowcase Component
const WebsitesShowcase = () => {
  return (
    <CodeShowcaseGrid>
      {/* E-commerce Product Showcase */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Interactive Product Showcase
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Modern e-commerce product page with smooth transitions, interactive elements, and dynamic content changes.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>ProductShowcase.jsx</CodeFileName>
              <CodeLanguage>JSX</CodeLanguage>
            </CodeHeader>
            <RainbowCode 
              language="jsx" 
              code={`import React, { 
  useState, 
  useEffect } from 'react';
import styled from 'styled-components';
import { 
  motion, 
  AnimatePresence } from 'framer-motion';

const Container = styled.div\`
  width: 100%;
  background: \${props => 
    props.background};
  border-radius: 14px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  color: white;
  transition: background 0.8s ease;
\`;

const ProductGrid = styled.div\`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
\`;

const ProductInfo = styled(motion.div)\`
  display: flex;
  flex-direction: column;
  justify-content: center;
\`;

const ProductName = styled.h2\`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
\`;

const ProductPrice = styled.div\`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
\`;

const FeatureList = styled.div\`
  margin-bottom: 1.5rem;
\`;

const Feature = styled.div\`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  span:first-child {
    color: \${props => 
      props.accentColor};
  }
\`;

const ProductImage = styled(motion.div)\`
  height: 250px;
  background: \${props => 
    props.background};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 10px 30px rgba(0,0,0,0.3);
\`;

const ProductSelector = styled.div\`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  gap: 0.5rem;
\`;

const Dot = styled.div\`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: \${props => 
    props.active 
      ? 'white' 
      : 'rgba(255,255,255,0.4)'};
  cursor: pointer;
  transition: all 0.3s ease;
\`;

const Button = styled.button\`
  background: white;
  color: black;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 2rem;
  font-weight: 600;
  marginTop: '20px';
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 
    0 5px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 20px rgba(0,0,0,0.3);
  }
\`;

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = 
    useState(0);
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = 
        (activeProduct + 1) % products.length;
      changeProduct(nextIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeProduct]);
  
  // Product data would be defined here
  
  return (
    <Container 
      background={
        products[activeProduct]
          .background
      }
    >
      <ProductGrid>
        <AnimatePresence mode="wait">
          <ProductInfo
            key={activeProduct}
            initial={{ 
              opacity: 0, 
              y: 20 
            }}
            animate={{ 
              opacity: 1, 
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              y: -20 
            }}
            transition={{ 
              duration: 0.4 
            }}
          >
            {/* Product information would 
                be rendered here */}
          </ProductInfo>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <ProductImage
            key={activeProduct}
            initial={{ 
              opacity: 0, 
              rotateY: 90 
            }}
            animate={{ 
              opacity: 1, 
              rotateY: 0 
            }}
            exit={{ 
              opacity: 0, 
              rotateY: -90 
            }}
            transition={{ 
              duration: 0.4 
            }}
          >
            {/* Product image would 
                be rendered here */}
          </ProductImage>
        </AnimatePresence>
      </ProductGrid>
      
      <ProductSelector>
        {products.map((_, index) => (
          <Dot
            key={index}
            active={index === activeProduct}
            onClick={() => 
              changeProduct(index)
            }
          />
        ))}
      </ProductSelector>
    </Container>
  );
};

export default ProductShowcase;`} 
            />
          </CodeSnippetContainer>
          <DemoContainer>
            <ProductShowcaseDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>

      {/* Responsive Portfolio Website */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Responsive Portfolio Website
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Modern responsive portfolio website that adapts perfectly to desktop and mobile devices with interactive navigation.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>portfolio.jsx</CodeFileName>
              <CodeLanguage>JSX</CodeLanguage>
            </CodeHeader>
            <RainbowCode 
              language="jsx" 
              code={`import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div\`
  width: 100%;
  height: 100vh;
  background: #FAFAFA;
  color: #333;
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
\`;

const Header = styled.header\`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #EAEAEA;
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
\`;

const Logo = styled.div\`
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #222;
\`;

const Nav = styled.nav\`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
\`;

const NavItem = styled.div\`
  cursor: pointer;
  position: relative;
  color: \${props => 
    props.active ? '#222' : '#777'};
  font-weight: \${props => 
    props.active ? '600' : '500'};
  transition: all 0.3s ease;
  padding: 6px 0;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: \${props => 
      props.active ? '100%' : '0'};
    height: 2px;
    background: #222;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: \${props => 
      props.active ? '#222' : '#444'};
    
    &::after {
      width: 100%;
    }
  }
\`;

const ShapeElement = styled.div\`
  position: absolute;
  width: \${props => props.size};
  height: \${props => 
    props.type === 'circle' 
      ? props.size 
      : props.type === 'square' 
        ? props.size 
        : 'calc(' + props.size + '/2)'};
  background: \${props => props.color};
  border-radius: \${props => 
    props.type === 'circle' ? '50%' : '4px'};
  clip-path: \${props => 
    props.type === 'triangle' 
      ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
      : 'none'};
  z-index: 1;
\`;

const ProjectCard = styled.div\`
  height: 170px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: white;
  border: 1px solid #EAEAEA;
  transition: all 0.4s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }
\`;

const Portfolio = () => {
  const [activeSection, setActiveSection] = 
    useState('work');
  const [shapesVisible, setShapesVisible] = 
    useState(true);
  
  return (
    <Container>
      <Header>
        <Logo>◮ Portfolio</Logo>
        <Nav>
          <NavItem 
            active={activeSection === 'work'} 
            onClick={() => 
              setActiveSection('work')
            }
          >
            Work
          </NavItem>
          <NavItem 
            active={activeSection === 'about'} 
            onClick={() => 
              setActiveSection('about')
            }
          >
            About
          </NavItem>
          <NavItem 
            active={
              activeSection === 'contact'
            } 
            onClick={() => 
              setActiveSection('contact')
            }
          >
            Contact
          </NavItem>
        </Nav>
      </Header>
      
      {/* Background shapes */}
      <ShapeElement 
        size="60px" 
        top="15%" 
        left="10%" 
        type="circle" 
        color="#FFE8D2" 
      />
      <ShapeElement 
        size="40px" 
        top="70%" 
        left="8%" 
        type="square" 
        color="#D1E9FF" 
      />
      <ShapeElement 
        size="30px" 
        top="40%" 
        left="85%" 
        type="circle" 
        color="#E4FFED" 
      />
      
      {/* Content would be conditionally 
          rendered here */}
    </Container>
  );
};

export default Portfolio;`} 
            />
          </CodeSnippetContainer>
          <DemoContainer>
            <ResponsivePortfolioDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

export default WebsitesShowcase; 