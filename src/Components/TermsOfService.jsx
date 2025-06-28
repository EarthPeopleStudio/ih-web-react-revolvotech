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

const TermsWrapper = styled.div`
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

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <TermsWrapper>
      <Title>Terms of Service</Title>
      <LastUpdated>Last Updated: March 15, 2024</LastUpdated>

      <Paragraph>
        Welcome to Revolvo Tech Pvt Ltd. ("Revolvo Tech," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our products and services, including websites, applications, games, and any other software platforms provided by us (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
      </Paragraph>

      <Section>
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Paragraph>
          By accessing or using any of our Services, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Services.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Changes to Terms</SectionTitle>
        <Paragraph>
          We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Use of Services</SectionTitle>
        <Paragraph>
          You agree to use our Services only for lawful purposes and in accordance with these Terms. You are prohibited from:
        </Paragraph>
        <List>
          <li>Violating any applicable laws or regulations</li>
          <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others</li>
          <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Account Registration</SectionTitle>
        <Paragraph>
          To access certain features of our Services, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate and complete.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>5. Termination</SectionTitle>
        <Paragraph>
          We reserve the right to suspend or terminate your access to our Services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of our Services, us, or third parties, or for any other reason.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Disclaimers</SectionTitle>
        <Paragraph>
          Our Services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the Services will be uninterrupted or error-free.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>7. Limitation of Liability</SectionTitle>
        <Paragraph>
          To the fullest extent permitted by applicable law, Revolvo Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>8. Governing Law</SectionTitle>
        <Paragraph>
          These Terms are governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law principles.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>9. Contact Information</SectionTitle>
        <Paragraph>
          For any questions about these Terms, please contact us at:
        </Paragraph>
        <Paragraph>
          Website: revolvo.tech
          <br />
          General Inquiries: hey@revolvo.tech
          <br />
          User Support: help@revolvo.tech
          <br />
          Legal: legal@revolvo.tech
        </Paragraph>
      </Section>
    </TermsWrapper>
  );
};

export default TermsOfService; 