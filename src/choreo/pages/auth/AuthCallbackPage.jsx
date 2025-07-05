import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CallbackContainer = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
`;

const CallbackCard = styled.div`
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

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(74, 144, 226, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: ${spin} 1s ease-in-out infinite;
  margin: 0 auto 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Description = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  font-weight: 600;

  &.success {
    background: rgba(46, 204, 113, 0.1);
    color: #2ecc71;
    border: 1px solid rgba(46, 204, 113, 0.3);
  }

  &.error {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
    border: 1px solid rgba(231, 76, 60, 0.3);
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [status, setStatus] = useState("processing"); // 'processing', 'success', 'error'
  const [message, setMessage] = useState("Processing authentication...");

  // Extract callback parameters
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const provider = searchParams.get("provider") || "oauth";

  useEffect(() => {
    processCallback();
  }, []);

  const processCallback = async () => {
    try {
      // Handle OAuth error first
      if (error) {
        setStatus("error");
        setMessage(errorDescription || `Authentication failed: ${error}`);
        return;
      }

      // Validate required parameters
      if (!code) {
        setStatus("error");
        setMessage("Missing authorization code. Please try logging in again.");
        return;
      }

      setMessage("Exchanging authorization code...");

      // In a real app, this would make an API call to your backend
      // to exchange the code for tokens
      const result = await exchangeCodeForTokens(code, state, provider);

      if (result.success) {
        setStatus("success");
        setMessage("Authentication successful! Redirecting...");

        // Simulate login with the received tokens
        // In a real app, you'd use the actual user data and tokens
        const loginResult = await login(result.user.email, "oauth_token");

        if (loginResult.success) {
          // Redirect after successful authentication
          setTimeout(() => {
            const redirectTo =
              sessionStorage.getItem("auth_redirect") || "/dashboard";
            sessionStorage.removeItem("auth_redirect");
            navigate(redirectTo);
          }, 2000);
        } else {
          throw new Error("Failed to complete login process");
        }
      } else {
        throw new Error(result.error || "Authentication failed");
      }
    } catch (err) {
      console.error("Callback processing error:", err);
      setStatus("error");
      setMessage(err.message || "Authentication failed. Please try again.");
    }
  };

  const handleRetry = () => {
    navigate("/auth/login");
  };

  const handleContinue = () => {
    const redirectTo = sessionStorage.getItem("auth_redirect") || "/dashboard";
    sessionStorage.removeItem("auth_redirect");
    navigate(redirectTo);
  };

  return (
    <>
      <Helmet>
        <title>Authentication - Choreo</title>
        <meta name="description" content="Processing your authentication" />
      </Helmet>

      <CallbackContainer>
        <CallbackCard>
          {status === "processing" && (
            <>
              <LoadingSpinner />
              <Title>Authenticating...</Title>
              <Description>{message}</Description>
            </>
          )}

          {status === "success" && (
            <>
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                  color: "var(--primary-color)",
                }}
              >
                ✅
              </div>
              <Title>Authentication Successful!</Title>
              <Description>
                Welcome to Choreo! You'll be redirected to your dashboard
                shortly.
              </Description>
              <StatusMessage className="success">{message}</StatusMessage>
              <ActionButton onClick={handleContinue}>
                Continue to Dashboard
              </ActionButton>
            </>
          )}

          {status === "error" && (
            <>
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                  color: "#e74c3c",
                }}
              >
                ❌
              </div>
              <Title>Authentication Failed</Title>
              <Description>
                There was a problem with your authentication. Please try again.
              </Description>
              <StatusMessage className="error">{message}</StatusMessage>
              <ActionButton onClick={handleRetry}>Try Again</ActionButton>
            </>
          )}

          {/* Debug info in development */}
          {process.env.NODE_ENV === "development" && (
            <div
              style={{
                marginTop: "2rem",
                padding: "1rem",
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: "8px",
                fontSize: "0.8rem",
                textAlign: "left",
              }}
            >
              <strong>Debug Info:</strong>
              <br />
              Provider: {provider}
              <br />
              Code: {code ? "Present" : "Missing"}
              <br />
              State: {state || "None"}
              <br />
              Error: {error || "None"}
            </div>
          )}
        </CallbackCard>
      </CallbackContainer>
    </>
  );
};

// Simulate token exchange - replace with actual API call
const exchangeCodeForTokens = async (code, state, provider) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful token exchange
      resolve({
        success: true,
        user: {
          id: "oauth_user_123",
          email: "user@example.com",
          name: "OAuth User",
          provider: provider,
          verified: true,
        },
        accessToken: "access_token_here",
        refreshToken: "refresh_token_here",
      });
    }, 2000);
  });
};

export default AuthCallbackPage;
