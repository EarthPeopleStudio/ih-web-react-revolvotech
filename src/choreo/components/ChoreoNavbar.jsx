import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logoSvg from "../assets/logo.svg";

// Advanced animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(32px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  /* Advanced glassmorphism effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    pointer-events: none;
  }

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(40px) saturate(200%);
    box-shadow: 0 1px 40px rgba(0, 0, 0, 0.08),
      0 2px 80px rgba(255, 107, 53, 0.02);
    border-bottom: 1px solid rgba(255, 107, 53, 0.1);

    &::before {
      background: linear-gradient(
        135deg,
        rgba(255, 107, 53, 0.02) 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
    }
  }
`;

const NavbarContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 3rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: #0f172a;
  gap: 0.9rem;
  letter-spacing: -0.04em;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  img {
    width: 44px;
    height: 44px;
    filter: drop-shadow(0 4px 12px rgba(255, 107, 53, 0.15));
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: #1e293b;
    transform: translateY(-2px);

    img {
      transform: rotate(5deg) scale(1.05);
      filter: drop-shadow(0 8px 24px rgba(255, 107, 53, 0.25));
    }
  }

  /* Subtle glow effect */
  &::after {
    content: "";
    position: absolute;
    inset: -4px;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 107, 53, 0.1),
      transparent
    );
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }

  /* Animated background indicator */
  &::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 107, 53, 0.3),
      transparent
    );
    border-radius: 1px;
    opacity: 0;
    transition: all 0.4s ease;
  }
`;

const NavLink = styled(Link)`
  color: #64748b;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.9rem 0;
  position: relative;
  overflow: hidden;

  &:hover {
    color: #0f172a;
    transform: translateY(-1px);
  }

  &.active {
    color: #ff6b35;
    font-weight: 700;
  }

  /* Advanced underline animation */
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background: linear-gradient(135deg, #ff6b35 0%, #e55722 50%, #ff6b35 100%);
    background-size: 200% 100%;
    animation: ${shimmer} 2s linear infinite;
    border-radius: 2px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
  }

  &:hover::before,
  &.active::before {
    width: 100%;
  }

  /* Hover glow effect */
  &::after {
    content: "";
    position: absolute;
    inset: -8px;
    background: radial-gradient(
      circle,
      rgba(255, 107, 53, 0.05) 0%,
      transparent 70%
    );
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.75rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthButton = styled(Link)`
  padding: 0.9rem 2.5rem;
  border-radius: 16px;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;

  &.secondary {
    color: #64748b;
    background: rgba(100, 116, 139, 0.05);
    border-color: rgba(100, 116, 139, 0.1);

    &:hover {
      color: #0f172a;
      background: rgba(100, 116, 139, 0.1);
      border-color: rgba(100, 116, 139, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(100, 116, 139, 0.15);
    }
  }

  &.primary {
    background: linear-gradient(135deg, #ff6b35 0%, #e55722 100%);
    color: white;
    box-shadow: 0 6px 32px rgba(255, 107, 53, 0.25);
    position: relative;

    /* Animated shimmer effect */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.6s ease;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 48px rgba(255, 107, 53, 0.4);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px);
    }
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: rgba(100, 116, 139, 0.08);
  border: 2px solid rgba(100, 116, 139, 0.1);
  color: #64748b;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.75rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &:hover {
    color: #0f172a;
    background: rgba(100, 116, 139, 0.15);
    border-color: rgba(100, 116, 139, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(40px) saturate(180%);
  border-bottom: 1px solid rgba(255, 107, 53, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),
    0 8px 32px rgba(255, 107, 53, 0.08);
  z-index: 999;

  /* Glassmorphism overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 107, 53, 0.02) 100%
    );
    pointer-events: none;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const MobileNavLink = styled(motion.div)`
  a {
    display: block;
    color: #64748b;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.3rem;
    padding: 1.25rem 1.5rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 16px;
    position: relative;
    overflow: hidden;

    &:hover {
      color: #0f172a;
      background: rgba(255, 107, 53, 0.05);
      transform: translateX(8px);
    }

    &.active {
      color: #ff6b35;
      font-weight: 700;
      background: rgba(255, 107, 53, 0.1);
    }

    /* Animated border */
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 0;
      height: 3px;
      background: linear-gradient(135deg, #ff6b35 0%, #e55722 100%);
      border-radius: 0 2px 2px 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateY(-50%);
    }

    &:hover::before,
    &.active::before {
      width: 4px;
    }
  }
`;

const MobileAuthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top: 2px solid rgba(255, 107, 53, 0.1);
  padding-top: 2.5rem;
  margin-top: 1.5rem;
`;

const MobileAuthButton = styled(Link)`
  padding: 1.25rem 2rem;
  border-radius: 16px;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &.secondary {
    color: #64748b;
    border: 2px solid rgba(100, 116, 139, 0.2);
    background: rgba(100, 116, 139, 0.05);

    &:hover {
      color: #0f172a;
      border-color: rgba(100, 116, 139, 0.3);
      background: rgba(100, 116, 139, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(100, 116, 139, 0.15);
    }
  }

  &.primary {
    background: linear-gradient(135deg, #ff6b35 0%, #e55722 100%);
    color: white;
    box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
    border: none;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 48px rgba(255, 107, 53, 0.4);
    }
  }
`;

const ChoreoNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  return (
    <>
      <NavbarContainer className={isScrolled ? "scrolled" : ""}>
        <NavbarContent>
          <Logo to="/" onClick={closeMobileMenu}>
            <img src={logoSvg} alt="Choreo Logo" />
            Choreo
          </Logo>

          <NavLinks>
            <NavLink
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </NavLink>
            <NavLink
              to="/marketplace"
              className={location.pathname === "/marketplace" ? "active" : ""}
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/how-it-works"
              className={location.pathname === "/how-it-works" ? "active" : ""}
            >
              How it Works
            </NavLink>
          </NavLinks>

          <AuthSection>
            <AuthButton to="/login" className="secondary">
              Sign In
            </AuthButton>
            <AuthButton to="/join" className="primary">
              Join Now
            </AuthButton>
          </AuthSection>

          <MobileMenuToggle onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuToggle>
        </NavbarContent>
      </NavbarContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MobileMenuContent>
              <MobileNavLink variants={linkVariants}>
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={location.pathname === "/" ? "active" : ""}
                >
                  Home
                </Link>
              </MobileNavLink>

              <MobileNavLink variants={linkVariants}>
                <Link
                  to="/marketplace"
                  onClick={closeMobileMenu}
                  className={
                    location.pathname === "/marketplace" ? "active" : ""
                  }
                >
                  Marketplace
                </Link>
              </MobileNavLink>

              <MobileNavLink variants={linkVariants}>
                <Link
                  to="/how-it-works"
                  onClick={closeMobileMenu}
                  className={
                    location.pathname === "/how-it-works" ? "active" : ""
                  }
                >
                  How it Works
                </Link>
              </MobileNavLink>

              <motion.div variants={linkVariants}>
                <MobileAuthSection>
                  <MobileAuthButton
                    to="/login"
                    className="secondary"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </MobileAuthButton>
                  <MobileAuthButton
                    to="/join"
                    className="primary"
                    onClick={closeMobileMenu}
                  >
                    Join Now
                  </MobileAuthButton>
                </MobileAuthSection>
              </motion.div>
            </MobileMenuContent>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChoreoNavbar;
