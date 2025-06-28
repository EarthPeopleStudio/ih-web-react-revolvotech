import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
`;

const subtleGlow = keyframes`
  0%, 100% {
    opacity: 0.05;
  }
  50% {
    opacity: 0.15;
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: #000000;
`;

const TechGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(251, 182, 4, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251, 182, 4, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(251, 182, 4, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251, 182, 4, 0.05) 1px, transparent 1px);
  background-size: 
    100px 100px,
    100px 100px,
    20px 20px,
    20px 20px;
  opacity: 0.4;
`;

const CircuitNode = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: #fbb604;
  border-radius: 50%;
  animation: ${pulse} 3s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(251, 182, 4, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(251, 182, 4, 0.3);
    border-radius: 50%;
  }
`;

const CornerAccent = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border: 2px solid rgba(251, 182, 4, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(251, 182, 4, 0.4);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(251, 182, 4, 0.1);
  }
`;

const TopLeftCorner = styled(CornerAccent)`
  top: 40px;
  left: 40px;
  border-right: none;
  border-bottom: none;
  
  &::before {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }
`;

const BottomRightCorner = styled(CornerAccent)`
  bottom: 40px;
  right: 40px;
  border-left: none;
  border-top: none;
  
  &::before {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
  }
  
  &::after {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }
`;

const GeometricAccent = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1px solid rgba(251, 182, 4, 0.1);
  transform: rotate(45deg);
  animation: ${subtleGlow} 12s ease-in-out infinite;
`;

const TechOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 30% 70%,
    rgba(251, 182, 4, 0.03) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 20%,
    rgba(251, 182, 4, 0.02) 0%,
    transparent 50%
  );
`;

const SubtleBackground = () => {
  // Generate circuit nodes at grid intersections
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: 10 + (i % 4) * 25,
    top: 15 + Math.floor(i / 4) * 25,
    delay: i * 0.4
  }));

  // Geometric accents for visual interest
  const geometricAccents = [
    { id: 1, top: '15%', right: '15%', delay: 0 },
    { id: 2, bottom: '35%', left: '12%', delay: 4 },
    { id: 3, top: '60%', right: '25%', delay: 8 }
  ];

  return (
    <BackgroundContainer>
      <TechGrid />
      
      {/* Corner Accents */}
      <TopLeftCorner />
      <BottomRightCorner />
      
      {/* Circuit Nodes */}
      {nodes.map(node => (
        <CircuitNode
          key={node.id}
          style={{
            left: `${node.left}%`,
            top: `${node.top}%`,
            animationDelay: `${node.delay}s`
          }}
        />
      ))}

      {/* Geometric Accents */}
      {geometricAccents.map(accent => (
        <GeometricAccent
          key={accent.id}
          style={{
            top: accent.top,
            bottom: accent.bottom,
            left: accent.left,
            right: accent.right,
            animationDelay: `${accent.delay}s`
          }}
        />
      ))}
      
      <TechOverlay />
    </BackgroundContainer>
  );
};

export default SubtleBackground; 