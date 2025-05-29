import React, { useState } from "react";
import styled from "styled-components";
import { InlineWidget } from "react-calendly";
import { commonStyles } from "../themes";

const ContactWrapper = styled.div`
  ${commonStyles.section}
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  ${commonStyles.heading1}
  ${commonStyles.gradientText}
`;

const Subtitle = styled.p`
  ${commonStyles.bodyText}
  margin-bottom: var(--spacing-xxl);
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
  ${commonStyles.flexColumn}
  gap: var(--spacing-md);
`;

const InputGroup = styled.div`
  ${commonStyles.flexColumn}
  gap: 8px;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

const Input = styled.input`
  ${commonStyles.input}
`;

const TextArea = styled.textarea`
  ${commonStyles.input}
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  ${commonStyles.button}
  margin-top: var(--spacing-md);
  align-self: flex-start;
`;

const InfoCard = styled.div`
  ${commonStyles.card}
  margin-bottom: var(--spacing-lg);
`;

const InfoTitle = styled.h3`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
`;

const InfoText = styled.p`
  ${commonStyles.bodyText}
  margin-bottom: var(--spacing-sm);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: var(--font-size-md);
`;

const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid #4CAF50;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: #4CAF50;
  margin-top: var(--spacing-md);
  font-weight: var(--font-weight-medium);
  ${commonStyles.flexCenter}
`;

const OrSeparator = styled.div`
  text-align: center;
  margin: 80px 0;
  position: relative;
  
  &::before, &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background-color: var(--border-color);
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const OrText = styled.span`
  display: inline-block;
  padding: 10px 20px;
  background: var(--dark-bg);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  position: relative;
  z-index: 1;
`;

const SchedulingSection = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
`;

const SchedulingTitle = styled.h2`
  ${commonStyles.heading2}
  text-align: center;
`;

const SchedulingDescription = styled.p`
  ${commonStyles.bodyText}
  margin-bottom: var(--spacing-lg);
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const CalendlyContainer = styled.div`
  height: 700px;
  width: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color);
  background: #0A0A0A;
  box-shadow: var(--shadow-large);
`;

const Select = styled.select`
  ${commonStyles.input}
  width: 100%;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 16px top 50%;
  background-size: 12px auto;
`;

const Option = styled.option`
  background: var(--card-bg);
  color: var(--text-primary);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: overlayFadeIn 0.3s ease-out forwards;
  
  @keyframes overlayFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #151515, #1a1a1a);
  border-radius: var(--border-radius-lg);
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.07);
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  animation: modalFadeIn 0.4s ease-out forwards;
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, #ff5470, #ff9770);
  }
`;

const ModalIcon = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${props => props.isSuccess 
    ? 'linear-gradient(135deg, rgba(13, 71, 161, 0.1), rgba(0, 176, 155, 0.2))' 
    : 'linear-gradient(135deg, rgba(183, 28, 28, 0.1), rgba(244, 67, 54, 0.2))'};
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.isSuccess ? 'rgba(0, 176, 155, 0.3)' : 'rgba(244, 67, 54, 0.3)'};
  box-shadow: 0 10px 25px ${props => props.isSuccess ? 'rgba(0, 176, 155, 0.15)' : 'rgba(244, 67, 54, 0.15)'};
  animation: iconPulse 2s infinite alternate;
  
  @keyframes iconPulse {
    from {
      transform: scale(1);
      box-shadow: 0 10px 25px ${props => props.isSuccess ? 'rgba(0, 176, 155, 0.15)' : 'rgba(244, 67, 54, 0.15)'};
    }
    to {
      transform: scale(1.05);
      box-shadow: 0 15px 30px ${props => props.isSuccess ? 'rgba(0, 176, 155, 0.25)' : 'rgba(244, 67, 54, 0.25)'};
    }
  }
`;

const ModalTitle = styled.h3`
  font-size: 26px;
  margin-bottom: 15px;
  background: ${props => props.isSuccess 
    ? 'linear-gradient(135deg, #00b09b, #96c93d)' 
    : 'linear-gradient(135deg, #ff416c, #ff4b2b)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: var(--font-weight-bold);
`;

const ModalText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 25px;
  line-height: 1.7;
  font-size: 16px;
`;

const ModalButton = styled.button`
  ${commonStyles.button}
  margin: 15px auto 0;
  background: ${props => props.isSuccess 
    ? 'linear-gradient(135deg, #00b09b, #96c93d)' 
    : 'linear-gradient(135deg, #ff416c, #ff4b2b)'};
  border: none;
  padding: 12px 32px;
  font-weight: 600;
  transform: translateY(0);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const CheckmarkIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
      fill="url(#successGradient)" 
      strokeWidth="0.5"
      stroke="rgba(255,255,255,0.5)"
    />
    <defs>
      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00b09b" />
        <stop offset="100%" stopColor="#96c93d" />
      </linearGradient>
    </defs>
  </svg>
);

const ErrorIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" 
      fill="url(#errorGradient)" 
      strokeWidth="0.5"
      stroke="rgba(255,255,255,0.5)"
    />
    <defs>
      <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff416c" />
        <stop offset="100%" stopColor="#ff4b2b" />
      </linearGradient>
    </defs>
  </svg>
);

const ResultModal = ({ isOpen, isSuccess, message, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalIcon isSuccess={isSuccess}>
          {isSuccess ? <CheckmarkIcon /> : <ErrorIcon />}
        </ModalIcon>
        <ModalTitle isSuccess={isSuccess}>{isSuccess ? "Success!" : "Error"}</ModalTitle>
        <ModalText>{message || (isSuccess ? "Your message has been sent successfully. We'll get back to you soon." : "Something went wrong. Please try again.")}</ModalText>
        <ModalButton isSuccess={isSuccess} onClick={onClose}>
          {isSuccess ? "Great!" : "Try Again"}
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    tier: "",
    service: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  const showSuccessModal = (message) => {
    setIsSuccess(true);
    setModalMessage(message);
    setShowModal(true);
  };
  
  const showErrorModal = (message) => {
    setIsSuccess(false);
    setModalMessage(message);
    setShowModal(true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create FormData object for Web3Forms submission
      const formSubmitData = new FormData();
      
      // Add Web3Forms access key
      formSubmitData.append("access_key", "982a51ab-cfbc-4f05-a885-3a048a2bd57b");
      
      // Add honeypot field to prevent spam
      formSubmitData.append("botcheck", "");
      
      // Add form fields
      formSubmitData.append("name", formData.name);
      formSubmitData.append("email", formData.email);
      formSubmitData.append("subject", formData.subject);
      
      // Create a simplified message for better readability
      const detailedMessage = `
Name: ${formData.name}
Email: ${formData.email}
Package Tier: ${formData.tier}
Service Type: ${formData.service}
Subject: ${formData.subject}

Project Details:
${formData.message}
      `;
      
      formSubmitData.append("message", detailedMessage);
      formSubmitData.append("tier", formData.tier);
      formSubmitData.append("service", formData.service);
      
      // Add recipient email
      formSubmitData.append("to_email", "hey@revolvo.tech");
      
      // Convert to proper JSON data for API submission
      const jsonData = {
        access_key: "982a51ab-cfbc-4f05-a885-3a048a2bd57b",
        botcheck: "",
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: detailedMessage,
        tier: formData.tier,
        service: formData.service,
        to_email: "hey@revolvo.tech",
        from_name: "Revolvo Tech Contact Form",
        replyto: formData.email
      };
      
      // Send the form data to Web3Forms API using JSON
      let response;
      try {
        response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(jsonData)
        });
      } catch (fetchError) {
        console.error("Initial fetch failed, trying with no-cors mode:", fetchError);
        // If the regular fetch fails due to CORS, try with no-cors mode
        try {
          await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
          });
        } catch (noCorsError) {
          console.error("No-cors mode also failed, trying traditional form submission", noCorsError);
          
          // As a last resort, create and submit a traditional form
          const formElement = document.createElement('form');
          formElement.method = 'POST';
          formElement.action = 'https://api.web3forms.com/submit';
          formElement.style.display = 'none'; // Hide the form
          
          // Add redirect parameter to prevent page navigation
          const redirectURL = window.location.href;
          
          // Add all the required fields as hidden inputs
          const fields = {
            access_key: "982a51ab-cfbc-4f05-a885-3a048a2bd57b",
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: detailedMessage,
            botcheck: "",
            tier: formData.tier,
            service: formData.service,
            to_email: "hey@revolvo.tech",
            from_name: "Revolvo Tech Contact Form",
            replyto: formData.email,
            redirect: redirectURL
          };
          
          // Create hidden input fields
          for (const [key, value] of Object.entries(fields)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            formElement.appendChild(input);
          }
          
          // Append form to body, submit it, and remove it
          document.body.appendChild(formElement);
          formElement.submit();
          document.body.removeChild(formElement);
          
          // Set success state
          setSubmitted(true);
          setFormData({ name: "", email: "", subject: "", message: "", tier: "", service: "" });
          setTimeout(() => setSubmitted(false), 5000);
          return;
        }
        
        // Since no-cors doesn't return useful response data, assume success
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "", tier: "", service: "" });
        setTimeout(() => setSubmitted(false), 5000);
        
        // Show success modal
        showSuccessModal("Thank you! Your request has been submitted. We'll be in touch soon.");
        return; // Exit early since we can't process the response
      }
      
      // Only try to parse the response if we didn't use no-cors mode
      const data = await response.json();
      
      if (data.success) {
        // Form submitted successfully
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "", tier: "", service: "" });
        setTimeout(() => setSubmitted(false), 5000);
        
        // Show success modal
        showSuccessModal("Thank you! Your request has been submitted. We'll be in touch soon.");
      } else {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message || "Something went wrong. Please try again.");
      
      // Show error modal
      showErrorModal(err.message || "Something went wrong. Please try again.");
      
      // Log additional information for debugging
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactWrapper>
      <Title>Discuss Your Vision</Title>
      <Subtitle>
        Ready to bring your idea to life? Fill out the form below and our team will analyze your requirements
        to provide a detailed timeline estimate tailored to your specific project needs.
      </Subtitle>
      
      <FormContainer>
        <FormSection>
          <Form onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="982a51ab-cfbc-4f05-a885-3a048a2bd57b" />
            <input type="hidden" name="to_email" value="hey@revolvo.tech" />
            {/* Honeypot field to prevent spam */}
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
            
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
              <Label htmlFor="tier">Package Tier</Label>
              <Select
                id="tier"
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                required
              >
                <Option value="">Select a Package</Option>
                <Option value="essential">Essential Launch</Option>
                <Option value="growth">Growth Partnership</Option>
                <Option value="enterprise">Tailored Enterprise</Option>
              </Select>
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="service">Service Type</Label>
              <Select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <Option value="">Select a Service</Option>
                <Option value="web">Web Development</Option>
                <Option value="mobile">Mobile Development</Option>
                <Option value="game">Game Development</Option>
                <Option value="backend">Backend & Infrastructure</Option>
                <Option value="uiux">UI/UX Design</Option>
                <Option value="art">Digital Art & Design</Option>
                <Option value="ai">AI & Machine Learning</Option>
                <Option value="pm">Project Management</Option>
              </Select>
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
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Get Your Timeline Estimate"}
            </SubmitButton>
            
            {/* Modal for success/error messages */}
            <ResultModal 
              isOpen={showModal}
              isSuccess={isSuccess}
              message={modalMessage}
              onClose={closeModal}
            />
            
            {/* Legacy success message (hidden since we're using modal now) */}
            {submitted && !showModal && (
              <SuccessMessage style={{ display: 'none' }}>
                Thank you! Your request has been submitted. We'll be in touch soon.
              </SuccessMessage>
            )}
            
            {/* Legacy error message (hidden since we're using modal now) */}
            {error && !showModal && (
              <div style={{ 
                background: "rgba(255, 0, 0, 0.1)", 
                border: "1px solid #ff0000", 
                borderRadius: "var(--border-radius-md)",
                padding: "var(--spacing-sm) var(--spacing-md)",
                color: "#ff0000",
                marginTop: "var(--spacing-md)",
                display: 'none'
              }}>
                {error}
              </div>
            )}
          </Form>
        </FormSection>
        
        <InfoSection>
          <InfoCard>
            <InfoTitle>The Freelancer Problem</InfoTitle>
            <InfoText>
              If you've paid for a service from an individual freelancer, you were probably left with a messy, unfinished product and
              dissatisfied investors. We understand that frustration.
            </InfoText>
            <InfoText>
              That's why we encourage you to try one of our monthly packages to gauge our teamwork and ensure it meets your standards.
              Just sit back and relax while we make your most complex idea seem like a walk in the park.
            </InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoTitle>Why Choose a Team Over Individual Freelancers?</InfoTitle>
            <InfoText>
              Hiring individual freelancers may seem cost-effective initially, but often results in delayed deliverables and quality issues. Our
              team-based approach ensures synchronized development, consistent quality, proper code reviews, and accountability.
            </InfoText>
            <InfoText>
              By choosing one of our tiers, you get a dedicated team that collaborates efficiently, follows industry best practices, and delivers
              a polished product that meets your business objectives.
            </InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoTitle>Contact Information</InfoTitle>
            <InfoItem>Email: hey@revolvo.tech</InfoItem>
            <InfoItem>Phone: +358 41 7408087</InfoItem>
            <InfoItem>Location: Väinämöisenkatu 11, 33540 Tampere, Finland</InfoItem>
          </InfoCard>
        </InfoSection>
      </FormContainer>
      
      <OrSeparator>
        <OrText>OR</OrText>
      </OrSeparator>
      
      <SchedulingSection>
        <SchedulingTitle>Schedule a Consultation</SchedulingTitle>
        <SchedulingDescription>
          Prefer to discuss your project directly? Book a call with our team to explore the best approach for your specific requirements.
        </SchedulingDescription>
        
        <CalendlyContainer>
          <InlineWidget 
            url="https://calendly.com/revolvotech/session"
            styles={{
              height: '700px'
            }}
            pageSettings={{
              backgroundColor: '121212',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: 'ff5470',
              textColor: 'ffffff'
            }}
          />
        </CalendlyContainer>
      </SchedulingSection>
    </ContactWrapper>
  );
};

export default ContactUs; 