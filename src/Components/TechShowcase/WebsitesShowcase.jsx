import React, { useState, useEffect } from "react";
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
  const [animatedHeader, setAnimatedHeader] = useState(true);
  const [activatedMenu, setActivatedMenu] = useState(false);
  
  // Add animation effect on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHeader(false);
      setActivatedMenu(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const containerStyle = {
    width: '100%',
    height: '420px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(135deg, #0a0a12 0%, #1d1d35 100%)',
    borderRadius: viewMode === 'desktop' ? '18px' : '32px',
    border: viewMode === 'mobile' ? '12px solid #111' : '1px solid rgba(80, 70, 255, 0.1)',
    maxWidth: viewMode === 'desktop' ? '100%' : 
              viewMode === 'tablet' ? '500px' : '260px',
    margin: '0 auto',
    boxShadow: viewMode === 'desktop' ? 
      '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 60px rgba(80, 70, 255, 0.15) inset' : 
      '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(80, 70, 255, 0.1) inset',
    fontSize: viewMode === 'mobile' ? '0.9em' : '1em'
  };
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: viewMode === 'desktop' ? '22px 30px' : 
             viewMode === 'tablet' ? '18px 22px' : '14px 15px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    background: animatedHeader ? 
      'linear-gradient(90deg, rgba(20,20,30,0.7) 0%, rgba(30,30,50,0.6) 100%)' : 
      'linear-gradient(90deg, rgba(15,15,25,0.8) 0%, rgba(25,25,45,0.75) 100%)',
    backdropFilter: 'blur(12px)',
    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: animatedHeader ? 'translateY(-100%)' : 'translateY(0%)',
    opacity: animatedHeader ? 0 : 1,
    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.15)'
  };
  
  const logoStyle = {
    color: '#fff',
    fontWeight: '700',
    fontSize: viewMode === 'desktop' ? '1.4rem' : 
              viewMode === 'tablet' ? '1.2rem' : '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    position: 'relative',
    transition: 'all 0.3s ease',
    textShadow: '0 2px 12px rgba(139, 92, 246, 0.5)'
  };
  
  const navStyle = {
    display: 'flex',
    gap: viewMode === 'desktop' ? '30px' : 
        viewMode === 'tablet' ? '20px' : '12px'
  };
  
  const navItemStyle = (isActive) => ({
    color: isActive ? '#8b5cf6' : 'rgba(255,255,255,0.7)',
    fontWeight: isActive ? '600' : '400',
    fontSize: viewMode === 'desktop' ? '0.95rem' : 
              viewMode === 'tablet' ? '0.85rem' : '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    borderBottom: isActive ? '2px solid #8b5cf6' : '2px solid transparent',
    paddingBottom: '5px',
    position: 'relative',
    transform: isActive && activatedMenu ? 'translateY(-2px)' : 'translateY(0)',
    opacity: activatedMenu ? 1 : 0,
    animation: activatedMenu ? `fadeIn 0.4s forwards ${isActive ? 0 : 0.1}s` : 'none',
    '&:hover': {
      color: isActive ? '#8b5cf6' : 'rgba(255,255,255,0.9)'
    },
    '&:after': isActive ? {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: '0',
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, #8b5cf6, rgba(139, 92, 246, 0.3))',
      borderRadius: '4px',
      boxShadow: '0 2px 12px rgba(139, 92, 246, 0.6)'
    } : {}
  });
  
  const contentStyle = {
    padding: viewMode === 'desktop' ? '25px 30px' : 
             viewMode === 'tablet' ? '22px 25px' : '18px',
    height: 'calc(100% - 70px)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: viewMode === 'mobile' ? '18px' : '24px',
    transition: 'opacity 0.5s ease',
    animation: 'fadeIn 0.5s forwards',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    className: 'hide-scrollbar'
  };
  
  const projectGridStyle = {
    display: 'grid',
    gridTemplateColumns: viewMode === 'desktop' ? 'repeat(auto-fill, minmax(180px, 1fr))' : 
                          viewMode === 'tablet' ? 'repeat(2, 1fr)' : '1fr',
    gap: viewMode === 'desktop' ? '20px' : 
         viewMode === 'tablet' ? '15px' : '12px'
  };
  
  const projectCardStyle = (index) => ({
    position: 'relative',
    height: viewMode === 'desktop' ? '160px' : 
            viewMode === 'tablet' ? '140px' : '110px',
    borderRadius: viewMode === 'mobile' ? '12px' : '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transform: hoveredProject === index ? 'translateY(-10px) scale(1.03)' : 'translateY(0) scale(1)',
    boxShadow: hoveredProject === index ? 
      '0 20px 40px -5px rgba(0,0,0,0.6), 0 0 25px rgba(139, 92, 246, 0.15) inset' : 
      '0 8px 25px rgba(0,0,0,0.35)',
    border: '1px solid rgba(139, 92, 246, 0.1)',
    animation: `fadeIn 0.6s forwards ${0.2 + index * 0.15}s`,
    opacity: 0,
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(to right, #8b5cf6, transparent)',
      zIndex: 5,
      opacity: hoveredProject === index ? 1 : 0.5,
      transition: 'opacity 0.3s ease'
    }
  });
  
  const projectOverlayStyle = (index) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
    transform: hoveredProject === index ? 'translateY(0)' : 'translateY(100%)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backdropFilter: 'blur(3px)'
  });
  
  const projects = [
    { 
      color: '#4C1D95', 
      bgGradient: 'linear-gradient(45deg, #4C1D95 0%, #7C3AED 40%, #EF4444 90%)', 
      title: 'Brand Identity',
      icon: '✨',
      year: '2023',
      tools: ['Figma', 'Photoshop']
    },
    { 
      color: '#1D4ED8', 
      bgGradient: 'linear-gradient(160deg, #1E40AF 0%, #3B82F6 50%, #93C5FD 100%)', 
      title: 'Mobile App UI',
      icon: '📱',
      year: '2023',
      tools: ['React Native', 'Sketch']
    },
    { 
      color: '#0F766E', 
      bgGradient: 'linear-gradient(90deg, #0F766E 0%, #2DD4BF 50%, #A7F3D0 100%)', 
      title: 'Web Dashboard',
      icon: '📊',
      year: '2022',
      tools: ['React', 'D3.js']
    },
    { 
      color: '#9333EA', 
      bgGradient: 'linear-gradient(0deg, #6D28D9 0%, #A855F7 50%, #E879F9 100%)', 
      title: 'Social Platform',
      icon: '🌐',
      year: '2022',
      tools: ['Vue.js', 'Firebase']
    },
  ];
  
  // Add keyframe animations
  const animationStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
      70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
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
      <div style={containerStyle}>
        <style>{`
          @keyframes fadeIn { 
            from { opacity: 0; transform: translateY(15px); } 
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shimmer {
            0% { background-position: -468px 0; }
            100% { background-position: 468px 0; }
          }
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div style={headerStyle} className={animatedHeader ? 'animated-header' : ''}>
          <div style={logoStyle}>
            <span style={{
              color: '#8b5cf6',
              fontSize: viewMode === 'desktop' ? '1.6rem' : '1.4rem',
              filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.6))',
              animation: activatedMenu ? 'pulse 2s infinite' : 'none'
            }}>⬢</span> 
            <span style={{
              background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: activatedMenu ? 'fadeIn 0.5s forwards' : 'none',
              opacity: activatedMenu ? 1 : 0
            }}>Portfolio</span>
          </div>
          <div style={navStyle}>
            <div 
              style={navItemStyle(activeSection === 'work')} 
              onClick={() => setActiveSection('work')}
            >
              Work
            </div>
            <div 
              style={navItemStyle(activeSection === 'about')} 
              onClick={() => setActiveSection('about')}
            >
              About
            </div>
            <div 
              style={navItemStyle(activeSection === 'contact')} 
              onClick={() => setActiveSection('contact')}
            >
              Contact
            </div>
          </div>
        </div>
        
        <div style={contentStyle} className="hide-scrollbar">
          {activeSection === 'work' && (
            <>
              <div style={{
                color: '#fff', 
                fontSize: viewMode === 'desktop' ? '1.6rem' : '1.3rem', 
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                position: 'relative',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                animation: 'fadeIn 0.4s forwards',
                background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.8))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <span>Recent Projects</span>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  color: '#fff',
                  background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  marginLeft: 'auto',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                  WebkitBackgroundClip: 'initial',
                  WebkitTextFillColor: 'initial'
                }}>
                  4 projects
                </span>
              </div>
              <div style={projectGridStyle}>
                {projects.map((project, index) => (
                  <div 
                    key={index}
                    style={{...projectCardStyle(index), background: project.bgGradient}}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      backdropFilter: 'blur(3px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      animation: hoveredProject === index ? 'pulse 2s infinite' : 'none'
                    }}>
                      {project.icon}
                    </div>
                    <div style={projectOverlayStyle(index)}>
                      <div style={{
                        color: '#fff', 
                        fontSize: '1rem', 
                        fontWeight: '700',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        {project.title}
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          background: 'rgba(139, 92, 246, 0.3)',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          backdropFilter: 'blur(5px)',
                          border: '1px solid rgba(139, 92, 246, 0.2)'
                        }}>
                          {project.year}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <div style={{
                          display: 'flex',
                          gap: '5px',
                          flexWrap: 'wrap'
                        }}>
                          {project.tools.map((tool, i) => (
                            <span key={i} style={{
                              background: 'rgba(255,255,255,0.1)',
                              padding: '3px 6px',
                              borderRadius: '4px',
                              fontSize: '0.65rem',
                              color: 'rgba(255,255,255,0.8)',
                              border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                              {tool}
                            </span>
                          ))}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: 'rgba(255,255,255,0.9)', 
                          fontSize: '0.8rem',
                          gap: '5px',
                          marginTop: '4px'
                        }}>
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                            padding: '5px 12px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                          }}>
                            View Project <span style={{fontSize: '1rem'}}>→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {activeSection === 'about' && (
            <div style={{
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '0.95rem', 
              lineHeight: '1.6',
              animation: 'fadeIn 0.5s forwards'
            }}>
              <h2 style={{
                color: '#fff', 
                marginBottom: '18px', 
                fontSize: viewMode === 'desktop' ? '1.6rem' : '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.8))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <span style={{
                  color: '#8b5cf6', 
                  marginRight: '5px',
                  WebkitBackgroundClip: 'initial',
                  WebkitTextFillColor: 'initial'
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
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '44px',
                  alignSelf: viewMode === 'desktop' ? 'center' : 'flex-start',
                  marginBottom: viewMode === 'desktop' ? '0' : '5px',
                  boxShadow: '0 15px 30px rgba(139, 92, 246, 0.4)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  animation: 'pulse 3s infinite'
                }}>
                  👋
                </div>
                <div>
                  <p style={{marginTop: 0}}>I'm a UI/UX designer and front-end developer with 5+ years of experience creating beautiful and functional digital experiences.</p>
                  <p style={{marginTop: '15px'}}>My expertise includes responsive web design, mobile app interfaces, and interactive prototypes with a focus on accessibility and user engagement.</p>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '20px'
                  }}>
                    {['React', 'Vue.js', 'Figma', 'UX Research', 'Responsive Design'].map((skill, index) => (
                      <span key={index} style={{
                        background: 'rgba(139, 92, 246, 0.1)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        color: '#fff',
                        fontWeight: '500',
                        backdropFilter: 'blur(5px)',
                        boxShadow: index % 2 === 0 ? '0 4px 12px rgba(139, 92, 246, 0.15)' : 'none'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'contact' && (
            <div style={{
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '0.95rem',
              animation: 'fadeIn 0.5s forwards'
            }}>
              <h2 style={{
                color: '#fff', 
                marginBottom: '18px', 
                fontSize: viewMode === 'desktop' ? '1.6rem' : '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.8))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <span style={{
                  color: '#8b5cf6', 
                  marginRight: '5px',
                  WebkitBackgroundClip: 'initial',
                  WebkitTextFillColor: 'initial'
                }}>02.</span> Get In Touch
              </h2>
              <div style={{
                background: 'rgba(139, 92, 246, 0.05)', 
                padding: '22px', 
                borderRadius: '16px', 
                marginBottom: '18px',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15), 0 0 20px rgba(139, 92, 246, 0.05) inset',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  marginBottom: '14px', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 5px 15px rgba(139, 92, 246, 0.3)',
                    fontSize: '18px'
                  }}>
                    ✉️
                  </span>
                  <span style={{
                    fontWeight: '600',
                    fontSize: '1.05rem'
                  }}>Email</span>
                </div>
                <div style={{
                  color: '#fff',
                  background: 'linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15))',
                  padding: '12px',
                  borderRadius: '8px',
                  marginLeft: '50px',
                  fontWeight: '500',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(5px)'
                }}>
                  <span style={{
                    background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>hello@portfolio.com</span>
                </div>
              </div>
              <div style={{
                background: 'rgba(139, 92, 246, 0.05)', 
                padding: '22px', 
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15), 0 0 20px rgba(139, 92, 246, 0.05) inset',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  marginBottom: '14px', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 5px 15px rgba(139, 92, 246, 0.3)',
                    fontSize: '18px'
                  }}>
                    🔗
                  </span>
                  <span style={{
                    fontWeight: '600',
                    fontSize: '1.05rem'
                  }}>Social</span>
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
                      background: 'linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15))',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      fontWeight: '500',
                      backdropFilter: 'blur(5px)',
                      border: '1px solid rgba(139, 92, 246, 0.15)',
                      boxShadow: index % 2 === 0 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{
                        background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>{social}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '15px'
      }}>
        <button 
          style={{
            padding: '7px 14px',
            background: viewMode === 'desktop' ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.2))' : 'transparent',
            color: viewMode === 'desktop' ? '#8b5cf6' : 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: viewMode === 'desktop' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: viewMode === 'desktop' ? '0 4px 12px rgba(139, 92, 246, 0.15)' : 'none'
          }}
          onClick={() => setViewMode('desktop')}
        >
          Desktop
        </button>
        <button 
          style={{
            padding: '7px 14px',
            background: viewMode === 'tablet' ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.2))' : 'transparent',
            color: viewMode === 'tablet' ? '#8b5cf6' : 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: viewMode === 'tablet' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: viewMode === 'tablet' ? '0 4px 12px rgba(139, 92, 246, 0.15)' : 'none'
          }}
          onClick={() => setViewMode('tablet')}
        >
          Tablet
        </button>
        <button 
          style={{
            padding: '7px 14px',
            background: viewMode === 'mobile' ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.2))' : 'transparent',
            color: viewMode === 'mobile' ? '#8b5cf6' : 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: viewMode === 'mobile' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: viewMode === 'mobile' ? '0 4px 12px rgba(139, 92, 246, 0.15)' : 'none'
          }}
          onClick={() => setViewMode('mobile')}
        >
          Mobile
        </button>
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
    }, 4200); // Adjusted to account for animation delays (5000 - 800ms total animation time)
    
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
      setActiveProduct(nextIndex);
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
              code={`import React, { 
  useState 
} from 'react';
import styled from 'styled-components';

const Container = styled.div\`
  width: 100%;
  height: 100vh;
  background: #0f0f13;
  color: white;
  
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
  border-bottom: 
    1px solid rgba(255,255,255,0.1);
  position: sticky;
  top: 0;
  background: rgba(15,15,19,0.8);
  backdrop-filter: blur(10px);
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
  
  span {
    color: #ff5470;
  }
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
    props.active 
      ? '#ff5470' 
      : 'rgba(255,255,255,0.7)'};
  font-weight: \${props => 
    props.active ? '600' : '400'};
  transition: all 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: \${props => 
      props.active ? '100%' : '0'};
    height: 2px;
    background: #ff5470;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: white;
    
    &::after {
      width: 100%;
    }
  }
\`;

const ProjectGrid = styled.div\`
  display: grid;
  grid-template-columns: 
    repeat(
      auto-fill, 
      minmax(300px, 1fr)
    );
  gap: 1.5rem;
  padding: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
\`;

const ProjectCard = styled.div\`
  height: 200px;
  border-radius: 12px;
  background: \${props => 
    props.background};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 
    transform 0.3s ease, 
    box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 30px rgba(0,0,0,0.3);
  }
\`;

const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = 
    useState('work');
  
  return (
    <Container>
      <Header>
        <Logo><span>◆</span> Portfolio</Logo>
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
      
      {/* Content would be conditionally 
          rendered here */}
    </Container>
  );
};

export default PortfolioWebsite;`} 
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