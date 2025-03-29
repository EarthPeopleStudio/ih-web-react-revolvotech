import React, { useState, useRef } from "react";
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

const FileUploadContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
`;

const FileUploadLabel = styled.label`
  cursor: pointer;
  padding: 12px 20px;
  width: 100%;
  ${commonStyles.flexCenter}
  border: 1px dashed var(--border-color);
  border-radius: var(--border-radius-md);
  background: rgba(0, 0, 0, 0.1);
  color: var(--text-secondary);
  transition: all var(--transition-normal);
  text-align: center;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.2);
    color: var(--text-primary);
  }
`;

const FileUploadInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
`;

const FilePreview = styled.div`
  margin-top: 10px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-sm);
  ${commonStyles.flexBetween}
  margin-bottom: 5px;
`;

const FileRemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff5470;
  cursor: pointer;
  font-size: var(--font-size-md);
  transition: all var(--transition-normal);
  
  &:hover {
    color: #ff3058;
  }
`;

const OptionalText = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: var(--font-size-sm);
  margin-left: 5px;
  font-style: italic;
`;

const ContactUs = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    tier: "",
    service: ""
  });
  
  const [attachments, setAttachments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFile = e.target.files[0];
      if (attachments.length < 3) {
        setAttachments(prev => [...prev, newFile]);
      } else {
        alert("You can only upload a maximum of 3 files");
      }
      // Reset file input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  const removeFile = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Attachments:", attachments);
    // Here you would typically send the data to your server or a third-party service
    // You would need to use FormData to include the files in the submission
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "", tier: "", service: "" });
    setAttachments([]);
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
            
            <InputGroup>
              <Label htmlFor="attachment">
                Attachments <OptionalText>(optional, max 3 files)</OptionalText>
              </Label>
              <FileUploadContainer>
                <FileUploadLabel htmlFor="attachment">
                  {attachments.length >= 3 ? "Maximum files reached" : "Click to upload project brief or specifications"}
                </FileUploadLabel>
                <FileUploadInput 
                  type="file"
                  id="attachment"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={attachments.length >= 3}
                />
              </FileUploadContainer>
              {attachments.map((file, index) => (
                <FilePreview key={index}>
                  {file.name} ({Math.round(file.size / 1024)} KB)
                  <FileRemoveButton type="button" onClick={() => removeFile(index)}>✕</FileRemoveButton>
                </FilePreview>
              ))}
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