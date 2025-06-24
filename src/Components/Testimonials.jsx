import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from "react-icons/fa";
import jhonattanImage from "../assets/jhonattan-testimonial.jpg";
import danielaImage from "../assets/daniela-testimonial.jpg";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const TestimonialsContainer = styled.div`
  background: #000000;
  position: relative;
  min-height: 100vh;
  padding: 120px 8% 80px;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-primary);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

// Featured Carousel Section
const FeaturedSection = styled.div`
  margin-bottom: 6rem;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  background: rgba(25, 25, 25, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.6s ease-in-out;
`;

const FeaturedCard = styled.div`
  min-width: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  min-height: 450px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    min-height: 400px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    min-height: 350px;
  }
`;

const FeaturedContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;
`;

const QuoteIconLarge = styled(FaQuoteLeft)`
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.15);
  margin-bottom: 2rem;
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Star = styled(FaStar)`
  color: #ffd700;
  font-size: 1.2rem;
  filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.3));
`;

const FeaturedQuote = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-style: italic;
  max-width: 800px;
  width: 100%;
  text-align: center;

  &::before, &::after {
    content: '"';
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.3);
    font-weight: bold;
  }
`;

const FeaturedAuthorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-top: auto;
`;

const FeaturedAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FeaturedImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
`;

const FeaturedAuthorInfo = styled.div`
  text-align: left;

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const FeaturedName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
`;

const FeaturedCompany = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.2;
`;

// Navigation
const CarouselNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const NavButton = styled.button`
  background: rgba(25, 25, 25, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(35, 35, 35, 0.9);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Indicator = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 
    'rgba(255, 255, 255, 0.8)' : 
    'rgba(255, 255, 255, 0.2)'
  };
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.2);
  }
`;

// Grid Section
const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const TestimonialCard = styled.div`
  background: rgba(25, 25, 25, 0.95);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  display: flex;
  flex-direction: column;
  height: 280px; /* Fixed height for consistency */

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
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
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
`;

const TestimonialTextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  flex: 1;
  overflow-y: auto;
  max-height: 140px; /* Limit height for scrollable area */
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 50px; /* Fixed height for consistency */
  margin-top: auto; /* Push to bottom */
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const AuthorName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
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
        <SectionHeader>
          <SectionTitle>What Our Clients Say</SectionTitle>
          <SectionSubtitle>
            Hear from the amazing clients who trusted us to bring their visions to life
          </SectionSubtitle>
        </SectionHeader>

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
                        <Star key={i} />
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