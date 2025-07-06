import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet-async";
import TurnstileWidget from "./TurnstileWidget";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CaptchaContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    var(--primary-color, #4a90e2) 0%,
    var(--secondary-color, #7b68ee) 100%
  );
`;

const CaptchaCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const SecurityIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: linear-gradient(
    135deg,
    var(--primary-color, #4a90e2),
    var(--secondary-color, #7b68ee)
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: var(--text-primary, #333);
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Description = styled.p`
  color: var(--text-secondary, #666);
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const SuccessMessage = styled.div`
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  margin: 1rem 0;
`;

const ActionButton = styled.button`
  background: linear-gradient(
    135deg,
    var(--primary-color, #4a90e2),
    var(--secondary-color, #7b68ee)
  );
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  color: var(--primary-color, #4a90e2);
  border: 2px solid var(--primary-color, #4a90e2);

  &:hover:not(:disabled) {
    background: var(--primary-color, #4a90e2);
    color: white;
  }
`;

const InfoSection = styled.div`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;

  h4 {
    color: var(--primary-color, #4a90e2);
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    color: var(--text-secondary, #666);
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const CaptchaPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("waiting"); // 'waiting', 'verified', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  // Extract URL parameters
  const returnUrl = searchParams.get("returnUrl") || "/";
  const action = searchParams.get("action") || "verify";
  const reason = searchParams.get("reason") || "Security verification required";

  // Handle successful captcha completion
  const handleCaptchaSuccess = (token) => {
    console.log("Captcha completed successfully");
    setCaptchaToken(token);
    setStatus("verified");
    setErrorMessage("");

    // Store the captcha token for the calling application
    if (window.opener) {
      // If opened in a popup, send the token back to the parent
      window.opener.postMessage(
        {
          type: "CAPTCHA_SUCCESS",
          token: token,
          action: action,
        },
        "*"
      );
    } else {
      // Store in sessionStorage for the same tab/domain
      sessionStorage.setItem("captcha_token", token);
      sessionStorage.setItem("captcha_action", action);
      sessionStorage.setItem("captcha_verified_at", Date.now().toString());
    }
  };

  // Handle captcha errors
  const handleCaptchaError = (error) => {
    console.error("Captcha error:", error);
    setStatus("error");
    setErrorMessage(error);
    setCaptchaToken(null);
  };

  // Handle captcha expiration
  const handleCaptchaExpire = () => {
    console.log("Captcha expired");
    setStatus("waiting");
    setCaptchaToken(null);
  };

  // Continue with the token
  const handleContinue = () => {
    if (captchaToken) {
      // Redirect back to the return URL with the token
      const url = new URL(returnUrl, window.location.origin);
      url.searchParams.set("captcha_token", captchaToken);
      url.searchParams.set("captcha_action", action);

      window.location.href = url.toString();
    }
  };

  // Close/Cancel
  const handleCancel = () => {
    if (window.opener) {
      // If opened in a popup, send cancel message
      window.opener.postMessage(
        {
          type: "CAPTCHA_CANCELLED",
          action: action,
        },
        "*"
      );
      window.close();
    } else {
      // Navigate back or to home
      navigate(returnUrl);
    }
  };

  // Auto-close popup after successful verification
  useEffect(() => {
    if (status === "verified" && window.opener) {
      // Auto-close popup after 3 seconds
      const timer = setTimeout(() => {
        window.close();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <>
      <Helmet>
        <title>Security Verification - Revolvo</title>
        <meta
          name="description"
          content="Complete security verification to continue"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <CaptchaContainer>
        <CaptchaCard>
          <SecurityIcon>🛡️</SecurityIcon>

          <Title>Security Verification</Title>

          <Description>{reason}</Description>

          {status === "waiting" && (
            <>
              <InfoSection>
                <h4>Why am I seeing this?</h4>
                <p>
                  We've detected unusual activity or you're attempting an action
                  that requires additional security verification. Please
                  complete the captcha below to continue.
                </p>
              </InfoSection>

              <TurnstileWidget
                show={true}
                onSuccess={handleCaptchaSuccess}
                onError={handleCaptchaError}
                onExpire={handleCaptchaExpire}
                theme="auto"
                size="normal"
              />
            </>
          )}

          {status === "verified" && (
            <>
              <SuccessMessage>
                ✅ Verification completed successfully!
              </SuccessMessage>

              {window.opener ? (
                <Description>
                  You can close this window now. The verification will be
                  applied automatically.
                </Description>
              ) : (
                <>
                  <Description>
                    Your security verification is complete. Click continue to
                    proceed with your original action.
                  </Description>

                  <ActionButton onClick={handleContinue}>Continue</ActionButton>
                </>
              )}
            </>
          )}

          {status === "error" && (
            <>
              <div style={{ color: "#e74c3c", marginBottom: "1rem" }}>
                ❌ Verification failed: {errorMessage}
              </div>

              <ActionButton onClick={() => setStatus("waiting")}>
                Try Again
              </ActionButton>
            </>
          )}

          {/* Always show cancel/close option */}
          <div style={{ marginTop: "2rem" }}>
            <SecondaryButton onClick={handleCancel}>
              {window.opener ? "Close" : "Cancel"}
            </SecondaryButton>
          </div>

          {/* Debug information in development */}
          {import.meta.env.DEV && (
            <div
              style={{
                marginTop: "2rem",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "8px",
                fontSize: "0.8rem",
                color: "#666",
                textAlign: "left",
              }}
            >
              <strong>Debug Info:</strong>
              <br />
              Action: {action}
              <br />
              Return URL: {returnUrl}
              <br />
              Status: {status}
              <br />
              Token:{" "}
              {captchaToken ? `${captchaToken.substring(0, 10)}...` : "None"}
              <br />
              Is Popup: {window.opener ? "Yes" : "No"}
            </div>
          )}
        </CaptchaCard>
      </CaptchaContainer>
    </>
  );
};

export default CaptchaPage;
