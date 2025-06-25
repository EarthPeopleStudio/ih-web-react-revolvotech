import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import logoImg from "../assets/revolvo-logo.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { designSystem } from "../themes";
import { PathContext } from "../App";
import { useAnimation } from "./AnimationContext";

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${designSystem.colors.text.primary};
  background: ${(props) => (props.$scrolled ? designSystem.colors.background.secondary : "transparent")};
  backdrop-filter: ${(props) => (props.$scrolled ? "blur(10px)" : "none")};
  -webkit-backdrop-filter: ${(props) =>
    props.$scrolled ? "blur(10px)" : "none"};
  height: 80px;
  margin: 0;
  padding: 0 8%;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  border-bottom: ${(props) =>
    props.$scrolled ? `1px solid ${designSystem.colors.border.primary}` : "none"};
  box-shadow: ${(props) =>
    props.$scrolled ? `0 4px 20px rgba(255, 235, 59, 0.1)` : "none"};
  box-sizing: border-box;
  transition: ${designSystem.effects.animations.transition};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  transition: ${designSystem.effects.animations.transition};
  opacity: 0.95;
  
  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
`;

const LogoImg = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;

  @media (max-width: ${designSystem.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
  }
`;

const NavMenu = styled.ul`
  list-style-type: none;
  display: flex;
  gap: ${designSystem.spacing.xxxl};
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: ${designSystem.breakpoints.tablet}) {
    position: fixed;
    flex-direction: column;
    top: 0;
    right: ${(props) => (props.$isOpen ? "0" : "-100%")};
    width: 70%;
    height: 100vh;
    background: ${designSystem.colors.background.secondary};
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    padding: 100px 40px;
    transition: ${designSystem.effects.animations.transition};
    gap: ${designSystem.spacing.xl};
    border-left: 1px solid ${designSystem.colors.border.primary};
  }
`;

const NavLinks = styled.a`
  text-decoration: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-md);
  position: relative;
  padding: 5px 0;
  transition: color var(--transition-normal);

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: var(--text-primary);
    transition: width var(--transition-normal);
    border-radius: 2px;
  }

  &:hover {
    color: var(--text-primary);
    &:after {
      width: 100%;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${designSystem.colors.text.secondary};
  cursor: pointer;
  font-weight: 500;
  font-size: ${designSystem.typography.scale.body.fontSize};
  position: relative;
  padding: 5px 0;
  transition: ${designSystem.effects.animations.transition};

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: ${designSystem.colors.primary.gold};
    transition: ${designSystem.effects.animations.transition};
    border-radius: 2px;
  }

  &:hover {
    color: ${designSystem.colors.text.primary};
    &:after {
      width: 100%;
    }
  }
`;

const NavButton = styled(Link)`
  margin-left: ${designSystem.spacing.lg};
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-size: ${designSystem.typography.scale.button.fontSize};
  background: linear-gradient(135deg, #fbb604, #f99b04, #d39404);
  color: ${designSystem.colors.neutral.black};
  border-radius: 12px;
  padding: ${designSystem.spacing.md} ${designSystem.spacing.lg};
  font-weight: ${designSystem.typography.scale.button.fontWeight};
  letter-spacing: ${designSystem.typography.scale.button.letterSpacing};
  box-shadow: ${designSystem.effects.shadows.glow};
  position: relative;
  overflow: hidden;
  transition: ${designSystem.effects.animations.transitionSmooth};
  
  /* Pulsing animation */
  animation: pulseGold 2s infinite ease-in-out;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${designSystem.effects.shadows.glowHover};
    filter: brightness(1.1);
    
    &:before {
      transform: translateX(100%);
    }
  }
  
  &:active {
    transform: translateY(1px) scale(0.98);
  }
  
  @keyframes pulseGold {
    0% {
      box-shadow: ${designSystem.effects.shadows.glow};
    }
    50% {
      box-shadow: ${designSystem.effects.shadows.glowHover};
    }
    100% {
      box-shadow: ${designSystem.effects.shadows.glow};
    }
  }

  @media (max-width: ${designSystem.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${designSystem.colors.text.secondary};
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0;
  margin: 0;
  transition: ${designSystem.effects.animations.transition};

  &:hover {
    color: ${designSystem.colors.text.primary};
  }

  @media (max-width: ${designSystem.breakpoints.tablet}) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentPath } = useContext(PathContext);
  const { setCurrentAnimation } = useAnimation();

  const handleButtonHover = (isHovered) => {
    setCurrentAnimation(isHovered ? 'Shrug' : 'Grin');
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavbarWrapper $scrolled={scrolled}>
      <Logo to="/">
        <LogoImg src={logoImg} alt="Revolvo Logo" />
      </Logo>

      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose size={28} /> : <HiMenuAlt3 size={28} />}
      </MenuButton>

      <NavMenu $isOpen={isOpen}>
        <StyledLink to="/" onClick={closeMenu}>Home</StyledLink>
        <li>
          <StyledLink 
            to="/projects"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
            onClick={closeMenu}
          >
            Projects
          </StyledLink>
        </li>
        <li>
          <StyledLink 
            to="/pricing"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
            onClick={closeMenu}
          >
            Pricing
          </StyledLink>
        </li>
        <li>
          <StyledLink 
            to="/testimonials"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
            onClick={closeMenu}
          >
            Testimonials
          </StyledLink>
        </li>
        <li>
          <StyledLink 
            to="/tech-showcase"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
            onClick={closeMenu}
          >
            Tech Showcase
          </StyledLink>
        </li>
        <li>
          <StyledLink 
            to="/blog"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
            onClick={closeMenu}
          >
            Blog
          </StyledLink>
        </li>
        <NavButton 
          to="/contact-us"
          onClick={closeMenu}
          isContactPage={currentPath === "/contact-us" ? true : false}
          onMouseEnter={() => handleButtonHover(true)}
          onMouseLeave={() => handleButtonHover(false)}
        >
          Get Started
        </NavButton>
      </NavMenu>
    </NavbarWrapper>
  );
};

export default Navbar;
