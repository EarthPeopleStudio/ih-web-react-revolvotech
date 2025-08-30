import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaDownload, FaPrint, FaEye, FaPlus, FaTrash,
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt,
  FaClock, FaDollarSign, FaGlobe, FaPaperPlane, FaEraser,
  FaSun, FaMoon, FaLinkedin, FaQrcode, FaBriefcase, FaIdCard,
  FaMapMarkerAlt, FaFileSignature, FaGift, FaShieldAlt, FaHome
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import RevolvoLogo from "../../assets/revolvo-logo.png";
import RevolvoLogoDark from "../../assets/revolvo-logo-dark.png";

// Print-only styles to isolate and format the employment letter
const PrintStyles = styled.div`
  @media print {
    @page {
      size: A4;
      margin: 0;
    }
    
    /* Reset everything */
    * {
      visibility: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }
    
    /* Show only the employment letter content */
    .printable-letter,
    .printable-letter * {
      visibility: visible !important;
    }
    
    /* Make the letter become the entire page */
    .printable-letter {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 210mm !important;
      height: 297mm !important;
      padding: 15mm !important;
      margin: 0 !important;
      background: #0a0a0a !important;
      color: white !important;
      overflow: hidden !important;
      transform: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      border: none !important;
    }
    
    /* Ensure all content fits on one page */
    .printable-letter * {
      font-size: 14pt !important;
    }
  }
  
  /* Remove container constraints */
  body, html {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: visible !important;
  }
`;

const CreatorOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  
  @media (max-width: 1366px) {
    padding: 1rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const CreatorContainer = styled(motion.div)`
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  width: 100%;
  max-width: 95vw;
  max-height: 95vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
`;

const FormSection = styled.div`
  padding: 2rem;
  overflow-y: auto;
  max-height: 95vh;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.6);
    border-radius: 4px;
    
    &:hover {
      background: rgba(251, 182, 4, 0.8);
    }
  }

  &::-webkit-scrollbar-thumb:active {
    background: #fbb604;
  }
`;

const PreviewSection = styled.div`
  padding: 2rem;
  overflow-y: auto;
  max-height: 95vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.6);
    border-radius: 4px;
    
    &:hover {
      background: rgba(251, 182, 4, 0.8);
    }
  }

  &::-webkit-scrollbar-thumb:active {
    background: #fbb604;
  }
`;

const TopButtons = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const TopButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &.close {
    background: rgba(255, 77, 87, 0.2);
    color: #ff4d57;
    
    &:hover {
      background: rgba(255, 77, 87, 0.3);
      transform: scale(1.1);
    }
  }
  
  &.theme {
    background: rgba(251, 182, 4, 0.2);
    color: #fbb604;
    
    &:hover {
      background: rgba(251, 182, 4, 0.3);
      transform: scale(1.1);
    }
  }
  
  &.clear {
    background: rgba(108, 117, 125, 0.2);
    color: #6c757d;
    
    &:hover {
      background: rgba(108, 117, 125, 0.3);
      transform: scale(1.1);
    }
  }
`;

const SectionTitle = styled.h3`
  color: #fbb604;
  font-size: 1.1rem;
  margin: 2rem 0 1rem 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:first-child {
    margin-top: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    color: #fbb604;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 0.8rem;
    }
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;

    &:focus {
      outline: none;
      border-color: #fbb604;
      box-shadow: 0 0 0 3px rgba(251, 182, 4, 0.1);
      background: rgba(255, 255, 255, 0.08);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.5;
  }

  /* Regular input fields - single line with text wrapping */
  input[type="text"], input[type="email"], input[type="tel"], input[type="date"], input[type="number"] {
    white-space: nowrap;
    overflow-x: auto;
  }

  textarea {
    white-space: pre-wrap;
    resize: vertical;
  }

  .number-input-container {
    position: relative;
    display: flex;
    align-items: center;
    
    input[type="number"] {
      padding-right: 3rem;
    }
    
    .number-controls {
      position: absolute;
      right: 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      
      button {
        background: rgba(251, 182, 4, 0.1);
        border: 1px solid rgba(251, 182, 4, 0.3);
        border-radius: 4px;
        color: #fbb604;
        width: 24px;
        height: 16px;
        font-size: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
          background: rgba(251, 182, 4, 0.2);
          border-color: rgba(251, 182, 4, 0.5);
        }
      }
    }
  }

  /* Custom scrollbar for textareas */
  textarea {
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(251, 182, 4, 0.6);
      border-radius: 3px;
      
      &:hover {
        background: rgba(251, 182, 4, 0.8);
      }
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ffcc33;
    }
  }
`;

const ItemSection = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
  
  @media (max-width: 1366px) {
    gap: 0.75rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .remove-btn {
    background: rgba(255, 0, 0, 0.1);
    border: 1px solid rgba(255, 0, 0, 0.3);
    border-radius: 8px;
    color: #ff4757;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    
    &:hover {
      background: rgba(255, 0, 0, 0.2);
      border-color: rgba(255, 0, 0, 0.5);
      transform: scale(1.05);
    }
  }
`;

const AddItemBtn = styled.button`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.1) 0%, rgba(249, 155, 4, 0.05) 100%);
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 12px;
  color: #fbb604;
  padding: 1rem;
  width: 100%;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  
  &:hover {
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.15) 0%, rgba(249, 155, 4, 0.08) 100%);
    border-color: rgba(251, 182, 4, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(251, 182, 4, 0.2);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  button {
    flex: 1;
    padding: 1rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.primary {
      background: linear-gradient(135deg, #fbb604 0%, #f9a825 100%);
      color: #000;

      &:hover {
        background: linear-gradient(135deg, #f9a825 0%, #fbb604 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(251, 182, 4, 0.3);
      }
    }

    &.secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

// Employment Letter Preview Styles
const LetterPreview = styled.div`
  background: ${props => props.$isDarkTheme ? '#0a0a0a' : '#ffffff'};
  color: ${props => props.$isDarkTheme ? 'white' : '#333333'};
  line-height: 1.6;
  font-size: 14px;
  width: 900px;
  max-width: 100%;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  
  @media (max-width: 1366px) {
    width: 100%;
    max-width: 100%;
    font-size: 13px;
    padding: 1.5rem;
  }
  
  @media (max-width: 1200px) {
    font-size: 12px;
    padding: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 11px;
    padding: 0.75rem;
    border-radius: 8px;
  }
  margin-bottom: 2rem;
  box-sizing: border-box;

  .letter-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 3px solid #fbb604;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, #fbb604 0%, transparent 100%);
    }

    .company-section {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .logo {
        img {
          height: 60px;
          width: auto;
        }
      }

      .company-details {
        .company-name {
          font-size: 1.8rem;
          font-weight: 800;
          color: ${props => props.$isDarkTheme ? 'white' : '#333'};
          margin-bottom: 0.25rem;
          letter-spacing: 1px;
        }

        .tagline {
          color: #fbb604;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .company-address {
          color: ${props => props.$isDarkTheme ? '#ccc' : '#444'};
          font-size: 0.85rem;
          line-height: 1.4;
        }
      }
    }

    .letter-details {
      text-align: right;
      
      .letter-title {
        font-size: 2.2rem;
        font-weight: 800;
        color: #fbb604;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        text-shadow: 0 0 20px rgba(251, 182, 4, 0.3);
        line-height: 1;
      }
      
      .letter-meta {
        .letter-number {
          font-size: 1.3rem;
          color: #fbb604;
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(251, 182, 4, 0.3);
          letter-spacing: 0.5px;
        }
        .letter-dates {
          font-size: 0.95rem;
          color: ${props => props.$isDarkTheme ? '#bbb' : '#444'};
          line-height: 1.6;
        }
      }
    }
  }

  .letter-content {
    margin-bottom: 2rem;

    .recipient-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: ${props => props.$isDarkTheme 
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)' 
        : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)'};
      border-radius: 12px;
      border: 1px solid rgba(251, 182, 4, 0.1);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #fbb604 0%, #f9a825 100%);
        border-radius: 12px 12px 0 0;
      }

      .recipient-name {
        font-size: 1.1rem;
        font-weight: 700;
        color: ${props => props.$isDarkTheme ? 'white' : '#333'};
        margin-bottom: 0.5rem;
      }

      .recipient-details {
        color: ${props => props.$isDarkTheme ? '#ccc' : '#444'};
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }

    .letter-body {
      font-size: 1rem;
      line-height: 1.7;
      color: ${props => props.$isDarkTheme ? '#ddd' : '#333'};
      margin-bottom: 2rem;

      p {
        margin-bottom: 1rem;
      }

      .employment-details {
        background: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.05)' : 'rgba(251, 182, 4, 0.08)'};
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #fbb604;
        margin: 1.5rem 0;

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          
          &:last-child {
            margin-bottom: 0;
          }

          .label {
            font-weight: 600;
            color: #fbb604;
            min-width: 140px;
          }

          .value {
            color: ${props => props.$isDarkTheme ? 'white' : '#333'};
            font-weight: 500;
            text-align: right;
          }
        }
      }

      .benefits-section {
        margin: 2rem 0;
        
        .benefits-title {
          color: #fbb604;
          font-weight: 700;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .benefits-table {
          width: 100%;
          border-collapse: collapse;
          background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(251, 182, 4, 0.1);

          th {
            background: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.1)' : 'rgba(251, 182, 4, 0.15)'};
            color: #fbb604;
            padding: 0.75rem;
            text-align: left;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid rgba(251, 182, 4, 0.3);
          }

          td {
            padding: 0.75rem;
            color: ${props => props.$isDarkTheme ? '#ddd' : '#333'};
            border-bottom: 1px solid ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
            font-size: 0.9rem;

            &:nth-child(even) {
              background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
            }

            &:last-child {
              text-align: right;
              font-weight: 600;
              color: #fbb604;
            }
          }

          tr:last-child td {
            border-bottom: none;
          }
        }

        .total-compensation {
          margin-top: 1rem;
          padding: 1rem;
          background: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.08)' : 'rgba(251, 182, 4, 0.12)'};
          border-radius: 8px;
          border: 1px solid rgba(251, 182, 4, 0.2);
          text-align: center;

          .total-label {
            color: #fbb604;
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }

          .total-amount {
            color: ${props => props.$isDarkTheme ? 'white' : '#333'};
            font-size: 1.5rem;
            font-weight: 800;
          }
        }
      }
    }

    .closing-section {
      margin-top: 2rem;
      
      .closing-text {
        margin-bottom: 3rem;
        font-size: 1rem;
        color: ${props => props.$isDarkTheme ? '#ddd' : '#333'};
      }

      .signature-section {
        display: flex;
        justify-content: space-between;
        
        .signature-block {
          text-align: center;
          
          .signature-line {
            border-bottom: 2px solid ${props => props.$isDarkTheme ? '#333' : '#ccc'};
            width: 200px;
            margin-bottom: 0.5rem;
            height: 40px;
          }
          
          .signature-label {
            font-size: 0.9rem;
            color: ${props => props.$isDarkTheme ? '#bbb' : '#444'};
            font-weight: 600;
          }
        }
      }
    }
  }

  .footer {
    padding-top: 1.5rem;
    border-top: 1px solid ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    font-size: 0.8rem;
    color: ${props => props.$isDarkTheme ? '#888' : '#444'};
    align-items: flex-start;

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem 2rem;
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        
        svg {
          color: #fbb604;
          flex-shrink: 0;
        }
        
        .contact-text {
          color: ${props => props.$isDarkTheme ? '#ccc' : '#333'};
          font-weight: 400;
        }
      }
    }

    .company-info {
      .qr-placeholder {
        width: 80px;
        height: 80px;
        background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        border: 1px solid rgba(251, 182, 4, 0.2);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fbb604;
        font-size: 1.5rem;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 6px;
        }
      }
    }
  }
`;

const EmploymentLetterCreator = ({ onClose }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const previewRef = useRef(null);

  // Generate employment letter number
  const generateLetterNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `EL-${new Date().getFullYear()}-${timestamp}`;
  };

  // Enhanced employment letter data structure
  const getDefaultData = () => ({
    letterNumber: generateLetterNumber(),
    date: new Date().toISOString().split('T')[0],
    
    // Employee Information
    employeeName: '',
    employeeAddress: '',
    employeeEmail: '',
    employeePhone: '',
    employeeId: '',
    
    // Employment Details
    position: '',
    department: '',
    startDate: '',
    employmentType: 'full-time',
    workSchedule: 'standard',
    salary: 0,
    currency: 'USD',
    salaryPeriod: 'annual',
    
    // Benefits
    benefits: [
      {
        id: Date.now() + Math.random(),
        title: 'Health Insurance',
        description: 'Comprehensive medical, dental, and vision coverage',
        value: 0
      }
    ],
    
    // Work Details
    reportingManager: '',
    workLocation: '',
    probationPeriod: 3,
    vacationDays: 25,
    sickDays: 10,
    
    // Contract Terms
    noticePeriod: '30 days',
    contractDuration: '',
    
    // Letter Content
    openingParagraph: 'We are pleased to confirm your employment with Revolvo Tech. This letter serves as official confirmation of your position and employment terms.',
    closingParagraph: 'We look forward to your contributions to our team and wish you success in your new role.',
    
    // Additional Terms
    confidentialityClause: true,
    nonCompeteClause: false,
    intellectualPropertyClause: true,
    
    // Signature
    signatoryName: '',
    signatoryTitle: '',
    signatoryDate: new Date().toISOString().split('T')[0]
  });

  const [letterData, setLetterData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('employmentLetterData');
      if (saved) {
        const parsedData = JSON.parse(saved);
        const defaultData = getDefaultData();
        return {
          ...defaultData,
          ...parsedData,
          letterNumber: generateLetterNumber()
        };
      }
    } catch (error) {
      console.error('Error loading saved employment letter data:', error);
    }
    return getDefaultData();
  });

  // Save to sessionStorage whenever data changes
  useEffect(() => {
    try {
      sessionStorage.setItem('employmentLetterData', JSON.stringify(letterData));
    } catch (error) {
      console.error('Error saving employment letter data:', error);
    }
  }, [letterData]);

  // Generate QR code on component mount
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrDataURL = await QRCode.toDataURL('https://revolvo.tech', {
          width: 80,
          margin: 1,
          color: {
            dark: '#fbb604',
            light: '#0000'
          }
        });
        setQrCodeUrl(qrDataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, []);

  // Currency symbol mapping
  const getCurrencySymbol = (currency) => {
    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'PKR': '₨',
      'CAD': 'C$',
      'AUD': 'A$',
      'JPY': '¥',
      'INR': '₹',
      'CNY': '¥'
    };
    return symbols[currency] || currency + ' ';
  };

  // Format currency with thousand separators
  const formatCurrency = (amount, currency = 'USD') => {
    const symbol = getCurrencySymbol(currency);
    const formattedAmount = parseFloat(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return `${symbol}${formattedAmount}`;
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const clearForm = () => {
    setLetterData(getDefaultData());
    sessionStorage.removeItem('employmentLetterData');
  };

  const updateField = (field, value) => {
    setLetterData(prev => ({ ...prev, [field]: value }));
  };

  // Professional benefit management functions
  const addBenefit = () => {
    const newBenefit = {
      id: Date.now() + Math.random(),
      title: '',
      description: '',
      value: 0
    };
    setLetterData(prev => ({
      ...prev,
      benefits: [...prev.benefits, newBenefit]
    }));
  };

  const updateBenefit = (id, field, value) => {
    setLetterData(prev => ({
      ...prev,
      benefits: prev.benefits.map(benefit => 
        benefit.id === id 
          ? { ...benefit, [field]: field === 'value' ? Math.round(parseFloat(value || 0) * 100) / 100 : value }
          : benefit
      )
    }));
  };

  const removeBenefit = (id) => {
    setLetterData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(benefit => benefit.id !== id)
    }));
  };

  // Calculate total compensation
  const calculateTotalCompensation = () => {
    const baseSalary = parseFloat(letterData.salary) || 0;
    const benefitsValue = letterData.benefits.reduce((sum, benefit) => sum + (parseFloat(benefit.value) || 0), 0);
    return baseSalary + benefitsValue;
  };

  const downloadPrintPDF = async () => {
    const element = previewRef.current;
    
    const canvas = await html2canvas(element, {
      scale: 1.5,
      backgroundColor: '#0a0a0a',
      useCORS: true,
      height: element.scrollHeight,
      width: element.scrollWidth
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    pdf.setFillColor(10, 10, 10);
    pdf.rect(0, 0, 210, 297, 'F');
    
    const imgWidth = 210; // A4 width in mm
    const maxHeight = 297; // A4 height in mm
    const canvasRatio = canvas.height / canvas.width;
    const imgHeight = imgWidth * canvasRatio;
    
    if (imgHeight <= maxHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      const scaledHeight = maxHeight;
      const scaledWidth = scaledHeight / canvasRatio;
      const xOffset = (imgWidth - scaledWidth) / 2;
      pdf.addImage(imgData, 'JPEG', xOffset, 0, scaledWidth, scaledHeight);
    }
    
    pdf.save(`Employment-Letter-${letterData.letterNumber}.pdf`);
  };

  const downloadViewingPDF = async () => {
    const element = previewRef.current;
    
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#0a0a0a',
      useCORS: true,
      height: element.scrollHeight,
      width: element.scrollWidth
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 0.9);
    
    const canvasRatio = canvas.height / canvas.width;
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = pdfWidth * canvasRatio; // Maintain aspect ratio
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });
    
    pdf.setFillColor(10, 10, 10);
    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    pdf.save(`Employment-Letter-${letterData.letterNumber}.pdf`);
  };

  const sendLetter = async () => {
    if (!letterData.employeeEmail) {
      alert('Please enter employee email address to send the employment letter.');
      return;
    }

    try {
      console.log('Employment letter data:', letterData);
      alert(`Employment Letter ${letterData.letterNumber} will be sent to ${letterData.employeeEmail}\n\n(Backend implementation needed for actual email sending)`);
    } catch (error) {
      console.error('Error sending employment letter:', error);
      alert('Failed to send employment letter. Please try again.');
    }
  };

  return (
    <>
      <PrintStyles />
      <CreatorOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      <CreatorContainer
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Form Section */}
        <FormSection>
          <SectionTitle>
            <FaFileSignature />
            Employment Letter Details
          </SectionTitle>

          <FormGroup>
            <label>
              <FaIdCard className="icon" />
              Letter Number
            </label>
            <input
              type="text"
              value={letterData.letterNumber}
              onChange={(e) => updateField('letterNumber', e.target.value)}
              placeholder="EL-2025-001"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              Date
            </label>
            <input
              type="date"
              value={letterData.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </FormGroup>

          {/* Employee Information */}
          <SectionTitle>
            <FaUser />
            Employee Information
          </SectionTitle>

          <FormGroup>
            <label>
              <FaUser className="icon" />
              Full Name
            </label>
            <input
              type="text"
              value={letterData.employeeName}
              onChange={(e) => updateField('employeeName', e.target.value)}
              placeholder="John Doe"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaEnvelope className="icon" />
              Email Address
            </label>
            <input
              type="email"
              value={letterData.employeeEmail}
              onChange={(e) => updateField('employeeEmail', e.target.value)}
              placeholder="john.doe@email.com"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaPhone className="icon" />
              Phone Number
            </label>
            <input
              type="tel"
              value={letterData.employeePhone}
              onChange={(e) => updateField('employeePhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaMapMarkerAlt className="icon" />
              Address
            </label>
            <textarea
              value={letterData.employeeAddress}
              onChange={(e) => updateField('employeeAddress', e.target.value)}
              placeholder="123 Main Street, City, State 12345"
              rows="3"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaIdCard className="icon" />
              Employee ID
            </label>
            <input
              type="text"
              value={letterData.employeeId}
              onChange={(e) => updateField('employeeId', e.target.value)}
              placeholder="EMP-2025-001"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaEnvelope className="icon" />
              Email Address
            </label>
            <input
              type="email"
              value={letterData.employeeEmail}
              onChange={(e) => updateField('employeeEmail', e.target.value)}
              placeholder="john.doe@email.com"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaPhone className="icon" />
              Phone Number
            </label>
            <input
              type="tel"
              value={letterData.employeePhone}
              onChange={(e) => updateField('employeePhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaMapMarkerAlt className="icon" />
              Address
            </label>
            <textarea
              value={letterData.employeeAddress}
              onChange={(e) => updateField('employeeAddress', e.target.value)}
              placeholder="123 Main Street, City, State 12345"
              rows="3"
            />
          </FormGroup>

          {/* Employment Details */}
          <SectionTitle>
            <FaBriefcase />
            Employment Details
          </SectionTitle>

          <FormGroup>
            <label>
              <FaBriefcase className="icon" />
              Position/Job Title
            </label>
            <input
              type="text"
              value={letterData.position}
              onChange={(e) => updateField('position', e.target.value)}
              placeholder="Senior Software Developer"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Department
            </label>
            <input
              type="text"
              value={letterData.department}
              onChange={(e) => updateField('department', e.target.value)}
              placeholder="Engineering"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              Start Date
            </label>
            <input
              type="date"
              value={letterData.startDate}
              onChange={(e) => updateField('startDate', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Employment Type</label>
            <select
              value={letterData.employmentType}
              onChange={(e) => updateField('employmentType', e.target.value)}
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="intern">Internship</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Work Schedule</label>
            <select
              value={letterData.workSchedule}
              onChange={(e) => updateField('workSchedule', e.target.value)}
            >
              <option value="standard">Standard (9-5)</option>
              <option value="flexible">Flexible Hours</option>
              <option value="remote">Remote Work</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </FormGroup>

          {/* Salary Details */}
          <SectionTitle>
            <FaDollarSign />
            Compensation Details
          </SectionTitle>

          <FormGroup>
            <label>
              <FaDollarSign className="icon" />
              Base Salary
            </label>
            <div className="number-input-container">
              <input
                type="number"
                step="1000"
                value={letterData.salary}
                onChange={(e) => updateField('salary', Math.round(parseFloat(e.target.value || 0)))}
                placeholder="75000"
              />
              <div className="number-controls">
                <button type="button" onClick={() => updateField('salary', (letterData.salary || 0) + 1000)}>▲</button>
                <button type="button" onClick={() => updateField('salary', Math.max(0, (letterData.salary || 0) - 1000))}>▼</button>
              </div>
            </div>
          </FormGroup>

          <FormGroup>
            <label>Currency</label>
            <select
              value={letterData.currency}
              onChange={(e) => updateField('currency', e.target.value)}
            >
              <option value="USD">$ - US Dollar</option>
              <option value="EUR">€ - Euro</option>
              <option value="GBP">£ - British Pound</option>
              <option value="PKR">₨ - Pakistani Rupee</option>
              <option value="CAD">C$ - Canadian Dollar</option>
              <option value="AUD">A$ - Australian Dollar</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Salary Period</label>
            <select
              value={letterData.salaryPeriod}
              onChange={(e) => updateField('salaryPeriod', e.target.value)}
            >
              <option value="annual">Annual</option>
              <option value="monthly">Monthly</option>
              <option value="hourly">Hourly</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>
              <FaUser className="icon" />
              Reporting Manager
            </label>
            <input
              type="text"
              value={letterData.reportingManager}
              onChange={(e) => updateField('reportingManager', e.target.value)}
              placeholder="Jane Smith, Engineering Manager"
            />
          </FormGroup>

          {/* Benefits Section - Professional like invoice milestones */}
          <SectionTitle>
            <FaGift />
            Benefits Package
          </SectionTitle>

          {letterData.benefits.map((benefit) => (
            <ItemSection key={benefit.id}>
              <div style={{ marginBottom: '1rem' }}>
                <FormGroup>
                  <label>Benefit Title</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => updateBenefit(benefit.id, 'title', e.target.value)}
                    placeholder="Health Insurance"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Description</label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => updateBenefit(benefit.id, 'description', e.target.value)}
                    placeholder="Comprehensive medical, dental, and vision coverage"
                    rows="2"
                  />
                </FormGroup>
              </div>
              <ItemGrid>
                <FormGroup>
                  <label>
                    <FaDollarSign className="icon" />
                    Annual Value
                  </label>
                  <div className="number-input-container">
                    <input
                      type="number"
                      step="100"
                      value={benefit.value}
                      onChange={(e) => updateBenefit(benefit.id, 'value', e.target.value === '' ? 0 : Math.round(parseFloat(e.target.value) * 100) / 100)}
                      placeholder="0"
                    />
                    <div className="number-controls">
                      <button type="button" onClick={() => updateBenefit(benefit.id, 'value', (benefit.value || 0) + 100)}>▲</button>
                      <button type="button" onClick={() => updateBenefit(benefit.id, 'value', Math.max(0, (benefit.value || 0) - 100))}>▼</button>
                    </div>
                  </div>
                </FormGroup>
                <div></div>
                {letterData.benefits.length > 1 && (
                  <button
                    className="remove-btn"
                    onClick={() => removeBenefit(benefit.id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </ItemGrid>
              <div style={{ color: 'white', fontWeight: '700', textAlign: 'right' }}>
                Value: {formatCurrency(benefit.value, letterData.currency)}
              </div>
            </ItemSection>
          ))}

          <AddItemBtn onClick={addBenefit}>
            <FaPlus />
            Add Benefit
          </AddItemBtn>

          {/* Work Details */}
          <SectionTitle>
            <FaBuilding />
            Work Details
          </SectionTitle>

          <FormGroup>
            <label>
              <FaUser className="icon" />
              Reporting Manager
            </label>
            <input
              type="text"
              value={letterData.reportingManager}
              onChange={(e) => updateField('reportingManager', e.target.value)}
              placeholder="Jane Smith, Engineering Manager"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaMapMarkerAlt className="icon" />
              Work Location
            </label>
            <input
              type="text"
              value={letterData.workLocation}
              onChange={(e) => updateField('workLocation', e.target.value)}
              placeholder="Remote / Tampere Office"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaClock className="icon" />
              Probation Period (months)
            </label>
            <div className="number-input-container">
              <input
                type="number"
                value={letterData.probationPeriod}
                onChange={(e) => updateField('probationPeriod', Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="3"
              />
              <div className="number-controls">
                <button type="button" onClick={() => updateField('probationPeriod', (letterData.probationPeriod || 0) + 1)}>▲</button>
                <button type="button" onClick={() => updateField('probationPeriod', Math.max(0, (letterData.probationPeriod || 0) - 1))}>▼</button>
              </div>
            </div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              Annual Vacation Days
            </label>
            <div className="number-input-container">
              <input
                type="number"
                value={letterData.vacationDays}
                onChange={(e) => updateField('vacationDays', Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="25"
              />
              <div className="number-controls">
                <button type="button" onClick={() => updateField('vacationDays', (letterData.vacationDays || 0) + 1)}>▲</button>
                <button type="button" onClick={() => updateField('vacationDays', Math.max(0, (letterData.vacationDays || 0) - 1))}>▼</button>
              </div>
            </div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaShieldAlt className="icon" />
              Annual Sick Days
            </label>
            <div className="number-input-container">
              <input
                type="number"
                value={letterData.sickDays}
                onChange={(e) => updateField('sickDays', Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="10"
              />
              <div className="number-controls">
                <button type="button" onClick={() => updateField('sickDays', (letterData.sickDays || 0) + 1)}>▲</button>
                <button type="button" onClick={() => updateField('sickDays', Math.max(0, (letterData.sickDays || 0) - 1))}>▼</button>
              </div>
            </div>
          </FormGroup>

          {/* Letter Content */}
          <SectionTitle>
            <FaFileSignature />
            Letter Content
          </SectionTitle>

          <FormGroup>
            <label>Opening Paragraph</label>
            <textarea
              value={letterData.openingParagraph}
              onChange={(e) => updateField('openingParagraph', e.target.value)}
              rows="3"
            />
          </FormGroup>

          <FormGroup>
            <label>Closing Paragraph</label>
            <textarea
              value={letterData.closingParagraph}
              onChange={(e) => updateField('closingParagraph', e.target.value)}
              rows="3"
            />
          </FormGroup>

          {/* Signature Details */}
          <SectionTitle>
            <FaFileSignature />
            Signature Details
          </SectionTitle>

          <FormGroup>
            <label>
              <FaUser className="icon" />
              Signatory Name
            </label>
            <input
              type="text"
              value={letterData.signatoryName}
              onChange={(e) => updateField('signatoryName', e.target.value)}
              placeholder="Sarah Johnson"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaBriefcase className="icon" />
              Signatory Title
            </label>
            <input
              type="text"
              value={letterData.signatoryTitle}
              onChange={(e) => updateField('signatoryTitle', e.target.value)}
              placeholder="Human Resources Manager"
            />
          </FormGroup>

          <ActionButtons>
            <button className="secondary" onClick={sendLetter}>
              <FaPaperPlane />
              Send Letter
            </button>
            <button className="primary" onClick={downloadPrintPDF}>
              <FaPrint />
              Download for Printing
            </button>
            <button className="primary" onClick={downloadViewingPDF}>
              <FaDownload />
              Download PDF
            </button>
          </ActionButtons>
        </FormSection>

        {/* Preview Section */}
        <PreviewSection>
          <TopButtons>
            <TopButton className="clear" onClick={clearForm} title="Clear all fields">
              <FaEraser />
            </TopButton>
            <TopButton className="theme" onClick={toggleTheme} title="Toggle theme">
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </TopButton>
            <TopButton className="close" onClick={onClose} title="Close">
              <FaTimes />
            </TopButton>
          </TopButtons>
          
          <LetterPreview ref={previewRef} className="printable-letter" $isDarkTheme={isDarkTheme}>
            <div className="letter-header">
              <div className="company-section">
                <div className="logo">
                  <img src={isDarkTheme ? RevolvoLogo : RevolvoLogoDark} alt="Revolvo Logo" />
                </div>
                <div className="company-details">
                  <div className="company-name">REVOLVO TECH</div>
                  <div className="tagline">Innovation in Motion</div>
                  <div className="company-address">
                    Väinämöisenkatu 11<br />
                    33540 Tampere<br />
                    Finland
                  </div>
                </div>
              </div>
              <div className="letter-details">
                <div className="letter-title">
                  EMPLOYMENT LETTER
                </div>
                <div className="letter-meta">
                  <div className="letter-number">#{letterData.letterNumber}</div>
                  <div className="letter-dates">
                    <div>Date: {new Date(letterData.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="letter-content">
              {/* Recipient Section */}
              {letterData.employeeName && (
                <div className="recipient-section">
                  <div className="recipient-name">{letterData.employeeName}</div>
                  <div className="recipient-details">
                    {letterData.employeeId && <div>Employee ID: {letterData.employeeId}</div>}
                    {letterData.employeeAddress && <div>{letterData.employeeAddress}</div>}
                    {letterData.employeeEmail && <div>{letterData.employeeEmail}</div>}
                    {letterData.employeePhone && <div>{letterData.employeePhone}</div>}
                  </div>
                </div>
              )}

              <div className="letter-body">
                <p>Dear {letterData.employeeName || '[Employee Name]'},</p>
                
                <p>{letterData.openingParagraph}</p>

                {/* Employment Details Box */}
                <div className="employment-details">
                  {letterData.position && (
                    <div className="detail-row">
                      <span className="label">Position:</span>
                      <span className="value">{letterData.position}</span>
                    </div>
                  )}
                  {letterData.department && (
                    <div className="detail-row">
                      <span className="label">Department:</span>
                      <span className="value">{letterData.department}</span>
                    </div>
                  )}
                  {letterData.startDate && (
                    <div className="detail-row">
                      <span className="label">Start Date:</span>
                      <span className="value">{new Date(letterData.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="label">Employment Type:</span>
                    <span className="value">{letterData.employmentType.charAt(0).toUpperCase() + letterData.employmentType.slice(1).replace('-', ' ')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Work Schedule:</span>
                    <span className="value">{letterData.workSchedule.charAt(0).toUpperCase() + letterData.workSchedule.slice(1).replace('-', ' ')}</span>
                  </div>
                  {letterData.salary && (
                    <div className="detail-row">
                      <span className="label">Base Salary:</span>
                      <span className="value">
                        {formatCurrency(letterData.salary, letterData.currency)} {letterData.salaryPeriod}
                      </span>
                    </div>
                  )}
                  {letterData.reportingManager && (
                    <div className="detail-row">
                      <span className="label">Reports To:</span>
                      <span className="value">{letterData.reportingManager}</span>
                    </div>
                  )}
                  {letterData.workLocation && (
                    <div className="detail-row">
                      <span className="label">Work Location:</span>
                      <span className="value">{letterData.workLocation}</span>
                    </div>
                  )}
                  {letterData.probationPeriod && (
                    <div className="detail-row">
                      <span className="label">Probation Period:</span>
                      <span className="value">{letterData.probationPeriod} months</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="label">Annual Leave:</span>
                    <span className="value">{letterData.vacationDays} vacation days, {letterData.sickDays} sick days</span>
                  </div>
                </div>

                {/* Professional Benefits Table like invoice */}
                {letterData.benefits && letterData.benefits.length > 0 && (
                  <div className="benefits-section">
                    <div className="benefits-title">Benefits Package</div>
                    <table className="benefits-table">
                      <thead>
                        <tr>
                          <th>Benefit</th>
                          <th>Description</th>
                          <th>Annual Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {letterData.benefits.map((benefit, index) => (
                          <tr key={benefit.id}>
                            <td>{benefit.title || `Benefit ${index + 1}`}</td>
                            <td>{benefit.description || 'No description provided'}</td>
                            <td>{formatCurrency(benefit.value, letterData.currency)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    <div className="total-compensation">
                      <div className="total-label">Total Annual Compensation</div>
                      <div className="total-amount">{formatCurrency(calculateTotalCompensation(), letterData.currency)}</div>
                    </div>
                  </div>
                )}

                <p>{letterData.closingParagraph}</p>

                <div className="closing-section">
                  <div className="closing-text">
                    <p>Sincerely,</p>
                  </div>
                  
                  <div className="signature-section">
                    <div className="signature-block">
                      <div className="signature-line"></div>
                      <div className="signature-label">
                        {letterData.signatoryName || '[Signatory Name]'}<br />
                        {letterData.signatoryTitle || '[Title]'}<br />
                        Revolvo Tech
                      </div>
                    </div>
                    <div className="signature-block">
                      <div className="signature-line"></div>
                      <div className="signature-label">
                        Date: {new Date(letterData.signatoryDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer">
              <div className="contact-grid">
                <div className="contact-item">
                  <FaEnvelope />
                  <span className="contact-text">hr@revolvo.tech</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <span className="contact-text">+358 41 7408087</span>
                </div>
                <div className="contact-item">
                  <FaGlobe />
                  <span className="contact-text">revolvo.tech</span>
                </div>
                <div className="contact-item">
                  <FaLinkedin />
                  <span className="contact-text">/company/revolvotech</span>
                </div>
              </div>
              <div className="company-info">
                <div className="qr-placeholder">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="QR Code to revolvo.tech" />
                  ) : (
                    <FaQrcode />
                  )}
                </div>
              </div>
            </div>
          </LetterPreview>
        </PreviewSection>
      </CreatorContainer>
      </CreatorOverlay>
    </>
  );
};

export default EmploymentLetterCreator;