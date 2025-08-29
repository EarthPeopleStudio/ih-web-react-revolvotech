import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaBell, FaUser } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import logoSvg from "../assets/logo.svg";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.1); }
  50% { box-shadow: 0 0 30px rgba(255, 107, 53, 0.2); }
`;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(230, 230, 230, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(30px) saturate(200%);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(230, 230, 230, 0.8);
  }
`;

const NavbarContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 3rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #1a1a2e;
  gap: 0.75rem;
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
  position: relative;

  img {
    width: 40px;
    height: 40px;
    filter: drop-shadow(0 2px 8px rgba(255, 107, 53, 0.2));
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-1px);
    
    img {
      transform: rotate(10deg) scale(1.1);
      filter: drop-shadow(0 4px 12px rgba(255, 107, 53, 0.3));
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #475569;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;

  &:hover {
    color: #1a1a2e;
  }

  &.active {
    color: #ff6b35;
    font-weight: 600;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6b35 0%, #ff4757 100%);
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(230, 230, 230, 0.8);
  background: white;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  font-size: 1.1rem;

  &:hover {
    color: #ff6b35;
    border-color: rgba(255, 107, 53, 0.3);
    background: rgba(255, 107, 53, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
  }

  &.notification {
    &::after {
      content: "";
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background: #ff4757;
      border-radius: 50%;
      border: 2px solid white;
    }
  }
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthButton = styled(Link)`
  padding: 0.75rem 1.75rem;
  border-radius: 12px;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.secondary {
    color: #475569;
    background: white;
    border: 1.5px solid rgba(230, 230, 230, 0.8);

    &:hover {
      color: #1a1a2e;
      border-color: #1a1a2e;
      background: rgba(26, 26, 46, 0.05);
      transform: translateY(-1px);
    }
  }

  &.primary {
    background: linear-gradient(135deg, #ff6b35 0%, #ff4757 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.25);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.35);
      
      &::before {
        left: 100%;
      }
    }
  }
`;

const SpecialBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
  color: #1a1a2e;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
  animation: ${glow} 2s ease-in-out infinite;
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: white;
  border: 1.5px solid rgba(230, 230, 230, 0.8);
  color: #475569;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.6rem;
  border-radius: 10px;

  &:hover {
    color: #ff6b35;
    border-color: rgba(255, 107, 53, 0.3);
    background: rgba(255, 107, 53, 0.05);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(30px);
  border-bottom: 1px solid rgba(230, 230, 230, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  z-index: 999;
  max-height: calc(100vh - 70px);
  overflow-y: auto;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileNavLink = styled(motion.div)`
  a {
    display: block;
    color: #475569;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    padding: 1rem 1.25rem;
    transition: all 0.3s ease;
    border-radius: 12px;
    position: relative;

    &:hover {
      color: #1a1a2e;
      background: rgba(26, 26, 46, 0.05);
      transform: translateX(4px);
    }

    &.active {
      color: #ff6b35;
      font-weight: 600;
      background: rgba(255, 107, 53, 0.08);
    }
  }
`;

const MobileAuthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(230, 230, 230, 0.5);
  padding-top: 1.5rem;
  margin-top: 1rem;
`;

const MobileAuthButton = styled(Link)`
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;

  &.secondary {
    color: #475569;
    border: 1.5px solid rgba(230, 230, 230, 0.8);
    background: white;

    &:hover {
      color: #1a1a2e;
      border-color: #1a1a2e;
      background: rgba(26, 26, 46, 0.05);
    }
  }

  &.primary {
    background: linear-gradient(135deg, #ff6b35 0%, #ff4757 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.25);
    position: relative;

    &:hover {
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.35);
      transform: translateY(-1px);
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
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
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
            <NavLink
              to="/pricing"
              className={location.pathname === "/pricing" ? "active" : ""}
            >
              Pricing
            </NavLink>
          </NavLinks>

          <NavActions>
            <IconButton className="notification">
              <FaBell />
            </IconButton>
            
            <AuthSection>
              <AuthButton to="/login" className="secondary">
                Sign In
              </AuthButton>
              <AuthButton to="/join" className="primary">
                Get Started
              </AuthButton>
            </AuthSection>
          </NavActions>

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

              <MobileNavLink variants={linkVariants}>
                <Link
                  to="/pricing"
                  onClick={closeMobileMenu}
                  className={
                    location.pathname === "/pricing" ? "active" : ""
                  }
                >
                  Pricing
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
                    Get Started - It's Free!
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