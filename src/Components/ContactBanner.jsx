import React from "react";
import styled from "styled-components";

const ContactBannerWrapper = styled.div`
  padding: 120px 8% 80px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  text-align: center;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 60px;
  font-size: 1.2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
    padding: 0 20px;
  }
`;

const FormWrapper = styled.div`
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 50px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--border-color);
    box-shadow: var(--button-glow);
  }

  @media (max-width: 768px) {
    padding: 25px 10px;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const inputStyles = `
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--button-bg);
  color: var(--text-primary);
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--text-primary);
    background: var(--button-hover-bg);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
  cursor: pointer;
  appearance: none;
  padding-right: 30px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.7)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;

  option {
    background: var(--button-bg);
    color: var(--text-primary);
    padding: 10px;
  }
`;

const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  padding: 16px;
  background: var(--button-bg);
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    background: var(--button-hover-bg);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 14px;
  }
`;

const PrivacyNotice = styled.p`
  grid-column: 1 / -1;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 5px;
  margin-bottom: 15px;
  line-height: 1.5;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ContactBanner = () => {
  return (
    <ContactBannerWrapper id="contact">
      <Title>Let's Build Something Amazing</Title>
      <Description>
        Share your project vision with us, and we'll help bring it to life with
        our expertise in digital innovation and development.
      </Description>

      <FormWrapper>
        <Form>
          <InputGroup>
            <Input type="text" id="firstName" name="firstName" placeholder="First Name" />
          </InputGroup>
          <InputGroup>
            <Input type="text" id="lastName" name="lastName" placeholder="Last Name" />
          </InputGroup>
          <InputGroup>
            <Input type="email" id="email" name="email" placeholder="Email Address" />
          </InputGroup>
          <InputGroup>
            <Select id="service" name="service" defaultValue="">
              <option value="" disabled>
                Select Service
              </option>
              <option value="web-dev">Web Development</option>
              <option value="game-dev">Game Development</option>
              <option value="app-dev">App Development</option>
              <option value="other">Other Services</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <Input type="number" id="budget" name="budget" placeholder="Budget (USD)" />
          </InputGroup>
          <InputGroup>
            <Input type="tel" id="phone" name="phone" placeholder="Phone Number" />
          </InputGroup>
          <InputGroup className="full-width">
            <TextArea id="projectDetails" name="projectDetails" placeholder="Tell us about your project..." />
          </InputGroup>
          <PrivacyNotice>
            By submitting this form, you agree to our Privacy Policy and consent
            to being contacted regarding your inquiry. We respect your privacy
            and will never share your information.
          </PrivacyNotice>
          <SubmitButton type="submit">Get Your Free Quote →</SubmitButton>
        </Form>
      </FormWrapper>
    </ContactBannerWrapper>
  );
};

export default ContactBanner;
