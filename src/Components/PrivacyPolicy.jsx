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

const PolicyWrapper = styled.div`
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

const TableOfContents = styled.nav`
  position: sticky;
  top: 100px;
  right: 40px;
  float: right;
  width: 250px;
  padding: 20px;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 12px;
  border: 1px solid rgba(251, 182, 4, 0.2);
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  margin-left: 40px;
  margin-bottom: 20px;
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
      linear-gradient(rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 15px 15px;
    opacity: 0.3;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 4px;
    height: 4px;
    background: rgba(251, 182, 4, 0.4);
    border-radius: 50%;
    animation: ${circuitPulse} 3s ease-in-out infinite;
    z-index: 2;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const TOCTitle = styled.h3`
  font-size: 1.2rem;
  color: #fbb604;
  margin-bottom: 15px;
  font-weight: 600;
  position: relative;
  z-index: 1;
`;

const TOCLink = styled.a`
  display: block;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  padding-left: 10px;
  border-left: 2px solid rgba(251, 182, 4, 0.2);
  position: relative;
  z-index: 1;

  &:hover {
    color: #fbb604;
    border-left-color: #fbb604;
    padding-left: 15px;
  }
`;

const PrivacyPolicy = () => {
  return (
    <PolicyWrapper>
      <Title>Privacy Policy</Title>
      <LastUpdated>Last Updated: March 15, 2024</LastUpdated>

      <Paragraph>
        Revolvo Tech Pvt Ltd. (collectively, "Revolvo Tech", "us", "our", or "we") is committed to protecting your privacy across all our products and services—including websites, mobile and desktop applications, games, and any other software platforms provided by us (each a "Service", collectively, the "Services"). This Privacy Policy describes the types of personal information we may collect, how we collect and process that information, and the choices you have regarding our use of your information.
      </Paragraph>

      <Section>
        <SectionTitle>1. Scope & Applicability</SectionTitle>
        <Paragraph>
          This Policy applies universally to all software products and services we develop and offer—whether free, freemium, or premium; ad-supported or ad-free; including in-app purchases and other transactions. It covers all platforms and devices such as desktop, web, Android, iOS, macOS, Linux, smart wearables, smart TVs, gaming consoles, and any future platforms we may support. This Policy does not apply to third-party sites, applications, or services that we do not own or control.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Your Consent</SectionTitle>
        <Paragraph>
          By using any of our Services, you expressly agree to the collection, storage, and use of your information in accordance with the terms of this Policy. If you do not agree to these terms, please do not use our Services. In cases where explicit consent is required, we will request it separately and provide you with the ability to withdraw your consent at any time by contacting us at help@revolvo.tech.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Data We Collect</SectionTitle>
        <Paragraph>
          While we do not collect personally identifiable information (such as your name, address, or phone number) unless you choose to contact us, we do collect certain non-personal identifiers and technical information that help us improve your experience and analyze usage trends across our Services. These include:
        </Paragraph>
        <Paragraph>
          <strong>Device and Browser Data:</strong> Information about your browser type and version, operating system, device type (desktop, mobile, smart device, etc.), unique device identifiers, screen size, and performance data.
        </Paragraph>
        <Paragraph>
          <strong>Usage Data:</strong> Pages or screens visited, session durations, navigation paths, app usage, in-app interactions (e.g., gameplay, in-app purchases), install timestamps, and advertisement interactions.
        </Paragraph>
        <Paragraph>
          <strong>Cookie and Tracking Data:</strong> We use cookies, web beacons, tags, scripts, and similar tracking technologies to gather technical details such as IP address, language settings, time zone, and clickstream data. This helps us provide a personalized experience, manage advertising, and improve our Services.
        </Paragraph>
        <Paragraph>
          <strong>Advertising Identifiers:</strong> Unique advertising IDs (such as IDFA for iOS, AAID for Android, or other similar identifiers) that enable cross-app tracking for personalized advertising.
        </Paragraph>
        <Paragraph>
          <strong>Communications:</strong> When you contact us (for support or legal inquiries), we collect the information you provide (e.g., your name, email address, and message content) to respond to your inquiry.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. Purpose of Use</SectionTitle>
        <Paragraph>
          The information we collect is used for multiple purposes, including to:
        </Paragraph>
        <List>
          <li>Provide, maintain, and improve our Services across all platforms.</li>
          <li>Develop and update our products, troubleshoot technical issues, and analyze trends.</li>
          <li>Customize your experience and deliver content and advertisements relevant to your interests.</li>
          <li>Process in-app purchases and other transactions securely.</li>
          <li>Communicate with you regarding your queries, feedback, or any promotional and operational matters.</li>
          <li>Ensure the security and integrity of our Services and protect against unauthorized or illegal activities.</li>
          <li>Comply with applicable laws and regulations, and respond to legal requests.</li>
        </List>
        <Paragraph>
          Your consent (where required) forms the legal basis for processing your personal data, and you have the right to withdraw that consent at any time without affecting the lawfulness of prior processing.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>5. Cookies and Tracking Technologies</SectionTitle>
        <Paragraph>
          We use a variety of tracking technologies—including cookies, web beacons, tags, and scripts—to automatically collect technical data about your use of our Services. This helps us analyze usage patterns, personalize your experience, manage advertising, and improve overall Service performance.
          You may adjust your browser settings to decline cookies, but note that this may affect your ability to use certain parts of our Services.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Third-Party Data Processors and Analytics</SectionTitle>
        <Paragraph>
          Our Services incorporate third-party tools for analytics, advertising, and data collection. These include, but are not limited to:
        </Paragraph>
        <Paragraph>
          Facebook, Google Analytics, Firebase, Iron Source, Unity Ads, InMobi, and others.
        </Paragraph>
        <Paragraph>
          These third parties may collect information about your interactions with our Services and use cookies or similar technologies. We encourage you to review their privacy policies for more details on their practices.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>7. Data Sharing and Transfers</SectionTitle>
        <Paragraph>
          Except as outlined below, we do not sell or share your personal information with third parties:
        </Paragraph>
        <Paragraph>
          <strong>Affiliates & Service Providers:</strong> We may share data with trusted partners and service providers who support our business operations (e.g., hosting, analytics, customer support) under strict confidentiality obligations.
        </Paragraph>
        <Paragraph>
          <strong>Legal and Security Reasons:</strong> We may disclose information to comply with legal obligations, protect our rights, or investigate security breaches.
        </Paragraph>
        <Paragraph>
          <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of the transaction.
        </Paragraph>
        <Paragraph>
          <strong>Anonymized Data:</strong> We may share aggregated, anonymized data with advertisers or for research purposes.
        </Paragraph>
        <Paragraph>
          We may also transfer your information to countries outside your country of residence. In such cases, we ensure that appropriate safeguards (such as standard contractual clauses) are in place.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>8. Your Privacy Rights</SectionTitle>
        <Paragraph>
          Depending on applicable law, you may have the right to:
        </Paragraph>
        <List>
          <li>Access, update, or delete your personal data.</li>
          <li>Withdraw your consent to our processing activities.</li>
          <li>Request correction or restriction of your data.</li>
          <li>Opt out of receiving promotional communications.</li>
        </List>
        <Paragraph>
          To exercise these rights, please contact us at help@revolvo.tech or use the designated options in our Services. Please note that withdrawing consent may not affect data processing that occurred before the withdrawal.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>9. Data Retention</SectionTitle>
        <Paragraph>
          We retain your data only for as long as necessary to provide our Services or comply with legal obligations. Technical data collected by cookies or tracking technologies is typically stored for up to 13 months, unless a longer retention period is required by law or necessary for dispute resolution.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>10. Security Measures</SectionTitle>
        <Paragraph>
          Revolvo Tech employs a variety of industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>11. Third-Party Sites and Services</SectionTitle>
        <Paragraph>
          Our Services may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices or content of those third-party sites. We recommend reviewing their privacy policies separately.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>12. Children's Privacy</SectionTitle>
        <Paragraph>
          Our Services are not directed at children under 13 (or the applicable age of majority in your region), and we do not knowingly collect data from children. If you believe that we have inadvertently collected data from a child, please contact us immediately so we can take appropriate measures.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>13. Changes to this Privacy Policy</SectionTitle>
        <Paragraph>
          We may update this Policy from time to time. We will notify you of any changes by posting the new Policy on our website. You are encouraged to review this Policy periodically for any updates or changes.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>14. Contact Us</SectionTitle>
        <Paragraph>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us using the following details:
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
    </PolicyWrapper>
  );
};

export default PrivacyPolicy;
