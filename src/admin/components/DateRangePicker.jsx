import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DatePickerButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  position: relative;

  &:hover {
    border-color: rgba(251, 182, 4, 0.3);
    background: linear-gradient(135deg, #151515 0%, #1a1a1a 100%);
    transform: translateY(-1px);
  }

  &.active {
    border-color: rgba(251, 182, 4, 0.5);
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.1) 0%, rgba(251, 182, 4, 0.05) 100%);
  }

  .icon {
    color: #fbb604;
    font-size: 1rem;
  }

  .date-text {
    color: #e0e0e0;
  }

  .placeholder {
    color: #888888;
  }
`;

const CalendarOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarModal = styled(motion.div)`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(40px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  min-width: 400px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .close-btn {
    background: none;
    border: none;
    color: #888888;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      color: white;
      background: rgba(255, 255, 255, 0.05);
    }
  }
`;

const DateInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      color: #cccccc;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    input {
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      color: white;
      font-size: 0.9rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: rgba(251, 182, 4, 0.5);
        background: rgba(255, 255, 255, 0.05);
      }

      &::-webkit-calendar-picker-indicator {
        filter: invert(1);
        cursor: pointer;
      }
    }
  }
`;

const QuickRanges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  button {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    color: #cccccc;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 107, 53, 0.1);
      border-color: rgba(251, 182, 4, 0.3);
      color: white;
    }

    &.active {
      background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
      border-color: transparent;
      color: white;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &.cancel {
      background: rgba(255, 255, 255, 0.05);
      color: #cccccc;
      border: 1px solid rgba(255, 255, 255, 0.1);

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: white;
      }
    }

    &.apply {
      background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(251, 182, 4, 0.3);
      }
    }
  }
`;

const DateRangePicker = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(dateRange?.startDate || '');
  const [tempEndDate, setTempEndDate] = useState(dateRange?.endDate || '');
  const [activeQuickRange, setActiveQuickRange] = useState('');

  const quickRanges = [
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 3 Months', days: 90 },
    { label: 'Last 6 Months', days: 180 },
    { label: 'Last Year', days: 365 },
    { label: 'All Time', days: null }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDateRangeText = () => {
    if (!dateRange?.startDate && !dateRange?.endDate) {
      return 'Select Date Range';
    }
    
    const start = formatDate(dateRange.startDate);
    const end = formatDate(dateRange.endDate);
    
    if (start && end) {
      return `${start} - ${end}`;
    } else if (start) {
      return `From ${start}`;
    } else if (end) {
      return `Until ${end}`;
    }
    
    return 'Select Date Range';
  };

  const handleQuickRange = (range) => {
    setActiveQuickRange(range.label);
    
    if (range.days === null) {
      // All time
      setTempStartDate('2023-01-01');
      setTempEndDate(new Date().toISOString().split('T')[0]);
    } else {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - range.days);
      
      setTempStartDate(startDate.toISOString().split('T')[0]);
      setTempEndDate(endDate.toISOString().split('T')[0]);
    }
  };

  const handleApply = () => {
    onDateRangeChange({
      startDate: tempStartDate,
      endDate: tempEndDate
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempStartDate(dateRange?.startDate || '');
    setTempEndDate(dateRange?.endDate || '');
    setActiveQuickRange('');
    setIsOpen(false);
  };

  return (
    <>
      <DateRangeContainer>
        <DatePickerButton
          className={dateRange?.startDate || dateRange?.endDate ? 'active' : ''}
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaCalendarAlt className="icon" />
          <span className={dateRange?.startDate || dateRange?.endDate ? 'date-text' : 'placeholder'}>
            {getDateRangeText()}
          </span>
        </DatePickerButton>
      </DateRangeContainer>

      <AnimatePresence>
        {isOpen && (
          <CalendarOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && handleCancel()}
          >
            <CalendarModal
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <CalendarHeader>
                <h3>Select Date Range</h3>
                <button className="close-btn" onClick={handleCancel}>
                  <FaTimes />
                </button>
              </CalendarHeader>

              <QuickRanges>
                {quickRanges.map((range) => (
                  <button
                    key={range.label}
                    className={activeQuickRange === range.label ? 'active' : ''}
                    onClick={() => handleQuickRange(range)}
                  >
                    {range.label}
                  </button>
                ))}
              </QuickRanges>

              <DateInputs>
                <div className="input-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={tempStartDate}
                    onChange={(e) => {
                      setTempStartDate(e.target.value);
                      setActiveQuickRange('');
                    }}
                    max={tempEndDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={tempEndDate}
                    onChange={(e) => {
                      setTempEndDate(e.target.value);
                      setActiveQuickRange('');
                    }}
                    min={tempStartDate}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </DateInputs>

              <ActionButtons>
                <button className="cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="apply" onClick={handleApply}>
                  Apply Range
                </button>
              </ActionButtons>
            </CalendarModal>
          </CalendarOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default DateRangePicker;