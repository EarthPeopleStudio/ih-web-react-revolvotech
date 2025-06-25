import React, { useState, useEffect } from 'react';
import { AiOutlineAudit, AiOutlineFileSearch, AiOutlineTag, AiOutlineRise, AiOutlineBarChart, AiOutlineLineChart, AiOutlineCheck } from 'react-icons/ai';
import { MdTrendingUp, MdContentCopy } from 'react-icons/md';
import { BsLightbulb, BsGraphUp } from 'react-icons/bs';
import styled from 'styled-components';

// Import styled components with updated colors
const CodeShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;
`;

const CodeShowcaseItem = styled.div`
  background: rgba(18, 18, 18, 0.95);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 235, 59, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(255, 235, 59, 0.1);
    border: 1px solid rgba(255, 235, 59, 0.4);
  }
`;

const CodeShowcaseHeader = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 235, 59, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 235, 59, 0.05), rgba(251, 182, 4, 0.03));
`;

const CodeShowcaseTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  font-weight: 600;
  
  svg {
    margin-right: 10px;
    color: #FFEB3B;
  }
`;

const CodeShowcaseDescription = styled.p`
  padding: 16px 28px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 235, 59, 0.1);
  margin: 0;
`;

const CodeDemoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 28px 28px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CodeSnippetContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(25, 25, 25, 0.8);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 235, 59, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    border: 1px solid rgba(255, 235, 59, 0.4);
    box-shadow: 0 12px 35px rgba(255, 235, 59, 0.1);
  }
`;

const CodeHeader = styled.div`
  background: linear-gradient(135deg, rgba(255, 235, 59, 0.08), rgba(251, 182, 4, 0.05));
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #e0e0e0;
  border-bottom: 1px solid rgba(255, 235, 59, 0.2);
`;

const CodeFileName = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #FFEB3B;
`;

const CodeLanguage = styled.span`
  background: linear-gradient(135deg, rgba(255, 235, 59, 0.2), rgba(251, 182, 4, 0.15));
  padding: 4px 12px;
  border-radius: 6px;
  color: #FFEB3B;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 235, 59, 0.3);
`;

const DemoContainer = styled.div`
  background: rgba(25, 25, 25, 0.8);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 235, 59, 0.2);
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    border: 1px solid rgba(255, 235, 59, 0.4);
    box-shadow: 0 12px 35px rgba(255, 235, 59, 0.1);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, #FFEB3B, #00d4ff);
    z-index: 2;
  }
`;

const PreBlock = styled.pre`
  margin: 0;
  padding: 18px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  max-height: 350px;
  color: #ffffff;
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  
  /* Set all code to white */
  .keyword, .string, .comment, .function, .variable, .operator, .number {
    color: #ffffff;
  }
`;

// Main ContentShowcase Component
const ContentShowcase = () => {
  return (
    <CodeShowcaseGrid>
      {/* SEO Analyzer Tool */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            SEO Analyzer Tool
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Advanced content analysis tool that provides SEO optimization suggestions, keyword density analysis, and readability scoring.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>SEOAnalyzer.js</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <SEOAnalyzerCode />
          </CodeSnippetContainer>
          <DemoContainer>
            <SEOAnalyzerDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
      
      {/* Content Headline Generator */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Content Headline Generator
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          An AI-powered headline generator that creates engaging, high-converting titles for blogs, social media, and marketing content.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>HeadlineGenerator.js</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <HeadlineGeneratorCode />
          </CodeSnippetContainer>
          <DemoContainer>
            <HeadlineGeneratorDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

// Code display component for displaying source code
const SEOAnalyzerCode = () => {
  // Prevent copy functionality
  const handleCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const nonCopyableStyles = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitTouchCallout: 'none',
    pointerEvents: 'auto',
    color: '#ffffff',
    width: '100%',
    height: '100%',
    fontFamily: "'Fira Code', monospace",
    fontSize: '0.85rem',
    lineHeight: '1.6',
    letterSpacing: '0.3px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  };

  const code = `class SEOAnalyzer {
  constructor() {
    this.keywordImportance = 0.4;
    this.densityImportance = 0.2;
    this.titleImportance = 0.15;
    this.metaImportance = 0.15;
    this.readabilityImportance = 0.1;
  }
  
  /**
   * Analyze content for SEO optimization
   * @param {Object} content - Content to analyze
   * @returns {Object} - Analysis results
   */
  analyzeContent(content) {
    const {
      text, 
      title, 
      metaDescription,
      targetKeywords = []
    } = content;
    
    // Word count and text stats
    const wordCount = this.countWords(text);
    const sentenceCount = this.countSentences(text);
    const avgWordsPerSentence = 
      wordCount / (sentenceCount || 1);
    
    // Calculate readability score
    const readabilityScore = 
      this.calculateReadabilityScore(
        text, 
        wordCount, 
        sentenceCount
      );
    
    // Keyword analysis
    const keywordResults = 
      this.analyzeKeywords(
        text, 
        title, 
        metaDescription, 
        targetKeywords
      );
    
    // Calculate overall SEO score
    const seoScore = 
      this.calculateOverallScore(
        keywordResults, 
        readabilityScore,
        wordCount
      );
    
    return {
      seoScore,
      readabilityScore,
      keywordResults,
      textStats: {
        wordCount,
        sentenceCount,
        avgWordsPerSentence
      },
      suggestions: 
        this.generateSuggestions(
          keywordResults, 
          readabilityScore, 
          wordCount
        )
    };
  }
  
  /**
   * Count words in text
   */
  countWords(text) {
    return text
      .trim()
      .split(/\\s+/)
      .filter(Boolean)
      .length;
  }
  
  /**
   * Count sentences in text
   */
  countSentences(text) {
    // Simple sentence detection
    return (text.match(/[.!?]+\\s/g) || []).length + 1;
  }
  
  /**
   * Calculate readability score
   * (simplified Flesch-Kincaid)
   */
  calculateReadabilityScore(text, wordCount, sentenceCount) {
    // Calculate syllables (simplified)
    const syllableCount = 
      this.estimateSyllables(text);
    
    // Simplified Flesch-Kincaid
    const result = 206.835 - 
      (1.015 * (wordCount / sentenceCount)) - 
      (84.6 * (syllableCount / wordCount));
    
    // Normalize score to 0-100
    return Math.min(
      100, 
      Math.max(0, Math.round(result))
    );
  }
  
  /**
   * Analyze keywords in content
   */
  analyzeKeywords(text, title, metaDescription, targetKeywords) {
    const results = {};
    const normalizedText = text.toLowerCase();
    const words = normalizedText.split(/\\W+/);
    
    // Count all words for keyword density
    const wordFrequency = {};
    words.forEach(word => {
      if (word.length > 3) {
        wordFrequency[word] = 
          (wordFrequency[word] || 0) + 1;
      }
    });
    
    // Calculate results for each target keyword
    targetKeywords.forEach(keyword => {
      const normalizedKeyword = 
        keyword.toLowerCase();
      
      // Check keyword presence
      const inTitle = 
        title.toLowerCase()
          .includes(normalizedKeyword);
      
      const inMetaDescription = 
        metaDescription.toLowerCase()
          .includes(normalizedKeyword);
      
      const inContent = 
        normalizedText.includes(normalizedKeyword);
      
      // Calculate keyword density
      const keywordCount = 
        (normalizedText.match(
          new RegExp(normalizedKeyword, 'g')
        ) || []).length;
      
      const density = 
        keywordCount / words.length * 100;
      
      // Store results
      results[keyword] = {
        inTitle,
        inMetaDescription,
        inContent,
        count: keywordCount,
        density: parseFloat(density.toFixed(2)),
        optimal: density >= 0.5 && density <= 2.5
      };
    });
    
    return results;
  }
  
  /**
   * Calculate overall SEO score
   */
  calculateOverallScore(
    keywordResults, 
    readabilityScore,
    wordCount
  ) {
    // Keywords score
    let keywordScore = 0;
    const keywordCount = 
      Object.keys(keywordResults).length;
    
    if (keywordCount > 0) {
      Object.values(keywordResults)
        .forEach(result => {
          let score = 0;
          if (result.inTitle) score += 30;
          if (result.inMetaDescription) score += 20;
          if (result.inContent) score += 20;
          if (result.optimal) score += 30;
          keywordScore += score;
        });
      
      keywordScore = keywordScore / keywordCount;
    }
    
    // Content length score
    const lengthScore = 
      wordCount < 300 ? 50 :
      wordCount < 600 ? 70 :
      wordCount < 1000 ? 90 : 100;
    
    // Calculate final score
    const finalScore = 
      (keywordScore * this.keywordImportance) +
      (lengthScore * this.densityImportance) +
      (readabilityScore * this.readabilityImportance);
    
    return Math.min(100, Math.round(finalScore));
  }
  
  /**
   * Generate SEO improvement suggestions
   */
  generateSuggestions(
    keywordResults, 
    readabilityScore, 
    wordCount
  ) {
    const suggestions = [];
    
    // Keyword suggestions
    Object.entries(keywordResults)
      .forEach(([keyword, result]) => {
        if (!result.inTitle) {
          suggestions.push(
            \`Include keyword "\${keyword}" 
            in your title\`
          );
        }
        
        if (!result.inMetaDescription) {
          suggestions.push(
            \`Add keyword "\${keyword}" to 
            your meta description\`
          );
        }
        
        if (!result.optimal) {
          if (result.density < 0.5) {
            suggestions.push(
              \`Increase usage of "\${keyword}" 
              (current density: \${result.density}%)\`
            );
          } else if (result.density > 2.5) {
            suggestions.push(
              \`Reduce usage of "\${keyword}" 
              to avoid keyword stuffing 
              (current density: \${result.density}%)\`
            );
          }
        }
      });
    
    // Content length suggestions
    if (wordCount < 300) {
      suggestions.push(
        "Content is too short. Aim for 
        at least 600 words for better SEO"
      );
    }
    
    // Readability suggestions
    if (readabilityScore < 60) {
      suggestions.push(
        "Improve content readability by using 
        shorter sentences and simpler words"
      );
    }
    
    return suggestions;
  }
}

export default SEOAnalyzer;`;

  return (
    <PreBlock style={{ padding: '16px', maxHeight: '450px' }}>
      <code 
        className="language-javascript"
        style={nonCopyableStyles}
        onCopy={handleCopy}
        onCut={handleCopy}
        onContextMenu={handleContextMenu}
        data-nocopy="true"
      >
        {code}
      </code>
    </PreBlock>
  );
};

// SEO Analyzer Demo Component
const SEOAnalyzerDemo = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [seoScore, setSeoScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [keywordResults, setKeywordResults] = useState({});
  const [readabilityScore, setReadabilityScore] = useState(null);
  const [textStats, setTextStats] = useState({ wordCount: 0, sentenceCount: 0 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Calculate SEO score
  const analyzeSEO = () => {
    setIsAnalyzing(true);
    
    // Simulate SEO analysis
    setTimeout(() => {
      // Parse keywords
      const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
      
      // Simple word count for demo
      const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
      const sentenceCount = (content.match(/[.!?]+\s/g) || []).length + 1;
      
      // Generate keyword analysis
      const keywordAnalysis = {};
      keywordList.forEach(keyword => {
        const lowerContent = content.toLowerCase();
        const lowerTitle = title.toLowerCase();
        const lowerKeyword = keyword.toLowerCase();
        
        const inTitle = lowerTitle.includes(lowerKeyword);
        const inContent = lowerContent.includes(lowerKeyword);
        const count = (lowerContent.match(new RegExp(lowerKeyword, 'g')) || []).length;
        const density = count / (wordCount || 1) * 100;
        
        keywordAnalysis[keyword] = {
          inTitle,
          inContent,
          count,
          density: parseFloat(density.toFixed(2)),
          optimal: density >= 0.5 && density <= 2.5
        };
      });
      
      // Calculate readability (simplified for demo)
      const avgWordsPerSentence = wordCount / (sentenceCount || 1);
      const readability = Math.max(0, Math.min(100, Math.round(100 - (avgWordsPerSentence - 14) * 5)));
      
      // Calculate SEO score
      let score = 0;
      
      // Title score
      score += title.length > 0 ? 20 : 0;
      score += (title.length >= 40 && title.length <= 60) ? 10 : 0;
      
      // Content score
      score += wordCount > 0 ? 10 : 0;
      score += wordCount >= 300 ? 10 : 0;
      score += wordCount >= 600 ? 10 : 0;
      
      // Keyword score
      let keywordScore = 0;
      if (keywordList.length > 0) {
        Object.values(keywordAnalysis).forEach(result => {
          keywordScore += result.inTitle ? 5 : 0;
          keywordScore += result.inContent ? 5 : 0;
          keywordScore += result.optimal ? 10 : 0;
        });
        score += Math.min(30, keywordScore);
      }
      
      // Readability score
      score += Math.round(readability * 0.2);
      
      // Generate suggestions
      const seoSuggestions = [];
      
      if (!title) {
        seoSuggestions.push("Add a title for your content");
      } else if (title.length < 40) {
        seoSuggestions.push("Your title is too short (less than 40 characters)");
      } else if (title.length > 60) {
        seoSuggestions.push("Your title is too long (more than 60 characters)");
      }
      
      if (wordCount < 300) {
        seoSuggestions.push("Content is too short. Aim for at least 300 words for better SEO");
      }
      
      if (keywordList.length === 0) {
        seoSuggestions.push("Add target keywords to optimize your content");
      } else {
        Object.entries(keywordAnalysis).forEach(([keyword, result]) => {
          if (!result.inTitle) {
            seoSuggestions.push(`Include keyword "${keyword}" in your title`);
          }
          
          if (!result.optimal) {
            if (result.density < 0.5) {
              seoSuggestions.push(`Increase usage of "${keyword}" (current density: ${result.density}%)`);
            } else if (result.density > 2.5) {
              seoSuggestions.push(`Reduce usage of "${keyword}" to avoid keyword stuffing (current density: ${result.density}%)`);
            }
          }
        });
      }
      
      if (readability < 60) {
        seoSuggestions.push("Improve content readability by using shorter sentences and simpler words");
      }
      
      // Update state with results
      setSeoScore(Math.min(100, score));
      setReadabilityScore(readability);
      setKeywordResults(keywordAnalysis);
      setTextStats({ wordCount, sentenceCount, avgWordsPerSentence });
      setSuggestions(seoSuggestions);
      setIsAnalyzing(false);
    }, 1000);
  };
  
  // Get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      color: '#fff',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        background: 'rgba(25, 25, 35, 0.8)',
        borderRadius: '8px',
        marginBottom: '10px',
        gap: '10px'
      }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Page Title"
          style={{
            padding: '10px 12px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.9rem'
          }}
        />
        
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Target Keywords (comma separated)"
          style={{
            padding: '10px 12px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.9rem'
          }}
        />
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your content here..."
          style={{
            padding: '12px',
            height: '100px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.9rem',
            resize: 'none',
            fontFamily: 'inherit'
          }}
        />
        
        <button
          onClick={analyzeSEO}
          disabled={isAnalyzing || !content}
          style={{
            padding: '10px 16px',
            background: isAnalyzing 
              ? 'rgba(80, 80, 120, 0.5)' 
              : 'linear-gradient(135deg, #FFEB3B, #fbb604)',
            color: isAnalyzing ? '#fff' : '#000',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: isAnalyzing ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 10px rgba(255, 84, 112, 0.2)'
          }}
        >
          {isAnalyzing ? (
            <>
              <div style={{
                width: '14px',
                height: '14px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Analyzing...
            </>
          ) : (
            <>
              Analyze SEO
            </>
          )}
        </button>
      </div>
      
      {seoScore !== null && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '15px',
          background: 'rgba(25, 25, 35, 0.8)',
          borderRadius: '8px',
          animation: 'fadeIn 0.4s ease-out',
          flex: 1,
          overflow: 'auto'
        }}>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              flex: 1
            }}>
              <div style={{
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '5px'
              }}>
                SEO Score
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: getScoreColor(seoScore)
              }}>
                {seoScore}%
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              flex: 1
            }}>
              <div style={{
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '5px'
              }}>
                Readability
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: getScoreColor(readabilityScore)
              }}>
                {readabilityScore}%
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              flex: 1
            }}>
              <div style={{
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '5px'
              }}>
                Word Count
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: textStats.wordCount > 300 ? '#4caf50' : '#ff9800'
              }}>
                {textStats.wordCount}
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            padding: '15px'
          }}>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#FFEB3B',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <BsLightbulb />
              Suggestions
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxHeight: '100px',
              overflowY: 'auto',
              padding: '5px 0'
            }} className="seo-suggestions">
              {suggestions.map((suggestion, index) => (
                <div key={index} style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  padding: '4px 0'
                }}>
                  <div style={{ color: '#ff9800', marginTop: '4px' }}>•</div>
                  <div>{suggestion}</div>
                </div>
              ))}
              
              {suggestions.length === 0 && (
                <div style={{
                  fontSize: '0.85rem',
                  color: '#4caf50',
                  fontStyle: 'italic'
                }}>
                  No suggestions - your content is well optimized!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Scrollbar styling for SEO suggestions */
          .seo-suggestions::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          .seo-suggestions::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          
          .seo-suggestions::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
          }
          
          .seo-suggestions::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
          }
        `}
      </style>
    </div>
  );
};

// Code display component for displaying headline generator code
const HeadlineGeneratorCode = () => {
  // Prevent copy functionality
  const handleCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const nonCopyableStyles = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitTouchCallout: 'none',
    pointerEvents: 'auto',
    color: '#ffffff',
    width: '100%',
    height: '100%',
    fontFamily: "'Fira Code', monospace",
    fontSize: '0.85rem',
    lineHeight: '1.6',
    letterSpacing: '0.3px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  };

  const code = `class HeadlineGenerator {
  constructor() {
    this.templates = {
      blog: [
        "The Ultimate Guide to {topic}",
        "{number} Ways to {action} Your {subject}",
        "How to {action} in {timeframe}",
        "Why {subject} Is {adjective} for {audience}",
        "{number} {adjective} {subject} Tips You Need to Know",
        "The Secret to {action} Without {negative}",
        "{action} Like a Pro: {number} Expert Tips",
        "What Nobody Tells You About {subject}",
        "From {negative} to {positive}: A {topic} Journey",
        "{actionIng} 101: A Beginner's Guide"
      ],
      social: [
        "🔥 {number} {adjective} Ways to {action}",
        "✨ Just Discovered: How to {action} Without {negative}",
        "🚀 Transform Your {subject} With These {adjective} Tips",
        "👉 {question} The Answer Will Surprise You",
        "🤯 This {adjective} {subject} Hack Changed Everything",
        "💯 Here's Why {subject} Is {adjective} Right Now",
        "🏆 We Tested {number} Ways to {action}. #1 Is Shocking!",
        "⚡️ Breaking: The {adjective} Approach to {subject}",
        "📊 {percentage}% of {audience} Don't Know This {subject} Trick",
        "🎯 Stop {negative} Now With This {adjective} Strategy"
      ],
      email: [
        "[Time Sensitive] {action} Before It's Too Late",
        "A {adjective} Way to {action} Your {subject}",
        "{percentage}% of {audience} Are {actionIng} Wrong",
        "Want to {action}? Open this email",
        "Finally: {adjective} {subject} Without {negative}",
        "Your {timeframe} Plan for {actionIng}",
        "Warning: Your {subject} May Be at Risk",
        "Re: Your Question About {topic}",
        "We Need to Talk About Your {subject}",
        "The Last {topic} Guide You'll Ever Need"
      ]
    };
    
    this.fillers = {
      number: [
        "5", "7", "10", "12", "15", "20", "25", "30"
      ],
      percentage: [
        "63", "71", "80", "86", "91", "97"
      ],
      timeframe: [
        "7 Days", "2 Weeks", "30 Days", "24 Hours",
        "5 Minutes", "One Month", "One Year"
      ],
      adjective: [
        "Powerful", "Effective", "Essential", "Game-Changing",
        "Mind-Blowing", "Proven", "Incredible", "Simple", 
        "Surprising", "Unconventional", "Revolutionary",
        "Expert-Approved", "Science-Backed"
      ],
      audience: [
        "Marketers", "Entrepreneurs", "Beginners", "Experts",
        "Professionals", "Parents", "People", "Businesses",
        "Students", "Teams", "Leaders", "Companies"
      ],
      positive: [
        "Success", "Growth", "Results", "Achievement", 
        "Mastery", "Excellence", "Profit", "Productivity"
      ],
      negative: [
        "Stress", "Failure", "Struggle", "Mistakes", 
        "Overwhelm", "Confusion", "Frustration", "Wasting Time"
      ]
    };
  }
  
  /**
   * Generate headlines based on input
   * @param {Object} params - Input parameters
   * @returns {Array} - Generated headlines
   */
  generateHeadlines(params) {
    const {
      category = 'blog',
      topic,
      subject,
      action,
      count = 5
    } = params;
    
    // Validate inputs
    if (!topic || !subject || !action) {
      throw new Error(
        'Missing required parameters: topic, subject, action'
      );
    }
    
    // Derive actionIng form (simple transform for demo)
    const actionIng = this.toIngForm(action);
    
    // Select templates
    const templates = this.templates[category] || 
      this.templates.blog;
    
    // Generate headlines
    const headlines = [];
    const usedTemplates = new Set();
    
    while (headlines.length < count && 
           usedTemplates.size < templates.length) {
      
      // Select random template
      let templateIndex;
      do {
        templateIndex = Math.floor(
          Math.random() * templates.length
        );
      } while (usedTemplates.has(templateIndex));
      
      usedTemplates.add(templateIndex);
      let template = templates[templateIndex];
      
      // Fill in template
      let headline = template
        .replace('{topic}', topic)
        .replace('{subject}', subject)
        .replace('{action}', action)
        .replace('{actionIng}', actionIng);
      
      // Add random fillers for other placeholders
      headline = this.fillPlaceholders(headline);
      
      headlines.push(headline);
    }
    
    return headlines;
  }
  
  /**
   * Fill remaining placeholders with random values
   */
  fillPlaceholders(headline) {
    // Find all remaining placeholders
    const placeholders = 
      headline.match(/{([^}]+)}/g) || [];
    
    let result = headline;
    
    // Replace each placeholder
    placeholders.forEach(placeholder => {
      const key = placeholder.replace(/{|}/g, '');
      
      if (this.fillers[key]) {
        const options = this.fillers[key];
        const randomValue = options[
          Math.floor(Math.random() * options.length)
        ];
        
        result = result.replace(placeholder, randomValue);
      } else if (key === 'question') {
        // Generate a question if needed
        result = result.replace(
          placeholder, 
          'Can This Really Improve Your Results?'
        );
      }
    });
    
    return result;
  }
  
  /**
   * Convert action to -ing form (simplified)
   */
  toIngForm(action) {
    if (!action) return '';
    
    if (action.endsWith('e')) {
      return action.slice(0, -1) + 'ing';
    } else {
      return action + 'ing';
    }
  }
  
  /**
   * Score headline quality based on heuristics
   */
  scoreHeadline(headline) {
    // Basic scoring factors
    let score = 50;
    
    // Length (too short or too long is bad)
    const length = headline.length;
    if (length < 30) score -= 10;
    if (length > 80) score -= 15;
    if (length >= 40 && length <= 60) score += 10;
    
    // Power words
    const powerWords = [
      'ultimate', 'essential', 'powerful', 
      'amazing', 'proven', 'secret', 'best',
      'free', 'new', 'discover', 'revolutionary'
    ];
    
    const lowerHeadline = headline.toLowerCase();
    powerWords.forEach(word => {
      if (lowerHeadline.includes(word)) score += 5;
    });
    
    // Numbers generally perform well
    if (/\\d+/.test(headline)) score += 10;
    
    // Questions often drive curiosity
    if (headline.includes('?')) score += 5;
    
    // Emoji usage in social
    if (/[\\u{1F300}-\\u{1F6FF}]/u.test(headline)) score += 8;
    
    // Normalize score to 0-100 range
    return Math.min(100, Math.max(0, score));
  }
}

export default HeadlineGenerator;`;

  return (
    <PreBlock style={{ padding: '16px', maxHeight: '450px' }}>
      <code 
        className="language-javascript"
        style={nonCopyableStyles}
        onCopy={handleCopy}
        onCut={handleCopy}
        onContextMenu={handleContextMenu}
        data-nocopy="true"
      >
        {code}
      </code>
    </PreBlock>
  );
};

// Headline Generator Demo Component
const HeadlineGeneratorDemo = () => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [action, setAction] = useState('');
  const [category, setCategory] = useState('blog');
  const [headlines, setHeadlines] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Sample topics to help with ideas
  const sampleTopics = [
    { topic: 'Digital Marketing', subject: 'Social Media', action: 'Grow' },
    { topic: 'Personal Finance', subject: 'Budget', action: 'Save' },
    { topic: 'Health & Fitness', subject: 'Workout', action: 'Improve' },
    { topic: 'Productivity', subject: 'Time Management', action: 'Optimize' }
  ];
  
  // Generate headlines
  const generateHeadlines = () => {
    if (!topic || !subject || !action) return;
    
    setIsGenerating(true);
    setHeadlines([]);
    
    // Simulate API call
    setTimeout(() => {
      // Templates for different categories
      const templates = {
        blog: [
          `The Ultimate Guide to ${topic}`,
          `7 Ways to ${action} Your ${subject}`,
          `How to ${action} in 30 Days`,
          `Why ${subject} Is Essential for ${topic} Experts`,
          `10 Powerful ${subject} Tips You Need to Know`,
          `The Secret to ${action} Without Stress`,
          `${action} Like a Pro: 5 Expert Tips`,
          `What Nobody Tells You About ${subject}`,
          `From Struggle to Success: A ${topic} Journey`,
          `${action}ing 101: A Beginner's Guide`
        ],
        social: [
          `🔥 5 Game-Changing Ways to ${action}`,
          `✨ Just Discovered: How to ${action} Without Frustration`,
          `🚀 Transform Your ${subject} With These Powerful Tips`,
          `👉 Can This Really Improve Your ${subject}? The Answer Will Surprise You`,
          `🤯 This Simple ${subject} Hack Changed Everything`,
          `💯 Here's Why ${subject} Is Trending Right Now`,
          `🏆 We Tested 7 Ways to ${action}. #1 Is Shocking!`,
          `⚡️ Breaking: The Revolutionary Approach to ${subject}`,
          `📊 86% of ${topic} Professionals Don't Know This ${subject} Trick`,
          `🎯 Stop Wasting Time Now With This Proven Strategy`
        ],
        email: [
          `[Time Sensitive] ${action} Before It's Too Late`,
          `A Powerful Way to ${action} Your ${subject}`,
          `71% of ${topic} Experts Are ${action}ing Wrong`,
          `Want to ${action}? Open this email`,
          `Finally: Effective ${subject} Without Struggle`,
          `Your 30-Day Plan for ${action}ing`,
          `Warning: Your ${subject} May Be at Risk`,
          `Re: Your Question About ${topic}`,
          `We Need to Talk About Your ${subject}`,
          `The Last ${topic} Guide You'll Ever Need`
        ]
      };
      
      // Select 5 random headlines from the chosen category
      const availableHeadlines = templates[category] || templates.blog;
      const selectedIndices = new Set();
      const generatedHeadlines = [];
      
      while (selectedIndices.size < 5 && selectedIndices.size < availableHeadlines.length) {
        const randomIndex = Math.floor(Math.random() * availableHeadlines.length);
        if (!selectedIndices.has(randomIndex)) {
          selectedIndices.add(randomIndex);
          generatedHeadlines.push({
            text: availableHeadlines[randomIndex],
            score: Math.floor(Math.random() * 21) + 80 // Random score between 80-100
          });
        }
      }
      
      // Sort by score
      generatedHeadlines.sort((a, b) => b.score - a.score);
      
      setHeadlines(generatedHeadlines);
      setIsGenerating(false);
    }, 1200);
  };
  
  // Copy headline to clipboard
  const copyHeadline = (index) => {
    const headline = headlines[index].text;
    navigator.clipboard.writeText(headline).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };
  
  // Load sample topic
  const loadSample = (index) => {
    const sample = sampleTopics[index];
    setTopic(sample.topic);
    setSubject(sample.subject);
    setAction(sample.action);
  };
  
  // Get gradient based on score
  const getScoreGradient = (score) => {
    if (score >= 90) return 'linear-gradient(90deg, #4caf50, #8bc34a)';
    if (score >= 80) return 'linear-gradient(90deg, #8bc34a, #cddc39)';
    if (score >= 70) return 'linear-gradient(90deg, #cddc39, #ffeb3b)';
    return 'linear-gradient(90deg, #ffeb3b, #ffc107)';
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      color: '#fff',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        background: 'rgba(25, 25, 35, 0.8)',
        borderRadius: '8px',
        marginBottom: '10px',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '10px'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            Try a sample:
          </div>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            {sampleTopics.map((sample, index) => (
              <button
                key={index}
                onClick={() => loadSample(index)}
                style={{
                  padding: '4px 8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 235, 59, 0.3)',
                  borderRadius: '4px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 235, 59, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              >
                {sample.topic}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '10px'
        }}>
          {['blog', 'social', 'email'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '8px 12px',
                background: category === cat 
                  ? 'linear-gradient(135deg, #FFEB3B, #fbb604)' 
                  : 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '6px',
                color: category === cat ? '#000' : '#fff',
                fontSize: '0.85rem',
                fontWeight: category === cat ? '600' : '400',
                cursor: 'pointer',
                flex: 1,
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                boxShadow: category === cat ? '0 2px 10px rgba(255, 235, 59, 0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '5px'
        }}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Main Topic"
            style={{
              padding: '10px 12px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '0.9rem',
              width: 'calc(33.33% - 7px)'
            }}
          />
          
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            style={{
              padding: '10px 12px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '0.9rem',
              width: 'calc(33.33% - 7px)'
            }}
          />
          
          <input
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Action Verb"
            style={{
              padding: '10px 12px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '0.9rem',
              width: 'calc(33.33% - 7px)'
            }}
          />
        </div>
        
        <button
          onClick={generateHeadlines}
          disabled={isGenerating || !topic || !subject || !action}
          style={{
            padding: '12px 16px',
            background: isGenerating || !topic || !subject || !action
              ? 'rgba(80, 80, 120, 0.5)'
              : 'linear-gradient(135deg, #FFEB3B, #fbb604)',
            color: isGenerating || !topic || !subject || !action ? '#fff' : '#000',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: isGenerating ? 'wait' : ((!topic || !subject || !action) ? 'not-allowed' : 'pointer'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: isGenerating || !topic || !subject || !action ? 'none' : '0 2px 10px rgba(255, 235, 59, 0.2)'
          }}
        >
          {isGenerating ? (
            <>
              <div style={{
                width: '14px',
                height: '14px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Generating Headlines...
            </>
          ) : (
            <>
              Generate Headlines
            </>
          )}
        </button>
      </div>
      
      {headlines.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '15px',
          background: 'rgba(25, 25, 35, 0.8)',
          borderRadius: '8px',
          flex: 1,
          overflow: 'auto',
          animation: 'fadeIn 0.4s ease-out'
        }} className="headline-results">
          {headlines.map((headline, index) => (
            <div 
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                padding: '15px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                animation: `fadeIn 0.3s ease-out ${index * 0.1}s`,
                transform: 'scale(1)',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '3px',
                background: getScoreGradient(headline.score)
              }} />
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                flex: 1,
                paddingLeft: '10px'
              }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.95)',
                  lineHeight: '1.4'
                }}>
                  {headline.text}
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <BsGraphUp size={12} color="#FFEB3B" />
                    Engagement Score: <span style={{ fontWeight: '600', color: '#FFEB3B' }}>{headline.score}</span>
                  </div>
                  
                  <div style={{
                    borderRadius: '20px',
                    padding: '2px 8px',
                    background: 'rgba(255, 235, 59, 0.1)',
                    fontSize: '0.7rem',
                    color: '#FFEB3B',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {category}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => copyHeadline(index)}
                style={{
                  background: 'transparent',
                  border: copiedIndex === index ? 'none' : '1px solid rgba(255, 235, 59, 0.3)',
                  color: copiedIndex === index ? '#4caf50' : '#FFEB3B',
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (copiedIndex !== index) {
                    e.currentTarget.style.background = 'rgba(255, 235, 59, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (copiedIndex !== index) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {copiedIndex === index ? (
                  <AiOutlineCheck size={18} />
                ) : (
                  <MdContentCopy size={18} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
      
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Scrollbar styling for SEO suggestions */
          .seo-suggestions::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          .seo-suggestions::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          
          .seo-suggestions::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
          }
          
          .seo-suggestions::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
          }
          
          /* Additional scrollbar styling for headline generator results */
          .headline-results::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          .headline-results::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          
          .headline-results::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
          }
          
          .headline-results::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
          }
        `}
      </style>
    </div>
  );
};

export default ContentShowcase; 