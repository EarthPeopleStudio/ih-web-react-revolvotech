// Footer.js
import React from "react";
import styled from "styled-components";
import logoImg from "../assets/Revolvo.png";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { commonStyles } from "../themes";

const FooterContainer = styled.footer`
  color: var(--text-primary);
  padding: var(--spacing-section) 8% var(--spacing-xl);
  position: relative;
  overflow: hidden;
  background: var(--dark-card-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border-color);
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const FooterSection = styled.div`
  ${commonStyles.flexColumn}
`;

const CompanySection = styled(FooterSection)`
  @media (max-width: 968px) {
    grid-column: 1 / -1;
  }
`;

const Logo = styled.img`
  width: 45px;
  height: 45px;
  margin-bottom: var(--spacing-md);
`;

const CompanyDescription = styled.p`
  ${commonStyles.bodyText}
  margin-bottom: var(--spacing-lg);
  max-width: 400px;
`;

const SocialLinks = styled.div`
  ${commonStyles.flexRow}
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);
`;

const SocialIcon = styled.a`
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-3px);
    color: var(--text-secondary);
  }
`;

const FooterTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
`;

const FooterLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  transition: all var(--transition-normal);
  cursor: pointer;

  &:hover {
    color: var(--text-primary);
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  line-height: var(--line-height-relaxed);
`;

const BottomBar = styled.div`
  margin-top: 60px;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  ${commonStyles.flexBetween}

  @media (max-width: 576px) {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
`;

const BottomLinks = styled.div`
  ${commonStyles.flexRow}
  gap: 30px;
`;

const BottomLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-normal);
  cursor: pointer;

  &:hover {
    color: var(--text-primary);
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
          <FooterLink href="#">Blog</FooterLink>
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
