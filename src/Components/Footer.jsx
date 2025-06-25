// Footer.js
import React from "react";
import styled from "styled-components";
import logoImg from "../assets/revolvo-logo.png";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { designSystem } from "../themes";

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
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${designSystem.spacing.xxxl};
  max-width: 1400px;
  margin: 0 auto;

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
`;

const CompanySection = styled(FooterSection)`
  @media (max-width: ${designSystem.breakpoints.laptop}) {
    grid-column: 1 / -1;
  }
`;

const Logo = styled.img`
  width: 45px;
  height: 45px;
  margin-bottom: ${designSystem.spacing.md};
`;

const CompanyDescription = styled.p`
  font-size: ${designSystem.typography.scale.body.fontSize};
  color: ${designSystem.colors.text.secondary};
  line-height: ${designSystem.typography.scale.body.lineHeight};
  margin-bottom: ${designSystem.spacing.lg};
  max-width: 400px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${designSystem.spacing.md};
  margin-top: ${designSystem.spacing.xs};
`;

const SocialIcon = styled.a`
  color: ${designSystem.colors.text.primary};
  font-size: ${designSystem.typography.scale.h6.fontSize};
  transition: ${designSystem.effects.animations.transition};

  &:hover {
    transform: translateY(-3px);
    color: ${designSystem.colors.primary.gold};
    filter: drop-shadow(0 2px 8px rgba(255, 235, 59, 0.3));
  }
`;

const FooterTitle = styled.h3`
  font-size: ${designSystem.typography.scale.h6.fontSize};
  margin-bottom: ${designSystem.spacing.lg};
  font-weight: ${designSystem.typography.scale.h6.fontWeight};
  color: ${designSystem.colors.text.primary};
`;

const FooterLink = styled.a`
  color: ${designSystem.colors.text.secondary};
  text-decoration: none;
  margin-bottom: ${designSystem.spacing.sm};
  transition: ${designSystem.effects.animations.transition};
  cursor: pointer;
  font-size: ${designSystem.typography.scale.body.fontSize};

  &:hover {
    color: ${designSystem.colors.primary.gold};
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  color: ${designSystem.colors.text.secondary};
  margin-bottom: ${designSystem.spacing.sm};
  line-height: ${designSystem.typography.scale.bodyLarge.lineHeight};
  font-size: ${designSystem.typography.scale.body.fontSize};
`;

const BottomBar = styled.div`
  margin-top: ${designSystem.spacing.xxxl};
  padding-top: ${designSystem.spacing.md};
  border-top: 1px solid ${designSystem.colors.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;

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

const Footer = () => {
  return (
    <FooterContainer>
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
          {/*<FooterLink as={Link} to="/about-us">About Us</FooterLink>
           <FooterLink href="#">as={Link} to="/our-work">Our Work</FooterLink> */}
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Our Work</FooterLink>
          <FooterLink href="#">Services</FooterLink>
          <FooterLink href="#">Career</FooterLink>
          <FooterLink as={Link} to="/blog">Blog</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Services</FooterTitle>
          <FooterLink href="#">Web Development</FooterLink>
          <FooterLink href="#">App Development</FooterLink>
          <FooterLink href="#">Game Development</FooterLink>
          <FooterLink href="#">UI/UX Design</FooterLink>
          <FooterLink href="#">Consulting</FooterLink>
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
          <BottomLink to="/privacy-policy">Privacy Policy</BottomLink>
          <BottomLink to="/terms-of-service">Terms of Service</BottomLink>
          <BottomLink to="/cookie-policy">Cookie Policy</BottomLink>
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
