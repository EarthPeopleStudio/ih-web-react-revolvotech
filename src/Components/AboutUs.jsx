import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const circuitPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 182, 4, 0); }
  50% { box-shadow: 0 0 0 4px rgba(251, 182, 4, 0.1); }
`;

const AboutWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 60px 60px, 60px 60px, 30px 30px, 45px 45px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #FFEB3B 40%, #fbb604 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  letter-spacing: -0.01em;
  line-height: 1.2;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }
`;

const Subtitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--text-primary);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 16px;
  border: 1px solid rgba(251, 182, 4, 0.2);
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 25px 25px, 25px 25px, 12px 12px, 18px 18px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 12px;
    right: 12px;
    width: 6px;
    height: 6px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(251, 182, 4, 0.4);
    box-shadow: 0 20px 40px rgba(251, 182, 4, 0.1);
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const SectionTitle = styled.h3`
  color: #fbb604;
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 24px;
    background: linear-gradient(to bottom, #FFEB3B, #fbb604);
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(251, 182, 4, 0.3);
  }
`;

const Paragraph = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  strong {
    color: #fbb604;
    font-weight: 600;
  }
`;

const List = styled.ul`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  padding-left: 20px;
  position: relative;
  z-index: 1;

  li {
    margin-bottom: 10px;
    position: relative;
    
    &::before {
      content: '•';
      color: #fbb604;
      position: absolute;
      left: -20px;
      filter: drop-shadow(0 0 4px rgba(251, 182, 4, 0.3));
    }
  }
`;

const ContactLink = styled.a`
  color: #fbb604;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-shadow: 0 0 0 rgba(251, 182, 4, 0);
  
  &:hover {
    color: #FFEB3B;
    text-shadow: 0 0 10px rgba(251, 182, 4, 0.5);
  }
`;

const CircuitAccent = styled.div`
  position: absolute;
  top: 150px;
  right: 50px;
  width: 60px;
  height: 60px;
  border: 1px solid rgba(251, 182, 4, 0.1);
  border-radius: 4px;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.3);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 6px;
    height: 6px;
    background: rgba(251, 182, 4, 0.2);
    border-radius: 50%;
    animation: ${circuitPulse} 3s ease-in-out infinite reverse;
  }
`;

const AboutUs = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AboutWrapper>
      <CircuitAccent />
      <Title>About Revolvo Tech</Title>
      <Subtitle>Welcome to Revolvo Tech</Subtitle>
      
      <Paragraph>
        At Revolvo Tech, we don't just build apps—we build businesses. Specializing in funded startups and growth companies, 
        we've helped turn ideas into market-ready products that attract investors and drive real revenue. 
        Based in Islamabad, Pakistan and operating remotely from Tampere, Finland, we serve ambitious entrepreneurs worldwide.
      </Paragraph>

      <div style={{ animation: 'fadeIn 0.8s ease' }}>
        <Section>
          <SectionTitle>Who We Are</SectionTitle>
          <Paragraph>
            Revolvo Tech is a development team that understands the startup journey. We know what investors look for, 
            what users expect, and how to build products that scale. Whether you're preparing for Series A or 
            launching your MVP, our team focuses on building technology that drives business results, not just pretty interfaces.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>What We Do</SectionTitle>
          <List>
            <li><strong>Startup MVPs:</strong> Rapid prototyping and MVP development designed to validate ideas and attract early-stage funding. We build lean, testable products that prove market fit.</li>
            <li><strong>Scalable Products:</strong> Full-featured applications built for growth, from mobile apps to web platforms. Designed to handle user growth and feature expansion as your business scales.</li>
            <li><strong>Investor-Ready Development:</strong> Clean code, comprehensive documentation, and professional architecture that impresses technical due diligence and builds investor confidence.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Our Mission</SectionTitle>
          <Paragraph>
            Our mission is to bridge the gap between ambitious ideas and successful businesses. We believe every great company 
            starts with great technology, and we're here to build the foundation that turns your vision into a fundable, 
            scalable, profitable reality.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Why Choose Us</SectionTitle>
          <List>
            <li><strong>Startup Experience:</strong> We understand the startup ecosystem, from seed funding to Series B. Our team has worked with funded companies and knows what investors expect from technical teams.</li>
            <li><strong>Business-First Thinking:</strong> Every technical decision is made with your business goals in mind. We don't just code—we contribute to strategy, user experience, and long-term growth planning.</li>
            <li><strong>Proven Results:</strong> Our clients have successfully raised funding, launched to market, and scaled their user bases. We measure our success by your business outcomes, not just project completion.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Get in Touch</SectionTitle>
          <Paragraph>
            Have questions or want to discuss a project? Feel free to reach out to us at <ContactLink href="mailto:hey@revolvo.tech">hey@revolvo.tech</ContactLink>
          </Paragraph>
        </Section>
      </div>
    </AboutWrapper>
  );
};

export default AboutUs; 