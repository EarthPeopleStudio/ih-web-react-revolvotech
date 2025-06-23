import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import jhonattanImage from "../assets/Jhonattan Villalobos Escorza_Testimonial.jpg";
import danielaImage from "../assets/Daniela Caraballo_Testimonial.jpg";

const TestimonialsContainer = styled.div`
  padding: var(--spacing-section) 8%;
  background: var(--dark-bg);
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 50px;
  color: var(--text-primary);
`;

const TestimonialCard = styled.div`
  background: var(--dark-card-bg);
  border-radius: 20px;
  padding: 50px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  position: absolute;
  top: 30px;
  left: 40px;
  font-size: 2.5rem;
  color: var(--border-color);
  opacity: 0.8;
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 30px;
  font-style: italic;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthorImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  border: 2px solid var(--border-color);
`;

const AuthorDetails = styled.div`
  text-align: left;
`;

const AuthorName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const AuthorCompany = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

const NavButton = styled.button`
  background: var(--dark-card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
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
    background: var(--card-bg);
    transform: translateY(-3px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const testimonialsData = [
  {
    name: "Jhonattan Villalobos Escorza",
    company: "Zenith Homes",
    quote:
      "I stopped working with or looking for any other developer after Revolvo Tech brought all my ideas to life. They worked quickly and efficiently while maintaining professionalism and delivering a great-looking result. Bring these guys to America! Even Mexico claims them.",
    image: jhonattanImage,
  },
  {
    name: "Daniela Caraballo",
    company: "Fresh Cleaning Luxe, LLC",
    quote:
      "I am thrilled with the website Revolvo Tech created for Fresh Cleaning Luxe LLC. It's beautifully designed, user-friendly, and perfectly captures my brand. Thank you, Revolvo Tech, for your exceptional work!",
    image: danielaImage,
  },
  // { name: "Another Person", ... }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const numTestimonials = testimonialsData.length;

  const switchTestimonial = (newIndex) => {
    if (isSwitching) return;
    setIsSwitching(true);
    setTimeout(() => {
      setCurrent(newIndex);
      setIsSwitching(false);
    }, 400); // Match transition duration
  };

  const nextTestimonial = () => {
    switchTestimonial(current === numTestimonials - 1 ? 0 : current + 1);
  };

  const prevTestimonial = () => {
    switchTestimonial(current === 0 ? numTestimonials - 1 : current - 1);
  };

  if (!numTestimonials) {
    return null;
  }

  const { name, company, quote, image } = testimonialsData[current];

  return (
    <TestimonialsContainer>
      <SectionTitle>What Our Clients Say</SectionTitle>
      <TestimonialCard style={{
        opacity: isSwitching ? 0 : 1,
        transform: isSwitching ? 'translateY(20px)' : 'translateY(0)',
      }}>
        <QuoteIcon />
        <TestimonialText>"{quote}"</TestimonialText>
        <AuthorInfo>
          <AuthorImage src={image} alt={name} />
          <AuthorDetails>
            <AuthorName>{name}</AuthorName>
            <AuthorCompany>{company}</AuthorCompany>
          </AuthorDetails>
        </AuthorInfo>
      </TestimonialCard>

      <NavButtons>
        <NavButton onClick={prevTestimonial} disabled={numTestimonials <= 1 || isSwitching}>
          <FaChevronLeft />
        </NavButton>
        <NavButton onClick={nextTestimonial} disabled={numTestimonials <= 1 || isSwitching}>
          <FaChevronRight />
        </NavButton>
      </NavButtons>
    </TestimonialsContainer>
  );
};

export default Testimonials; 