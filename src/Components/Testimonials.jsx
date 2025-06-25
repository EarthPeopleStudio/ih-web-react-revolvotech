import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar, FaUsers, FaHeart, FaTrophy } from "react-icons/fa";
import jhonattanImage from "../assets/jhonattan-testimonial.jpg";
import danielaImage from "../assets/daniela-testimonial.jpg";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(-60px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideRight = keyframes`
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const TestimonialsContainer = styled.div`
  background: #000000;
  position: relative;
  min-height: 100vh;
  padding: 120px 8% 80px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    right: 10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 235, 59, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    left: 15%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
`;

const SectionTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #ffffff 0%, #FFEB3B 40%, #fbb604 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SectionSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 60px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const StatCard = styled.div`
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(255, 235, 59, 0.2);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.05), rgba(251, 182, 4, 0.03));
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-15px);
    border-color: rgba(255, 235, 59, 0.5);
    box-shadow: 0 20px 40px rgba(255, 235, 59, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #FFEB3B;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.3));
`;

const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #FFEB3B, #fbb604);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
`;

// Enhanced Featured Carousel Section
const FeaturedSection = styled.div`
  margin-bottom: 80px;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(255, 235, 59, 0.2);
  backdrop-filter: blur(15px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`;

const FeaturedCard = styled.div`
  min-width: 100%;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  box-sizing: border-box;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.03), rgba(0, 212, 255, 0.02));
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
    min-height: 450px;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
    min-height: 400px;
  }
`;

const FeaturedContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
`;

const QuoteIconLarge = styled(FaQuoteLeft)`
  font-size: 3rem;
  color: rgba(255, 235, 59, 0.2);
  margin-bottom: 30px;
  filter: drop-shadow(0 0 20px rgba(255, 235, 59, 0.1));
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 30px;
`;

const Star = styled(FaStar)`
  color: #FFEB3B;
  font-size: 1.4rem;
  filter: drop-shadow(0 0 8px rgba(255, 235, 59, 0.4));
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const FeaturedQuote = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-style: italic;
  max-width: 900px;
  width: 100%;
  text-align: center;
  position: relative;

  &::before, &::after {
    content: '"';
    font-size: 2.2rem;
    color: #FFEB3B;
    font-weight: bold;
    position: absolute;
  }
  
  &::before {
    top: -10px;
    left: -20px;
  }
  
  &::after {
    bottom: -20px;
    right: -20px;
  }
`;

const FeaturedAuthorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  margin-top: auto;
  position: relative;
  z-index: 1;
`;

const FeaturedAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: rgba(25, 25, 25, 0.6);
  padding: 20px 30px;
  border-radius: 16px;
  border: 1px solid rgba(255, 235, 59, 0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
    padding: 20px;
  }
`;

const FeaturedImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 235, 59, 0.3);
  flex-shrink: 0;
  filter: drop-shadow(0 0 15px rgba(255, 235, 59, 0.2));
`;

const FeaturedAuthorInfo = styled.div`
  text-align: left;

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const FeaturedName = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #FFEB3B, #fbb604);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 5px 0;
  line-height: 1.2;
`;

const FeaturedCompany = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.2;
`;

// Enhanced Navigation
const CarouselNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
`;

const NavButton = styled.button`
  background: linear-gradient(135deg, rgba(255, 235, 59, 0.1), rgba(251, 182, 4, 0.08));
  border: 1px solid rgba(255, 235, 59, 0.3);
  color: #FFEB3B;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.2), rgba(251, 182, 4, 0.15));
    border-color: rgba(255, 235, 59, 0.6);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 25px rgba(255, 235, 59, 0.2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 
    'linear-gradient(135deg, #FFEB3B, #fbb604)' : 
    'rgba(255, 255, 255, 0.2)'
  };
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: ${props => props.active ? 
    '0 0 15px rgba(255, 235, 59, 0.4)' : 
    'none'
  };

  &:hover {
    background: linear-gradient(135deg, #FFEB3B, #fbb604);
    transform: scale(1.3);
    box-shadow: 0 0 15px rgba(255, 235, 59, 0.4);
  }
`;

// Enhanced Grid Section
const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const TestimonialCard = styled.div`
  background: rgba(25, 25, 25, 0.6);
  border-radius: 20px;
  padding: 35px;
  border: 1px solid rgba(255, 235, 59, 0.2);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  display: flex;
  flex-direction: column;
  height: 320px;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.05), rgba(251, 182, 4, 0.03));
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(255, 235, 59, 0.5);
    box-shadow: 0 20px 40px rgba(255, 235, 59, 0.1);
    
    &::before {
      opacity: 1;
    }
  }

  &:nth-child(even) {
    animation: ${slideRight} 0.8s ease-out;
    animation-delay: ${props => props.delay || '0s'};
    animation-fill-mode: both;
  }

  &:nth-child(odd) {
    animation: ${slideLeft} 0.8s ease-out;
    animation-delay: ${props => props.delay || '0s'};
    animation-fill-mode: both;
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  font-size: 1.4rem;
  color: rgba(255, 235, 59, 0.3);
  margin-bottom: 20px;
  filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.2));
`;

const TestimonialTextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
`;

const TestimonialText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
  flex: 1;
  overflow-y: auto;
  max-height: 160px;
  
  /* Enhanced scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #FFEB3B, #fbb604);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #f99b04, #FFEB3B);
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 60px;
  margin-top: auto;
  background: rgba(25, 25, 25, 0.4);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 235, 59, 0.1);
  position: relative;
  z-index: 1;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 235, 59, 0.3);
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.2));
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const AuthorName = styled.p`
  font-size: 1.05rem;
  font-weight: 600;
  background: linear-gradient(135deg, #FFEB3B, #fbb604);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 3px 0;
  line-height: 1.2;
`;

const AuthorCompany = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.2;
`;

const testimonialsData = [
  {
    name: "Jhonattan Villalobos Escorza",
    company: "Zenith Homes",
    quote: "I stopped working with or looking for any other developer after Revolvo Tech brought all my ideas to life. They worked quickly and efficiently while maintaining professionalism and delivering a great-looking result. Bring these guys to America! Even Mexico claims them.",
    image: jhonattanImage,
    rating: 5,
    featured: true,
  },
  {
    name: "Daniela Caraballo",
    company: "Fresh Cleaning Luxe, LLC",
    quote: "I am thrilled with the website Revolvo Tech created for Fresh Cleaning Luxe LLC. It's beautifully designed, user-friendly, and perfectly captures my brand. Thank you, Revolvo Tech, for your exceptional work!",
    image: danielaImage,
    rating: 5,
    featured: true,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const featuredTestimonials = testimonialsData.filter(t => t.featured);
  const numTestimonials = featuredTestimonials.length;

  const stats = [
    { icon: <FaUsers />, number: "30+", label: "Happy Clients" },
    { icon: <FaStar />, number: "5.0", label: "Average Rating" },
    { icon: <FaTrophy />, number: "100%", label: "Success Rate" },
    { icon: <FaHeart />, number: "95%", label: "Client Retention" }
  ];

  const nextTestimonial = () => {
    setCurrent(prev => (prev + 1) % numTestimonials);
  };

  const prevTestimonial = () => {
    setCurrent(prev => (prev - 1 + numTestimonials) % numTestimonials);
  };

  const goToTestimonial = (index) => {
    setCurrent(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || numTestimonials <= 1) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, numTestimonials]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!numTestimonials) {
    return <div>No testimonials found</div>;
  }

  return (
    <TestimonialsContainer>
      <ContentWrapper>
        <HeroSection>
          <SectionTitle>Client Success Stories</SectionTitle>
          <SectionSubtitle>
            Discover how we've transformed businesses and exceeded expectations through innovative 
            digital solutions. Our clients' success is our greatest achievement.
          </SectionSubtitle>
          
          <StatsContainer>
            {stats.map((stat, index) => (
              <StatCard key={index} delay={`${index * 0.2}s`}>
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsContainer>
        </HeroSection>

        <FeaturedSection>
          <CarouselWrapper 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContainer
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {featuredTestimonials.map((testimonial, index) => (
                <FeaturedCard key={index}>
                  <FeaturedContent>
                    <QuoteIconLarge />
                    <StarsContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} delay={`${i * 0.1}s`} />
                      ))}
                    </StarsContainer>
                    <FeaturedQuote>{testimonial.quote}</FeaturedQuote>
                  </FeaturedContent>
                  <FeaturedAuthorSection>
                    <FeaturedAuthor>
                      <FeaturedImage src={testimonial.image} alt={testimonial.name} />
                      <FeaturedAuthorInfo>
                        <FeaturedName>{testimonial.name}</FeaturedName>
                        <FeaturedCompany>{testimonial.company}</FeaturedCompany>
                      </FeaturedAuthorInfo>
                    </FeaturedAuthor>
                  </FeaturedAuthorSection>
                </FeaturedCard>
              ))}
            </CarouselContainer>
          </CarouselWrapper>

          <CarouselNavigation>
            <NavButton onClick={prevTestimonial} disabled={numTestimonials <= 1}>
              <FaChevronLeft />
            </NavButton>
            
            <IndicatorContainer>
              {featuredTestimonials.map((_, index) => (
                <Indicator
                  key={index}
                  active={index === current}
                  onClick={() => goToTestimonial(index)}
                />
              ))}
            </IndicatorContainer>
            
            <NavButton onClick={nextTestimonial} disabled={numTestimonials <= 1}>
              <FaChevronRight />
            </NavButton>
          </CarouselNavigation>
        </FeaturedSection>

        <TestimonialGrid>
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} delay={`${index * 0.2}s`}>
              <QuoteIcon />
              <TestimonialTextContainer>
                <TestimonialText>"{testimonial.quote}"</TestimonialText>
              </TestimonialTextContainer>
              <AuthorInfo>
                <AuthorImage src={testimonial.image} alt={testimonial.name} />
                <AuthorDetails>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorCompany>{testimonial.company}</AuthorCompany>
                </AuthorDetails>
              </AuthorInfo>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </ContentWrapper>
    </TestimonialsContainer>
  );
};

export default Testimonials; 