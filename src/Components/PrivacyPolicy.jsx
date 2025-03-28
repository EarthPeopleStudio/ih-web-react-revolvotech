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

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <PolicyWrapper>
      <Title>Privacy Policy</Title>
      <LastUpdated>Last Updated: {new Date().toLocaleDateString()}</LastUpdated>

      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          At Revolvo, we take your privacy seriously. This privacy policy
          describes how we collect, use, and protect your personal information
          when you use our website and services.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Information We Collect</SectionTitle>
        <Paragraph>
          We collect information that you provide directly to us, including:
        </Paragraph>
        <List>
          <li>Name and contact information</li>
          <li>Project requirements and specifications</li>
          <li>Communication preferences</li>
          <li>Payment information</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>How We Use Your Information</SectionTitle>
        <Paragraph>We use the information we collect to:</Paragraph>
        <List>
          <li>Provide and improve our services</li>
          <li>Communicate with you about your projects</li>
          <li>Send updates and marketing communications</li>
          <li>Process payments and maintain accounts</li>
          <li>Comply with legal obligations</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>Data Security</SectionTitle>
        <Paragraph>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Your Rights</SectionTitle>
        <Paragraph>You have the right to:</Paragraph>
        <List>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
          <li>Lodge a complaint with supervisory authorities</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>Contact Us</SectionTitle>
        <Paragraph>
          If you have any questions about this Privacy Policy, please contact us
          at:
          <br />
          Email: privacy@revolvo.com
          <br />
          Phone: +1 (555) 123-4567
        </Paragraph>
      </Section>

      <BackButton onClick={() => navigate(-1)}>← Go Back</BackButton>
    </PolicyWrapper>
  );
};

export default PrivacyPolicy;
