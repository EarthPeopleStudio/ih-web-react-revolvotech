import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(50%);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
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
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 1px 1px, rgba(251, 182, 4, 0.08) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.7;
  }
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.3;
  filter: blur(1px);
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    transparent 35%,
    rgba(251, 182, 4, 0.04) 45%,
    rgba(255, 235, 59, 0.03) 50%,
    rgba(251, 182, 4, 0.04) 55%,
    transparent 65%,
    transparent 100%
  );
  animation: ${shimmer} 25s linear infinite;
  opacity: 0.8;
  will-change: transform;
`;

const MeshPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(251, 182, 4, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251, 182, 4, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
`;

const OrganicShape = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(ellipse at center, 
    rgba(255, 235, 59, 0.05) 0%, 
    rgba(251, 182, 4, 0.03) 50%, 
    transparent 70%
  );
  border-radius: 50%;
  animation: ${pulse} 8s ease-in-out infinite;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  filter: blur(2px);
`;

const SubtleBackground = () => {
  // Generate random particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    color: i % 3 === 0 ? 'rgba(255, 235, 59, 0.4)' : 
           i % 3 === 1 ? 'rgba(251, 182, 4, 0.4)' : 
           'rgba(249, 155, 4, 0.4)'
  }));

  const organicShapes = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    top: Math.random() * 80 + 10,
    left: Math.random() * 80 + 10,
  }));

  return (
    <BackgroundContainer>
      <MeshPattern />
      
      {/* Floating Particles */}
      {particles.map(particle => (
        <FloatingParticle
          key={particle.id}
          size={particle.size}
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
          duration={particle.duration}
          delay={particle.delay}
          color={particle.color}
        />
      ))}

      {/* Organic Shapes */}
      {organicShapes.map(shape => (
        <OrganicShape
          key={shape.id}
          top={shape.top}
          left={shape.left}
          style={{ animationDelay: `${shape.id * 2}s` }}
        />
      ))}
      
      <GradientOverlay />
    </BackgroundContainer>
  );
};

export default SubtleBackground; 