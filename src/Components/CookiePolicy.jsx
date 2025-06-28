import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const circuitPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 182, 4, 0); }
  50% { box-shadow: 0 0 0 4px rgba(251, 182, 4, 0.1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CookieWrapper = styled.div`
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
  
  @media (max-width: 768px) {
    padding: 100px 5% 60px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
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
`;

const LastUpdated = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 40px;
  text-align: center;
  opacity: 0.8;
  position: relative;
  z-index: 1;
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

const SectionTitle = styled.h2`
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

const CookiePolicy = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CookieWrapper>
      <Title>Cookie Policy</Title>
      <LastUpdated>Last Updated: December 15, 2024</LastUpdated>

      <div style={{ animation: 'fadeIn 0.8s ease' }}>
        <Section>
          <Paragraph>
            Revolvo Tech Pvt Ltd. ("Revolvo Tech", "we", "our", or "us") uses cookies and similar tracking technologies on our website (revolvo.tech) and across all our products and services—including mobile and desktop applications, games, and other software platforms (collectively, the "Services"). This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>1. What Are Cookies?</SectionTitle>
          <Paragraph>
            Cookies are small text files placed on your device by a website or application. They enable the Service to remember your actions and preferences (such as login details, language settings, and other display preferences) over a period of time, so you don't have to re-enter them whenever you revisit the Service.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. How We Use Cookies</SectionTitle>
          <Paragraph>
            We use cookies and similar technologies for several purposes:
          </Paragraph>
          <List>
            <li><strong>Essential Cookies:</strong> To enable basic functions such as security, network management, and accessibility. These cookies are essential to ensure the proper operation of our Services.</li>
            <li><strong>Performance and Analytics Cookies:</strong> To analyze how our Services are used, improve performance, and help us understand user behavior (e.g., pages visited, session duration, and clickstream data).</li>
            <li><strong>Functional Cookies:</strong> To remember your preferences and provide a more personalized experience across our platforms.</li>
            <li><strong>Advertising Cookies:</strong> To deliver targeted advertisements and measure the effectiveness of our marketing campaigns across our products and services. These may include cookies set by third parties that work with us.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Types of Cookies We Use</SectionTitle>
          <List>
            <li><strong>First-Party Cookies:</strong> Set by Revolvo Tech directly when you use our Services.</li>
            <li><strong>Third-Party Cookies:</strong> Set by our trusted partners and service providers (e.g., analytics tools, advertising networks) to help us analyze usage and serve personalized ads. We encourage you to review the privacy policies of these third parties for further details.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Your Choices Regarding Cookies</SectionTitle>
          <Paragraph>
            Most web browsers allow you to control cookies through their settings. You can:
          </Paragraph>
          <List>
            <li><strong>Accept or Reject Cookies:</strong> Adjust your browser settings to accept, reject, or delete cookies. Note that blocking certain cookies may affect your ability to use our Services fully.</li>
            <li><strong>Cookie Consent Tools:</strong> Many of our Services include built-in options to manage your cookie preferences (such as a "Cookie Settings" or "Do Not Track" option).</li>
          </List>
          <Paragraph>
            For further guidance on managing cookies, please refer to your browser's help documentation.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>5. Changes to Our Cookie Policy</SectionTitle>
          <Paragraph>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post any changes on this page and indicate the updated "Last Updated" date. We encourage you to review this Cookie Policy periodically.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions about this Cookie Policy or our use of cookies, please contact us:
          </Paragraph>
          <div style={{ 
            padding: '20px', 
            background: 'rgba(251, 182, 4, 0.05)', 
            borderRadius: '8px',
            border: '1px solid rgba(251, 182, 4, 0.2)',
            marginTop: '15px'
          }}>
            <List>
              <li><strong>Website:</strong> revolvo.tech</li>
              <li><strong>General Inquiries:</strong> <a href="mailto:hey@revolvo.tech" style={{ color: '#fbb604', textDecoration: 'none', fontWeight: '600' }}>hey@revolvo.tech</a></li>
              <li><strong>User Support:</strong> <a href="mailto:help@revolvo.tech" style={{ color: '#fbb604', textDecoration: 'none', fontWeight: '600' }}>help@revolvo.tech</a></li>
              <li><strong>Legal:</strong> <a href="mailto:legal@revolvo.tech" style={{ color: '#fbb604', textDecoration: 'none', fontWeight: '600' }}>legal@revolvo.tech</a></li>
            </List>
          </div>
        </Section>
      </div>
    </CookieWrapper>
  );
};

export default CookiePolicy; 