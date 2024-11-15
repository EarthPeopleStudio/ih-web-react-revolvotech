// Footer.js
import React from "react";
import styled from "styled-components";
import logoImg from "../assets/Revolvo.png";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const FooterContainer = styled.footer`
  color: var(--text-primary);
  padding: 80px 8% 40px;
  position: relative;
  overflow: hidden;
  background: var(--card-bg);
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
  display: flex;
  flex-direction: column;
`;

const CompanySection = styled(FooterSection)`
  @media (max-width: 968px) {
    grid-column: 1 / -1;
  }
`;

const Logo = styled.img`
  width: 45px;
  height: 45px;
  margin-bottom: 20px;
`;

const CompanyDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 400px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
`;

const SocialIcon = styled.a`
  color: var(--text-primary);
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    color: var(--text-secondary);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 25px;
  font-weight: 600;
  color: var(--text-primary);
`;

const FooterLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--text-primary);
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.6;
`;

const BottomBar = styled.div`
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const BottomLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
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
            <SocialIcon href="#">
              <FaGithub />
            </SocialIcon>
            <SocialIcon href="#">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="#">
              <FaInstagram />
            </SocialIcon>
          </SocialLinks>
        </CompanySection>

        <FooterSection>
          <FooterTitle>Company</FooterTitle>
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
            1234 Digital Avenue
            <br />
            Tech District
            <br />
            California, 90210
          </ContactInfo>
          <ContactInfo>
            contact@revolvo.com
            <br />
            +1 (555) 123-4567
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <Copyright>
          © {new Date().getFullYear()} Revolvo. All rights reserved.
        </Copyright>
        <BottomLinks>
          <BottomLink href="#">Privacy Policy</BottomLink>
          <BottomLink href="#">Terms of Service</BottomLink>
          <BottomLink href="#">Cookie Policy</BottomLink>
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
