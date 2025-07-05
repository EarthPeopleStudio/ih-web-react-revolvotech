import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import logoSvg from "../assets/logo.svg";
import { Helmet } from "react-helmet-async";

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 200% 50%; }
  75% { background-position: 300% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  background: radial-gradient(ellipse at top, #fafbfc 0%, #ffffff 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
`;

const BackgroundOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.04;
  animation: ${float} 25s ease-in-out infinite;

  &.primary {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #ff6b35 0%, #e55722 100%);
    top: 15%;
    right: 5%;
    animation-delay: 0s;
  }

  &.secondary {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #8e24aa 0%, #5e35b1 100%);
    bottom: 15%;
    left: 0%;
    animation-delay: 12s;
  }

  &.tertiary {
    width: 350px;
    height: 350px;
    background: linear-gradient(135deg, #1e88e5 0%, #39a0ed 100%);
    top: 40%;
    left: 70%;
    animation-delay: 8s;
  }
`;

const ContentContainer = styled(motion.div)`
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 1100px;
  width: 100%;
  padding: 3rem;
`;

const LogoContainer = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;

  img {
    width: 72px;
    height: 72px;
    filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.08));
  }
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid rgba(255, 107, 53, 0.1);
  border-radius: 50px;
  color: #475569;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  &::before {
    content: "✨";
    font-size: 1.1rem;
  }
`;

const Title = styled(motion.h1)`
  font-family: "Poppins", sans-serif;
  font-size: 6rem;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 2rem;
  line-height: 1.1;
  letter-spacing: -0.03em;

  .gradient-text {
    background: linear-gradient(
      135deg,
      #ff6b35 0%,
      #8e24aa 25%,
      #1e88e5 50%,
      #26a69a 75%,
      #ff6b35 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 400% 400%;
    animation: ${gradientMove} 8s ease infinite;
  }

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-family: "Poppins", sans-serif;
  font-size: 1.75rem;
  color: #64748b;
  font-weight: 300;
  margin-bottom: 2.5rem;
  line-height: 1.4;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Description = styled(motion.p)`
  font-family: "Figtree", sans-serif;
  font-size: 1.2rem;
  color: #475569;
  font-weight: 400;
  margin-bottom: 4rem;
  line-height: 1.7;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-bottom: 6rem;
`;

const EmailForm = styled(motion.form)`
  display: flex;
  gap: 0.75rem;
  max-width: 560px;
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  backdrop-filter: blur(32px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  position: relative;
  overflow: hidden;

  /* Subtle gradient overlay */
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
      rgba(255, 107, 53, 0.02) 100%
    );
    pointer-events: none;
    border-radius: 24px;
  }

  /* Animated border glow */
  &::after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(
      135deg,
      rgba(255, 107, 53, 0.1) 0%,
      transparent 50%,
      rgba(255, 107, 53, 0.1) 100%
    );
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 1.25rem 1.5rem;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  color: #1a202c;
  font-family: "Figtree", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02),
    inset 0 1px 2px rgba(0, 0, 0, 0.02);
  position: relative;
  z-index: 2;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2),
      0 4px 20px rgba(255, 107, 53, 0.08), 0 8px 32px rgba(0, 0, 0, 0.04);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  /* Enhanced focus ring */
  &:focus::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #ff6b35 0%, #e55722 100%);
    border-radius: 22px;
    z-index: -1;
    opacity: 0.3;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 20px;
  background: linear-gradient(135deg, #ff6b35 0%, #e55722 60%, #ff6b35 100%);
  background-size: 200% 200%;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3),
    0 2px 8px rgba(255, 107, 53, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-width: 200px;
  position: relative;
  overflow: hidden;
  z-index: 2;

  /* Animated gradient background */
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
      transparent 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: -1;
  }

  /* Shimmer effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.8s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 16px 48px rgba(255, 107, 53, 0.4),
      0 8px 32px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    background-position: 100% 100%;

    &::before {
      transform: translateX(100%);
    }

    &::after {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Text glow effect */
  span {
    position: relative;
    z-index: 1;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Features = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 400px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
    border-color: rgba(255, 107, 53, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) => props.gradient};
  }

  &.orange::before {
    background: linear-gradient(135deg, #ff6b35 0%, #e55722 100%);
  }

  &.purple::before {
    background: linear-gradient(135deg, #8e24aa 0%, #5e35b1 100%);
  }

  &.blue::before {
    background: linear-gradient(135deg, #1e88e5 0%, #39a0ed 100%);
  }

  &.teal::before {
    background: linear-gradient(135deg, #26a69a 0%, #66bb6a 100%);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  filter: grayscale(10%);
`;

const FeatureName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
`;

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const features = [
    {
      icon: "🚀",
      name: "Post & Get Help",
      description:
        "Lightning-fast matching with vetted helpers in your neighborhood",
      className: "blue",
    },
    {
      icon: "💎",
      name: "Earn Big",
      description:
        "Turn your skills into serious cash - helpers earning $25-50/hour",
      className: "orange",
    },
    {
      icon: "🔒",
      name: "Bank-Level Security",
      description:
        "Military-grade encryption + identity verification = total peace of mind",
      className: "teal",
    },
    {
      icon: "⚡",
      name: "Instant Magic",
      description:
        "From posting to helping in under 60 seconds - it's that simple",
      className: "purple",
    },
  ];

  return (
    <>
      <Helmet>
        <title>🚀 Choreo - The Future of Chores is Here!</title>
        <meta
          name="description"
          content="Revolutionary platform transforming how families get help. Join thousands already earning $25-50/hour. The neighborhood economy starts here!"
        />
        <meta
          name="keywords"
          content="chore marketplace, earn money fast, household help, local helpers, family chores, neighborhood economy, side hustle"
        />
        <meta
          property="og:title"
          content="🚀 Choreo - The Future of Chores is Here!"
        />
        <meta
          property="og:description"
          content="Revolutionary platform transforming how families get help. Join thousands already earning and saving time!"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection>
        <BackgroundOrb className="primary" />
        <BackgroundOrb className="secondary" />
        <BackgroundOrb className="tertiary" />

        <ContentContainer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <LogoContainer
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={logoSvg} alt="Choreo Logo" />
          </LogoContainer>

          <Badge
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            🚀 LAUNCHING SOON • FREE FOREVER
          </Badge>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The <span className="gradient-text">Future</span>
            <br />
            of <span className="gradient-text">Chores</span>
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Where families meet their perfect helpers
          </Subtitle>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🔥 Revolutionary platform transforming how families get help. Join
            thousands already earning and saving time. The neighborhood economy
            starts here!
          </Description>

          <CTAContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <EmailForm onSubmit={handleSubmit}>
              <EmailInput
                type="email"
                placeholder="Enter your email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <SubmitButton
                type="submit"
                disabled={isLoading || !email.trim()}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
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
                    >
                      <FaCheck />
                      <span>Done!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>Notify Me</span>
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
                className={feature.className}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureName>{feature.name}</FeatureName>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </Features>
        </ContentContainer>
      </HeroSection>
    </>
  );
};

export default HomePage;
