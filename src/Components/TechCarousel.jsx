import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiFlutter,
  SiUnity, SiCsharp, SiDotnet, SiPython, SiTensorflow,
  SiOpenai, SiAframe
} from 'react-icons/si';
import { FaDatabase, FaCloud, FaCode } from 'react-icons/fa';

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

const CarouselSection = styled.section`
  padding: 80px 0;
  background: transparent;
  overflow: hidden;
  position: relative;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #FFEB3B 40%, #fbb604 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;

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

  &:hover {
    animation-play-state: paused;
  }
`;

const TechItem = styled.div`
  background: rgba(30, 30, 35, 0.6);
  border: 1px solid rgba(251, 182, 4, 0.1);
  border-radius: 12px;
  padding: 20px;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-5px);
    background: rgba(35, 35, 40, 0.9);
    border-color: rgba(251, 182, 4, 0.3);
    box-shadow: 0 5px 15px rgba(251, 182, 4, 0.1);

    svg {
      color: #fbb604;
    }
  }

  svg {
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
  }
`;

const TechName = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
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
`;

const techStacks = [
  { icon: SiReact, name: 'React' },
  { icon: SiNodedotjs, name: 'Node.js' },
  { icon: SiMongodb, name: 'MongoDB' },
  { icon: SiFlutter, name: 'Flutter' },
  { icon: FaCode, name: 'TypeScript' },
  { icon: SiPython, name: 'Python' },
  { icon: SiTensorflow, name: 'TensorFlow' },
  { icon: SiOpenai, name: 'OpenAI' },
  { icon: FaCloud, name: 'Cloud' },
  { icon: SiUnity, name: 'Unity' },
  { icon: FaDatabase, name: 'SQL' },
  { icon: SiExpress, name: 'Express' }
];

const TechCarousel = () => {
  return (
    <CarouselSection>
      <Title>Technologies We Master</Title>
      <Subtitle>
        From <strong>modern web frameworks</strong> to <strong>cutting-edge AI/ML</strong> technologies,
        we leverage the best tools to create <strong>exceptional digital experiences</strong>.
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