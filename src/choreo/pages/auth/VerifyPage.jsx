import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";

// App Link Utils
import { AppLinkHandler } from "../../utils/appLinks";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const VerifyContainer = styled.div`
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

const VerifyCard = styled.div`
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

const VerifyIcon = styled.div`
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

const AppLinkInfo = styled.div`
  background: rgba(52, 152, 219, 0.1);
  border: 1px solid rgba(52, 152, 219, 0.3);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;

  h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .app-link {
    font-family: monospace;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
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

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, isLoading, error, verificationStatus } = useAuth();

  const [status, setStatus] = useState("initial"); // 'initial', 'verifying', 'success', 'error', 'app-opened'
  const [message, setMessage] = useState("");
  const [appLinkAttempted, setAppLinkAttempted] = useState(false);
  const [showAppLinkInfo, setShowAppLinkInfo] = useState(false);

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const type = searchParams.get("type") || "verification";

  useEffect(() => {
    // Auto-verify if token is present
    if (token && status === "initial") {
      handleVerification();
    }
  }, [token, status]);

  useEffect(() => {
    // Try to open the app automatically if token is present
    if (token && !appLinkAttempted) {
      attemptAppLink();
    }
  }, [token, appLinkAttempted]);

  const attemptAppLink = async () => {
    setAppLinkAttempted(true);

    try {
      const appOpened = await AppLinkHandler.openApp({
        action: "verify",
        token,
        email,
        type,
      });

      if (appOpened) {
        setStatus("app-opened");
        setMessage("Opening Choreo app...");

        // Set a timeout to show fallback message
        setTimeout(() => {
          if (status === "app-opened") {
            setShowAppLinkInfo(true);
          }
        }, 3000);
      } else {
        setShowAppLinkInfo(true);
      }
    } catch (error) {
      console.error("App link error:", error);
      setShowAppLinkInfo(true);
    }
  };

  const handleVerification = async () => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided");
      return;
    }

    setStatus("verifying");
    setMessage("Verifying your email...");

    try {
      const result = await verifyEmail(token);

      if (result.success) {
        setStatus("success");
        setMessage("Email verified successfully!");

        // Try to open app again after successful verification
        setTimeout(() => {
          attemptAppLink();
        }, 1000);
      } else {
        setStatus("error");
        setMessage(result.error || "Verification failed");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Verification failed. Please try again.");
    }
  };

  const handleOpenApp = () => {
    attemptAppLink();
  };

  const handleResendLink = () => {
    // Implement resend functionality
    setMessage("Verification link sent! Check your email.");
  };

  const getTitle = () => {
    switch (status) {
      case "verifying":
        return "Verifying Email";
      case "success":
        return "Email Verified!";
      case "error":
        return "Verification Failed";
      case "app-opened":
        return "Opening Choreo App";
      default:
        return "Email Verification";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "verifying":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "app-opened":
        return "📱";
      default:
        return "📧";
    }
  };

  const getDescription = () => {
    if (status === "app-opened") {
      return "We're trying to open the Choreo app for you. If the app doesn't open automatically, you can open it manually or use the web version below.";
    }

    if (status === "success") {
      return "Your email has been successfully verified. You can now use all features of the Choreo app.";
    }

    if (status === "error") {
      return "There was a problem verifying your email. Please check if the link is valid or try requesting a new verification link.";
    }

    if (token) {
      return "We're verifying your email address. This should only take a moment.";
    }

    return "Click the verification link in your email or use the verification token to verify your account.";
  };

  return (
    <>
      <Helmet>
        <title>Verify Email - Choreo</title>
        <meta
          name="description"
          content="Verify your Choreo account email address"
        />

        {/* App Link Intent Filters */}
        <meta
          name="al:android:url"
          content={`choreo://verify?token=${token}&email=${email}&type=${type}`}
        />
        <meta name="al:android:package" content="tech.revolvo.choreo" />
        <meta name="al:android:app_name" content="Choreo" />

        <meta
          name="al:ios:url"
          content={`choreo://verify?token=${token}&email=${email}&type=${type}`}
        />
        <meta name="al:ios:app_store_id" content="YOUR_APP_STORE_ID" />
        <meta name="al:ios:app_name" content="Choreo" />

        {/* Twitter Card for App Links */}
        <meta name="twitter:card" content="app" />
        <meta name="twitter:app:name:iphone" content="Choreo" />
        <meta name="twitter:app:id:iphone" content="YOUR_APP_STORE_ID" />
        <meta
          name="twitter:app:url:iphone"
          content={`choreo://verify?token=${token}`}
        />

        <meta name="twitter:app:name:googleplay" content="Choreo" />
        <meta name="twitter:app:id:googleplay" content="tech.revolvo.choreo" />
        <meta
          name="twitter:app:url:googleplay"
          content={`choreo://verify?token=${token}`}
        />
      </Helmet>

      <VerifyContainer>
        <VerifyCard>
          <VerifyIcon>{getIcon()}</VerifyIcon>

          <Title>{getTitle()}</Title>
          <Description>{getDescription()}</Description>

          {status === "verifying" && (
            <StatusMessage className="loading">
              <LoadingSpinner />
              Verifying your email...
            </StatusMessage>
          )}

          {status === "success" && (
            <StatusMessage className="success">
              ✅ Email verified successfully!
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

          {/* Action Buttons */}
          <div style={{ marginTop: "2rem" }}>
            {(status === "success" ||
              status === "app-opened" ||
              showAppLinkInfo) && (
              <ActionButton onClick={handleOpenApp}>
                Open Choreo App
              </ActionButton>
            )}

            {status === "error" && (
              <>
                <ActionButton onClick={handleVerification} disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : "Try Again"}
                </ActionButton>
                <SecondaryButton onClick={handleResendLink}>
                  Resend Link
                </SecondaryButton>
              </>
            )}

            {!token && status === "initial" && (
              <SecondaryButton onClick={handleResendLink}>
                Send Verification Email
              </SecondaryButton>
            )}
          </div>

          {/* App Link Information */}
          {showAppLinkInfo && (
            <AppLinkInfo>
              <h3>🔗 App Link Information</h3>
              <p>
                We attempted to open the Choreo app with this verification link:
              </p>
              <p className="app-link">
                choreo://verify?token={token?.substring(0, 20)}...
              </p>
              <p>
                If you have the Choreo app installed, you can try opening it
                manually. Otherwise, the verification has been completed on the
                web.
              </p>
            </AppLinkInfo>
          )}

          {/* Web Fallback */}
          {(status === "success" || status === "app-opened") && (
            <div
              style={{
                marginTop: "2rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <p
                style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}
              >
                Don't have the app installed?
              </p>
              <SecondaryButton onClick={() => navigate("/market")}>
                Continue on Web
              </SecondaryButton>
            </div>
          )}
        </VerifyCard>
      </VerifyContainer>
    </>
  );
};

export default VerifyPage;
