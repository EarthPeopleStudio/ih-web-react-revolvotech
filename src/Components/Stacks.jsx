import React from "react";
import styled from "styled-components";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiUnity, SiFlutter } from "react-icons/si";

const StacksWrapper = styled.div`
  padding: 120px 8% 80px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto 60px;
  font-size: 1.2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
    padding: 0 20px;
  }
`;

const StacksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const StackCard = styled.div`
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--border-color);
    box-shadow: 0 8px 32px var(--shadow-color);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  transition: all 0.3s ease;

  ${StackCard}:hover & {
    transform: scale(1.1);
  }
`;

const StackTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const StackDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
`;

const Stacks = () => {
  const stacks = [
    {
      icon: <FaReact />,
      title: "Frontend Development",
      description:
        "Modern and responsive web applications using React and related technologies.",
    },
    {
      icon: <FaNodeJs />,
      title: "Backend Development",
      description:
        "Scalable server solutions with Node.js and Express framework.",
    },
    {
      icon: <SiUnity />,
      title: "Game Development",
      description:
        "Creating immersive gaming experiences with Unity's powerful game engine.",
    },
    {
      icon: <SiFlutter />,
      title: "Mobile Development",
      description:
        "Cross-platform mobile applications built with Flutter for iOS and Android.",
    },
  ];

  return (
    <StacksWrapper id="stacks">
      <Title>Technology Stack</Title>
      <Description>
        We leverage cutting-edge technologies to build robust and scalable
        solutions that meet modern digital challenges.
      </Description>
      <StacksGrid>
        {stacks.map((stack, index) => (
          <StackCard key={index}>
            <IconWrapper>{stack.icon}</IconWrapper>
            <StackTitle>{stack.title}</StackTitle>
            <StackDescription>{stack.description}</StackDescription>
          </StackCard>
        ))}
      </StacksGrid>
    </StacksWrapper>
  );
};

export default Stacks;
