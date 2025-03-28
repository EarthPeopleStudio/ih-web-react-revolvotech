import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  gap: 35px;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const PricingCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 35px 35px;
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
      margin: 30px 0;
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
  margin-bottom: 12px;
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
  margin-bottom: 18px;
  flex-grow: 0;
`;

const PriceContainer = styled.div`
  margin-bottom: 18px;
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
  margin: 0 0 25px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FeatureItem = styled.li`
  color: var(--text-secondary);
  padding: 6px 0;
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

const SelectButton = styled.button`
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

const ContactButton = styled.button`
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
  background: linear-gradient(to right, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9));
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 18px 25px;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--text-secondary);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    width: 100%;
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

const TechStackExplanation = styled.div`
  background: linear-gradient(to bottom, var(--card-bg), rgba(20, 20, 20, 0.95));
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 40px 50px;
  margin: 60px 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  
  @media (max-width: 768px) {
    padding: 30px 25px;
  }
`;

const TechCard = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 20px 25px;
  margin: 15px 0;
  border: 1px solid var(--border-color);
  transition: all 0.25s ease;
  
  h4 {
    color: var(--text-primary);
    font-size: 1.2rem;
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.15);
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

  return (
    <PricingWrapper>
      <Title>Our Pricing</Title>
      <Subtitle>
        Choose the perfect plan for your business needs. All of our plans include dedicated resources
        working efficiently to bring your vision to life globally, with teams serving clients in the USA, UK, Europe, Australia, and Dubai.
      </Subtitle>
      
      <AdvantageBanner>
        <AdvantageTitle>The Freelancer Problem</AdvantageTitle>
        <AdvantageText>
          If you've paid for a service from an individual freelancer, you were probably left with a messy, unfinished product and dissatisfied investors. We understand that frustration.
        </AdvantageText>
        <AdvantageText>
          That's why we encourage you to try one of our monthly packages to gauge our teamwork and ensure it meets your standards. Just sit back and relax while we make your most complex idea seem like a walk in the park.
        </AdvantageText>
      </AdvantageBanner>
      
      <AdvantageBanner>
        <AdvantageTitle>Why Choose a Team Over Individual Freelancers?</AdvantageTitle>
        <AdvantageText>
          Hiring individual freelancers may seem cost-effective initially, but often results in delayed deliverables and quality issues. 
          Our team-based approach ensures synchronized development, consistent quality, proper code reviews, and accountability.
        </AdvantageText>
        <AdvantageText>
          By choosing one of our tiers, you get a dedicated team that collaborates efficiently, follows 
          industry best practices, and delivers a polished product that meets your business objectives.
        </AdvantageText>
        <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Cost-Saving Opportunity</h4>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            We can leverage existing assets (templates, packages, libraries, public repositories) to accelerate development and reduce costs when appropriate. 
            This option requires consultation as integration complexity varies by project. We'll discuss suitable pre-built solutions during our initial assessment to 
            help you make informed decisions on the perfect balance between custom development and leveraging existing resources.
          </p>
        </div>
      </AdvantageBanner>
      
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
      
      <CountdownContainer>
        Price increase in <CountdownHighlight>{countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</CountdownHighlight> • Lock in current rates before January 1, 2026
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
            <FeatureItem>Intermediate Developer with 2-3 years experience</FeatureItem>
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
          
          <SelectButton>Get Started</SelectButton>
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
          
          <SelectButton>Get Started</SelectButton>
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
            <FeatureItem>Senior Technical Product Manager</FeatureItem>
            <FeatureItem>Flexible iteration cycles</FeatureItem>
            <FeatureItem>Comprehensive QA and testing</FeatureItem>
            <FeatureItem>Dedicated Slack channel</FeatureItem>
            <FeatureItem>176 working hours per month*</FeatureItem>
            <FeatureItem>Priority support and consulting</FeatureItem>
            <FeatureItem>25% downpayment + 15% Sales Tax</FeatureItem>
            <FeatureItem>24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton>Contact Us</SelectButton>
        </PricingCard>
      </PricingGrid>
      
      <div style={{ 
        marginTop: '100px', 
        marginBottom: '80px',
        padding: '30px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '15px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        border: '1px solid var(--border-color)',
      }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '20px', 
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          Global Reach, Local Understanding
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.7', 
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          Our remote development teams work with clients worldwide, providing tailored services across these key regions:
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{
            padding: '15px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>United States</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Silicon Valley • New York • Texas</p>
          </div>
          
          <div style={{
            padding: '15px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>United Kingdom</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>London • Manchester • Edinburgh</p>
          </div>
          
          <div style={{
            padding: '15px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Europe</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Berlin • Amsterdam • Paris</p>
          </div>
          
          <div style={{
            padding: '15px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Australia</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sydney • Melbourne • Brisbane</p>
          </div>
          
          <div style={{
            padding: '15px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>UAE & Middle East</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Dubai • Abu Dhabi • Doha</p>
          </div>
        </div>
      </div>
      
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
        
        <ContactButton>Contact Us for Details</ContactButton>
      </CustomTierWrapper>
      
      <TechStackExplanation>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '25px', 
          color: 'white',
          textAlign: 'center',
        }}>Our Technology Expertise</h2>
        
        <p style={{ 
          textAlign: 'center', 
          maxWidth: '800px', 
          margin: '0 auto 30px',
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: '1.7'
        }}>
          Our global team of experts specializes in a wide range of technologies to bring your vision to life
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          <TechCard>
            <h4>Web Development</h4>
            <p>We create responsive, high-performance web applications using modern frameworks like React, Angular, Vue, Node.js, Laravel, and Django. Our expertise spans from simple landing pages to complex enterprise applications with microservices architecture, ensuring scalable and maintainable solutions.</p>
          </TechCard>
          
          <TechCard>
            <h4>Mobile Development</h4>
            <p>Our mobile app developers build native (iOS/Android) and cross-platform applications using Flutter, React Native, or native Swift and Kotlin. We focus on creating intuitive user experiences with efficient backends, supporting features like real-time synchronization, offline functionality, and device-specific optimizations.</p>
          </TechCard>
          
          <TechCard>
            <h4>Game Development</h4>
            <p>Beyond traditional games, our team creates immersive AR/VR/XR experiences, simulations, and educational gaming applications using Unity, Unreal Engine, and WebGL. We develop across platforms, including mobile, desktop, console, and web, with expertise in 3D modeling, physics simulations, and multiplayer functionality.</p>
          </TechCard>
          
          <TechCard>
            <h4>UI/UX Design</h4>
            <p>Our designers create beautiful, intuitive interfaces that balance aesthetics with functionality. We follow user-centered design principles, conducting research and testing to ensure your product not only looks impressive but also provides an optimal user experience across all devices and platforms.</p>
          </TechCard>
          
          <TechCard>
            <h4>Digital Art & Animation</h4>
            <p>Our 2D/3D artists and animators create everything from illustrations and characters to complex animations and visual effects. We support various styles—from minimalist to photorealistic—and provide assets for games, apps, marketing materials, and promotional videos that bring your ideas to life.</p>
          </TechCard>
          
          <TechCard>
            <h4>AI & IoT Solutions</h4>
            <p>Our specialized engineers develop AI-powered applications using machine learning, natural language processing, and computer vision. We also create IoT solutions that connect physical devices with digital systems, enabling data collection, analysis, and automation for smart homes, industrial applications, and innovative consumer products.</p>
          </TechCard>
          
          <TechCard>
            <h4>Project & Product Management</h4>
            <p>Our dedicated managers ensure your project runs smoothly from concept to deployment. Project Managers oversee timelines, resource allocation, and deliverables, while Product Managers focus on strategic vision, feature prioritization, and market alignment. Together, they maintain clear communication, resolve blockers, and ensure business objectives are met.</p>
          </TechCard>
          
          <TechCard>
            <h4>Content Creation & SEO/ASO</h4>
            <p>Our writers produce engaging technical content, user documentation, marketing copy, and SEO/ASO optimized materials. We create content strategies that improve discoverability, user engagement, and conversion rates. From app store descriptions to technical guides, our writers translate complex concepts into accessible, compelling content.</p>
          </TechCard>
          
          <TechCard>
            <h4>DevOps & Security</h4>
            <p>Our DevOps engineers establish CI/CD pipelines, automate deployments, and optimize infrastructure using tools like Docker, Kubernetes, and AWS/Azure/GCP. Our security specialists implement best practices for data protection, vulnerability assessment, and compliance with regulations like GDPR and CCPA, ensuring your applications are both robust and secure.</p>
          </TechCard>
        </div>
      </TechStackExplanation>
      
      <InfoSection>
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