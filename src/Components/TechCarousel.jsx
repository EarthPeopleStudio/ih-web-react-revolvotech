import React from "react";
import styled, { keyframes } from "styled-components";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiFlutter,
  SiUnity,
  SiPython,
  SiTensorflow,
  SiOpenai,
  SiAframe,
} from "react-icons/si";
import { FaDatabase, FaCloud, FaCode } from "react-icons/fa";

const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

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

const CarouselSection = styled.section`
  padding: 80px 0;
  background: transparent;
  overflow: hidden;
  position: relative;
  contain: layout style;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(251, 182, 4, 0.015) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      radial-gradient(
        circle at 25% 25%,
        rgba(251, 182, 4, 0.025) 1px,
        transparent 1px
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(251, 182, 4, 0.02) 1px,
        transparent 1px
      );
    background-size: 60px 60px, 60px 60px, 30px 30px, 45px 45px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
    will-change: auto;
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #ffeb3b 40%, #fbb604 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  position: relative;
  z-index: 1;
  contain: layout style;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  contain: layout style;

  strong {
    color: #fbb604;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 20px;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 20px;
  animation: ${scrollLeft} 30s linear infinite;
  width: fit-content;
  padding: 20px 0;
  will-change: transform;
  contain: layout style;
  transform: translateZ(0);

  &:hover {
    animation-play-state: paused;
  }
`;

const TechItem = styled.div`
  background: linear-gradient(
    145deg,
    rgba(25, 25, 30, 0.95),
    rgba(35, 35, 40, 0.95)
  );
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 24px 20px;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  contain: layout style;
  will-change: transform;
  transform: translateZ(0);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(251, 182, 4, 0.02) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(
        circle at 25% 25%,
        rgba(251, 182, 4, 0.025) 1px,
        transparent 1px
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(251, 182, 4, 0.015) 1px,
        transparent 1px
      );
    background-size: 20px 20px, 20px 20px, 10px 10px, 15px 15px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 8px;
    right: 8px;
    width: 6px;
    height: 6px;
    background: rgba(251, 182, 4, 0.4);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
    will-change: background, box-shadow;
  }

  &:hover {
    transform: translateY(-8px) translateZ(0);
    background: linear-gradient(
      145deg,
      rgba(35, 35, 40, 0.98),
      rgba(45, 45, 50, 0.98)
    );
    border-color: rgba(251, 182, 4, 0.4);
    box-shadow: 0 15px 35px rgba(251, 182, 4, 0.15);

    &::after {
      background: rgba(251, 182, 4, 0.8);
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }

    svg {
      color: #fbb604;
      transform: scale(1.1) translateZ(0);
    }
  }

  svg {
    font-size: 2.2rem;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease, transform 0.3s ease;
    position: relative;
    z-index: 1;
    will-change: transform, color;
  }
`;

const TechName = styled.span`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: 500;
  position: relative;
  z-index: 1;
  contain: layout style;
`;

const CarouselContainer = styled.div`
  margin: 40px 0;
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  position: relative;
  z-index: 1;
  contain: layout;
  overflow: hidden;
`;

const techStacks = [
  { icon: SiReact, name: "React" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiFlutter, name: "Flutter" },
  { icon: FaCode, name: "TypeScript" },
  { icon: SiPython, name: "Python" },
  { icon: SiTensorflow, name: "TensorFlow" },
  { icon: SiOpenai, name: "OpenAI" },
  { icon: FaCloud, name: "Cloud" },
  { icon: SiUnity, name: "Unity" },
  { icon: FaDatabase, name: "SQL" },
  { icon: SiExpress, name: "Express" },
];

const TechCarousel = () => {
  return (
    <CarouselSection>
      <Title>Technologies We Master</Title>
      <Subtitle>
        From <strong>modern web frameworks</strong> to{" "}
        <strong>cutting-edge AI/ML</strong> technologies, we leverage the best
        tools to create <strong>exceptional digital experiences</strong>.
      </Subtitle>
      <CarouselContainer>
        <CarouselTrack>
          {[...techStacks, ...techStacks].map((tech, index) => (
            <TechItem key={index}>
              <tech.icon />
              <TechName>{tech.name}</TechName>
            </TechItem>
          ))}
        </CarouselTrack>
      </CarouselContainer>
    </CarouselSection>
  );
};

export default TechCarousel;
