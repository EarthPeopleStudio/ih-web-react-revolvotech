import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import logoImg from "../assets/Revolvo.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { commonStyles } from "../themes";
import { PathContext } from "../App";

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
  background: ${(props) => (props.scrolled ? "var(--dark-card-bg)" : "transparent")};
  backdrop-filter: ${(props) => (props.scrolled ? "blur(10px)" : "none")};
  -webkit-backdrop-filter: ${(props) =>
    props.scrolled ? "blur(10px)" : "none"};
  height: 80px;
  margin: 0;
  padding: 0 8%;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: var(--z-index-header);
  border-bottom: ${(props) =>
    props.scrolled ? "1px solid var(--border-color)" : "none"};
  box-sizing: border-box;
  transition: all var(--transition-normal);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  transition: transform var(--transition-normal);
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

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const NavMenu = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 48px;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    top: 0;
    right: ${(props) => (props.isOpen ? "0" : "-100%")};
    width: 70%;
    height: 100vh;
    background: var(--dark-card-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    padding: 100px 40px;
    transition: var(--transition-normal);
    gap: 40px;
    border-left: 1px solid var(--border-color);
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

const NavButton = styled(Link)`
  ${commonStyles.button}
  margin-left: 20px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-size: 0.95rem;
  background: #f8f8f8;
  color: black;
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  
  /* Pulsing animation */
  animation: pulse 2s infinite ease-in-out;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    color: #f0f0f0;
    background: #1a1a1a;
    
    &:before {
      transform: translateX(100%);
    }
  }
  
  &:active {
    transform: translateY(1px) scale(0.98);
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 15px rgba(248, 248, 248, 0.3), 0 0 8px rgba(248, 248, 248, 0.2);
    }
    50% {
      box-shadow: 0 0 18px rgba(248, 248, 248, 0.4), 0 0 10px rgba(248, 248, 248, 0.3);
    }
    100% {
      box-shadow: 0 0 15px rgba(248, 248, 248, 0.3), 0 0 8px rgba(248, 248, 248, 0.2);
    }
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0;
  margin: 0;
  transition: color var(--transition-normal);

  &:hover {
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = useContext(PathContext);
  const isContactPage = currentPath === "/contact-us";

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
    <NavbarWrapper scrolled={scrolled}>
      <Logo to="/">
        <LogoImg src={logoImg} alt="Revolvo" />
      </Logo>

      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose /> : <HiMenuAlt3 />}
      </MenuButton>

      <NavMenu isOpen={isOpen}>
        <StyledLink to="/" onClick={closeMenu}>Home</StyledLink>
        <StyledLink to="/projects" onClick={closeMenu}>Projects</StyledLink>
        <StyledLink to="/pricing" onClick={closeMenu}>Pricing</StyledLink>
        <StyledLink to="/testimonials" onClick={closeMenu}>Testimonials</StyledLink>
        <StyledLink to="/tech-showcase" onClick={closeMenu}>Tech Showcase</StyledLink>
        <NavButton to="/contact-us" onClick={closeMenu} isContactPage={isContactPage}>Get Started</NavButton>
      </NavMenu>
    </NavbarWrapper>
  );
};

export default Navbar;
