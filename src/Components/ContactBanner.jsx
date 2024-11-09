import React from "react";
import styled from "styled-components";

const ContactBannerWrapper = styled.div`
  color: var(--text-primary);
  padding: 120px 8% 80px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 5% 60px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 60px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: var(--text-secondary);
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
  padding: 50px;
  border-radius: 20px;
  border: 1px solid rgba(74, 95, 230, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 30px 20px;
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
  border: 1px solid rgba(239, 87, 119, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(8, 11, 20, 0.6);
  color: var(--text-primary);
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(239, 87, 119, 0.05);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;

  option {
    background: var(--dark-bg);
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
  background: var(--gradient-primary);
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(239, 87, 119, 0.2);
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    background: var(--gradient-hover);
    box-shadow: 0 6px 20px rgba(239, 87, 119, 0.3);
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

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ContactBanner = () => {
  return (
    <ContactBannerWrapper id="contact">
      <ContentWrapper>
        <Title>Let's Build Something Amazing</Title>
        <Description>
          Share your project vision with us, and we'll help bring it to life
          with our expertise in digital innovation and development.
        </Description>

        <FormWrapper>
          <Form>
            <InputGroup>
              <Input type="text" placeholder="First Name" />
            </InputGroup>
            <InputGroup>
              <Input type="text" placeholder="Last Name" />
            </InputGroup>
            <InputGroup>
              <Input type="email" placeholder="Email Address" />
            </InputGroup>
            <InputGroup>
              <Select defaultValue="">
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
              <Input type="number" placeholder="Budget (USD)" />
            </InputGroup>
            <InputGroup>
              <Input type="tel" placeholder="Phone Number" />
            </InputGroup>
            <InputGroup className="full-width">
              <TextArea placeholder="Tell us about your project..." />
            </InputGroup>
            <PrivacyNotice>
              By submitting this form, you agree to our Privacy Policy and
              consent to being contacted regarding your inquiry. We respect your
              privacy and will never share your information.
            </PrivacyNotice>
            <SubmitButton type="submit">Get Your Free Quote →</SubmitButton>
          </Form>
        </FormWrapper>
      </ContentWrapper>
    </ContactBannerWrapper>
  );
};

export default ContactBanner;
