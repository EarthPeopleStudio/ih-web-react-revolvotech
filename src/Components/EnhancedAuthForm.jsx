import React, { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import TurnstileWidget from "./TurnstileWidget";
import { useApiWithCaptcha } from "../hooks/useApiWithCaptcha";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: var(--text-primary, #333);
  margin-bottom: 2rem;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--text-primary, #333);
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid
    ${(props) => (props.hasError ? "#e74c3c" : "rgba(0, 0, 0, 0.1)")};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--primary-color, #4a90e2);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background: #f8f9fa;
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(
    135deg,
    var(--primary-color, #4a90e2),
    var(--secondary-color, #7b68ee)
  );
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  display: inline-block;
  margin-right: 0.5rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const GlobalErrorMessage = styled.div`
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

const InfoBox = styled.div`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary, #666);

  strong {
    color: var(--primary-color, #4a90e2);
  }
`;

/**
 * Enhanced authentication form with automatic Turnstile captcha integration
 * Demonstrates how to handle error code 428 and integrate captcha verification
 */
const EnhancedAuthForm = ({
  title = "Enhanced Login",
  onSuccess,
  showCaptcha = false,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showCaptchaWidget, setShowCaptchaWidget] = useState(showCaptcha);
  const [resetCaptcha, setResetCaptcha] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const { isLoading, error, clearError, post } = useApiWithCaptcha();

  // Handle input changes
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear field error
      if (formErrors[name]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [formErrors]
  );

  // Validate form
  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Handle captcha success
  const handleCaptchaSuccess = useCallback(
    (token) => {
      console.log("Captcha completed:", { tokenLength: token?.length });
      setCaptchaToken(token);
      clearError();
    },
    [clearError]
  );

  // Handle captcha error
  const handleCaptchaError = useCallback((error) => {
    console.error("Captcha error:", error);
    setCaptchaToken(null);
  }, []);

  // Handle captcha expiration
  const handleCaptchaExpire = useCallback(() => {
    console.log("Captcha expired");
    setCaptchaToken(null);
    setResetCaptcha((prev) => prev + 1);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      clearError();
      setSuccessMessage("");

      try {
        // Prepare the request data
        const requestData = {
          email: formData.email,
          password: formData.password,
        };

        // Add captcha token if we have one
        if (captchaToken) {
          requestData.captchaToken = captchaToken;
        }

        console.log("Submitting login request:", {
          email: requestData.email,
          hasCaptcha: !!requestData.captchaToken,
        });

        // Make the API call - the useApiWithCaptcha hook will automatically
        // handle error code 428 by opening the captcha verification
        const response = await post("/api/v1/auth/login", requestData);

        console.log("Login successful:", response);
        setSuccessMessage("Login successful! Welcome back.");

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(response);
        }

        // Clear the form
        setFormData({ email: "", password: "" });
        setCaptchaToken(null);
        setShowCaptchaWidget(false);
      } catch (err) {
        console.error("Login failed:", err);

        // Check if we need to show captcha widget for subsequent attempts
        if (
          err.message?.includes("captcha") ||
          err.message?.includes("verification")
        ) {
          setShowCaptchaWidget(true);
          setCaptchaToken(null);
          setResetCaptcha((prev) => prev + 1);
        }
      }
    },
    [formData, captchaToken, validateForm, clearError, post, onSuccess]
  );

  return (
    <FormContainer>
      <Title>{title}</Title>

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      {error && <GlobalErrorMessage>{error}</GlobalErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            hasError={!!formErrors.email}
            autoComplete="email"
          />
          {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
            hasError={!!formErrors.password}
            autoComplete="current-password"
          />
          {formErrors.password && (
            <ErrorMessage>{formErrors.password}</ErrorMessage>
          )}
        </InputGroup>

        {/* Turnstile Captcha Widget */}
        <TurnstileWidget
          show={showCaptchaWidget}
          onSuccess={handleCaptchaSuccess}
          onError={handleCaptchaError}
          onExpire={handleCaptchaExpire}
          resetTrigger={resetCaptcha}
          theme="auto"
          size="normal"
        />

        <SubmitButton
          type="submit"
          disabled={isLoading || (showCaptchaWidget && !captchaToken)}
        >
          {isLoading && <LoadingSpinner />}
          {isLoading ? "Signing In..." : "Sign In"}
        </SubmitButton>
      </Form>

      <InfoBox>
        <strong>About this Enhanced Form:</strong>
        <br />
        This form demonstrates automatic captcha integration. When the backend
        returns error code 428, the captcha verification will be triggered
        automatically. The form will retry the submission with the captcha token
        once verified.
      </InfoBox>

      {/* Development info */}
      {import.meta.env.DEV && (
        <InfoBox
          style={{
            background: "#f8f9fa",
            border: "1px solid #dee2e6",
            marginTop: "1rem",
          }}
        >
          <strong>Development Debug:</strong>
          <br />
          Has Captcha Token: {captchaToken ? "Yes" : "No"}
          <br />
          Show Captcha Widget: {showCaptchaWidget ? "Yes" : "No"}
          <br />
          Is Loading: {isLoading ? "Yes" : "No"}
          <br />
          Form Valid: {Object.keys(formErrors).length === 0 ? "Yes" : "No"}
        </InfoBox>
      )}
    </FormContainer>
  );
};

export default EnhancedAuthForm;
