import React from "react";
import styled, { keyframes, css } from "styled-components";

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 400px;
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
`;

const RotatingGroup = styled.g`
  animation: ${rotate} 20s linear infinite;
`;

const PulsingPath = styled.path`
  animation: ${pulse} 3s ease-in-out infinite;
`;

const PulsingGroup = styled.g`
  animation: ${pulse} ${(props) => 3 + props.index}s ease-in-out infinite;
`;

const AnimatedHero = () => {
  return (
    <HeroContainer>
      <svg width="100%" height="100%" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path
            d="M 30 0 L 0 0 0 30"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
        </pattern>
        <rect width="500" height="500" fill="url(#grid)" />

        {/* Rotating Circles */}
        <RotatingGroup>
          <circle
            cx="250"
            cy="250"
            r="150"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
          <circle
            cx="250"
            cy="250"
            r="120"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
          <circle
            cx="250"
            cy="250"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
        </RotatingGroup>

        {/* Central Shape */}
        <PulsingPath
          d="M250 150 L350 250 L250 350 L150 250 Z"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />

        {/* Connection Lines */}
        {[0, 90, 180, 270].map((angle, i) => (
          <PulsingGroup
            key={i}
            index={i}
            transform={`rotate(${angle} 250 250)`}
          >
            <line
              x1="250"
              y1="150"
              x2="250"
              y2="100"
              stroke="white"
              strokeWidth="1"
            />
            <circle cx="250" cy="100" r="3" fill="white" />
          </PulsingGroup>
        ))}

        {/* Center Point */}
        <circle cx="250" cy="250" r="5" fill="url(#grad1)">
          <animate
            attributeName="r"
            values="5;8;5"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </HeroContainer>
  );
};

export default AnimatedHero;
