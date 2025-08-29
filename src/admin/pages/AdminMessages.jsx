import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaComments, FaSearch, FaPlus, FaPaperPlane, FaPhone, FaVideo,
  FaUser, FaCircle, FaEllipsisV, FaPaperclip, FaSmile, FaTimes,
  FaCheck, FaCheckDouble, FaClock, FaImage, FaFile
} from 'react-icons/fa';
import RevolvoCard from '../components/RevolvoCard';

const MessagesContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  background: #0a0a0a;
`;

const MessagesSidebar = styled.div`
  width: 380px;
  background: #0f0f0f;
  border-right: 1px solid rgba(251, 182, 4, 0.1);
  display: flex;
  flex-direction: column;
`;

const MessagesMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
`;

const SidebarHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .icon {
      color: #fbb604;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  .search-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:focus-within {
      border-color: rgba(251, 182, 4, 0.3);
      background: rgba(255, 255, 255, 0.08);
    }
    
    input {
      flex: 1;
      background: none;
      border: none;
      color: white;
      outline: none;
      font-size: 0.9rem;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    .search-icon {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const NewChatButton = styled.button`
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
  color: #000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(251, 182, 4, 0.3);
  }
`;

const ChatsList = styled.div`
  flex: 1;
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(251, 182, 4, 0.5);
    }
  }
`;

const ChatItem = styled(motion.div)`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.active ? 'rgba(251, 182, 4, 0.1)' : 'transparent'};
  
  &:hover {
    background: rgba(251, 182, 4, 0.05);
  }
  
  ${props => props.hasUnread && `
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #fbb604;
    }
  `}
`;

const ChatAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  font-size: 1.2rem;
  margin-right: 1rem;
  flex-shrink: 0;
  position: relative;
  
  .status {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #0f0f0f;
    
    &.online { background: #4caf50; }
    &.away { background: #ff9800; }
    &.busy { background: #f44336; }
    &.offline { background: #666; }
  }
`;

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
    
    .name {
      color: white;
      font-size: 1rem;
      font-weight: 600;
      truncate: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    
    .time {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.8rem;
      flex-shrink: 0;
    }
  }
  
  .preview {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .message-status {
      color: #fbb604;
      font-size: 0.7rem;
    }
    
    .unread-count {
      background: #fbb604;
      color: #000;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;
      margin-left: auto;
    }
  }
`;

const ChatHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(15, 15, 20, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-weight: 700;
    font-size: 1.1rem;
    margin-right: 1rem;
    position: relative;
    
    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #0f0f0f;
      background: #4caf50;
    }
  }
  
  .info {
    .name {
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .status-text {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.85rem;
    }
  }
`;

const ChatActions = styled.div`
  display: flex;
  gap: 0.75rem;
  
  button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.call {
      background: rgba(76, 175, 80, 0.1);
      color: #4caf50;
      
      &:hover {
        background: rgba(76, 175, 80, 0.2);
      }
    }
    
    &.video {
      background: rgba(33, 150, 243, 0.1);
      color: #2196f3;
      
      &:hover {
        background: rgba(33, 150, 243, 0.2);
      }
    }
    
    &.more {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.7);
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
    }
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  overflow-y: auto;
  gap: 1rem;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(251, 182, 4, 0.5);
    }
  }
`;

const Message = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
  
  ${props => props.sent && `
    flex-direction: row-reverse;
    
    .message-bubble {
      background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
      color: #000;
    }
    
    .message-info {
      text-align: right;
    }
  `}
  
  .message-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: ${props => props.sent ? '#fbb604' : 'rgba(255, 255, 255, 0.1)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.sent ? '#000' : 'white'};
    font-weight: 600;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  
  .message-content {
    max-width: 70%;
    
    .message-bubble {
      background: rgba(255, 255, 255, 0.05);
      color: white;
      padding: 1rem 1.25rem;
      border-radius: 18px;
      margin-bottom: 0.5rem;
      position: relative;
      
      ${props => !props.sent && `
        border-bottom-left-radius: 6px;
      `}
      
      ${props => props.sent && `
        border-bottom-right-radius: 6px;
      `}
    }
    
    .message-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
      padding: 0 0.25rem;
      
      .status-icon {
        color: #fbb604;
      }
    }
  }
`;

const MessageInput = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(15, 15, 20, 0.8);
  
  .input-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .message-input {
      flex: 1;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 25px;
      padding: 0.75rem 1.5rem;
      color: white;
      outline: none;
      font-size: 0.95rem;
      resize: none;
      min-height: 20px;
      max-height: 100px;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
      
      &:focus {
        border-color: rgba(251, 182, 4, 0.3);
        background: rgba(255, 255, 255, 0.08);
      }
    }
    
    .input-actions {
      display: flex;
      gap: 0.5rem;
      
      button {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &.attach {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.7);
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
          }
        }
        
        &.send {
          background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
          color: #000;
          
          &:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(251, 182, 4, 0.3);
          }
        }
      }
    }
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  
  .content {
    .icon {
      font-size: 4rem;
      color: rgba(251, 182, 4, 0.3);
      margin-bottom: 1.5rem;
    }
    
    h3 {
      margin-bottom: 0.75rem;
      color: white;
    }
    
    p {
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

// Mock data
const mockChats = [
  {
    id: 1,
    name: "John Doe",
    company: "Acme Corp",
    status: "online",
    lastMessage: "Thanks for the updated proposal!",
    time: "2 min",
    unreadCount: 2,
    lastSeen: "Online",
    avatar: "JD"
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Tech Startup Inc", 
    status: "away",
    lastMessage: "When can we schedule the next milestone review?",
    time: "1 hour",
    unreadCount: 0,
    lastSeen: "1 hour ago",
    avatar: "JS"
  },
  {
    id: 3,
    name: "Mike Johnson",
    company: "Digital Agency LLC",
    status: "busy",
    lastMessage: "The invoice looks good, processing payment now",
    time: "3 hours",
    unreadCount: 1,
    lastSeen: "3 hours ago", 
    avatar: "MJ"
  }
];

const mockMessages = [
  {
    id: 1,
    text: "Hi! I wanted to follow up on the project proposal we discussed.",
    sent: false,
    time: "2:30 PM",
    status: "delivered"
  },
  {
    id: 2,
    text: "Yes, I reviewed it and it looks great! Just had a few questions about the timeline.",
    sent: true,
    time: "2:32 PM",
    status: "read"
  },
  {
    id: 3,
    text: "Of course! Which milestones would you like to discuss?",
    sent: false,
    time: "2:35 PM", 
    status: "delivered"
  },
  {
    id: 4,
    text: "Thanks for the updated proposal! Everything looks perfect now.",
    sent: true,
    time: "2:38 PM",
    status: "read"
  }
];

const AdminMessages = () => {
  const [chats] = useState(mockChats);
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [messages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // In real app, this would send the message
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  const formatTime = (time) => {
    return time;
  };

  return (
    <MessagesContainer>
      <MessagesSidebar>
        <SidebarHeader>
          <h2>
            <FaComments className="icon" />
            Messages
          </h2>
          
          <SearchContainer>
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <NewChatButton>
              <FaPlus />
            </NewChatButton>
          </SearchContainer>
        </SidebarHeader>
        
        <ChatsList>
          <AnimatePresence>
            {filteredChats.map((chat) => (
              <ChatItem
                key={chat.id}
                active={selectedChat?.id === chat.id}
                hasUnread={chat.unreadCount > 0}
                onClick={() => setSelectedChat(chat)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ChatAvatar>
                    {chat.avatar}
                    <div className={`status ${chat.status}`} />
                  </ChatAvatar>
                  
                  <ChatInfo>
                    <div className="header">
                      <div className="name">{chat.name}</div>
                      <div className="time">{chat.time}</div>
                    </div>
                    <div className="preview">
                      <span>{chat.lastMessage}</span>
                      {chat.unreadCount > 0 && (
                        <div className="unread-count">{chat.unreadCount}</div>
                      )}
                    </div>
                  </ChatInfo>
                </div>
              </ChatItem>
            ))}
          </AnimatePresence>
        </ChatsList>
      </MessagesSidebar>
      
      <MessagesMain>
        {selectedChat ? (
          <>
            <ChatHeader>
              <ChatHeaderInfo>
                <div className="avatar">
                  {selectedChat.avatar}
                  <div className="status" />
                </div>
                <div className="info">
                  <div className="name">{selectedChat.name}</div>
                  <div className="status-text">{selectedChat.lastSeen}</div>
                </div>
              </ChatHeaderInfo>
              
              <ChatActions>
                <button className="call">
                  <FaPhone />
                </button>
                <button className="video">
                  <FaVideo />
                </button>
                <button className="more">
                  <FaEllipsisV />
                </button>
              </ChatActions>
            </ChatHeader>
            
            <MessagesArea>
              <AnimatePresence>
                {messages.map((message, index) => (
                  <Message
                    key={message.id}
                    sent={message.sent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="message-avatar">
                      {message.sent ? 'You' : selectedChat.avatar}
                    </div>
                    
                    <div className="message-content">
                      <div className="message-bubble">
                        {message.text}
                      </div>
                      <div className="message-info">
                        <span>{message.time}</span>
                        {message.sent && (
                          <span className="status-icon">
                            {message.status === 'read' ? <FaCheckDouble /> : <FaCheck />}
                          </span>
                        )}
                      </div>
                    </div>
                  </Message>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </MessagesArea>
            
            <MessageInput>
              <div className="input-container">
                <textarea
                  className="message-input"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="1"
                />
                
                <div className="input-actions">
                  <button className="attach">
                    <FaPaperclip />
                  </button>
                  <button className="send" onClick={sendMessage}>
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </MessageInput>
          </>
        ) : (
          <EmptyState>
            <div className="content">
              <FaComments className="icon" />
              <h3>Select a conversation</h3>
              <p>Choose a contact from the list to start messaging</p>
            </div>
          </EmptyState>
        )}
      </MessagesMain>
    </MessagesContainer>
  );
};

export default AdminMessages;