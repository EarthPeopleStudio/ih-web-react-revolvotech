import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PricingWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-primary);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const HoursExplanation = styled.div`
  background: linear-gradient(to right, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9));
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 25px 30px;
  margin-bottom: 35px;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
`;

const HoursTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 12px;
  font-weight: 600;
`;

const HoursNote = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-top: 10px;
  font-style: italic;
  opacity: 0.85;
`;

const AdvantageBanner = styled.div`
  background: linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9));
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 35px 40px;
  margin-bottom: 60px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

const AdvantageTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 20px;
  display: inline-block;
`;

const AdvantageText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 10px;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  margin-bottom: 100px;
  margin-top: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 70px;
  }
`;

const PricingCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(248, 248, 248, 0.3);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(248, 248, 248, 0.1);
  
  ${props => props.featured && `
    transform: scale(1.05);
    border: 2px solid #f8f8f8;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(248, 248, 248, 0.2);
    z-index: 2;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: #f8f8f8;
    }
  `}
  
  &:hover {
    transform: ${props => props.featured ? 'translateY(-10px) scale(1.05)' : 'translateY(-10px)'};
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(248, 248, 248, ${props => props.featured ? '0.2' : '0.1'});
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: radial-gradient(circle at top right, rgba(248, 248, 248, 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

const PlanName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background: #f8f8f8;
    border-radius: 2px;
  }
`;

const FeatureBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -25px;
  background: #f8f8f8;
  color: black;
  font-size: 0.75rem;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  transform: rotate(12deg);
  box-shadow: 0 5px 15px rgba(248, 248, 248, 0.4);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &:before {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background: inherit;
    border-radius: 2px;
    rotate: 45deg;
    z-index: -1;
  }
`;

const PlanDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  flex-grow: 0;
`;

const PriceContainer = styled.div`
  margin-bottom: 25px;
  margin-top: 0;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0;
  line-height: 1.1;
`;

const PriceDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 2px;
  margin-top: 2px;
`;

const CustomPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0;
  line-height: 1.1;
  margin-top: 0;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 35px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FeatureItem = styled.li`
  color: var(--text-secondary);
  padding: 8px 0;
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-child {
    padding-top: 0;
  }

  &:before {
    content: "✓";
    color: #f8f8f8;
    margin-right: 12px;
    font-weight: bold;
    min-width: 20px;
    display: inline-flex;
    justify-content: center;
    font-size: 0.8rem;
    text-shadow: 0 0 6px rgba(248, 248, 248, 0.6);
  }
`;

const CrossedFeatureItem = styled(FeatureItem)`
  &:before {
    content: "✕";
    color: #f8f8f8;
    text-shadow: 0 0 6px rgba(248, 248, 248, 0.6);
  }
`;

const SelectButton = styled(Link)`
  background: #f8f8f8;
  color: black;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CustomTierWrapper = styled.div`
  background: var(--dark-card-bg);
  border: 1px solid rgba(248, 248, 248, 0.2);
  border-radius: 20px;
  padding: 0;
  margin-top: 80px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(248, 248, 248, 0.15);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: #f8f8f8;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 0 15px rgba(248, 248, 248, 0.5);
    z-index: 3;
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(20, 20, 20, 0.9), rgba(30, 30, 30, 0.8), rgba(40, 40, 40, 0.9));
    opacity: 0;
    transition: opacity 0.6s ease;
    z-index: 0;
    pointer-events: none;
  }
  
  &:hover:after {
    opacity: 1;
  }
`;

const CustomTierTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: ${props => props.isOpen ? '30px' : '0'};
  color: var(--text-primary);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 40px;
  border-radius: 20px 20px 0 0;
  background: transparent;
  position: relative;
  z-index: 2;
  
  &:hover {
    .icon-container {
      box-shadow: 0 0 15px rgba(248, 248, 248, 0.4);
      background: rgba(248, 248, 248, 0.1);
    }
  }
  
  .icon-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-right: 15px;
    background: transparent;
    border: 2px solid #f8f8f8;
    border-radius: 50%;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .icon {
    position: relative;
    width: 14px;
    height: 2px;
    background: #f8f8f8;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    
    &:before {
      content: '';
      position: absolute;
      width: 14px;
      height: 2px;
      background: #f8f8f8;
      transform: ${props => props.isOpen ? 'rotate(0deg)' : 'rotate(90deg)'};
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
  }
`;

const CustomTierContent = styled.div`
  max-height: ${props => props.isOpen ? '2000px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  padding: ${props => props.isOpen ? '0 40px 40px' : '0 40px'};
  position: relative;
  z-index: 2;
  
  /* Separate transition for max-height to make collapse smoother */
  transition-property: max-height, opacity, padding;
  transition-duration: ${props => props.isOpen ? '0.6s' : '0.4s'}, 0.4s, 0.3s;
  transition-delay: 0s, ${props => props.isOpen ? '0s' : '0.1s'}, 0s;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const ResourceCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 22px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(20, 20, 20, 0.6);
  }
`;

const ResourceTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
  border-left: 3px solid #f8f8f8;
  padding-left: 10px;
`;

const ResourceControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
  background: rgba(0, 0, 0, 0.15);
  padding: 6px 10px;
  border-radius: 6px;
`;

const ControlButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: none;
  background: ${props => props.add ? "rgba(74, 74, 74, 0.5)" : "rgba(42, 42, 42, 0.5)"};
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.add ? "rgba(85, 85, 85, 0.7)" : "rgba(51, 51, 51, 0.7)"};
    transform: ${props => props.add ? "scale(1.05)" : "scale(0.95)"};
  }
`;

const ResourceCount = styled.span`
  font-size: 1.2rem;
  color: var(--text-primary);
  min-width: 30px;
  text-align: center;
  font-weight: 600;
`;

const ExperienceSelect = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 10px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const ExperienceOption = styled.button`
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  border: none;
  background: ${props => props.selected ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  color: ${props => props.selected ? "var(--text-primary)" : "var(--text-secondary)"};
  font-weight: ${props => props.selected ? "500" : "400"};
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  text-align: center;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const TotalContainer = styled.div`
  margin-top: 40px;
  padding: 30px 40px;
  border-radius: 16px;
  background: linear-gradient(to right, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9));
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 800px;
  margin: 40px auto 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const TotalText = styled.p`
  font-size: 1.2rem;
  color: var(--text-primary);
`;

const TotalPrice = styled.p`
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
`;

const ContactButton = styled(Link)`
  background: #f8f8f8;
  color: black;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  margin-top: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const InfoSection = styled.div`
  margin-top: 80px;
`;

const InfoTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 25px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 70%;
    height: 3px;
    background: white;
    border-radius: 2px;
  }
`;

const InfoBlock = styled.div`
  background: linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9));
  border-radius: 18px;
  padding: 40px 50px;
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
  
  @media (max-width: 768px) {
    padding: 30px 25px;
  }
`;

const DiscountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const DiscountCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  border: 1px solid var(--border-color);
`;

const DiscountHours = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 5px;
`;

const DiscountPercent = styled.div`
  font-size: 1.1rem;
  color: #f8f8f8;
  font-weight: 600;
`;

const DiscountText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 8px;
`;

const CountdownContainer = styled.div`
  background: linear-gradient(45deg, rgba(220, 220, 220, 0.08), rgba(240, 240, 240, 0.12));
  border: 1px solid rgba(248, 248, 248, 0.2);
  border-radius: 20px;
  padding: 35px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(248, 248, 248, 0.15);
  overflow: hidden;
  transform: perspective(1000px) rotateX(2deg);
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: #f8f8f8;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 0 15px rgba(248, 248, 248, 0.5);
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(248, 248, 248, 0.12), transparent 70%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 30px 25px;
    transform: perspective(1000px) rotateX(1deg);
  }
`;

const CountdownHeader = styled.h3`
  color: #f8f8f8;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CountdownUrgency = styled.p`
  color: rgba(248, 248, 248, 0.9);
  font-size: 1.2rem;
  text-align: center;
  margin-top: 25px;
  position: relative;
  z-index: 1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 18px;
  }
`;

const CountdownTimerDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 15px 0;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const CountdownUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  
  @media (max-width: 768px) {
    min-width: 70px;
  }
`;

const CountdownNumber = styled.div`
  background: rgba(20, 20, 20, 0.7);
  color: #f8f8f8;
  font-size: 2.4rem;
  font-weight: 800;
  border-radius: 12px;
  min-width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(248, 248, 248, 0.1);
  position: relative;
  border: 1px solid rgba(248, 248, 248, 0.15);
  letter-spacing: 1px;
  clip-path: polygon(5% 0, 95% 0, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0 95%, 0 5%);
  
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(248, 248, 248, 0.1);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    min-width: 75px;
    height: 75px;
  }
`;

const CountdownLabel = styled.div`
  color: rgba(248, 248, 248, 0.8);
  font-size: 0.9rem;
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CountdownButton = styled(Link)`
  background: #f8f8f8;
  color: black;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const PulsingDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #f8f8f8;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  box-shadow: 0 0 10px rgba(248, 248, 248, 0.6);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    border-radius: 50%;
    animation: pulse-dot 1.5s infinite;
    opacity: 0.8;
  }
  
  @keyframes pulse-dot {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(3);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const CountdownHighlight = styled.span`
  color: #f8f8f8;
  font-weight: 600;
  margin: 0 6px;
  letter-spacing: 0.5px;
`;

const BillingToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  background: linear-gradient(to right, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9));
  border: 1px solid var(--border-color);
  padding: 15px 25px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BillingOption = styled.span`
  font-size: 1.1rem;
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  min-width: 90px;
  text-align: center;
  transition: all 0.3s ease;
`;

const ToggleSwitch = styled.button`
  width: 55px;
  height: 30px;
  background: ${props => props.isOn ? 'rgba(248, 248, 248, 0.2)' : 'rgba(248, 248, 248, 0.1)'};
  border-radius: 20px;
  border: 1px solid rgba(248, 248, 248, 0.3);
  margin: 0 12px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  &:before {
    content: "";
    position: absolute;
    left: ${props => props.isOn ? '27px' : '4px'};
    top: 3px;
    width: 22px;
    height: 22px;
    background: #f8f8f8;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  &:hover {
    background: ${props => props.isOn ? 'rgba(248, 248, 248, 0.25)' : 'rgba(248, 248, 248, 0.15)'};
  }
`;

const SaveBadge = styled.span`
  position: absolute;
  top: -12px;
  right: -12px;
  background: #f8f8f8;
  color: black;
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const StrikethroughPrice = styled.span`
  text-decoration: line-through;
  color: var(--text-secondary);
  opacity: 0.7;
  margin-right: 10px;
  font-size: 1.5rem;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: help;
  
  &:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;

const TooltipIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: var(--text-secondary);
  font-size: 10px;
  margin-left: 8px;
  font-weight: bold;
`;

const TooltipContent = styled.div`
  visibility: hidden;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  width: 250px;
  background: #1e1e1e;
  color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.4;
  z-index: 100;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    width: 220px;
    left: auto;
    right: 0;
    transform: translateY(10px);
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #1e1e1e transparent transparent transparent;
    
    @media (max-width: 768px) {
      left: auto;
      right: 20px;
      margin-left: 0;
    }
  }
`;

const resources = [
  { id: 1, name: "Front-End Web Developer", count: 0, experience: "intermediate" },
  { id: 2, name: "Back-End Web Developer", count: 0, experience: "intermediate" },
  { id: 3, name: "Full-Stack Web Developer", count: 0, experience: "intermediate", specialRates: true },
  { id: 4, name: "Mobile App Developer", count: 0, experience: "intermediate" },
  { id: 5, name: "Game Developer", count: 0, experience: "intermediate" },
  { id: 6, name: "UI/UX Designer", count: 0, experience: "intermediate" },
  { id: 7, name: "2D Artist", count: 0, experience: "intermediate" },
  { id: 8, name: "3D Artist", count: 0, experience: "intermediate" },
  { id: 9, name: "2D Animator", count: 0, experience: "intermediate" },
  { id: 10, name: "3D Animator", count: 0, experience: "intermediate" },
  { id: 11, name: "Sound Engineer", count: 0, experience: "intermediate" },
  { id: 12, name: "SQA Engineer", count: 0, experience: "intermediate" },
  { id: 13, name: "Technical Content Writer", count: 0, experience: "intermediate" },
  { id: 14, name: "SEO Writer", count: 0, experience: "intermediate" },
  { id: 15, name: "ASO Writer", count: 0, experience: "intermediate" },
  { id: 16, name: "Social Media Marketer", count: 0, experience: "intermediate" },
  { id: 17, name: "Virtual Assistant", count: 0, experience: "intermediate" },
  { id: 18, name: "AI Engineer", count: 0, experience: "intermediate" },
  { id: 19, name: "IoT Engineer", count: 0, experience: "intermediate" },
  { id: 20, name: "DevOps Engineer", count: 0, experience: "intermediate" },
  { id: 21, name: "Cyber Security Engineer", count: 0, experience: "intermediate" },
  { id: 22, name: "Technical Support Specialist", count: 0, experience: "intermediate" },
  { id: 23, name: "Technical Project Manager", count: 0, experience: "intermediate", flatRate: 3 },
  { id: 24, name: "Technical Product Manager", count: 0, experience: "intermediate", flatRate: 3 },
];

const Pricing = () => {
  const [customResources, setCustomResources] = useState(resources);
  const [isAnnual, setIsAnnual] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCustomTeamOpen, setIsCustomTeamOpen] = useState(false);
  
  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('January 1, 2026 00:00:00 PST');
      const now = new Date();
      
      const difference = targetDate - now;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };
    
    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const updateResourceCount = (id, increment) => {
    setCustomResources(prev => 
      prev.map(resource => 
        resource.id === id 
          ? { ...resource, count: Math.max(0, resource.count + increment) }
          : resource
      )
    );
  };
  
  const toggleExperience = (id) => {
    setCustomResources(prev => 
      prev.map(resource => 
        resource.id === id 
          ? { ...resource, experience: resource.experience === "intermediate" ? "veteran" : "intermediate" }
          : resource
      )
    );
  };
  
  const calculateTotal = () => {
    const hourlyRate = 176; // 176 working hours
    return customResources.reduce((total, resource) => {
      if (resource.flatRate) {
        return total + (resource.count * resource.flatRate * hourlyRate);
      }
      
      const rate = resource.specialRates
        ? (resource.experience === "intermediate" ? 4.5 : 9)
        : (resource.experience === "intermediate" ? 3 : 6);
        
      return total + (resource.count * rate * hourlyRate);
    }, 0);
  };
  
  const getMonthlyPrice = (price) => {
    const priceWithTax = price * 1.16; // Adding 16% sales tax
    const discountedPrice = isAnnual ? Math.floor(priceWithTax * 0.88) : priceWithTax;
    return Math.round(discountedPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getAnnualTotal = (price) => {
    const priceWithTax = price * 1.16; // Adding 16% sales tax
    const annualPrice = Math.floor(priceWithTax * 0.88 * 12);
    return annualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getSavingsAmount = (price) => {
    const priceWithTax = price * 1.16; // Adding 16% sales tax
    const savings = Math.floor(priceWithTax * 0.12 * 12);
    return savings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Add keyframes for pulse animation
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
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
    `;
    
    try {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
      console.error("Failed to insert keyframes rule:", e);
    }
  }, []);

  return (
    <PricingWrapper>
      <Title>Our Pricing</Title>
      <Subtitle>
        Choose the perfect plan for your business needs. All of our plans include dedicated resources
        working efficiently to bring your vision to life globally, with teams serving clients in the USA, UK, Europe, Australia, and Dubai.
      </Subtitle>
      
      <CountdownContainer>
        <CountdownHeader>
          <PulsingDot />LIMITED TIME OFFER: Lock in 2025 Rates
        </CountdownHeader>
        <CountdownTimerDisplay>
          <CountdownUnit>
            <CountdownNumber>{countdown.days}</CountdownNumber>
            <CountdownLabel>Days</CountdownLabel>
          </CountdownUnit>
          <CountdownUnit>
            <CountdownNumber>{countdown.hours}</CountdownNumber>
            <CountdownLabel>Hours</CountdownLabel>
          </CountdownUnit>
          <CountdownUnit>
            <CountdownNumber>{countdown.minutes}</CountdownNumber>
            <CountdownLabel>Minutes</CountdownLabel>
          </CountdownUnit>
          <CountdownUnit>
            <CountdownNumber>{countdown.seconds}</CountdownNumber>
            <CountdownLabel>Seconds</CountdownLabel>
          </CountdownUnit>
        </CountdownTimerDisplay>
        <CountdownUrgency>
          Prices will increase on January 1, 2026. Act now to secure current rates!
        </CountdownUrgency>
        <CountdownButton to="/contact-us">
          Lock in Current Rates
        </CountdownButton>
      </CountdownContainer>
      
      <BillingToggleContainer>
        <BillingOption active={!isAnnual}>Monthly</BillingOption>
        <ToggleSwitch isOn={isAnnual} onClick={() => setIsAnnual(!isAnnual)} />
        <BillingOption active={isAnnual}>Annually</BillingOption>
        {isAnnual && <SaveBadge>Save 12%</SaveBadge>}
      </BillingToggleContainer>
      
      <PricingGrid>
        <PricingCard>
          <PlanName>Essential Launch</PlanName>
          <PlanDescription>
            Perfect for startups and small businesses looking to build an MVP with a lean budget.
          </PlanDescription>
          
          <PriceContainer>
            {isAnnual && <StrikethroughPrice>$1,584</StrikethroughPrice>}
            <Price>${getMonthlyPrice(1584)}<sup>*</sup></Price>
            <PriceDescription>
              per month {isAnnual && `billed annually ($${getAnnualTotal(1584)})`}
            </PriceDescription>
            {isAnnual && <PriceDescription>You save ${getSavingsAmount(1584)}</PriceDescription>}
            <PriceDescription style={{ fontSize: '0.8rem', opacity: '0.8' }}>* Inclusive of sales tax</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem>Low-No Code Developer with 2-3 years experience</FeatureItem>
            <FeatureItem>UI/UX Designer with 2-3 years experience</FeatureItem>
            <FeatureItem>Technical Project Manager (part-time)</FeatureItem>
            <CrossedFeatureItem>No iterations from initial requirements</CrossedFeatureItem>
            <FeatureItem>Bi-weekly meetings (every 2 weeks)</FeatureItem>
            <FeatureItem>Basic Q/A testing</FeatureItem>
            <FeatureItem>Access to company Slack channel</FeatureItem>
            <FeatureItem>176 working hours per month*</FeatureItem>
            <FeatureItem>30% downpayment + 16% Sales Tax</FeatureItem>
            <FeatureItem>24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton to="/contact-us">Get Started</SelectButton>
        </PricingCard>
        
        <PricingCard featured>
          <PlanName>
            Growth Partnership
            <FeatureBadge>POPULAR</FeatureBadge>
          </PlanName>
          <PlanDescription>
            Ideal for businesses ready to build high-quality, market-competitive products that scale.
          </PlanDescription>
          
          <PriceContainer>
            {isAnnual && <StrikethroughPrice>$3,168</StrikethroughPrice>}
            <Price>${getMonthlyPrice(3168)}<sup>*</sup></Price>
            <PriceDescription>
              per month {isAnnual && `billed annually ($${getAnnualTotal(3168)})`}
            </PriceDescription>
            {isAnnual && <PriceDescription>You save ${getSavingsAmount(3168)}</PriceDescription>}
            <PriceDescription style={{ fontSize: '0.8rem', opacity: '0.8' }}>* Inclusive of sales tax</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem>Expert Engineer with 5-7+ years experience</FeatureItem>
            <FeatureItem>Expert UI/UX Engineer with 5-7+ years experience</FeatureItem>
            <FeatureItem>Technical Project Manager (full-time)</FeatureItem>
            <FeatureItem>Weekly scrum meetings with builds</FeatureItem>
            <FeatureItem>Up to 2 iterations per week</FeatureItem>
            <FeatureItem>Thorough Q/A Testing</FeatureItem>
            <FeatureItem>Priority access to company Slack channel</FeatureItem>
            <FeatureItem>Technical Product Manager with business insights</FeatureItem>
            <FeatureItem>176 working hours per month*</FeatureItem>
            <FeatureItem>25% downpayment + 16% Sales Tax</FeatureItem>
            <FeatureItem>24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton 
            to="/contact-us" 
            style={{
              background: '#f8f8f8',
              color: 'black',
              boxShadow: '0 0 15px rgba(248, 248, 248, 0.3), 0 0 8px rgba(248, 248, 248, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'pulse 2s infinite ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8f8f8';
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(248, 248, 248, 0.6), 0 0 15px rgba(248, 248, 248, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f8f8f8';
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(248, 248, 248, 0.3), 0 0 8px rgba(248, 248, 248, 0.2)';
            }}
          >
            Get Started
          </SelectButton>
        </PricingCard>
        
        <PricingCard>
          <PlanName>Tailored Enterprise</PlanName>
          <PlanDescription>
            Comprehensive solution for enterprise clients with complex requirements and scalable needs.
          </PlanDescription>
          
          <PriceContainer>
            <CustomPrice>Custom<sup>*</sup></CustomPrice>
            <PriceDescription>tailored to your specific needs</PriceDescription>
            <PriceDescription style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '5px' }}>* Inclusive of sales tax</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem>Custom team composition</FeatureItem>
            <FeatureItem>Mix of Proficient and Expert resources</FeatureItem>
            <FeatureItem>Dedicated Technical Project Manager</FeatureItem>
            <FeatureItem>Dedicated Technical Product Manager</FeatureItem>
            <FeatureItem>Flexible iteration cycles</FeatureItem>
            <FeatureItem>Comprehensive QA and testing</FeatureItem>
            <FeatureItem>Dedicated Slack channel</FeatureItem>
            <FeatureItem>176 working hours per month*</FeatureItem>
            <FeatureItem>Priority support and consulting</FeatureItem>
            <FeatureItem>25% downpayment + 16% Sales Tax</FeatureItem>
            <FeatureItem>24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton to="/contact-us">Contact Us</SelectButton>
        </PricingCard>
      </PricingGrid>
      
      <CustomTierWrapper>
        <CustomTierTitle isOpen={isCustomTeamOpen} onClick={() => setIsCustomTeamOpen(!isCustomTeamOpen)}>
          <div className="icon-container">
            <div className="icon"></div>
          </div>
          Build Your Custom Team
        </CustomTierTitle>
        
        <CustomTierContent isOpen={isCustomTeamOpen}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            marginBottom: '30px', 
            fontSize: '1.05rem', 
            maxWidth: '900px', 
            lineHeight: '1.7' 
          }}>
            Craft your perfect development team by selecting the exact resources you need. 
            Mix and match different specialties and experience levels to create a tailored solution 
            that precisely fits your project requirements and budget.
          </p>
          
          <ResourceGrid>
            {customResources.map(resource => (
              <ResourceCard key={resource.id}>
                <ResourceTitle>{resource.name}</ResourceTitle>
                <ExperienceSelect>
                  {resource.flatRate ? (
                    <ExperienceOption selected={true}>
                      ${resource.flatRate}/h (fixed rate)
                    </ExperienceOption>
                  ) : (
                    <>
                      <ExperienceOption 
                        selected={resource.experience === "intermediate"}
                        onClick={() => resource.experience !== "intermediate" && toggleExperience(resource.id)}
                      >
                        Proficient<br/>(${resource.specialRates ? "4.5" : "3"}/h)
                      </ExperienceOption>
                      <ExperienceOption 
                        selected={resource.experience === "veteran"}
                        onClick={() => resource.experience !== "veteran" && toggleExperience(resource.id)}
                      >
                        Expert<br/>(${resource.specialRates ? "9" : "6"}/h)
                      </ExperienceOption>
                    </>
                  )}
                </ExperienceSelect>
                <ResourceControls>
                  <ControlButton onClick={() => updateResourceCount(resource.id, -1)}>−</ControlButton>
                  <ResourceCount>{resource.count}</ResourceCount>
                  <ControlButton add onClick={() => updateResourceCount(resource.id, 1)}>+</ControlButton>
                </ResourceControls>
              </ResourceCard>
            ))}
          </ResourceGrid>
          
          <div style={{ 
            fontSize: '0.95rem', 
            color: 'var(--text-secondary)', 
            padding: '10px 15px', 
            background: 'rgba(255,255,255,0.03)', 
            borderRadius: '8px',
            marginBottom: '30px' 
          }}>
            <p>
              <strong>Note:</strong> All team members follow our standard working hours calculation.
              The monthly cost will vary based on the actual number of working days in each month.
            </p>
          </div>
          
          <TotalContainer>
            <TotalText>Estimated Monthly Total</TotalText>
            <TotalPrice>${calculateTotal().toLocaleString()}</TotalPrice>
          </TotalContainer>
          
          <ContactButton to="/contact-us">Contact Us for Details</ContactButton>
        </CustomTierContent>
      </CustomTierWrapper>
      
      <InfoSection>
        <HoursExplanation>
          <HoursTitle>Working Hours Calculation & Flexible Billing</HoursTitle>
          <p>
            Our standard pricing is based on 176 working hours per month (8-hour workday × 22 working days).
            The actual number of working hours may vary depending on the specific month:
          </p>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>Months with fewer than 22 working days (like February) will be billed less</li>
            <li>Months with more than 22 working days will be billed accordingly</li>
          </ul>
          
          <p style={{ marginTop: '15px' }}>Each of our monthly plans includes these 176 working hours, providing you with dedicated development resources to advance your project.</p>
          
          <p>For projects estimated to be completed in less than a month, we only charge for the actual number of hours worked, rather than billing for a full month. This flexible approach ensures you only pay for the development time your project actually requires.</p>
          
          <HoursNote>
            * We always calculate the exact working days in each month, excluding weekends and standard holidays.
            Your invoice will reflect the precise number of working hours for that billing period.
            <br/><br/>
            * The 176 hours are distributed across your team members as needed. For smaller projects, we can also provide partial-month billing based on actual hours utilized.
          </HoursNote>
          <div style={{ 
            marginTop: '15px', 
            padding: '10px 15px', 
            background: 'rgba(255,255,255,0.05)', 
            borderRadius: '6px', 
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <strong>Overtime Rates:</strong> Any additional hours beyond the calculated working hours for a given month will be charged at 2× the standard hourly rate. Prior approval will be required for any overtime work.
          </div>
        </HoursExplanation>
        
        <InfoBlock>
          <InfoTitle>Important Notes</InfoTitle>
          <FeatureList>
            <FeatureItem>A 25-30% downpayment is required before project initiation for both monthly and annual payment plans</FeatureItem>
            <FeatureItem>All prices are subject to 16% Sales Tax</FeatureItem>
            <FeatureItem>Additional hours beyond the monthly calculation will be billed at 2× the standard hourly rate</FeatureItem>
            <FeatureItem>Our rates will increase by 10-15% starting January 1, 2026</FeatureItem>
            <FeatureItem>Annual packages purchased before January 1, 2026 12:00 AM PST will remain valid for a full year from purchase date</FeatureItem>
            <FeatureItem>We can utilize existing assets (templates, code libraries, etc.) where appropriate to save time and costs, subject to consultation</FeatureItem>
            <FeatureItem>Custom quotes available for specialized technology stacks or industry-specific requirements</FeatureItem>
            <FeatureItem>All prices are in USD and exclude any third-party service costs</FeatureItem>
            <FeatureItem>All packages include 24/7 availability within your time zone</FeatureItem>
          </FeatureList>
        </InfoBlock>
      </InfoSection>
    </PricingWrapper>
  );
};

export default Pricing; 