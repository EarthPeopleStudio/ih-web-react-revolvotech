import { useState, useEffect, useRef } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaCheck, FaArrowRight, FaStar, FaShieldAlt, FaBolt, FaUsers, FaRocket, FaChartLine, FaHandshake, FaGlobe } from "react-icons/fa";
import { BsCurrencyDollar, BsLightningChargeFill, BsStars } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import logoSvg from "../assets/logo.svg";
import { Helmet } from "react-helmet-async";

const GlobalStyle = createGlobalStyle`
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 107, 53, 0.3) transparent;
  }
  
  *::-webkit-scrollbar {
    width: 8px;
  }
  
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  
  *::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(142, 36, 170, 0.3));
    border-radius: 4px;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-20px) rotate(90deg) scale(1.05); }
  50% { transform: translateY(-30px) rotate(180deg) scale(1); }
  75% { transform: translateY(-10px) rotate(270deg) scale(0.95); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 110vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #ff6b35 100%);
  background-size: 400% 400%;
  animation: ${gradientMove} 20s ease infinite;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 107, 53, 0.2) 0%, transparent 50%);
    z-index: 1;
  }
`;

const BackgroundOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: ${float} 20s ease-in-out infinite;
  background: radial-gradient(circle, ${props => props.color} 0%, transparent 70%);
  z-index: 0;

  &.primary {
    width: 600px;
    height: 600px;
    top: -200px;
    right: -100px;
    animation-delay: 0s;
  }

  &.secondary {
    width: 500px;
    height: 500px;
    bottom: -150px;
    left: -100px;
    animation-delay: 7s;
  }

  &.tertiary {
    width: 400px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 14s;
  }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.gradient};
  border-radius: ${props => props.shape === 'circle' ? '50%' : props.shape === 'square' ? '20px' : '50% 0'};
  opacity: 0.1;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 0;
`;

const ContentContainer = styled(motion.div)`
  text-align: center;
  z-index: 10;
  position: relative;
  max-width: 1200px;
  width: 100%;
  padding: 4rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.2),
              inset 0 0 40px rgba(255, 255, 255, 0.1);
`;

const LogoContainer = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  img {
    width: 90px;
    height: 90px;
    filter: drop-shadow(0 12px 40px rgba(0, 0, 0, 0.3));
    position: relative;
    z-index: 2;
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${pulse} 3s ease-in-out infinite;
    z-index: 1;
  }
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 60px;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -1000px;
    width: 1000px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: ${shimmer} 3s infinite;
  }
  
  .icon {
    font-size: 1.2rem;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const Title = styled(motion.h1)`
  font-family: "Poppins", sans-serif;
  font-size: 7rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 2rem;
  line-height: 1;
  letter-spacing: -0.04em;
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;

  .gradient-text {
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #ffd6cc 25%,
      #ffccf9 50%,
      #ccfffd 75%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: ${gradientMove} 4s ease infinite;
    filter: drop-shadow(0 4px 20px rgba(255, 255, 255, 0.3));
  }
  
  .highlight {
    position: relative;
    display: inline-block;
    
    &::after {
      content: "";
      position: absolute;
      bottom: 10px;
      left: -10px;
      right: -10px;
      height: 20px;
      background: linear-gradient(135deg, rgba(255, 107, 53, 0.4), rgba(255, 255, 255, 0.2));
      border-radius: 10px;
      z-index: -1;
      transform: rotate(-2deg);
    }
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  margin-bottom: 3rem;
  line-height: 1.4;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-family: "Figtree", sans-serif;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  margin-bottom: 4rem;
  line-height: 1.7;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-bottom: 5rem;
`;

const EmailForm = styled(motion.form)`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  backdrop-filter: blur(40px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 100%
    );
    pointer-events: none;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 30px;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 1.5rem 2rem;
  border: none;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.95);
  color: #1a202c;
  font-family: "Figtree", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.3),
                0 8px 32px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1.5rem 3.5rem;
  border: none;
  border-radius: 100px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff4757 100%);
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 40px rgba(255, 107, 53, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-width: 200px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 60px rgba(255, 107, 53, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid transparent;
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StatsSection = styled(motion.section)`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.1;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  position: relative;
  z-index: 2;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const StatNumber = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff6b35 0%, #ff4757 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  font-family: "Figtree", sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
`;

const Features = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.gradient};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-15px) scale(1.05);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    .feature-icon {
      transform: rotateY(360deg) scale(1.2);
    }
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: ${props => props.gradient};
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.feature-icon {
    transform-style: preserve-3d;
  }
`;

const FeatureName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const FeatureDescription = styled.p`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 10;
  
  .mouse {
    width: 30px;
    height: 50px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    position: relative;
    
    &::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 10px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 2px;
      animation: scroll 2s infinite;
    }
  }
  
  @keyframes scroll {
    0% { transform: translateX(-50%) translateY(0); opacity: 1; }
    100% { transform: translateX(-50%) translateY(20px); opacity: 0; }
  }
`;

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const features = [
    {
      icon: <FaRocket />,
      name: "Lightning Fast",
      description: "Get matched with helpers in under 60 seconds. No waiting, just instant connections.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: <BsCurrencyDollar />,
      name: "Earn Big",
      description: "Top helpers earning $25-50/hour. Turn your free time into serious income.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      icon: <FaShieldAlt />,
      name: "Ultra Secure",
      description: "Bank-level encryption, verified profiles, and secure payments. Your safety first.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      icon: <BsLightningChargeFill />,
      name: "Smart Matching",
      description: "AI-powered matching finds your perfect helper based on skills, ratings, and proximity.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "$35/hr", label: "Average Earnings" },
    { number: "4.9★", label: "User Rating" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>Choreo - Transform Your Chores Into Opportunities</title>
        <meta
          name="description"
          content="Join the revolution in household help. Connect instantly, earn big, and transform how families get things done."
        />
      </Helmet>

      <HeroSection ref={heroRef}>
        <BackgroundOrb className="primary" color="rgba(255, 107, 53, 0.4)" style={{ y }} />
        <BackgroundOrb className="secondary" color="rgba(142, 36, 170, 0.4)" style={{ y: y }} />
        <BackgroundOrb className="tertiary" color="rgba(79, 172, 254, 0.4)" style={{ y }} />
        
        <FloatingShape size={100} gradient="linear-gradient(135deg, #667eea, #764ba2)" shape="circle" duration={25} delay={0} style={{ top: '10%', left: '10%' }} />
        <FloatingShape size={80} gradient="linear-gradient(135deg, #f093fb, #f5576c)" shape="square" duration={30} delay={5} style={{ top: '70%', right: '15%' }} />
        <FloatingShape size={120} gradient="linear-gradient(135deg, #4facfe, #00f2fe)" shape="triangle" duration={35} delay={10} style={{ bottom: '20%', left: '40%' }} />

        <ContentContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ opacity }}
        >
          <LogoContainer
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <img src={logoSvg} alt="Choreo Logo" />
          </LogoContainer>

          <Badge
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <HiSparkles className="icon" />
            LAUNCHING SOON • BE THE FIRST
          </Badge>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="highlight">Transform</span> Your
            <br />
            <span className="gradient-text">Chores Into Cash</span>
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The revolutionary platform where help meets opportunity
          </Subtitle>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join thousands earning real money by helping neighbors with everyday tasks. 
            From quick errands to home projects - your skills, your schedule, your earnings.
          </Description>

          <CTAContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <EmailForm onSubmit={handleSubmit}>
              <EmailInput
                type="email"
                placeholder="Enter your email for early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <SubmitButton
                type="submit"
                disabled={isLoading || !email.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="spinner" />
                    </motion.div>
                  ) : isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <FaCheck />
                      <span>You're In!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <span>Get Early Access</span>
                      <FaArrowRight />
                    </motion.div>
                  )}
                </AnimatePresence>
              </SubmitButton>
            </EmailForm>
          </CTAContainer>

          <Features
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.name}
                gradient={feature.gradient}
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                whileHover={{ rotate: 2 }}
              >
                <FeatureIcon gradient={feature.gradient} className="feature-icon">
                  {feature.icon}
                </FeatureIcon>
                <FeatureName>{feature.name}</FeatureName>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </Features>
        </ContentContainer>
        
        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="mouse" />
          <span>Scroll to explore</span>
        </ScrollIndicator>
      </HeroSection>

      <StatsSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </StatsSection>
    </>
  );
};

export default HomePage;