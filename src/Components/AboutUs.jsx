import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AboutWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Section = styled.section`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Paragraph = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const List = styled.ul`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  padding-left: 20px;

  li {
    margin-bottom: 15px;
  }
`;

const BackButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 15px 30px;
  background: var(--button-bg);
  border: none;
  border-radius: 8px;
  color: var(--button-text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--button-glow);

  &:hover {
    transform: translateY(-2px);
    background: var(--button-hover-bg);
    box-shadow: var(--button-hover-glow);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const ContactLink = styled.a`
  color: var(--text-primary);
  text-decoration: underline;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <AboutWrapper>
      <Title>About Us</Title>
      <Subtitle>Welcome to Revolvo Tech</Subtitle>
      
      <Paragraph>
        At Revolvo Tech, we are passionate about turning ideas into innovative software solutions. Based in Islamabad, Pakistan and operating remotely from Tampere, Finland, we offer comprehensive software development services and create cutting-edge products that empower businesses and individuals around the world.
      </Paragraph>

      <Section>
        <SectionTitle>Who We Are</SectionTitle>
        <Paragraph>
          Revolvo Tech is a dynamic software development company committed to delivering high-quality digital products and services. Whether you need custom software tailored to your business needs or a ready-to-use product that stands out in the market, our team of experts is here to help you innovate and succeed.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>What We Do</SectionTitle>
        <List>
          <li>
            <strong>Custom Software Development:</strong> We work closely with our clients to design, develop, and deploy bespoke software solutions that streamline operations, enhance user experience, and drive business growth.
          </li>
          <li>
            <strong>Product Development:</strong> From mobile apps to desktop applications, games to enterprise platforms, we build products that combine functionality with an intuitive design.
          </li>
          <li>
            <strong>End-to-End Services:</strong> Our expertise spans the entire software development lifecycle—from initial concept and design through to development, testing, and ongoing support.
          </li>
        </List>
      </Section>

      <Section>
        <SectionTitle>Our Mission</SectionTitle>
        <Paragraph>
          Our mission is to create reliable, innovative, and user-friendly software that transforms the way our clients do business. We believe in leveraging technology to solve complex challenges and improve everyday life.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Why Choose Us</SectionTitle>
        <List>
          <li>
            <strong>Expertise & Innovation:</strong> With a team of skilled professionals and years of industry experience, we combine technical excellence with creative problem-solving.
          </li>
          <li>
            <strong>Client-Centric Approach:</strong> We work collaboratively with our clients, ensuring that every solution is tailored to meet your unique needs and goals.
          </li>
          <li>
            <strong>Quality & Integrity:</strong> Our commitment to quality, security, and transparency sets us apart as a trusted partner in your digital journey.
          </li>
        </List>
      </Section>

      <Section>
        <SectionTitle>Get in Touch</SectionTitle>
        <Paragraph>
          Ready to transform your ideas into reality? Contact us today at <ContactLink href="mailto:hey@revolvo.tech">hey@revolvo.tech</ContactLink> to learn more about our services and products.
        </Paragraph>
      </Section>

      <BackButton onClick={() => navigate(-1)}>← Go Back</BackButton>
    </AboutWrapper>
  );
};

export default AboutUs; 