import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AnimatedHero from "./AnimatedHero";
import { useAnimation } from "./AnimationContext";

const HeroWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 120px 8% 60px;
  color: var(--text-primary);
  min-height: 90vh;
  position: relative;
  overflow: hidden;
  background: transparent;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 80px 5% 40px;
    text-align: center;
    gap: 20px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  max-width: 650px;
  position: relative;
  z-index: 2;
  margin-top: -5%;
`;

const HeroText = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #fbb604 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, #fbb604, #f99b04, #d39404);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(251, 182, 4, 0.3);
  }

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const HeroDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: 50px;
  max-width: 560px;
  font-weight: 400;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
    margin: 0 auto 40px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const PortfolioBtn = styled(Link)`
  background: linear-gradient(135deg, #fbb604, #f99b04, #d39404);
  border: none;
  color: #000;
  box-shadow: 0 8px 25px rgba(251, 182, 4, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 18px 40px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 40px rgba(251, 182, 4, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1);
    
    &:before {
      transform: translateX(100%);
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.01);
  }
`;

const PricingBtn = styled(Link)`
  background: transparent;
  border: 2px solid rgba(251, 182, 4, 0.6);
  color: #fbb604;
  padding: 16px 38px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #fbb604, #f99b04);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: #fbb604;
    color: #000;
    box-shadow: 0 15px 40px rgba(251, 182, 4, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2);
    
    &:before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.01);
  }
`;

const ModelSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  height: 100%;
  min-height: 500px;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 400px;
  }
`;

const HeroImage = () => {
  const { setCurrentAnimation } = useAnimation();

  const handleButtonHover = (isHovered) => {
    setCurrentAnimation(isHovered ? 'Kakatte koi' : 'Grin');
  };

  return (
    <HeroWrapper>
      <ContentWrapper>
        <HeroText>
          Crafting Digital
          <br />
          Magic That
          <br />
          <span>Inspires</span>
        </HeroText>
        <HeroDescription>
          We transform bold visions into stunning digital realities. From immersive games 
          to cutting-edge web apps, we craft experiences that captivate, engage, and leave 
          lasting impressions. Ready to make your mark?
        </HeroDescription>
        <ButtonSection>
          <PortfolioBtn 
            to="/projects"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
          >
            View Portfolio
          </PortfolioBtn>
          <PricingBtn 
            to="/pricing"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
          >
            Check Pricing
          </PricingBtn>
        </ButtonSection>
      </ContentWrapper>
      <ModelSection>
        <AnimatedHero />
      </ModelSection>
    </HeroWrapper>
  );
};

export default HeroImage;
