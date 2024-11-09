// Footer.js
import React from "react";
import styled from "styled-components";
import logoImg from "../assets/Revolvo.png";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const FooterContainer = styled.footer`
  color: white;
  padding: 80px 8% 40px;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(239, 87, 119, 0.3),
      transparent
    );
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
  width: 130px;
  height: 35px;
  margin-bottom: 20px;
`;

const CompanyDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
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
  color: white;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    color: #ef5777;
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 25px;
  font-weight: 600;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ef5777;
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
  line-height: 1.6;
`;

const BottomBar = styled.div`
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const BottomLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ef5777;
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
