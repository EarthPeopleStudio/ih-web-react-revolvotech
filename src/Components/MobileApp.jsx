import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaCheckCircle, FaRocket, FaLightbulb, FaCode, FaPalette } from 'react-icons/fa';
import { AiOutlineDesktop } from 'react-icons/ai';
import { BsBrowserSafari } from "react-icons/bs";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { InlineWidget } from "react-calendly";
import logoImg from "../assets/revolvo-logo.png";

const MobileContainer = styled.div`
  background: #000000;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const MobileBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(145deg, #0f0f0f, #1a1a1a);
  
  /* Simplified circuit board pattern for better performance */
  background-image: 
    linear-gradient(rgba(251, 182, 4, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251, 182, 4, 0.05) 1px, transparent 1px);
  background-size: 40px 40px, 40px 40px;
`;

const MobileHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.98);
  border-bottom: 1px solid rgba(251, 182, 4, 0.1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  img {
    width: 35px;
    height: 35px;
    object-fit: contain;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fbb604;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.99);
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-top: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fbb604;
  font-size: 28px;
  cursor: pointer;
  padding: 5px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const MenuItem = styled.li`
  margin: 0 0 25px 0;
`;

const MenuLink = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  display: block;
  padding: 10px 0;
  border-bottom: 1px solid rgba(251, 182, 4, 0.1);
  transition: color 0.3s ease;
  cursor: pointer;
  width: 100%;
  text-align: left;
  
  &:hover {
    color: #fbb604;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  padding: 80px 20px 60px 20px;
  text-align: center;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroBadge = styled.div`
  color: #fbb604;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin: 0 0 50px 0;
  opacity: 0.9;
  text-transform: uppercase;
`;

const HeroFooterText = styled.p`
  color: #fbb604;
  font-size: 13px;
  font-weight: 600;
  margin: 25px 0 30px 0;
  font-style: italic;
  opacity: 0.8;
`;

const HeroTitle = styled.h1`
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  margin: 20px 0 25px 0;
  line-height: 1.3;
`;

const HeroHighlight = styled.span`
  color: #fbb604;
`;

const HeroSubtitle = styled.p`
  color: #cccccc;
  font-size: 15px;
  line-height: 1.7;
  margin: 0 0 25px 0;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #FFCA28, #fbb604, #f99b04);
  color: #000000;
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  box-shadow: 0 8px 25px rgba(255, 202, 40, 0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ServicesSection = styled.section`
  padding: 40px 20px;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.6), rgba(35, 35, 40, 0.4));
  border-top: 1px solid rgba(251, 182, 4, 0.2);
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 30% 70%, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 25px 25px, 25px 25px, 50px 50px;
    opacity: 0.8;
    pointer-events: none;
  }
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 30px 0;
  position: relative;
  z-index: 1;
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: #fbb604;
  margin-bottom: 20px;
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
`;

const ServiceCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 20px;
  padding: 25px;
  margin: 0 0 20px 0;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 20px 20px, 20px 20px, 40px 40px, 30px 30px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.8);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(251, 182, 4, 0.5);
    z-index: 2;
    animation: ${keyframes`
      0%, 100% { opacity: 0.8; box-shadow: 0 0 10px rgba(251, 182, 4, 0.5); }
      50% { opacity: 1; box-shadow: 0 0 15px rgba(251, 182, 4, 0.8); }
    `} 3s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(251, 182, 4, 0.5);
    box-shadow: 0 20px 40px rgba(251, 182, 4, 0.2);
    
    &::after {
      animation-duration: 1.5s;
    }
    
    ${ServiceIcon} {
      transform: scale(1.1);
      color: ${props => props.$hoverColor || '#fbb604'};
    }
  }
`;

const ServiceTitle = styled.h3`
  color: #fbb604;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  position: relative;
  z-index: 1;
`;

const ServiceDesc = styled.p`
  color: #cccccc;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const ShowcaseSection = styled.section`
  padding: 50px 20px;
  background: linear-gradient(145deg, rgba(20, 20, 25, 0.7), rgba(30, 30, 35, 0.5));
  border-top: 1px solid rgba(251, 182, 4, 0.3);
  border-bottom: 1px solid rgba(251, 182, 4, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.04) 1px, transparent 1px),
      radial-gradient(circle at 20% 80%, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 80% 20%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 35px 35px, 35px 35px, 70px 70px, 50px 50px;
    opacity: 0.7;
    pointer-events: none;
  }
`;

const ShowcaseCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 20px;
  margin: 0 0 30px 0;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 25px 25px, 25px 25px, 50px 50px, 35px 35px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.8);
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(251, 182, 4, 0.6);
    z-index: 2;
    animation: ${keyframes`
      0%, 100% { opacity: 0.6; box-shadow: 0 0 12px rgba(251, 182, 4, 0.6); }
      50% { opacity: 1; box-shadow: 0 0 20px rgba(251, 182, 4, 0.9); }
    `} 4s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-10px);
    border-color: rgba(251, 182, 4, 0.5);
    box-shadow: 0 25px 50px rgba(251, 182, 4, 0.3);
    
    &::after {
      animation-duration: 2s;
    }
  }
`;

const ShowcaseHeader = styled.div`
  padding: 20px 25px;
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  background: linear-gradient(to right, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  position: relative;
  z-index: 1;
`;

const ShowcaseTitle = styled.h3`
  color: #fbb604;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    font-size: 20px;
  }
`;

const ShowcaseDesc = styled.p`
  color: #cccccc;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

const ShowcaseDemo = styled.div`
  padding: 25px;
  position: relative;
  z-index: 1;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PricingSection = styled.section`
  padding: 40px 20px;
  background: linear-gradient(145deg, rgba(15, 15, 20, 0.8), rgba(25, 25, 30, 0.6));
  border-top: 1px solid rgba(251, 182, 4, 0.3);
  border-bottom: 1px solid rgba(251, 182, 4, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.05) 1px, transparent 1px),
      radial-gradient(circle at 40% 60%, rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 70% 30%, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 30px 30px, 30px 30px, 60px 60px, 45px 45px;
    opacity: 0.8;
    pointer-events: none;
  }
`;

const PricingToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 4px;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
`;

const ToggleOption = styled.button`
  background: ${props => props.$active ? '#fbb604' : 'transparent'};
  color: ${props => props.$active ? '#000' : '#fff'};
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
`;

const HunterEyes = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
`;

const eyeOpenAnimation = keyframes`
  0% {
    height: 3px;
    opacity: 0.4;
  }
  30% {
    height: 8px;
    opacity: 0.6;
  }
  60% {
    height: 15px;
    opacity: 0.8;
  }
  100% {
    height: 20px;
    opacity: 1;
  }
`;

const Eye = styled.div`
  width: 40px;
  height: 20px;
  background: ${props => props.$color};
  border-radius: 50% 50% 10% 10% / 100% 100% 10% 10%;
  transform: ${props => props.$isLeft ? 'rotate(160deg) skewX(-15deg)' : 'rotate(200deg) skewX(15deg)'};
  box-shadow: 0 0 10px 5px ${props => props.$color === '#FFCA28' ? 'rgba(255, 202, 40, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
  position: relative;
  animation: ${eyeOpenAnimation} 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation-delay: ${props => props.$isLeft ? '0.3s' : '0s'};
  animation-fill-mode: both;
`;

const PricingCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 20px;
  padding: 25px;
  margin: 0 0 25px 0;
  text-align: left;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 30% 70%, rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      radial-gradient(circle at 70% 30%, rgba(251, 182, 4, 0.01) 1px, transparent 1px);
    background-size: 20px 20px, 20px 20px, 40px 40px, 30px 30px;
    opacity: 0.7;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.7);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(251, 182, 4, 0.4);
    z-index: 2;
    animation: ${keyframes`
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; box-shadow: 0 0 15px rgba(251, 182, 4, 0.7); }
    `} 5s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(251, 182, 4, 0.5);
    box-shadow: 0 15px 40px rgba(251, 182, 4, 0.2);
    
    &::after {
      animation-duration: 2.5s;
    }
  }
  
  ${props => props.$popular && `
    border-color: #fbb604;
    background: linear-gradient(145deg, rgba(35, 35, 40, 0.95), rgba(45, 45, 50, 0.95));
    
    &::before {
      opacity: 0.9;
    }
  `}
`;

const PricingName = styled.h3`
  color: #fbb604;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const PricingPrice = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px 0;
`;

const OriginalPrice = styled.div`
  color: #888;
  font-size: 18px;
  font-weight: 500;
  text-decoration: line-through;
  margin: 0 0 4px 0;
`;

const SavingsText = styled.div`
  color: #00ff9d;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const PricingPeriod = styled.div`
  color: #cccccc;
  font-size: 12px;
  margin: 0 0 8px 0;
  font-style: italic;
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: 25px;
  right: 15px;
  background: #fbb604;
  color: #000;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(251, 182, 4, 0.4);
  z-index: 3;
  white-space: nowrap;
`;

const PricingDesc = styled.p`
  color: #cccccc;
  font-size: 14px;
  margin: 0 0 15px 0;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PricingFeature = styled.li`
  color: #cccccc;
  font-size: 11px;
  margin: 0 0 6px 0;
  padding-left: 16px;
  position: relative;
  line-height: 1.4;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #fbb604;
    font-weight: bold;
  }
`;

const CalendlySection = styled.section`
  padding: 40px 20px;
  background: linear-gradient(145deg, rgba(10, 10, 15, 0.9), rgba(20, 20, 25, 0.7));
  border-top: 1px solid rgba(251, 182, 4, 0.3);
  border-bottom: 1px solid rgba(251, 182, 4, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.06) 1px, transparent 1px),
      radial-gradient(circle at 30% 70%, rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 70% 30%, rgba(251, 182, 4, 0.025) 1px, transparent 1px);
    background-size: 35px 35px, 35px 35px, 70px 70px, 52px 52px;
    opacity: 0.9;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 25px;
    right: 25px;
    width: 12px;
    height: 12px;
    background: rgba(251, 182, 4, 0.8);
    border-radius: 50%;
    box-shadow: 0 0 18px rgba(251, 182, 4, 0.6);
    z-index: 2;
    animation: ${keyframes`
      0%, 100% { opacity: 0.8; transform: scale(1); }
      33% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 25px rgba(251, 182, 4, 0.9); }
      66% { opacity: 0.9; transform: scale(1.1); }
    `} 5s ease-in-out infinite;
  }
`;

const CalendlyContainer = styled.div`
  height: 600px;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(251, 182, 4, 0.3);
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 20% 80%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 20px 20px, 20px 20px, 40px 40px;
    opacity: 0.7;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.8);
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(251, 182, 4, 0.6);
    z-index: 2;
    animation: ${keyframes`
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; box-shadow: 0 0 18px rgba(251, 182, 4, 0.9); }
    `} 3.5s ease-in-out infinite;
  }
`;

const ProcessSection = styled.section`
  padding: 40px 20px;
  background: linear-gradient(145deg, rgba(18, 18, 23, 0.8), rgba(28, 28, 33, 0.6));
  border-top: 1px solid rgba(251, 182, 4, 0.3);
  border-bottom: 1px solid rgba(251, 182, 4, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.04) 1px, transparent 1px),
      radial-gradient(circle at 35% 65%, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 28px 28px, 28px 28px, 55px 55px;
    opacity: 0.7;
    pointer-events: none;
  }
`;

const ProcessCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.9), rgba(35, 35, 40, 0.9));
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 16px;
  padding: 25px;
  margin: 0 0 20px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      radial-gradient(circle at 25% 75%, rgba(251, 182, 4, 0.01) 1px, transparent 1px);
    background-size: 18px 18px, 18px 18px, 35px 35px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 12px;
    right: 12px;
    width: 6px;
    height: 6px;
    background: rgba(251, 182, 4, 0.6);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(251, 182, 4, 0.3);
    z-index: 2;
    animation: ${keyframes`
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; box-shadow: 0 0 12px rgba(251, 182, 4, 0.6); }
    `} 6s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-3px);
    border-color: rgba(251, 182, 4, 0.4);
    box-shadow: 0 12px 30px rgba(251, 182, 4, 0.15);
    
    &::after {
      animation-duration: 3s;
    }
  }
`;

const ProcessIcon = styled.div`
  font-size: 2rem;
  color: #fbb604;
  margin-bottom: 15px;
`;

const ProcessTitle = styled.h3`
  color: #fbb604;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const ProcessDesc = styled.p`
  color: #cccccc;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

const FormSelect = styled.select`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 8px;
  padding: 12px 15px;
  color: #ffffff;
  font-size: 16px;
  box-sizing: border-box;
  
  option {
    background: #000000;
    color: #ffffff;
  }
  
  &:focus {
    outline: none;
    border-color: #fbb604;
  }
`;

const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const SuccessModal = styled.div`
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  max-width: 300px;
  width: 100%;
  transform: ${props => props.$show ? 'scale(1)' : 'scale(0.8)'};
  transition: transform 0.3s ease;
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  color: #00ff9d;
  margin-bottom: 15px;
`;

const SuccessTitle = styled.h3`
  color: #ffffff;
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const SuccessMessage = styled.p`
  color: #cccccc;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

const MobileNoticeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 5000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px 20px 150px 20px;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MobileNoticeModal = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.98), rgba(35, 35, 40, 0.98));
  border: 2px solid rgba(251, 182, 4, 0.4);
  border-radius: 20px;
  padding: 30px 25px;
  text-align: center;
  max-width: 320px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
`;

const MobileNoticeIcon = styled.div`
  font-size: 3rem;
  color: #fbb604;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const MobileNoticeTitle = styled.h3`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 15px 0;
  position: relative;
  z-index: 1;
`;

const MobileNoticeText = styled.p`
  color: #cccccc;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 25px 0;
  position: relative;
  z-index: 1;
`;

const MobileNoticeButton = styled.button`
  background: linear-gradient(135deg, #FFCA28, #fbb604);
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  box-shadow: 0 6px 20px rgba(251, 182, 4, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(251, 182, 4, 0.4);
  }
`;

const ContactSection = styled.section`
  padding: 40px 20px;
  background: linear-gradient(145deg, rgba(12, 12, 17, 0.9), rgba(22, 22, 27, 0.7));
  border-top: 1px solid rgba(251, 182, 4, 0.3);
  border-bottom: 1px solid rgba(251, 182, 4, 0.3);
  position: relative;
`;

const ContactForm = styled.form`
  max-width: 100%;
`;

const FormGroup = styled.div`
  margin: 0 0 20px 0;
`;

const FormInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 8px;
  padding: 12px 15px;
  color: #ffffff;
  font-size: 16px;
  box-sizing: border-box;
  
  &::placeholder {
    color: #888888;
  }
  
  &:focus {
    outline: none;
    border-color: #fbb604;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 8px;
  padding: 12px 15px;
  color: #ffffff;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  box-sizing: border-box;
  
  &::placeholder {
    color: #888888;
  }
  
  &:focus {
    outline: none;
    border-color: #fbb604;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #FFCA28, #fbb604);
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 202, 40, 0.3);
`;

const SocialSection = styled.section`
  padding: 30px 20px;
  text-align: center;
  border-top: 1px solid rgba(251, 182, 4, 0.1);
`;

const SocialTitle = styled.h3`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SocialLink = styled.a`
  color: #fbb604;
  font-size: 24px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

const Footer = styled.footer`
  padding: 20px;
  text-align: center;
  border-top: 1px solid rgba(251, 182, 4, 0.1);
  background: rgba(0, 0, 0, 0.5);
`;

const FooterText = styled.p`
  color: #888888;
  font-size: 12px;
  margin: 0;
`;

// Mini Demo Components

const ColorPaletteMinDemo = () => {
  const [baseColor, setBaseColor] = useState('#fbb604');
  const [palette, setPalette] = useState([]);
  
  const PaletteContainer = styled.div`
    width: 100%;
    max-width: 280px;
    text-align: center;
  `;
  
  const ColorControls = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
  `;
  
  const ColorInput = styled.input`
    width: 40px;
    height: 40px;
    border: 2px solid rgba(251, 182, 4, 0.3);
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
  `;
  
  const PaletteGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    margin-bottom: 15px;
  `;
  
  const ColorSwatch = styled.div`
    width: 100%;
    height: 35px;
    border-radius: 6px;
    border: 1px solid rgba(251, 182, 4, 0.2);
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      transform: scale(1.05);
    }
  `;
  
  const ColorLabel = styled.div`
    font-size: 8px;
    font-weight: 600;
    color: ${props => props.$textColor};
    opacity: 0;
    transition: opacity 0.2s ease;
    
    ${ColorSwatch}:hover & {
      opacity: 1;
    }
  `;
  
  const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
  `;
  
  const ActionButton = styled.button`
    background: linear-gradient(135deg, #FFCA28, #fbb604);
    color: #000;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-1px);
    }
  `;
  
  // Helper functions for color conversion
  const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const getTextColor = (backgroundColor) => {
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const generateMonochromaticPalette = (color) => {
    const { h, s, l } = hexToHsl(color);
    
    return [
      color, // Base color
      hslToHex(h, s, Math.max(0, l - 30)), // Darker
      hslToHex(h, s, Math.max(0, l - 15)), // Slightly darker
      hslToHex(h, s, Math.min(100, l + 15)), // Slightly lighter
      hslToHex(h, s, Math.min(100, l + 30)) // Lighter
    ];
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setBaseColor(randomColor);
  };
  
  React.useEffect(() => {
    setPalette(generateMonochromaticPalette(baseColor));
  }, [baseColor]);
  
  return (
    <PaletteContainer>
      <ColorControls>
        <ColorInput 
          type="color" 
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
        />
        <div style={{ color: '#ccc', fontSize: '10px' }}>Monochromatic</div>
      </ColorControls>
      
      <PaletteGrid>
        {palette.map((color, index) => (
          <ColorSwatch 
            key={index}
            style={{ backgroundColor: color }}
            title={color}
          >
            <ColorLabel $textColor={getTextColor(color)}>
              {color.slice(1, 4).toUpperCase()}
            </ColorLabel>
          </ColorSwatch>
        ))}
      </PaletteGrid>
      
      <ActionButtons>
        <ActionButton onClick={generateRandomColor}>
          Random
        </ActionButton>
      </ActionButtons>
    </PaletteContainer>
  );
};

const ProductShowcaseMinDemo = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  
  const ShowcaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    max-width: 280px;
    text-align: center;
  `;
  
  const ProductCard = styled.div`
    background: ${props => props.$gradient};
    border-radius: 20px;
    padding: 30px 20px;
    width: 100%;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
  `;
  
  const ProductHeader = styled.div`
    color: ${props => props.$textColor || '#ffffff'};
    font-size: 12px;
    font-weight: 500;
    opacity: 0.9;
    margin-bottom: 8px;
  `;
  
  const ProductName = styled.h3`
    color: ${props => props.$textColor || '#ffffff'};
    margin: 0 0 8px 0;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
  `;
  
  const ProductPrice = styled.div`
    color: ${props => props.$textColor || '#ffffff'};
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 15px;
  `;
  
  const ProductFeatures = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 20px;
  `;
  
  const ProductFeature = styled.div`
    color: ${props => props.$textColor || '#ffffff'};
    font-size: 12px;
    opacity: 0.9;
  `;
  
  const ProductIcon = styled.div`
    position: absolute;
    top: 25px;
    right: 25px;
    background: ${props => props.$iconBg || 'rgba(255, 255, 255, 0.2)'};
    width: 60px;
    height: 60px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  `;
  
  const AddToCartButton = styled.button`
    background: ${props => props.$buttonBg || 'rgba(255, 255, 255, 0.9)'};
    color: ${props => props.$buttonText || '#000000'};
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &:hover {
      background: ${props => props.$buttonHover || '#ffffff'};
      transform: translateX(5px);
    }
  `;
  
  const ProductSelector = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
  `;
  
  const SelectorDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.$active ? '#fbb604' : 'rgba(255, 255, 255, 0.3)'};
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #fbb604;
    }
  `;
  
  const products = [
    { 
      name: 'VitalFit Tracker', 
      price: '$199', 
      icon: '⌚', 
      category: 'Wearables',
      features: ['Heart Rate Monitor', 'GPS Tracking', '7-Day Battery'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      buttonBg: 'rgba(255, 255, 255, 0.9)',
      buttonText: '#667eea',
      buttonHover: '#ffffff'
    },
    { 
      name: 'EcoHome Hub', 
      price: '$299', 
      icon: '🏠', 
      category: 'Smart Home',
      features: ['Voice Control', 'Energy Monitoring', 'Smart Automation'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#ffffff',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      buttonBg: 'rgba(255, 255, 255, 0.9)',
      buttonText: '#f5576c',
      buttonHover: '#ffffff'
    },
    { 
      name: 'CloudSync Pro', 
      price: '$149', 
      icon: '☁️', 
      category: 'Software',
      features: ['Unlimited Storage', 'Real-time Sync', 'Team Collaboration'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      textColor: '#ffffff',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      buttonBg: 'rgba(255, 255, 255, 0.9)',
      buttonText: '#4facfe',
      buttonHover: '#ffffff'
    }
  ];
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const product = products[currentProduct];
  
  return (
    <ShowcaseContainer>
      <ProductCard $gradient={product.gradient}>
        <div>
          <ProductHeader $textColor={product.textColor}>{product.category}</ProductHeader>
          <ProductName $textColor={product.textColor}>{product.name}</ProductName>
          <ProductPrice $textColor={product.textColor}>{product.price}</ProductPrice>
          <ProductFeatures>
            {product.features.map((feature, index) => (
              <ProductFeature key={index} $textColor={product.textColor}>
                • {feature}
              </ProductFeature>
            ))}
          </ProductFeatures>
        </div>
        <ProductIcon $iconBg={product.iconBg}>
          {product.icon}
        </ProductIcon>
        <AddToCartButton 
          $buttonBg={product.buttonBg}
          $buttonText={product.buttonText}
          $buttonHover={product.buttonHover}
        >
          Add to Cart →
        </AddToCartButton>
      </ProductCard>
      <ProductSelector>
        {products.map((_, index) => (
          <SelectorDot
            key={index}
            $active={index === currentProduct}
            onClick={() => setCurrentProduct(index)}
          />
        ))}
      </ProductSelector>
    </ShowcaseContainer>
  );
};

const MobileApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [showMobileNotice, setShowMobileNotice] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    packageTier: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '982a51ab-cfbc-4f05-a885-3a048a2bd57b');
      formDataToSend.append('email', 'hey@revolvo.tech');
      formDataToSend.append('subject', `New Project Inquiry from ${formData.name}`);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('from_email', formData.email);
      formDataToSend.append('company', formData.company || 'Not specified');
      formDataToSend.append('project_type', formData.projectType);
      formDataToSend.append('package_tier', formData.packageTier || 'Not specified');
      formDataToSend.append('timeline', formData.timeline || 'Not specified');
      formDataToSend.append('message', formData.message);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          packageTier: '',
          timeline: '',
          message: ''
        });
        setTimeout(() => setShowSuccess(false), 6000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
    
    setIsSubmitting(false);
  };

  const services = [
    {
      icon: <BsBrowserSafari />,
      title: "Startup Web Apps",
      description: "React-based web applications built for rapid scaling. We create MVPs that impress investors and platforms that handle viral growth from day one.",
      hoverColor: "#00ff9d"
    },
    {
      icon: <MdOutlineAppSettingsAlt />,
      title: "Mobile Apps That Raise Funding",
      description: "Flutter and React Native apps designed for user retention and growth. Clean code architecture that passes technical due diligence with flying colors.",
      hoverColor: "#00e5ff"
    },
    {
      icon: <FaGamepad />,
      title: "Interactive Experiences",
      description: "Unity-powered games and interactive demos that showcase your product vision. Perfect for engaging investors and demonstrating product potential.",
      hoverColor: "#ff3366"
    }
  ];

  const getPricingData = (tier, isAnnual) => {
    if (tier.monthlyPrice === "Custom") {
      return {
        price: "Custom",
        period: tier.customPeriod || "tailored to your specific needs",
        originalPrice: null,
        savings: null,
        annualTotal: null
      };
    }

    const monthly = parseInt(tier.monthlyPrice.replace(/[$,]/g, ''));
    
    if (isAnnual) {
      // Calculate discounted monthly and annual prices
      let discountedMonthly, annualTotal, savings;
      
      if (tier.name === 'Spark') {
        discountedMonthly = 1616;
        annualTotal = 19403;
        savings = 2645;
      } else if (tier.name === 'Charge') {
        discountedMonthly = 3233;
        annualTotal = 38806;
        savings = 5291;
      }
      
      return {
        price: `$${discountedMonthly.toLocaleString()}`,
        period: `per month billed annually ($${annualTotal.toLocaleString()})`,
        originalPrice: tier.monthlyPrice,
        savings: `$${savings.toLocaleString()}`,
        annualTotal: annualTotal
      };
    }
    
    return {
      price: tier.monthlyPrice,
      period: "per month",
      originalPrice: null,
      savings: null,
      annualTotal: null
    };
  };

  const pricingTiers = [
    {
      name: "Spark",
      monthlyPrice: "$1,837",
      description: "Perfect for startups who need a solid MVP to validate their idea and attract investors. Built for speed and investor presentations.",
      features: [
        "Low-No Code Developer with 2-3 years experience",
        "UI/UX Designer with 2-3 years experience", 
        "Technical Project Manager (part-time)",
        "Basic requirements gathering & planning",
        "Bi-weekly progress meetings",
        "Basic Q/A testing & bug fixes",
        "Access to company Slack channel",
        "176 working hours per month",
        "24/7 online availability in your time zone"
      ]
    },
    {
      name: "Charge",
      monthlyPrice: "$3,675",
      description: "For growing companies ready to build market-ready products that scale. Premium development with senior expertise and rapid iteration.",
      features: [
        "Senior Engineer with 5-7+ years experience",
        "Senior UI/UX Engineer with 5-7+ years experience",
        "Technical Project Manager (full-time)",
        "Weekly sprints with iterative builds",
        "Up to 3 iterations per sprint",
        "Comprehensive Q/A Testing & CI/CD",
        "Priority Slack channel & support",
        "Technical Product Manager with business insights",
        "176 working hours per month",
        "24/7 online availability in your time zone"
      ],
      recommended: true
    },
    {
      name: "Blitz",
      monthlyPrice: "Custom",
      customPeriod: "tailored to your specific needs",
      description: "Enterprise-grade development for complex projects with custom requirements. Fully customizable team and unlimited technical expertise.",
      features: [
        "Custom team composition & size",
        "Mix of Senior and Lead Engineers",
        "Dedicated Technical Project Manager",
        "Dedicated Technical Product Manager",
        "Flexible sprint cycles & iterations",
        "Enterprise-grade QA & security testing",
        "Dedicated Slack workspace",
        "176 working hours per month",
        "Priority support & strategic consulting",
        "24/7 online availability in your time zone"
      ]
    }
  ];



  return (
    <MobileContainer>
      <MobileBackground />
      
      <MobileHeader>
        <Logo onClick={scrollToTop}>
          <img src={logoImg} alt="Revolvo" />
        </Logo>
        <MenuButton onClick={toggleMenu}>
          <HiMenuAlt3 />
        </MenuButton>
      </MobileHeader>

      <MobileMenu $isOpen={isMenuOpen}>
        <MenuHeader>
          <Logo onClick={scrollToTop}>
            <img src={logoImg} alt="Revolvo" />
          </Logo>
          <CloseButton onClick={toggleMenu}>
            <IoClose />
          </CloseButton>
        </MenuHeader>
        
        <MenuList>
          <MenuItem><MenuLink onClick={() => scrollToSection('home')}>Home</MenuLink></MenuItem>
          <MenuItem><MenuLink onClick={() => scrollToSection('services')}>Services</MenuLink></MenuItem>
          <MenuItem><MenuLink onClick={() => scrollToSection('showcase')}>Showcase</MenuLink></MenuItem>
          <MenuItem><MenuLink onClick={() => scrollToSection('pricing')}>Pricing</MenuLink></MenuItem>
          <MenuItem><MenuLink onClick={() => scrollToSection('contact')}>Contact</MenuLink></MenuItem>
          <MenuItem><MenuLink onClick={() => scrollToSection('consultation')}>Consultation</MenuLink></MenuItem>
        </MenuList>
      </MobileMenu>

      <Content>
        <HeroSection id="home">
          <HeroBadge>PROVEN • FUNDED • RESULTS-DRIVEN</HeroBadge>
          <HunterEyes>
            <Eye $color="#FFCA28" $isLeft={false} />
            <Eye $color="#ffffff" $isLeft={true} />
          </HunterEyes>
          <HeroTitle>
            Build Apps That<br />
            Actually Get<br />
            <HeroHighlight>Funded</HeroHighlight>
          </HeroTitle>
          <HeroSubtitle>
            Skip the 6-month delays and freelancer roulette. We build investor-ready products that users love and businesses scale. Clean architecture, rapid iteration, and 100% completion rate.
          </HeroSubtitle>
          <CTAButton onClick={() => scrollToSection('contact')}>Get Started</CTAButton>
          <HeroFooterText>Limited capacity - selective partnerships only</HeroFooterText>
        </HeroSection>

        <ServicesSection id="services">
          <SectionTitle>Our Services</SectionTitle>
          {services.map((service, index) => (
            <ServiceCard key={index} $hoverColor={service.hoverColor}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDesc>{service.description}</ServiceDesc>
            </ServiceCard>
          ))}
        </ServicesSection>

        <ShowcaseSection id="showcase">
          <SectionTitle>Live Demos</SectionTitle>
          
          <ShowcaseCard>
            <ShowcaseHeader>
              <ShowcaseTitle>
                <AiOutlineDesktop />
                Product Showcase
              </ShowcaseTitle>
              <ShowcaseDesc>Dynamic product display with interactive features</ShowcaseDesc>
            </ShowcaseHeader>
            <ShowcaseDemo>
              <ProductShowcaseMinDemo />
            </ShowcaseDemo>
          </ShowcaseCard>

          <ShowcaseCard>
            <ShowcaseHeader>
              <ShowcaseTitle>
                <FaPalette />
                Color Palette Generator
              </ShowcaseTitle>
              <ShowcaseDesc>Generate beautiful color schemes for any design project</ShowcaseDesc>
            </ShowcaseHeader>
            <ShowcaseDemo>
              <ColorPaletteMinDemo />
            </ShowcaseDemo>
          </ShowcaseCard>
        </ShowcaseSection>

        <PricingSection id="pricing">
          <SectionTitle>Simple Pricing</SectionTitle>
          <PricingToggle>
            <ToggleOption 
              $active={!isAnnual} 
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </ToggleOption>
            <ToggleOption 
              $active={isAnnual} 
              onClick={() => setIsAnnual(true)}
            >
              Annual
            </ToggleOption>
          </PricingToggle>
          {pricingTiers.map((tier, index) => {
            const pricingData = getPricingData(tier, isAnnual);
            return (
              <PricingCard key={index}>
                {tier.recommended && <RecommendedBadge>Recommended</RecommendedBadge>}
                <PricingName>{tier.name}</PricingName>
                
                {isAnnual && pricingData.originalPrice && (
                  <OriginalPrice>{pricingData.originalPrice}</OriginalPrice>
                )}
                
                <PricingPrice>
                  {pricingData.price}{tier.name !== 'Blitz' ? '*' : ''}
                </PricingPrice>
                
                <PricingPeriod>{pricingData.period}</PricingPeriod>
                
                {isAnnual && pricingData.savings && (
                  <SavingsText>You save {pricingData.savings}</SavingsText>
                )}
                
                <PricingDesc>{tier.description}</PricingDesc>
                <PricingFeatures>
                  {tier.features.map((feature, idx) => (
                    <PricingFeature key={idx}>{feature}</PricingFeature>
                  ))}
                </PricingFeatures>
                {tier.name !== 'Blitz' && (
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '15px', fontStyle: 'italic' }}>
                    * Inclusive of sales tax<br/>
                    Payment: {tier.name === 'Spark' ? '30% upfront, 70% after completion' : '25% upfront, 75% after completion'}
                  </div>
                )}
              </PricingCard>
            );
          })}
        </PricingSection>

        <ProcessSection>
          <SectionTitle>Why Choose Us</SectionTitle>
          <ProcessCard>
            <ProcessIcon><FaLightbulb /></ProcessIcon>
            <ProcessTitle>Meticulous Attention to Detail</ProcessTitle>
            <ProcessDesc>We perfect every pixel, line of code, and performance metric. No detail is too small when it comes to your success.</ProcessDesc>
          </ProcessCard>
          <ProcessCard>
            <ProcessIcon><FaCode /></ProcessIcon>
            <ProcessTitle>Honest & Realistic Approach</ProcessTitle>
            <ProcessDesc>Clear, achievable goals and honest timelines. We deliver sustainable solutions that truly meet your needs, not fantasies.</ProcessDesc>
          </ProcessCard>
          <ProcessCard>
            <ProcessIcon><FaRocket /></ProcessIcon>
            <ProcessTitle>Reliable & Transparent</ProcessTitle>
            <ProcessDesc>We never commit to what we can't deliver. Expect candid communication and dependable results every step of the way.</ProcessDesc>
          </ProcessCard>
        </ProcessSection>

        <ContactSection id="contact">
          <SectionTitle>Tell Us About Your Project</SectionTitle>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormInput 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name *" 
                required 
              />
            </FormGroup>
            <FormGroup>
              <FormInput 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *" 
                required 
              />
            </FormGroup>
            <FormGroup>
              <FormInput 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company/Organization" 
              />
            </FormGroup>
            <FormGroup>
              <FormSelect
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="">Select project type *</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App</option>
                <option value="game-development">Game Development</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormSelect
                name="packageTier"
                value={formData.packageTier}
                onChange={handleChange}
              >
                <option value="">Select package tier</option>
                <option value="spark">Spark</option>
                <option value="charge">Charge</option>
                <option value="blitz">Blitz</option>
                <option value="not-sure">Not sure yet</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormSelect
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6+-months">6+ months</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormTextarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project, goals, and any specific requirements..."
                required
              />
            </FormGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending Message...' : 'Get Free Consultation →'}
            </SubmitButton>
          </ContactForm>
        </ContactSection>

        <CalendlySection id="consultation">
          <SectionTitle>Schedule a Free Consultation</SectionTitle>
          <CalendlyContainer>
            <InlineWidget
              url="https://calendly.com/revolvotech/session"
              styles={{
                height: '100%',
                width: '100%'
              }}
              pageSettings={{
                hideEventTypeDetails: true,
                hideLandingPageDetails: true,
                hideGdprBanner: true
              }}
            />
          </CalendlyContainer>
        </CalendlySection>

        <SocialSection>
          <SocialTitle>Follow us on Socials</SocialTitle>
          <SocialLinks>
            <SocialLink href="https://www.instagram.com/revolvotech/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://www.facebook.com/revolvotech" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="https://x.com/revolvotech" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/revolvotech/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </SocialSection>

        <Footer>
          <FooterText>
            © {new Date().getFullYear()} Revolvo. All rights reserved.
          </FooterText>
        </Footer>
      </Content>
      
      <SuccessOverlay $show={showSuccess} onClick={() => setShowSuccess(false)}>
        <SuccessModal $show={showSuccess} onClick={(e) => e.stopPropagation()}>
          <SuccessIcon>
            <FaCheckCircle />
          </SuccessIcon>
          <SuccessTitle>Message Sent Successfully! 🚀</SuccessTitle>
          <SuccessMessage>
            Thank you for reaching out! We've received your project details and will get back to you within 24 hours.
          </SuccessMessage>
        </SuccessModal>
      </SuccessOverlay>

      <MobileNoticeOverlay $show={showMobileNotice}>
        <MobileNoticeModal>
          <MobileNoticeIcon>📱</MobileNoticeIcon>
          <MobileNoticeTitle>Mobile Experience</MobileNoticeTitle>
          <MobileNoticeText>
            You're viewing the mobile version of revolvo.tech. For the full experience with advanced interactive demos and complete feature set, use a laptop or desktop.
          </MobileNoticeText>
          <MobileNoticeButton onClick={() => setShowMobileNotice(false)}>
            Continue on Mobile
          </MobileNoticeButton>
        </MobileNoticeModal>
      </MobileNoticeOverlay>
    </MobileContainer>
  );
};

export default MobileApp; 