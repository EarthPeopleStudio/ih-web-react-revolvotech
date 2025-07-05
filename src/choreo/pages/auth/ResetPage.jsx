import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";
import { AppLinkHandler } from "../../utils/appLinks";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ResetContainer = styled.div`
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

const ResetCard = styled.div`
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

const ResetIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
  margin: 2rem 0;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
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
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);

  &:hover {
    background: var(--primary-color);
    color: white;
  }
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

  &.loading {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
    border: 1px solid rgba(52, 152, 219, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
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

const ResetPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword, isLoading } = useAuth();

  const [status, setStatus] = useState("initial");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [appLinkAttempted, setAppLinkAttempted] = useState(false);

  const token = searchParams.get("token");
  const emailParam = searchParams.get("email");

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  useEffect(() => {
    // Try to open app if we have a reset token
    if (token && !appLinkAttempted) {
      attemptAppLink();
    }
  }, [token, appLinkAttempted]);

  const attemptAppLink = async () => {
    setAppLinkAttempted(true);

    try {
      const appOpened = await AppLinkHandler.openApp({
        action: "reset",
        token,
        email: emailParam,
      });

      if (appOpened) {
        setStatus("app-opened");
        setMessage("Opening Choreo app for password reset...");
      }
    } catch (error) {
      console.error("App link error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("Sending reset link...");

    try {
      const result = await resetPassword(email);

      if (result.success) {
        setStatus("success");
        setMessage(
          "Password reset link sent! Check your email for instructions."
        );
      } else {
        setStatus("error");
        setMessage(result.error || "Failed to send reset link");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to send reset link. Please try again.");
    }
  };

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Sending Reset Link";
      case "success":
        return "Reset Link Sent!";
      case "error":
        return "Reset Failed";
      case "app-opened":
        return "Opening Choreo App";
      default:
        return "Reset Password";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "loading":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "app-opened":
        return "📱";
      default:
        return "🔑";
    }
  };

  const getDescription = () => {
    if (status === "app-opened") {
      return "We're opening the Choreo app for you to reset your password. If the app doesn't open automatically, you can continue with the web version below.";
    }

    if (status === "success") {
      return "We've sent a password reset link to your email address. Click the link in the email to reset your password.";
    }

    if (token) {
      return "You can reset your password using this secure link. The reset will be processed through the Choreo app if you have it installed.";
    }

    return "Enter your email address and we'll send you a link to reset your password.";
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - Choreo</title>
        <meta name="description" content="Reset your Choreo account password" />

        {/* App Link Meta Tags */}
        {token && (
          <>
            <meta
              name="al:android:url"
              content={`choreo://reset?token=${token}&email=${emailParam}`}
            />
            <meta name="al:android:package" content="tech.revolvo.choreo" />
            <meta name="al:android:app_name" content="Choreo" />

            <meta
              name="al:ios:url"
              content={`choreo://reset?token=${token}&email=${emailParam}`}
            />
            <meta name="al:ios:app_store_id" content="YOUR_APP_STORE_ID" />
            <meta name="al:ios:app_name" content="Choreo" />
          </>
        )}
      </Helmet>

      <ResetContainer>
        <ResetCard>
          <ResetIcon>{getIcon()}</ResetIcon>

          <Title>{getTitle()}</Title>
          <Description>{getDescription()}</Description>

          {status === "loading" && (
            <StatusMessage className="loading">
              <LoadingSpinner />
              Sending reset link...
            </StatusMessage>
          )}

          {status === "success" && (
            <StatusMessage className="success">
              ✅ Reset link sent successfully!
            </StatusMessage>
          )}

          {status === "error" && (
            <StatusMessage className="error">❌ {message}</StatusMessage>
          )}

          {status === "app-opened" && (
            <StatusMessage className="loading">
              📱 Opening Choreo app...
            </StatusMessage>
          )}

          {/* Email Form - only show if we don't have a token or if error occurred */}
          {(!token || status === "error") &&
            status !== "success" &&
            status !== "app-opened" && (
              <Form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />

                <ActionButton type="submit" disabled={isLoading}>
                  {isLoading && <LoadingSpinner />}
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </ActionButton>
              </Form>
            )}

          {/* Action Buttons */}
          <div style={{ marginTop: "2rem" }}>
            {status === "success" && (
              <>
                <ActionButton onClick={() => attemptAppLink()}>
                  Open Choreo App
                </ActionButton>
                <SecondaryButton onClick={() => navigate("/auth/login")}>
                  Back to Login
                </SecondaryButton>
              </>
            )}

            {(status === "app-opened" || token) && (
              <SecondaryButton onClick={() => navigate("/auth/login")}>
                Continue on Web
              </SecondaryButton>
            )}

            {status === "error" && (
              <SecondaryButton onClick={() => setStatus("initial")}>
                Try Again
              </SecondaryButton>
            )}

            {status === "initial" && (
              <SecondaryButton onClick={() => navigate("/auth/login")}>
                Back to Login
              </SecondaryButton>
            )}
          </div>

          {/* App Link Information */}
          {token && (
            <div
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                background: "rgba(52, 152, 219, 0.1)",
                border: "1px solid rgba(52, 152, 219, 0.3)",
                borderRadius: "10px",
                textAlign: "left",
                fontSize: "0.95rem",
              }}
            >
              <h3
                style={{
                  color: "var(--primary-color)",
                  marginBottom: "0.5rem",
                }}
              >
                🔗 Secure Reset Link
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "0.5rem",
                }}
              >
                This is a secure password reset link that will work with the
                Choreo app if installed.
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                Link expires in 24 hours for security.
              </p>
            </div>
          )}
        </ResetCard>
      </ResetContainer>
    </>
  );
};

export default ResetPage;
