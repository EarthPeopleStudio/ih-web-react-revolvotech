import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import hiveKeyMain from "../assets/hivekey.png";
import hiveKeySettings from "../assets/hivekey-settings.png";
import hiveKeyOptions from "../assets/hivekey-options.png";
import windowsLogo from "../assets/windows-11-icon.png";
import playstoreLogo from "../assets/google-play-store-logo.png";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 15px rgba(251, 182, 4, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(251, 182, 4, 0.5);
  }
  100% {
    box-shadow: 0 0 15px rgba(251, 182, 4, 0.3);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const ProjectWrapper = styled.div`
  background: #000000;
  min-height: 100vh;
  color: var(--text-primary);
  padding: 120px 8% 80px;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const ProjectTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #fbb604, #f99b04, #d39404);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProjectSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroImageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 40px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${float} 6s ease-in-out infinite;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 80px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(248, 248, 248, 0.95);
  color: #222;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 200px;
  justify-content: center;
  
  &:hover {
    background: #fbb604;
    color: #000;
    transform: translateY(-3px);
    animation: ${pulse} 2s infinite ease-in-out;
  }
  
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FeatureCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(251, 182, 4, 0.3);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-primary);
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  text-align: center;
`;

const FeatureImage = styled.div`
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const SecurityFeatures = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid var(--border-color);
  margin-bottom: 60px;
`;

const SecurityTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: var(--text-primary);
`;

const SecurityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SecurityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  .icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .content {
    flex: 1;
    
    strong {
      color: var(--text-primary);
      display: block;
      margin-bottom: 5px;
    }
    
    span {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
`;

// How It Works Section Styles
const HowItWorksSection = styled.div`
  margin-bottom: 80px;
  text-align: center;
`;

const HowItWorksTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 50px;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px 25px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(251, 182, 4, 0.3);
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #fbb604, #f99b04);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  margin: 0 auto 20px;
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const StepDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
`;

const SecurityHighlight = styled.div`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(249, 155, 4, 0.05));
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  gap: 25px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

const SecurityIcon = styled.div`
  font-size: 3rem;
  flex-shrink: 0;
`;

const SecurityText = styled.div`
  flex: 1;
`;

const SecurityMainText = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const SecuritySubText = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1rem;
  
  strong {
    color: #fbb604;
    font-weight: 600;
  }
`;

const KeyBenefits = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(251, 182, 4, 0.2);
  }
`;

const BenefitIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const BenefitText = styled.span`
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
`;

const CallToAction = styled.div`
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(249, 155, 4, 0.1));
  border-radius: 20px;
  border: 1px solid rgba(251, 182, 4, 0.2);
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #fbb604, #f99b04);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTASubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const HivekeyProject = () => {
  return (
    <ProjectWrapper>
      <ContentContainer>
        <HeroSection>
          <ProjectTitle>HiveKey Password Manager</ProjectTitle>
          <ProjectSubtitle>
            Generate unbreakable passwords with military-grade security. 
            HiveKey uses advanced algorithms to create unique, robust passwords 
            from your key phrase and service name - no complex passwords to remember!
          </ProjectSubtitle>
          
          <HeroImageContainer>
            <img src={hiveKeyMain} alt="HiveKey Main Interface" />
          </HeroImageContainer>
          
          <DownloadSection>
            <DownloadButton 
              href="https://revolvotech.s3.us-east-1.amazonaws.com/ih/app/flutter/hivekey/HiveKey.exe" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src={windowsLogo} alt="Windows" />
              Download for Windows
            </DownloadButton>
            <DownloadButton 
              href="https://play.google.com/store/apps/details?id=com.revolvotech.hivekey" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src={playstoreLogo} alt="Play Store" />
              Download for Android
            </DownloadButton>
          </DownloadSection>
        </HeroSection>

        <HowItWorksSection>
          <HowItWorksTitle>How HiveKey Works</HowItWorksTitle>
          <StepsGrid>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepTitle>Set Your Security Key</StepTitle>
              <StepDescription>
                Choose a memorable master phrase that only you know. This becomes your personal encryption key.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepTitle>Enter Service Name</StepTitle>
              <StepDescription>
                Type the name of the service you need a password for (e.g., "gmail", "facebook", "netflix").
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepTitle>Get Your Unique Password</StepTitle>
              <StepDescription>
                HiveKey generates a 16-character password with 4 lowercase, 4 uppercase, 4 digits, and 4 special characters.
              </StepDescription>
            </StepCard>
          </StepsGrid>
          
          <SecurityHighlight>
            <SecurityIcon>🛡️</SecurityIcon>
            <SecurityText>
              <SecurityMainText>Mathematically Unbreakable</SecurityMainText>
              <SecuritySubText>
                With our default 16-character passwords, it would take over <strong>12 trillion years</strong> to brute force. 
                Each combination of your security key + service name creates a completely unique, reproducible password.
              </SecuritySubText>
            </SecurityText>
          </SecurityHighlight>
          
          <KeyBenefits>
            <BenefitItem>
              <BenefitIcon>🔑</BenefitIcon>
              <BenefitText>Same inputs = Same password every time</BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon>🧠</BenefitIcon>
              <BenefitText>No complex passwords to remember</BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon>💾</BenefitIcon>
              <BenefitText>Save services for quick access</BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon>🔒</BenefitIcon>
              <BenefitText>Zero password storage or cloud sync</BenefitText>
            </BenefitItem>
          </KeyBenefits>
        </HowItWorksSection>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🔧</FeatureIcon>
            <FeatureTitle>Custom Password Length</FeatureTitle>
            <FeatureDescription>
              Take control of your security. Set your desired password length, 
              from short and sweet to incredibly complex.
            </FeatureDescription>
            <FeatureImage>
              <img src={hiveKeySettings} alt="Password Length Settings" />
            </FeatureImage>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>⚙️</FeatureIcon>
            <FeatureTitle>Advanced Options</FeatureTitle>
            <FeatureDescription>
              Customize your security settings with PIN protection, clipboard 
              auto-clear, and screenshot protection.
            </FeatureDescription>
            <FeatureImage>
              <img src={hiveKeyOptions} alt="Advanced Options" />
            </FeatureImage>
          </FeatureCard>
        </FeaturesGrid>

        <SecurityFeatures>
          <SecurityTitle>Enhanced Security Features</SecurityTitle>
          <SecurityList>
            <SecurityItem>
              <span className="icon">🔒</span>
              <div className="content">
                <strong>PIN Protection</strong>
                <span>Secure your app with a personal PIN, adding an extra layer of defense.</span>
              </div>
            </SecurityItem>
            
            <SecurityItem>
              <span className="icon">📋</span>
              <div className="content">
                <strong>Auto-clear Clipboard</strong>
                <span>Generated passwords are automatically cleared after 30 seconds.</span>
              </div>
            </SecurityItem>
            
            <SecurityItem>
              <span className="icon">📸</span>
              <div className="content">
                <strong>Screenshot Protection</strong>
                <span>Prevent sensitive information from being captured by screenshots.</span>
              </div>
            </SecurityItem>
            
            <SecurityItem>
              <span className="icon">🚀</span>
              <div className="content">
                <strong>High Performance Mode</strong>
                <span>Optimize app performance for smooth experience on all devices.</span>
              </div>
            </SecurityItem>
          </SecurityList>
        </SecurityFeatures>

        <CallToAction>
          <CTATitle>Unbreakable Security, Effortlessly</CTATitle>
          <CTASubtitle>
            Join thousands of users who trust HiveKey to protect their digital lives. 
            Download now and experience password security reimagined.
          </CTASubtitle>
          <DownloadSection>
            <DownloadButton 
              href="https://revolvotech.s3.us-east-1.amazonaws.com/ih/app/flutter/hivekey/HiveKey.exe" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src={windowsLogo} alt="Windows" />
              Get Started on Windows
            </DownloadButton>
            <DownloadButton 
              href="https://play.google.com/store/apps/details?id=com.revolvotech.hivekey" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src={playstoreLogo} alt="Play Store" />
              Get Started on Android
            </DownloadButton>
          </DownloadSection>
        </CallToAction>
      </ContentContainer>
    </ProjectWrapper>
  );
};

export default HivekeyProject; 