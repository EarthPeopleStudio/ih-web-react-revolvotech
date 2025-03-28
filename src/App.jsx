import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactBanner from "./Components/ContactBanner";
import Footer from "./Components/Footer";
import HeroImage from "./Components/HeroImage";
import Navbar from "./Components/Navbar";
import Portfolio from "./Components/Portfolio";
import Services from "./Components/Services";
import Stacks from "./Components/Stacks";
import MatrixRain from "./Components/MatrixRain";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import CookiePolicy from "./Components/CookiePolicy";

const AppWrapper = styled.div`
  --primary-color: #ffffff;
  --secondary-color: #e0e0e0;
  --accent-color: #ffffff;
  --dark-bg: #000000;
  --card-bg: rgba(25, 25, 25, 0.95);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --gradient-primary: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
  --gradient-hover: linear-gradient(135deg, #a0a0a0 0%, #ffffff 100%);
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.3);

  /* Updated button styles */
  --button-bg: #131313;
  --button-border: rgba(255, 255, 255, 0.1);
  --button-glow: 0 4px 15px rgba(0, 0, 0, 0.3);
  --button-hover-bg: #1a1a1a;
  --button-hover-glow: 0 6px 20px rgba(0, 0, 0, 0.4);
  --button-text: #ffffff;

  background-color: var(--dark-bg);
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <Router>
      <AppWrapper>
        <MatrixRain />
        <ContentWrapper>
          <Navbar />
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroImage id="home" />
                  <Services id="services" />
                  <Portfolio id="projects" />
                  <Stacks id="stacks" />
                  <ContactBanner id="contact" />
                </>
              }
            />

            {/* Privacy Policy Page */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Terms of Service Page */}
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Cookie Policy Page */}
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
          <Footer />
        </ContentWrapper>
      </AppWrapper>
    </Router>
  );
}

export default App;
