import { createContext, useEffect, useState, useTransition } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Footer from "./Components/Footer";
import HeroImage from "./Components/HeroImage";
import Navbar from "./Components/Navbar";
import SubtleBackground from "./Components/SubtleBackground";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import CookiePolicy from "./Components/CookiePolicy";
import AboutUs from "./Components/AboutUs";
import SocialMediaImages from "./Components/SocialMediaImages";

import Projects from "./pages/Projects";
import HivekeyProject from "./pages/HivekeyProject";
import MicroNutriProject from "./pages/MicroNutriProject";
import Careers from "./pages/Careers";
import TechShowcase from "./Components/TechShowcase";
import Pricing from "./Components/Pricing";
import Testimonials from "./Components/Testimonials";
import BlogSection from "./Components/BlogSection";
import BlogPost from "./Components/BlogPost";
import TechCarousel from "./Components/TechCarousel";
import SkeletonLoader from "./Components/SkeletonLoader";
import { darkTheme, themeToVars } from "./themes";
import { AnimationProvider } from "./Components/AnimationContext";
import ContactUs from "./Components/ContactUs";
import MobileApp from "./Components/MobileApp";
import CaptchaPage from "./Components/CaptchaPage";
import { useMobile } from "./hooks/useMobile";

// Choreo App Import
import ChoreoApp from "./choreo/ChoreoApp";

// Subdomain Detection
import { SubdomainDetection } from "./utils/subdomainDetection";

// Create a context for the current path
export const PathContext = createContext("/");

// Font Loader Component for different subdomains
const FontLoader = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        if (SubdomainDetection.isChoreoSubdomain()) {
          // Preload Poppins + Figtree for Choreo subdomain
          const choreoFontsExist = document.querySelector(
            'link[href*="Poppins"]'
          );

          if (!choreoFontsExist) {
            // Create preload links for better performance
            const preloadLink1 = document.createElement("link");
            preloadLink1.rel = "preload";
            preloadLink1.as = "font";
            preloadLink1.type = "font/woff2";
            preloadLink1.href =
              "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2";
            preloadLink1.crossOrigin = "anonymous";
            document.head.appendChild(preloadLink1);

            const preloadLink2 = document.createElement("link");
            preloadLink2.rel = "preload";
            preloadLink2.as = "font";
            preloadLink2.type = "font/woff2";
            preloadLink2.href =
              "https://fonts.gstatic.com/s/figtree/v5/_Xmq-H4zszafZw3A-KPSZutNxgKQu_avAg.woff2";
            preloadLink2.crossOrigin = "anonymous";
            document.head.appendChild(preloadLink2);

            // Create stylesheet link
            const link = document.createElement("link");
            link.href =
              "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Figtree:wght@300;400;500;600;700&display=swap";
            link.rel = "stylesheet";
            link.id = "choreo-fonts";

            // Wait for fonts to load before setting font family
            link.onload = () => {
              document.documentElement.style.setProperty(
                "--font-family-default",
                '"Figtree", sans-serif'
              );
              setFontsLoaded(true);
            };

            document.head.appendChild(link);
          } else {
            // Fonts already exist, set font family immediately
            document.documentElement.style.setProperty(
              "--font-family-default",
              '"Figtree", sans-serif'
            );
            setFontsLoaded(true);
          }
        } else {
          // Preload Montserrat for main Revolvo site
          const montserratExists = document.querySelector(
            'link[href*="Montserrat"]'
          );

          if (!montserratExists) {
            // Create preload link for better performance
            const preloadLink = document.createElement("link");
            preloadLink.rel = "preload";
            preloadLink.as = "font";
            preloadLink.type = "font/woff2";
            preloadLink.href =
              "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXp-obK4ALg.woff2";
            preloadLink.crossOrigin = "anonymous";
            document.head.appendChild(preloadLink);

            // Create stylesheet link
            const link = document.createElement("link");
            link.href =
              "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap";
            link.rel = "stylesheet";
            link.id = "revolvo-fonts";

            // Wait for fonts to load before setting font family
            link.onload = () => {
              document.documentElement.style.setProperty(
                "--font-family-default",
                '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              );
              setFontsLoaded(true);
            };

            document.head.appendChild(link);
          } else {
            // Fonts already exist, set font family immediately
            document.documentElement.style.setProperty(
              "--font-family-default",
              '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            );
            setFontsLoaded(true);
          }
        }

        // Use Font Loading API if available for better control
        if ("fonts" in document) {
          const fontPromises = [];

          if (SubdomainDetection.isChoreoSubdomain()) {
            fontPromises.push(
              new FontFace(
                "Figtree",
                "url(https://fonts.gstatic.com/s/figtree/v5/_Xmq-H4zszafZw3A-KPSZutNxgKQu_avAg.woff2)"
              ).load(),
              new FontFace(
                "Poppins",
                "url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2)"
              ).load()
            );
          } else {
            fontPromises.push(
              new FontFace(
                "Montserrat",
                "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXp-obK4ALg.woff2)"
              ).load()
            );
          }

          await Promise.all(fontPromises);
          setFontsLoaded(true);
        }
      } catch (error) {
        console.warn("Font loading failed, using fallback fonts:", error);
        setFontsLoaded(true); // Still render with fallback fonts
      }
    };

    loadFonts();

    // Cleanup function
    return () => {
      // Reset font family when component unmounts
      document.documentElement.style.removeProperty("--font-family-default");
    };
  }, []);

  // Add transition for smoother font loading
  const fontLoadingStyle = {
    transition: fontsLoaded ? "font-family 0.3s ease" : "none",
    visibility: fontsLoaded ? "visible" : "hidden",
  };

  return <div style={fontLoadingStyle}>{children}</div>;
};

FontLoader.propTypes = {
  children: PropTypes.node.isRequired,
};

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
  const [loadingSubtext, setLoadingSubtext] = useState(
    "Initializing components..."
  );
  const [loadingKey, setLoadingKey] = useState(0);
  const { isMobile } = useMobile();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Show loading when route changes
    if (currentPath !== location.pathname) {
      setIsLoading(true);
      setLoadingKey((prev) => prev + 1); // Force skeleton reset on each navigation

      // Set custom loading messages based on route
      const getLoadingMessage = (pathname) => {
        switch (pathname) {
          case "/":
            return {
              message: "Loading Home",
              subtext: "Initializing 3D experience...",
            };
          case "/about-us":
            return {
              message: "Loading About Us",
              subtext: "Preparing team information...",
            };
          case "/images":
            return {
              message: "Loading Social Images",
              subtext: "Preparing brand assets...",
            };
          case "/tech-showcase":
            return {
              message: "Loading Tech Showcase",
              subtext: "Setting up interactive demos...",
            };
          case "/pricing":
            return {
              message: "Loading Pricing",
              subtext: "Calculating your perfect plan...",
            };
          case "/contact-us":
            return {
              message: "Loading Contact",
              subtext: "Preparing contact form...",
            };
          case "/blog":
            return {
              message: "Loading Blog",
              subtext: "Fetching latest articles...",
            };
          case "/projects":
            return {
              message: "Loading Projects",
              subtext: "Displaying our portfolio...",
            };
          case "/careers":
            return {
              message: "Loading Careers",
              subtext: "Finding opportunities...",
            };
          case "/testimonials":
            return {
              message: "Loading Testimonials",
              subtext: "Loading client reviews...",
            };
          default:
            if (pathname.startsWith("/blog/")) {
              return {
                message: "Loading Article",
                subtext: "Preparing blog post...",
              };
            } else if (pathname.startsWith("/projects/")) {
              return {
                message: "Loading Project",
                subtext: "Showcasing project details...",
              };
            }
            return {
              message: "Loading Page",
              subtext: "Initializing components...",
            };
        }
      };

      const { message, subtext } = getLoadingMessage(location.pathname);
      setLoadingMessage(message);
      setLoadingSubtext(subtext);

      // Use React transition for smoother navigation
      startTransition(() => {
        // Simulate loading time with optimized approach
        const loadingDuration = 600; // Reduced from 800ms

        const timer = setTimeout(() => {
          setCurrentPath(location.pathname);
          setIsLoading(false);
        }, loadingDuration);

        return () => clearTimeout(timer);
      });
    }
  }, [location, currentPath, startTransition]);

  // Combine isPending with isLoading for better UX
  const showLoading = isLoading || isPending;

  // If mobile, render the mobile app
  if (isMobile) {
    return (
      <PathContext.Provider value={currentPath}>
        <MobileApp />
      </PathContext.Provider>
    );
  }

  return (
    <PathContext.Provider value={currentPath}>
      <AppWrapper>
        <SubtleBackground />
        <ContentWrapper>
          {/* Hide navbar for images page */}
          {currentPath !== "/images" && <Navbar />}
          {showLoading && (
            <SkeletonLoader
              key={loadingKey}
              message={loadingMessage}
              subtext={loadingSubtext}
            />
          )}
          {!showLoading && (
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
              <Route path="/projects/micronutri" element={<MicroNutriProject />} />

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

              {/* Captcha Verification Page */}
              <Route path="/auth/captcha" element={<CaptchaPage />} />

              {/* Blog Page */}
              <Route path="/blog" element={<BlogSection />} />

              {/* Individual Blog Post */}
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          )}
          {!showLoading && currentPath !== "/images" && <Footer />}
        </ContentWrapper>
      </AppWrapper>
    </PathContext.Provider>
  );
};

// Main App Router Component
const AppRouter = () => {
  const [appType, setAppType] = useState("main");

  useEffect(() => {
    // Determine app type based on subdomain
    const detectedAppType = SubdomainDetection.getAppType();
    setAppType(detectedAppType);

    // Log environment info in development
    if (import.meta.env.DEV) {
      const config = SubdomainDetection.getEnvironmentConfig();
      console.log("Subdomain Detection:", config);
    }
  }, []);

  // Route to appropriate app based on subdomain
  switch (appType) {
    case "choreo":
      return <ChoreoApp />;

    case "admin":
      // Future admin app would go here
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "var(--dark-bg)",
            color: "var(--text-primary)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Admin Portal</h1>
            <p>Coming Soon</p>
            <p
              style={{
                marginTop: "2rem",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
              }}
            >
              Access admin.revolvo.tech for the admin dashboard
            </p>
          </div>
        </div>
      );

    default:
      // Main Revolvo website
      return (
        <Router>
          <AppContent />
        </Router>
      );
  }
};

function App() {
  return (
    <HelmetProvider>
      <AnimationProvider>
        <FontLoader>
          <AppRouter />
        </FontLoader>
      </AnimationProvider>
    </HelmetProvider>
  );
}

export default App;
