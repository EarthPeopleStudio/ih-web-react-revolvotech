import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
  FaUsers,
  FaHeart,
  FaTrophy,
} from "react-icons/fa";
import jhonattanImage from "../assets/testimonials/jhonattan-testimonial.jpg";
import danielaImage from "../assets/testimonials/daniela-testimonial.jpg";
import SubtleBackground from "./SubtleBackground";

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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(-60px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideRight = keyframes`
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const TestimonialsContainer = styled.div`
  background: transparent;
  position: relative;
  min-height: 100vh;
  padding: 120px 8% 80px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }

  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
`;

const SectionTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ffeb3b 0%, #ffd700 50%, #ffeb3b 100%);
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

const SectionSubtitle = styled.p`
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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const StatCard = styled.div`
  background: linear-gradient(
    145deg,
    rgba(25, 25, 30, 0.95),
    rgba(35, 35, 40, 0.95)
  );
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(251, 182, 4, 0.02) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(
        circle at 25% 25%,
        rgba(251, 182, 4, 0.025) 1px,
        transparent 1px
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(251, 182, 4, 0.015) 1px,
        transparent 1px
      );
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-15px);
    border-color: rgba(251, 182, 4, 0.5);
    box-shadow: 0 20px 40px rgba(251, 182, 4, 0.15);

    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #fbb604;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 10px rgba(251, 182, 4, 0.3));
  position: relative;
  z-index: 1;
`;

const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fbb604, #f99b04);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
`;

// Enhanced Featured Carousel Section
const FeaturedSection = styled.div`
  margin-bottom: 80px;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(
    145deg,
    rgba(25, 25, 30, 0.95),
    rgba(35, 35, 40, 0.95)
  );
  border: 1px solid rgba(251, 182, 4, 0.2);
  backdrop-filter: blur(15px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(251, 182, 4, 0.015) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      radial-gradient(
        circle at 25% 25%,
        rgba(251, 182, 4, 0.02) 1px,
        transparent 1px
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(251, 182, 4, 0.015) 1px,
        transparent 1px
      );
    background-size: 50px 50px, 50px 50px, 25px 25px, 35px 35px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    right: 15px;
    width: 10px;
    height: 10px;
    background: rgba(251, 182, 4, 0.6);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`;

const FeaturedCard = styled.div`
  min-width: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  min-height: 380px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 30px 25px;
    min-height: 350px;
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
    min-height: 320px;
  }
`;

const FeaturedContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
`;

const QuoteIconLarge = styled(FaQuoteLeft)`
  font-size: 2.2rem;
  color: rgba(251, 182, 4, 0.2);
  margin-bottom: 25px;
  filter: drop-shadow(0 0 20px rgba(251, 182, 4, 0.1));
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 25px;
`;

const Star = styled(FaStar)`
  color: #fbb604;
  font-size: 1.2rem;
  filter: drop-shadow(0 0 8px rgba(251, 182, 4, 0.4));
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const FeaturedQuote = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-style: italic;
  max-width: 800px;
  width: 100%;
  text-align: center;
  position: relative;

  &::before,
  &::after {
    content: '"';
    font-size: 1.8rem;
    color: #fbb604;
    font-weight: bold;
    position: absolute;
  }

  &::before {
    top: -8px;
    left: -16px;
  }

  &::after {
    bottom: -16px;
    right: -16px;
  }
`;

const FeaturedAuthorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  margin-top: auto;
  position: relative;
  z-index: 1;
`;

const FeaturedAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: linear-gradient(
    145deg,
    rgba(25, 25, 30, 0.95),
    rgba(35, 35, 40, 0.95)
  );
  padding: 20px 30px;
  border-radius: 16px;
  border: 1px solid rgba(251, 182, 4, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(251, 182, 4, 0.02) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 8px;
    right: 8px;
    width: 6px;
    height: 6px;
    background: rgba(251, 182, 4, 0.4);
    border-radius: 50%;
    animation: ${circuitPulse} 3s ease-in-out infinite;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
    padding: 20px;
  }
`;

const FeaturedImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(251, 182, 4, 0.3);
  flex-shrink: 0;
  filter: drop-shadow(0 0 15px rgba(251, 182, 4, 0.2));
  position: relative;
  z-index: 1;
`;

const FeaturedAuthorInfo = styled.div`
  text-align: left;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const FeaturedName = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fbb604, #f99b04);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 5px 0;
  line-height: 1.2;
`;

const FeaturedCompany = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.2;
`;

// Enhanced Navigation
const CarouselNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
`;

const NavButton = styled.button`
  background: linear-gradient(
    135deg,
    rgba(251, 182, 4, 0.1),
    rgba(251, 182, 4, 0.08)
  );
  border: 1px solid rgba(251, 182, 4, 0.3);
  color: #fbb604;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
      circle at 30% 40%,
      rgba(251, 182, 4, 0.02) 1px,
      transparent 1px
    );
    background-size: 10px 10px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 8px;
    right: 8px;
    width: 4px;
    height: 4px;
    background: rgba(251, 182, 4, 0.3);
    border-radius: 50%;
    animation: ${circuitPulse} 3s ease-in-out infinite;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(251, 182, 4, 0.2),
      rgba(251, 182, 4, 0.15)
    );
    border-color: rgba(251, 182, 4, 0.6);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 25px rgba(251, 182, 4, 0.2);

    &::after {
      animation: ${circuitPulse} 1.5s ease-in-out infinite;
    }
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #fbb604, #f99b04)"
      : "rgba(255, 255, 255, 0.2)"};
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: ${(props) =>
    props.active ? "0 0 15px rgba(251, 182, 4, 0.4)" : "none"};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: ${(props) =>
      props.$active ? "rgba(251, 182, 4, 0.8)" : "transparent"};
    border-radius: 50%;
    animation: ${(props) =>
      props.$active
        ? css`
            ${circuitPulse} 2s ease-in-out infinite
          `
        : "none"};
  }

  &:hover {
    background: linear-gradient(135deg, #fbb604, #f99b04);
    transform: scale(1.3);
    box-shadow: 0 0 15px rgba(251, 182, 4, 0.4);
  }
`;

// Enhanced Grid Section
const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const TestimonialCard = styled.div`
  background: linear-gradient(
    145deg,
    rgba(25, 25, 30, 0.95),
    rgba(35, 35, 40, 0.95)
  );
  border-radius: 20px;
  padding: 35px;
  border: 1px solid rgba(251, 182, 4, 0.2);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  animation: ${fadeIn} 0.8s ease;
  animation-delay: ${(props) => props.delay || "0s"};
  animation-fill-mode: both;
  display: flex;
  flex-direction: column;
  height: 320px;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(251, 182, 4, 0.02) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(
        circle at 25% 25%,
        rgba(251, 182, 4, 0.025) 1px,
        transparent 1px
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(251, 182, 4, 0.015) 1px,
        transparent 1px
      );
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(251, 182, 4, 0.5);
    box-shadow: 0 20px 40px rgba(251, 182, 4, 0.1);

    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }

  &:nth-child(even) {
    animation: ${slideRight} 0.8s ease-out;
    animation-delay: ${(props) => props.delay || "0s"};
    animation-fill-mode: both;
  }

  &:nth-child(odd) {
    animation: ${slideLeft} 0.8s ease-out;
    animation-delay: ${(props) => props.delay || "0s"};
    animation-fill-mode: both;
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  font-size: 1.4rem;
  color: rgba(251, 182, 4, 0.3);
  margin-bottom: 20px;
  filter: drop-shadow(0 0 10px rgba(251, 182, 4, 0.2));
  position: relative;
  z-index: 1;
`;

const TestimonialTextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
`;

const TestimonialText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
  flex: 1;
  overflow-y: auto;
  max-height: 160px;

  /* Enhanced scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #fbb604, #f99b04);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #f99b04, #fbb604);
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 60px;
  margin-top: auto;
  background: linear-gradient(
    145deg,
    rgba(25, 25, 30, 0.9),
    rgba(35, 35, 40, 0.9)
  );
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(251, 182, 4, 0.1);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(251, 182, 4, 0.015) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 15px 15px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 6px;
    right: 6px;
    width: 4px;
    height: 4px;
    background: rgba(251, 182, 4, 0.3);
    border-radius: 50%;
    animation: ${circuitPulse} 3s ease-in-out infinite;
  }
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(251, 182, 4, 0.3);
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px rgba(251, 182, 4, 0.2));
  position: relative;
  z-index: 1;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  position: relative;
  z-index: 1;
`;

const AuthorName = styled.p`
  font-size: 1.05rem;
  font-weight: 600;
  background: linear-gradient(135deg, #fbb604, #f99b04);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 3px 0;
  line-height: 1.2;
`;

const AuthorCompany = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.2;
`;

const testimonialsData = [
  {
    name: "Jhonattan Villalobos Escorza",
    company: "Zenith Homes, Utah, USA",
    quote:
      "I stopped working with or looking for any other developer after Revolvo Tech brought all my ideas to life. They worked quickly and efficiently while maintaining professionalism and delivering a great-looking result. Bring these guys to America! Even Mexico claims them.",
    image: jhonattanImage,
    rating: 5,
    featured: true,
  },
  {
    name: "Daniela Caraballo",
    company: "Fresh Cleaning Luxe, LLC, Utah, USA",
    quote:
      "I am thrilled with the website Revolvo Tech created for Fresh Cleaning Luxe LLC. It's beautifully designed, user-friendly, and perfectly captures my brand. Thank you, Revolvo Tech, for your exceptional work!",
    image: danielaImage,
    rating: 5,
    featured: true,
  },
  {
    name: "Michael Thompson",
    company: "TechStart Solutions, California, USA",
    quote:
      "Honestly, I was skeptical at first working with a remote team, but these guys proved me wrong. They actually listened to what I wanted and didn't try to oversell me on features I didn't need. The website looks clean and works perfectly.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "Sarah Johnson",
    company: "Green Valley Marketing, Texas, USA",
    quote:
      "My old website was such a mess - I was embarrassed to send clients there. Revolvo Tech fixed everything and made it look so professional. I've gotten way more inquiries since the redesign. Worth every penny!",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "David Rodriguez",
    company: "Rodriguez Construction, Florida, USA",
    quote:
      "I'm not tech-savvy at all, but these guys made the whole process super easy. They explained everything in simple terms and the final result exceeded my expectations. My customers love browsing our project gallery now.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "Jennifer Martinez",
    company: "Bright Future Consulting, New York, USA",
    quote:
      "What impressed me most was how they took the time to understand my business. They didn't just build a website - they created a tool that actually helps me serve my clients better. The booking system they added is a game changer.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "James Wilson",
    company: "Aussie Digital Solutions, Sydney, Australia",
    quote:
      "Working across time zones can be tricky, but these legends made it work seamlessly. They were always available when needed and delivered exactly what they promised. Couldn't be happier with the result, mate!",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "Emma Brown",
    company: "Melbourne Creative Studio, Melbourne, Australia",
    quote:
      "As a creative myself, I'm pretty picky about design. Revolvo Tech nailed it though - they captured my vision perfectly and even suggested improvements I hadn't thought of. The site is both beautiful and functional.",
    image:
      "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "Ryan Clark",
    company: "Brisbane Tech Hub, Brisbane, Australia",
    quote:
      "We needed something robust that could handle our growing community. The platform they built scales beautifully and the admin panel makes managing everything a breeze. Solid work from a solid team.",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "Aino Virtanen",
    company: "Nordic Innovations, Helsinki, Finland",
    quote:
      "Simple, clean, efficient - exactly what we Finns appreciate. Revolvo Tech understood our minimalist approach and delivered a website that reflects our values. The user experience is incredibly smooth.",
    image:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "Oliver Smith",
    company: "Digital Innovations Ltd, London, UK",
    quote:
      "Proper brilliant work from Revolvo Tech! They understood our British market needs and delivered something that feels both professional and approachable. The site's performance is spot on and our clients are chuffed with it.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
  {
    name: "Sophia Mueller",
    company: "Precision Engineering GmbH, Berlin, Germany",
    quote:
      "The precision and attention to detail Revolvo Tech showed matched our German engineering standards perfectly. They delivered exactly what was promised, on time and within budget. Very professional team.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    featured: true,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const featuredTestimonials = testimonialsData.filter((t) => t.featured);
  const numTestimonials = featuredTestimonials.length;

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % numTestimonials);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + numTestimonials) % numTestimonials);
  };

  const goToTestimonial = (index) => {
    setCurrent(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || numTestimonials <= 1) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, numTestimonials]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!numTestimonials) {
    return (
      <TestimonialsContainer>
        <ContentWrapper>
          <div
            style={{ color: "white", textAlign: "center", padding: "100px" }}
          >
            No testimonials found
          </div>
        </ContentWrapper>
      </TestimonialsContainer>
    );
  }

  return (
    <TestimonialsContainer>
      <ContentWrapper>
        <HeroSection>
          <SectionTitle>What Our People Say</SectionTitle>
          <SectionSubtitle>
            From startup MVPs that secure funding to products that scale to
            millions of users—our clients don't just get websites, they get
            businesses. Here's what founders, CEOs, and product leaders say
            about working with us.
          </SectionSubtitle>
        </HeroSection>

        <FeaturedSection>
          <CarouselWrapper
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContainer
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {featuredTestimonials.map((testimonial, index) => (
                <FeaturedCard key={index}>
                  <FeaturedContent>
                    <QuoteIconLarge />
                    <StarsContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} delay={`${i * 0.1}s`} />
                      ))}
                    </StarsContainer>
                    <FeaturedQuote>{testimonial.quote}</FeaturedQuote>
                  </FeaturedContent>
                  <FeaturedAuthorSection>
                    <FeaturedAuthor>
                      <FeaturedImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <FeaturedAuthorInfo>
                        <FeaturedName>{testimonial.name}</FeaturedName>
                        <FeaturedCompany>{testimonial.company}</FeaturedCompany>
                      </FeaturedAuthorInfo>
                    </FeaturedAuthor>
                  </FeaturedAuthorSection>
                </FeaturedCard>
              ))}
            </CarouselContainer>
          </CarouselWrapper>

          <CarouselNavigation>
            <NavButton
              onClick={prevTestimonial}
              disabled={numTestimonials <= 1}
            >
              <FaChevronLeft />
            </NavButton>

            <IndicatorContainer>
              {featuredTestimonials.map((_, index) => (
                <Indicator
                  key={index}
                  $active={index === current}
                  onClick={() => goToTestimonial(index)}
                />
              ))}
            </IndicatorContainer>

            <NavButton
              onClick={nextTestimonial}
              disabled={numTestimonials <= 1}
            >
              <FaChevronRight />
            </NavButton>
          </CarouselNavigation>
        </FeaturedSection>

        <TestimonialGrid>
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} delay={`${index * 0.2}s`}>
              <QuoteIcon />
              <TestimonialTextContainer>
                <TestimonialText>"{testimonial.quote}"</TestimonialText>
              </TestimonialTextContainer>
              <AuthorInfo>
                <AuthorImage src={testimonial.image} alt={testimonial.name} />
                <AuthorDetails>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorCompany>{testimonial.company}</AuthorCompany>
                </AuthorDetails>
              </AuthorInfo>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </ContentWrapper>
    </TestimonialsContainer>
  );
};

export default Testimonials;
