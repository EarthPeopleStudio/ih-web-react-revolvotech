// SEO Utilities for Automatic Keyword Generation
// =============================================

/**
 * Generates SEO meta keywords from blog post data
 * @param {Object} post - Blog post object
 * @returns {string} - Comma-separated keywords
 */
export const generateBlogKeywords = (post) => {
  const baseKeywords = [
    'Revolvo Tech',
    'software development',
    'tech solutions',
    'offshore development'
  ];
  
  const categoryKeywords = {
    'Development': ['web development', 'mobile apps', 'programming', 'coding'],
    'Business': ['enterprise solutions', 'tech consulting', 'business software', 'digital transformation'],
    'AI': ['artificial intelligence', 'machine learning', 'AI development'],
    'Mobile': ['mobile development', 'app development', 'cross-platform']
  };
  
  let keywords = [...baseKeywords];
  
  // Add category-specific keywords
  if (post.category && categoryKeywords[post.category]) {
    keywords.push(...categoryKeywords[post.category]);
  }
  
  // Add post tags (already defined in your blog posts)
  if (post.tags && Array.isArray(post.tags)) {
    keywords.push(...post.tags.map(tag => tag.toLowerCase()));
  }
  
  // Extract keywords from title (split by common words)
  if (post.title) {
    const titleWords = post.title
      .toLowerCase()
      .split(/[\s\-\:\(\)]+/)
      .filter(word => 
        word.length > 3 && 
        !['with', 'from', 'your', 'this', 'that', 'they', 'have', 'will', 'been', 'were'].includes(word)
      );
    keywords.push(...titleWords);
  }
  
  // Remove duplicates and limit to 15 keywords for best SEO practice
  return [...new Set(keywords)]
    .slice(0, 15)
    .join(', ');
};

/**
 * Generates meta description from blog post
 * @param {Object} post - Blog post object
 * @returns {string} - SEO optimized description
 */
export const generateBlogDescription = (post) => {
  if (post.excerpt) {
    // Limit to 155 characters for optimal SEO
    return post.excerpt.length > 155 
      ? post.excerpt.substring(0, 152) + '...'
      : post.excerpt;
  }
  
  return `Read about ${post.title} by Revolvo Tech. Expert insights on software development and technology solutions.`;
};

/**
 * Generates structured data for blog posts
 * @param {Object} post - Blog post object
 * @returns {Object} - JSON-LD structured data
 */
export const generateBlogStructuredData = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "Revolvo Tech",
      "url": "https://revolvo.tech"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Revolvo Tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://revolvo.tech/revolvo-logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://revolvo.tech/blog/${post.slug}`
    },
    "keywords": generateBlogKeywords(post).split(', '),
    "articleSection": post.category,
    "wordCount": post.readTime ? parseInt(post.readTime) * 200 : 800 // Estimate based on read time
  };
};

/**
 * Global site keywords that should always be included
 */
export const globalKeywords = [
  'Revolvo Tech',
  'software development company',
  'offshore development',
  'web development',
  'mobile app development', 
  'AI development',
  'AR VR development',
  'enterprise software',
  'tech consulting',
  'custom software solutions',
  'MERN stack development',
  'Flutter development',
  'React development',
  'Node.js development',
  'startup technology partner'
];

/**
 * Generates page-specific keywords
 * @param {string} pageType - Type of page (home, about, services, etc.)
 * @param {Object} pageData - Page-specific data
 * @returns {string} - Comma-separated keywords
 */
export const generatePageKeywords = (pageType, pageData = {}) => {
  const pageKeywords = {
    home: [
      ...globalKeywords,
      'tech startup development',
      'investor ready applications',
      'scalable software solutions'
    ],
    about: [
      ...globalKeywords.slice(0, 8),
      'software development team',
      'tech expertise',
      'development experience'
    ],
    services: [
      ...globalKeywords,
      'software development services',
      'web application development',
      'mobile application development',
      'AI ML development',
      'augmented reality development'
    ],
    pricing: [
      ...globalKeywords.slice(0, 10),
      'software development cost',
      'development pricing',
      'offshore development rates',
      'custom software pricing'
    ],
    contact: [
      ...globalKeywords.slice(0, 8),
      'hire software developers',
      'get development quote',
      'software development consultation'
    ]
  };
  
  return (pageKeywords[pageType] || globalKeywords)
    .slice(0, 15)
    .join(', ');
};

export default {
  generateBlogKeywords,
  generateBlogDescription, 
  generateBlogStructuredData,
  generatePageKeywords,
  globalKeywords
}; 