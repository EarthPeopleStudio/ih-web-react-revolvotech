import React from "react";
import styled, { keyframes } from "styled-components";
import { FaUsers, FaRocket, FaCode, FaHeart, FaPalette, FaGamepad, FaLightbulb } from "react-icons/fa";

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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const CareersWrapper = styled.div`
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
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  z-index: 1;
  animation: none;
`;

const Title = styled.h1`
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

const Subtitle = styled.p`
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
`;

const StatusCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 60px 40px;
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  margin-bottom: 80px;
  position: relative;
  overflow: hidden;
  text-align: center;
  
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
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.4;
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
    background: rgba(251, 182, 4, 0.6);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }
`;

const StatusIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
`;

const StatusTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fbb604;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const StatusMessage = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
`;

const StatusSubtext = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const ValuesSection = styled.div`
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
  color: #fbb604;
  position: relative;
  z-index: 1;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const ValueCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 32px;
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 25px 25px;
    opacity: 0.3;
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
    background: rgba(251, 182, 4, 0.4);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(251, 182, 4, 0.6);
    box-shadow: 0 25px 50px rgba(251, 182, 4, 0.15);
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: #fbb604;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 10px rgba(251, 182, 4, 0.3));
  position: relative;
  z-index: 1;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fbb604;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
`;

const ValueDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const ContactSection = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 60px 40px;
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  text-align: center;
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
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.4;
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
    background: rgba(251, 182, 4, 0.6);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }
`;

const ContactTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #fbb604;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
`;

const ContactEmail = styled.a`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fbb604;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    color: #FFEB3B;
    text-shadow: 0 0 10px rgba(251, 182, 4, 0.3);
  }
`;

const Careers = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and diverse perspectives to achieve remarkable results."
    },
    {
      icon: <FaCode />,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to client service."
    },
    {
      icon: <FaHeart />,
      title: "Passion",
      description: "We love what we do and it shows in every project we deliver."
    },
    {
      icon: <FaPalette />,
      title: "Creativity",
      description: "We bring fresh ideas and creative solutions to every challenge we encounter."
    },
    {
      icon: <FaLightbulb />,
      title: "Growth",
      description: "We invest in our team's continuous learning and professional development."
    },
    {
      icon: <FaRocket />,
      title: "Innovation",
      description: "We push boundaries and embrace cutting-edge technologies to deliver solutions that define the future."
    }
  ];

  return (
    <CareersWrapper>
      <HeroSection>
        <Title>We Want to Hear From You</Title>
                  <Subtitle>
            Looking to work with teams that build apps worth $100K+? We don't just code, we create 
            businesses. Join a team where your skills directly impact startup funding, user growth, 
            and the success stories that define the next generation of tech.
          </Subtitle>
      </HeroSection>

      <div style={{ animation: 'fadeIn 0.8s ease' }}>
      <StatusCard>
        <StatusIcon>🚀</StatusIcon>
        <StatusTitle>Elite Team, Selective Growth</StatusTitle>
                  <StatusMessage>
            We hire only 1 in 200 applicants. But if you're that 0.5%, we want to hear from you.
          </StatusMessage>
        <StatusSubtext>
          Top talent doesn't wait for job postings. If you can build products that attract investors, 
          scale to millions of users, or solve complex technical challenges with elegant code, 
          we want to know about you before we need you.
        </StatusSubtext>
      </StatusCard>

      <ValuesSection>
        <SectionTitle>Our Values</SectionTitle>
        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard key={index} delay={`${index * 0.2}s`}>
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
      </ValuesSection>

      <ContactSection>
        <ContactTitle>Ready to Build Six-Figure Apps?</ContactTitle>
                  <ContactText>
            If you're a <strong style={{ color: '#fbb604' }}>senior developer, designer, or technical leader</strong> {' '}
            who's built products that scale, attracted investment, or solved complex problems, we want to meet you.
          <br /><br />
                      Don't send a resume, <strong style={{ color: '#FFEB3B' }}>send us something you've built</strong>. 
          Show us code, design, or projects that prove you can create products that users love and businesses fund.
        </ContactText>
        <ContactEmail href="mailto:job@revolvo.tech">
          job@revolvo.tech
        </ContactEmail>
      </ContactSection>
      </div>
    </CareersWrapper>
  );
};

export default Careers; 