import React, { useState, useEffect, useRef } from "react";
import "./HivekeyProject.css";
import hiveKeyLogo from "../assets/HiveKey.png";
import hiveKeyMain from "../assets/HivekeyProject_1.png";
import hiveKeySettings from "../assets/hivekey_settings.png";
import hiveKeyOptions from "../assets/hivekey_options.png";
import windowsLogo from "../assets/windows-11-icon-seeklogo.png";
import playstoreLogo from "../assets/google-play-store-logo-png-transparent.png";

const HivekeyProject = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // This scroll listener handles the title fade-out directly.
    const handleScroll = () => {
      // A very small threshold makes the animation feel instant.
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const contentEl = contentRef.current;
    if (!contentEl) return;

    // This observer continues to handle the content fade-in as before.
    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggle the class to animate in and out
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2 } // A 20% threshold feels good for both appearing and disappearing
    );
    
    const sections = contentEl.querySelectorAll('.animated-section');
    sections.forEach((section) => contentObserver.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      contentObserver.disconnect();
    };
  }, []);

  return (
    <div className="hivekey-page">
      <div className={`title-container ${isScrolled ? "is-fading-out" : ""}`}>
          <h1>
            Unbreakable Passwords, Effortlessly.
          </h1>
      </div>

      <div className="content-container" ref={contentRef}>
        {/* Hero Section */}
        <section className="hero-gradient-background animated-section">
          <div className="hero-content">
            <p className="subtitle">
              <span className="hivekey-gradient-text">HiveKey</span> uses a complex, uncrackable algorithm to generate unique, robust passwords from your key phrase and service name. Security has never been this simple.
            </p>
            
            <div className="hero-image-container">
              <img src={hiveKeyMain} alt="HiveKey Main Interface" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="feature-section animated-section">
            <h2 className="section-title">Custom Password Length</h2>
            <p className="section-subtitle">
              Take control of your security. Easily set your desired password length, from short and sweet to incredibly complex, ensuring maximum protection for every service.
            </p>
            <div className="hero-image-container">
                <img src={hiveKeySettings} alt="HiveKey Password Length Setting" />
            </div>
        </section>
        
        <section className="feature-section animated-section">
            <h2 className="section-title">Enhanced Security Features</h2>
            <div className="hero-image-container" style={{marginBottom: '3rem'}}>
                <img src={hiveKeyOptions} alt="HiveKey Additional Options" />
            </div>
            <ul className="feature-list">
              <li>
                <span className="icon">🔒</span>
                <div>
                  <strong>PIN Protection:</strong> Secure your app with a personal PIN, adding an extra layer of defense against unauthorized access.
                </div>
              </li>
              <li>
                <span className="icon">📋</span>
                <div>
                  <strong>Auto-clear Clipboard:</strong> Your generated passwords are automatically cleared from your clipboard after 30 seconds, preventing accidental exposure.
                </div>
              </li>
              <li>
                <span className="icon">📸</span>
                <div>
                  <strong>Screenshot Protection:</strong> Prevent sensitive information from being captured by screenshots or screen recordings, keeping your data private.
                </div>
              </li>
              <li>
                <span className="icon">🚀</span>
                <div>
                  <strong>High Performance Mode:</strong> Optimize app performance by reducing animations, ensuring a smooth and efficient experience even on older devices.
                </div>
              </li>
            </ul>
        </section>

        <section className="feature-section animated-section">
            <div className="final-cta">
              <h2 className="section-title">Generate Passwords That Defy Brute Force.</h2>
              <p className="section-subtitle">
                HiveKey's advanced algorithm ensures every password is a fortress, impossible to crack or guess, giving you peace of mind.
              </p>
              <div className="hero-buttons">
                <a href="https://revolvotech.s3.us-east-1.amazonaws.com/ih/app/flutter/hivekey/HiveKey.exe" className="hivekey-btn" target="_blank" rel="noopener noreferrer">
                  <img src={windowsLogo} alt="Windows Logo" />
                  Download for Windows
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.revolvotech.hivekey" className="hivekey-btn" target="_blank" rel="noopener noreferrer">
                  <img src={playstoreLogo} alt="Play Store Logo" />
                  Download for Playstore
                </a>
              </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default HivekeyProject;