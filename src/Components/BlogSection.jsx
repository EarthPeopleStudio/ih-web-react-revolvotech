import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BlogPost from './BlogPost';

const BlogWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
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
  margin-bottom: 40px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
`;

const BlogCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.8;
    transition: transform 0.3s ease;
  }

  &[data-category="Business Strategy"]::before {
    background-image: url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80");
  }

  &[data-category="Mobile Development"]::before {
    background-image: url("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80");
  }

  ${BlogCard}:hover &::before {
    transform: scale(1.1);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
  }
`;

const BlogContent = styled.div`
  padding: 30px;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CategoryBadge = styled.span`
  background: var(--card-bg);
  color: var(--text-primary);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
`;

const BlogDate = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const BlogTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const BlogExcerpt = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
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

const ReadMoreButton = styled.div`
  margin-top: 20px;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  &:after {
    content: "→";
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  ${BlogCard}:hover & {
    &:after {
      transform: translateX(5px);
    }
  }
`;

const NewsletterSection = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const NewsletterTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const NewsletterText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const NewsletterButton = styled.button`
  background: #f8f8f8;
  color: black;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const BlogSection = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  // SEO optimization - update document title and meta tags
  useEffect(() => {
    if (!selectedBlog) {
      document.title = "Expert Insights on Software Development | Revolvo Blog";
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Discover expert insights on offshore software development, cross-platform mobile app development with Flutter and React Native, and cost-effective enterprise solutions.');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = 'Discover expert insights on offshore software development, cross-platform mobile app development with Flutter and React Native, and cost-effective enterprise solutions.';
        document.head.appendChild(meta);
      }

      // Add keywords meta tag
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'offshore software development, cross-platform mobile development, Flutter, React Native, enterprise solutions, mobile app development, software outsourcing');
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content = 'offshore software development, cross-platform mobile development, Flutter, React Native, enterprise solutions, mobile app development, software outsourcing';
        document.head.appendChild(metaKeywords);
      }
    }
  }, [selectedBlog]);

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

  if (selectedBlog) {
    return <BlogPost blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

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
          <BlogCard key={blog.id} onClick={() => setSelectedBlog(blog)}>
            <BlogImage data-category={blog.category} />
            
            <BlogContent>
              <BlogMeta>
                <CategoryBadge>{blog.category}</CategoryBadge>
                <BlogDate>{blog.date}</BlogDate>
              </BlogMeta>

              <BlogTitle>{blog.title}</BlogTitle>
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