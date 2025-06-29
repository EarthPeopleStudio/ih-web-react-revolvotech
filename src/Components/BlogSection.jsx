import React, { useState, useEffect } from "react";
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaCalendar, FaUser, FaArrowRight, FaTags, FaClock, FaChevronRight, FaCode, FaBrain, FaMobile } from 'react-icons/fa';
import SEOHead from './SEOHead';

const circuitPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(251, 182, 4, 0);
    opacity: 0.7;
  }
  50% { 
    box-shadow: 0 0 0 6px rgba(251, 182, 4, 0.15);
    opacity: 1;
  }
`;

const circuitFlow = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
`;

const digitalFlicker = keyframes`
  0%, 100% { opacity: 1; }
  2% { opacity: 0.8; }
  4% { opacity: 1; }
  6% { opacity: 0.9; }
  8% { opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const BlogWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 20% 30%, rgba(251, 182, 4, 0.04) 2px, transparent 2px),
      radial-gradient(circle at 80% 70%, rgba(251, 182, 4, 0.03) 2px, transparent 2px),
      radial-gradient(circle at 40% 80%, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 50px 50px, 50px 50px, 100px 100px, 120px 120px, 80px 80px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
`;

const CircuitGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(251, 182, 4, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251, 182, 4, 0.03) 1px, transparent 1px),
    linear-gradient(45deg, transparent 48%, rgba(251, 182, 4, 0.01) 49%, rgba(251, 182, 4, 0.01) 51%, transparent 52%);
  background-size: 40px 40px, 40px 40px, 80px 80px;
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #FFEB3B 0%, #FFD700 50%, #FFEB3B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  letter-spacing: -0.01em;
  line-height: 1.2;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 48px;
  max-width: 700px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 36px;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  padding: 8px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: visible;
  border: 1px solid rgba(251, 182, 4, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  flex-wrap: wrap;
  backdrop-filter: blur(15px);
  z-index: 100;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 30px 30px, 30px 30px, 15px 15px, 20px 20px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 6px;
    height: 6px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const CategoryButton = styled.button`
  padding: 14px 20px;
  border: none;
  background: ${(props) => (props.active ? "rgba(251, 182, 4, 0.15)" : "transparent")};
  color: ${(props) => (props.active ? "#fbb604" : "var(--text-secondary)")};
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  pointer-events: auto;
  
  &:hover {
    background: ${(props) => (props.active ? "rgba(251, 182, 4, 0.15)" : "rgba(251, 182, 4, 0.05)")};
    color: ${(props) => (props.active ? "#fbb604" : "#f99b04")};
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
      background: #fbb604;
      border-radius: 2px;
    }
  `}
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
  position: relative;
  z-index: 1;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
  }
`;

const BlogCard = styled.div`
  background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(25, 25, 30, 0.95));
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(251, 182, 4, 0.3);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(251, 182, 4, 0.1);
  backdrop-filter: blur(15px);
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  cursor: pointer;
  max-width: 600px;
  justify-self: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 30% 40%, rgba(251, 182, 4, 0.04) 2px, transparent 2px),
      radial-gradient(circle at 70% 60%, rgba(251, 182, 4, 0.03) 1px, transparent 1px);
    background-size: 30px 30px, 30px 30px, 60px 60px, 40px 40px;
    opacity: 0.7;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 10px;
    height: 10px;
    background: rgba(251, 182, 4, 0.6);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 3;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: rgba(251, 182, 4, 0.6);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(251, 182, 4, 0.3),
      0 0 30px rgba(251, 182, 4, 0.2);
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const BlogImage = styled.div`
  height: 250px;
  background: ${props => props.image ? 
    `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${props.image})` : 
    'linear-gradient(135deg, rgba(251, 182, 4, 0.15), rgba(251, 182, 4, 0.08), rgba(15, 15, 20, 0.9))'};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(0, 0, 0, 0.3));
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(251, 182, 4, 0.3), transparent);
    animation: ${circuitFlow} 3s ease-in-out infinite;
    z-index: 2;
  }

  ${props => !props.image && `
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      border: 2px solid rgba(251, 182, 4, 0.3);
      border-radius: 12px;
      z-index: 3;
    }
  `}
`;

const BlogIcon = styled.div`
  font-size: 3.5rem;
  opacity: 0.4;
  color: #fbb604;
  z-index: 4;
  position: relative;
`;

const BlogContent = styled.div`
  padding: 35px;
  position: relative;
  z-index: 2;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;

  svg {
    color: #fbb604;
    font-size: 0.85rem;
  }
`;

const CategoryBadge = styled.span`
  background: linear-gradient(135deg, #fbb604, #f59e0b);
  color: #000;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(251, 182, 4, 0.3);
`;

const BlogCardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.4;
  color: #fbb604;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
`;

const BlogExcerpt = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreButton = styled.button`
  background: linear-gradient(135deg, #fbb604, #f59e0b);
  color: #000;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(251, 182, 4, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(251, 182, 4, 0.5);
    filter: brightness(1.1);

    &::before {
      left: 100%;
    }
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const NewsletterSection = styled.div`
  background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(25, 25, 30, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 24px;
  padding: 60px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.03) 2px, transparent 2px);
    background-size: 25px 25px, 25px 25px, 50px 50px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }
  
  &:hover {
    border-color: rgba(251, 182, 4, 0.5);
    box-shadow: 0 30px 60px rgba(251, 182, 4, 0.2);
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 40px 25px;
  }
`;

const NewsletterTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fbb604;
  text-align: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 18px;
  }
`;

const NewsletterText = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: 35px;
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

const NewsletterButton = styled.button`
  background: linear-gradient(135deg, #FFEB3B 0%, #fbb604 100%);
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 18px 40px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(251, 182, 4, 0.3);
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 35px rgba(251, 182, 4, 0.4);
    filter: brightness(1.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    border: 2px dashed rgba(251, 182, 4, 0.2);
    border-radius: 20px;
    z-index: 0;
  }
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 25px;
  opacity: 0.3;
  position: relative;
  z-index: 1;
`;

const EmptyTitle = styled.h3`
  color: #fbb604;
  margin-bottom: 15px;
  font-size: 1.8rem;
  position: relative;
  z-index: 1;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", "Development", "Business"];

  const blogPosts = [
    {
      id: 1,
      title: "Offshore Software Development: Cost-Effective Enterprise Solutions for US & Australia",
      excerpt: "Discover how offshore development can slash costs by 50-60% while delivering cutting-edge web, mobile, AI, and AR/VR applications. Learn about proven strategies and transparent pricing models.",
      author: "Revolvo Tech Team",
      date: "May 2025",
      readTime: "12 min read",
      category: "Business",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "offshore-software-development-enterprise-solutions",
      tags: ["Offshore", "Enterprise", "Cost Savings", "MERN", "Flutter", "AI", "AR/VR"]
    },
    {
      id: 2,
      title: "Cross-Platform Mobile Development for Startups: Flutter vs React Native (2025)",
      excerpt: "The ultimate guide to choosing between Flutter and React Native for your startup. Compare costs, performance, and development speed with real industry data and pricing insights.",
      author: "Revolvo Tech Mobile Team",
      date: "June 2025",
      readTime: "10 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "cross-platform-mobile-development-flutter-react-native",
      tags: ["Flutter", "React Native", "Startups", "Mobile", "Cross-Platform"]
    }
  ];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <BlogWrapper>
      <SEOHead 
        title="Tech Insights & Development Blog - Revolvo Tech"
        description="Expert insights on offshore software development, mobile frameworks, AI, and technology solutions. Real-world knowledge from building 200+ successful applications."
        pageType="blog"
        canonical="https://revolvo.tech/blog"
      />
      <CircuitGrid />
      
      <Title>What We've Learned Building Apps</Title>
      <Subtitle>
        Real insights from building 200+ successful apps. No fluff, just practical knowledge from our development trenches - 
        from offshore strategies to mobile frameworks that actually work.
      </Subtitle>

      <CategoryFilter>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>

      <BlogGrid>
        {filteredPosts.map((post, index) => (
          <BlogCard 
            key={post.id} 
            delay={`${index * 0.1}s`}
            onClick={() => navigate(`/blog/${post.slug}`)}
          >
            <BlogImage image={post.image}>
              {!post.image && (
                                 <BlogIcon>
                   {post.category === 'Development' ? <FaCode /> : 
                    post.category === 'Business' ? <FaBrain /> : 
                    <FaMobile />}
                 </BlogIcon>
              )}
              <CategoryBadge style={{ 
                position: 'absolute', 
                top: '20px', 
                left: '20px', 
                zIndex: 5 
              }}>
                {post.category}
              </CategoryBadge>
            </BlogImage>
            
            <BlogContent>
              <BlogMeta>
                <MetaItem>
                  <FaCalendar /> {post.date}
                </MetaItem>
                <MetaItem>
                  <FaClock /> {post.readTime}
                </MetaItem>
              </BlogMeta>
              
              <BlogCardTitle>{post.title}</BlogCardTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              
              <ReadMoreButton>
                Read Full Article
                <FaChevronRight />
              </ReadMoreButton>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>

      {filteredPosts.length === 0 && (
        <EmptyState>
          <EmptyIcon>🔬</EmptyIcon>
          <EmptyTitle>No Articles Found</EmptyTitle>
          <EmptyText>We're working on cutting-edge content in this category. Check back soon for the latest insights!</EmptyText>
        </EmptyState>
      )}

      <NewsletterSection>
        <NewsletterTitle>Stay Connected</NewsletterTitle>
        <NewsletterText>
          Get exclusive insights on offshore development, emerging technologies, and industry trends delivered directly to your inbox.
        </NewsletterText>
        <NewsletterButton>
          Subscribe to Updates
        </NewsletterButton>
      </NewsletterSection>
    </BlogWrapper>
  );
};

export default BlogSection; 