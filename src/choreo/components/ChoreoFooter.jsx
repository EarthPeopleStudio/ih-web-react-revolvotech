import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeart,
  FaArrowRight
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import logoSvg from "../assets/logo.svg";

const FooterContainer = styled.footer`
  background: white;
  border-top: 1px solid rgba(230, 230, 230, 0.5);
  color: #475569;
  padding: 5rem 0 0;
  margin-top: auto;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: #1a1a2e;
    text-decoration: none;
    width: fit-content;
    transition: all 0.3s ease;

    img {
      width: 36px;
      height: 36px;
      filter: drop-shadow(0 2px 8px rgba(255, 107, 53, 0.15));
      transition: all 0.3s ease;
    }

    &:hover {
      transform: translateY(-1px);
      
      img {
        transform: rotate(10deg) scale(1.1);
      }
    }
  }

  .tagline {
    font-family: "Figtree", sans-serif;
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 320px;
  }

  .newsletter {
    margin-top: 0.5rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  max-width: 320px;
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1.5px solid rgba(230, 230, 230, 0.8);
  border-radius: 10px;
  background: rgba(248, 250, 252, 0.5);
  color: #1a1a2e;
  font-family: "Figtree", sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 107, 53, 0.4);
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const NewsletterButton = styled.button`
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #ff6b35 0%, #ff4757 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.25);
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .section-title {
    font-family: "Poppins", sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }
`;

const FooterLink = styled(Link)`
  color: #475569;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
  display: inline-block;
  width: fit-content;
  position: relative;

  &:hover {
    color: #ff6b35;
    transform: translateX(2px);
  }

  &.new {
    &::after {
      content: "NEW";
      position: absolute;
      top: -2px;
      right: -35px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      font-size: 0.6rem;
      font-weight: 700;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid rgba(230, 230, 230, 0.5);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #94a3b8;
  font-family: "Figtree", sans-serif;
  font-size: 0.9rem;

  .heart {
    color: #ff6b35;
    font-size: 0.85rem;
  }

  a {
    color: #475569;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #ff6b35;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(230, 230, 230, 0.5);
  color: #64748b;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff6b35;
    border-color: rgba(255, 107, 53, 0.3);
    background: rgba(255, 107, 53, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
  }
`;

const PromoSection = styled.div`
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 71, 87, 0.05) 100%);
  border: 1px solid rgba(255, 107, 53, 0.1);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  .promo-content {
    flex: 1;

    h3 {
      font-family: "Poppins", sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @media (max-width: 768px) {
        justify-content: center;
      }
    }

    p {
      color: #64748b;
      font-size: 0.95rem;
    }
  }

  .promo-action {
    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 2rem;
      background: linear-gradient(135deg, #ff6b35 0%, #ff4757 100%);
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-family: "Poppins", sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.25);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.35);
      }
    }
  }
`;

const ChoreoFooter = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
    <FooterContainer>
      <FooterContent>
        <PromoSection>
          <div className="promo-content">
            <h3>
              <HiSparkles style={{ color: '#ff6b35' }} />
              Ready to transform your chores?
            </h3>
            <p>Join thousands of families already saving time and earning money.</p>
          </div>
          <div className="promo-action">
            <Link to="/join">
              Get Started Free
              <FaArrowRight />
            </Link>
          </div>
        </PromoSection>

        <FooterMain>
          <BrandSection>
            <Link to="/" className="logo">
              <img src={logoSvg} alt="Choreo Logo" />
              Choreo
            </Link>
            <p className="tagline">
              The smart way to handle household chores. Connect with trusted local helpers and transform your daily tasks.
            </p>
            <div className="newsletter">
              <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#64748b' }}>
                Stay updated with our latest features
              </p>
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <NewsletterInput 
                  type="email" 
                  placeholder="Your email"
                  required
                />
                <NewsletterButton type="submit">
                  <FaArrowRight />
                </NewsletterButton>
              </NewsletterForm>
            </div>
          </BrandSection>

          <FooterSection>
            <h3 className="section-title">Product</h3>
            <FooterLink to="/features">Features</FooterLink>
            <FooterLink to="/marketplace">Marketplace</FooterLink>
            <FooterLink to="/how-it-works">How it Works</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
            <FooterLink to="/mobile" className="new">Mobile App</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3 className="section-title">Company</h3>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/press">Press Kit</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3 className="section-title">Resources</h3>
            <FooterLink to="/help">Help Center</FooterLink>
            <FooterLink to="/safety">Safety Guidelines</FooterLink>
            <FooterLink to="/community">Community</FooterLink>
            <FooterLink to="/api">API Docs</FooterLink>
            <FooterLink to="/terms">Terms & Privacy</FooterLink>
          </FooterSection>
        </FooterMain>

        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} Choreo by{" "}
            <a href="https://revolvo.tech" target="_blank" rel="noopener noreferrer">
              Revolvo Tech
            </a>
            . Built with <FaHeart className="heart" /> in NYC.
          </Copyright>

          <SocialLinks>
            <SocialLink
              href="mailto:hello@choreo.app"
              title="Email us"
            >
              <FaEnvelope />
            </SocialLink>
            <SocialLink
              href="https://twitter.com/choreoapp"
              title="Follow on Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialLink>
            <SocialLink
              href="https://instagram.com/choreoapp"
              title="Follow on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/company/choreoapp"
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