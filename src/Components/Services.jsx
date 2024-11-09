import React from "react";
import styled from "styled-components";
import { BsBrowserSafari } from "react-icons/bs";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";

const ServicesHolder = styled.div`
  padding: 120px 8% 80px;
  position: relative;
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

const ServiceComponent = styled.div`
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  width: 350px;
  border-radius: 20px;
  padding: 2.3rem;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 1200px) {
    width: 300px;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: var(--border-color);
    box-shadow: 0 8px 32px var(--shadow-color);
  }
`;

const ServicesIcon = styled.div`
  color: var(--primary-color);
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: rgba(74, 95, 230, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;

  ${ServiceComponent}:hover & {
    transform: scale(1.1);
    background: rgba(74, 95, 230, 0.2);
  }
`;

const ServiceTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
`;

const Services = () => {
  const services = [
    {
      icon: <BsBrowserSafari />,
      title: "Web Development",
      description:
        "Create modern, responsive websites and web applications using cutting-edge technologies and best practices for optimal user experience.",
    },
    {
      icon: <MdOutlineAppSettingsAlt />,
      title: "App Development",
      description:
        "Build powerful mobile applications for iOS and Android platforms with seamless functionality and intuitive user interfaces.",
    },
    {
      icon: <FaGamepad />,
      title: "Game Development",
      description:
        "Develop engaging and immersive games across multiple platforms using advanced graphics and interactive gameplay mechanics.",
    },
  ];

  return (
    <ServicesHolder>
      <Title>Our Services</Title>
      <Description>
        We offer comprehensive digital solutions tailored to your needs, from
        web development to gaming experiences.
      </Description>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceComponent key={index}>
            <ServicesIcon>{service.icon}</ServicesIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceComponent>
        ))}
      </ServicesGrid>
    </ServicesHolder>
  );
};

export default Services;
