import React from "react";
import styled from "styled-components";
import ContactBanner from "./Components/ContactBanner";
import Footer from "./Components/Footer";
import HeroImage from "./Components/HeroImage";
import Navbar from "./Components/Navbar";
import Portfolio from "./Components/Portfolio";
import Services from "./Components/Services";
import Stacks from "./Components/Stacks";

const AppWrapper = styled.div`
  --primary-color: #4a5fe6; // Deep blue
  --secondary-color: #6366f1; // Bright purple
  --accent-color: #4a5fe6; // Same as primary for consistency
  --dark-bg: #080b14; // Dark background
  --card-bg: rgba(62, 61, 86, 0.3); // Card background
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #4a5fe6 100%);
  --gradient-hover: linear-gradient(135deg, #4a5fe6 0%, #6366f1 100%);
  --border-color: rgba(74, 95, 230, 0.3);
  --shadow-color: rgba(74, 95, 230, 0.15);

  background-color: var(--dark-bg);
  position: relative;

  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 0% 0%,
        rgba(74, 95, 230, 0.08),
        transparent 50%
      ),
      radial-gradient(
        circle at 100% 0%,
        rgba(74, 95, 230, 0.08),
        transparent 50%
      ),
      radial-gradient(
        circle at 100% 100%,
        rgba(74, 95, 230, 0.08),
        transparent 50%
      ),
      radial-gradient(
        circle at 0% 100%,
        rgba(74, 95, 230, 0.08),
        transparent 50%
      );
    pointer-events: none;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <AppWrapper>
      <ContentWrapper>
        <Navbar />
        <HeroImage id="home" />
        <Services id="services" />
        <Portfolio id="projects" />
        <Stacks id="stacks" />
        <ContactBanner id="contact" />
        <Footer />
      </ContentWrapper>
    </AppWrapper>
  );
}

export default App;
