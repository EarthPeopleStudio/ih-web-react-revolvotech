import React from "react";
import styled from "styled-components";
import { BsBrowserSafari } from "react-icons/bs";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";

const ServicesWrapper = styled.div`
  padding: 120px 8% 80px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  text-align: center;
  color: var(--text-secondary);
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--text-primary);
  margin-bottom: 20px;
  transition: all 0.3s ease;
`;

const ServiceTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 15px;
  transition: color 0.3s ease;
`;

const ServiceCard = styled.div`
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: ${(props) => props.hoverColor || "var(--border-color)"};
    box-shadow: 0 0 20px ${(props) => props.hoverColor || "var(--button-glow)"};
  }

  &:hover ${IconWrapper} {
    color: ${(props) => props.hoverColor};
  }

  &:hover ${ServiceTitle} {
    color: ${(props) => props.hoverColor};
  }
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
`;

const Services = () => {
  const services = [
    {
      icon: <BsBrowserSafari />,
      title: "Web Development",
      description:
        "Create modern, responsive websites and web applications using cutting-edge technologies and best practices.",
      hoverColor: "#00ff9d", // Neon Green
    },
    {
      icon: <MdOutlineAppSettingsAlt />,
      title: "App Development",
      description:
        "Build powerful mobile applications for iOS and Android platforms with seamless functionality.",
      hoverColor: "#00e5ff", // Electric Blue
    },
    {
      icon: <FaGamepad />,
      title: "Game Development",
      description:
        "Develop engaging and immersive games across multiple platforms using advanced graphics.",
      hoverColor: "#ff3366", // Electric Red
    },
  ];

  return (
    <ServicesWrapper id="services">
      <Title>Our Services</Title>
      <Description>
        We offer comprehensive digital solutions tailored to your needs, from
        web development to gaming experiences.
      </Description>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index} hoverColor={service.hoverColor}>
            <IconWrapper>{service.icon}</IconWrapper>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesWrapper>
  );
};

export default Services;
