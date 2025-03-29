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
  padding: 40px 35px;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border: 1px solid var(--border-color);
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  ${props => props.featured && `
    border: 1px solid rgba(255, 84, 112, 0.3);
    transform: scale(1.05);
    z-index: 2;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 84, 112, 0.1);
    
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: #ff5470;
      border-radius: 0 0 3px 3px;
    }
    
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at top right, rgba(255, 84, 112, 0.1), transparent 70%);
      pointer-events: none;
    }
    
    @media (max-width: 900px) {
      transform: scale(1);
      margin: 40px 0;
    }
  `}

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle at bottom right, rgba(40, 40, 40, 0.3), transparent 70%);
    pointer-events: none;
  }
  
  @media (max-width: 900px) {
    padding: 30px 25px;
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
    background: #ff5470;
    border-radius: 2px;
  }
`;

const FeatureBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -25px;
  background: #ff5470;
  color: white;
  font-size: 0.75rem;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  transform: rotate(12deg);
  box-shadow: 0 5px 15px rgba(255, 84, 112, 0.4);
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
    color: #ff5470;
    margin-right: 12px;
    font-weight: bold;
    min-width: 20px;
    display: inline-flex;
    justify-content: center;
    font-size: 0.8rem;
  }
`;

const CrossedFeatureItem = styled(FeatureItem)`
  &:before {
    content: "✕";
    color: #ff6b6b;
  }
`;

const SelectButton = styled(Link)`
  padding: 16px 0;
  width: 100%;
  border: none;
  border-radius: 12px;
  background: var(--button-bg);
  color: var(--button-text);
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.4s ease;
  margin-top: auto;
  box-shadow: var(--button-glow);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  text-align: center;
  text-decoration: none;
  display: block;

  &:hover {
    background: var(--button-hover-bg);
    box-shadow: var(--button-hover-glow);
    transform: translateY(-3px);
  }
  
  &:before {
    content: '';
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
    transition: 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const CustomTierWrapper = styled.div`
  margin-top: 80px;
  padding: 50px;
  background: linear-gradient(to bottom right, var(--card-bg), rgba(20, 20, 20, 0.95));
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const CustomTierTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  &:before {
    content: "";
    display: inline-block;
    width: 30px;
    height: 4px;
    background: #ff5470;
    margin-right: 15px;
    border-radius: 4px;
  }
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
  border-left: 3px solid #ff5470;
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
  padding: 16px 40px;
  border: none;
  border-radius: 30px;
  background: var(--button-bg);
  color: var(--button-text);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 40px auto 0;
  min-width: 220px;
  box-shadow: var(--button-glow);
  text-align: center;
  text-decoration: none;

  &:hover {
    background: var(--button-hover-bg);
    transform: translateY(-5px);
    box-shadow: var(--button-hover-glow);
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
  color: #ff5470;
  font-weight: 600;
`;

const DiscountText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 8px;
`;

const CountdownContainer = styled.div`
  background: linear-gradient(45deg, rgba(25, 25, 25, 0.9), rgba(40, 40, 40, 0.9));
  border: 1px solid rgba(255, 84, 112, 0.3);
  border-radius: 20px;
  padding: 35px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 84, 112, 0.15);
  overflow: hidden;
  transform: perspective(1000px) rotateX(2deg);
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #ff5470, #ff7eb3);
    border-radius: 0 0 4px 4px;
    box-shadow: 0 0 15px rgba(255, 84, 112, 0.5);
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(255, 84, 112, 0.2), transparent 70%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 30px 25px;
    transform: perspective(1000px) rotateX(1deg);
  }
`;

const CountdownHeader = styled.h3`
  color: white;
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
  color: var(--text-secondary);
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
  background: rgba(0, 0, 0, 0.5);
  color: #ff5470;
  font-size: 2.4rem;
  font-weight: 800;
  border-radius: 12px;
  min-width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.08);
  letter-spacing: 1px;
  clip-path: polygon(
    5% 0%, 
    95% 0%, 
    100% 5%, 
    100% 95%, 
    95% 100%, 
    5% 100%, 
    0% 95%, 
    0% 5%
  );
  
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    min-width: 75px;
    height: 75px;
  }
`;

const CountdownLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CountdownButton = styled(Link)`
  background: linear-gradient(90deg, #ff5470, #ff7eb3);
  color: white;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 50px;
  text-decoration: none;
  display: inline-block;
  margin-top: 25px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  border: none;
  box-shadow: 0 8px 20px rgba(255, 84, 112, 0.3);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  clip-path: polygon(
    5% 0%, 
    95% 0%, 
    100% 30%, 
    100% 70%, 
    95% 100%, 
    5% 100%, 
    0% 70%, 
    0% 30%
  );
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(255, 84, 112, 0.5);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  @media (max-width: 768px) {
    padding: 12px 24px;
  }
`;

const PulsingDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #ff5470;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  box-shadow: 0 0 10px rgba(255, 84, 112, 0.6);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ff5470;
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
  color: #ff5470;
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

const ToggleSwitch = styled.div`
  width: 46px;
  height: 24px;
  background: ${props => props.isOn ? '#ff5470' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  position: relative;
  margin: 0 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  
  &:after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    background: white;
    top: 3px;
    left: ${props => props.isOn ? '25px' : '3px'};
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const SaveBadge = styled.div`
  background: linear-gradient(to right, #ff5470, #ff3a5c);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  position: absolute;
  right: 15px;
  box-shadow: 0 2px 6px rgba(255, 84, 112, 0.3);
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
    const discountedPrice = isAnnual ? Math.floor(price * 0.88) : price;
    return discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getAnnualTotal = (price) => {
    const annualPrice = Math.floor(price * 0.88 * 12);
    return annualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getSavingsAmount = (price) => {
    const savings = Math.floor(price * 0.12 * 12);
    return savings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Add keyframes for pulse animation
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes pulse {
        0% {
          box-shadow: 0 0 15px rgba(255, 105, 180, 0.3), 0 0 8px rgba(255, 105, 180, 0.2);
        }
        50% {
          box-shadow: 0 0 18px rgba(255, 105, 180, 0.4), 0 0 10px rgba(255, 105, 180, 0.3);
        }
        100% {
          box-shadow: 0 0 15px rgba(255, 105, 180, 0.3), 0 0 8px rgba(255, 105, 180, 0.2);
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
            <Price>${getMonthlyPrice(1584)}</Price>
            <PriceDescription>
              per month {isAnnual && `billed annually ($${getAnnualTotal(1584)})`}
            </PriceDescription>
            {isAnnual && <PriceDescription>You save ${getSavingsAmount(1584)}</PriceDescription>}
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
            <FeatureItem>30% downpayment + 15% Sales Tax</FeatureItem>
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
            <Price>${getMonthlyPrice(3168)}</Price>
            <PriceDescription>
              per month {isAnnual && `billed annually ($${getAnnualTotal(3168)})`}
            </PriceDescription>
            {isAnnual && <PriceDescription>You save ${getSavingsAmount(3168)}</PriceDescription>}
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem>Veteran Engineer with 5-7+ years experience</FeatureItem>
            <FeatureItem>Veteran UI/UX Engineer with 5-7+ years experience</FeatureItem>
            <FeatureItem>Technical Project Manager (full-time)</FeatureItem>
            <FeatureItem>Weekly scrum meetings with builds</FeatureItem>
            <FeatureItem>Up to 2 iterations per week</FeatureItem>
            <FeatureItem>Thorough Q/A Testing</FeatureItem>
            <FeatureItem>Priority access to company Slack channel</FeatureItem>
            <FeatureItem>Technical Product Manager with business insights</FeatureItem>
            <FeatureItem>176 working hours per month*</FeatureItem>
            <FeatureItem>25% downpayment + 15% Sales Tax</FeatureItem>
            <FeatureItem>24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton 
            to="/contact-us" 
            style={{
              background: 'var(--highlight)',
              boxShadow: '0 0 15px rgba(255, 105, 180, 0.3), 0 0 8px rgba(255, 105, 180, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'pulse 2s infinite ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--highlightHover)';
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 105, 180, 0.6), 0 0 15px rgba(255, 105, 180, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--highlight)';
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 105, 180, 0.3), 0 0 8px rgba(255, 105, 180, 0.2)';
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
            <CustomPrice>Custom</CustomPrice>
            <PriceDescription>tailored to your specific needs</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem>Custom team composition</FeatureItem>
            <FeatureItem>Mix of intermediate and veteran resources</FeatureItem>
            <FeatureItem>Dedicated Technical Project Manager</FeatureItem>
            <FeatureItem>Dedicated Technical Product Manager</FeatureItem>
            <FeatureItem>Flexible iteration cycles</FeatureItem>
            <FeatureItem>Comprehensive QA and testing</FeatureItem>
            <FeatureItem>Dedicated Slack channel</FeatureItem>
            <FeatureItem>176 working hours per month*</FeatureItem>
            <FeatureItem>Priority support and consulting</FeatureItem>
            <FeatureItem>25% downpayment + 15% Sales Tax</FeatureItem>
            <FeatureItem>24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton to="/contact-us">Contact Us</SelectButton>
        </PricingCard>
      </PricingGrid>
      
      <CustomTierWrapper>
        <CustomTierTitle>Build Your Custom Team</CustomTierTitle>
        
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
                      Intermediate (${resource.specialRates ? "4.5" : "3"}/h)
                    </ExperienceOption>
                    <ExperienceOption 
                      selected={resource.experience === "veteran"}
                      onClick={() => resource.experience !== "veteran" && toggleExperience(resource.id)}
                    >
                      Veteran (${resource.specialRates ? "9" : "6"}/h)
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
      </CustomTierWrapper>
      
      <InfoSection>
        <HoursExplanation>
          <HoursTitle>Working Hours Calculation</HoursTitle>
          <p>
            Our standard pricing is based on 176 working hours per month (8-hour workday × 22 working days).
            The actual number of working hours may vary depending on the specific month:
          </p>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>Months with fewer than 22 working days (like February) will be billed less</li>
            <li>Months with more than 22 working days will be billed accordingly</li>
          </ul>
          <HoursNote>
            We always calculate the exact working days in each month, excluding weekends and standard holidays.
            Your invoice will reflect the precise number of working hours for that billing period.
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
            <FeatureItem>All prices are subject to 15% Sales Tax</FeatureItem>
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