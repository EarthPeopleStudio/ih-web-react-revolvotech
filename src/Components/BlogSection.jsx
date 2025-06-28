import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaEye, FaCalendar, FaUser, FaArrowRight, FaTags } from 'react-icons/fa';

const circuitPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 182, 4, 0); }
  50% { box-shadow: 0 0 0 4px rgba(251, 182, 4, 0.1); }
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
  animation: ${fadeIn} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 60px 60px, 60px 60px, 30px 30px, 45px 45px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  animation: none;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #FFEB3B 40%, #fbb604 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  letter-spacing: -0.01em;
  line-height: 1.2;
  position: relative;
  z-index: 1;
  animation: none;

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
  animation: none;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 36px;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
`;

const BlogCard = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(251, 182, 4, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
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
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-12px);
    border-color: rgba(251, 182, 4, 0.4);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }

  cursor: pointer;
`;

const BlogImage = styled.div`
  height: 220px;
  background: ${props => props.image ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${props.image})` : 'linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(251, 182, 4, 0.05))'};
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
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(0, 0, 0, 0.1));
    z-index: -1;
  }

  ${props => !props.image && `
    &::after {
      content: '📝';
      font-size: 4rem;
      opacity: 0.3;
    }
  `}
`;

const BlogContent = styled.div`
  padding: 30px;
  position: relative;
  z-index: 1;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: #fbb604;
    font-size: 0.8rem;
  }
`;

const BlogCardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogExcerpt = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
`;

const BlogAuthor = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ReadTime = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ReadMoreButton = styled.button`
  background: linear-gradient(135deg, #fbb604, #f99b04);
  color: #000;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(251, 182, 4, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(251, 182, 4, 0.4);
    filter: brightness(1.1);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const NewsletterSection = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(251, 182, 4, 0.2);
    box-shadow: 0 25px 50px rgba(251, 182, 4, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const NewsletterTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, #FFEB3B, #fbb604);
    border-radius: 2px;
  }
`;

const NewsletterText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const NewsletterButton = styled.button`
  background: linear-gradient(135deg, #FFEB3B 0%, #fbb604 100%);
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(251, 182, 4, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(251, 182, 4, 0.3);
  }
`;

const BlogSection = () => {

  const blogPosts = [
    {
      id: 1,
      title: "Offshore Software Development: Cost-Effective Enterprise Solutions",
      excerpt: "Discover how enterprises can slash development costs by 50-60% while accessing global talent for web, mobile, AI, and AR/VR applications.",
      author: "Revolvo Team",
      date: "June 2025",
      readTime: "8 min read",
      category: "Business Strategy",
      content: "offshore-development",
      slug: "offshore-software-development-cost-effective-enterprise-solutions",
      seoTitle: "Offshore Software Development: Cut Costs by 50-60% | Revolvo",
      seoDescription: "Learn how enterprises save 50-60% on development costs with offshore software teams. Expert insights on MERN, Flutter, Unity, AI, and AR/VR development.",
      keywords: "offshore software development, enterprise solutions, cost reduction, MERN stack, Flutter development, Unity development"
    },
    {
      id: 2,
      title: "Cross-Platform Mobile Development for Startups: Flutter vs React Native (2025)",
      excerpt: "Learn how Flutter and React Native can slash mobile development costs by 30-40% while reaching both iOS and Android users with a single codebase.",
      author: "Revolvo Mobile Team",
      date: "June 2025",
      readTime: "12 min read",
      category: "Mobile Development",
      content: "cross-platform-mobile",
      slug: "cross-platform-mobile-development-flutter-vs-react-native-2025",
      seoTitle: "Flutter vs React Native 2025: Cross-Platform Mobile Development Guide",
      seoDescription: "Complete guide to Flutter vs React Native for startups. Learn how cross-platform development cuts costs by 30-40% and accelerates time-to-market.",
      keywords: "Flutter vs React Native, cross-platform mobile development, mobile app development, startup mobile apps, iOS Android development"
    }
  ];

  return (
    <BlogWrapper>
      <SectionHeader>
        <Title>Expert Software Development Insights</Title>
        <Subtitle>
          Stay ahead with expert insights on offshore development, cross-platform mobile apps, 
          and cost-effective enterprise solutions for your business growth.
        </Subtitle>
      </SectionHeader>

      <BlogGrid>
        {blogPosts.map(blog => (
          <BlogCard key={blog.id}>
            <BlogImage image={blog.image} />
            
            <BlogContent>
              <BlogMeta>
                <MetaItem>
                  <FaEye />
                  {blog.views}
                </MetaItem>
                <MetaItem>
                  <FaCalendar />
                  {blog.date}
                </MetaItem>
                <MetaItem>
                  <FaUser />
                  By {blog.author}
                </MetaItem>
              </BlogMeta>

              <BlogCardTitle>{blog.title}</BlogCardTitle>
              <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
              
              <BlogFooter>
                <BlogAuthor>By {blog.author}</BlogAuthor>
                <ReadTime>{blog.readTime}</ReadTime>
              </BlogFooter>
              
              <ReadMoreButton>Read Article</ReadMoreButton>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>

      <NewsletterSection>
        <NewsletterTitle>Stay Updated with Industry Insights</NewsletterTitle>
        <NewsletterText>
          Get the latest trends, best practices, and expert insights on software development 
          delivered straight to your inbox.
        </NewsletterText>
        <NewsletterButton>Subscribe to Newsletter</NewsletterButton>
      </NewsletterSection>
    </BlogWrapper>
  );
};

export default BlogSection; 