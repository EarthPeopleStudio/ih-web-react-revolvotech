import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineCode, AiOutlineRobot, AiOutlineMessage, AiOutlineSmile, AiOutlineFrown, AiOutlineUser } from 'react-icons/ai';
import { FaSmile, FaFrown, FaMeh } from 'react-icons/fa';
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

// Smart Chat Bot Demo
const SmartChatDemo = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?', timestamp: getTimeStamp() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('ready'); // ready, typing, thinking
  const messagesEndRef = useRef(null);
  const suggestedQueries = [
    "What can you help me with?", 
    "Tell me about your features",
    "How do I create a new project?"
  ];

  // Get formatted timestamp
  function getTimeStamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Add a new message to chat
  const addMessage = (role, content) => {
    const newMessage = {
      id: messages.length + 1,
      role,
      content,
      timestamp: getTimeStamp()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    addMessage('user', input);
    
    // Clear input and scroll to bottom
    setInput('');
    setTimeout(scrollToBottom, 100);
    
    // Set typing status
      setIsTyping(true);
    setStatus('thinking');
    
    // Calculate a realistic typing delay based on message length
    const baseDelay = 800; // minimum delay
    const charDelay = 20; // ms per character for typing simulation
    const responseLength = Math.floor(Math.random() * 150) + 50; // random response length
    const thinkingTime = baseDelay + Math.min(1500, input.length * 50); // thinking time before typing
    const typingTime = Math.min(2500, responseLength * charDelay); // time to type the response
    
    // Simulate AI thinking then typing
    setTimeout(() => {
      setStatus('typing');
      
      // After thinking, start typing
      setTimeout(() => {
        // Generate AI response
        let response;
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
          response = "Hello! It's nice to meet you. Is there something specific I can help you with today?";
        } else if (lowerInput.includes('how are you')) {
          response = "I'm functioning well, thank you for asking! I'm here and ready to assist you with whatever you need.";
        } else if (lowerInput.includes('help')) {
          response = "I'd be happy to help! I can provide information, answer questions, assist with tasks, or just chat. What specifically do you need help with?";
        } else if (lowerInput.includes('feature') || lowerInput.includes('do')) {
          response = "I have several capabilities! I can answer questions, provide information on various topics, help with creative tasks, assist with planning, and more. What would you like to know more about?";
        } else if (lowerInput.includes('project') || lowerInput.includes('create')) {
          response = "To create a new project, you can click the 'New Project' button in the dashboard. You'll be prompted to select a template or start from scratch, then you can name your project and begin working on it right away!";
        } else {
          // Detect topic and generate contextually relevant response
          if (lowerInput.includes('weather') || lowerInput.includes('temperature') || lowerInput.includes('forecast')) {
            response = "I don't have access to real-time weather data in this demo, but in a full implementation, I could provide current weather conditions and forecasts for any location you specify.";
          } else if (lowerInput.includes('recommend') || lowerInput.includes('suggestion') || lowerInput.includes('what should')) {
            response = "I'd be happy to provide recommendations based on your preferences. In a complete version, I could suggest products, content, or solutions tailored to your specific needs and interests.";
          } else if (lowerInput.includes('explain') || lowerInput.includes('what is') || lowerInput.includes('how does')) {
            response = "Great question! In a fully implemented version, I could provide detailed explanations about concepts, processes, or technologies, complete with examples to help clarify complex topics.";
          } else {
            response = "I understand your message. This is a demo of what a complete AI assistant could do. In a fully implemented version, I would process your input using advanced natural language understanding to provide helpful, relevant responses.";
          }
        }
        
        // Add AI response
        addMessage('assistant', response);
        setIsTyping(false);
        setStatus('ready');
        
        // Scroll to bottom after response
        setTimeout(scrollToBottom, 100);
      }, typingTime);
    }, thinkingTime);
  };

  // Use suggested query
  const useSuggestedQuery = (query) => {
    setInput(query);
    // Don't auto-submit to give user a chance to edit
  };
  
  // Clear chat history
  const clearChat = () => {
    setMessages([
      { id: 1, role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?', timestamp: getTimeStamp() }
    ]);
  };

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  return (
    <div style={{
      maxWidth: '100%',
      height: '500px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      background: 'linear-gradient(to bottom, #1e1e2d, #1a1a27)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)'
    }}>
      {/* Chat header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
          alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(30, 30, 45, 0.6)',
        backdropFilter: 'blur(10px)'
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FFEB3B, #fbb604)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            boxShadow: '0 4px 12px rgba(255, 235, 59, 0.25)'
          }}>
            <AiOutlineRobot color="#000" size={20} />
          </div>
          <div>
            <div style={{
              fontWeight: 700, 
              fontSize: '15px',
              letterSpacing: '0.2px',
              background: 'linear-gradient(to right, #fff, #ddd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>AI Assistant</div>
            <div style={{
              fontSize: '12px',
              color: status === 'ready' ? '#4caf50' : status === 'thinking' ? '#ff9800' : '#2196f3',
              display: 'flex',
              alignItems: 'center',
              marginTop: '3px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: status === 'ready' ? '#4caf50' : status === 'thinking' ? '#ff9800' : '#2196f3',
                marginRight: '5px',
                boxShadow: `0 0 10px ${status === 'ready' ? '#4caf50' : status === 'thinking' ? '#ff9800' : '#2196f3'}`
              }}></span>
              {status === 'ready' ? 'Online' : status === 'thinking' ? 'Thinking...' : 'Typing...'}
            </div>
          </div>
        </div>
        <button
          onClick={clearChat}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ddd',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
        >
          Clear Chat
        </button>
      </div>
      
      {/* Chat messages */}
      <div style={{
          flex: 1,
          overflowY: 'auto',
        padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#3a3a4a #1a1a27',
        backgroundImage: 'radial-gradient(circle at 15% 85%, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0) 60%), radial-gradient(circle at 85% 25%, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0) 60%)'
      }}>
        {messages.map(message => (
          <div key={message.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              {message.role === 'assistant' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FFEB3B, #fbb604)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(255, 235, 59, 0.15)'
                }}>
                  <AiOutlineRobot color="#000" size={18} />
                </div>
              )}
              <div style={{
                background: message.role === 'user' 
                  ? 'linear-gradient(135deg, #00d4ff, #0099ff)' 
                  : 'rgba(45, 45, 60, 0.8)',
                padding: '14px 18px',
                borderRadius: message.role === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                fontSize: '14px',
                lineHeight: '1.5',
                color: message.role === 'user' ? '#fff' : '#eee',
                boxShadow: message.role === 'user'
                  ? '0 4px 12px rgba(0, 212, 255, 0.2)' 
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderTop: message.role === 'assistant' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                borderLeft: message.role === 'assistant' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
              }}>
                {message.content}
              </div>
              {message.role === 'user' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00d4ff, #0099ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0, 212, 255, 0.2)'
                }}>
                  <AiOutlineUser color="#fff" size={18} />
                </div>
              )}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#888',
              marginTop: '6px',
              marginLeft: message.role === 'assistant' ? '44px' : '0',
              marginRight: message.role === 'user' ? '44px' : '0',
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {message.timestamp}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            maxWidth: '85%',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FFEB3B, #fbb604)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(255, 235, 59, 0.15)'
            }}>
              <AiOutlineRobot color="#000" size={18} />
            </div>
            <div style={{
              background: 'rgba(45, 45, 60, 0.8)',
              padding: '14px 18px',
              borderRadius: '18px 18px 18px 0',
                display: 'flex',
              gap: '6px',
                alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
              <span className="typing-dot" style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                background: '#ddd',
                  opacity: 0.6,
                animation: 'typingAnimation 1.4s infinite both',
                animationDelay: '0s'
              }}></span>
              <span className="typing-dot" style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                background: '#ddd',
                  opacity: 0.6,
                animation: 'typingAnimation 1.4s infinite both',
                animationDelay: '0.2s'
              }}></span>
              <span className="typing-dot" style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                background: '#ddd',
                  opacity: 0.6,
                animation: 'typingAnimation 1.4s infinite both',
                animationDelay: '0.4s'
              }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
        <div style={{
        padding: '16px 20px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(30, 30, 45, 0.6)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Suggested queries */}
        {messages.length < 3 && (
          <div style={{
          display: 'flex',
            gap: '10px',
            marginBottom: '16px',
          overflowX: 'auto',
            padding: '5px 0',
            scrollbarWidth: 'thin',
            scrollbarColor: '#3a3a4a #1a1a27'
        }}>
          {suggestedQueries.map((query, index) => (
            <button 
              key={index}
                onClick={() => useSuggestedQuery(query)}
              style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  color: '#eee',
                cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {query}
            </button>
          ))}
        </div>
      )}
      
        {/* Input form */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
          gap: '12px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
              padding: '14px 18px',
              borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(45, 45, 60, 0.6)',
              color: '#fff',
              fontSize: '14px',
            outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              border: 'none',
              background: input.trim() 
                ? 'linear-gradient(135deg, #FFEB3B, #fbb604)' 
                : 'rgba(45, 45, 60, 0.6)',
              color: input.trim() && !isTyping ? '#000' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() && !isTyping ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              opacity: input.trim() && !isTyping ? 1 : 0.5,
              boxShadow: input.trim() && !isTyping 
                ? '0 4px 12px rgba(255, 235, 59, 0.25)' 
                : 'none'
            }}
            onMouseOver={(e) => {
              if (input.trim() && !isTyping) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(255, 235, 59, 0.3)';
              }
            }}
            onMouseOut={(e) => {
              if (input.trim() && !isTyping) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 235, 59, 0.25)';
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(26, 26, 39, 0.6);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(58, 58, 74, 0.8);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(74, 74, 94, 0.9);
          }
          
          @keyframes typingAnimation {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(-5px); opacity: 1; }
          }
          
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 84, 112, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(255, 84, 112, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 84, 112, 0); }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

// Sentiment Analysis Demo
const SentimentAnalysisDemo = () => {
  // State for form data and results
  const [inputText, setInputText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // Removed history state variables
  const [entities, setEntities] = useState([]);
  const [highlightedText, setHighlightedText] = useState('');
  const [detailedAnalysis, setDetailedAnalysis] = useState(null);
  
  // Reset analysis when input text changes
  useEffect(() => {
      setSentiment(null);
      setConfidence(0);
      setDetailedAnalysis(null);
  }, [inputText]);
  
  // Function to analyze sentiment
  const analyzeSentiment = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing delay for realistic effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple sentiment analysis with word lists
    const text = inputText.toLowerCase();
    const words = text.split(/\s+/);
    
    // Count positive and negative terms
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'happy', 'love', 'like', 'best', 
      'fantastic', 'wonderful', 'enjoy', 'pleased', 'delighted', 'awesome',
      'beautiful', 'perfect', 'joy', 'glad', 'pleasure', 'impressive', 'elegant',
      'favorite', 'brilliant', 'success', 'exceptional', 'lovely', 'magnificent',
      'outstanding', 'superb', 'marvelous', 'grateful', 'satisfied', 'proud'
    ];
    
    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'worst', 'poor', 
      'negative', 'sad', 'disappointed', 'frustrating', 'annoying', 'unpleasant',
      'ugly', 'angry', 'upset', 'disappointing', 'problem', 'failure', 'terrible',
      'disaster', 'broken', 'useless', 'pathetic', 'disgusting', 'inferior',
      'miserable', 'unfortunate', 'unhappy', 'regret', 'worried', 'trouble'
    ];
    
    const intensifiers = [
      'very', 'really', 'extremely', 'absolutely', 'completely', 'totally',
      'highly', 'incredibly', 'utterly', 'thoroughly', 'especially'
    ];
    
    const negators = [
      'not', 'no', 'never', 'don\'t', 'doesn\'t', 'didn\'t', 'won\'t', 'can\'t',
      'couldn\'t', 'shouldn\'t', 'wouldn\'t', 'isn\'t', 'aren\'t', 'wasn\'t',
      'weren\'t', 'haven\'t', 'hasn\'t', 'hadn\'t', 'neither', 'nor'
    ];
    
    // Track sentiment words found and their sentiment value (-1 for negative, 1 for positive)
      const sentimentWords = [];
    let intensifierCount = 0;
    let negationActive = false;
    
    // Process words with context awareness for negation
    for (let i = 0; i < words.length; i++) {
      const cleanWord = words[i].replace(/[^a-z']/g, '');
      
      // Check for negators which flip the sentiment of what follows
      if (negators.includes(cleanWord)) {
        negationActive = true;
        continue;
      }
      
      // Check for intensifiers
      if (intensifiers.includes(cleanWord)) {
          intensifierCount++;
        continue;
        }
        
      // Check for sentiment words and apply negation if active
        if (positiveWords.includes(cleanWord)) {
        if (negationActive) {
          sentimentWords.push({ word: cleanWord, type: 'negative', original: 'positive' });
          negationActive = false; // Reset negation after applying
        } else {
          sentimentWords.push({ word: cleanWord, type: 'positive' });
        }
      } else if (negativeWords.includes(cleanWord)) {
        if (negationActive) {
          sentimentWords.push({ word: cleanWord, type: 'positive', original: 'negative' });
          negationActive = false; // Reset negation after applying
        } else {
          sentimentWords.push({ word: cleanWord, type: 'negative' });
        }
      } else {
        // If we encounter a non-sentiment word, the negation effect typically disappears
        // unless it's a conjunction or common word
        const commonWords = ['and', 'the', 'a', 'an', 'but', 'or', 'so', 'if', 'to', 'at', 'by', 'for'];
        if (!commonWords.includes(cleanWord) && cleanWord.length > 1) {
          negationActive = false;
        }
      }
    }
    
    // Find potential entities (names, places, etc.)
    const potentialEntities = words
      .filter(word => word.length > 1 && /^[A-Z]/.test(word))
      .map(word => ({ name: word.replace(/[^a-zA-Z]/g, ''), type: 'unspecified' }));
    
    // Calculate sentiment scores
    const positiveScore = sentimentWords.filter(w => w.type === 'positive').length;
    const negativeScore = sentimentWords.filter(w => w.type === 'negative').length;
    const effectiveWords = Math.max(1, words.length - intensifierCount);
    
    let result;
    let calculatedConfidence = 50; // Starting with neutral
      let detailedResults = null;
    
    // Calculate sentiment strength
    const sentimentDifference = Math.abs(positiveScore - negativeScore);
    const sentimentRatio = sentimentDifference / Math.max(1, Math.log(effectiveWords + 1));
      
      if (positiveScore > negativeScore) {
        result = 'positive';
      // For positive sentiment, scale from 50% to 100%
      calculatedConfidence = Math.min(100, Math.round(50 + (sentimentRatio * 25) + (intensifierCount * 3)));
        
        // Generate detailed insights
        detailedResults = {
          primarySentiment: 'positive',
          strength: calculatedConfidence > 80 ? 'strong' : calculatedConfidence > 65 ? 'moderate' : 'mild',
          notable: sentimentWords.filter(w => w.type === 'positive').slice(0, 3).map(w => w.word),
          insight: calculatedConfidence > 80 
            ? "The text shows very strong positive sentiment" 
            : calculatedConfidence > 65 
              ? "The text has a moderately positive tone" 
              : "The text contains mildly positive sentiment"
        };
      } else if (negativeScore > positiveScore) {
        result = 'negative';
      // For negative sentiment, scale from 0% to 50%
      calculatedConfidence = Math.max(0, Math.round(50 - (sentimentRatio * 25) - (intensifierCount * 3)));
        
        // Generate detailed insights
        detailedResults = {
          primarySentiment: 'negative',
        strength: calculatedConfidence < 20 ? 'strong' : calculatedConfidence < 35 ? 'moderate' : 'mild',
          notable: sentimentWords.filter(w => w.type === 'negative').slice(0, 3).map(w => w.word),
        insight: calculatedConfidence < 20 
            ? "The text shows very strong negative sentiment" 
          : calculatedConfidence < 35 
              ? "The text has a moderately negative tone" 
              : "The text contains mildly negative sentiment"
        };
      } else {
        // If scores are equal or both 0
        result = 'neutral';
        calculatedConfidence = 50;
        
        // Generate detailed insights
        detailedResults = {
          primarySentiment: 'neutral',
          strength: 'moderate',
          notable: [],
          insight: "The text appears to be neutral or objective in tone"
        };
      }
    
    // Check for negated terms that flipped sentiment
    const negatedWords = sentimentWords.filter(w => w.original);
    if (negatedWords.length > 0) {
      detailedResults.negatedTerms = negatedWords.map(w => w.word);
      if (negatedWords.length > sentimentWords.length / 2) {
        detailedResults.insight += " with significant use of negation";
      }
      }
      
      // If we have both positive and negative, it might be mixed sentiment
      if (positiveScore > 0 && negativeScore > 0 && Math.abs(positiveScore - negativeScore) < 2) {
        detailedResults.mixedSentiment = true;
        detailedResults.insight = "The text contains a mix of positive and negative sentiments";
      }
      
      // Animate the confidence value
      let currentConf = 0;
      const interval = setInterval(() => {
        currentConf += 2;
      setConfidence(Math.min(currentConf, calculatedConfidence));
        if (currentConf >= calculatedConfidence) {
          clearInterval(interval);
        }
      }, 20);
      
      setSentiment(result);
      setEntities(potentialEntities.slice(0, 3));
      setDetailedAnalysis(detailedResults);
      setIsAnalyzing(false);
  };

  // Helper function to get the appropriate icon for the sentiment
  const getIcon = () => {
    if (!sentiment) return null;
    
    switch(sentiment) {
      case 'positive':
        return <div style={{
          fontSize: '36px',
        }}>😊</div>;
      case 'negative':
        return <div style={{
          fontSize: '36px',
        }}>😡</div>;
      case 'neutral':
        return <div style={{
          fontSize: '36px',
        }}>😐</div>;
      default:
        return null;
    }
  };

  // Helper function for background gradient based on sentiment
  const getGradient = () => {
    if (!sentiment) return 'linear-gradient(135deg, #1e1e2d, #1a1a27)';
    
    // Return consistent dark background for all sentiment types
    return 'linear-gradient(135deg, #1e1e2d, #1a1a27)';
  };
  
  // Sample text examples
  const examples = [
    "I absolutely love this product! It's amazing and works perfectly every time.",
    "I'm disappointed with the service. It was slow and didn't meet my expectations.",
    "The meeting is scheduled for tomorrow at 3pm. Please bring the documents."
  ];
  
  const loadExample = (index) => {
    setInputText(examples[index]);
    setSentiment(null);
    setConfidence(0);
    setEntities([]);
    setDetailedAnalysis(null);
  };
  
  const highlightSentiment = (text) => {
    if (!sentiment) return text;
    
    // Simple highlighting based on positive/negative words
    const positiveWords = ['good', 'great', 'excellent', 'awesome', 'amazing', 'happy', 'love', 'like', 'best', 'fantastic', 'wonderful', 'positive', 'beautiful', 'perfect', 'joy', 'glad', 'pleasure', 'enjoy'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'worst', 'poor', 'negative', 'ugly', 'sad', 'angry', 'upset', 'disappointed', 'frustrating', 'annoying', 'sucks', 'fail'];
    
    const words = text.split(/\b/);
    
    return words.map((word, index) => {
      const lowerWord = word.toLowerCase();
      if (positiveWords.includes(lowerWord)) {
        return <span key={index} style={{ color: '#4caf50', fontWeight: 'bold' }}>{word}</span>;
      } else if (negativeWords.includes(lowerWord)) {
        return <span key={index} style={{ color: '#f44336', fontWeight: 'bold' }}>{word}</span>;
      }
      return word;
    });
  };
  
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #1e1e2d, #1a1a27)',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        textAlign: 'center',
        background: 'rgba(35, 35, 50, 0.6)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}>
        <h3 style={{
          margin: 0,
          color: 'white',
          fontSize: '1.3rem',
          fontWeight: '700',
          letterSpacing: '0.5px',
          background: 'linear-gradient(to right, #fff, #ddd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Sentiment Analysis Engine
        </h3>
        <p style={{
          margin: '8px 0 0',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.9rem'
        }}>
          Advanced NLP engine that analyzes text for emotional tone and sentiment patterns
        </p>
        
        {/* Example selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '18px'
        }}>
          <span style={{
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginRight: '5px',
            display: 'flex',
            alignItems: 'center'
          }}>Try examples:</span>
          <button 
            onClick={() => loadExample(0)}
            style={{
              padding: '7px 12px',
              background: 'rgba(76, 175, 80, 0.15)',
              border: '1px solid rgba(76, 175, 80, 0.25)',
              borderRadius: '8px',
              color: '#6ddb72',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(76, 175, 80, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(76, 175, 80, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Positive
          </button>
          <button 
            onClick={() => loadExample(1)}
            style={{
              padding: '7px 12px',
              background: 'rgba(244, 67, 54, 0.15)',
              border: '1px solid rgba(244, 67, 54, 0.25)',
              borderRadius: '8px',
              color: '#ff7b73',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(244, 67, 54, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(244, 67, 54, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Negative
          </button>
          <button 
            onClick={() => loadExample(2)}
            style={{
              padding: '7px 12px',
              background: 'rgba(255, 193, 7, 0.15)',
              border: '1px solid rgba(255, 193, 7, 0.25)',
              borderRadius: '8px',
              color: '#ffd149',
            fontSize: '0.8rem',
              cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 193, 7, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 193, 7, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Neutral
        </button>
      </div>
      
        {/* Removed history toggle button */}
                  </div>
      
      {/* Removed history panel */}
      
      {/* Input Area */}
      <div style={{
        padding: '24px',
        background: 'rgba(30, 30, 45, 0.6)',
        transition: 'none'
      }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to analyze sentiment (e.g., 'I love this amazing product' or 'I'm disappointed with the service')"
          style={{
            width: '100%',
            height: '120px',
            padding: '16px 18px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(45, 45, 60, 0.6)',
            color: 'white',
            fontSize: '0.95rem',
            resize: 'none',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
          }}
        />
        
        <button
          onClick={analyzeSentiment}
          disabled={isAnalyzing || !inputText.trim()}
          style={{
            width: '100%',
            padding: '14px',
            marginTop: '16px',
            background: isAnalyzing 
              ? 'rgba(80, 80, 100, 0.6)' 
              : !inputText.trim() 
                ? 'rgba(255, 235, 59, 0.3)' 
                : 'linear-gradient(135deg, #FFEB3B, #fbb604)',
            color: isAnalyzing ? 'white' : !inputText.trim() ? 'white' : '#000',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: isAnalyzing || !inputText.trim() ? 'default' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isAnalyzing || !inputText.trim() 
              ? 'none' 
              : '0 6px 18px rgba(255, 235, 59, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseOver={(e) => {
            if (!isAnalyzing && inputText.trim()) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 22px rgba(255, 235, 59, 0.3)';
            }
          }}
          onMouseOut={(e) => {
            if (!isAnalyzing && inputText.trim()) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(255, 235, 59, 0.25)';
            }
          }}
        >
          {isAnalyzing ? (
            <>
              <svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="white">
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".3" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"/>
                    </path>
                  </g>
                </g>
              </svg>
              Analyzing...
            </>
          ) : 'Analyze Sentiment'}
        </button>
      </div>
      
      {/* Results Area - Only show when we have results */}
      {(sentiment || isAnalyzing) && (
        <div style={{
          padding: '5px 24px 30px',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease',
          background: 'linear-gradient(135deg, #1e1e2d, #1a1a27)',
          transition: 'none'
        }}>
          {/* Removed divider with emoji indicators */}
          
          <div style={{
            background: 'rgba(30, 30, 45, 0.7)',
            borderRadius: '16px',
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top result section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              width: '100%'
            }}>
              {/* Sentiment icon */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px',
                height: '100px',
                borderRadius: '16px',
                background: 'rgba(25, 25, 35, 0.7)',
                transition: 'all 0.3s ease',
                boxShadow: `0 8px 20px rgba(${sentiment === 'positive' ? '76, 175, 80' : sentiment === 'negative' ? '244, 67, 54' : '255, 193, 7'}, 0.2)`,
                border: `1px solid rgba(${sentiment === 'positive' ? '76, 175, 80' : sentiment === 'negative' ? '244, 67, 54' : '255, 193, 7'}, 0.3)`,
              }}>
                {isAnalyzing ? (
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid rgba(255, 255, 255, 0.1)',
                    borderTop: `4px solid ${sentiment === 'positive' ? '#4caf50' : sentiment === 'negative' ? '#f44336' : '#ffc107'}`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                ) : (
                  <div style={{ fontSize: '60px' }}>
                    {sentiment === 'positive' ? '😊' : sentiment === 'negative' ? '😡' : '😐'}
                  </div>
                )}
              </div>
              
              {/* Text analysis results */}
              <div style={{
                flex: 1,
                textAlign: 'left'
              }}>
                <h3 style={{
                  margin: '0 0 8px',
                  color: sentiment === 'positive' 
                    ? '#4caf50' 
                    : sentiment === 'negative' 
                      ? '#f44336' 
                      : '#ffc107',
                  fontSize: '1.8rem',
                  textTransform: 'capitalize',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}>
                  {isAnalyzing ? 'Analyzing...' : sentiment}
                </h3>
                
                {!isAnalyzing && detailedAnalysis && (
                  <p style={{
                    margin: '0',
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    {detailedAnalysis.insight}
                    {detailedAnalysis.notable.length > 0 && (
                      <>
                        <br/>
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.6)', 
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginTop: '8px',
                          flexWrap: 'wrap'
                        }}>
                          Key terms: 
                          {detailedAnalysis.notable.map((term, i) => (
                            <span 
                              key={i}
                              style={{
                                display: 'inline-block',
                                padding: '4px 10px',
                                background: sentiment === 'positive' 
                                  ? 'rgba(76, 175, 80, 0.15)' 
                                  : sentiment === 'negative' 
                                    ? 'rgba(244, 67, 54, 0.15)' 
                                    : 'rgba(255, 193, 7, 0.15)',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                color: sentiment === 'positive' 
                                  ? '#6ddb72' 
                                  : sentiment === 'negative' 
                                    ? '#ff7b73' 
                                    : '#ffd149',
                                border: `1px solid ${sentiment === 'positive' 
                                  ? 'rgba(76, 175, 80, 0.25)' 
                                  : sentiment === 'negative' 
                                    ? 'rgba(244, 67, 54, 0.25)' 
                                    : 'rgba(255, 193, 7, 0.25)'}`
                              }}
                            >{term}</span>
                          ))}
                        </span>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
            
            {/* Confidence meter */}
            {!isAnalyzing && (
              <div style={{
                width: '100%',
                margin: '0',
                position: 'relative',
                display: 'none' /* Hide the entire confidence meter */
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '0.85rem',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '500'
                  }}>Confidence Score</span>
                  <span style={{
                    color: sentiment === 'positive' 
                      ? '#6ddb72' 
                      : sentiment === 'negative' 
                        ? '#ff7b73' 
                        : '#ffd149',
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}>{confidence}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '10px',
                  background: 'rgba(25, 25, 35, 0.7)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(0, 0, 0, 0.2)'
                }}>
                  <div style={{
                    width: `${confidence}%`,
                    height: '100%',
                    background: sentiment === 'positive' 
                      ? 'linear-gradient(to right, #6ddb72, #4caf50)' 
                      : sentiment === 'negative' 
                        ? 'linear-gradient(to right, #ff7b73, #f44336)' 
                        : 'linear-gradient(to right, #ffd149, #ffc107)',
                    transition: 'width 0.5s ease',
                    borderRadius: '6px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite',
                      borderRadius: '6px'
                    }}></div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  <span>Negative</span>
                  <span>Neutral</span>
                  <span>Positive</span>
                </div>
              </div>
            )}
            
            {/* Highlighted text */}
            {!isAnalyzing && inputText && (
              <div style={{
                width: '100%',
                background: 'rgba(25, 25, 35, 0.7)',
                padding: '16px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'left',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                maxHeight: '120px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#3a3a4a #1a1a27'
              }}>
                {highlightSentiment(inputText)}
              </div>
            )}
          </div>
          
          {/* Entity recognition */}
          {!isAnalyzing && entities.length > 0 && (
            <div style={{
              marginTop: '24px',
              background: 'rgba(30, 30, 45, 0.7)',
              borderRadius: '12px',
              padding: '18px 20px',
              animation: 'fadeIn 0.5s ease',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <h4 style={{
                margin: '0 0 12px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3H14V7H10V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 21H10V12M14 12V21M14 12H19.5L20 14M10 12H4.5L4 14M4 14L2 22H8M4 14C4 14 7 18 12 18C17 18 20 14 20 14M20 14L22 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Detected Entities
              </h4>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                {entities.map((entity, index) => (
                  <div key={index} style={{
                    padding: '7px 12px',
                    background: 'rgba(73, 115, 255, 0.15)',
                    color: '#8fabff',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    border: '1px solid rgba(73, 115, 255, 0.25)',
                    boxShadow: '0 3px 10px rgba(73, 115, 255, 0.1)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(73, 115, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(73, 115, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    {entity.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(26, 26, 39, 0.6);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(58, 58, 74, 0.8);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(74, 74, 94, 0.9);
          }
          
          @keyframes typingAnimation {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(-5px); opacity: 1; }
          }
          
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 84, 112, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(255, 84, 112, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 84, 112, 0); }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

// Main AIShowcase Component
const AIShowcase = () => {
  return (
    <CodeShowcaseGrid>
      {/* Sentiment Analysis */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Sentiment Analysis Engine
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Advanced NLP model that analyzes text for emotional tone and sentiment with confidence scoring.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer data-nocopy="true">
            <CodeHeader>
              <CodeFileName>SentimentAnalyzer.js</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <PreBlock>
{`class SentimentAnalyzer {
  constructor() {
    // Initialize with lexicons
    this.positiveTerms = [
      'good', 'great', 'excellent', 
      'awesome', 'amazing', 'happy', 
      'love', 'like', 'best', 'fantastic'
    ];
    
    this.negativeTerms = [
      'bad', 'terrible', 'awful',
      'horrible', 'hate', 'dislike',
      'worst', 'poor', 'negative', 'sad'
    ];
    
    // Advanced NLP features would be 
    // initialized here in a real app
    this.modelReady = true;
  }
  
  // Analyze text and return sentiment with 
  // confidence score
  async analyzeSentiment(text) {
    if (!this.modelReady) {
      throw new Error('Model not ready');
    }
    
    // In a real app, we'd use a proper NLP
    // model like transformer-based classifier
    
    // For demo, we'll use a simple algorithm
    const tokens = this.tokenize(text);
    
    // Count positive and negative terms
    let positiveScore = 0;
    let negativeScore = 0;
    
    tokens.forEach(token => {
      if (this.positiveTerms.includes(token)) {
        positiveScore++;
      }
      if (this.negativeTerms.includes(token)) {
        negativeScore++;
      }
    });
    
    // Calculate scores
    let sentiment;
    let confidence;
    
    if (positiveScore > negativeScore) {
      sentiment = 'positive';
      confidence = this.calculateConfidence(
        positiveScore, 
        negativeScore, 
        tokens.length
      );
    } else if (negativeScore > positiveScore) {
      sentiment = 'negative';
      confidence = this.calculateConfidence(
        negativeScore, 
        positiveScore, 
        tokens.length
      );
    } else {
      sentiment = 'neutral';
      confidence = 50;
    }
    
    // Return analysis results
    return {
      sentiment,
      confidence,
      details: {
        positiveScore,
        negativeScore,
        wordCount: tokens.length
      }
    };
  }
  
  // Helper method to tokenize text
  tokenize(text) {
    // Simple tokenization by spaces and 
    // lowercase conversion
    // In a real app, we'd use proper NLP 
    // tokenization with stemming/lemmatization
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);
  }
  
  // Calculate confidence score
  calculateConfidence(
    primaryScore, 
    secondaryScore, 
    totalWords
  ) {
    // Simple algorithm to calculate confidence
    // - Base confidence starts at 50%
    // - Add weighted difference between scores
    // - Cap at 100%
    const baseDifference = 
      primaryScore - secondaryScore;
    
    // More words should require more signal
    // for high confidence
    const weightedDifference = 
      baseDifference / 
      Math.max(1, Math.log(totalWords + 1));
    
    // Calculate final confidence
    const confidence = Math.min(
      100,
      50 + (weightedDifference * 25)
    );
    
    return Math.round(confidence);
  }
  
  // Additional methods for a real 
  // sentiment analyzer:
  // - identifyEntities()
  // - analyzeEmotions()
  // - detectIntensifiers()
  // - handleNegations()
}`}
            </PreBlock>
          </CodeSnippetContainer>
          <DemoContainer>
            <SentimentAnalysisDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
      
      {/* Smart Chat Interface */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            AI Chat Interface
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Interactive chatbot with natural language processing capabilities that can understand and respond to user queries.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer data-nocopy="true">
            <CodeHeader>
              <CodeFileName>AIChat.jsx</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <PreBlock>
{`import React, { 
  useState, 
  useEffect, 
  useRef 
} from 'react';

const AIChat = () => {
  const [messages, setMessages] = 
    useState([{
      role: 'assistant',
      content: 'Hello! How can I help you?'
    }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = 
    useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new 
  // messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);
  
  // Process user input and generate response
  const processMessage = async (userInput) => {
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: userInput
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI thinking
    setIsTyping(true);
    
    try {
      // In a real app, this would call an 
      // AI service API
      const response = await fetchAIResponse(
        userInput
      );
      
      // Add AI response to chat
      setTimeout(() => {
        const aiMessage = {
          role: 'assistant',
          content: response
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('AI processing error:', error);
      setIsTyping(false);
    }
  };
  
  // This would be an actual API call in 
  // a real application
  const fetchAIResponse = async (query) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    // Simple response logic for demo
    if (query.includes('hello')) {
      return 'Hello! How can I assist you today?';
    } else if (query.includes('help')) {
      return 'I can answer questions, provide ' +
        'information, or just chat. What ' +
        'would you like to know?';
    } else {
      return 'I understand your message. ' +
        'In a complete implementation, I would ' +
        'process this with natural language ' +
        'understanding to provide a helpful ' +
        'response.';
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Process the message
    processMessage(input);
  };
  
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={\`message \${msg.role}\`}
          >
            {msg.content}
          </div>
        ))}
        
        {isTyping && (
          <div className="message assistant typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;`}
            </PreBlock>
          </CodeSnippetContainer>
          <DemoContainer>
            <SmartChatDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

export default AIShowcase; 