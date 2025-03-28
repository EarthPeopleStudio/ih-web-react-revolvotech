import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PolicyWrapper = styled.div`
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
  margin-bottom: 30px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const LastUpdated = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 40px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
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
    margin-bottom: 10px;
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

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <PolicyWrapper>
      <Title>Terms of Service</Title>
      <LastUpdated>Last Updated: March 28, 2025</LastUpdated>

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
          <li>Violating any applicable laws or regulations.</li>
          <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others.</li>
          <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Services.</li>
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

      <BackButton onClick={() => navigate(-1)}>← Go Back</BackButton>
    </PolicyWrapper>
  );
};

export default TermsOfService; 