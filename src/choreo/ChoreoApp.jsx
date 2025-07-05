import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { darkTheme, themeToVars } from "../themes";
import { AnimationProvider } from "../Components/AnimationContext";

// Choreo Components
import ChoreoNavbar from "./components/ChoreoNavbar";
import ChoreoFooter from "./components/ChoreoFooter";
import AuthProvider from "./context/AuthContext";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import VerifyPage from "./pages/auth/VerifyPage";
import ResetPage from "./pages/auth/ResetPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";

// App Pages
import MarketPage from "./pages/MarketPage";
import OnboardingPage from "./pages/OnboardingPage";
import ExplorePage from "./pages/ExplorePage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";

// Create a context for the current path
export const ChoreoPathContext = createContext("/");

const ChoreoAppWrapper = styled.div`
  ${() => themeToVars(darkTheme)}
  background-color: var(--dark-bg);
  position: relative;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  background: transparent;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 70px; // Account for fixed navbar
`;

// This component handles routing inside the Router
const ChoreoAppContent = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Handle route changes
    if (currentPath !== location.pathname) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setCurrentPath(location.pathname);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location, currentPath]);

  return (
    <ChoreoPathContext.Provider value={currentPath}>
      <ChoreoAppWrapper>
        <Helmet>
          <title>Choreo - Revolvo Tech</title>
          <meta
            name="description"
            content="Choreo by Revolvo - Next generation mobile app platform"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* App Link Meta Tags */}
          <meta name="apple-itunes-app" content="app-id=YOUR_APP_ID" />
          <meta name="google-play-app" content="app-id=YOUR_PACKAGE_NAME" />

          {/* Deep Link Support */}
          <link rel="alternate" href="android-app://YOUR_PACKAGE_NAME" />
          <link rel="alternate" href="ios-app://YOUR_APP_ID" />
        </Helmet>

        <ContentWrapper>
          <ChoreoNavbar />

          <MainContent>
            <Routes>
              {/* Home/Landing */}
              <Route path="/" element={<HomePage />} />

              {/* Authentication Routes */}
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/verify" element={<VerifyPage />} />
              <Route path="/auth/reset" element={<ResetPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />

              {/* Direct Link Routes for Deep Linking */}
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/reset" element={<ResetPage />} />

              {/* App Routes */}
              <Route path="/market" element={<MarketPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Catch all route - redirect to home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </MainContent>

          <ChoreoFooter />
        </ContentWrapper>
      </ChoreoAppWrapper>
    </ChoreoPathContext.Provider>
  );
};

function ChoreoApp() {
  return (
    <HelmetProvider>
      <AnimationProvider>
        <AuthProvider>
          <Router>
            <ChoreoAppContent />
          </Router>
        </AuthProvider>
      </AnimationProvider>
    </HelmetProvider>
  );
}

export default ChoreoApp;
