import React, { useState } from "react";
import styled from "styled-components";

const ContactWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 50px;
  max-width: 800px;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  flex: 1;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--text-primary);
  }
`;

const TextArea = styled.textarea`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--text-primary);
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  background: var(--button-bg);
  color: var(--button-text);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  align-self: flex-start;
  box-shadow: var(--button-glow);

  &:hover {
    background: var(--button-hover-bg);
    transform: translateY(-2px);
    box-shadow: var(--button-hover-glow);
  }
`;

const InfoCard = styled.div`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const InfoText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid #4CAF50;
  border-radius: 8px;
  padding: 15px 20px;
  color: #4CAF50;
  margin-top: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your server or a third-party service
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <ContactWrapper>
      <Title>Get a Quote</Title>
      <Subtitle>
        Ready to bring your idea to life? Fill out the form below and our team will get back 
        to you with a detailed quote tailored to your specific needs.
      </Subtitle>
      
      <FormContainer>
        <FormSection>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="message">Project Details</Label>
              <TextArea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder="Please describe your project, timeline, and any specific requirements."
              />
            </InputGroup>
            
            <SubmitButton type="submit">Submit Request</SubmitButton>
            
            {submitted && (
              <SuccessMessage>
                Thank you! Your request has been submitted. We'll be in touch soon.
              </SuccessMessage>
            )}
          </Form>
        </FormSection>
        
        <InfoSection>
          <InfoCard>
            <InfoTitle>Why Choose Revolvo Tech?</InfoTitle>
            <InfoText>
              We offer tailored solutions to businesses of all sizes, with competitive pricing and a 
              client-centric approach. Our team of skilled professionals is ready to bring your vision to life.
            </InfoText>
            <InfoText>
              From web and mobile development to game creation and software consulting, we have 
              the expertise to handle projects across various domains and industries.
            </InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoTitle>Contact Information</InfoTitle>
            <InfoItem>Email: hey@revolvo.tech</InfoItem>
            <InfoItem>Support: help@revolvo.tech</InfoItem>
            <InfoItem>Location: Islamabad, Pakistan</InfoItem>
          </InfoCard>
        </InfoSection>
      </FormContainer>
    </ContactWrapper>
  );
};

export default ContactUs; 