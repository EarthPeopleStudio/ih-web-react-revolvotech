import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { AiOutlineCheck, AiOutlineClose, AiOutlineCode, AiOutlineCopy, AiOutlineLink, AiOutlineInfoCircle } from 'react-icons/ai';
import { MdContentCopy, MdOpenInNew } from 'react-icons/md';
import Lottie from "lottie-react";
// Updated imports for animations
import dogAnimation from "../assets/animations/dog.json";
import cupAnimation from "../assets/animations/cup.json";
// Import WebsitesShowcase from new file
import WebsitesShowcase from "./TechShowcase/WebsitesShowcase";
// Import MobileAppsShowcase from new file
import MobileAppsShowcase from "./TechShowcase/MobileAppsShowcase";
// Import GamesShowcase from new file
import GamesShowcase from "./TechShowcase/GamesShowcase";
// Import UIUXShowcase from new file
import UIUXShowcase from "./TechShowcase/UIUXShowcase";
// Import AIShowcase component
import AIShowcase from "./TechShowcase/AIShowcase";

// Global style to prevent copying from code blocks
const GlobalStyle = styled.div`
  /* Style for preventing text selection and copying */
  [data-nocopy="true"] {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: auto;
  }
  
  /* Prevent drag and drop */
  [data-nocopy="true"] * {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;

const ShowcaseWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  text-align: center;
  color: var(--text-primary);
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    width: 80px;
    height: 4px;
    background: #ff5470;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 60px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const Tab = styled.button`
  padding: 14px 20px;
  border: none;
  background: ${(props) => (props.active ? "rgba(255, 84, 112, 0.15)" : "transparent")};
  color: ${(props) => (props.active ? "var(--text-primary)" : "var(--text-secondary)")};
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    background: ${(props) => (props.active ? "rgba(255, 84, 112, 0.15)" : "rgba(255, 255, 255, 0.05)")};
    color: var(--text-primary);
  }

  ${(props) => props.active && `
    &:after {
      content: "";
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background: #ff5470;
      border-radius: 2px;
    }
  `}
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`;

const ContentSection = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  animation: ${props => props.active ? 'fadeIn 0.5s ease' : 'none'};
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SectionContent = styled.div`
  background: var(--card-bg);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  margin-bottom: 20px;
  
  h2 {
    margin-top: 0;
    color: #ff5470;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

// New code showcase components
const CodeShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;
`;

const CodeShowcaseItem = styled.div`
  background: #121212; /* Darker black background like navbar */
  border-radius: 20px; /* More rounded corners */
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

// Custom Rainbow code component is now in WebsitesShowcase.jsx

// Website Demos
const ResponsiveGridDemo = () => {
  const demoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
    gap: '10px',
    width: '100%'
  };

  const gridItemStyle = (color) => ({
    background: color,
    height: '70px',
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  });

  const [hoveredItem, setHoveredItem] = useState(null);
  
  return (
    <div style={{width: '100%'}}>
      <div style={demoGridStyle}>
        {[...Array(6)].map((_, index) => (
          <div 
            key={index}
          style={{ 
              ...gridItemStyle(index % 2 === 0 ? '#ff5470' : '#ffffff'),
              transform: hoveredItem === index ? 'translateY(-10px)' : 'none'
            }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          />
        ))}
      </div>
    </div>
  );
};

const FeatureCardDemo = () => {
  const [expanded, setExpanded] = useState(false);
  
  const cardStyle = {
    background: 'var(--card-bg)',
    borderRadius: '12px',
          padding: '20px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
    width: '100%'
  };
  
  const titleStyle = {
    fontSize: '1.2rem',
    color: 'var(--text-primary)',
    marginBottom: '8px'
  };
  
  const descStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    marginBottom: '15px'
  };
  
  const buttonStyle = {
    background: '#ff5470',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600'
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Interactive Feature</h3>
      <p style={descStyle}>
        {expanded 
          ? 'This component demonstrates a common UI pattern where content can be expanded and collapsed to save space while providing more details when needed.'
          : 'This component demonstrates a common UI pattern...'}
      </p>
      <button 
        style={buttonStyle}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
      </div>
  );
};

// Mobile App Demos - Now moved to MobileAppsShowcase.jsx component

export default function TechShowcase() {
  const [activeCategory, setActiveCategory] = useState('Websites');

  const handleTabClick = (category) => {
    setActiveCategory(category);
  };
  
  // Add event listener to prevent keyboard copy shortcuts
  useEffect(() => {
    const preventCopyShortcuts = (e) => {
      // Check if the target has the nocopy attribute
      if (e.target.closest('[data-nocopy="true"]')) {
        // Prevent copy keyboard shortcuts (Ctrl+C, Cmd+C)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
          e.preventDefault();
          return false;
        }
      }
    };
    
    document.addEventListener('keydown', preventCopyShortcuts);
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', preventCopyShortcuts);
    };
  }, []);

  const renderContent = () => {
    switch (activeCategory) {
      case 'Websites':
        return <WebsitesShowcase key="websites" />;
      case 'Mobile Apps':
        return <MobileAppsShowcase key="mobile-apps" />;
      case 'UI/UX':
        return <UIUXShowcase key="ui-ux" />;
      case 'Games':
        return <GamesShowcase key="games" />;
      case 'AI':
        return <AIShowcase key="ai" />;
      default:
        return <WebsitesShowcase key="websites-default" />;
    }
  };

  return (
    <GlobalStyle>
      <ShowcaseWrapper>
        <Title>Tech Showcase</Title>
        <Subtitle>Explore our technical capabilities through code snippets and interactive demos</Subtitle>
        
        <TabsContainer>
            <Tab 
            active={activeCategory === 'Websites'} 
            onClick={() => handleTabClick('Websites')}
            >
            Websites
            </Tab>
          <Tab 
            active={activeCategory === 'Mobile Apps'} 
            onClick={() => handleTabClick('Mobile Apps')}
          >
            Mobile Apps
          </Tab>
          <Tab 
            active={activeCategory === 'UI/UX'} 
            onClick={() => handleTabClick('UI/UX')}
          >
            UI/UX
          </Tab>
          <Tab 
            active={activeCategory === 'Games'} 
            onClick={() => handleTabClick('Games')}
          >
            Games
          </Tab>
          <Tab 
            active={activeCategory === 'AI'} 
            onClick={() => handleTabClick('AI')}
          >
            AI
          </Tab>
        </TabsContainer>
        
        <ContentSection active={true}>
          {renderContent()}
        </ContentSection>
      </ShowcaseWrapper>
    </GlobalStyle>
  );
} 