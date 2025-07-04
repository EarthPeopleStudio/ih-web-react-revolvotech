import React from "react";
import styled, { keyframes } from "styled-components";
import hiveKeyVideo from "../assets/projects/apps/hivekey.mp4";
import windowsLogo from "../assets/windows-11-icon.png";
import playstoreLogo from "../assets/google-play-store-logo.png";

const circuitPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 182, 4, 0); }
  50% { box-shadow: 0 0 0 4px rgba(251, 182, 4, 0.1); }
`;

const digitalFlicker = keyframes`
  0%, 100% { opacity: 1; }
  2% { opacity: 0.8; }
  4% { opacity: 1; }
  6% { opacity: 0.9; }
  8% { opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(251, 182, 4, 0.2); }
  50% { box-shadow: 0 0 30px rgba(251, 182, 4, 0.4); }
  100% { box-shadow: 0 0 20px rgba(251, 182, 4, 0.2); }
`;

const ProjectWrapper = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 120px 5% 80px;
  position: relative;
  
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

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ProjectTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #FFEB3B 0%, #FFD700 50%, #FFEB3B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  letter-spacing: -0.01em;
  line-height: 1.2;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }
`;

const ProjectSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 48px;
  max-width: 700px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 36px;
  }

  strong {
    color: #fbb604;
    font-weight: 500;
  }
`;

const MainImage = styled.div`
  max-width: 900px;
  margin: 0 auto 80px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(251, 182, 4, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
  
  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.6);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }

  video {
    width: 100%;
    height: auto;
    display: block;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(251, 182, 4, 0.2);
    border-color: rgba(251, 182, 4, 0.4);
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const StepsSection = styled.div`
  margin: 100px 0;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const StepCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 32px;
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);

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
    transform: translateY(-8px);
    border-color: rgba(251, 182, 4, 0.6);
    box-shadow: 0 25px 50px rgba(251, 182, 4, 0.15);

    .step-number {
      color: #fbb604;
    }
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const StepNumber = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: rgba(251, 182, 4, 0.2);
  position: absolute;
  top: 20px;
  right: 20px;
  transition: color 0.3s ease;
`;

const StepTitle = styled.h3`
  font-size: 1.6rem;
  color: #fbb604;
  margin-bottom: 15px;
  font-weight: 700;
`;

const StepDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1.1rem;
`;

const SecurityHighlight = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 32px;
  margin: 60px 0;
  backdrop-filter: blur(10px);
  display: flex;
  gap: 30px;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;

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
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 28px;
  }
`;

const SecurityIcon = styled.div`
  font-size: 3.5rem;
  color: #fbb604;
`;

const SecurityContent = styled.div`
  flex: 1;
`;

const SecurityTitle = styled.h3`
  font-size: 1.8rem;
  color: #fbb604;
  margin-bottom: 15px;
  font-weight: 700;
`;

const SecurityText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1.1rem;

  strong {
    color: #fbb604;
    font-weight: 500;
  }
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin: 80px 0;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.8s;
  animation-fill-mode: both;
`;

const FeatureCard = styled.div`
  background: rgba(30, 30, 35, 0.6);
  border: 1px solid rgba(251, 182, 4, 0.1);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(251, 182, 4, 0.3);
    box-shadow: 0 15px 30px rgba(251, 182, 4, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  color: #fbb604;
  margin-bottom: 20px;
  font-weight: 700;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1.1rem;
`;

const DownloadSection = styled.div`
  text-align: center;
  margin: 80px 0;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 1.0s;
  animation-fill-mode: both;
`;

const DownloadTitle = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 40px;
  font-weight: 700;
`;

const DownloadButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 30px;
  background: #fbb604;
  color: #000000;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(251, 182, 4, 0.2);
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const HivekeyProject = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ProjectWrapper>
      <ContentContainer>
        <ProjectTitle>HiveKey</ProjectTitle>
        <ProjectSubtitle>
          Generate <strong>complex passwords</strong> that you never need to remember or store. Just use your master key and service name to <strong>recreate the same secure password</strong> anytime, anywhere.
        </ProjectSubtitle>

        <MainImage>
          <video src={hiveKeyVideo} autoPlay loop muted playsInline />
        </MainImage>

        <StepsSection>
          <ProjectTitle style={{ fontSize: '2.8rem' }}>How to Use HiveKey</ProjectTitle>
          <StepsGrid>
            <StepCard>
              <StepNumber className="step-number">1</StepNumber>
              <StepTitle>Set Your Security Key</StepTitle>
              <StepDescription>
                Choose a memorable master phrase that only you know. This becomes your personal encryption key.
                Keep it safe and never share it with anyone.
              </StepDescription>
            </StepCard>

            <StepCard>
              <StepNumber className="step-number">2</StepNumber>
              <StepTitle>Enter Service Name</StepTitle>
              <StepDescription>
                Type the name of the service you need a password for (e.g., "gmail", "facebook", "netflix").
                The same combination of security key and service name will always generate the exact same password,
                so you don't need to remember or store complex passwords.
              </StepDescription>
            </StepCard>

            <StepCard>
              <StepNumber className="step-number">3</StepNumber>
              <StepTitle>Get Your Password</StepTitle>
              <StepDescription>
                HiveKey instantly generates a strong 16-character password with a perfect mix of lowercase,
                uppercase, numbers, and special characters. Copy and use it for your service.
              </StepDescription>
            </StepCard>
          </StepsGrid>

          <SecurityHighlight>
            <SecurityIcon>🛡️</SecurityIcon>
            <SecurityContent>
              <SecurityTitle>Mathematically Unbreakable</SecurityTitle>
              <SecurityText>
                HiveKey's default 16-character passwords would take over <strong>12 trillion years</strong> to crack
                using brute force methods. Each combination of your security key and service name creates a
                unique, reproducible password that's virtually impossible to guess.
              </SecurityText>
            </SecurityContent>
          </SecurityHighlight>
        </StepsSection>

        <FeaturesSection>
          <FeatureCard>
            <FeatureTitle>Secure by Design</FeatureTitle>
            <FeatureDescription>
              Using state-of-the-art cryptographic algorithms to generate unique, robust passwords
              that are virtually impossible to crack. No passwords are ever stored - they're generated on demand.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureTitle>Consistent & Reliable</FeatureTitle>
            <FeatureDescription>
              HiveKey guarantees that the same security key and service name will always generate the exact same password.
              This means you can reliably recreate your passwords anytime, anywhere, without needing to store or remember them.
              Just remember your security key!
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureTitle>Cross-Platform</FeatureTitle>
            <FeatureDescription>
              Available on Windows and Android, with seamless synchronization and consistent
              experience across all your devices. Your passwords are always available when you need them.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesSection>

        <DownloadSection>
          <DownloadTitle>Get HiveKey Now</DownloadTitle>
          <DownloadButtons>
            <DownloadButton href="https://revolvotech.s3.us-east-1.amazonaws.com/ih/app/flutter/hivekey/HiveKey.exe">
              <img src={windowsLogo} alt="Windows" />
              Download for Windows
            </DownloadButton>
            <DownloadButton href="https://play.google.com/store/apps/details?id=com.revolvotech.hivekey&hl=en_GB&pli=1">
              <img src={playstoreLogo} alt="Android" />
              Get it on Play Store
            </DownloadButton>
          </DownloadButtons>
        </DownloadSection>
      </ContentContainer>
    </ProjectWrapper>
  );
};

export default HivekeyProject; 