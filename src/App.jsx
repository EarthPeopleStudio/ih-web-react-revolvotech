import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import AboutUs from "./Components/AboutUs";
import OurWork from "./Components/OurWork";
import Projects from "./pages/Projects";
import HivekeyProject from "./pages/HivekeyProject";
import TechShowcase from "./Components/TechShowcase";
import Pricing from "./Components/Pricing";
import ContactUs from "./Components/ContactUs";
import Testimonials from "./Components/Testimonials";
import darkTheme, { themeToVars } from "./themes";
import { AnimationProvider } from './Components/AnimationContext';

// Create a context for the current path
export const PathContext = createContext('/');

const AppWrapper = styled.div`
  ${() => themeToVars(darkTheme)}
  background-color: var(--dark-bg);
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

// This component is needed to access location inside Router
const AppContent = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <PathContext.Provider value={currentPath}>
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
                  {/* <Services id="services" />
                  <Portfolio id="projects" />
                  <Stacks id="stacks" /> */}
                </>
              }
            />

            {/* Privacy Policy Page */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Terms of Service Page */}
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Cookie Policy Page */}
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            {/* About Us Page */}
            <Route path="/about-us" element={<AboutUs />} />
            
            {/* Our Work Page */}
            <Route path="/our-work" element={<OurWork />} />
            
            {/* Projects Page */}
            <Route path="/projects" element={<Projects />} />
            
            {/* Individual Project Pages */}
            <Route path="/projects/hivekey" element={<HivekeyProject />} />
            
            {/* Tech Showcase Page */}
            <Route path="/tech-showcase" element={<TechShowcase />} />
            
            {/* Pricing Page */}
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Testimonials Page */}
            <Route path="/testimonials" element={<Testimonials />} />
            
            {/* Contact Us Page */}
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
          <Footer />
        </ContentWrapper>
      </AppWrapper>
    </PathContext.Provider>
  );
};

function App() {
  return (
    <AnimationProvider>
      <Router>
        <AppContent />
      </Router>
    </AnimationProvider>
  );
}

export default App;
