import React, { useState } from "react";
import styled from "styled-components";
import { FaRocket, FaLightbulb, FaCode, FaCheckCircle, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { InlineWidget } from "react-calendly";

const ContactUsWrapper = styled.div`
  background: transparent;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
`;

const HeroSection = styled.section`
  padding: 120px 8% 80px;
  text-align: center;
  position: relative;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #FFEB3B 40%, #fbb604 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto 50px;
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProcessSection = styled.section`
  padding: 60px 8%;
  background: rgba(25, 25, 25, 0.3);
  backdrop-filter: blur(10px);
`;

const ProcessTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #fbb604;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProcessCard = styled.div`
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(251, 182, 4, 0.5);
    box-shadow: 0 20px 60px rgba(251, 182, 4, 0.1);

    &:before {
      opacity: 1;
    }
  }
`;

const ProcessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fbb604, #f99b04);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 2rem;
  color: #000;
  position: relative;
  z-index: 1;
`;

const ProcessCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fbb604;
`;

const ProcessCardText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
`;

const ContactSection = styled.section`
  padding: 60px 8%;
  max-width: 1400px;
  margin: 0 auto;
`;

const ContactInfoSection = styled.section`
  padding: 50px 8%;
  background: rgba(25, 25, 25, 0.6);
  backdrop-filter: blur(10px);
  margin: 0 8% 60px;
  border-radius: 20px;
  border: 1px solid rgba(251, 182, 4, 0.2);
`;

const ContactInfoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #fbb604;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ContactInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const ContactInfoCard = styled.div`
  text-align: center;
  padding: 30px 20px;
`;

const ContactInfoIcon = styled.div`
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
`;

const ContactInfoLabel = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #fbb604;
`;

const ContactInfoValue = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactForm = styled.div`
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 50px 40px;
  backdrop-filter: blur(10px);
`;

const FormTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #fbb604;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 1rem;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px 20px;
  color: #fff;
  font-size: 1rem;
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
  padding: 16px 20px;
  color: #fff;
  font-size: 1rem;
  min-height: 120px;
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
  padding: 16px 20px;
  color: #fff;
  font-size: 1rem;
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
  padding: 18px 40px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;

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
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  padding: 50px 40px;
  backdrop-filter: blur(10px);
`;

const CalendlyTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fbb604;
  text-align: center;
`;

const CalendlyDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const CalendlyContainer = styled.div`
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid #4CAF50;
  border-radius: 12px;
  padding: 16px 20px;
  color: #4CAF50;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
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
    }, 1500);
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
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '50px' }}>
          <ProcessCardText style={{ fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '30px' }}>
            <strong style={{ color: '#fbb604' }}>The Freelancer Problem:</strong> If you've hired individual freelancers, you've likely experienced messy, 
            unfinished products and frustrated investors. We understand that pain.
          </ProcessCardText>
          <ProcessCardText style={{ fontSize: '1.2rem', lineHeight: '1.7', color: '#fbb604' }}>
            <strong>Our Solution:</strong> A dedicated team with synchronized development, consistent quality, proper code reviews, 
            and accountability. Try our monthly packages and let us make your complex ideas seem like a walk in the park.
          </ProcessCardText>
        </div>
        
        <ProcessGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <ProcessCard style={{ padding: '30px 25px' }}>
            <ProcessIcon style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '20px' }}>
              <FaLightbulb />
            </ProcessIcon>
            <ProcessCardTitle style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Quality Assurance</ProcessCardTitle>
            <ProcessCardText style={{ fontSize: '0.95rem' }}>
              Proper code reviews, testing, and quality control that freelancers can't provide.
            </ProcessCardText>
          </ProcessCard>

          <ProcessCard style={{ padding: '30px 25px' }}>
            <ProcessIcon style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '20px' }}>
              <FaCode />
            </ProcessIcon>
            <ProcessCardTitle style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Team Collaboration</ProcessCardTitle>
            <ProcessCardText style={{ fontSize: '0.95rem' }}>
              Synchronized development with multiple specialists working together efficiently.
            </ProcessCardText>
          </ProcessCard>

          <ProcessCard style={{ padding: '30px 25px' }}>
            <ProcessIcon style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '20px' }}>
              <FaRocket />
            </ProcessIcon>
            <ProcessCardTitle style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Accountability</ProcessCardTitle>
            <ProcessCardText style={{ fontSize: '0.95rem' }}>
              Dedicated project management and reliable delivery timelines you can count on.
            </ProcessCardText>
          </ProcessCard>
        </ProcessGrid>
      </ProcessSection>

      <ContactSection>
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
                  <option value="essential-launch">Essential Launch</option>
                  <option value="growth-partnership">Growth Partnership</option>
                  <option value="tailored-enterprise">Tailored Enterprise</option>
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

              {showSuccess && (
                <SuccessMessage>
                  <FaCheckCircle style={{ marginRight: '10px' }} />
                  Thank you! We'll get back to you within 24 hours.
                </SuccessMessage>
              )}
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
              />
            </CalendlyContainer>
          </CalendlySection>
        </ContactGrid>
      </ContactSection>
    </ContactUsWrapper>
  );
};

export default ContactUs; 