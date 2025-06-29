import React, { useRef } from 'react';
import styled from 'styled-components';
import revolvoLogo from '../assets/revolvo-logo.png';

const PageWrapper = styled.div`
  padding: 40px 20px;
  background: #f5f5f5;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 1440px) {
    transform: scale(0.8);
    transform-origin: top left;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 40px;
  font-size: 2rem;
`;

const ImageContainer = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const ImageDimensions = styled.p`
  color: #666;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const DownloadButton = styled.button`
  background: #fbb604;
  color: #000;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e0a004;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(251, 182, 4, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Facebook/Open Graph Image (1200x630px)
const FacebookImage = styled.div`
  width: 1200px;
  height: 630px;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.6;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  z-index: 2;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-right: 20px;
  filter: drop-shadow(0 8px 25px rgba(251, 182, 4, 0.4));
`;

const MainHeading = styled.h1`
  color: #fff;
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 2px;
`;

const Subheading = styled.h2`
  color: #fff;
  font-size: 2.2rem;
  font-weight: 400;
  margin: 20px 0;
  text-align: center;
  z-index: 2;
  opacity: 0.9;
`;

const TagLine = styled.p`
  color: #fff;
  font-size: 1.4rem;
  margin: 30px 0;
  text-align: center;
  z-index: 2;
  max-width: 800px;
`;

const WebsiteUrl = styled.p`
  color: #fbb604;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 20px 0 0;
  text-align: center;
  z-index: 2;
`;

// Twitter Banner (1500x500px)
const TwitterBanner = styled.div`
  width: 1500px;
  height: 500px;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.8;
  }
`;

const TwitterContent = styled.div`
  flex: 1;
  z-index: 2;
`;

const TwitterTitle = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 2px;
`;

const TwitterSubtitle = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 400;
  margin: 0 0 20px;
  opacity: 0.9;
`;

const TwitterTags = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin: 20px 0;
`;

const TwitterLogo = styled.img`
  width: 140px;
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 8px 25px rgba(251, 182, 4, 0.4));
`;

// LinkedIn Banner (1584x396px)
const LinkedInBanner = styled.div`
  width: 1584px;
  height: 396px;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 35px 35px;
    opacity: 0.7;
  }
`;

const LinkedInContent = styled.div`
  flex: 1;
  z-index: 2;
`;

const LinkedInTitle = styled.h1`
  color: #fff;
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 15px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 2px;
`;

const LinkedInSubtitle = styled.h2`
  color: #fff;
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0 0 15px;
  opacity: 0.9;
`;

const LinkedInLogo = styled.img`
  width: 100px;
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 8px 25px rgba(251, 182, 4, 0.4));
`;

// Google Play Feature Graphic (1024x500px)
const GooglePlayBanner = styled.div`
  width: 1024px;
  height: 500px;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.6;
  }
`;

const GooglePlayContent = styled.div`
  flex: 1;
  z-index: 2;
`;

const GooglePlayTitle = styled.h1`
  color: #fff;
  font-size: 3.2rem;
  font-weight: 700;
  margin: 0 0 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 2px;
`;

const GooglePlaySubtitle = styled.h2`
  color: #fff;
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0 0 15px;
  opacity: 0.9;
`;

const GooglePlayTags = styled.p`
  color: #fff;
  font-size: 1.1rem;
  margin: 15px 0;
`;

const GooglePlayLogo = styled.img`
  width: 120px;
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 8px 25px rgba(251, 182, 4, 0.4));
`;

// Twitter Card Image (1200x600px) - For meta tags, not profile header
const TwitterCardImage = styled.div`
  width: 1200px;
  height: 600px;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.6;
  }
`;

const TwitterCardTitle = styled.h1`
  color: #fff;
  font-size: 3.8rem;
  font-weight: 700;
  margin: 0 0 25px;
  text-align: center;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 2px;
`;

const TwitterCardSubtitle = styled.h2`
  color: #fff;
  font-size: 2rem;
  font-weight: 400;
  margin: 0 0 25px;
  text-align: center;
  z-index: 2;
  opacity: 0.9;
`;

const TwitterCardLogo = styled.img`
  width: 110px;
  height: auto;
  margin-bottom: 20px;
  z-index: 2;
  filter: drop-shadow(0 8px 25px rgba(251, 182, 4, 0.4));
`;

const SocialMediaImages = () => {
  const facebookRef = useRef(null);
  const twitterCardRef = useRef(null);
  const twitterRef = useRef(null);
  const linkedinRef = useRef(null);
  const googlePlayRef = useRef(null);

  const downloadImage = async (elementRef, filename) => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(elementRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again or take a screenshot.');
    }
  };

  return (
    <PageWrapper>
      <Title>Social Media Images - Revolvo Tech</Title>
      
      {/* Facebook/Open Graph Image */}
      <ImageContainer>
        <ImageTitle>Facebook/Open Graph Image</ImageTitle>
        <ImageDimensions>1200x630px - Optimized for Facebook, LinkedIn posts, and general social sharing</ImageDimensions>
        <FacebookImage ref={facebookRef}>
          <LogoContainer>
            <Logo src={revolvoLogo} alt="Revolvo Tech Logo" />
          </LogoContainer>
          <MainHeading>REVOLVO TECH</MainHeading>
          <Subheading>Expert Software Development</Subheading>
          <TagLine>AR/VR • Mobile Apps • Custom Software • AI/ML Solutions</TagLine>
          <WebsiteUrl>revolvo.tech</WebsiteUrl>
        </FacebookImage>
        <DownloadButton onClick={() => downloadImage(facebookRef, 'revolvo-tech-facebook-og.png')}>
          Download Facebook Image (Save as og-image.jpg)
        </DownloadButton>
      </ImageContainer>

      {/* Twitter Card Image - For SEO Meta Tags */}
      <ImageContainer>
        <ImageTitle>Twitter Card Image (SEO Meta Tag)</ImageTitle>
        <ImageDimensions>1200x600px - For twitter:image meta tag and social sharing previews</ImageDimensions>
        <TwitterCardImage ref={twitterCardRef}>
          <TwitterCardLogo src={revolvoLogo} alt="Revolvo Tech Logo" />
          <TwitterCardTitle>REVOLVO TECH</TwitterCardTitle>
          <TwitterCardSubtitle>Expert Software Development Services</TwitterCardSubtitle>
        </TwitterCardImage>
        <DownloadButton onClick={() => downloadImage(twitterCardRef, 'revolvo-tech-twitter-card.png')}>
          Download Twitter Card (Save as twitter-image.jpg)
        </DownloadButton>
      </ImageContainer>

      {/* Twitter Banner */}
      <ImageContainer>
        <ImageTitle>Twitter Header Banner</ImageTitle>
        <ImageDimensions>1500x500px - Perfect for Twitter profile headers</ImageDimensions>
        <TwitterBanner ref={twitterRef}>
          <TwitterContent>
            <TwitterTitle>REVOLVO TECH</TwitterTitle>
            <TwitterSubtitle>Expert Software Development Services</TwitterSubtitle>
            <TwitterTags>#SoftwareDevelopment #AR #VR #MobileApps #AI #TechSolutions</TwitterTags>
          </TwitterContent>
          <TwitterLogo src={revolvoLogo} alt="Revolvo Tech Logo" />
        </TwitterBanner>
        <DownloadButton onClick={() => downloadImage(twitterRef, 'revolvo-tech-twitter-header.png')}>
          Download Twitter Header
        </DownloadButton>
      </ImageContainer>

      {/* LinkedIn Banner */}
      <ImageContainer>
        <ImageTitle>LinkedIn Company Banner</ImageTitle>
        <ImageDimensions>1584x396px - Optimized for LinkedIn company page headers</ImageDimensions>
        <LinkedInBanner ref={linkedinRef}>
          <LinkedInContent>
            <LinkedInTitle>REVOLVO TECH</LinkedInTitle>
            <LinkedInSubtitle>Expert Software Development • AR/VR • Mobile Apps</LinkedInSubtitle>
          </LinkedInContent>
          <LinkedInLogo src={revolvoLogo} alt="Revolvo Tech Logo" />
        </LinkedInBanner>
        <DownloadButton onClick={() => downloadImage(linkedinRef, 'revolvo-tech-linkedin-banner.png')}>
          Download LinkedIn Banner
        </DownloadButton>
      </ImageContainer>

      {/* Google Play Feature Graphic */}
      <ImageContainer>
        <ImageTitle>Google Play Feature Graphic</ImageTitle>
        <ImageDimensions>1024x500px - Feature graphic for Google Play Store app listings</ImageDimensions>
        <GooglePlayBanner ref={googlePlayRef}>
          <GooglePlayContent>
            <GooglePlayTitle>REVOLVO TECH</GooglePlayTitle>
            <GooglePlaySubtitle>Professional Mobile App Development</GooglePlaySubtitle>
            <GooglePlayTags>Custom Apps • Cross-Platform • Native Development</GooglePlayTags>
          </GooglePlayContent>
          <GooglePlayLogo src={revolvoLogo} alt="Revolvo Tech Logo" />
        </GooglePlayBanner>
        <DownloadButton onClick={() => downloadImage(googlePlayRef, 'revolvo-tech-google-play.png')}>
          Download Google Play Image
        </DownloadButton>
      </ImageContainer>

      <div style={{ padding: '40px 0', textAlign: 'center', color: '#666' }}>
        <p><strong>🚀 SEO DEPLOYMENT INSTRUCTIONS:</strong></p>
        <p><strong>CRITICAL for SEO:</strong></p>
        <p>• Download "Facebook Image" → Save as <code>public/og-image.jpg</code> (1200x630px)</p>
        <p>• Download "Twitter Card" → Save as <code>public/twitter-image.jpg</code> (1200x600px)</p>
        <p style={{ marginTop: '20px' }}><strong>Additional Social Media:</strong></p>
        <p>• Twitter Header: Upload to your Twitter profile header section</p>
        <p>• LinkedIn Banner: Upload to your LinkedIn company page header</p>
        <p>• Google Play: Use when publishing mobile apps to Play Store</p>
        <p style={{ marginTop: '20px' }}><strong>Instagram:</strong> Use the Facebook/OG image (1200x630px) - works perfectly for Instagram posts and stories.</p>
        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}><strong>Technical Notes:</strong></p>
        <p>• All images downloaded in high resolution (2x scale) for crisp quality</p>
        <p>• Convert PNG to JPG if needed for smaller file sizes</p>
        <p>• Images maintain your brand colors and professional consistency</p>
      </div>
    </PageWrapper>
  );
};

export default SocialMediaImages; 