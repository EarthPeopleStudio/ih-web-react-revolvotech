import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// Main wrapper
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

// Header section styling
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

// Tab navigation styling
const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 50px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  gap: 6px;
  
  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const Tab = styled.button`
  padding: 12px 16px;
  border: none;
  background: ${(props) => (props.active ? "rgba(255, 84, 112, 0.15)" : "transparent")};
  color: ${(props) => (props.active ? "var(--text-primary)" : "var(--text-secondary)")};
  font-size: 0.9rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  flex: 0 1 auto;
  white-space: nowrap;
  
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
      width: 20px;
      height: 2px;
      background: #ff5470;
      border-radius: 2px;
    }
  `}
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.8rem;
    flex-basis: calc(33.333% - 6px);
  }
  
  @media (max-width: 480px) {
    flex-basis: calc(50% - 6px);
  }
`;

// Content section styling
const ContentSection = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  animation: ${props => props.active ? 'fadeIn 0.5s ease' : 'none'};
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Tech grid styling
const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const TechCategory = styled.div`
  background: var(--card-bg);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || "#ff5470"};
  }
`;

const CategoryTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 12px;
    color: ${props => props.color || "#ff5470"};
  }
`;

// Tech list styling
const TechList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TechItem = styled.li`
  color: var(--text-secondary);
  margin-bottom: 12px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
    color: var(--text-primary);
  }

  &:last-child {
    border-bottom: none;
  }
  
  &:before {
    content: "✓";
    color: ${props => props.color || "#ff5470"};
    margin-right: 12px;
    font-weight: bold;
  }
`;

// Code examples styling
const CodeExamplesContainer = styled.div`
  margin-top: 70px;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
  color: var(--text-primary);
  text-align: center;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 3px;
    background: #ff5470;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 40px;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, ${props => props.color || "#ff5470"}, transparent);
  }
`;

const CodeTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: ${props => props.color || "#ff5470"};
  }
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CodeLanguage = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Code = styled.pre`
  color: var(--text-secondary);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  padding: 5px;
  
  .keyword { color: #ff5470; }
  .string { color: #9cec5b; }
  .comment { color: #6c7a89; font-style: italic; }
  .function { color: #50c4ed; }
  .variable { color: #f0c674; }
`;

// Demo components styling
const DemoSection = styled.div`
  margin-top: 70px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid var(--border-color);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
`;

const DemoTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
  color: var(--text-primary);
  text-align: center;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 3px;
    background: #ff5470;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const DemoItem = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const DemoTitle2 = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const DemoDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
`;

// Interactive elements styling
const Button = styled.button`
  padding: 12px 20px;
  background: ${props => props.primary ? 'linear-gradient(45deg, #ff5470, #e03658)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.primary ? 'white' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.primary ? 'transparent' : 'var(--border-color)'};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, ${props => props.primary ? '0.3' : '0.15'});
    color: white;
    background: ${props => props.primary ? 'linear-gradient(45deg, #ff5470, #e03658)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

// Interactive demo components
const WebCounter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <DemoItem>
      <DemoTitle2>Interactive Counter</DemoTitle2>
      <DemoDescription>Simple React state management demo</DemoDescription>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '15px',
        marginTop: '15px' 
      }}>
        <Button 
          onClick={() => setCount(count - 1)}
          style={{ 
            background: '#e74c3c',
            fontSize: '1.2rem',
            padding: '0 15px'
          }}
        >-</Button>
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          minWidth: '50px',
          textAlign: 'center'
        }}>{count}</div>
        <Button 
          onClick={() => setCount(count + 1)}
          style={{ 
            background: '#2ecc71',
            fontSize: '1.2rem',
            padding: '0 15px'
          }}
        >+</Button>
      </div>
    </DemoItem>
  );
};

const AnimatedCard = () => {
  return (
    <DemoItem>
      <DemoTitle2>Animated Card</DemoTitle2>
      <DemoDescription>CSS transitions and transforms</DemoDescription>
      <div
        style={{
          marginTop: '15px',
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          transform: 'perspective(1000px) rotateX(0) rotateY(0)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = (x - centerX) / 15;
          const rotateX = (centerY - y) / 15;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }}
      >
        <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem' }}>Hover Me</h3>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>This card uses modern CSS transforms</p>
      </div>
    </DemoItem>
  );
};

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  return (
    <DemoItem>
      <DemoTitle2>Theme Switcher</DemoTitle2>
      <DemoDescription>Toggle between dark and light mode</DemoDescription>
      <div
        style={{
          marginTop: '15px',
          background: isDarkMode ? '#1a1a2e' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#1a1a2e',
          borderRadius: '10px',
          padding: '20px',
          transition: 'all 0.3s ease',
          border: isDarkMode ? '1px solid #333' : '1px solid #ddd'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '1.1rem' 
          }}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </h3>
          <div 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              width: '50px',
              height: '24px',
              background: isDarkMode ? '#4a5568' : '#cbd5e0',
              borderRadius: '12px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                background: isDarkMode ? '#f6ad55' : '#4299e1',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: isDarkMode ? '28px' : '2px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: '#fff'
              }}
            >
              {isDarkMode ? '☾' : '☀'}
            </div>
          </div>
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: '0.9rem'
        }}>
          This component demonstrates theme switching using React state.
        </p>
      </div>
    </DemoItem>
  );
};

// Mobile app demo
const MobileAppDemo = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const screens = {
    home: (
      <div style={{ padding: '10px' }}>
        <h4 style={{ margin: '0 0 15px', fontSize: '1.1rem', textAlign: 'center' }}>Home</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '10px' 
        }}>
          {['Profile', 'Messages', 'Settings', 'Help'].map(item => (
            <div 
              key={item}
              onClick={() => setActiveScreen(item.toLowerCase())}
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '15px 10px',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    profile: (
      <div style={{ padding: '10px' }}>
        <h4 style={{ margin: '0 0 15px', fontSize: '1.1rem', textAlign: 'center' }}>Profile</h4>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'rgba(253, 126, 20, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#fd7e14'
          }}>
            U
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>User Name</div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>@username</div>
          
          <div style={{
            width: '100%',
            padding: '8px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            marginTop: '10px',
            fontSize: '0.9rem'
          }}>
            Edit Profile
          </div>
        </div>
      </div>
    ),
    messages: (
      <div style={{ padding: '10px' }}>
        <h4 style={{ margin: '0 0 15px', fontSize: '1.1rem', textAlign: 'center' }}>Messages</h4>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '10px'
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              display: 'flex',
              gap: '10px',
              padding: '10px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'rgba(253, 126, 20, 0.15)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {i}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Contact {i}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                  Latest message preview...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    settings: (
      <div style={{ padding: '10px' }}>
        <h4 style={{ margin: '0 0 15px', fontSize: '1.1rem', textAlign: 'center' }}>Settings</h4>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '10px'
        }}>
          {['Account', 'Privacy', 'Notifications', 'Display', 'Help & Support'].map(item => (
            <div key={item} style={{
              padding: '12px 10px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '0.9rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {item}
              <span>›</span>
            </div>
          ))}
        </div>
      </div>
    ),
    help: (
      <div style={{ padding: '10px' }}>
        <h4 style={{ margin: '0 0 15px', fontSize: '1.1rem', textAlign: 'center' }}>Help</h4>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '15px',
          fontSize: '0.9rem',
          padding: '10px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px'
        }}>
          <p style={{ margin: 0 }}>Need assistance with your app?</p>
          <p style={{ margin: 0 }}>Contact our support team or check out the FAQ.</p>
          <Button primary style={{ marginTop: '10px' }}>Contact Support</Button>
        </div>
      </div>
    )
  };
  
  return (
    <DemoItem>
      <DemoTitle2>Mobile App Interface</DemoTitle2>
      <DemoDescription>React Native-style mobile UI</DemoDescription>
      <div style={{ 
        marginTop: '15px',
        width: '100%',
        maxWidth: '280px',
        margin: '15px auto 0',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '10px solid rgba(0,0,0,0.8)',
        height: '480px',
        background: '#111',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        {/* Status bar */}
        <div style={{
          height: '30px',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 15px',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.8)'
        }}>
          <span>12:30</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span>4G</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Content area */}
        <div style={{
          height: 'calc(100% - 80px)',
          background: '#222',
          overflow: 'auto',
          position: 'relative'
        }}>
          {screens[activeScreen]}
          
          {/* Menu overlay */}
          {menuOpen && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px'
              }}
              onClick={() => setMenuOpen(false)}
            >
              <h4 style={{ color: '#fd7e14', marginBottom: '20px' }}>Menu</h4>
              {['Home', 'Profile', 'Messages', 'Settings', 'Help', 'Logout'].map(item => (
                <div 
                  key={item}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.toLowerCase() !== 'logout') {
                      setActiveScreen(item.toLowerCase());
                    }
                    setMenuOpen(false);
                  }}
                  style={{
                    padding: '15px 10px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Bottom navigation */}
        <div style={{
          height: '50px',
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          {['home', 'profile', 'messages'].map(screen => (
            <div 
              key={screen}
              onClick={() => setActiveScreen(screen)}
              style={{
                width: '50px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: activeScreen === screen ? 'rgba(253, 126, 20, 0.2)' : 'transparent',
                color: activeScreen === screen ? '#fd7e14' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                textTransform: 'capitalize'
              }}
            >
              {screen[0].toUpperCase()}
            </div>
          ))}
          <div 
            onClick={() => setMenuOpen(true)}
            style={{
              width: '50px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: 'rgba(255,255,255,0.6)'
            }}
          >
            ☰
          </div>
        </div>
      </div>
    </DemoItem>
  );
};

// Game Development demo
const GameDemo = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef(null);
  const playerPosRef = useRef({ x: 50, y: 50 });
  const targetPosRef = useRef({ x: 150, y: 150 });

  useEffect(() => {
    if (isPlaying) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Start game loop
      gameLoopRef.current = setInterval(() => {
        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw player
        ctx.fillStyle = '#fd7e14';
        ctx.fillRect(playerPosRef.current.x, playerPosRef.current.y, 20, 20);
        
        // Draw target
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(targetPosRef.current.x, targetPosRef.current.y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw score
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
        
        // Check for collision
        const dx = playerPosRef.current.x + 10 - targetPosRef.current.x;
        const dy = playerPosRef.current.y + 10 - targetPosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 20) {
          // Move target to a new position
          targetPosRef.current = {
            x: Math.random() * (canvas.width - 20) + 10,
            y: Math.random() * (canvas.height - 20) + 10
          };
          
          // Increase score
          setScore(prev => prev + 1);
        }
      }, 16);
      
      // Add keyboard event listeners
      const handleKeyDown = (e) => {
        const speed = 5;
        const { x, y } = playerPosRef.current;
        
        switch (e.key) {
          case 'ArrowUp':
            playerPosRef.current.y = Math.max(0, y - speed);
            break;
          case 'ArrowDown':
            playerPosRef.current.y = Math.min(canvas.height - 20, y + speed);
            break;
          case 'ArrowLeft':
            playerPosRef.current.x = Math.max(0, x - speed);
            break;
          case 'ArrowRight':
            playerPosRef.current.x = Math.min(canvas.width - 20, x + speed);
            break;
          default:
            break;
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        clearInterval(gameLoopRef.current);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isPlaying, score]);
  
  // Handle canvas click events for mobile users
  const handleCanvasClick = (e) => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Move player towards click position
    const dx = x - playerPosRef.current.x;
    const dy = y - playerPosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) {
      const speed = 5;
      const dirX = dx / distance;
      const dirY = dy / distance;
      
      playerPosRef.current.x += dirX * speed;
      playerPosRef.current.y += dirY * speed;
    }
  };
  
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    playerPosRef.current = { x: 50, y: 50 };
    targetPosRef.current = { x: 150, y: 150 };
  };
  
  const stopGame = () => {
    setIsPlaying(false);
    clearInterval(gameLoopRef.current);
  };

  return (
    <DemoItem>
      <DemoTitle2>Simple Game Engine</DemoTitle2>
      <DemoDescription>Canvas-based 2D game demo</DemoDescription>
      <div style={{
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          onClick={handleCanvasClick}
          style={{
            background: '#1a1a2e',
            borderRadius: '8px',
            cursor: 'crosshair',
            touchAction: 'none'
          }}
        />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#ff5470', '#2ecc71', '#3498db'].map(color => (
              <div
                key={color}
                style={{
                  width: '20px',
                  height: '20px',
                  background: color,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: isPlaying && playerPosRef.current.x === 50 && playerPosRef.current.y === 50 ? '2px solid white' : '1px solid #666'
                }}
              />
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '0.8rem' }}>Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={20}
              onChange={(e) => {
                // Handle size change
              }}
              style={{
                width: '80px'
              }}
            />
          </div>
          
          <Button 
            onClick={isPlaying ? stopGame : startGame}
            primary
            style={{ 
              fontSize: '0.8rem', 
              padding: '5px 10px' 
            }}
          >
            {isPlaying ? 'Stop Game' : 'Start Game'}
          </Button>
        </div>
      </div>
    </DemoItem>
  );
};

// Backend & API demo
const ApiDemo = () => {
  const [endpoint, setEndpoint] = useState('users');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  
  const mockData = {
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
    ],
    products: [
      { id: 101, name: 'Smartphone', price: 799, inStock: true },
      { id: 102, name: 'Laptop', price: 1299, inStock: true },
      { id: 103, name: 'Headphones', price: 199, inStock: false }
    ],
    orders: [
      { id: 1001, userId: 2, products: [101, 103], total: 998, status: 'shipped' },
      { id: 1002, userId: 1, products: [102], total: 1299, status: 'processing' },
      { id: 1003, userId: 3, products: [101], total: 799, status: 'delivered' }
    ]
  };
  
  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API request
    setTimeout(() => {
      try {
        if (mockData[endpoint]) {
          setResponse({
            status: 200,
            data: mockData[endpoint],
            headers: {
              'content-type': 'application/json',
              'cache-control': 'max-age=3600'
            }
          });
        } else {
          throw new Error('Endpoint not found');
        }
        setLoading(false);
      } catch (err) {
        setError({
          status: 404,
          message: err.message
        });
        setResponse(null);
        setLoading(false);
      }
    }, 800);
  };
  
  const formatJson = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <DemoItem>
      <DemoTitle2>API Endpoint Simulator</DemoTitle2>
      <DemoDescription>Backend REST API demo</DemoDescription>
      <div style={{
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <select
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              background: '#222',
              color: 'white',
              border: '1px solid #444',
              outline: 'none'
            }}
          >
            <option value="users">GET /api/users</option>
            <option value="products">GET /api/products</option>
            <option value="orders">GET /api/orders</option>
          </select>
          <Button
            onClick={fetchData}
            primary
            style={{ 
              minWidth: 'auto', 
              background: '#3498db',
              padding: '8px 12px',
              fontSize: '0.9rem'
            }}
          >
            {loading ? 'Loading...' : 'Send Request'}
          </Button>
        </div>
        
        <div style={{
          background: '#1a1a2e',
          borderRadius: '8px',
          padding: '15px',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          overflow: 'auto',
          maxHeight: '200px',
          color: 'white',
          whiteSpace: 'pre-wrap'
        }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Loading...
            </div>
          )}
          
          {!loading && error && (
            <div style={{ color: '#e74c3c' }}>
              Error: {error.status} - {error.message}
            </div>
          )}
          
          {!loading && response && (
            <>
              <div style={{ color: '#2ecc71', marginBottom: '10px' }}>
                Status: {response.status} OK
              </div>
              <div style={{ color: '#f39c12', marginBottom: '10px' }}>
                Headers: {formatJson(response.headers)}
              </div>
              <div style={{ color: '#3498db' }}>
                Response: {formatJson(response.data)}
              </div>
            </>
          )}
          
          {!loading && !response && !error && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#aaa' }}>
              Click "Send Request" to see the API response.
            </div>
          )}
        </div>
      </div>
    </DemoItem>
  );
};

// UI/UX Design demo
const ColorPaletteDemo = () => {
  const [primaryColor, setPrimaryColor] = useState('#3498db');
  const [secondaryColor, setSecondaryColor] = useState('#e74c3c');
  const [accentColor, setAccentColor] = useState('#2ecc71');
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5');
  const [textColor, setTextColor] = useState('#333333');
  
  const generateComplementary = (color) => {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    // Get complementary colors
    const rComp = 255 - r;
    const gComp = 255 - g;
    const bComp = 255 - b;
    
    // Convert back to hex
    return `#${rComp.toString(16).padStart(2, '0')}${gComp.toString(16).padStart(2, '0')}${bComp.toString(16).padStart(2, '0')}`;
  };
  
  const handleColorChange = (colorType, value) => {
    switch (colorType) {
      case 'primary':
        setPrimaryColor(value);
        break;
      case 'secondary':
        setSecondaryColor(value);
        break;
      case 'accent':
        setAccentColor(value);
        break;
      case 'background':
        setBackgroundColor(value);
        break;
      case 'text':
        setTextColor(value);
        break;
      default:
        break;
    }
  };
  
  const ColorInput = ({ label, value, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
      <span style={{ minWidth: '100px', fontSize: '0.9rem' }}>{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '30px',
          height: '30px',
          border: 'none',
          borderRadius: '4px',
          background: 'transparent',
          cursor: 'pointer'
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '80px',
          padding: '4px 8px',
          border: '1px solid #444',
          borderRadius: '4px',
          background: '#222',
          color: '#fff',
          fontSize: '0.9rem'
        }}
      />
    </div>
  );

  return (
    <DemoItem>
      <DemoTitle2>Color Palette Generator</DemoTitle2>
      <DemoDescription>Interactive design system tool</DemoDescription>
      <div style={{
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <ColorInput 
            label="Primary" 
            value={primaryColor} 
            onChange={(val) => handleColorChange('primary', val)} 
          />
          <ColorInput 
            label="Secondary" 
            value={secondaryColor} 
            onChange={(val) => handleColorChange('secondary', val)} 
          />
          <ColorInput 
            label="Accent" 
            value={accentColor} 
            onChange={(val) => handleColorChange('accent', val)} 
          />
          <ColorInput 
            label="Background" 
            value={backgroundColor} 
            onChange={(val) => handleColorChange('background', val)} 
          />
          <ColorInput 
            label="Text" 
            value={textColor} 
            onChange={(val) => handleColorChange('text', val)} 
          />
        </div>
        
        <div style={{
          marginTop: '5px',
          padding: '15px',
          borderRadius: '8px',
          background: backgroundColor,
          color: textColor,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px', color: primaryColor, fontSize: '1.1rem' }}>
            Preview
          </h3>
          <p style={{ margin: '0 0 15px', fontSize: '0.9rem' }}>
            This is how your color scheme looks in practice.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button style={{
              background: primaryColor,
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              Primary
            </button>
            <button style={{
              background: secondaryColor,
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              Secondary
            </button>
            <button style={{
              background: accentColor,
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              Accent
            </button>
          </div>
          <div style={{
            padding: '10px',
            borderRadius: '4px',
            border: `1px solid ${primaryColor}`,
            fontSize: '0.85rem'
          }}>
            Sample text in a bordered container with your color scheme.
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px'
        }}>
          <div style={{
            width: '48%',
            padding: '10px',
            borderRadius: '8px',
            background: primaryColor,
            color: generateComplementary(primaryColor),
            textAlign: 'center',
            fontSize: '0.85rem'
          }}>
            Primary + Complement
          </div>
          <div style={{
            width: '48%',
            padding: '10px',
            borderRadius: '8px',
            background: secondaryColor,
            color: generateComplementary(secondaryColor),
            textAlign: 'center',
            fontSize: '0.85rem'
          }}>
            Secondary + Complement
          </div>
        </div>
      </div>
    </DemoItem>
  );
};

// Digital Art Demo
const DrawingCanvasDemo = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(5);
  const positionRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize canvas with black background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setIsDrawing(true);
      positionRef.current = { x, y };
    };
    
    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.strokeStyle = brushColor;
      
      ctx.beginPath();
      ctx.moveTo(positionRef.current.x, positionRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      positionRef.current = { x, y };
    };
    
    const handleMouseUp = () => {
      setIsDrawing(false);
    };
    
    const handleTouchStart = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      setIsDrawing(true);
      positionRef.current = { x, y };
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.strokeStyle = brushColor;
      
      ctx.beginPath();
      ctx.moveTo(positionRef.current.x, positionRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      positionRef.current = { x, y };
    };
    
    const handleTouchEnd = () => {
      setIsDrawing(false);
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    
    // Clean up
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDrawing, brushColor, brushSize]);
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  const colorOptions = [
    '#ffffff', '#ff5252', '#ffb74d', '#ffff00', 
    '#4caf50', '#2196f3', '#9c27b0', '#f06292'
  ];

  return (
    <DemoItem>
      <DemoTitle2>Drawing Canvas</DemoTitle2>
      <DemoDescription>Digital art & illustration tool</DemoDescription>
      <div style={{
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          style={{
            borderRadius: '8px',
            cursor: 'crosshair',
            touchAction: 'none'
          }}
        />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {colorOptions.map(color => (
              <div
                key={color}
                onClick={() => setBrushColor(color)}
                style={{
                  width: '20px',
                  height: '20px',
                  background: color,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: brushColor === color ? '2px solid white' : '1px solid #666'
                }}
              />
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '0.8rem' }}>Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
              style={{
                width: '80px'
              }}
            />
          </div>
          
          <Button 
            onClick={clearCanvas}
            style={{ 
              fontSize: '0.8rem', 
              padding: '5px 10px' 
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </DemoItem>
  );
};

// AI & IoT Demo
const SentimentAnalyzerDemo = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const analyzeText = () => {
    if (!text.trim()) return;
    
    setLoading(true);
    
    // Simple mock sentiment analysis
    setTimeout(() => {
      let score = 0;
      
      // Very basic sentiment analysis based on keywords
      const positiveWords = [
        'good', 'great', 'excellent', 'amazing', 'love', 'happy', 'awesome',
        'wonderful', 'best', 'positive', 'beautiful', 'perfect', 'joy'
      ];
      
      const negativeWords = [
        'bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'worst',
        'negative', 'poor', 'disappointing', 'ugly', 'angry', 'failed'
      ];
      
      const words = text.toLowerCase().split(/\s+/);
      
      words.forEach(word => {
        if (positiveWords.includes(word)) score += 1;
        if (negativeWords.includes(word)) score -= 1;
      });
      
      let sentiment;
      if (score > 2) sentiment = 'Very Positive';
      else if (score > 0) sentiment = 'Positive';
      else if (score === 0) sentiment = 'Neutral';
      else if (score > -3) sentiment = 'Negative';
      else sentiment = 'Very Negative';
      
      setResult({
        sentiment,
        score,
        confidence: Math.min(Math.abs(score) * 15 + 50, 99),
        keywords: words.filter(word => 
          positiveWords.includes(word) || negativeWords.includes(word)
        )
      });
      
      setLoading(false);
    }, 1000);
  };
  
  const getSentimentColor = () => {
    if (!result) return '#999';
    
    switch(result.sentiment) {
      case 'Very Positive': return '#2ecc71';
      case 'Positive': return '#78e08f';
      case 'Neutral': return '#f5f6fa';
      case 'Negative': return '#ff7979';
      case 'Very Negative': return '#eb4d4b';
      default: return '#999';
    }
  };

  return (
    <DemoItem>
      <DemoTitle2>Sentiment Analyzer</DemoTitle2>
      <DemoDescription>AI-powered text analysis</DemoDescription>
      <div style={{
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type some text to analyze sentiment..."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '10px',
            borderRadius: '8px',
            background: '#222',
            border: '1px solid #444',
            color: '#fff',
            resize: 'vertical',
            fontSize: '0.9rem'
          }}
        />
        
        <Button
          onClick={analyzeText}
          primary
          disabled={loading || !text.trim()}
          style={{ alignSelf: 'flex-end' }}
        >
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </Button>
        
        {result && (
          <div style={{
            marginTop: '5px',
            padding: '15px',
            borderRadius: '8px',
            background: '#1a1a2e',
            border: `1px solid ${getSentimentColor()}`
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <h4 style={{ 
                margin: 0, 
                fontSize: '1.1rem',
                color: getSentimentColor()
              }}>
                {result.sentiment}
              </h4>
              <div style={{ 
                fontSize: '0.8rem',
                color: '#aaa'
              }}>
                Confidence: {result.confidence}%
              </div>
            </div>
            
            <div style={{
              height: '10px',
              background: '#333',
              borderRadius: '5px',
              overflow: 'hidden',
              marginBottom: '15px'
            }}>
              <div style={{
                height: '100%',
                width: `${result.confidence}%`,
                background: getSentimentColor(),
                borderRadius: '5px'
              }} />
            </div>
            
            {result.keywords.length > 0 && (
              <>
                <div style={{ 
                  fontSize: '0.9rem',
                  marginBottom: '5px'
                }}>
                  Sentiment keywords detected:
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '5px'
                }}>
                  {result.keywords.map((word, index) => (
                    <span key={index} style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.1)',
                      fontSize: '0.8rem'
                    }}>
                      {word}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </DemoItem>
  );
};

// Web Development Section rendering function
const renderWebDevelopment = () => (
  <ContentSection>
      <TechGrid>
      <TechCategory color="#61dafb">
        <CategoryTitle color="#61dafb">Frontend Frameworks</CategoryTitle>
          <TechList>
          <TechItem>React</TechItem>
            <TechItem>Vue.js</TechItem>
          <TechItem>Angular</TechItem>
          <TechItem>Next.js</TechItem>
          <TechItem>Svelte</TechItem>
          </TechList>
        </TechCategory>
        
      <TechCategory color="#f0db4f">
        <CategoryTitle color="#f0db4f">JavaScript Libraries</CategoryTitle>
          <TechList>
          <TechItem>jQuery</TechItem>
          <TechItem>Redux</TechItem>
          <TechItem>MobX</TechItem>
          <TechItem>D3.js</TechItem>
          <TechItem>Three.js</TechItem>
          </TechList>
        </TechCategory>
        
      <TechCategory color="#e34c26">
        <CategoryTitle color="#e34c26">HTML/CSS Technologies</CategoryTitle>
          <TechList>
          <TechItem>HTML5</TechItem>
          <TechItem>CSS3</TechItem>
          <TechItem>Sass/SCSS</TechItem>
          <TechItem>Tailwind CSS</TechItem>
          <TechItem>Styled Components</TechItem>
          </TechList>
        </TechCategory>
      </TechGrid>
      
    <CodeExamplesContainer>
      <SectionTitle>Code Examples</SectionTitle>
      <CodeBlock>
        <CodeTitle>
          <CodeHeader>React Component</CodeHeader>
          <CodeLanguage>JavaScript</CodeLanguage>
        </CodeTitle>
        <Code>
{`import React, { useState, useEffect } from 'react';

const DataFetcher = ({ endpoint, render }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return render(data);
};

export default DataFetcher;`}
        </Code>
      </CodeBlock>
    </CodeExamplesContainer>
    
    <DemoSection>
      <DemoTitle>Interactive Demos</DemoTitle>
      <DemoGrid>
        <WebCounter />
        <AnimatedCard />
        <ThemeSwitcher />
      </DemoGrid>
    </DemoSection>
  </ContentSection>
);

// Mobile Development Section rendering function
const renderMobileDevelopment = () => (
  <ContentSection>
    <TechGrid>
      <TechCategory color="#61dafb">
        <CategoryTitle color="#61dafb">Cross-Platform</CategoryTitle>
        <TechList>
          <TechItem>React Native</TechItem>
          <TechItem>Flutter</TechItem>
          <TechItem>Ionic</TechItem>
          <TechItem>Xamarin</TechItem>
          <TechItem>Progressive Web Apps</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#3DDC84">
        <CategoryTitle color="#3DDC84">Native Android</CategoryTitle>
        <TechList>
          <TechItem>Kotlin</TechItem>
          <TechItem>Java</TechItem>
          <TechItem>Android SDK</TechItem>
          <TechItem>Android Jetpack</TechItem>
          <TechItem>Material Design</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#0C76E2">
        <CategoryTitle color="#0C76E2">Native iOS</CategoryTitle>
        <TechList>
          <TechItem>Swift</TechItem>
          <TechItem>SwiftUI</TechItem>
          <TechItem>Objective-C</TechItem>
          <TechItem>UIKit</TechItem>
          <TechItem>Core Data</TechItem>
        </TechList>
      </TechCategory>
    </TechGrid>
    
    <CodeExamplesContainer>
      <SectionTitle>Code Examples</SectionTitle>
      <CodeBlock>
        <CodeTitle>
          <CodeHeader>React Native Component</CodeHeader>
          <CodeLanguage>JavaScript</CodeLanguage>
        </CodeTitle>
        <Code>
{`import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress, color = '#007BFF' }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
});

export default CustomButton;`}
        </Code>
      </CodeBlock>
    </CodeExamplesContainer>
    
    <DemoSection>
      <DemoTitle>Interactive Demos</DemoTitle>
      <DemoGrid>
        <MobileAppDemo />
      </DemoGrid>
    </DemoSection>
  </ContentSection>
);

// Game Development Section rendering function
const renderGameDevelopment = () => (
  <ContentSection>
    <TechGrid>
      <TechCategory color="#cc0000">
        <CategoryTitle color="#cc0000">Game Engines</CategoryTitle>
        <TechList>
          <TechItem>Unity</TechItem>
          <TechItem>Unreal Engine</TechItem>
          <TechItem>Godot</TechItem>
          <TechItem>Phaser</TechItem>
          <TechItem>PlayCanvas</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#9B599B">
        <CategoryTitle color="#9B599B">3D & Graphics</CategoryTitle>
        <TechList>
          <TechItem>WebGL</TechItem>
          <TechItem>OpenGL</TechItem>
          <TechItem>DirectX</TechItem>
          <TechItem>Vulkan</TechItem>
          <TechItem>Metal</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#8855FF">
        <CategoryTitle color="#8855FF">AR/VR Technologies</CategoryTitle>
        <TechList>
          <TechItem>ARKit</TechItem>
          <TechItem>ARCore</TechItem>
          <TechItem>OpenXR</TechItem>
          <TechItem>WebXR</TechItem>
          <TechItem>SteamVR</TechItem>
        </TechList>
      </TechCategory>
    </TechGrid>
    
    <CodeExamplesContainer>
      <SectionTitle>Code Examples</SectionTitle>
      <CodeBlock>
        <CodeTitle>
          <CodeHeader>Unity C# Player Controller</CodeHeader>
          <CodeLanguage>C#</CodeLanguage>
        </CodeTitle>
        <Code>
{`using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Header("Movement Settings")]
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float jumpForce = 10f;
    
    private Rigidbody rb;
    private bool isGrounded;
    
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }
    
    void Update()
    {
        // Jump input
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            Jump();
        }
    }
    
    void FixedUpdate()
    {
        // Movement input
        float horizontalInput = Input.GetAxisRaw("Horizontal");
        float verticalInput = Input.GetAxisRaw("Vertical");
        
        Vector3 movement = new Vector3(horizontalInput, 0f, verticalInput).normalized;
        transform.Translate(movement * moveSpeed * Time.fixedDeltaTime);
    }
    
    void Jump()
    {
        rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        isGrounded = false;
    }
    
    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
        }
    }
}`}
        </Code>
      </CodeBlock>
    </CodeExamplesContainer>
    
    <DemoSection>
      <DemoTitle>Interactive Demos</DemoTitle>
      <DemoGrid>
        <GameDemo />
      </DemoGrid>
    </DemoSection>
  </ContentSection>
);

// Backend & Infrastructure Section rendering function
const renderBackendInfrastructure = () => (
  <ContentSection>
    <TechGrid>
      <TechCategory color="#6cc24a">
        <CategoryTitle color="#6cc24a">Backend Languages & Frameworks</CategoryTitle>
        <TechList>
          <TechItem>Node.js</TechItem>
          <TechItem>Python</TechItem>
          <TechItem>Java</TechItem>
          <TechItem>C#/.NET</TechItem>
          <TechItem>Go</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#0db7ed">
        <CategoryTitle color="#0db7ed">Cloud & DevOps</CategoryTitle>
        <TechList>
          <TechItem>AWS</TechItem>
          <TechItem>Azure</TechItem>
          <TechItem>Google Cloud Platform</TechItem>
          <TechItem>Docker</TechItem>
          <TechItem>Kubernetes</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#ff6b6b">
        <CategoryTitle color="#ff6b6b">Database Technologies</CategoryTitle>
        <TechList>
          <TechItem>MongoDB</TechItem>
          <TechItem>PostgreSQL</TechItem>
          <TechItem>MySQL</TechItem>
          <TechItem>Redis</TechItem>
          <TechItem>Firebase</TechItem>
        </TechList>
      </TechCategory>
    </TechGrid>
    
    <CodeExamplesContainer>
      <SectionTitle>Code Examples</SectionTitle>
      <CodeBlock>
        <CodeTitle>
          <CodeHeader>Node.js Express API with Auth</CodeHeader>
          <CodeLanguage>JavaScript</CodeLanguage>
        </CodeTitle>
        <Code>
{`const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// User schema/model would be imported here

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;`}
        </Code>
      </CodeBlock>
    </CodeExamplesContainer>
    
    <DemoSection>
      <DemoTitle>Interactive Demos</DemoTitle>
      <DemoGrid>
        <ApiDemo />
      </DemoGrid>
    </DemoSection>
  </ContentSection>
);

// Digital Art Section rendering function
const renderDigitalArt = () => (
  <ContentSection>
    <TechGrid>
      <TechCategory color="#ff7eb9">
        <CategoryTitle color="#ff7eb9">Graphics Software</CategoryTitle>
        <TechList>
          <TechItem>Adobe Photoshop</TechItem>
          <TechItem>Adobe Illustrator</TechItem>
          <TechItem>Affinity Designer</TechItem>
          <TechItem>Procreate</TechItem>
          <TechItem>GIMP</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#7f5af0">
        <CategoryTitle color="#7f5af0">Animation Tools</CategoryTitle>
        <TechList>
          <TechItem>After Effects</TechItem>
          <TechItem>Toon Boom Harmony</TechItem>
          <TechItem>Spine</TechItem>
          <TechItem>Lottie</TechItem>
          <TechItem>Rive</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#2cb67d">
        <CategoryTitle color="#2cb67d">3D Modeling</CategoryTitle>
        <TechList>
          <TechItem>Blender</TechItem>
          <TechItem>Maya</TechItem>
          <TechItem>Cinema 4D</TechItem>
          <TechItem>ZBrush</TechItem>
          <TechItem>Houdini</TechItem>
        </TechList>
      </TechCategory>
    </TechGrid>
    
    <CodeExamplesContainer>
      <SectionTitle>Code Examples</SectionTitle>
      <CodeBlock>
        <CodeTitle>
          <CodeHeader>SVG Animation with GSAP</CodeHeader>
          <CodeLanguage>JavaScript</CodeLanguage>
        </CodeTitle>
        <Code>
{`import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedLogo = () => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    const svg = svgRef.current;
    const paths = svg.querySelectorAll('path');
    
    // Reset animation state
    gsap.set(paths, { 
      strokeDasharray: 500,
      strokeDashoffset: 500, 
      fill: 'rgba(0, 0, 0, 0)' 
    });
    
    // Create timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    
    // Animate stroke drawing
    tl.to(paths, { 
      duration: 2, 
      strokeDashoffset: 0, 
      stagger: 0.2
    });
    
    // Animate fill color
    tl.to(paths, { 
      duration: 1, 
      fill: '#7f5af0', 
      stagger: 0.1
    }, '-=1');
    
    // Finish with a small bounce
    tl.to(svg, { 
      duration: 0.5, 
      scale: 1.05, 
      repeat: 1, 
      yoyo: true 
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <svg 
      ref={svgRef} 
      width="200" 
      height="200" 
      viewBox="0 0 100 100"
      style={{ 
        stroke: '#7f5af0', 
        strokeWidth: 2, 
        strokeLinecap: 'round',
        margin: '0 auto', 
        display: 'block' 
      }}
    >
      {/* SVG Paths would go here */}
      <path d="M20,50 A30,30 0 1,1 80,50 A30,30 0 1,1 20,50 Z" />
      <path d="M35,40 L45,60 L55,40 L65,60" />
    </svg>
  );
};

export default AnimatedLogo;`}
        </Code>
      </CodeBlock>
    </CodeExamplesContainer>
    
    <DemoSection>
      <DemoTitle>Interactive Demos</DemoTitle>
      <DemoGrid>
        <DrawingCanvasDemo />
      </DemoGrid>
    </DemoSection>
  </ContentSection>
);

// Project Management Section rendering function
const renderProjectManagement = () => (
  <ContentSection>
    <TechGrid>
      <TechCategory color="#ff9f1c">
        <CategoryTitle color="#ff9f1c">Project Management</CategoryTitle>
        <TechList>
          <TechItem>Jira</TechItem>
          <TechItem>Asana</TechItem>
          <TechItem>Trello</TechItem>
          <TechItem>Monday.com</TechItem>
          <TechItem>ClickUp</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#2ec4b6">
        <CategoryTitle color="#2ec4b6">Methodologies</CategoryTitle>
        <TechList>
          <TechItem>Scrum</TechItem>
          <TechItem>Kanban</TechItem>
          <TechItem>Agile</TechItem>
          <TechItem>Waterfall</TechItem>
          <TechItem>Lean</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#e71d36">
        <CategoryTitle color="#e71d36">Product Management</CategoryTitle>
        <TechList>
          <TechItem>Market Research</TechItem>
          <TechItem>User Stories</TechItem>
          <TechItem>Roadmapping</TechItem>
          <TechItem>A/B Testing</TechItem>
          <TechItem>Product Analytics</TechItem>
        </TechList>
      </TechCategory>
    </TechGrid>
    
    <CodeExamplesContainer>
      <SectionTitle>Code Examples</SectionTitle>
      <CodeBlock>
        <CodeTitle>
          <CodeHeader>Sprint Planning Template</CodeHeader>
          <CodeLanguage>Markdown</CodeLanguage>
        </CodeTitle>
        <Code>
{`# Sprint Planning Document

## Sprint Overview
- **Sprint Number:** #13
- **Duration:** 2 weeks (08/01/2024 - 08/15/2024)
- **Story Points Committed:** 89
- **Team Capacity:** 120 hours

## Sprint Goals
1. Complete user authentication system refactoring
2. Implement payment gateway integration
3. Finalize the product listing UI components
4. Improve API response times by 30%

## User Stories

### Authentication Refactoring
- [US-123] Implement OAuth 2.0 Social Login (13 pts)
  - Acceptance Criteria:
    - Users can login with Google, Facebook, Apple
    - Social profiles are linked to existing accounts if email matches
    - New accounts are created if no matching email exists
  - Assigned to: Alex
  - Dependencies: None

- [US-124] Two-Factor Authentication (8 pts)
  - Acceptance Criteria:
    - Users can enable/disable 2FA from settings
    - Support for SMS and authenticator app verification
    - Fallback recovery codes generated
  - Assigned to: Jordan
  - Dependencies: US-123

### Payment Integration
- [US-125] Stripe Payment Integration (21 pts)
  - Acceptance Criteria:
    - Support for credit card payments
    - Implement webhooks for payment notifications
    - Handle subscription billing
  - Assigned to: Taylor
  - Dependencies: None

## Risks and Mitigation
- Limited experience with OAuth implementation
  - Mitigation: Schedule pair programming sessions with senior developer

- Potential delays in Stripe API approval
  - Mitigation: Start with sandbox environment while awaiting approval

## Definition of Done
- Code reviewed and approved by at least one team member
- All unit tests passing
- Integration tests added
- Documentation updated
- Deployed to staging environment
- QA verification completed`}
        </Code>
      </CodeBlock>
    </CodeExamplesContainer>
  </ContentSection>
);

// Content & SEO Section rendering function
const renderContentSeo = () => (
  <ContentSection>
    <TechGrid>
      <TechCategory color="#0ea5e9">
        <CategoryTitle color="#0ea5e9">Content Strategy</CategoryTitle>
        <TechList>
          <TechItem>Content Auditing</TechItem>
          <TechItem>User Personas</TechItem>
          <TechItem>Editorial Calendars</TechItem>
          <TechItem>Keyword Research</TechItem>
          <TechItem>Content Gap Analysis</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#22c55e">
        <CategoryTitle color="#22c55e">SEO Techniques</CategoryTitle>
        <TechList>
          <TechItem>On-Page SEO</TechItem>
          <TechItem>Technical SEO</TechItem>
          <TechItem>Off-Page SEO</TechItem>
          <TechItem>Local SEO</TechItem>
          <TechItem>Mobile SEO</TechItem>
        </TechList>
      </TechCategory>
      
      <TechCategory color="#a855f7">
        <CategoryTitle color="#a855f7">Tools & Analytics</CategoryTitle>
        <TechList>
          <TechItem>Google Analytics</TechItem>
          <TechItem>SEMrush</TechItem>
          <TechItem>Ahrefs</TechItem>
          <TechItem>Moz</TechItem>
          <TechItem>Google Search Console</TechItem>
        </TechList>
      </TechCategory>
    </TechGrid>
    
    <CodeExamplesContainer>
      <SectionTitle>Code Examples</SectionTitle>
      <CodeBlock>
        <CodeTitle>
          <CodeHeader>Structured Data for SEO</CodeHeader>
          <CodeLanguage>JSON-LD</CodeLanguage>
        </CodeTitle>
        <Code>
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Professional Web Development Services",
  "description": "Custom web development services for businesses of all sizes. Modern tech stack, responsive design, and SEO optimization.",
  "image": "https://example.com/images/web-dev-services.jpg",
  "brand": {
    "@type": "Brand",
    "name": "YourCompany"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "1999",
    "highPrice": "9999",
    "priceCurrency": "USD",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "89"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "John Smith"
      },
      "datePublished": "2023-08-15",
      "reviewBody": "Excellent service and delivered on time. Our new website has increased conversions by 35%."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Johnson"
      },
      "datePublished": "2023-07-22",
      "reviewBody": "Very responsive team and great quality work. Would recommend for any business website needs."
    }
  ]
}
</script>`}
        </Code>
      </CodeBlock>
    </CodeExamplesContainer>
  </ContentSection>
);

const TechShowcase = () => {
  const [activeTab, setActiveTab] = useState('web-development');
  
  // Update tabs to include all tech sections
  const tabConfig = [
    { id: 'web-development', label: 'Web Development' },
    { id: 'mobile-development', label: 'Mobile Development' },
    { id: 'game-development', label: 'Game Development' },
    { id: 'backend-infrastructure', label: 'Backend & Infrastructure' },
    { id: 'ui-ux-design', label: 'UI/UX Design' },
    { id: 'digital-art', label: 'Digital Art' },
    { id: 'ai-iot', label: 'AI & IoT' },
    { id: 'project-management', label: 'Project Management' },
    { id: 'content-seo', label: 'Content & SEO' }
  ];
  
  // Render the active content section based on tab
  const renderActiveContent = () => {
    switch (activeTab) {
      case 'web-development':
        return renderWebDevelopment();
      case 'mobile-development':
        return renderMobileDevelopment();
      case 'game-development':
        return renderGameDevelopment();
      case 'backend-infrastructure':
        return renderBackendInfrastructure();
      case 'ui-ux-design':
        return renderUiUxDesign();
      case 'digital-art':
        return renderDigitalArt();
      case 'ai-iot':
        return renderAiIot();
      case 'project-management':
        return renderProjectManagement();
      case 'content-seo':
        return renderContentSeo();
      default:
        return renderWebDevelopment();
    }
  };

  return (
    <ShowcaseWrapper>
      <Title>Technology Showcase</Title>
      <Subtitle>Explore our expertise across different technology domains</Subtitle>
      
      <TabsContainer>
        {tabConfig.map(tab => (
          <Tab 
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabsContainer>
      
      {renderActiveContent()}
      
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <Button 
          primary 
          onClick={() => window.location.href = '/contact-us'}
          style={{ padding: '15px 30px', fontSize: '1.1rem' }}
        >
          Discuss Your Project With Us
        </Button>
      </div>
    </ShowcaseWrapper>
  );
};

export default TechShowcase; 