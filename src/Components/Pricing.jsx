import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const circuitPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 182, 4, 0); }
  50% { box-shadow: 0 0 0 4px rgba(251, 182, 4, 0.1); }
`;

const digitalFlicker = keyframes`
  0%, 100% { opacity: 1; }
  2% { opacity: 0.8; }
  4% { opacity: 1; }
  6% { opacity: 0.9; }
  8% { opacity: 1; }
`;

const sparkle = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  25% {
    opacity: 1;
    transform: scale(1) rotate(90deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.8) rotate(180deg);
  }
  75% {
    opacity: 1;
    transform: scale(1.2) rotate(270deg);
  }
  100% {
    opacity: 0;
    transform: scale(0) rotate(360deg);
  }
`;

const sparkleTrail = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.6;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

const electricPulse = keyframes`
  0%, 100% { 
    opacity: 0.3;
    transform: translateX(0) scale(1);
  }
  25% { 
    opacity: 0.6;
    transform: translateX(2px) scale(1.1);
  }
  50% { 
    opacity: 0.8;
    transform: translateX(-1px) scale(0.9);
  }
  75% { 
    opacity: 0.5;
    transform: translateX(1px) scale(1.05);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const subtleThunderBolt = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  8% {
    opacity: 0.8;
    transform: scale(1) rotate(-10deg);
  }
  12% {
    transform: scale(0.9) rotate(10deg);
  }
  16% {
    transform: scale(1.1) rotate(-10deg);
  }
  25%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
`;

// Enhanced spark effects
const floatingParticle = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0);
  }
  20% {
    opacity: 1;
    transform: translateY(15px) scale(1);
  }
  80% {
    opacity: 0.8;
    transform: translateY(-15px) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0);
  }
`;

const twinkle = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;



const PricingWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 60px 60px, 60px 60px, 30px 30px, 45px 45px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #FFEB3B 0%, #FFD700 50%, #FFEB3B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  letter-spacing: -0.01em;
  line-height: 1.2;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 48px;
  max-width: 700px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 36px;
  }
`;

const HoursExplanation = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 28px 32px;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${fadeIn} 0.8s ease;

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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
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
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }
  
  /* Circuit lines */
  &:before:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 10px;
    width: 2px;
    height: 30px;
    background: linear-gradient(to bottom, rgba(251, 182, 4, 0.2), transparent);
    transform: translateY(-50%);
  }
`;

const HoursTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 24px;
  position: relative;
  display: inline-block;
  font-weight: 600;
  z-index: 1;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60%;
    height: 2px;
    background: #fbb604;
    border-radius: 1px;
  }
`;

const HoursNote = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-top: 10px;
  font-style: italic;
  opacity: 0.85;
  position: relative;
  z-index: 1;
`;

const AdvantageBanner = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 50px 40px;
  margin-bottom: 60px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  position: relative;
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.8s ease;
  
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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.4;
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
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 40px 30px;
    margin-bottom: 50px;
  }
`;

const AdvantageTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 20px;
  display: inline-block;
  position: relative;
  z-index: 1;
`;

const AdvantageText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 10px;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease 0.2s both;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 28px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const PricingCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.98), rgba(35, 35, 40, 0.98));
  border-radius: 20px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(251, 182, 4, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(251, 182, 4, 0.1);
  overflow: hidden;
  height: auto;
  min-height: 650px;
  max-height: none;
  animation: ${fadeIn} 0.8s ease both;
  backdrop-filter: blur(10px);

  /* Base styles for effects container */
  .effects-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 5;
  }

  /* Enhanced Spark effects for first card (Spark) */
  &:first-child {
    .spark {
      position: absolute;
      font-size: 12px;
      color: #fbb604;
      text-shadow: 0 0 8px rgba(251, 182, 4, 0.8);
      opacity: 0;
    }

    .spark-1 {
      top: 20px;
      left: 20px;
      animation: ${sparkle} 2s ease-in-out infinite;
      &:before { content: '✦'; }
    }

    .spark-2 {
      top: 40px;
      right: 30px;
      animation: ${sparkle} 2.5s ease-in-out infinite 0.5s;
      &:before { content: '✧'; }
    }

    .spark-3 {
      bottom: 30px;
      left: 40px;
      animation: ${sparkle} 2.2s ease-in-out infinite 1s;
      &:before { content: '⋆'; }
    }

    .spark-4 {
      bottom: 40px;
      right: 20px;
      animation: ${sparkle} 2.8s ease-in-out infinite 1.5s;
      &:before { content: '✦'; }
    }

    /* New floating particles */
    .floating-particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #fbb604;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(251, 182, 4, 0.6);
      animation: ${floatingParticle} 3s ease-in-out infinite;
    }

    .floating-particle-1 {
      left: 15%;
      bottom: 0;
      animation-delay: 0s;
    }

    .floating-particle-2 {
      left: 35%;
      bottom: 0;
      animation-delay: 1s;
    }

    .floating-particle-3 {
      left: 65%;
      bottom: 0;
      animation-delay: 2s;
    }

    .floating-particle-4 {
      left: 85%;
      bottom: 0;
      animation-delay: 0.5s;
    }

    /* Twinkling stars */
    .twinkle {
      position: absolute;
      font-size: 8px;
      color: #fbb604;
      animation: ${twinkle} 1.5s ease-in-out infinite;
    }

    .twinkle-1 {
      top: 15%;
      left: 10%;
      animation-delay: 0s;
      &:before { content: '✨'; }
    }

    .twinkle-2 {
      top: 25%;
      right: 15%;
      animation-delay: 0.8s;
      &:before { content: '⭐'; }
    }

    .twinkle-3 {
      bottom: 20%;
      left: 15%;
      animation-delay: 1.6s;
      &:before { content: '✨'; }
    }

    .twinkle-4 {
      bottom: 15%;
      right: 10%;
      animation-delay: 2.4s;
      &:before { content: '⭐'; }
    }

    .spark-trail {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(251, 182, 4, 0.3) 0%, rgba(251, 182, 4, 0) 70%);
      opacity: 0;
    }

    .spark-trail-1 {
      top: 30px;
      left: 30px;
      animation: ${sparkleTrail} 3s ease-in-out infinite;
    }

    .spark-trail-2 {
      bottom: 30px;
      right: 30px;
      animation: ${sparkleTrail} 3s ease-in-out infinite 1.5s;
    }

    &:hover {
      .spark-1, .spark-2, .spark-3, .spark-4 {
        animation-duration: 1.5s;
      }
      .floating-particle {
        animation-duration: 2s;
      }
      .twinkle {
        animation-duration: 1s;
      }
    }
  }

  /* Enhanced Electric effects for second card (Charge) - more lightning */
  &:nth-child(2) {
    position: relative;

    /* Subtle electric sparkles */
    .electric-sparkle {
      position: absolute;
      width: 3px;
      height: 3px;
      background: #fbb604;
      border-radius: 50%;
      opacity: 0;
      box-shadow: 0 0 6px rgba(251, 182, 4, 0.8);
      animation: ${sparkle} 4s ease-in-out infinite;
      pointer-events: none;
    }

    .electric-sparkle-1 {
      top: 15%;
      left: 10%;
      animation-delay: 0s;
    }

    .electric-sparkle-2 {
      top: 25%;
      right: 15%;
      animation-delay: 1.2s;
    }

    .electric-sparkle-3 {
      bottom: 20%;
      left: 20%;
      animation-delay: 2.4s;
    }

    .electric-sparkle-4 {
      bottom: 35%;
      right: 8%;
      animation-delay: 3.6s;
    }

    .electric-sparkle-5 {
      top: 45%;
      left: 8%;
      animation-delay: 1.8s;
    }

    .electric-sparkle-6 {
      top: 60%;
      right: 12%;
      animation-delay: 0.6s;
    }

    .electric-sparkle-7 {
      top: 35%;
      right: 25%;
      animation-delay: 2.8s;
    }

    .electric-sparkle-8 {
      bottom: 50%;
      left: 12%;
      animation-delay: 4.2s;
    }

    /* Small electric particles floating upward */
    .electric-particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(251, 182, 4, 0.7);
      border-radius: 50%;
      opacity: 0;
      animation: ${floatingParticle} 5s ease-in-out infinite;
      pointer-events: none;
    }

    .electric-particle-1 {
      bottom: 25%;
      left: 15%;
      animation-delay: 0.5s;
    }

    .electric-particle-2 {
      bottom: 30%;
      right: 20%;
      animation-delay: 2.5s;
    }

    .electric-particle-3 {
      bottom: 15%;
      left: 25%;
      animation-delay: 4s;
    }

    .electric-particle-4 {
      bottom: 40%;
      right: 10%;
      animation-delay: 1.5s;
    }

    .electric-particle-5 {
      bottom: 35%;
      left: 30%;
      animation-delay: 3.5s;
    }

    /* Enhanced electric twinkles - more lightning bolts */
    .electric-twinkle {
      position: absolute;
      font-size: 10px;
      color: rgba(251, 182, 4, 0.7);
      opacity: 0;
      animation: ${twinkle} 3s ease-in-out infinite;
      pointer-events: none;
      &:before { content: '⚡'; }
    }

    .electric-twinkle-1 {
      top: 30%;
      left: 12%;
      animation-delay: 1s;
    }

    .electric-twinkle-2 {
      bottom: 40%;
      right: 15%;
      animation-delay: 3s;
    }

    .electric-twinkle-3 {
      top: 70%;
      left: 18%;
      animation-delay: 5s;
    }

    .electric-twinkle-4 {
      top: 50%;
      right: 8%;
      animation-delay: 2s;
    }

    .electric-twinkle-5 {
      bottom: 25%;
      left: 8%;
      animation-delay: 4s;
    }

    .electric-twinkle-6 {
      top: 80%;
      right: 20%;
      animation-delay: 6s;
    }

    /* Lightning streak effects */
    .lightning-streak {
      position: absolute;
      width: 1px;
      height: 20px;
      background: linear-gradient(to bottom, rgba(251, 182, 4, 0.8), transparent);
      opacity: 0;
      animation: ${sparkle} 3s ease-in-out infinite;
      pointer-events: none;
      transform: rotate(25deg);
    }

    .lightning-streak-1 {
      top: 20%;
      left: 18%;
      animation-delay: 1.5s;
    }

    .lightning-streak-2 {
      bottom: 30%;
      right: 22%;
      animation-delay: 3.5s;
      transform: rotate(-25deg);
    }

    .lightning-streak-3 {
      top: 55%;
      left: 25%;
      animation-delay: 5.5s;
      transform: rotate(45deg);
    }

    /* Refined lightning bolts - perfect size */
    .lightning-bolt {
      position: absolute;
      font-size: 20px;
      color: #fbb604;
      text-shadow: 
        0 0 8px rgba(251, 182, 4, 0.6),
        0 0 12px rgba(251, 182, 4, 0.4);
      opacity: 0;
      animation: ${subtleThunderBolt} 5s ease-in-out infinite;
      pointer-events: none;
      &:before { content: '⚡'; }
    }

    .lightning-bolt-1 {
      top: 20%;
      left: 20%;
      animation-delay: 0.8s;
    }

    .lightning-bolt-2 {
      bottom: 25%;
      right: 18%;
      animation-delay: 3.2s;
    }

    .lightning-bolt-3 {
      top: 60%;
      left: 15%;
      animation-delay: 5.8s;
    }

    .lightning-bolt-4 {
      top: 40%;
      right: 20%;
      animation-delay: 2.4s;
    }

    &:hover {
      .electric-sparkle {
        animation-duration: 2.5s;
      }
      .electric-particle {
        animation-duration: 3s;
      }
      .electric-twinkle {
        animation-duration: 2s;
      }
      .lightning-streak {
        animation-duration: 1.8s;
      }
      .lightning-bolt {
        animation-duration: 3s;
      }
    }
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 25px 70px rgba(251, 182, 4, 0.2),
      0 0 20px rgba(251, 182, 4, 0.3);
    border-color: rgba(251, 182, 4, 0.6);
  }

  ${props => props.$featured && css`
    border: 2px solid #fbb604;
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(251, 182, 4, 0.3);
  `}
`;

const PlanName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  justify-content: center;
  min-height: 60px;
  padding-top: 15px;
`;

const FeatureBadge = styled.span`
  background: linear-gradient(135deg, #fbb604, #f99b04);
  color: #000;
  font-size: 0.7rem;
  padding: 6px 14px;
  border-radius: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(251, 182, 4, 0.4);
  position: absolute;
  top: -10px;
  right: 50%;
  transform: translateX(50%);
  z-index: 10;
  border: 2px solid rgba(251, 182, 4, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #fbb604;
  }
`;

const PlanDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 28px;
  flex-grow: 0;
  opacity: 0.85;
  text-align: center;
`;

const PriceContainer = styled.div`
  margin-bottom: 32px;
  margin-top: 12px;
  text-align: center;
`;

const StrikethroughPrice = styled.div`
  color: var(--text-secondary);
  font-size: 1.4rem;
  text-decoration: line-through;
  opacity: 0.6;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 3.2rem;
  font-weight: 800;
  color: #fbb604;
  margin-bottom: 8px;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(251, 182, 4, 0.3);
  
  sup {
    font-size: 1rem;
    top: -1.5em;
    margin-left: 3px;
  }
`;

const PriceDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 2px;
  margin-top: 2px;
  opacity: 0.7;
`;

const CustomPrice = styled.div`
  font-size: 3.2rem;
  font-weight: 800;
  color: #fbb604;
  margin-bottom: 8px;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(251, 182, 4, 0.3);
  
  sup {
    font-size: 1rem;
    top: -1.5em;
    margin-left: 3px;
  }
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 32px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
`;

const FeatureItem = styled.li`
  color: var(--text-secondary);
  padding: 6px 0;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 1.5;

  svg {
    color: #fbb604;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

const CrossedFeatureItem = styled(FeatureItem)`
  opacity: 0.6;
  text-decoration: line-through;
  
  svg {
    color: var(--text-secondary);
  }
`;

const SelectButton = styled(Link)`
  background: linear-gradient(135deg, #fbb604, #f99b04);
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  text-decoration: none;
  display: block;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 6px 20px rgba(251, 182, 4, 0.3);
  position: relative;
  overflow: hidden;
  margin-top: auto;
  flex-shrink: 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(251, 182, 4, 0.4);
    filter: brightness(1.1);
    
    &:before {
      left: 100%;
    }
  }
`;

const CustomTierWrapper = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 0;
  margin-top: 60px;
  margin-bottom: 60px;
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
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
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

const CustomTierTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: ${props => props.$isOpen ? '24px' : '0'};
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  padding: 32px 28px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.05), rgba(251, 182, 4, 0.02));
  position: relative;
  z-index: 2;
  text-align: center;
  letter-spacing: 0.5px;
  
  &:hover {
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(251, 182, 4, 0.05));
    
    .icon-container {
      background: rgba(251, 182, 4, 0.2);
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(251, 182, 4, 0.3);
    }
  }
  
  .icon-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin-right: 16px;
    background: rgba(251, 182, 4, 0.1);
    border: 2px solid #fbb604;
    border-radius: 50%;
    position: relative;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 2px 8px rgba(251, 182, 4, 0.2);
  }
  
      .icon {
    position: relative;
    width: 14px;
    height: 2px;
    background: #fbb604;
    transition: all 0.3s ease;
    border-radius: 2px;
    transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 14px;
      height: 2px;
      background: #fbb604;
      border-radius: 2px;
      transform: ${props => props.$isOpen ? 'rotate(90deg)' : 'rotate(90deg)'};
      transition: all 0.3s ease;
    }
  }
`;

const CustomTierContent = styled.div`
  max-height: ${props => props.$isOpen ? '2000px' : '0'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  padding: ${props => props.$isOpen ? '0 28px 28px' : '0 28px'};
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: ${props => props.$isOpen ? '0 20px 20px' : '0 20px'};
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 45px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
  position: relative;
  z-index: 1;
`;

const ResourceCard = styled.div`
  background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(25, 25, 30, 0.95));
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(251, 182, 4, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.03) 1.5px, transparent 1.5px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.03) 1.5px, transparent 1.5px);
    background-size: 15px 15px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 4px;
    height: 4px;
    background: rgba(251, 182, 4, 0.4);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    border-color: rgba(251, 182, 4, 0.4);
    
    &::before {
      opacity: 0.7;
    }
    
    &::after {
      background: rgba(251, 182, 4, 0.6);
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const ResourceTitle = styled.h3`
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 600;
  position: relative;
  padding-left: 12px;
  line-height: 1.4;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 14px;
    background: linear-gradient(135deg, #fbb604, #f99b04);
    border-radius: 1px;
    box-shadow: 0 2px 8px rgba(251, 182, 4, 0.3);
  }
`;

const ExperienceSelect = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 8px;
  margin-bottom: 12px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(251, 182, 4, 0.1);
`;

const ExperienceOption = styled.button`
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  border: none;
  background: ${props => props.selected ? "linear-gradient(135deg, rgba(251, 182, 4, 0.15), rgba(251, 182, 4, 0.08))" : "transparent"};
  color: ${props => props.selected ? "#fbb604" : "var(--text-secondary)"};
  font-weight: ${props => props.selected ? "600" : "400"};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  flex: 1;
  text-align: center;
  line-height: 1.2;
  border: 1px solid ${props => props.selected ? "rgba(251, 182, 4, 0.3)" : "transparent"};

  &:hover {
    background: ${props => props.selected ? "linear-gradient(135deg, rgba(251, 182, 4, 0.2), rgba(251, 182, 4, 0.1))" : "rgba(251, 182, 4, 0.05)"};
    color: ${props => props.selected ? "#ffffff" : "#fbb604"};
    border-color: rgba(251, 182, 4, 0.2);
  }
`;

const ResourceControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(251, 182, 4, 0.1);
`;

const ControlButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(251, 182, 4, 0.4);
  background: ${props => props.$add ? "linear-gradient(135deg, rgba(251, 182, 4, 0.15), rgba(251, 182, 4, 0.08))" : "linear-gradient(135deg, rgba(80, 80, 85, 0.9), rgba(60, 60, 65, 0.9))"};
  color: ${props => props.$add ? "#fbb604" : "#fff"};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  line-height: 1;
  user-select: none;

  &:hover {
    background: ${props => props.$add ? "linear-gradient(135deg, rgba(251, 182, 4, 0.25), rgba(251, 182, 4, 0.15))" : "linear-gradient(135deg, rgba(90, 90, 95, 1), rgba(70, 70, 75, 1))"};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    border-color: rgba(251, 182, 4, 0.7);
    color: ${props => props.$add ? "#ffffff" : "#fbb604"};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const ResourceCount = styled.span`
  font-size: 1.2rem;
  color: #fbb604;
  min-width: 32px;
  text-align: center;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(251, 182, 4, 0.3);
`;

const TotalContainer = styled.div`
  margin-top: 40px;
  padding: 32px 40px;
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(251, 182, 4, 0.2);
  max-width: 900px;
  margin: 40px auto 0;
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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 30px 30px, 30px 30px, 15px 15px, 25px 25px;
    opacity: 0.5;
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
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding: 24px 20px;
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
  background: linear-gradient(135deg, #fbb604, #f99b04, #d39404);
  color: #000;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  display: inline-block;
  text-decoration: none;
  margin-top: 30px;
  box-shadow: 0 8px 25px rgba(251, 182, 4, 0.3), 0 0 20px rgba(251, 182, 4, 0.1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(251, 182, 4, 0.4), 0 0 30px rgba(251, 182, 4, 0.2);
    filter: brightness(1.1);
    
    &:before {
      left: 100%;
    }
  }
`;

const InfoSection = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 62% 36%;
  gap: 2%;
  padding: 0 16px;
  align-items: stretch;
  animation: ${fadeIn} 0.8s ease 0.2s both;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 60px;
    margin-bottom: 60px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 24px;
  position: relative;
  display: inline-block;
  font-weight: 600;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60%;
    height: 2px;
    background: #fbb604;
    border-radius: 1px;
  }
`;

const InfoBlock = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 16px;
  padding: 28px 32px;
  border: 1px solid rgba(251, 182, 4, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
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
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }
  
  /* Circuit lines */
  &:before:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 10px;
    width: 2px;
    height: 30px;
    background: linear-gradient(to bottom, rgba(251, 182, 4, 0.2), transparent);
    transform: translateY(-50%);
  }
  
  @media (max-width: 768px) {
    padding: 20px 20px;
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
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 40px 32px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeIn} 0.8s ease;
  overflow: hidden;
  
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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.4;
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
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const CountdownHeader = styled.h3`
  color: #fbb604;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CountdownTimerDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 16px 0;
  position: relative;
  z-index: 2;
  
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
  background: linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.9));
  color: #fbb604;
  font-size: 2.2rem;
  font-weight: 700;
  border-radius: 12px;
  min-width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.4), 
    inset 0 1px 3px rgba(251, 182, 4, 0.1);
  position: relative;
  border: 1px solid rgba(251, 182, 4, 0.2);
  letter-spacing: 1px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  &:before {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;
    width: 4px;
    height: 4px;
    background: rgba(251, 182, 4, 0.3);
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    min-width: 70px;
    height: 70px;
  }
`;

const CountdownLabel = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  margin-top: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

const CountdownUrgency = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
  position: relative;
  z-index: 2;
  font-weight: 500;
  letter-spacing: 0.3px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-top: 16px;
  }
`;

const CountdownButton = styled(Link)`
  background: linear-gradient(135deg, #fbb604, #f99b04);
  color: #000;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  margin-top: 25px;
  box-shadow: 0 8px 20px rgba(251, 182, 4, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(251, 182, 4, 0.4);
    
    &::before {
      left: 100%;
    }
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
  margin-bottom: 48px;
  position: relative;
  gap: 0;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 50px;
  padding: 8px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(251, 182, 4, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.8s ease 0.1s both;
  z-index: 2;
`;

const BillingOption = styled.span`
  font-size: 1.1rem;
  color: ${props => props.$active ? '#000' : 'var(--text-secondary)'};
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 25px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #fbb604, #f99b04)' : 'transparent'};
  position: relative;
  z-index: 2;
  white-space: nowrap;
  box-shadow: ${props => props.$active ? '0 4px 15px rgba(251, 182, 4, 0.3)' : 'none'};
  
  &:hover {
    color: ${props => !props.$active ? '#fbb604' : '#000'};
    background: ${props => !props.$active ? 'rgba(251, 182, 4, 0.1)' : 'linear-gradient(135deg, #fbb604, #f99b04)'};
  }
`;

const ToggleSwitch = styled.div`
  display: none;
`;

const SaveBadge = styled.span`
  position: absolute;
  top: -22px;
  right: 50%;
  transform: translateX(50%);
  background: linear-gradient(135deg, #fbb604, #f99b04);
  color: #000;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(251, 182, 4, 0.4);
  animation: pulse 2s infinite;
  white-space: nowrap;
  border: 2px solid rgba(251, 182, 4, 0.3);
  
  @keyframes pulse {
    0% {
      transform: translateX(50%) scale(1);
    }
    50% {
      transform: translateX(50%) scale(1.05);
    }
    100% {
      transform: translateX(50%) scale(1);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #fbb604;
  }
`;

const ComparisonSection = styled.div`
  margin-top: 80px;
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
  animation: ${fadeIn} 0.8s ease 0.4s both;
  
  @media (max-width: 768px) {
    margin-top: 60px;
    margin-bottom: 40px;
  }
`;

const ComparisonTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 32px;
  color: #fbb604;
`;

const ComparisonTable = styled.div`
  background: rgba(25, 25, 30, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(251, 182, 4, 0.15);
  overflow: hidden;
  backdrop-filter: blur(10px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.01) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.01) 1px, transparent 1px),
      radial-gradient(circle at 50% 50%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 25px 25px, 25px 25px, 12.5px 12.5px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 6px;
    height: 6px;
    background: rgba(251, 182, 4, 0.4);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  padding: 20px;
  background: rgba(251, 182, 4, 0.08);
  border-bottom: 1px solid rgba(251, 182, 4, 0.15);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TableHeaderCell = styled.div`
  color: #fbb604;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  
  &:first-child {
    text-align: left;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px;
    text-align: center;
    
    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
  }
`;

const FeatureCell = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-weight: 600;
    color: #fbb604;
    margin-bottom: 10px;
  }
`;

const ValueCell = styled.div`
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  
  svg {
    color: ${props => props.included ? '#fbb604' : 'var(--text-secondary)'};
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 10px;
    
    &:before {
      content: attr(data-label);
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
      color: var(--text-secondary);
    }
  }
`;

const FAQSection = styled.div`
  margin-top: 80px;
  margin-bottom: 60px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
  animation: ${fadeIn} 0.8s ease 0.6s both;
  
  @media (max-width: 768px) {
    margin-top: 60px;
    margin-bottom: 40px;
  }
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 32px;
  color: #fbb604;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const FAQItem = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.15);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
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
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 15px 15px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 4px;
    height: 4px;
    background: rgba(251, 182, 4, 0.3);
    border-radius: 50%;
    animation: ${circuitPulse} 3s ease-in-out infinite;
  }
`;

const FAQQuestion = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(251, 182, 4, 0.05);
  }
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    padding-right: 16px;
  }
  
  svg {
    color: #fbb604;
    font-size: 1.1rem;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const FAQAnswer = styled.div`
  padding: ${props => props.$isOpen ? '8px 24px 24px' : '0 24px'};
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  overflow: hidden;
`;

const resources = [
  // Management Roles
  { id: 1, name: "Technical Project Manager", count: 0, experience: "intermediate", flatRate: 3 },
  { id: 2, name: "Technical Product Manager", count: 0, experience: "intermediate", flatRate: 3 },
  
  // Senior Technical Roles
  { id: 3, name: "AI Engineer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 5, veteran: 10 } },
  { id: 4, name: "Blockchain/Web3 Developer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 5, veteran: 10 } },
  { id: 5, name: "DevOps Engineer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 4.5, veteran: 9 } },
  { id: 6, name: "Cyber Security Engineer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 4.5, veteran: 9 } },
  
  // Core Development
  { id: 7, name: "Full-Stack Web Developer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 4.5, veteran: 9 } },
  { id: 8, name: "Back-End Web Developer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 4, veteran: 8 } },
  { id: 9, name: "Front-End Web Developer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 3.5, veteran: 7 } },
  { id: 10, name: "Mobile App Developer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 4, veteran: 8 } },
  { id: 11, name: "Game Developer", count: 0, experience: "intermediate", rates: { intermediate: 3, veteran: 6 } },
  { id: 12, name: "IoT Engineer", count: 0, experience: "intermediate", specialRates: true, rates: { intermediate: 4, veteran: 8 } },
  
  // Design & Creative
  { id: 13, name: "UI/UX Designer", count: 0, experience: "intermediate", rates: { intermediate: 3, veteran: 6 } },
  { id: 14, name: "3D Artist", count: 0, experience: "intermediate", rates: { intermediate: 3, veteran: 6 } },
  { id: 15, name: "3D Animator", count: 0, experience: "intermediate", rates: { intermediate: 3, veteran: 6 } },
  { id: 16, name: "2D Artist", count: 0, experience: "intermediate", rates: { intermediate: 2.5, veteran: 5 } },
  { id: 17, name: "2D Animator", count: 0, experience: "intermediate", rates: { intermediate: 2.5, veteran: 5 } },
  { id: 18, name: "Sound Engineer", count: 0, experience: "intermediate", rates: { intermediate: 2.5, veteran: 5 } },
  
  // Quality & Support
  { id: 19, name: "SQA Engineer", count: 0, experience: "intermediate", rates: { intermediate: 2.5, veteran: 5 } },
  { id: 20, name: "Technical Support Specialist", count: 0, experience: "intermediate", rates: { intermediate: 2, veteran: 4 } },
  
  // Content & Marketing
  { id: 21, name: "Technical Content Writer", count: 0, experience: "intermediate", rates: { intermediate: 2, veteran: 4 } },
  { id: 22, name: "SEO Writer", count: 0, experience: "intermediate", rates: { intermediate: 2, veteran: 4 } },
  { id: 23, name: "ASO Writer", count: 0, experience: "intermediate", rates: { intermediate: 2, veteran: 4 } },
  { id: 24, name: "Social Media Marketer", count: 0, experience: "intermediate", rates: { intermediate: 2, veteran: 4 } },
  
  // Administrative
  { id: 25, name: "Virtual Assistant", count: 0, experience: "intermediate", rates: { intermediate: 1.5, veteran: 3 } }
];

const ResourceSummary = styled.div`
  margin: 30px 0;
  background: linear-gradient(145deg, rgba(20, 20, 25, 0.95), rgba(30, 30, 35, 0.95));
  border-radius: 16px;
  border: 1px solid rgba(251, 182, 4, 0.2);
  overflow: hidden;
  
  &:empty {
    display: none;
  }
`;

const SummaryHeader = styled.div`
  padding: 16px 24px;
  background: rgba(251, 182, 4, 0.08);
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  font-weight: 600;
  color: #fbb604;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SummaryRow = styled.div`
  padding: 12px 24px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(251, 182, 4, 0.05);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
    text-align: center;
    
    > *:not(:first-child) {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
  }
`;

const SummaryLabel = styled.div`
  color: var(--text-primary);
  font-weight: ${props => props.$isTotal ? '600' : 'normal'};
  font-size: ${props => props.$isTotal ? '1.1rem' : '1rem'};
`;

const SummaryValue = styled.div`
  color: ${props => props.$highlight ? '#fbb604' : 'var(--text-secondary)'};
  font-weight: ${props => props.$highlight ? '600' : 'normal'};
  text-align: ${props => props.$align || 'left'};
`;

const Pricing = () => {
  const [customResources, setCustomResources] = useState(resources);
  const [isAnnual, setIsAnnual] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCustomTeamOpen, setIsCustomTeamOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
      
      const rate = resource.rates ? 
        (resource.experience === "intermediate" ? resource.rates.intermediate : resource.rates.veteran) : 
        (resource.experience === "intermediate" ? 3 : 6);
        
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

  const getMonthlyPriceWithTax = (price) => {
    const priceWithTax = price * 1.16; // Adding 16% sales tax
    return Math.round(priceWithTax).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Removed problematic keyframes insertion

  const faqs = [
    {
      question: "What if my budget is lower than the listed prices?",
      answer: "Please contact us regardless of your budget! We understand that every business has different financial capabilities, and we're committed to finding solutions that work for you. We can work together to create a custom plan that fits your budget while still delivering value to your project."
    },
    {
      question: "What's included in the working hours?",
      answer: "Our standard working hours are 176 hours per month, based on 8 hours per day, 22 days per month. This includes development, meetings, planning, and any project-related activities."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. We'll prorate the charges and adjust your billing accordingly. Please note that downgrading might require adjusting the team composition."
    },
    {
      question: "Do you offer custom team compositions?",
      answer: "Absolutely! Our Blitz plan allows you to build a custom team that perfectly matches your project needs. Contact us to discuss your specific requirements."
    },
    {
      question: "What's your payment structure?",
      answer: "We require a downpayment (25-30% depending on the plan) followed by monthly payments. All prices include 16% sales tax. Annual plans receive a 12% discount."
    },
    {
      question: "How do project iterations work?",
      answer: "Iterations vary by plan. Spark has limited iterations, Charge includes up to 2 iterations per week, and Blitz plans offer flexible iteration cycles based on your needs."
    },
    {
      question: "What happens if I need more resources?",
      answer: "You can easily scale your team up or down based on project demands. Contact your project manager to discuss resource adjustments, and we'll accommodate your needs quickly."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <PricingWrapper>
      <HeroSection>
        <Title>Pay 25-30% Upfront, Rest After Completion</Title>
        <Subtitle>
          <strong>Stop wasting months</strong> on developers who don't deliver. 
          Our dedicated teams focus on building products that work, scale, and get results faster than typical agencies.
          <br/><br/>
          🛡️ <strong>100% Risk-Free:</strong> Full IP ownership from day 1 + 30-day satisfaction guarantee. 
          If you're not satisfied with our code quality and communication within 30 days, get a full refund.
        </Subtitle>
        
        <CountdownContainer>
          <CountdownHeader>
            ⚡ Special Pricing - Limited Time Offer
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
            🔥 Prices increase January 1st, 2026. Lock in current rates now. 
            Exclusive partnerships for select clients only.
          </CountdownUrgency>
          <CountdownButton to="/contact-us">
            Secure Your Pricing
          </CountdownButton>
        </CountdownContainer>
        
        <BillingToggleContainer>
          <BillingOption $active={!isAnnual} onClick={() => setIsAnnual(false)}>Monthly</BillingOption>
          <BillingOption $active={isAnnual} onClick={() => setIsAnnual(true)}>Annually</BillingOption>
          {isAnnual && <SaveBadge>Save 12%</SaveBadge>}
        </BillingToggleContainer>
      </HeroSection>
      
      <div style={{ animation: 'fadeIn 0.8s ease' }}>
      <PricingGrid>
        <PricingCard>
          <div className="effects-container">
            <div className="spark spark-1"></div>
            <div className="spark spark-2"></div>
            <div className="spark spark-3"></div>
            <div className="spark spark-4"></div>
            <div className="spark-trail spark-trail-1"></div>
            <div className="spark-trail spark-trail-2"></div>
            <div className="floating-particle floating-particle-1"></div>
            <div className="floating-particle floating-particle-2"></div>
            <div className="floating-particle floating-particle-3"></div>
            <div className="floating-particle floating-particle-4"></div>
            <div className="twinkle twinkle-1"></div>
            <div className="twinkle twinkle-2"></div>
            <div className="twinkle twinkle-3"></div>
            <div className="twinkle twinkle-4"></div>
          </div>
          <PlanName>Spark</PlanName>
          <PlanDescription>
            Perfect for startups who need a solid MVP to validate their idea and attract investors. 
            <strong> Built for speed and investor presentations.</strong>
          </PlanDescription>
          
          <PriceContainer>
            {isAnnual && <StrikethroughPrice>${getMonthlyPriceWithTax(1584)}</StrikethroughPrice>}
            <Price>${getMonthlyPrice(1584)}<sup>*</sup></Price>
            <PriceDescription>
              per month {isAnnual && `billed annually ($${getAnnualTotal(1584)})`}
            </PriceDescription>
            {isAnnual && <PriceDescription>You save ${getSavingsAmount(1584)}</PriceDescription>}
            <PriceDescription style={{ fontSize: '0.8rem', opacity: '0.8' }}>* Inclusive of sales tax</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem><FaCheck />Low-No Code Developer with 2-3 years experience</FeatureItem>
            <FeatureItem><FaCheck />UI/UX Designer with 2-3 years experience</FeatureItem>
            <FeatureItem><FaCheck />Technical Project Manager (part-time)</FeatureItem>
            <FeatureItem><FaCheck />Basic requirements gathering & planning</FeatureItem>
            <FeatureItem><FaCheck />Bi-weekly progress meetings</FeatureItem>
            <FeatureItem><FaCheck />Basic Q/A testing & bug fixes</FeatureItem>
            <FeatureItem><FaCheck />Access to company Slack channel</FeatureItem>
            <FeatureItem><FaCheck />176 working hours per month*</FeatureItem>
            <FeatureItem><FaCheck />Payment: 30% upfront, 70% after completion</FeatureItem>
            <FeatureItem><FaCheck />All prices include 16% Sales Tax</FeatureItem>
            <FeatureItem><FaCheck />24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton to="/contact-us">Get Started</SelectButton>
        </PricingCard>
        
        <PricingCard $featured>
          <div className="effects-container">
            <div className="electric-sparkle electric-sparkle-1"></div>
            <div className="electric-sparkle electric-sparkle-2"></div>
            <div className="electric-sparkle electric-sparkle-3"></div>
            <div className="electric-sparkle electric-sparkle-4"></div>
            <div className="electric-sparkle electric-sparkle-5"></div>
            <div className="electric-sparkle electric-sparkle-6"></div>
            <div className="electric-sparkle electric-sparkle-7"></div>
            <div className="electric-sparkle electric-sparkle-8"></div>
            <div className="electric-particle electric-particle-1"></div>
            <div className="electric-particle electric-particle-2"></div>
            <div className="electric-particle electric-particle-3"></div>
            <div className="electric-particle electric-particle-4"></div>
            <div className="electric-particle electric-particle-5"></div>
            <div className="electric-twinkle electric-twinkle-1"></div>
            <div className="electric-twinkle electric-twinkle-2"></div>
            <div className="electric-twinkle electric-twinkle-3"></div>
            <div className="electric-twinkle electric-twinkle-4"></div>
            <div className="electric-twinkle electric-twinkle-5"></div>
            <div className="electric-twinkle electric-twinkle-6"></div>
            <div className="lightning-streak lightning-streak-1"></div>
            <div className="lightning-streak lightning-streak-2"></div>
            <div className="lightning-streak lightning-streak-3"></div>
            <div className="lightning-bolt lightning-bolt-1"></div>
            <div className="lightning-bolt lightning-bolt-2"></div>
            <div className="lightning-bolt lightning-bolt-3"></div>
            <div className="lightning-bolt lightning-bolt-4"></div>
          </div>
          <PlanName>
            Charge
            <FeatureBadge>Recommended</FeatureBadge>
          </PlanName>
          <PlanDescription>
            For growing companies ready to build market-ready products that scale. 
            <strong> Premium development with senior expertise and rapid iteration.</strong>
          </PlanDescription>
          
          <PriceContainer>
            {isAnnual && <StrikethroughPrice>${getMonthlyPriceWithTax(3168)}</StrikethroughPrice>}
            <Price>${getMonthlyPrice(3168)}<sup>*</sup></Price>
            <PriceDescription>
              per month {isAnnual && `billed annually ($${getAnnualTotal(3168)})`}
            </PriceDescription>
            {isAnnual && <PriceDescription>You save ${getSavingsAmount(3168)}</PriceDescription>}
            <PriceDescription style={{ fontSize: '0.8rem', opacity: '0.8' }}>* Inclusive of sales tax</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem><FaCheck />Senior Engineer with 5-7+ years experience</FeatureItem>
            <FeatureItem><FaCheck />Senior UI/UX Engineer with 5-7+ years experience</FeatureItem>
            <FeatureItem><FaCheck />Technical Project Manager (full-time)</FeatureItem>
            <FeatureItem><FaCheck />Weekly sprints with iterative builds</FeatureItem>
            <FeatureItem><FaCheck />Up to 3 iterations per sprint</FeatureItem>
            <FeatureItem><FaCheck />Comprehensive Q/A Testing & CI/CD</FeatureItem>
            <FeatureItem><FaCheck />Priority Slack channel & support</FeatureItem>
            <FeatureItem><FaCheck />Technical Product Manager with business insights</FeatureItem>
            <FeatureItem><FaCheck />176 working hours per month*</FeatureItem>
            <FeatureItem><FaCheck />Payment: 25% upfront, 75% after completion</FeatureItem>
            <FeatureItem><FaCheck />All prices include 16% Sales Tax</FeatureItem>
            <FeatureItem><FaCheck />24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton to="/contact-us">
            Get Started
          </SelectButton>
        </PricingCard>
        
        <PricingCard>
          <PlanName>Blitz</PlanName>
          <PlanDescription>
            Enterprise-grade development for complex projects with custom requirements. 
            <strong> Fully customizable team and unlimited technical expertise.</strong>
          </PlanDescription>
          
          <PriceContainer>
            <CustomPrice>Custom<sup>*</sup></CustomPrice>
            <PriceDescription>tailored to your specific needs</PriceDescription>
            <PriceDescription style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '5px' }}>* Inclusive of sales tax</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem><FaCheck />Custom team composition & size</FeatureItem>
            <FeatureItem><FaCheck />Mix of Senior and Lead Engineers</FeatureItem>
            <FeatureItem><FaCheck />Dedicated Technical Project Manager</FeatureItem>
            <FeatureItem><FaCheck />Dedicated Technical Product Manager</FeatureItem>
            <FeatureItem><FaCheck />Flexible sprint cycles & iterations</FeatureItem>
            <FeatureItem><FaCheck />Enterprise-grade QA & security testing</FeatureItem>
            <FeatureItem><FaCheck />Dedicated Slack workspace</FeatureItem>
            <FeatureItem><FaCheck />176 working hours per month*</FeatureItem>
            <FeatureItem><FaCheck />Priority support & strategic consulting</FeatureItem>
            <FeatureItem><FaCheck />Payment: 25% upfront, 75% after completion</FeatureItem>
            <FeatureItem><FaCheck />All prices include 16% Sales Tax</FeatureItem>
            <FeatureItem><FaCheck />24/7 online availability in your time zone</FeatureItem>
          </FeatureList>
          
          <SelectButton to="/contact-us">Contact Us</SelectButton>
        </PricingCard>
      </PricingGrid>
      
      <CustomTierWrapper>
        <CustomTierTitle $isOpen={isCustomTeamOpen} onClick={() => setIsCustomTeamOpen(!isCustomTeamOpen)}>
          <div className="icon-container">
            <div className="icon"></div>
          </div>
          Build Your Custom Team
        </CustomTierTitle>
        
        <CustomTierContent $isOpen={isCustomTeamOpen}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            marginBottom: '35px', 
            fontSize: '1.1rem', 
            maxWidth: '700px', 
            lineHeight: '1.6',
            textAlign: 'center',
            margin: '0 auto 35px auto',
            fontWeight: '400'
          }}>
            Craft your perfect development team by selecting the exact resources you need. 
            Mix and match different specialties and experience levels to create a tailored solution.
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
                        Standard<br/>(${resource.rates ? resource.rates.intermediate : "3"}/h)
                      </ExperienceOption>
                      <ExperienceOption 
                        selected={resource.experience === "veteran"}
                        onClick={() => resource.experience !== "veteran" && toggleExperience(resource.id)}
                      >
                        Expert<br/>(${resource.rates ? resource.rates.veteran : "6"}/h)
                      </ExperienceOption>
                    </>
                  )}
                </ExperienceSelect>
                <ResourceControls>
                  <ControlButton onClick={() => updateResourceCount(resource.id, -1)}>−</ControlButton>
                  <ResourceCount>{resource.count}</ResourceCount>
                  <ControlButton $add onClick={() => updateResourceCount(resource.id, 1)}>+</ControlButton>
                </ResourceControls>
              </ResourceCard>
            ))}
          </ResourceGrid>
          
          <div style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)', 
            padding: '16px 20px', 
            background: 'linear-gradient(135deg, rgba(251, 182, 4, 0.08), rgba(251, 182, 4, 0.04))', 
            borderRadius: '12px',
            marginBottom: '35px',
            border: '1px solid rgba(251, 182, 4, 0.15)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 35px auto'
          }}>
            <p style={{ margin: 0, lineHeight: '1.5' }}>
              <strong style={{ color: '#fbb604' }}>Note:</strong> Pricing based on 176 working hours per month. 
              Monthly cost varies with actual working days.
            </p>
          </div>
          
          {customResources.some(r => r.count > 0) && (
            <ResourceSummary>
              <SummaryHeader>
                <div>Resource</div>
                <div>Experience</div>
                <div>Rate/Hour</div>
                <div>Monthly Hours</div>
              </SummaryHeader>
              {customResources.map(resource => {
                if (resource.count > 0) {
                  const rate = resource.flatRate ? 
                    resource.flatRate : 
                    (resource.rates ? 
                      (resource.experience === "intermediate" ? resource.rates.intermediate : resource.rates.veteran) : 
                      (resource.experience === "intermediate" ? 3 : 6));
                      
                  return (
                    <SummaryRow key={resource.id}>
                      <SummaryLabel>{resource.name} × {resource.count}</SummaryLabel>
                      <SummaryValue>
                        {resource.flatRate ? "Fixed Rate" : (resource.experience === "intermediate" ? "Standard" : "Expert")}
                      </SummaryValue>
                      <SummaryValue>${rate}/h</SummaryValue>
                      <SummaryValue>{176 * resource.count}</SummaryValue>
                    </SummaryRow>
                  );
                }
                return null;
              })}
              <SummaryRow style={{ background: 'rgba(251, 182, 4, 0.08)' }}>
                <SummaryLabel $isTotal>Total Resources</SummaryLabel>
                <SummaryValue>
                  {customResources.reduce((sum, r) => sum + r.count, 0)} team members
                </SummaryValue>
                <SummaryValue>
                  Avg: ${(calculateTotal() / (176 * customResources.reduce((sum, r) => sum + r.count, 0) || 1)).toFixed(2)}/h
                </SummaryValue>
                <SummaryValue $highlight $align="left">
                  {176 * customResources.reduce((sum, r) => sum + r.count, 0)} hours
                </SummaryValue>
              </SummaryRow>
            </ResourceSummary>
          )}
          
          <TotalContainer>
            <TotalText>Estimated Monthly Total</TotalText>
            <TotalPrice>${calculateTotal().toLocaleString()}</TotalPrice>
          </TotalContainer>
          
          <div style={{ textAlign: 'center' }}>
            <ContactButton to="/contact-us">Contact Us for Details</ContactButton>
          </div>
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
            <FeatureItem>A 25-30% downpayment is required before project initiation</FeatureItem>
            <FeatureItem>All prices are subject to 16% Sales Tax</FeatureItem>
            <FeatureItem>Additional hours beyond 176/month are billed at 2× the standard rate</FeatureItem>
            <FeatureItem>10-15% rate increase effective January 1, 2026</FeatureItem>
            <FeatureItem>Annual plans purchased before Jan 1, 2026 are price-locked for 12 months</FeatureItem>
            <FeatureItem>We leverage existing assets to optimize costs where appropriate</FeatureItem>
            <FeatureItem>Custom quotes available for specialized tech stacks</FeatureItem>
            <FeatureItem>Prices in USD, excluding third-party service costs</FeatureItem>
            <FeatureItem>All packages include 24/7 availability in your timezone</FeatureItem>
            <FeatureItem>Flexible payment terms available for long-term contracts</FeatureItem>
          </FeatureList>
        </InfoBlock>
      </InfoSection>

      <ComparisonSection>
        <ComparisonTitle>Plan Comparison</ComparisonTitle>
        <ComparisonTable>
          <TableHeader>
            <TableHeaderCell>Feature</TableHeaderCell>
            <TableHeaderCell>Spark</TableHeaderCell>
            <TableHeaderCell>Charge</TableHeaderCell>
            <TableHeaderCell>Blitz</TableHeaderCell>
          </TableHeader>
          
          <TableRow>
            <FeatureCell>Team Experience Level</FeatureCell>
            <ValueCell data-label="Spark">2-3 years</ValueCell>
            <ValueCell data-label="Charge">5-7+ years</ValueCell>
            <ValueCell data-label="Blitz">Custom Mix</ValueCell>
          </TableRow>
          
          <TableRow>
            <FeatureCell>Project Management</FeatureCell>
            <ValueCell data-label="Spark">Part-time</ValueCell>
            <ValueCell data-label="Charge">Full-time</ValueCell>
            <ValueCell data-label="Blitz">Dedicated</ValueCell>
          </TableRow>
          
          <TableRow>
            <FeatureCell>Meeting Frequency</FeatureCell>
            <ValueCell data-label="Spark">Bi-weekly</ValueCell>
            <ValueCell data-label="Charge">Weekly</ValueCell>
            <ValueCell data-label="Blitz">Custom</ValueCell>
          </TableRow>
          
          <TableRow>
            <FeatureCell>Iterations</FeatureCell>
            <ValueCell data-label="Spark">Limited</ValueCell>
            <ValueCell data-label="Charge">2 per week</ValueCell>
            <ValueCell data-label="Blitz">Flexible</ValueCell>
          </TableRow>
          
          <TableRow>
            <FeatureCell>QA Testing</FeatureCell>
            <ValueCell data-label="Spark">Basic</ValueCell>
            <ValueCell data-label="Charge">Thorough</ValueCell>
            <ValueCell data-label="Blitz">Comprehensive</ValueCell>
          </TableRow>
          
          <TableRow>
            <FeatureCell>Support Level</FeatureCell>
            <ValueCell data-label="Spark">Standard</ValueCell>
            <ValueCell data-label="Charge">Priority</ValueCell>
            <ValueCell data-label="Blitz">Dedicated</ValueCell>
          </TableRow>
          
          <TableRow>
            <FeatureCell>Downpayment</FeatureCell>
            <ValueCell data-label="Spark">30%</ValueCell>
            <ValueCell data-label="Charge">25%</ValueCell>
            <ValueCell data-label="Blitz">25%</ValueCell>
          </TableRow>
        </ComparisonTable>
      </ComparisonSection>

      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQGrid>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion $isOpen={openFAQ === index} onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
              </FAQQuestion>
              <FAQAnswer $isOpen={openFAQ === index}>
                {faq.answer}
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQGrid>
      </FAQSection>
      </div>
    </PricingWrapper>
  );
};

export default Pricing;
