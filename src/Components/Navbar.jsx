import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoImg from "../assets/Revolvo.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
  background: ${(props) => (props.scrolled ? "var(--card-bg)" : "transparent")};
  backdrop-filter: ${(props) => (props.scrolled ? "blur(10px)" : "none")};
  -webkit-backdrop-filter: ${(props) =>
    props.scrolled ? "blur(10px)" : "none"};
  height: 80px;
  margin: 0;
  padding: 0 8%;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  border-bottom: ${(props) =>
    props.scrolled ? "1px solid var(--border-color)" : "none"};
  box-sizing: border-box;
  transition: all 0.3s ease;
`;

const Logo = styled.img`
  width: 45px;
  height: 45px;
  cursor: pointer;
  transition: transform 0.3s ease;
  opacity: 0.95;
  object-fit: contain;

  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }

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
    background: var(--card-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    padding: 100px 40px;
    transition: 0.3s ease-in-out;
    gap: 40px;
    border-left: 1px solid var(--border-color);
  }
`;

const NavLinks = styled.a`
  text-decoration: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: var(--text-primary);
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover {
    color: var(--text-primary);
    &:after {
      width: 100%;
    }
  }
`;

const NavButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: var(--button-bg);
  color: var(--button-text);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: var(--button-glow);
  margin-left: 20px;

  &:hover {
    transform: translateY(-2px);
    background: var(--button-hover-bg);
    box-shadow: var(--button-hover-glow);
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
  transition: color 0.3s ease;

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

  return (
    <NavbarWrapper scrolled={scrolled}>
      <Logo
        src={logoImg}
        alt="Revolvo"
        onClick={() => scrollToSection("home")}
      />

      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose /> : <HiMenuAlt3 />}
      </MenuButton>

      <NavMenu isOpen={isOpen}>
        <NavLinks onClick={() => scrollToSection("home")}>Home</NavLinks>
        <NavLinks onClick={() => scrollToSection("projects")}>
          Projects
        </NavLinks>
        <NavLinks onClick={() => scrollToSection("stacks")}>Stack</NavLinks>
        <NavLinks onClick={() => scrollToSection("contact")}>Contact</NavLinks>
        <NavButton onClick={() => scrollToSection("contact")}>
          Get Quote
        </NavButton>
      </NavMenu>
    </NavbarWrapper>
  );
};

export default Navbar;
