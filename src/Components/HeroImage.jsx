import React from "react";
import styled from "styled-components";
import AnimatedHero from "./AnimatedHero";

const HeroWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 160px 8% 100px;
  color: var(--text-primary);
  height: 65vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 120px 5% 60px;
    min-height: auto;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  max-width: 650px;
  position: relative;
  z-index: 2;
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

const Button = styled.button`
  padding: 15px 35px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const PortfolioBtn = styled(Button)`
  background: var(--button-bg);
  border: none;
  color: var(--button-text);
  box-shadow: var(--button-glow);

  &:hover {
    transform: translateY(-2px);
    background: var(--button-hover-bg);
    box-shadow: var(--button-hover-glow);
  }
`;

const ContactBtn = styled(Button)`
  background: transparent;
  border: 1px solid var(--button-border);
  color: var(--button-text);

  &:hover {
    background: var(--button-hover-bg);
    transform: translateY(-2px);
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 600px;
`;

const HeroImage = () => {
  return (
    <HeroWrapper>
      <ContentWrapper>
        <HeroText>
          Crafting Digital
          <br />
          Excellence with
          <br />
          <span>Innovation</span>
        </HeroText>
        <HeroDescription>
          We specialize in creating cutting-edge digital solutions across web,
          mobile, and game development. Transform your vision into reality with
          our expert team.
        </HeroDescription>
        <ButtonSection>
          <PortfolioBtn>View Portfolio</PortfolioBtn>
          <ContactBtn>Contact Us</ContactBtn>
        </ButtonSection>
      </ContentWrapper>
      <ImageWrapper>
        <AnimatedHero />
      </ImageWrapper>
    </HeroWrapper>
  );
};

export default HeroImage;
