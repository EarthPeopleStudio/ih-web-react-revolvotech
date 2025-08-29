import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch, FaFilter, FaPaperPlane, FaPaperclip, FaSmile,
  FaCircle, FaClock, FaStar, FaEllipsisV, FaPhone, FaVideo,
  FaInfoCircle, FaChartLine, FaUsers, FaComments, FaTimes,
  FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaCheckCircle,
  FaExclamationCircle, FaArrowUp, FaArrowDown, FaChevronDown
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";

const GlobalStyle = createGlobalStyle`
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(102, 126, 234, 0.3) transparent;
  }
  
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  
  *::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
    border-radius: 3px;
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8f9fa;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 280px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;

  @media (max-width: 1024px) {
    width: 240px;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #10b981;
    font-size: 0.9rem;

    .dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: ${pulse} 2s infinite;
    }
  }
`;

const SearchBar = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;

  .search-input {
    position: relative;

    input {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 2.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      background: #f9fafb;

      &:focus {
        outline: none;
        border-color: #667eea;
        background: white;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    }

    .icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
    }

    .filter-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #667eea;
      }
    }
  }
`;

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`;

const ConversationItem = styled(motion.div)`
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.active ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'white'};
  border: 1px solid ${props => props.active ? 'rgba(102, 126, 234, 0.2)' : 'transparent'};

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' : '#f9fafb'};
    transform: translateX(2px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 1rem;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .online-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 2px solid white;
          border-radius: 50%;
        }
      }

      .name {
        font-weight: 600;
        color: #1a1a2e;
        font-size: 0.95rem;
      }
    }

    .meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;

      .time {
        font-size: 0.75rem;
        color: #94a3b8;
      }

      .badge {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 10px;
        font-weight: 600;
      }
    }
  }

  .message-preview {
    color: #64748b;
    font-size: 0.85rem;
    line-height: 1.4;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;

    .tag {
      padding: 0.25rem 0.75rem;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }
  }
`;

const ChatSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-right: 1px solid #e5e7eb;
`;

const ChatHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 1.1rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .details {
      .name {
        font-family: "Poppins", sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        color: #1a1a2e;
      }

      .status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #10b981;
        font-size: 0.85rem;

        .dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
        }
      }
    }
  }

  .actions {
    display: flex;
    gap: 1rem;

    button {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      background: white;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: #667eea;
        border-color: #667eea;
        background: rgba(102, 126, 234, 0.05);
      }
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
`;

const Message = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  ${props => props.sender === 'agent' ? 'flex-direction: row-reverse;' : ''}

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${props => props.sender === 'agent' 
      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .content {
    max-width: 70%;
    
    .bubble {
      padding: 1rem 1.25rem;
      background: ${props => props.sender === 'agent' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : 'white'};
      color: ${props => props.sender === 'agent' ? 'white' : '#1a1a2e'};
      border-radius: ${props => props.sender === 'agent' 
        ? '18px 18px 4px 18px' 
        : '18px 18px 18px 4px'};
      box-shadow: ${props => props.sender === 'agent' 
        ? '0 4px 12px rgba(102, 126, 234, 0.2)' 
        : '0 2px 8px rgba(0, 0, 0, 0.08)'};
      border: ${props => props.sender === 'agent' ? 'none' : '1px solid #e5e7eb'};
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .time {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #94a3b8;
      ${props => props.sender === 'agent' ? 'text-align: right;' : ''}
    }
  }
`;

const ChatInput = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: white;

  .input-container {
    display: flex;
    gap: 1rem;
    align-items: flex-end;

    .input-wrapper {
      flex: 1;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.3s ease;

      &:focus-within {
        border-color: #667eea;
        background: white;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      input {
        flex: 1;
        border: none;
        background: none;
        outline: none;
        font-size: 0.95rem;
        color: #1a1a2e;

        &::placeholder {
          color: #94a3b8;
        }
      }

      .actions {
        display: flex;
        gap: 0.5rem;

        button {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;

          &:hover {
            color: #667eea;
          }
        }
      }
    }

    .send-button {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .quick-replies {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;

    .quick-reply {
      padding: 0.5rem 1rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 20px;
      font-size: 0.85rem;
      color: #64748b;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: #667eea;
        color: #667eea;
        background: rgba(102, 126, 234, 0.05);
      }
    }
  }
`;

const InfoPanel = styled.div`
  width: 350px;
  background: white;
  border-left: 1px solid #e5e7eb;
  overflow-y: auto;
  
  @media (max-width: 1400px) {
    width: 300px;
  }
`;

const CustomerInfo = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    margin: 0 auto 1rem;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .name {
    font-family: "Poppins", sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 0.25rem;
  }

  .email {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;

    .stat {
      text-align: center;

      .value {
        font-size: 1.2rem;
        font-weight: 700;
        color: #1a1a2e;
        margin-bottom: 0.25rem;
      }

      .label {
        font-size: 0.75rem;
        color: #94a3b8;
        text-transform: uppercase;
      }
    }
  }
`;

const InfoSection = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f3f4f6;

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #94a3b8;
      font-size: 0.9rem;
    }

    .value {
      color: #1a1a2e;
      font-weight: 500;
      font-size: 0.9rem;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .tag {
      padding: 0.25rem 0.75rem;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 100;

  .notification-icon {
    position: relative;
    cursor: pointer;
    color: #64748b;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: #667eea;
    }

    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 18px;
      height: 18px;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
    }
  }

  .agent-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
    }

    .details {
      .name {
        font-weight: 600;
        color: #1a1a2e;
        font-size: 0.9rem;
      }

      .role {
        color: #94a3b8;
        font-size: 0.75rem;
      }
    }

    .dropdown {
      margin-left: 0.5rem;
      cursor: pointer;
      color: #94a3b8;
      
      &:hover {
        color: #64748b;
      }
    }
  }
`;

// Mock data
const mockConversations = [
  {
    id: 1,
    name: "John Smith",
    avatar: null,
    lastMessage: "Hi, I need help with finding a helper for tomorrow's party setup",
    time: "2 min ago",
    unread: 2,
    online: true,
    tags: ["New User", "Urgent"]
  },
  {
    id: 2,
    name: "Emily Johnson",
    avatar: null,
    lastMessage: "The helper cancelled at the last minute, what should I do?",
    time: "15 min ago",
    unread: 0,
    online: true,
    tags: ["VIP"]
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: null,
    lastMessage: "Thank you for your help!",
    time: "1 hour ago",
    unread: 0,
    online: false,
    tags: ["Resolved"]
  },
  {
    id: 4,
    name: "Sarah Davis",
    avatar: null,
    lastMessage: "I want to become a helper, how do I start?",
    time: "2 hours ago",
    unread: 1,
    online: true,
    tags: ["Helper Onboarding"]
  },
  {
    id: 5,
    name: "Robert Wilson",
    avatar: null,
    lastMessage: "Is there a way to schedule recurring tasks?",
    time: "3 hours ago",
    unread: 0,
    online: false,
    tags: ["Feature Request"]
  }
];

const mockMessages = [
  {
    id: 1,
    sender: "customer",
    text: "Hi, I need help with finding a helper for tomorrow's party setup",
    time: "10:30 AM"
  },
  {
    id: 2,
    sender: "agent",
    text: "Hello John! I'd be happy to help you find the perfect helper for your party setup. What time do you need them, and what specific tasks will they be helping with?",
    time: "10:31 AM"
  },
  {
    id: 3,
    sender: "customer",
    text: "The party starts at 5 PM, so I need someone from 2 PM to help with decorations, furniture arrangement, and general setup",
    time: "10:32 AM"
  },
  {
    id: 4,
    sender: "agent",
    text: "Perfect! I can see we have several experienced helpers available in your area for tomorrow afternoon. They specialize in event setup and have great ratings. Let me send you their profiles.",
    time: "10:33 AM"
  }
];

const SupportDashboard = () => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const agentData = localStorage.getItem("supportAgent");
    if (!agentData) {
      navigate("/support/login");
    } else {
      setAgent(JSON.parse(agentData));
    }
  }, [navigate]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "agent",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("supportAgent");
    navigate("/support/login");
  };

  return (
    <>
      <GlobalStyle />
      <DashboardContainer>
        <Sidebar>
          <SidebarHeader>
            <h2>
              <HiLightningBolt style={{ color: '#667eea' }} />
              Support Center
            </h2>
            <div className="status">
              <div className="dot" />
              <span>Live - 5 Active Chats</span>
            </div>
          </SidebarHeader>

          <SearchBar>
            <div className="search-input">
              <FaSearch className="icon" />
              <input type="text" placeholder="Search conversations..." />
              <FaFilter className="filter-icon" />
            </div>
          </SearchBar>

          <ConversationList>
            {mockConversations.map(conv => (
              <ConversationItem
                key={conv.id}
                active={selectedConversation?.id === conv.id}
                onClick={() => setSelectedConversation(conv)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="header">
                  <div className="user-info">
                    <div className="avatar">
                      {conv.name.charAt(0)}
                      {conv.online && <div className="online-indicator" />}
                    </div>
                    <div className="name">{conv.name}</div>
                  </div>
                  <div className="meta">
                    <div className="time">{conv.time}</div>
                    {conv.unread > 0 && (
                      <div className="badge">{conv.unread}</div>
                    )}
                  </div>
                </div>
                <div className="message-preview">{conv.lastMessage}</div>
                <div className="tags">
                  {conv.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </ConversationItem>
            ))}
          </ConversationList>
        </Sidebar>

        <ChatSection>
          <ChatHeader>
            <div className="user-info">
              <div className="avatar">
                {selectedConversation?.name.charAt(0)}
              </div>
              <div className="details">
                <div className="name">{selectedConversation?.name}</div>
                <div className="status">
                  <div className="dot" />
                  <span>Active now</span>
                </div>
              </div>
            </div>
            <div className="actions">
              <button><FaPhone /></button>
              <button><FaVideo /></button>
              <button><FaInfoCircle /></button>
              <button><FaEllipsisV /></button>
            </div>
          </ChatHeader>

          <ChatMessages>
            <AnimatePresence>
              {messages.map(msg => (
                <Message
                  key={msg.id}
                  sender={msg.sender}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="avatar">
                    {msg.sender === 'agent' ? 'S' : selectedConversation?.name.charAt(0)}
                  </div>
                  <div className="content">
                    <div className="bubble">{msg.text}</div>
                    <div className="time">{msg.time}</div>
                  </div>
                </Message>
              ))}
            </AnimatePresence>
          </ChatMessages>

          <ChatInput>
            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div className="actions">
                  <button><FaPaperclip /></button>
                  <button><FaSmile /></button>
                </div>
              </div>
              <button 
                className="send-button"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                Send
                <FaPaperPlane />
              </button>
            </div>
            <div className="quick-replies">
              <div className="quick-reply">How can I help you?</div>
              <div className="quick-reply">Let me check that for you</div>
              <div className="quick-reply">I'll connect you with a specialist</div>
              <div className="quick-reply">Is there anything else?</div>
            </div>
          </ChatInput>
        </ChatSection>

        <InfoPanel>
          <CustomerInfo>
            <div className="avatar">
              {selectedConversation?.name.charAt(0)}
            </div>
            <div className="name">{selectedConversation?.name}</div>
            <div className="email">john.smith@email.com</div>
            <div className="stats">
              <div className="stat">
                <div className="value">12</div>
                <div className="label">Tasks</div>
              </div>
              <div className="stat">
                <div className="value">4.8</div>
                <div className="label">Rating</div>
              </div>
              <div className="stat">
                <div className="value">2</div>
                <div className="label">Years</div>
              </div>
            </div>
          </CustomerInfo>

          <InfoSection>
            <h3>
              <FaInfoCircle />
              Customer Details
            </h3>
            <div className="info-item">
              <span className="label">Location</span>
              <span className="value">New York, NY</span>
            </div>
            <div className="info-item">
              <span className="label">Member Since</span>
              <span className="value">Jan 2022</span>
            </div>
            <div className="info-item">
              <span className="label">Total Spent</span>
              <span className="value">$2,450</span>
            </div>
            <div className="info-item">
              <span className="label">Last Activity</span>
              <span className="value">2 min ago</span>
            </div>
          </InfoSection>

          <InfoSection>
            <h3>
              <FaClock />
              Recent Activities
            </h3>
            <div className="info-item">
              <span className="label">Task Completed</span>
              <span className="value">2 days ago</span>
            </div>
            <div className="info-item">
              <span className="label">Review Posted</span>
              <span className="value">1 week ago</span>
            </div>
            <div className="info-item">
              <span className="label">Profile Updated</span>
              <span className="value">2 weeks ago</span>
            </div>
          </InfoSection>

          <InfoSection>
            <h3>
              <FaStar />
              Tags
            </h3>
            <div className="tags">
              <div className="tag">Premium User</div>
              <div className="tag">Frequent</div>
              <div className="tag">NYC</div>
              <div className="tag">Events</div>
            </div>
          </InfoSection>
        </InfoPanel>

        <TopBar>
          <div className="notification-icon">
            <FaBell />
            <div className="badge">3</div>
          </div>
          <div className="agent-info">
            <div className="avatar">S</div>
            <div className="details">
              <div className="name">{agent?.name || "Support Agent"}</div>
              <div className="role">Support Team</div>
            </div>
            <FaChevronDown 
              className="dropdown" 
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </TopBar>
      </DashboardContainer>
    </>
  );
};

export default SupportDashboard;