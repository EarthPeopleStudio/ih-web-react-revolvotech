// Footer.js
import React from "react";
import styled, { keyframes } from "styled-components";
import logoImg from "../assets/revolvo-logo.png";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { designSystem } from "../themes";

const subtleGlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const FooterContainer = styled.footer`
  color: ${designSystem.colors.text.primary};
  padding: ${designSystem.spacing.huge} 8% ${designSystem.spacing.xl};
  position: relative;
  overflow: hidden;
  background: ${designSystem.colors.background.secondary};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${designSystem.colors.border.primary};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.4;
    pointer-events: none;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${designSystem.spacing.xxxl};
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: ${designSystem.breakpoints.laptop}) {
    grid-template-columns: 1fr 1fr;
    gap: ${designSystem.spacing.xl};
  }

  @media (max-width: ${designSystem.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${designSystem.spacing.xl};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: -10px;
    width: 4px;
    height: 4px;
    background: #fbb604;
    border-radius: 50%;
    opacity: 0.6;
    animation: ${subtleGlow} 3s ease-in-out infinite;
  }
`;

const CompanySection = styled(FooterSection)`
  @media (max-width: ${designSystem.breakpoints.laptop}) {
    grid-column: 1 / -1;
  }

  &::before {
    width: 6px;
    height: 6px;
    top: -15px;
    right: -15px;
  }
`;

const Logo = styled.img`
  width: 45px;
  height: 45px;
  margin-bottom: ${designSystem.spacing.md};
  position: relative;
  z-index: 2;
`;

const CompanyDescription = styled.p`
  font-size: ${designSystem.typography.scale.body.fontSize};
  color: ${designSystem.colors.text.secondary};
  line-height: ${designSystem.typography.scale.body.lineHeight};
  margin-bottom: ${designSystem.spacing.lg};
  max-width: 400px;
  position: relative;
  z-index: 2;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${designSystem.spacing.md};
  margin-top: ${designSystem.spacing.xs};
  position: relative;
  z-index: 2;
`;

const SocialIcon = styled.a`
  color: ${designSystem.colors.text.primary};
  font-size: ${designSystem.typography.scale.h6.fontSize};
  transition: ${designSystem.effects.animations.transition};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    transform: translate(-50%, -50%);
    border: 1px solid transparent;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px);
    color: ${designSystem.colors.primary.gold};
    filter: drop-shadow(0 2px 8px rgba(255, 235, 59, 0.3));

    &::after {
      border-color: rgba(251, 182, 4, 0.3);
    }
  }
`;

const FooterTitle = styled.h3`
  font-size: ${designSystem.typography.scale.h6.fontSize};
  margin-bottom: ${designSystem.spacing.lg};
  font-weight: ${designSystem.typography.scale.h6.fontWeight};
  color: ${designSystem.colors.text.primary};
  position: relative;
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #fbb604, transparent);
    border-radius: 1px;
  }
`;

const FooterLink = styled(Link)`
  color: ${designSystem.colors.text.secondary};
  text-decoration: none;
  margin-bottom: ${designSystem.spacing.sm};
  transition: ${designSystem.effects.animations.transition};
  cursor: pointer;
  font-size: ${designSystem.typography.scale.body.fontSize};
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    width: 0;
    height: 1px;
    background: ${designSystem.colors.primary.gold};
    transition: width 0.3s ease;
    transform: translateY(-50%);
  }

  &:hover {
    color: ${designSystem.colors.primary.gold};
    transform: translateX(8px);

    &::before {
      width: 6px;
    }
  }
`;

const ContactInfo = styled.div`
  color: ${designSystem.colors.text.secondary};
  margin-bottom: ${designSystem.spacing.sm};
  line-height: ${designSystem.typography.scale.bodyLarge.lineHeight};
  font-size: ${designSystem.typography.scale.body.fontSize};
  position: relative;
  z-index: 2;
`;

const BottomBar = styled.div`
  margin-top: ${designSystem.spacing.xxxl};
  padding-top: ${designSystem.spacing.md};
  border-top: 1px solid ${designSystem.colors.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: ${designSystem.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${designSystem.spacing.md};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${designSystem.colors.text.secondary};
  font-size: ${designSystem.typography.scale.small.fontSize};
`;

const BottomLinks = styled.div`
  display: flex;
  gap: ${designSystem.spacing.lg};
`;

const BottomLink = styled(Link)`
  color: ${designSystem.colors.text.secondary};
  text-decoration: none;
  font-size: ${designSystem.typography.scale.small.fontSize};
  transition: ${designSystem.effects.animations.transition};
  cursor: pointer;

  &:hover {
    color: ${designSystem.colors.primary.gold};
  }
`;

const CircuitAccent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  border: 1px solid rgba(251, 182, 4, 0.1);
  border-radius: 4px;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.3);
    border-radius: 50%;
    animation: ${subtleGlow} 4s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 6px;
    height: 6px;
    background: rgba(251, 182, 4, 0.2);
    border-radius: 50%;
    animation: ${subtleGlow} 3s ease-in-out infinite reverse;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <CircuitAccent />
      <FooterContent>
        <CompanySection>
          <Logo src={logoImg} alt="Revolvo" />
          <CompanyDescription>
            We are a digital agency specializing in web, mobile, and game
            development. Our mission is to deliver innovative solutions that
            drive business growth and user engagement.
          </CompanyDescription>
          <SocialLinks>
            <SocialIcon href="https://github.com/RevolvoTech" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialIcon>
            <SocialIcon href="https://x.com/revolvotech" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/company/revolvotech/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/revolvotech/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
          </SocialLinks>
        </CompanySection>

        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLink to="/about-us" onClick={() => window.scrollTo(0, 0)}>About</FooterLink>
          <FooterLink to="/projects" onClick={() => window.scrollTo(0, 0)}>Projects</FooterLink>
          <FooterLink to="/tech-showcase" onClick={() => window.scrollTo(0, 0)}>Showcase</FooterLink>
          <FooterLink to="/careers" onClick={() => window.scrollTo(0, 0)}>Careers</FooterLink>
          <FooterLink to="/blog" onClick={() => window.scrollTo(0, 0)}>Blog</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Services</FooterTitle>
          <FooterLink to="/tech-showcase?tab=websites" onClick={() => window.scrollTo(0, 0)}>Websites</FooterLink>
          <FooterLink to="/tech-showcase?tab=mobile-apps" onClick={() => window.scrollTo(0, 0)}>Mobile Apps</FooterLink>
          <FooterLink to="/tech-showcase?tab=games" onClick={() => window.scrollTo(0, 0)}>Games</FooterLink>
          <FooterLink to="/tech-showcase?tab=ui-ux" onClick={() => window.scrollTo(0, 0)}>UI/UX</FooterLink>
          <FooterLink to="/contact-us" onClick={() => window.scrollTo(0, 0)}>Get Quote</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <ContactInfo>
            Väinämöisenkatu 11
            <br />
            33540 Tampere
            <br />
            Finland
          </ContactInfo>
          <ContactInfo>
            hey@revolvo.tech
            <br />
            +358 41 7408087
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <Copyright>
          © {new Date().getFullYear()} Revolvo. All rights reserved.
        </Copyright>
        <BottomLinks>
          <BottomLink to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</BottomLink>
          <BottomLink to="/terms-of-service" onClick={() => window.scrollTo(0, 0)}>Terms of Service</BottomLink>
          <BottomLink to="/cookie-policy" onClick={() => window.scrollTo(0, 0)}>Cookie Policy</BottomLink>
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
