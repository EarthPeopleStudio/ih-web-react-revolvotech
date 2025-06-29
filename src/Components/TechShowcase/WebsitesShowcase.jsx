import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineCode, AiOutlineDesktop, AiOutlineMobile, AiOutlineGlobal } from 'react-icons/ai';

const circuitPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 182, 4, 0); }
  50% { box-shadow: 0 0 0 4px rgba(251, 182, 4, 0.1); }
`;

const digitalFlicker = keyframes`
  0%, 100% { opacity: 1; }
  2% { opacity: 0.8; }
  4% { opacity: 1; }
  6% { opacity: 0.9; }
  8% { opacity: 1; }
`;

// Styled components
const CodeShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;
`;

const CodeShowcaseItem = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(251, 182, 4, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
  position: relative;
  backdrop-filter: blur(10px);
  max-height: 600px;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(251, 182, 4, 0.3);
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const CodeShowcaseHeader = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, rgba(25, 25, 30, 0.98), rgba(35, 35, 40, 0.98));
  position: relative;
  z-index: 1;
`;

const CodeShowcaseTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #fbb604;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  
  svg {
    margin-right: 10px;
    color: #fbb604;
  }
`;

const CodeShowcaseDescription = styled.p`
  padding: 16px 28px;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  border-bottom: 1px solid rgba(251, 182, 4, 0.1);
  margin: 0;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.8), rgba(35, 35, 40, 0.8));
  position: relative;
  z-index: 1;
`;

const CodeDemoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0;
  position: relative;
  z-index: 1;
  flex: 1;
  overflow: hidden;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CodeSnippetContainer = styled.div`
  position: relative;
  border-radius: 0;
  overflow: hidden;
  background: rgba(25, 25, 25, 0.8);
  border: none;
  border-right: 1px solid rgba(251, 182, 4, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 968px) {
    border-right: none;
    border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  }
`;

const CodeHeader = styled.div`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.08), rgba(251, 182, 4, 0.05));
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #e0e0e0;
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
`;

const CodeFileName = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #fbb604;
`;

const CodeLanguage = styled.span`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.2), rgba(251, 182, 4, 0.15));
  padding: 4px 12px;
  border-radius: 6px;
  color: #fbb604;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(251, 182, 4, 0.3);
`;

const PreBlock = styled.pre`
  background: transparent;
  margin: 0;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #ffffff;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  flex: 1;
  max-height: 400px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 182, 4, 0.5);
  }
`;

const DemoContainer = styled.div`
  padding: ${props => props.$isSecondDemo ? '20px 75px 20px 15px' : '20px 65px 20px 15px'};
  background: linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(40, 40, 45, 0.9));
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  border: 1px solid rgba(251, 182, 4, 0.1);
  overflow: hidden;
  box-sizing: border-box;
  max-height: 600px;
  
  /* Ensure all child elements scale properly and center */
  > * {
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }
  
  /* Handle scrolling if content is too large */
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 182, 4, 0.5);
  }
`;

const DemoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  
  /* Ensure demo content doesn't overflow and centers properly */
  > * {
    max-width: 100%;
    max-height: 100%;
    transform-origin: center;
    margin: 0 auto;
  }
  
  /* Scale down large demos to fit properly */
  @media (max-width: 768px) {
    transform: scale(0.9);
  }
  
  @media (max-width: 480px) {
    transform: scale(0.8);
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

// Creative Analytics Dashboard Demo Component
const CreativeAgencyDashboard = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  const metrics = [
    {
      title: 'Revenue Growth',
      value: '+47%',
      subtitle: 'vs last month',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accent: '#4facfe',
      icon: '💰'
    },
    {
      title: 'Active Projects',
      value: '23',
      subtitle: 'in progress',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      accent: '#ff6b9d',
      icon: '🚀'
    },
    {
      title: 'Client Satisfaction',
      value: '96%',
      subtitle: 'rating average',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      accent: '#43e97b',
      icon: '⭐'
    }
  ];

  // Auto cycle through metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Pulse effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 600);
    }, 2000);
    
    return () => clearInterval(pulseInterval);
  }, []);
  
  return (
    <div style={{
    width: '100%',
      maxWidth: '520px',
      height: '441px',
      background: metrics[activeMetric].color,
      borderRadius: '20px',
      padding: '30px',
          position: 'relative',
    overflow: 'hidden',
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
      transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      margin: '0 auto'
    }}>
      {/* Background decorative elements */}
      <div style={{
          position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
        transform: pulseEffect ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.6s ease'
      }} />
      
      <div style={{
      position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%'
      }} />
      
      {/* Header */}
      <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
        marginBottom: '30px',
    position: 'relative',
        zIndex: 2
      }}>
            <div style={{
          color: 'white',
                  fontSize: '1.4rem',
          fontWeight: '700'
        }}>
          Analytics Dashboard
              </div>
              <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '8px 16px',
          borderRadius: '20px',
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          Live
          </div>
        </div>
        
      {/* Main metric display */}
              <div style={{
        textAlign: 'center',
        marginBottom: '30px',
                position: 'relative',
                    zIndex: 2
                  }}>
                  <div style={{
          fontSize: '4rem',
                            marginBottom: '10px',
          transform: pulseEffect ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.6s ease'
        }}>
          {metrics[activeMetric].icon}
                        </div>
                        
                        <div style={{
          color: 'white',
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '8px',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          {metrics[activeMetric].value}
                      </div>
                          
        <div style={{
          color: 'white',
          fontSize: '1.2rem',
                            fontWeight: '600',
          marginBottom: '5px'
        }}>
          {metrics[activeMetric].title}
                    </div>
          
            <div style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1rem'
        }}>
          {metrics[activeMetric].subtitle}
                </div>
                  </div>
          
      {/* Bottom stats */}
            <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
        marginBottom: '35px',
        position: 'relative',
                  zIndex: 2
            }}>
        {[
          { label: 'Conversion', value: '8.2%', trend: '↑' },
          { label: 'Sessions', value: '12.4K', trend: '↑' },
          { label: 'Bounce Rate', value: '24%', trend: '↓' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '14px',
                    borderRadius: '14px', 
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              {stat.value} <span style={{ color: metrics[activeMetric].accent }}>{stat.trend}</span>
                </div>
                <div style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.8rem'
            }}>
              {stat.label}
                </div>
                    </div>
                  ))}
        </div>
        
      {/* Navigation dots */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 2
      }}>
        {metrics.map((_, index) => (
          <div
            key={index}
          style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: index === activeMetric ? 'white' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.3s ease',
              boxShadow: index === activeMetric ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
            }}
          />
          ))}
        </div>
      </div>
  );
};

// Product Showcase Demo Component
const ProductShowcaseDemo = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const products = [
    {
      name: 'Ocean Wave Headphones',
      price: '$299',
      color: 'Deep Ocean',
      features: ['Crystal Clear Sound', '48hr Battery Life', 'Ocean-Inspired Design'],
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      accent: '#3b82f6'
    },
    {
      name: 'Tidal Pro Earbuds',
      price: '$199',
      color: 'Turquoise',
      features: ['Touch Controls', 'Waterproof IPX8', 'Tidal Sound Wave'],
      background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
      accent: '#0ea5e9'
    },
    {
      name: 'Azure Studio Cans',
      price: '$399',
      color: 'Electric Teal',
      features: ['Studio-grade Audio', 'Wireless + Wired', 'Premium Comfort'],
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      accent: '#10b981'
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
    height: '441px',
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
  alignItems: center;
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
            <DemoWrapper>
            <ProductShowcaseDemo />
            </DemoWrapper>
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
  width: \${props => props.size || '40px'};
  height: \${props => {
    if (props.type === 'circle' || props.type === 'square') {
      return props.size || '40px';
    } else if (props.type === 'triangle') {
      const size = parseInt(props.size) || 40;
      return \`\${size / 2}px\`;
    }
    return props.size || '40px';
  }};
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
          <DemoContainer $isSecondDemo>
            <DemoWrapper>
              <CreativeAgencyDashboard />
            </DemoWrapper>
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

export default WebsitesShowcase; 