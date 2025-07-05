import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";
import logoSvg from "../assets/logo.svg";

// Advanced animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #fafbfc 0%, #ffffff 50%, #f8fafc 100%);
  border-top: 1px solid rgba(255, 107, 53, 0.08);
  color: #64748b;
  padding: 6rem 0 0;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  /* Advanced background pattern */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(255, 107, 53, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(142, 36, 170, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(30, 136, 229, 0.02) 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  /* Floating orbs */
  &::after {
    content: "";
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: linear-gradient(
      135deg,
      rgba(255, 107, 53, 0.02) 0%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(80px);
    animation: ${float} 20s ease-in-out infinite;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 1200px) {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    font-weight: 900;
    color: #0f172a;
    text-decoration: none;
    letter-spacing: -0.04em;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    img {
      width: 42px;
      height: 42px;
      filter: drop-shadow(0 4px 12px rgba(255, 107, 53, 0.15));
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      transform: translateY(-2px);

      img {
        transform: rotate(5deg) scale(1.05);
        filter: drop-shadow(0 8px 24px rgba(255, 107, 53, 0.25));
      }
    }
  }

  .tagline {
    font-family: "Figtree", sans-serif;
    color: #64748b;
    font-size: 1.1rem;
    max-width: 360px;
    line-height: 1.7;
    font-weight: 400;
  }

  .trust-badges {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    .badge {
      padding: 0.5rem 1rem;
      background: rgba(255, 107, 53, 0.08);
      border: 1px solid rgba(255, 107, 53, 0.1);
      border-radius: 20px;
      font-family: "Poppins", sans-serif;
      font-size: 0.85rem;
      color: #ff6b35;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 107, 53, 0.12);
        transform: translateY(-1px);
      }
    }
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .section-title {
    font-family: "Poppins", sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 24px;
      height: 3px;
      background: linear-gradient(135deg, #ff6b35 0%, #e55722 100%);
      border-radius: 2px;
    }

    @media (max-width: 768px) {
      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;

const FooterLink = styled(Link)`
  color: #64748b;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0.25rem 0;
  display: inline-block;

  &:hover {
    color: #ff6b35;
    transform: translateX(4px);
  }

  &::before {
    content: "";
    position: absolute;
    left: -8px;
    top: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #ff6b35 0%, #e55722 100%);
    border-radius: 1px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(-50%);
  }

  &:hover::before {
    width: 4px;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 107, 53, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-family: "Figtree", sans-serif;
  font-size: 0.95rem;

  .heart {
    color: #ff6b35;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(100, 116, 139, 0.08);
  color: #64748b;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(100, 116, 139, 0.1);
  position: relative;
  overflow: hidden;

  /* Hover gradient backgrounds */
  &.email:hover {
    background: linear-gradient(135deg, #ea4335 0%, #fbbc05 100%);
    color: white;
    border-color: transparent;
  }

  &.twitter:hover {
    background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
    color: white;
    border-color: transparent;
  }

  &.instagram:hover {
    background: linear-gradient(135deg, #f56040 0%, #833ab4 50%, #c13584 100%);
    color: white;
    border-color: transparent;
  }

  &.linkedin:hover {
    background: linear-gradient(135deg, #0077b5 0%, #00a0dc 100%);
    color: white;
    border-color: transparent;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  /* Ripple effect */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transition: all 0.4s ease;
    transform: translate(-50%, -50%);
  }

  &:active::before {
    width: 100%;
    height: 100%;
  }
`;

const ChoreoFooter = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterMain>
          <LogoSection>
            <Link to="/" className="logo">
              <img src={logoSvg} alt="Choreo Logo" />
              Choreo
            </Link>
            <p className="tagline">
              The free marketplace connecting families with local helpers for
              household chores. Safe, simple, and trusted by thousands.
            </p>
            <div className="trust-badges">
              <span className="badge">Free Forever</span>
              <span className="badge">Verified Helpers</span>
              <span className="badge">Secure Payments</span>
            </div>
          </LogoSection>

          <FooterSection>
            <h3 className="section-title">Platform</h3>
            <FooterLink to="/marketplace">Marketplace</FooterLink>
            <FooterLink to="/how-it-works">How it Works</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
            <FooterLink to="/safety">Safety Center</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3 className="section-title">Support</h3>
            <FooterLink to="/help">Help Center</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/community">Community</FooterLink>
            <FooterLink to="/status">Service Status</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3 className="section-title">Legal</h3>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/cookies">Cookie Policy</FooterLink>
            <FooterLink to="/guidelines">Guidelines</FooterLink>
          </FooterSection>
        </FooterMain>

        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} Choreo by Revolvo Tech. Made with
            <FaHeart className="heart" />
            for families everywhere.
          </Copyright>

          <SocialLinks>
            <SocialLink
              href="mailto:hello@choreo.app"
              className="email"
              title="Email us"
            >
              <FaEnvelope />
            </SocialLink>
            <SocialLink
              href="https://twitter.com/choreoapp"
              className="twitter"
              title="Follow on Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialLink>
            <SocialLink
              href="https://instagram.com/choreoapp"
              className="instagram"
              title="Follow on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/company/choreoapp"
              className="linkedin"
              title="Connect on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default ChoreoFooter;
