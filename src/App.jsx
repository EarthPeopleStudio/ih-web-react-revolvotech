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
import SubtleBackground from "./Components/SubtleBackground";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import CookiePolicy from "./Components/CookiePolicy";
import AboutUs from "./Components/AboutUs";
import SocialMediaImages from "./Components/SocialMediaImages";

import Projects from "./pages/Projects";
import HivekeyProject from "./pages/HivekeyProject";
import Careers from "./pages/Careers";
import TechShowcase from "./Components/TechShowcase";
import Pricing from "./Components/Pricing";
import Testimonials from "./Components/Testimonials";
import BlogSection from "./Components/BlogSection";
import BlogPost from "./Components/BlogPost";
import TechCarousel from "./Components/TechCarousel";
import SkeletonLoader from "./Components/SkeletonLoader";
import { darkTheme, themeToVars } from "./themes";
import { AnimationProvider } from './Components/AnimationContext';
import ContactUs from './Components/ContactUs';

// Create a context for the current path
export const PathContext = createContext('/');

const AppWrapper = styled.div`
  ${() => themeToVars(darkTheme)}
  background-color: var(--dark-bg);
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  background: transparent;
`;

// This component is needed to access location inside Router
const AppContent = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading Page");
  const [loadingSubtext, setLoadingSubtext] = useState("Initializing components...");
  const [loadingKey, setLoadingKey] = useState(0);
  
  useEffect(() => {
    // Show loading when route changes
    if (currentPath !== location.pathname) {
      setIsLoading(true);
      setLoadingKey(prev => prev + 1); // Force skeleton reset on each navigation
      
      // Set custom loading messages based on route
      const getLoadingMessage = (pathname) => {
        switch(pathname) {
          case '/':
            return { message: "Loading Home", subtext: "Initializing 3D experience..." };
          case '/about-us':
            return { message: "Loading About Us", subtext: "Preparing team information..." };
          case '/images':
            return { message: "Loading Social Images", subtext: "Preparing brand assets..." };
          case '/tech-showcase':
            return { message: "Loading Tech Showcase", subtext: "Setting up interactive demos..." };
          case '/pricing':
            return { message: "Loading Pricing", subtext: "Calculating your perfect plan..." };
          case '/contact-us':
            return { message: "Loading Contact", subtext: "Preparing contact form..." };
          case '/blog':
            return { message: "Loading Blog", subtext: "Fetching latest articles..." };
          case '/projects':
            return { message: "Loading Projects", subtext: "Displaying our portfolio..." };
          case '/careers':
            return { message: "Loading Careers", subtext: "Finding opportunities..." };
          case '/testimonials':
            return { message: "Loading Testimonials", subtext: "Loading client reviews..." };
          default:
            if (pathname.startsWith('/blog/')) {
              return { message: "Loading Article", subtext: "Preparing blog post..." };
            } else if (pathname.startsWith('/projects/')) {
              return { message: "Loading Project", subtext: "Showcasing project details..." };
            }
            return { message: "Loading Page", subtext: "Initializing components..." };
        }
      };
      
      const { message, subtext } = getLoadingMessage(location.pathname);
      setLoadingMessage(message);
      setLoadingSubtext(subtext);
      
      // Simulate loading time for better UX
      const timer = setTimeout(() => {
        setCurrentPath(location.pathname);
        setIsLoading(false);
      }, 800); // 800ms loading time
      
      return () => clearTimeout(timer);
    }
  }, [location, currentPath]);

  return (
    <PathContext.Provider value={currentPath}>
      <AppWrapper>
        <SubtleBackground />
        <ContentWrapper>
          {/* Hide navbar for images page */}
          {currentPath !== '/images' && <Navbar />}
          {isLoading && (
            <SkeletonLoader 
              key={loadingKey}
              message={loadingMessage} 
              subtext={loadingSubtext} 
            />
          )}
          {!isLoading && (
            <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroImage id="home" />
                  <TechCarousel />
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
            
            {/* Social Media Images Page */}
            <Route path="/images" element={<SocialMediaImages />} />
            
            {/* Our Work Page */}

            
            {/* Projects Page */}
            <Route path="/projects" element={<Projects />} />
            
            {/* Individual Project Pages */}
            <Route path="/projects/hivekey" element={<HivekeyProject />} />
            
            {/* Tech Showcase Page */}
            <Route path="/tech-showcase" element={<TechShowcase />} />
            
            {/* Careers Page */}
            <Route path="/careers" element={<Careers />} />
            
            {/* Pricing Page */}
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Testimonials Page */}
            <Route path="/testimonials" element={<Testimonials />} />
            
            {/* Contact Us Page */}
            <Route path="/contact-us" element={<ContactUs />} />
            
            {/* Blog Page */}
            <Route path="/blog" element={<BlogSection />} />
            
            {/* Individual Blog Post */}
            <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          )}
          {!isLoading && currentPath !== '/images' && <Footer />}
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
