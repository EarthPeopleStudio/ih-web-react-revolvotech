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
  background: var(--dark-bg);

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
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;

  span {
    color: var(--accent-color);
    -webkit-text-fill-color: var(--accent-color);
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
  color: var(--text-secondary);
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 560px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
    margin: 0 auto 35px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const PortfolioBtn = styled(Link)`
  background: var(--button-bg);
  border: none;
  color: var(--button-text);
  box-shadow: var(--button-glow);
  padding: 15px 35px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
    background: var(--button-hover-bg);
    box-shadow: var(--button-hover-glow);
  }
`;

const PricingBtn = styled(Link)`
  background: transparent;
  border: 1px solid var(--button-border);
  color: var(--button-text);
  padding: 15px 35px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: var(--button-hover-bg);
    transform: translateY(-2px);
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
