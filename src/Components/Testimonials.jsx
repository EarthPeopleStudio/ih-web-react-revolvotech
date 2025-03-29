import React, { useState } from "react";
import styled from "styled-components";

const TestimonialsWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-primary);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 60px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const Tab = styled.button`
  padding: 14px 20px;
  border: none;
  background: ${(props) => (props.active ? "rgba(255, 84, 112, 0.15)" : "transparent")};
  color: ${(props) => (props.active ? "var(--text-primary)" : "var(--text-secondary)")};
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    background: ${(props) => (props.active ? "rgba(255, 84, 112, 0.15)" : "rgba(255, 255, 255, 0.05)")};
    color: var(--text-primary);
  }

  ${(props) => props.active && `
    &:after {
      content: "";
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background: #ff5470;
      border-radius: 2px;
    }
  `}
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
`;

const TestimonialCard = styled.div`
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
`;

const PersonImageContainer = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
`;

const PersonImage = styled.img`
  width: 100%;
  height: calc(100% + 20px);
  object-fit: cover;
  object-position: top center;
  transform: translateY(-20px);
  transition: transform 0.5s ease;
`;

const TestimonialContent = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PersonName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: var(--text-primary);
`;

const PersonRole = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 15px 0;
`;

const TestimonialText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

const ReadMoreButton = styled.button`
  background: transparent;
  border: none;
  color: var(--highlight);
  font-size: 0.9rem;
  padding: 5px 0;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 600;
  align-self: flex-start;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  position: relative;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: var(--text-primary);
  font-size: 1.2rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 84, 112, 0.2);
    transform: rotate(90deg);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

const ModalBody = styled.div`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
`;

const RegionSection = styled.div`
  margin-top: 80px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
`;

const RegionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--text-primary);
  text-align: center;
`;

const RegionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const RegionCard = styled.div`
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const RegionName = styled.h3`
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const RegionCities = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  
  const testimonialCategories = [
    "All",
    "Websites",
    "Mobile Apps",
    "UI/UX",
    "Games",
    "AI Solutions",
    "SEO/Content"
  ];

  const testimonials = [
    {
      id: 1,
      name: "Richard Johnson",
      position: "CEO, TechStart Inc",
      text: "Working with this team was truly exceptional. Their innovative approach and attention to detail helped us launch our product ahead of schedule. The results have been phenomenal, with user engagement exceeding our targets by 150%.",
      category: "Websites",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Sarah Chen",
      position: "Marketing Director, GameOn",
      text: "I'm incredibly impressed with the quality of work and professionalism. The team took our vague concept and transformed it into a beautiful, functional design that perfectly represents our brand. The attention to detail was remarkable.",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      position: "Founder, HealthTrack",
      text: "Our mobile app project was handled with incredible professionalism. The team delivered a polished, user-friendly application that our customers love. The analytics integration has provided us with valuable insights we never had before.",
      category: "Mobile Apps",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Emma Williams",
      position: "Product Manager, EduLearn",
      text: "The cross-platform solution built for us has streamlined our operations significantly. Now we can reach students on any device with a consistent experience. Development was smooth and the support afterward has been outstanding.",
      category: "Websites",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      name: "James Peterson",
      position: "CTO, Predictive Solutions",
      text: "Implementing AI into our customer service was a game-changer. The team built a custom solution that reduced our response times by 70% while maintaining a personal touch that our customers appreciate.",
      category: "AI Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      name: "Diana Rodriguez",
      position: "Creative Director, Brand Innovators",
      text: "The UI/UX redesign of our application was exactly what we needed. The designers understood our vision immediately and created an interface that not only looks beautiful but has measurably improved user engagement and retention.",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 7,
      name: "Robert Smith",
      position: "E-commerce Manager, Global Retail",
      text: "After the SEO optimization and content strategies were implemented, our organic traffic increased by 150% in just three months. The content created perfectly captures our brand voice while driving conversions.",
      category: "SEO/Content",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      name: "Linda Thomas",
      position: "Project Manager, Enterprise Solutions",
      text: "The web application developed has revolutionized how we manage our internal processes. The team was responsive, detail-oriented, and delivered exactly what we needed within our tight deadline.",
      category: "Websites",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 9,
      name: "Ali Hassan",
      position: "CTO, TechLabs Pakistan",
      text: "The development team understands our local market needs perfectly while delivering international-quality code. Our website's performance metrics have improved significantly, and we've seen a 120% increase in user retention.",
      category: "Websites",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 10,
      name: "Fatima Akhtar",
      position: "Product Lead, FinTech Solutions",
      text: "Our mobile banking application needed complex security features while maintaining a simple user experience. The team delivered exactly what we needed, and our app has received excellent reviews for both security and usability.",
      category: "Mobile Apps",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 11,
      name: "Zain Ahmed",
      position: "Founder, ZA Interactive",
      text: "As a startup in the competitive gaming industry, we needed to stand out. The game development expertise provided was exceptional - our first release has already garnered over 500,000 downloads and impressive retention metrics.",
      category: "Games",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 12,
      name: "Sophia Martinez",
      position: "Game Director, Nexus Entertainment",
      text: "Our studio had ambitious plans for our open-world RPG. The development support we received was top-notch, helping us implement complex game mechanics and optimize performance across platforms. The final product exceeded our expectations.",
      category: "Games",
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 13,
      name: "Hiroshi Tanaka",
      position: "Lead Developer, Tokyo Game Works",
      text: "Finding specialized talent for our unique game concept was challenging until we worked with this team. They quickly grasped our vision and technical requirements, delivering excellent animation systems and core gameplay loops on schedule.",
      category: "Games",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 14,
      name: "Lucas Andersson",
      position: "CEO, Nordic Pixel Games",
      text: "The augmented reality components developed for our mobile game were cutting-edge and performed flawlessly across devices. User engagement metrics have been outstanding, with session times averaging 3x industry standards.",
      category: "Games",
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredTestimonials = activeTab === "All"
    ? testimonials
    : testimonials.filter(testimonial => testimonial.category === activeTab);

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
    document.body.style.overflow = 'auto';
  };

  const regions = [
    {
      name: "United States",
      cities: "Silicon Valley • New York • Texas"
    },
    {
      name: "United Kingdom",
      cities: "London • Manchester • Edinburgh"
    },
    {
      name: "Europe",
      cities: "Berlin • Amsterdam • Paris"
    },
    {
      name: "Australia",
      cities: "Sydney • Melbourne • Brisbane"
    },
    {
      name: "UAE & Middle East",
      cities: "Dubai • Abu Dhabi • Doha"
    }
  ];

  return (
    <TestimonialsWrapper>
      <Title>What People say about us</Title>
      <Subtitle>
        Hear directly from our clients about their experiences working with us.
        Their success stories reflect our commitment to delivering exceptional results.
      </Subtitle>

      <TabsContainer>
        {testimonialCategories.map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabsContainer>

      <TestimonialsGrid>
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id}>
            <PersonImageContainer>
              <PersonImage src={testimonial.image} alt={testimonial.name} />
            </PersonImageContainer>
            <TestimonialContent>
              <PersonName>{testimonial.name}</PersonName>
              <PersonRole>{testimonial.position}</PersonRole>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <ReadMoreButton onClick={() => openModal(testimonial)}>
                Read More
              </ReadMoreButton>
            </TestimonialContent>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>

      {selectedTestimonial && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
            <ModalHeader>
              <ModalAvatar src={selectedTestimonial.image} alt={selectedTestimonial.name} />
              <div>
                <PersonName>{selectedTestimonial.name}</PersonName>
                <PersonRole>{selectedTestimonial.position}</PersonRole>
              </div>
            </ModalHeader>
            <ModalBody>
              {selectedTestimonial.text}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      <RegionSection>
        <RegionTitle>Global Reach, Local Understanding</RegionTitle>
        <RegionDescription>
          Our remote development teams work with clients worldwide, delivering exceptional results across these key regions:
        </RegionDescription>
        
        <RegionGrid>
          {regions.map((region, index) => (
            <RegionCard key={index}>
              <RegionName>{region.name}</RegionName>
              <RegionCities>{region.cities}</RegionCities>
            </RegionCard>
          ))}
        </RegionGrid>
      </RegionSection>
    </TestimonialsWrapper>
  );
};

export default Testimonials; 