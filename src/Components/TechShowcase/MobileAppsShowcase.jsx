import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineCode, AiOutlineMobile, AiOutlineTablet, AiOutlineApple, AiOutlineAndroid } from 'react-icons/ai';

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
  max-height: 900px;
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
  max-height: 600px;
  
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
  padding: 20px;
  background: linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(40, 40, 45, 0.9));
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 650px;
  border: 1px solid rgba(251, 182, 4, 0.1);
  overflow: hidden;
  box-sizing: border-box;
  max-height: 1100px;
  
  /* Ensure all child elements scale properly */
  > * {
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
  }
  
  /* Handle scrolling if content is still too large */
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
  
  /* Ensure demo content doesn't overflow */
  > * {
    max-width: 100%;
    max-height: 100%;
    transform-origin: center;
  }
  
  /* Scale down large demos to fit */
  @media (max-width: 768px) {
    transform: scale(0.85);
  }
`;

// Demo components will go here

// Mobile Navigation Demo Component
const MobileNavigationDemo = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  // Auto rotate between tabs every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextTab = activeTab === 'Home' 
        ? 'Profile' 
        : activeTab === 'Profile' 
          ? 'Settings' 
          : 'Home';
      handleTabChange(nextTab);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeTab]);
  
  // Pulse effect every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Show notification randomly
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [activeTab]);
  
  const demoContainerStyle = {
    width: '300px',
    height: '624px',
    background: 'linear-gradient(165deg, #1e40af 0%, #3b82f6 100%)',
    borderRadius: '36px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.1)',
    border: '8px solid #000000',
    transform: pulseEffect ? 'scale(1.02)' : 'scale(1)',
    transition: 'transform 0.4s ease-out',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
  
  const screenStyle = {
    width: '100%',
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
    transform: isAnimating ? 'translateX(-15px)' : 'translateX(0)',
    opacity: isAnimating ? 0 : 1,
  };
  
  const headerStyle = {
    padding: '20px 15px',
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(30,64,175,0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '28px 28px 0 0',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  };
  
  const contentStyle = {
    padding: '15px 5px 15px 10px',
    height: 'calc(100% - 140px)',
    overflowY: 'auto',
    msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
    scrollbarWidth: 'none', // Hide scrollbar in Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar in Chrome, Safari, and Opera
    },
  };
  
  const contentStyleObject = {
    padding: '15px 5px 15px 10px',
    height: 'calc(100% - 130px)',
    overflowY: 'auto',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  };
  
  // Add this style to actually hide the scrollbar
  const hideScrollbarStyle = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  
  const tabItemStyle = (isActive) => ({
    background: isActive ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(34, 197, 94, 0.15))' : 'rgba(255,255,255,0.02)',
    color: isActive ? '#10b981' : 'rgba(255,255,255,0.5)',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: '12px 0',
    fontSize: '10px',
    fontWeight: isActive ? '600' : '400',
    borderRadius: '14px',
    margin: '0 4px',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 5px 15px rgba(16, 185, 129, 0.25)' : 'none',
    transform: isActive ? 'translateY(-3px)' : 'translateY(0)',
    border: isActive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
  });
  
  // Content for each screen
  const renderHomeContent = () => (
    <div style={{ padding: '5px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #059669, #10b981)', 
        borderRadius: '20px', 
        padding: '22px 25px', 
        marginBottom: '20px',
        boxShadow: '0 15px 30px rgba(5, 150, 105, 0.35)',
        transform: pulseEffect ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '-15px', 
          right: '-15px', 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'rgba(255, 255, 255, 0.1)' 
        }}></div>
        <div style={{ 
          position: 'absolute', 
          bottom: '-20px', 
          left: '10px', 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: 'rgba(255, 255, 255, 0.1)' 
        }}></div>
        <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome back, Alex!</div>
        <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '12px' }}>Your fitness score: 85/100</div>
        <div style={{ marginTop: '12px', height: '6px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ 
            width: '85%', 
            height: '100%', 
            background: 'white', 
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
            transition: 'width 1.5s ease-in-out',
            animation: 'pulse 1.5s infinite alternate',
          }}></div>
        </div>
      </div>
      
      <div style={{ 
        fontSize: '15px', 
        fontWeight: 'bold', 
        color: 'white', 
        marginBottom: '15px', 
        paddingLeft: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        Today's Activities
        <span style={{ fontSize: '12px', color: '#64b5f6', fontWeight: 'normal' }}>View All</span>
      </div>
      
      {[
        { title: 'Morning Run', time: '7:30 AM', distance: '2.5 km', icon: '🏃‍♂️', color: 'linear-gradient(135deg, #2196f3, #64b5f6)' },
        { title: 'Yoga Session', time: '9:00 AM', distance: '30 min', icon: '🧘‍♂️', color: 'linear-gradient(135deg, #00bcd4, #80deea)' },
        { title: 'Evening Walk', time: '6:30 PM', distance: '1.8 km', icon: '🚶‍♀️', color: 'linear-gradient(135deg, #1976d2, #42a5f5)' }
      ].map((activity, index) => (
        <div key={index} style={{ 
          padding: '14px', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '14px', 
          marginBottom: '12px', 
          display: 'flex', 
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transform: `translateX(${index * -5}px)`,
          transition: 'all 0.3s ease',
          animation: `slideIn 0.5s ease forwards ${index * 0.1}s`,
          opacity: 0.9,
          ':hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          }
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '12px', 
            background: activity.color, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: '14px', 
            fontSize: '18px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
          }}>
            {activity.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>{activity.title}</div>
            <div style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: '11px', 
              display: 'flex', 
              justifyContent: 'space-between',
            }}>
              <span>{activity.time}</span>
              <span style={{ fontWeight: '600', color: '#64b5f6' }}>{activity.distance}</span>
            </div>
          </div>
        </div>
      ))}
      
      <div style={{ 
        fontSize: '15px', 
        fontWeight: 'bold', 
        color: 'white', 
        margin: '20px 0 15px', 
        paddingLeft: '5px' 
      }}>
        Daily Statistics
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        {[
          { label: 'Steps', value: '7,842', icon: '👣', color: 'linear-gradient(135deg, #2196f3, #64b5f6)' },
          { label: 'Calories', value: '352', icon: '🔥', color: 'linear-gradient(135deg, #0d47a1, #1976d2)' },
          { label: 'Water', value: '1.2L', icon: '💧', color: 'linear-gradient(135deg, #03a9f4, #4fc3f7)' }
        ].map((stat, index) => (
          <div key={index} style={{ 
            flex: 1, 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '14px', 
            padding: '15px 10px', 
            textAlign: 'center', 
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            transition: 'all 0.3s ease',
            transform: pulseEffect && index === 1 ? 'scale(1.05)' : 'scale(1)',
          }}>
            <div style={{ 
              marginBottom: '8px', 
              width: '36px', 
              height: '36px',
              borderRadius: '12px',
              background: stat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              margin: '0 auto 8px',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)'
            }}>{stat.icon}</div>
            <div style={{ color: 'white', fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>{stat.value}</div>
            <div style={{ 
              background: 'linear-gradient(135deg, #00b0ab, #1dd1a1)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '14px', 
              fontWeight: '700',
              marginBottom: '2px'
            }}>{stat.value}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '10px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderProfileContent = () => (
    <div style={{ padding: '5px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '10px 0 20px',
        position: 'relative',
      }}>
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(135deg, #00b0ab 0%, #1dd1a1 100%)',
          opacity: 0.3,
          borderRadius: '20px',
          zIndex: 0,
        }}></div>
        <div style={{ 
          width: '85px', 
          height: '85px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #00b0ab 0%, #1dd1a1 100%)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '28px', 
          color: 'white', 
          marginBottom: '12px',
          border: '3px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 1,
          marginTop: '30px',
          position: 'relative',
          transition: 'transform 0.3s ease',
          transform: pulseEffect ? 'scale(1.05)' : 'scale(1)',
        }}>
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#00d2ff',
            border: '2px solid white',
            zIndex: 2,
          }}></div>
          😊
        </div>
        <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Alex Johnson</div>
        <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '13px', marginBottom: '18px' }}>Fitness Enthusiast</div>
        
        <div style={{ 
          display: 'flex', 
          width: '90%', 
          justifyContent: 'space-between', 
          marginBottom: '25px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '14px',
          padding: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ 
            textAlign: 'center',
            padding: '0 10px',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.7)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '18px', 
              fontWeight: 'bold' 
            }}>32</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>Workouts</div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            padding: '0 10px',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.7)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '18px', 
              fontWeight: 'bold' 
            }}>124</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>Following</div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            padding: '0 10px',
          }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.7)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '18px', 
              fontWeight: 'bold' 
            }}>85</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSettingsContent = () => (
    <div style={{ padding: '5px' }}>
      <div style={{ 
        fontSize: '15px', 
        fontWeight: 'bold', 
        color: 'white', 
        marginBottom: '18px', 
        paddingLeft: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', 
      }}>
        App Settings
        <span style={{ fontSize: '12px', color: 'white', fontWeight: 'normal' }}>Reset All</span>
      </div>
      
      {[
        { title: 'Notifications', desc: 'Manage your alerts and reminders', icon: '🔔', toggle: true, activated: true },
        { title: 'Privacy', desc: 'Control your data and visibility', icon: '🔒', toggle: false },
        { title: 'Theme', desc: 'Change app appearance', icon: '🎨', toggle: false },
        { title: 'Language', desc: 'English (US)', icon: '🌐', toggle: false },
        { title: 'Sync with Devices', desc: 'Connect with wearables and smart devices', icon: '⌚', toggle: true, activated: true }
      ].map((setting, index) => (
        <div key={index} style={{ 
          padding: '15px', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '14px', 
          marginBottom: '12px', 
          display: 'flex', 
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s ease',
          animation: `fadeIn 0.8s ease forwards ${index * 0.1}s`,
          opacity: 0.9,
        }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: setting.activated 
              ? 'linear-gradient(135deg, rgba(0, 176, 155, 0.2), rgba(29, 209, 161, 0.15))' 
              : 'rgba(255, 255, 255, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: '15px', 
            fontSize: '18px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)'
          }}>
            {setting.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{setting.title}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>{setting.desc}</div>
          </div>
          {setting.toggle && (
            <div style={{ 
              width: '46px', 
              height: '24px', 
              borderRadius: '12px', 
              background: setting.activated ? 'linear-gradient(135deg, #00b0ab, #1dd1a1)' : 'rgba(255, 255, 255, 0.15)', 
              padding: '2px', 
              position: 'relative',
              transition: 'background 0.3s ease',
              boxShadow: setting.activated ? '0 2px 8px rgba(0, 176, 155, 0.5)' : 'none',
            }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                background: 'white', 
                position: 'absolute', 
                left: setting.activated ? '24px' : '2px', 
                transition: 'left 0.3s ease',
                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
              }}></div>
            </div>
          )}
        </div>
      ))}
      
      <div style={{ 
        fontSize: '15px', 
        fontWeight: 'bold', 
        color: 'white', 
        margin: '25px 0 18px', 
        paddingLeft: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        Account Options
      </div>
      
      {[
        { title: 'Help & Support', desc: 'Get assistance and FAQ', icon: '❓' },
        { title: 'About App', desc: 'Version 2.1.3', icon: 'ℹ️' },
        { title: 'Log Out', desc: 'Sign out from your account', icon: '🚪' }
      ].map((option, index) => (
        <div key={index} style={{ 
          padding: '15px', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '14px', 
          marginBottom: '12px', 
          display: 'flex', 
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'rgba(255, 255, 255, 0.05)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: '15px', 
            fontSize: '18px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)'
          }}>
            {option.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{option.title}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>{option.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return renderHomeContent();
      case 'Profile':
        return renderProfileContent();
      case 'Settings':
        return renderSettingsContent();
      default:
        return renderHomeContent();
    }
  };
  
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 400);
  };
  
  // Animation keyframes
  const keyframeStyle = `
    @keyframes slideIn {
      from { transform: translateX(20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      from { opacity: 1; }
      to { opacity: 0.8; }
    }
  `;
  
  return (
    <div style={{position: 'relative'}}>
      {/* Side buttons */}
      <div style={{
        position: 'absolute',
        right: '-2px',
        top: '90px',
        width: '4px',
        height: '50px',
        background: '#000000',
        borderRadius: '2px 0 0 2px',
        zIndex: 10,
      }}></div>
      <div style={{
        position: 'absolute',
        right: '-2px',
        top: '150px',
        width: '4px',
        height: '60px',
        background: '#000000',
        borderRadius: '2px 0 0 2px',
        zIndex: 10,
      }}></div>
      <div style={{
        position: 'absolute',
        left: '-2px',
        top: '120px',
        width: '4px',
        height: '70px',
        background: '#000000',
        borderRadius: '0 2px 2px 0',
        zIndex: 10,
      }}></div>
      
      <div style={demoContainerStyle}>
        <style>
          {keyframeStyle}
          {hideScrollbarStyle}
        </style>
        
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '25px',
          background: '#000000',
          borderRadius: '0 0 16px 16px',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'rgba(60, 60, 60, 0.8)',
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'rgba(60, 60, 60, 0.9)',
          }}></div>
          <div style={{
            width: '8px',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(60, 60, 60, 0.8)',
          }}></div>
        </div>
        <div style={headerStyle}>
          <div style={{ 
            color: 'white', 
            fontSize: '18px', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ 
              color: '#ff5470', 
              fontSize: '18px', 
              marginRight: '2px',
              animation: pulseEffect ? 'pulse 0.8s infinite alternate' : 'none',
            }}>
              💪
            </span>
            {activeTab === 'Home' ? 'FitTrack' : activeTab}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              background: 'rgba(255, 255, 255, 0.05)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '14px', 
              color: 'rgba(255, 255, 255, 0.8)',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}>
              🔔
              {showNotification && (
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  right: '3px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ff5470',
                  border: '1px solid #1E1E24',
                  animation: 'pulse 1s infinite alternate',
                }}></div>
              )}
            </div>
          </div>
        </div>
        
        <div style={screenStyle}>
          <div className="hide-scrollbar" style={contentStyleObject}>
            {renderContent()}
          </div>
        </div>
        
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          padding: '15px', 
          background: 'rgba(0, 59, 99, 0.95)', 
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '0 0 28px 28px',
        }}>
          {['Home', 'Profile', 'Settings'].map((tab) => (
            <div key={tab} style={tabItemStyle(tab === activeTab)} onClick={() => handleTabChange(tab)}>
              <div style={{ 
                marginBottom: '8px', 
                fontSize: '18px',
                opacity: tab === activeTab ? 1 : 0.7,
                transform: tab === activeTab ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}>
                {tab === 'Home' ? '🏠' : tab === 'Profile' ? '👤' : '⚙️'}
              </div>
              <div>{tab}</div>
            </div>
          ))}
        </div>
        
        {/* Home indicator */}
        <div style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '2px',
          zIndex: 100,
        }}></div>
      </div>
    </div>
  );
};

// Flutter Card Demo Component
const FlutterCardDemo = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  
  // Auto rotate between screens every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextScreen = activeScreen === 'home' 
        ? 'cart' 
        : activeScreen === 'cart' 
          ? 'profile' 
          : 'home';
      handleNavChange(nextScreen);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeScreen]);
  
  // Pulse effect every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Show cart badge randomly
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBadge(true);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const demoContainerStyle = {
    width: '300px',
    height: '624px',
    background: 'linear-gradient(165deg, #7c2d12 0%, #ea580c 100%)',
    borderRadius: '36px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.1)',
    border: '8px solid #000000',
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    transform: pulseEffect ? 'scale(1.02)' : 'scale(1)',
    transition: 'transform 0.4s ease-out',
  };
  
  const screenStyle = {
    width: '100%',
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
    transform: isAnimating ? 'translateX(-15px)' : 'translateX(0)',
    opacity: isAnimating ? 0 : 1,
  };
  
  const headerStyle = {
    padding: '20px 15px',
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    marginBottom: '15px',
    background: 'rgba(124,45,18,0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '28px 28px 0 0',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
  };
  
  const contentStyleObject = {
    padding: '10px 0',
    height: 'calc(100% - 130px)',
    overflowY: 'auto',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  };
  
  // Add this style to hide the scrollbar
  const hideScrollbarStyle = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  
  const navItemStyle = (isActive) => ({
    background: isActive ? 'linear-gradient(135deg, rgba(255, 153, 0, 0.3), rgba(255, 214, 0, 0.15))' : 'rgba(255,255,255,0.02)',
    color: isActive ? '#FFD700' : 'rgba(255,255,255,0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: '12px 0',
    fontSize: '10px',
    fontWeight: isActive ? '600' : '400',
    borderRadius: '14px',
    margin: '0 4px',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 5px 15px rgba(255, 153, 0, 0.2)' : 'none',
    transform: isActive ? 'translateY(-3px)' : 'translateY(0)',
    border: isActive ? '1px solid rgba(255, 153, 0, 0.3)' : '1px solid transparent',
  });
  
  // Animation keyframes
  const keyframeStyle = `
    @keyframes slideIn {
      from { transform: translateX(20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0.8; transform: scale(1.05); }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
  `;
  
  const handleNavChange = (screen) => {
    if (screen === activeScreen) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setIsAnimating(false);
    }, 400);
  };
  
  // E-commerce app screens
  const renderHomeScreen = () => (
    <div style={{ animation: 'fadeIn 0.5s ease forwards' }}>
      <div style={{ 
        position: 'relative', 
        marginBottom: '20px',
        animation: pulseEffect ? 'pulse 1s infinite alternate' : 'none',
      }}>
        <div style={{ 
          height: '150px', 
          background: 'linear-gradient(135deg, #FF3D00, #FF9800)', 
          borderRadius: '24px', 
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 40px rgba(255, 61, 0, 0.35)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}>
          <div style={{ 
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}></div>
          <div style={{ 
            position: 'absolute',
            bottom: '-15px',
            left: '15px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}></div>
          <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', position: 'relative', zIndex: 2 }}>Summer Collection</div>
          <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', width: '60%', marginBottom: '15px', position: 'relative', zIndex: 2 }}>
            Discover our latest styles for the season
          </div>
          <div style={{ 
            background: 'white', 
            color: '#e53935', 
            padding: '10px 18px', 
            borderRadius: '24px', 
            fontSize: '12px', 
            fontWeight: 'bold',
            display: 'inline-block',
            alignSelf: 'flex-start',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            zIndex: 2,
            transition: 'all 0.3s ease',
          }}>Shop Now</div>
          <div style={{ 
            position: 'absolute', 
            right: '15px', 
            bottom: '-20px', 
            fontSize: '70px',
            opacity: 0.8,
            transform: 'rotate(15deg)',
            animation: 'float 3s ease-in-out infinite',
          }}>👕</div>
        </div>
      </div>
      
      <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Categories
        <span style={{ fontSize: '12px', color: '#ff3d00', fontWeight: 'normal' }}>See All</span>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '5px' }} className="hide-scrollbar">
        {[
          { icon: '👕', name: 'Shirts' },
          { icon: '👖', name: 'Jeans' },
          { icon: '👟', name: 'Shoes' },
          { icon: '🧥', name: 'Jackets' },
          { icon: '👜', name: 'Bags' }
        ].map((category, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            minWidth: '60px',
            cursor: 'pointer',
            animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`,
            opacity: 0,
            transform: pulseEffect && index === 1 ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              background: 'linear-gradient(135deg, rgba(229, 57, 53, 0.15), rgba(255, 87, 34, 0.1))', 
              borderRadius: '14px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '8px',
              fontSize: '22px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              {category.icon}
            </div>
            <div style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '10px', 
              fontWeight: '500',
              textAlign: 'center',
            }}>
              {category.name}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '15px' }}>
        Featured Products
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {[
          { name: 'Summer T-Shirt', price: '$25.99', image: '👕', discount: '-15%' },
          { name: 'Slim Jeans', price: '$45.50', image: '👖', isNew: true },
          { name: 'Sports Shoes', price: '$79.99', image: '👟', discount: '-20%' },
          { name: 'Casual Jacket', price: '$99.00', image: '🧥', isNew: true }
        ].map((product, index) => (
          <div key={index} style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '14px', 
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`,
            opacity: 0,
          }}>
            <div style={{ 
              height: '100px', 
              background: 'linear-gradient(135deg, rgba(229, 57, 53, 0.1), rgba(255, 87, 34, 0.05))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              position: 'relative',
            }}>
              {product.image}
              {product.discount && (
                <div style={{ 
                  position: 'absolute', 
                  top: '8px', 
                  left: '8px', 
                  background: '#e53935',
                  color: 'white',
                  fontSize: '8px',
                  fontWeight: 'bold',
                  padding: '4px 6px',
                  borderRadius: '10px',
                }}>{product.discount}</div>
              )}
              {product.isNew && (
                <div style={{ 
                  position: 'absolute', 
                  top: '8px', 
                  left: '8px', 
                  background: '#388e3c',
                  color: 'white',
                  fontSize: '8px',
                  fontWeight: 'bold',
                  padding: '4px 6px',
                  borderRadius: '10px',
                }}>NEW</div>
              )}
            </div>
            <div style={{ padding: '10px' }}>
              <div style={{ 
                color: 'white', 
                fontSize: '11px', 
                fontWeight: '600', 
                marginBottom: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{product.name}</div>
              <div style={{ 
                color: 'white', 
                fontSize: '12px', 
                fontWeight: 'bold',
              }}>{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderCartScreen = () => (
    <div style={{ animation: 'fadeIn 0.5s ease forwards' }}>
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(235, 21, 85, 0.2), rgba(255, 144, 102, 0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px', 
            marginRight: '15px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}>🛒</div>
          <div style={{ 
            color: 'white', 
            fontSize: '16px', 
            fontWeight: 'bold' 
          }}>
            My Cart (3 items)
          </div>
        </div>
        
        {[
          { name: 'Summer T-Shirt', price: '$29.99', color: 'White', size: 'M', quantity: 1, image: '👕' },
          { name: 'Denim Jeans', price: '$49.99', color: 'Blue', size: '32', quantity: 1, image: '👖' },
          { name: 'Running Shoes', price: '$89.99', color: 'Black', size: '10', quantity: 1, image: '👟' }
        ].map((item, index) => (
          <div key={index} style={{ 
            display: 'flex',
            padding: '12px 0',
            borderBottom: index !== 2 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
            animation: `slideIn 0.5s ease forwards ${index * 0.1}s`,
            opacity: 0,
          }}>
            <div style={{ 
              width: '55px', 
              height: '55px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '25px', 
              marginRight: '15px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
              {item.image}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                color: 'white', 
                fontSize: '13px', 
                fontWeight: '600', 
                marginBottom: '5px' 
              }}>
                <div>{item.name}</div>
                <div style={{ color: 'white' }}>{item.price}</div>
              </div>
              <div style={{ 
                display: 'flex',
                fontSize: '11px', 
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <div style={{ marginRight: '10px' }}>Color: {item.color}</div>
                <div style={{ marginRight: '10px' }}>Size: {item.size}</div>
                <div>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '2px 6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    fontSize: '10px',
                  }}>
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        animation: 'fadeIn 0.5s ease forwards 0.3s',
        opacity: 0,
      }}>
        <div style={{ 
          color: 'white', 
          fontSize: '16px', 
          fontWeight: 'bold',
          marginBottom: '15px' 
        }}>
          Order Summary
        </div>
        
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '10px',
            padding: '5px 0',
          }}>
            <div>Subtotal</div>
            <div>$169.97</div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '10px',
            padding: '5px 0',
          }}>
            <div>Shipping</div>
            <div>$5.99</div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '10px',
            padding: '5px 0',
          }}>
            <div>Tax</div>
            <div>$14.20</div>
          </div>
          <div style={{ 
            height: '1px', 
            background: 'rgba(255, 255, 255, 0.1)', 
            margin: '10px 0' 
          }}></div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            color: 'white',
            fontWeight: '700',
            fontSize: '14px',
            padding: '5px 0',
          }}>
            <div>Total</div>
            <div>$190.16</div>
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        animation: 'fadeIn 0.5s ease forwards 0.5s',
        opacity: 0,
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #EB1555, #FF9066)',
          color: 'white',
          fontWeight: 'bold',
          padding: '14px 30px',
          borderRadius: '30px',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 10px 20px rgba(235, 21, 85, 0.3)',
          transition: 'all 0.3s ease',
        }}>
          Proceed to Checkout
        </div>
      </div>
    </div>
  );
  
  const renderProfileScreen = () => (
    <div style={{ animation: 'fadeIn 0.5s ease forwards' }}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '25px',
        position: 'relative',
      }}>
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(135deg, #FF3D00 0%, #FF9800 100%)',
          opacity: 0.15,
          borderRadius: '28px',
          zIndex: 0,
          boxShadow: '0 10px 30px rgba(255, 61, 0, 0.2)'
        }}></div>
        <div style={{ 
          width: '95px', 
          height: '95px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #FF3D00, #FF9800)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '34px', 
          color: 'white', 
          marginBottom: '15px',
          marginTop: '35px',
          border: '4px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 12px 30px rgba(255, 61, 0, 0.3)',
          zIndex: 1,
          position: 'relative',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: pulseEffect ? 'scale(1.05)' : 'scale(1)',
        }}>
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: '#32CD32',
            border: '2px solid white',
            zIndex: 2,
          }}></div>
          😎
        </div>
        <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Sophia Miller</div>
        <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '13px', marginBottom: '18px' }}>sophia.m@example.com</div>
      </div>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        animation: 'fadeIn 0.5s ease forwards 0.2s',
        opacity: 0,
      }}>
        <div style={{ 
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'white',
          padding: '18px 18px 12px'
        }}>
          Account Settings
        </div>
        
        {[
          { icon: '👤', title: 'Personal Information' },
          { icon: '🏠', title: 'Saved Addresses' },
          { icon: '💳', title: 'Payment Methods' },
          { icon: '🔔', title: 'Notifications' },
          { icon: '🔒', title: 'Privacy & Security' }
        ].map((item, index) => (
          <div key={index} style={{ 
            display: 'flex',
            alignItems: 'center',
            padding: '14px 18px',
            borderBottom: index !== 4 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: pulseEffect && index === 2 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
          }}>
            <div style={{ 
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              marginRight: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              {item.icon}
            </div>
            <div style={{ 
              flex: 1,
              color: 'white',
              fontSize: '13px',
              fontWeight: '500',
            }}>
              {item.title}
            </div>
            <div style={{ 
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.4)'
            }}>
              →
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        marginTop: '25px',
        animation: 'fadeIn 0.5s ease forwards 0.6s',
        opacity: 0,
      }}>
        <div style={{ 
          color: '#EB1555',
          fontSize: '14px',
          cursor: 'pointer',
          fontWeight: '500',
          padding: '8px 20px',
          border: '1px solid rgba(235, 21, 85, 0.3)',
          borderRadius: '20px',
          transition: 'all 0.3s ease',
        }}>
          Sign Out
        </div>
      </div>
    </div>
  );
  
  const renderContent = () => {
    switch (activeScreen) {
      case 'home':
        return renderHomeScreen();
      case 'cart':
        return renderCartScreen();
      case 'profile':
        return renderProfileScreen();
      default:
        return renderHomeScreen();
    }
  };
  
  return (
    <div style={{position: 'relative'}}>
      {/* Side buttons */}
      <div style={{
        position: 'absolute',
        right: '-2px',
        top: '90px',
        width: '4px',
        height: '50px',
        background: '#000000',
        borderRadius: '2px 0 0 2px',
        zIndex: 10,
      }}></div>
      <div style={{
        position: 'absolute',
        right: '-2px',
        top: '150px',
        width: '4px',
        height: '60px',
        background: '#000000',
        borderRadius: '2px 0 0 2px',
        zIndex: 10,
      }}></div>
      <div style={{
        position: 'absolute',
        left: '-2px',
        top: '120px',
        width: '4px',
        height: '70px',
        background: '#000000',
        borderRadius: '0 2px 2px 0',
        zIndex: 10,
      }}></div>
    
      <div style={demoContainerStyle}>
        <style>
          {keyframeStyle}
          {hideScrollbarStyle}
        </style>
        
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '25px',
          background: '#000000',
          borderRadius: '0 0 16px 16px',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'rgba(60, 60, 60, 0.8)',
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'rgba(60, 60, 60, 0.9)',
          }}></div>
          <div style={{
            width: '8px',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(60, 60, 60, 0.8)',
          }}></div>
        </div>
        <div style={headerStyle}>
          <div style={{ 
            color: 'white', 
            fontSize: '18px', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ 
              color: '#EB1555',
              fontSize: '16px',
              marginRight: '2px',
            }}>
              {activeScreen === 'home' ? '🏠' : activeScreen === 'cart' ? '🛒' : '👤'}
            </span>
            {activeScreen === 'home' ? 'Fashion Store' : 
             activeScreen === 'cart' ? 'My Cart' : 'My Profile'}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {activeScreen === 'home' && (
              <div style={{ 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '16px',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}>
                🔍
              </div>
            )}
          </div>
        </div>
        
        <div style={screenStyle}>
          <div className="hide-scrollbar" style={contentStyleObject}>
            {renderContent()}
          </div>
        </div>
        
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          padding: '15px', 
          background: 'rgba(139, 0, 0, 0.9)', 
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '0 0 28px 28px',
        }}>
          {[
            { name: 'Home', icon: '🏠', screen: 'home' },
            { name: 'Categories', icon: '🔍', screen: 'categories' },
            { name: 'Cart', icon: '🛒', screen: 'cart', badge: showBadge },
            { name: 'Profile', icon: '👤', screen: 'profile' }
          ].map((item) => (
            <div 
              key={item.screen} 
              style={navItemStyle(item.screen === activeScreen)}
              onClick={() => handleNavChange(item.screen)}
            >
              <div style={{ 
                marginBottom: '8px', 
                fontSize: '18px',
                opacity: item.screen === activeScreen ? 1 : 0.7,
                transform: item.screen === activeScreen ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}>
                {item.icon}
              </div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
        
        {/* Home indicator */}
        <div style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '2px',
          zIndex: 100,
        }}></div>
      </div>
    </div>
  );
};

// RainbowCode component with no syntax highlighting
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

// Main MobileAppsShowcase Component
const MobileAppsShowcase = () => {
  return (
    <CodeShowcaseGrid>
      {/* React Native App Example */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            React Native FitTrack App
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Complete React Native fitness app with activity tracking, profile, and settings screens.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>FitTrackApp.js</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <RainbowCode 
              language="javascript" 
              code={`import React, { 
  useState, 
  useEffect 
} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { 
  NavigationContainer 
} from '@react-navigation/native';
import { 
  createBottomTabNavigator 
} from '@react-navigation/bottom-tabs';
import { 
  Ionicons 
} from '@expo/vector-icons';
import { 
  LineChart 
} from 'react-native-chart-kit';

// Home Screen Component
function HomeScreen() {
  const [activities, setActivities] = 
    useState([
      { 
        id: 1, 
        type: 'Running', 
        time: '7:30 AM', 
        distance: '2.5 km' 
      },
      { 
        id: 2, 
        type: 'Yoga', 
        time: '9:00 AM', 
        duration: '30 min' 
      },
      { 
        id: 3, 
        type: 'Walking', 
        time: '6:30 PM', 
        distance: '1.8 km' 
      }
    ]);
  
  const chartData = {
    labels: [
      'Mon', 'Tue', 'Wed', 
      'Thu', 'Fri', 'Sat', 'Sun'
    ],
    datasets: [{ 
      data: [
        3000, 5200, 4800, 
        6000, 2900, 8000, 7200
      ] 
    }]
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>
          Welcome back, Alex!
        </Text>
        <Text style={styles.scoreText}>
          Your fitness score: 85/100
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: '85%' }
            ]} 
          />
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>
        Today's Activities
      </Text>
      
      {activities.map(activity => (
        <TouchableOpacity 
          key={activity.id} 
          style={styles.activityCard}
        >
          <View style={styles.activityIcon}>
            <Ionicons 
              name={
                activity.type === 'Running' 
                  ? 'md-walk' 
                  : activity.type === 'Yoga' 
                    ? 'body' 
                    : 'footsteps'
              } 
              size={20} 
              color="#fff" 
            />
          </View>
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>
              {activity.type}
            </Text>
            <View style={styles.activityStats}>
              <Text style={styles.activityTime}>
                {activity.time}
              </Text>
              <Text style={styles.activityTime}>
                {activity.distance || 
                  activity.duration}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
      <Text style={styles.sectionTitle}>
        Weekly Step Count
      </Text>
      <LineChart
        data={chartData}
        width={320}
        height={180}
        chartConfig={{
          backgroundColor: '#2196f3',
          backgroundGradientFrom: 
            '#2196f3',
          backgroundGradientTo: 
            '#4fc3f7',
          decimalPlaces: 0,
          color: (opacity = 1) => 
            \`rgba(255, 255, 255, 
              \${opacity})\`,
          labelColor: () => 
            \`rgba(255, 255, 255, 0.9)\`,
        }}
        bezier
        style={styles.chart}
      />
      
      <Text style={styles.sectionTitle}>
        Daily Statistics
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons 
            name="footsteps" 
            size={24} 
            color="#2196f3" 
          />
          <Text style={styles.statValue}>
            7,842
          </Text>
          <Text style={styles.statLabel}>
            Steps
          </Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons 
            name="flame" 
            size={24} 
            color="#2196f3" 
          />
          <Text style={styles.statValue}>
            352
          </Text>
          <Text style={styles.statLabel}>
            Calories
          </Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons 
            name="water" 
            size={24} 
            color="#2196f3" 
          />
          <Text style={styles.statValue}>
            1.2L
          </Text>
          <Text style={styles.statLabel}>
            Water
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}`} 
            />
          </CodeSnippetContainer>
          <DemoContainer>
            <DemoWrapper>
              <MobileNavigationDemo />
            </DemoWrapper>
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>

      {/* Flutter E-commerce App */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Flutter E-commerce App
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Modern Flutter e-commerce app with home, cart, and profile screens, featuring smooth navigation transitions.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>e_commerce_app.dart</CodeFileName>
              <CodeLanguage>Dart</CodeLanguage>
            </CodeHeader>
            <RainbowCode 
              language="dart" 
              code={`import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) 
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fashion Store',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: 
          const Color(0xFFe53935),
        brightness: Brightness.dark,
        scaffoldBackgroundColor: 
          const Color(0xFF1a0000),
        appBarTheme: const AppBarTheme(
          backgroundColor: 
            Color(0xFF1a0000),
          elevation: 0,
        ),
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) 
      : super(key: key);

  @override
  _MainScreenState createState() => 
      _MainScreenState();
}

class _MainScreenState 
    extends State<MainScreen> {
  int _currentIndex = 0;
  final List<Widget> _screens = [
    const HomeScreen(),
    const CategoriesScreen(),
    const CartScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedSwitcher(
        duration: 
          const Duration(milliseconds: 300),
        child: _screens[_currentIndex],
      ),
      bottomNavigationBar: 
          BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.black87,
        selectedItemColor: 
          const Color(0xFFe53935),
        unselectedItemColor: 
          Colors.grey[600],
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home), 
            label: 'Home'
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search), 
            label: 'Categories'
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart), 
            label: 'Cart'
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person), 
            label: 'Profile'
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) 
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Fashion Store'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: 
            const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: 
              CrossAxisAlignment.start,
            children: [
              // Hero Banner
              Stack(
                children: [
                  Container(
                    height: 150,
                    decoration: BoxDecoration(
                      gradient: 
                        const LinearGradient(
                        colors: [
                          Color(0xFFe53935), 
                          Color(0xFFff5722)
                        ],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: 
                        BorderRadius.circular(12),
                    ),
                    padding: 
                      const EdgeInsets
                        .all(16),
                    child: Column(
                      crossAxisAlignment: 
                        CrossAxisAlignment.start,
                      mainAxisAlignment: 
                        MainAxisAlignment
                          .spaceBetween,
                      children: [
                        const Text(
                          'Summer Collection',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: 
                              FontWeight.bold,
                          ),
                        ),
                        ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton
                            .styleFrom(
                            backgroundColor: 
                              Colors.white,
                            foregroundColor: 
                              Color(0xFFe53935),
                            padding: 
                              const EdgeInsets
                                .symmetric(
                              horizontal: 16,
                              vertical: 8,
                            ),
                          ),
                          child: const Text(
                            'Shop Now'
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              
              const SizedBox(height: 24),
              
              const Text(
                'Categories',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              
              const SizedBox(height: 12),
              
              SizedBox(
                height: 90,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: [
                    _buildCategoryItem(
                      'Shirts', 
                      Icons.checkroom,
                      Color(0xFFe53935)
                    ),
                    _buildCategoryItem(
                      'Pants', 
                      Icons.accessibility_new,
                      Color(0xFFff5722)
                    ),
                    _buildCategoryItem(
                      'Shoes', 
                      Icons.crisis_alert,
                      Color(0xFFd32f2f)
                    ),
                    _buildCategoryItem(
                      'Accessories', 
                      Icons.watch,
                      Color(0xFFc62828)
                    ),
                  ],
                ),
              ),
              
              const SizedBox(height: 24),
              
              Row(
                mainAxisAlignment: 
                  MainAxisAlignment
                    .spaceBetween,
                children: [
                  const Text(
                    'Featured Products',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: 
                        FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: Text(
                      'See All',
                      style: TextStyle(
                        color: Color(0xFFff3d00),
                      ),
                    ),
                  ),
                ],
              ),
              
              const SizedBox(height: 12),
              
              GridView.builder(
                shrinkWrap: true,
                physics: 
                  NeverScrollableScrollPhysics(),
                gridDelegate: 
                  SliverGridDelegateWithFixedCrossAxisCount
                  (
                    crossAxisCount: 2,
                    childAspectRatio: 0.75,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16,
                  ),
                itemCount: 4,
                itemBuilder: (context, index) {
                  return _buildProductCard();
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
  
  Widget _buildCategoryItem(
      String name, 
      IconData icon,
      Color color) {
    return Container(
      margin: const EdgeInsets.only(
        right: 12),
      width: 80,
      child: Column(
        children: [
          Container(
            height: 60,
            width: 60,
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: 
                BorderRadius.circular(12),
            ),
            child: Icon(
              icon, 
              color: color,
              size: 30,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            name,
            style: TextStyle(
              color: Colors.white,
              fontSize: 12,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
  
  Widget _buildProductCard() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.black12,
        borderRadius: 
          BorderRadius.circular(12),
        border: Border.all(
          color: Colors.white10,
        ),
      ),
      child: Column(
        crossAxisAlignment: 
          CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: Color(0xFFe53935)
                  .withOpacity(0.1),
                borderRadius: 
                  BorderRadius.only(
                  topLeft: 
                    Radius.circular(12),
                  topRight: 
                    Radius.circular(12),
                ),
              ),
              child: Center(
                child: Icon(
                  Icons.checkroom,
                  size: 80,
                  color: Colors.white70,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: 
                CrossAxisAlignment.start,
              children: [
                Text(
                  'Fashion T-Shirt',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '\$39.99',
                  style: TextStyle(
                    color: Color(0xFFff3d00),
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(
                      Icons.star, 
                      size: 16, 
                      color: Color(0xFFffc107),
                    ),
                    Text(
                      ' 4.8',
                      style: TextStyle(
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}`} 
            />
          </CodeSnippetContainer>
          <DemoContainer>
            <DemoWrapper>
              <FlutterCardDemo />
            </DemoWrapper>
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

export default MobileAppsShowcase; 