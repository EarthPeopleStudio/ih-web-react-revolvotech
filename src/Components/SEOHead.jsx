import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  generateBlogKeywords, 
  generateBlogDescription, 
  generateBlogStructuredData,
  generatePageKeywords 
} from '../utils/seoUtils';

/**
 * SEO Head Component - Automatically generates SEO meta tags
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Manual keywords (optional)
 * @param {string} props.pageType - Type of page (home, about, blog, etc.)
 * @param {Object} props.blogPost - Blog post data (for blog pages)
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.image - Social media image URL
 */
const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  pageType = 'home',
  blogPost = null,
  canonical = null,
  image = null 
}) => {
  // Generate automatic keywords based on page type or blog post
  const autoKeywords = blogPost 
    ? generateBlogKeywords(blogPost)
    : generatePageKeywords(pageType);
  
  // Use provided keywords or auto-generated ones
  const finalKeywords = keywords || autoKeywords;
  
  // Generate description for blog posts
  const finalDescription = blogPost 
    ? generateBlogDescription(blogPost)
    : description;
  
  // Generate structured data for blog posts
  const structuredData = blogPost 
    ? generateBlogStructuredData(blogPost)
    : null;
  
  // Default values
  const defaultTitle = "Revolvo Tech - Expert Software Development Services";
  const defaultDescription = "Transform your ideas into powerful applications. Expert offshore software development for web, mobile, AI, and AR/VR solutions. Trusted by startups and enterprises.";
  const defaultImage = "https://revolvo.tech/og-image.jpg";
  const siteUrl = "https://revolvo.tech";
  
  const finalTitle = title || defaultTitle;
  const finalDesc = finalDescription || defaultDescription;
  const finalImage = image || defaultImage;
  const finalCanonical = canonical || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Revolvo Tech" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:type" content={blogPost ? "article" : "website"} />
      <meta property="og:site_name" content="Revolvo Tech" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@revolvotech" />
      
      {/* Blog Post Specific Meta Tags */}
      {blogPost && (
        <>
          <meta property="article:author" content={blogPost.author} />
          <meta property="article:published_time" content={blogPost.date} />
          <meta property="article:section" content={blogPost.category} />
          {blogPost.tags && blogPost.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#fbb604" />
      <meta name="msapplication-TileColor" content="#fbb604" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://images.unsplash.com" />
    </Helmet>
  );
};

export default SEOHead; 