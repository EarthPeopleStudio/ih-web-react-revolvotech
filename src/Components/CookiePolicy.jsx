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

const CookiePolicy = () => {
  const navigate = useNavigate();

  return (
    <PolicyWrapper>
      <Title>Revolvo Tech Cookie Policy</Title>
      <LastUpdated>Last Updated: March 28, 2025</LastUpdated>

      <Paragraph>
        Revolvo Tech Pvt Ltd. ("Revolvo Tech", "we", "our", or "us") uses cookies and similar tracking technologies on our website (revolvo.tech) and across all our products and services—including mobile and desktop applications, games, and other software platforms (collectively, the "Services"). This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
      </Paragraph>

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
        <Paragraph>
          <strong>Essential Cookies:</strong> To enable basic functions such as security, network management, and accessibility. These cookies are essential to ensure the proper operation of our Services.
        </Paragraph>
        <Paragraph>
          <strong>Performance and Analytics Cookies:</strong> To analyze how our Services are used, improve performance, and help us understand user behavior (e.g., pages visited, session duration, and clickstream data).
        </Paragraph>
        <Paragraph>
          <strong>Functional Cookies:</strong> To remember your preferences and provide a more personalized experience across our platforms.
        </Paragraph>
        <Paragraph>
          <strong>Advertising Cookies:</strong> To deliver targeted advertisements and measure the effectiveness of our marketing campaigns across our products and services. These may include cookies set by third parties that work with us.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Types of Cookies We Use</SectionTitle>
        <Paragraph>
          <strong>First-Party Cookies:</strong> Set by Revolvo Tech directly when you use our Services.
        </Paragraph>
        <Paragraph>
          <strong>Third-Party Cookies:</strong> Set by our trusted partners and service providers (e.g., analytics tools, advertising networks) to help us analyze usage and serve personalized ads. We encourage you to review the privacy policies of these third parties for further details.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. Your Choices Regarding Cookies</SectionTitle>
        <Paragraph>
          Most web browsers allow you to control cookies through their settings. You can:
        </Paragraph>
        <Paragraph>
          <strong>Accept or Reject Cookies:</strong> Adjust your browser settings to accept, reject, or delete cookies. Note that blocking certain cookies may affect your ability to use our Services fully.
        </Paragraph>
        <Paragraph>
          <strong>Cookie Consent Tools:</strong> Many of our Services include built-in options to manage your cookie preferences (such as a "Cookie Settings" or "Do Not Track" option).
        </Paragraph>
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

export default CookiePolicy; 