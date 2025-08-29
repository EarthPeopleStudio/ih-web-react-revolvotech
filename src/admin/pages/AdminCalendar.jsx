import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt, FaPlus, FaClock, FaUser, FaBuilding,
  FaPhone, FaVideo, FaTimes, FaEdit, FaTrash, FaCheck,
  FaExclamationTriangle, FaFileInvoiceDollar
} from 'react-icons/fa';
import RevolvoCard from '../components/RevolvoCard';

const CalendarContainer = styled.div`
  padding: 2rem;
  background: #0a0a0a;
  min-height: calc(100vh - 70px);
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  h1 {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .icon {
      color: #fbb604;
    }
  }
`;

const AddEventButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
  color: #000;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(251, 182, 4, 0.3);
  }
`;

const CalendarLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  height: calc(100vh - 200px);
`;

const CalendarMain = styled.div`
  background: rgba(25, 25, 30, 0.8);
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 2rem;
  overflow: hidden;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
`;

const CalendarHeader2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  .nav-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    button {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(251, 182, 4, 0.1);
        color: #fbb604;
      }
    }
    
    .month-year {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 1rem;
    }
  }
  
  .view-switcher {
    display: flex;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    overflow: hidden;
    
    button {
      padding: 0.5rem 1rem;
      border: none;
      background: ${props => props.active ? 'rgba(251, 182, 4, 0.2)' : 'transparent'};
      color: ${props => props.active ? '#fbb604' : 'rgba(255, 255, 255, 0.7)'};
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(251, 182, 4, 0.1);
        color: #fbb604;
      }
    }
  }
`;

const DayHeader = styled.div`
  background: rgba(25, 25, 30, 0.9);
  color: rgba(255, 255, 255, 0.8);
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DayCell = styled.div`
  background: rgba(15, 15, 20, 0.8);
  min-height: 120px;
  padding: 0.5rem;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(251, 182, 4, 0.05);
  }
  
  &.other-month {
    opacity: 0.3;
  }
  
  &.today {
    background: rgba(251, 182, 4, 0.1);
    border: 2px solid rgba(251, 182, 4, 0.3);
  }
  
  .day-number {
    color: white;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .events {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

const EventDot = styled.div`
  width: 100%;
  height: 20px;
  background: ${props => props.color};
  border-radius: 4px;
  font-size: 0.7rem;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const UpcomingEvents = styled.div`
  flex: 1;
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
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

const EventItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 4px solid ${props => props.color};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }
  
  .event-header {
    display: flex;
    justify-content: between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
    
    .title {
      color: white;
      font-weight: 600;
      font-size: 0.95rem;
      margin-bottom: 0.25rem;
    }
    
    .type {
      background: ${props => props.color};
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      text-transform: uppercase;
      font-weight: 600;
    }
  }
  
  .event-details {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    .detail {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .icon {
        color: #fbb604;
        width: 12px;
      }
    }
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h3 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(239, 68, 68, 0.2);
    }
  }
`;

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Client Meeting - Acme Corp",
    type: "meeting",
    date: new Date(2024, 7, 30, 14, 0),
    duration: 60,
    client: "John Doe",
    color: "#fbb604",
    description: "Project kickoff meeting"
  },
  {
    id: 2, 
    title: "Invoice Due - Tech Startup",
    type: "invoice",
    date: new Date(2024, 7, 31, 9, 0),
    amount: 8500,
    client: "Jane Smith",
    color: "#4caf50",
    description: "Payment deadline"
  },
  {
    id: 3,
    title: "Project Deadline - Website",
    type: "deadline",
    date: new Date(2024, 8, 2, 17, 0),
    project: "Digital Agency Website",
    color: "#ef4444",
    description: "Final delivery due"
  },
  {
    id: 4,
    title: "Team Standup",
    type: "meeting", 
    date: new Date(2024, 7, 29, 10, 0),
    duration: 30,
    color: "#2196f3",
    description: "Daily team sync"
  }
];

const AdminCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [events] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === new Date().toDateString()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDay = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <h1>
          <FaCalendarAlt className="icon" />
          Calendar
        </h1>
        <AddEventButton onClick={() => setShowModal(true)}>
          <FaPlus />
          Add Event
        </AddEventButton>
      </CalendarHeader>

      <CalendarLayout>
        <CalendarMain>
          <CalendarHeader2>
            <div className="nav-controls">
              <button onClick={() => navigateMonth(-1)}>‹</button>
              <span className="month-year">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button onClick={() => navigateMonth(1)}>›</button>
            </div>
            
            <div className="view-switcher">
              <button 
                className={view === 'month' ? 'active' : ''}
                onClick={() => setView('month')}
              >
                Month
              </button>
              <button 
                className={view === 'week' ? 'active' : ''}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button 
                className={view === 'day' ? 'active' : ''}
                onClick={() => setView('day')}
              >
                Day
              </button>
            </div>
          </CalendarHeader2>

          <CalendarGrid>
            {dayNames.map(day => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
            
            {days.map((day, index) => (
              <DayCell
                key={index}
                className={`
                  ${!day.isCurrentMonth ? 'other-month' : ''}
                  ${day.isToday ? 'today' : ''}
                `}
                onClick={() => console.log('Day clicked:', day.date)}
              >
                <div className="day-number">
                  {day.date.getDate()}
                </div>
                <div className="events">
                  {getEventsForDay(day.date).map(event => (
                    <EventDot
                      key={event.id}
                      color={event.color}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                    >
                      {event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title}
                    </EventDot>
                  ))}
                </div>
              </DayCell>
            ))}
          </CalendarGrid>
        </CalendarMain>

        <Sidebar>
          <RevolvoCard 
            title="Upcoming Events" 
            subtitle={`Next ${upcomingEvents.length} events`}
            compact
          >
            <EventsList>
              <AnimatePresence>
                {upcomingEvents.map((event) => (
                  <EventItem
                    key={event.id}
                    color={event.color}
                    onClick={() => setSelectedEvent(event)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="event-header">
                      <div>
                        <div className="title">{event.title}</div>
                        <div className="type">{event.type}</div>
                      </div>
                    </div>
                    <div className="event-details">
                      <div className="detail">
                        <FaClock className="icon" />
                        {formatTime(event.date)}
                      </div>
                      {event.client && (
                        <div className="detail">
                          <FaUser className="icon" />
                          {event.client}
                        </div>
                      )}
                      {event.amount && (
                        <div className="detail">
                          <FaFileInvoiceDollar className="icon" />
                          ${event.amount.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </EventItem>
                ))}
              </AnimatePresence>
            </EventsList>
          </RevolvoCard>

          <RevolvoCard 
            title="Quick Actions" 
            compact
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button style={{
                padding: '0.75rem',
                background: 'rgba(251, 182, 4, 0.1)',
                border: '1px solid rgba(251, 182, 4, 0.2)',
                borderRadius: '8px',
                color: '#fbb604',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <FaPlus style={{ marginRight: '0.5rem' }} />
                Schedule Meeting
              </button>
              <button style={{
                padding: '0.75rem',
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.2)',
                borderRadius: '8px',
                color: '#4caf50',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <FaFileInvoiceDollar style={{ marginRight: '0.5rem' }} />
                Set Invoice Due
              </button>
              <button style={{
                padding: '0.75rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                color: '#ef4444',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <FaExclamationTriangle style={{ marginRight: '0.5rem' }} />
                Add Deadline
              </button>
            </div>
          </RevolvoCard>
        </Sidebar>
      </CalendarLayout>

      <AnimatePresence>
        {selectedEvent && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <h3>Event Details</h3>
                <button onClick={() => setSelectedEvent(null)}>
                  <FaTimes />
                </button>
              </ModalHeader>
              
              <div style={{ color: 'white' }}>
                <h4 style={{ marginBottom: '1rem', color: selectedEvent.color }}>
                  {selectedEvent.title}
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaCalendarAlt style={{ color: '#fbb604' }} />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaClock style={{ color: '#fbb604' }} />
                    <span>{formatTime(selectedEvent.date)}</span>
                  </div>
                  
                  {selectedEvent.client && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FaUser style={{ color: '#fbb604' }} />
                      <span>{selectedEvent.client}</span>
                    </div>
                  )}
                  
                  {selectedEvent.description && (
                    <div style={{ marginTop: '1rem' }}>
                      <strong>Description:</strong>
                      <p style={{ marginTop: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        {selectedEvent.description}
                      </p>
                    </div>
                  )}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <button style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(251, 182, 4, 0.1)',
                    border: '1px solid rgba(251, 182, 4, 0.2)',
                    borderRadius: '8px',
                    color: '#fbb604',
                    cursor: 'pointer'
                  }}>
                    <FaEdit style={{ marginRight: '0.5rem' }} />
                    Edit
                  </button>
                  <button style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '8px',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}>
                    <FaTrash style={{ marginRight: '0.5rem' }} />
                    Delete
                  </button>
                </div>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </CalendarContainer>
  );
};

export default AdminCalendar;