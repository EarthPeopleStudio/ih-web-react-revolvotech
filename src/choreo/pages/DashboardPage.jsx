import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";

const DashboardContainer = styled.div`
  min-height: calc(100vh - 140px);
  padding: 2rem;
  background: var(--dark-bg);
  color: var(--text-primary);
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(
      135deg,
      var(--primary-color),
      var(--secondary-color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Dashboard - Choreo</title>
        <meta name="description" content="Your Choreo dashboard" />
      </Helmet>

      <DashboardContainer>
        <WelcomeSection>
          <h1>Welcome back{user?.name ? `, ${user.name}` : ""}!</h1>
          <p>
            Here's your Choreo dashboard with all your important information.
          </p>
        </WelcomeSection>

        <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          <p>Dashboard content coming soon...</p>
        </div>
      </DashboardContainer>
    </>
  );
};

export default DashboardPage;
