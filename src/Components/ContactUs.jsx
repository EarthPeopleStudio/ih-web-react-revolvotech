import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaRocket, FaLightbulb, FaCode, FaCheckCircle } from "react-icons/fa";
import { InlineWidget } from "react-calendly";

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

const ContactUsWrapper = styled.div`
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

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #FFEB3B 40%, #fbb604 100%);
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

const HeroSubtitle = styled.p`
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

const ProcessSection = styled.section`
  margin-bottom: 80px;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 20px;
  padding: 60px 40px;
  border: 1px solid rgba(251, 182, 4, 0.2);
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
    margin-bottom: 60px;
    padding: 40px 24px;
  }
`;

const ProcessTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  color: #fbb604;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 24px;
  }
`;

const ProcessDescription = styled.div`
  max-width: 800px;
  margin: 0 auto 40px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const ProcessText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 16px;
  
  strong {
    color: #fbb604;
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const ProcessCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);

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
    background-size: 20px 20px, 20px 20px, 10px 10px, 15px 15px;
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
    background: rgba(251, 182, 4, 0.4);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(251, 182, 4, 0.6);
    box-shadow: 0 20px 40px rgba(251, 182, 4, 0.15);

    &::after {
      background: rgba(251, 182, 4, 0.8);
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const ProcessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fbb604, #f99b04);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.5rem;
  color: #000;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 25px rgba(251, 182, 4, 0.25);
`;

const ProcessCardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #fbb604;
  position: relative;
  z-index: 1;
`;

const ProcessCardText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const ContactForm = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 50px 40px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.8s ease 0.2s both;
  height: 805px;
  display: flex;
  flex-direction: column;
  
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
    background-size: 30px 30px, 30px 30px, 15px 15px, 22px 22px;
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
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

const FormTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fbb604;
  text-align: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 2;
  flex: 1;
  justify-content: space-between;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #fbb604;
    box-shadow: 0 0 0 3px rgba(251, 182, 4, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const TextArea = styled.textarea`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #fbb604;
    box-shadow: 0 0 0 3px rgba(251, 182, 4, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Select = styled.select`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #fbb604;
    box-shadow: 0 0 0 3px rgba(251, 182, 4, 0.1);
  }

  option {
    background: rgba(25, 25, 25, 0.95);
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #fbb604, #f99b04, #d39404);
  border: none;
  color: #000;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  margin-top: 8px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(251, 182, 4, 0.4);

    &:before {
      transform: translateX(100%);
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const CalendlySection = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 50px 40px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.8s ease 0.4s both;
  
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
    background-size: 30px 30px, 30px 30px, 15px 15px, 22px 22px;
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
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

const CalendlyTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fbb604;
  text-align: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const CalendlyDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
  position: relative;
  z-index: 2;
`;

const CalendlyContainer = styled.div`
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    height: 500px;
  }
`;

// Centered Success Modal
const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
`;

const SuccessModal = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 16px;
  padding: 40px;
  max-width: 420px;
  width: 90%;
  backdrop-filter: blur(15px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
  position: relative;
  transform: ${props => props.show ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)'};
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  
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
    background-size: 30px 30px;
    opacity: 0.3;
    pointer-events: none;
    border-radius: 16px;
  }

  &:hover {
    transform: ${props => props.show ? 'scale(1.02) translateY(-2px)' : 'scale(0.9) translateY(20px)'};
    border-color: rgba(251, 182, 4, 0.4);
  }
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 24px;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
`;

const SuccessTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fbb604;
  position: relative;
  z-index: 1;
`;

const SuccessMessage = styled.p`
  margin: 0 0 20px 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

const DismissHint = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const ContactUs = () => {
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        // Auto-hide success message after 6 seconds
        setTimeout(() => setShowSuccess(false), 6000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Silently fail - no error dialog
    }
    
    setIsSubmitting(false);
  };

  return (
    <ContactUsWrapper>
      <HeroSection>
        <HeroTitle>Contact Us</HeroTitle>
        <HeroSubtitle>
          Ready to transform your vision into reality? We're here to guide you through every step 
          of your digital journey. From initial concept to final delivery, let's build something extraordinary.
        </HeroSubtitle>
      </HeroSection>

      <ProcessSection>
        <ProcessTitle>Why Choose Our Team Over Freelancers?</ProcessTitle>
        <ProcessDescription>
          <ProcessText>
            <strong>The Freelancer Problem:</strong> Individual freelancers often deliver messy, 
            unfinished products that frustrate investors. We solve this.
          </ProcessText>
          <ProcessText style={{ color: '#fbb604' }}>
            <strong>Our Solution:</strong> Dedicated team with synchronized development, consistent quality, proper code reviews, 
            and accountability. Let us make your complex ideas seem like a walk in the park.
          </ProcessText>
        </ProcessDescription>
        
        <ProcessGrid>
          <ProcessCard>
            <ProcessIcon>
              <FaLightbulb />
            </ProcessIcon>
            <ProcessCardTitle>Meticulous Attention to Detail</ProcessCardTitle>
            <ProcessCardText>
              We perfect every pixel, line of code, and performance metric. No detail is too small when it comes to your success.
            </ProcessCardText>
          </ProcessCard>

          <ProcessCard>
            <ProcessIcon>
              <FaCode />
            </ProcessIcon>
            <ProcessCardTitle>Honest & Realistic Approach</ProcessCardTitle>
            <ProcessCardText>
              Clear, achievable goals and honest timelines. We deliver sustainable solutions that truly meet your needs, not fantasies.
            </ProcessCardText>
          </ProcessCard>

          <ProcessCard>
            <ProcessIcon>
              <FaRocket />
            </ProcessIcon>
            <ProcessCardTitle>Reliable & Transparent</ProcessCardTitle>
            <ProcessCardText>
              We never commit to what we can't deliver. Expect candid communication and dependable results every step of the way.
            </ProcessCardText>
          </ProcessCard>
        </ProcessGrid>
      </ProcessSection>

      <ContactGrid>
        <ContactForm>
          <FormTitle>Tell Us About Your Project</FormTitle>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="projectType">Project Type *</Label>
              <Select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="">Select project type</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App</option>
                <option value="game-development">Game Development</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="packageTier">Package Tier</Label>
              <Select
                id="packageTier"
                name="packageTier"
                value={formData.packageTier}
                onChange={handleChange}
              >
                <option value="">Select package tier</option>
                <option value="spark">Spark</option>
                <option value="charge">Charge</option>
                <option value="blitz">Blitz</option>
                <option value="not-sure">Not sure yet</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="timeline">Timeline</Label>
              <Select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6+-months">6+ months</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="message">Project Details *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project, goals, and any specific requirements..."
                required
              />
            </InputGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Project Details'}
            </SubmitButton>


          </Form>
        </ContactForm>
        
        <CalendlySection>
          <CalendlyTitle>Schedule a Free Consultation</CalendlyTitle>
          <CalendlyDescription>
            Prefer to talk directly? Book a 30-60 minute consultation call with our team. 
            We'll discuss your project, answer questions, and provide initial recommendations.
          </CalendlyDescription>
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
      </ContactGrid>

      {/* Centered Success Modal */}
      <SuccessOverlay show={showSuccess} onClick={() => setShowSuccess(false)}>
        <SuccessModal show={showSuccess} onClick={(e) => e.stopPropagation()}>
          <SuccessIcon>
            <FaCheckCircle />
          </SuccessIcon>
          <SuccessTitle>Message Sent Successfully!</SuccessTitle>
          <SuccessMessage>
            Thank you for reaching out! We've received your project details and will get back to you within 24 hours with next steps.
          </SuccessMessage>
          <DismissHint>Click anywhere to continue</DismissHint>
        </SuccessModal>
      </SuccessOverlay>
    </ContactUsWrapper>
  );
};

export default ContactUs; 