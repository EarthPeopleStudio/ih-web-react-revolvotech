import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaDownload, FaPrint, FaEye, FaPlus, FaTrash,
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt,
  FaClock, FaDollarSign, FaGlobe, FaPaperPlane, FaEraser,
  FaSun, FaMoon, FaLinkedin, FaQrcode, FaBriefcase, FaIdCard,
  FaMapMarkerAlt, FaFileSignature, FaGift, FaShieldAlt, FaHandshake,
  FaFileContract
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import RevolvoLogo from "../../assets/revolvo-logo.png";
import RevolvoLogoDark from "../../assets/revolvo-logo-dark.png";

// Professional styling matching invoice creator
const PrintStyles = styled.div`
  @media print {
    @page {
      size: A4;
      margin: 0;
    }
    
    * {
      visibility: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }
    
    .printable-offer,
    .printable-offer * {
      visibility: visible !important;
    }
    
    .printable-offer {
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
    
    .printable-offer * {
      font-size: 14pt !important;
    }
  }
  
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
  position: fixed;
  top: 4rem;
  right: 6rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1001;
`;

const TopButton = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &.clear {
    background: rgba(255, 165, 0, 0.1);
    border-color: rgba(255, 165, 0, 0.3);
    color: #ffa500;
    
    &:hover {
      background: rgba(255, 165, 0, 0.2);
      border-color: #ffa500;
    }
  }

  &.theme {
    background: rgba(251, 182, 4, 0.1);
    border-color: rgba(251, 182, 4, 0.3);
    color: #fbb604;
    
    &:hover {
      background: rgba(251, 182, 4, 0.2);
      border-color: #fbb604;
    }
  }

  &.close {
    background: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.3);
    color: #ff4757;
    
    &:hover {
      background: rgba(255, 0, 0, 0.2);
      border-color: #ff4757;
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
    white-space: pre-wrap;
    
    /* Custom scrollbar styling */
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #fbb604;
      border-radius: 4px;
      
      &:hover {
        background: #e6a503;
      }
    }
    
    /* Firefox scrollbar styling */
    scrollbar-width: thin;
    scrollbar-color: #fbb604 rgba(0, 0, 0, 0.1);
  }

  /* Fix benefit description height to match title by default */
  .benefits-section textarea {
    min-height: 47px; /* Match input field height */
    height: 47px;
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbb604' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 3rem;
    
    option {
      background: #1a1a1a;
      color: white;
      padding: 0.5rem;
    }
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

  .remove-btn {
    background: rgba(255, 0, 0, 0.1);
    border: 1px solid rgba(255, 0, 0, 0.3);
    border-radius: 8px;
    color: #ff4757;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    
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
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
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

// Professional Job Offer Preview matching invoice styling
const OfferPreview = styled.div`
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
  margin-bottom: 2rem;
  box-sizing: border-box;

  .offer-header {
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
      bottom: -3px;
      left: 0;
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, #fbb604 0%, #f99b04 100%);
    }


    .company-section {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;

      .logo {
        width: 70px;
        height: 70px;
        margin-top: 0.5rem;
        flex-shrink: 0;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(1.2);
        }
      }

      .company-details {
        .company-name {
          font-size: 1.6rem;
          font-weight: 900;
          color: ${props => props.$isDarkTheme ? 'white' : '#333333'};
          margin-bottom: 0.5rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 40px;
            height: 2px;
            background: #fbb604;
          }
        }
        .tagline {
          color: ${props => props.$isDarkTheme ? '#aaa' : '#444'};
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }
        
        .company-address {
          color: ${props => props.$isDarkTheme ? '#bbb' : '#444'};
          font-size: 0.85rem;
          line-height: 1.4;
          font-weight: 400;
        }
      }
    }

    .offer-details {
      text-align: right;
      
      .offer-title {
        font-size: 2.2rem;
        font-weight: 800;
        color: #fbb604;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        text-shadow: 0 0 20px rgba(251, 182, 4, 0.3);
        line-height: 1;
      }
      
      .offer-meta {
        .offer-number {
          font-size: 1.3rem;
          color: #fbb604;
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(251, 182, 4, 0.3);
          letter-spacing: 0.5px;
        }
        .offer-dates {
          font-size: 0.95rem;
          color: ${props => props.$isDarkTheme ? '#bbb' : '#444'};
          line-height: 1.6;
        }
      }
    }
  }

  .offer-content {
    margin-bottom: 2rem;

    .candidate-section {
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

      .candidate-name {
        font-size: 1.1rem;
        font-weight: 700;
        color: ${props => props.$isDarkTheme ? 'white' : '#333'};
        margin-bottom: 0.5rem;
      }

      .candidate-details {
        color: ${props => props.$isDarkTheme ? '#ccc' : '#444'};
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }

    .offer-body {
      font-size: 1rem;
      line-height: 1.7;
      color: ${props => props.$isDarkTheme ? '#ddd' : '#333'};
      margin-bottom: 2rem;

      p {
        margin-bottom: 1rem;
      }

      .position-details {
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

      .compensation-section {
        margin: 2rem 0;
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
        
        .compensation-title {
          color: #fbb604;
          font-weight: 700;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .salary-highlight {
          margin-bottom: 1.5rem;

          .salary-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            .salary-info {
              .salary-label {
                font-size: 0.9rem;
                color: #fbb604;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 0.5rem;
              }

              .salary-amount {
                font-size: 2.5rem;
                font-weight: 800;
                color: ${props => props.$isDarkTheme ? 'white' : '#333'};
                line-height: 1;
                margin-bottom: 0.25rem;
              }

              .salary-period {
                font-size: 0.95rem;
                color: ${props => props.$isDarkTheme ? '#aaa' : '#666'};
                font-weight: 500;
                text-transform: capitalize;
              }
            }

            .salary-meta {
              text-align: right;
              color: ${props => props.$isDarkTheme ? '#bbb' : '#555'};
              font-size: 0.85rem;
              
              .meta-item {
                margin-bottom: 0.5rem;
                
                .meta-label {
                  color: #fbb604;
                  font-weight: 600;
                  margin-right: 0.5rem;
                }
              }
            }
          }
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

          tbody tr {
            &:nth-child(even) {
              background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
            }
            
            &:hover {
              background: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.1)' : 'rgba(251, 182, 4, 0.05)'} !important;
            }
          }

          td {
            padding: 0.75rem;
            color: ${props => props.$isDarkTheme ? '#ddd' : '#333'};
            border-bottom: 1px solid ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
            font-size: 0.9rem;
          }

          tr:last-child td {
            border-bottom: none;
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
        margin-top: 3rem;
        
        .signature-space {
          height: 80px;
          margin-bottom: 1rem;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 250px;
            height: 1px;
            background: #ddd;
          }
        }
        
        .signatory-name {
          font-weight: 700;
          color: ${props => props.$isDarkTheme ? 'white' : '#333'};
          padding-top: 0.5rem;
          display: inline-block;
          min-width: 200px;
          font-size: 1.05rem;
        }
        
        .signatory-title {
          color: #fbb604;
          font-size: 0.95rem;
          margin-top: 0.25rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
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
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      
      .qr-placeholder {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        /* Fallback for loading state */
        &:not(:has(img)) {
          border: 2px dashed ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.4)' : 'rgba(251, 182, 4, 0.6)'};
          background: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.05)' : 'rgba(251, 182, 4, 0.1)'};
          color: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.6)' : 'rgba(251, 182, 4, 0.8)'};
          font-size: 1.2rem;
        }
      }
      
      .qr-label {
        font-size: 0.7rem;
        color: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.6)' : 'rgba(251, 182, 4, 0.8)'};
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
  }
`;

const JobOfferGenerator = ({ onClose }) => {
  // Get document type information for HR job offer documents
  const getDocumentTypeInfo = (type) => {
    const types = {
      'job-offer': { title: 'JOB OFFER', description: 'Employment Job Offer Letter' },
      'internship-offer': { title: 'INTERNSHIP', description: 'Internship Position Offer' },
      'contract-renewal': { title: 'RENEWAL', description: 'Contract Renewal Offer' },
      'promotion-offer': { title: 'PROMOTION', description: 'Internal Promotion Offer' },
      'part-time-offer': { title: 'PART-TIME', description: 'Part-Time Position Offer' }
    };
    return types[type] || types['job-offer'];
  };

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const previewRef = useRef(null);

  // Generate job offer number
  const generateOfferNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `JO-${new Date().getFullYear()}-${timestamp}`;
  };

  // Employment type configuration (Pakistan labor law compliant)
  const getEmploymentConfig = (employmentType) => {
    const configs = {
      'probationary': {
        hasProbation: true,
        hasExpiry: true,
        defaultProbation: 3,
        defaultExpiryMonths: 3, // 3 months probation
        displayName: 'Probationary',
        employeeNotice: '7 days',
        employerNotice: '7 days'
      },
      'full-time': {
        hasProbation: false,
        hasExpiry: true,
        defaultProbation: 0,
        defaultExpiryMonths: 12,
        displayName: 'Full-Time',
        employeeNotice: '30 days',
        employerNotice: '30 days'
      },
      'part-time': {
        hasProbation: false,
        hasExpiry: true,
        defaultProbation: 0,
        defaultExpiryMonths: 12,
        displayName: 'Part-Time',
        employeeNotice: '30 days',
        employerNotice: '30 days'
      },
      'contract': {
        hasProbation: false,
        hasExpiry: true,
        defaultProbation: 0,
        defaultExpiryMonths: 6,
        displayName: 'Fixed-Term Contract',
        employeeNotice: '30 days',
        employerNotice: '30 days'
      },
      'internship': {
        hasProbation: false,
        hasExpiry: true,
        defaultProbation: 0,
        defaultExpiryMonths: 3,
        displayName: 'Internship',
        employeeNotice: '7 days',
        employerNotice: '7 days'
      }
    };
    return configs[employmentType] || configs['full-time'];
  };

  // Generate employment-type-specific terms and conditions
  const getEmploymentTerms = (employmentType) => {
    const baseTerms = employmentType === 'part-time' 
      ? "This employment contract includes reduced working hours as specified in the employment agreement."
      : "This employment contract includes an 8-hour work day with a 1-hour break.";
    
    const commonTerms = {
      performance: "PERFORMANCE: Employees will receive documented warnings for performance issues. Continued underperformance after formal warning may result in termination with proper notice.",
      grossMisconduct: "GROSS MISCONDUCT: The Company may terminate without notice only for gross misconduct (theft, fraud, serious breach of trust) after show-cause notice and opportunity to respond.",
      resignation: "RESIGNATION WITHOUT NOTICE: If employee resigns without serving contractual notice, Company may deduct equivalent amount from final settlement as permitted under Payment of Wages Act.",
      compliance: "All terms subject to applicable Pakistan labor laws."
    };

    switch (employmentType) {
      case 'probationary':
        return `${baseTerms} PROBATION: The first three (3) months shall be probationary period. Either party may terminate during probation by giving seven (7) days written notice or payment in lieu. CONFIRMATION: Employee will be evaluated at end of probation for confirmation to permanent status. ${commonTerms.performance} ${commonTerms.grossMisconduct} ${commonTerms.resignation} ${commonTerms.compliance}`;
      
      case 'full-time':
        return `${baseTerms} PERMANENT EMPLOYMENT: This is a permanent full-time position. NOTICE PERIODS: Either party may terminate by giving thirty (30) days written notice or payment in lieu. ${commonTerms.performance} ${commonTerms.grossMisconduct} ${commonTerms.resignation} ${commonTerms.compliance}`;
      
      case 'part-time':
        return `${baseTerms} PART-TIME EMPLOYMENT: This is a permanent part-time position with reduced working hours. NOTICE PERIODS: Either party may terminate by giving thirty (30) days written notice or payment in lieu. BENEFITS: Pro-rated benefits based on working hours. ${commonTerms.performance} ${commonTerms.grossMisconduct} ${commonTerms.resignation} ${commonTerms.compliance}`;
      
      case 'contract':
        return `${baseTerms} FIXED-TERM CONTRACT: This is a fixed-term contract position for specified duration. RENEWAL: Contract may be renewed subject to performance and business needs. NOTICE PERIODS: Either party may terminate by giving thirty (30) days written notice or payment in lieu. EXPIRY: Contract automatically expires on specified end date unless renewed. ${commonTerms.performance} ${commonTerms.grossMisconduct} ${commonTerms.resignation} ${commonTerms.compliance}`;
      
      case 'internship':
        return `${baseTerms} INTERNSHIP PROGRAM: This is a learning-focused internship position. DURATION: Fixed 3-month period with possibility of extension. NOTICE PERIODS: Either party may terminate by giving seven (7) days written notice or payment in lieu. LEARNING OBJECTIVES: Focus on skills development, mentorship, and practical experience. EVALUATION: Regular performance reviews and feedback sessions. ${commonTerms.resignation} ${commonTerms.compliance}`;
      
      default:
        return `${baseTerms} ${commonTerms.performance} ${commonTerms.grossMisconduct} ${commonTerms.resignation} ${commonTerms.compliance}`;
    }
  };

  // Contract expiry logic based on employment type
  const getContractExpiry = (employmentType, startDate) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const expiry = new Date(start);
    const config = getEmploymentConfig(employmentType);
    
    expiry.setMonth(expiry.getMonth() + config.defaultExpiryMonths);
    return expiry.toISOString().split('T')[0];
  };

  // Enhanced job offer data structure
  const getDefaultData = () => ({
    companyName: "Revolvo Tech",
    tagline: "Innovation in Motion",
    address: "Väinämöisenkatu 11, 33540 Tampere, Finland",
    phone: "+358 40 123 4567",
    email: "job@revolvo.tech",
    website: "www.revolvo.tech",
    documentType: "job-offer",
    offerNumber: generateOfferNumber(),
    date: new Date().toISOString().split('T')[0],
    
    // Candidate Information
    candidateName: '',
    candidateAddress: '',
    candidateEmail: '',
    candidatePhone: '',
    
    // Position Details
    position: '',
    department: '',
    startDate: (() => {
      const start = new Date();
      start.setDate(start.getDate() + 14); // Default start date 2 weeks from now
      return start.toISOString().split('T')[0];
    })(),
    employmentType: 'full-time',
    workLocation: 'office',
    reportingManager: '',
    salary: 0,
    currency: 'USD',
    salaryPeriod: 'monthly',
    
    // Benefits
    benefits: [
      {
        id: Date.now() + Math.random(),
        title: 'Health Insurance',
        description: 'Comprehensive medical, dental, and vision coverage'
      }
    ],
    
    // Terms
    probationPeriod: '3 months',
    noticePeriod: '30 days',
    contractDuration: '6 months',
    workingHours: '9 AM to 6 PM',
    workingDays: 'Monday to Friday',
    offerValidUntil: (() => {
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 7);
      return validUntil.toISOString().split('T')[0];
    })(),
    contractExpiry: (() => {
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 12); // Default 12 months for full-time
      return expiry.toISOString().split('T')[0];
    })(),
    
    // Disclaimer (Dynamic based on employment type)
    disclaimer: '', // Will be generated dynamically
    
    // Offer Content
    openingParagraph: 'We are pleased to extend this offer of employment to you. This letter outlines the terms and conditions of your employment with Revolvo Tech.',
    closingParagraph: 'We look forward to welcoming you to our team and are excited about the contributions you will make to our organization.',
    
    // Custom Terms and Conditions - will be populated with default terms
    customTermsAndConditions: '',
    
    // Signature
    signatoryName: '',
    signatoryTitle: '',
    signatoryDate: new Date().toISOString().split('T')[0],
    
    // Employee Signature
    employeeSignatureName: '',
    employeeSignatureTitle: 'Employee'
  });

  const [offerData, setOfferData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobOfferData');
      if (saved) {
        const parsedData = JSON.parse(saved);
        const defaultData = getDefaultData();
        return {
          ...defaultData,
          ...parsedData,
          offerNumber: generateOfferNumber()
        };
      }
    } catch (error) {
      console.error('Error loading saved job offer data:', error);
    }
    return getDefaultData();
  });

  // Save to sessionStorage whenever data changes
  useEffect(() => {
    try {
      sessionStorage.setItem('jobOfferData', JSON.stringify(offerData));
    } catch (error) {
      console.error('Error saving job offer data:', error);
    }
  }, [offerData]);

  // Initialize terms and conditions on component mount
  useEffect(() => {
    if (!offerData.customTermsAndConditions.trim()) {
      const defaultTerms = getEmploymentTerms(offerData.employmentType);
      updateField('customTermsAndConditions', defaultTerms);
    }
  }, []); // Run only on mount

  // Generate QR code on component mount
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrDataURL = await QRCode.toDataURL('https://revolvo.tech', {
          width: 80,
          margin: 1,
          color: {
            dark: isDarkTheme ? '#fbb604' : '#333333',
            light: isDarkTheme ? '#0a0a0a' : '#ffffff'
          }
        });
        setQrCodeUrl(qrDataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [isDarkTheme]);

  // Auto-populate terms and conditions based on employment type
  useEffect(() => {
    // Always update terms when employment type changes
    const defaultTerms = getEmploymentTerms(offerData.employmentType);
    updateField('customTermsAndConditions', defaultTerms);
  }, [offerData.employmentType]);

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
    setOfferData(getDefaultData());
    sessionStorage.removeItem('jobOfferData');
  };

  const updateField = (field, value) => {
    setOfferData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-update contract expiry when employment type or start date changes
      if (field === 'employmentType' || field === 'startDate') {
        const startDate = field === 'startDate' ? value : newData.startDate;
        const employmentType = field === 'employmentType' ? value : newData.employmentType;
        
        if (startDate) {
          const expiry = getContractExpiry(employmentType, startDate);
          if (expiry) {
            newData.contractExpiry = expiry;
          }
        }
        
        // Auto-update notice periods and contract duration based on employment type (Pakistan law compliant)
        if (field === 'employmentType') {
          const config = getEmploymentConfig(value);
          // Update unified notice period
          newData.noticePeriod = config.employeeNotice;
          
          // Set contract duration for contract type
          if (value === 'contract') {
            newData.contractDuration = '6 months';
          }
          
          // Set probation period for types that have it
          if (value === 'probationary' || value === 'internship') {
            newData.probationPeriod = '3 months';
          } else if (value === 'full-time' || value === 'part-time') {
            newData.probationPeriod = '3 months'; // Can be customized
          }
        }
        
        // Debug logging
        console.log('Auto-updating based on employment type:', {
          employmentType,
          startDate,
          calculatedExpiry: newData.contractExpiry,
          employerNotice: newData.employerNoticePeriod
        });
      }
      
      return newData;
    });
  };

  // Professional benefit management functions
  const addBenefit = () => {
    const newBenefit = {
      id: Date.now() + Math.random(),
      title: '',
      description: ''
    };
    setOfferData(prev => ({
      ...prev,
      benefits: [...prev.benefits, newBenefit]
    }));
  };

  const updateBenefit = (id, field, value) => {
    setOfferData(prev => ({
      ...prev,
      benefits: prev.benefits.map(benefit => 
        benefit.id === id 
          ? { ...benefit, [field]: value }
          : benefit
      )
    }));
  };

  const removeBenefit = (id) => {
    setOfferData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(benefit => benefit.id !== id)
    }));
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
    
    const imgWidth = 210;
    const maxHeight = 297;
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
    
    pdf.save(`Job-Offer-${offerData.offerNumber}.pdf`);
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
    const pdfWidth = 210;
    const pdfHeight = pdfWidth * canvasRatio;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });
    
    pdf.setFillColor(10, 10, 10);
    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    pdf.save(`Job-Offer-${offerData.offerNumber}.pdf`);
  };

  const sendOffer = async () => {
    if (!offerData.candidateEmail) {
      alert('Please enter candidate email address to send the job offer.');
      return;
    }

    try {
      console.log('Job offer data:', offerData);
      alert(`Job Offer ${offerData.offerNumber} will be sent to ${offerData.candidateEmail}\n\n(Backend implementation needed for actual email sending)`);
    } catch (error) {
      console.error('Error sending job offer:', error);
      alert('Failed to send job offer. Please try again.');
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
            <FaHandshake />
            Job Offer Details
          </SectionTitle>

          <FormGroup>
            <label>
              <FaIdCard className="icon" />
              Offer Number
            </label>
            <input
              type="text"
              value={offerData.offerNumber}
              onChange={(e) => updateField('offerNumber', e.target.value)}
              placeholder="JO-2025-001"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              Date
            </label>
            <input
              type="date"
              value={offerData.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </FormGroup>

          {/* Candidate Information */}
          <SectionTitle>
            <FaUser />
            Candidate Information
          </SectionTitle>

          <FormGroup>
            <label>
              <FaUser className="icon" />
              Full Name
            </label>
            <input
              type="text"
              value={offerData.candidateName}
              onChange={(e) => updateField('candidateName', e.target.value)}
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
              value={offerData.candidateEmail}
              onChange={(e) => updateField('candidateEmail', e.target.value)}
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
              value={offerData.candidatePhone}
              onChange={(e) => updateField('candidatePhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaMapMarkerAlt className="icon" />
              Address
            </label>
            <textarea
              value={offerData.candidateAddress}
              onChange={(e) => updateField('candidateAddress', e.target.value)}
              placeholder="123 Main Street, City, State 12345"
              rows="3"
            />
          </FormGroup>

          {/* Position Details */}
          <SectionTitle>
            <FaBriefcase />
            Position Details
          </SectionTitle>

          <FormGroup>
            <label>
              <FaBriefcase className="icon" />
              Position/Job Title
            </label>
            <input
              type="text"
              value={offerData.position}
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
              value={offerData.department}
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
              value={offerData.startDate}
              onChange={(e) => updateField('startDate', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Employment Type</label>
            <select
              value={offerData.employmentType}
              onChange={(e) => updateField('employmentType', e.target.value)}
            >
              <option value="probationary">Probationary (3 months, 7 days notice)</option>
              <option value="full-time">Full-Time (30 days notice)</option>
              <option value="part-time">Part-Time (30 days notice)</option>
              <option value="contract">Fixed-Term Contract (6 months, 30 days notice)</option>
              <option value="internship">Internship (3 months, 7 days notice)</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Work Location</label>
            <select
              value={offerData.workLocation}
              onChange={(e) => updateField('workLocation', e.target.value)}
            >
              <option value="office">Office</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>
              <FaUser className="icon" />
              Reporting Manager
            </label>
            <input
              type="text"
              value={offerData.reportingManager}
              onChange={(e) => updateField('reportingManager', e.target.value)}
              placeholder="Jane Smith, Engineering Manager"
            />
          </FormGroup>

          {/* Terms & Conditions */}
          <SectionTitle>
            <FaFileSignature />
            Terms & Conditions
          </SectionTitle>

          {getEmploymentConfig(offerData.employmentType).hasProbation && (
            <FormGroup>
              <label>
                <FaClock className="icon" />
                Probation Period
              </label>
              <input
                type="text"
                value={offerData.probationPeriod}
                onChange={(e) => updateField('probationPeriod', e.target.value)}
                placeholder="3 months"
              />
            </FormGroup>
          )}

          {offerData.employmentType === 'contract' && (
            <FormGroup>
              <label>
                <FaCalendarAlt className="icon" />
                Contract Duration
              </label>
              <input
                type="text"
                value={offerData.contractDuration}
                onChange={(e) => updateField('contractDuration', e.target.value)}
                placeholder="6 months"
              />
            </FormGroup>
          )}

          <FormGroup>
            <label>Notice Period (Both Parties)</label>
            <input
              type="text"
              value={offerData.noticePeriod}
              onChange={(e) => updateField('noticePeriod', e.target.value)}
              placeholder="30 days"
            />
          </FormGroup>

          <FormGroup>
            <label>Working Hours</label>
            <input
              type="text"
              value={offerData.workingHours}
              onChange={(e) => updateField('workingHours', e.target.value)}
              placeholder="9 AM to 6 PM"
            />
          </FormGroup>

          <FormGroup>
            <label>Working Days</label>
            <input
              type="text"
              value={offerData.workingDays}
              onChange={(e) => updateField('workingDays', e.target.value)}
              placeholder="Monday to Friday"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              Offer Valid Until
            </label>
            <input
              type="date"
              value={offerData.offerValidUntil}
              onChange={(e) => updateField('offerValidUntil', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              Contract Expiry Date
            </label>
            <input
              type="date"
              value={offerData.contractExpiry}
              onChange={(e) => updateField('contractExpiry', e.target.value)}
              placeholder="Auto-calculated based on employment type"
            />
            <div style={{ 
              fontSize: '0.8rem', 
              color: '#fbb604', 
              marginTop: '0.25rem',
              opacity: 0.8 
            }}>
              Auto-calculated: {getEmploymentConfig(offerData.employmentType).defaultExpiryMonths} months from start date
            </div>
          </FormGroup>

          {/* Compensation Details */}
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
                value={offerData.salary}
                onChange={(e) => updateField('salary', Math.round(parseFloat(e.target.value || 0)))}
                placeholder="75000"
              />
              <div className="number-controls">
                <button type="button" onClick={() => updateField('salary', (offerData.salary || 0) + 1000)}>▲</button>
                <button type="button" onClick={() => updateField('salary', Math.max(0, (offerData.salary || 0) - 1000))}>▼</button>
              </div>
            </div>
          </FormGroup>

          <FormGroup>
            <label>Currency</label>
            <select
              value={offerData.currency}
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
              value={offerData.salaryPeriod}
              onChange={(e) => updateField('salaryPeriod', e.target.value)}
            >
              <option value="annual">Annual</option>
              <option value="monthly">Monthly</option>
              <option value="hourly">Hourly</option>
            </select>
          </FormGroup>

          {/* Benefits Section */}
          <SectionTitle>
            <FaGift />
            Benefits Package
          </SectionTitle>

          <div className="benefits-section">
            {offerData.benefits.map((benefit) => (
            <ItemSection key={benefit.id}>
              <FormGroup>
                <label>Benefit Title</label>
                <input
                  type="text"
                  value={benefit.title}
                  onChange={(e) => updateBenefit(benefit.id, 'title', e.target.value)}
                  placeholder="Health Insurance"
                />
              </FormGroup>
              <ItemGrid>
                <FormGroup>
                  <label>Description</label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => updateBenefit(benefit.id, 'description', e.target.value)}
                    placeholder="Comprehensive medical, dental, and vision coverage"
                    rows="2"
                  />
                </FormGroup>
                <div></div>
                <button
                  className="remove-btn"
                  onClick={() => removeBenefit(benefit.id)}
                >
                  <FaTrash />
                </button>
              </ItemGrid>
            </ItemSection>
          ))}

            <AddItemBtn onClick={addBenefit}>
              <FaPlus />
              Add Benefit
            </AddItemBtn>
          </div>

          {/* Offer Content */}
          <SectionTitle>
            <FaFileSignature />
            Offer Content
          </SectionTitle>

          <FormGroup>
            <label>Opening Paragraph</label>
            <textarea
              value={offerData.openingParagraph}
              onChange={(e) => updateField('openingParagraph', e.target.value)}
              rows="3"
            />
          </FormGroup>

          <FormGroup>
            <label>Closing Paragraph</label>
            <textarea
              value={offerData.closingParagraph}
              onChange={(e) => updateField('closingParagraph', e.target.value)}
              rows="3"
            />
          </FormGroup>

          <FormGroup>
            <label>Employment Disclaimer</label>
            <textarea
              value={offerData.disclaimer}
              onChange={(e) => updateField('disclaimer', e.target.value)}
              rows="4"
              placeholder="Employment terms, work hours, termination conditions, etc."
            />
          </FormGroup>

          {/* Terms and Conditions */}
          <SectionTitle>
            <FaFileContract />
            Terms and Conditions
          </SectionTitle>

          <FormGroup>
            <label>Employment Terms and Conditions</label>
            <textarea
              value={offerData.customTermsAndConditions}
              onChange={(e) => updateField('customTermsAndConditions', e.target.value)}
              rows="6"
              placeholder="Terms and conditions will auto-populate based on employment type"
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
              value={offerData.signatoryName}
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
              value={offerData.signatoryTitle}
              onChange={(e) => updateField('signatoryTitle', e.target.value)}
              placeholder="Human Resources Manager"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaUser className="icon" />
              Employee Signature Name
            </label>
            <input
              type="text"
              value={offerData.employeeSignatureName}
              onChange={(e) => updateField('employeeSignatureName', e.target.value)}
              placeholder="Leave blank to use candidate name"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaBriefcase className="icon" />
              Employee Signature Title
            </label>
            <input
              type="text"
              value={offerData.employeeSignatureTitle}
              onChange={(e) => updateField('employeeSignatureTitle', e.target.value)}
              placeholder="Employee"
            />
          </FormGroup>

          <ActionButtons>
            <button className="secondary" onClick={sendOffer}>
              <FaPaperPlane />
              Send Job Offer
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
          
          <OfferPreview ref={previewRef} className="printable-offer" $isDarkTheme={isDarkTheme}>
            <div className="offer-header">
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
              <div className="offer-details">
                <div className="offer-title">
                  JOB OFFER
                </div>
                <div className="offer-meta">
                  <div className="offer-number">#{offerData.offerNumber}</div>
                  <div className="offer-dates">
                    <div>Date: {new Date(offerData.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</div>
                    {offerData.offerValidUntil && (
                      <div>Valid Until: {new Date(offerData.offerValidUntil).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="offer-content">
              {/* Candidate Section */}
              {offerData.candidateName && (
                <div className="candidate-section">
                  <div className="candidate-name">{offerData.candidateName}</div>
                  <div className="candidate-details">
                    {offerData.candidateAddress && <div>{offerData.candidateAddress}</div>}
                    {offerData.candidateEmail && <div>{offerData.candidateEmail}</div>}
                    {offerData.candidatePhone && <div>{offerData.candidatePhone}</div>}
                  </div>
                </div>
              )}

              <div className="offer-body">
                <p>Dear {offerData.candidateName || '[Candidate Name]'},</p>
                
                <p>{offerData.openingParagraph}</p>

                {/* Position Details Box */}
                <div className="position-details">
                  {offerData.position && (
                    <div className="detail-row">
                      <span className="label">Position:</span>
                      <span className="value">{offerData.position}</span>
                    </div>
                  )}
                  {offerData.department && (
                    <div className="detail-row">
                      <span className="label">Department:</span>
                      <span className="value">{offerData.department}</span>
                    </div>
                  )}
                  {offerData.startDate && (
                    <div className="detail-row">
                      <span className="label">Start Date:</span>
                      <span className="value">{new Date(offerData.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="label">Employment Type:</span>
                    <span className="value">{getEmploymentConfig(offerData.employmentType).displayName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Work Location:</span>
                    <span className="value">{offerData.workLocation.charAt(0).toUpperCase() + offerData.workLocation.slice(1)}</span>
                  </div>
                  {offerData.reportingManager && (
                    <div className="detail-row">
                      <span className="label">Reports To:</span>
                      <span className="value">{offerData.reportingManager}</span>
                    </div>
                  )}

                  {/* Employment Type Specific Terms */}
                  {offerData.employmentType === 'probationary' && (
                    <>
                      <div className="detail-row">
                        <span className="label">Probation Period:</span>
                        <span className="value">{offerData.probationPeriod}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Notice During Probation:</span>
                        <span className="value">{offerData.noticePeriod} (both parties)</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Probation Review:</span>
                        <span className="value">Performance evaluation at end of probation</span>
                      </div>
                    </>
                  )}

                  {(offerData.employmentType === 'full-time' || offerData.employmentType === 'part-time') && (
                    <>
                      <div className="detail-row">
                        <span className="label">Employment Status:</span>
                        <span className="value">Permanent position</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Notice Period:</span>
                        <span className="value">{offerData.noticePeriod} (both parties)</span>
                      </div>
                    </>
                  )}

                  {offerData.employmentType === 'contract' && (
                    <>
                      <div className="detail-row">
                        <span className="label">Contract Duration:</span>
                        <span className="value">{offerData.contractDuration} (renewable)</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Notice Period:</span>
                        <span className="value">{offerData.noticePeriod} (both parties)</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Renewal:</span>
                        <span className="value">Subject to performance and business needs</span>
                      </div>
                    </>
                  )}

                  {offerData.employmentType === 'internship' && (
                    <>
                      <div className="detail-row">
                        <span className="label">Internship Duration:</span>
                        <span className="value">{offerData.probationPeriod}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Notice Period:</span>
                        <span className="value">{offerData.noticePeriod} (both parties)</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Learning Objectives:</span>
                        <span className="value">Skills development and mentorship</span>
                      </div>
                    </>
                  )}

                  <div className="detail-row">
                    <span className="label">Working Hours:</span>
                    <span className="value">{offerData.workingHours}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Working Days:</span>
                    <span className="value">{offerData.workingDays}</span>
                  </div>
                  {offerData.contractExpiry && (
                    <div className="detail-row">
                      <span className="label">Contract Expires:</span>
                      <span className="value">{new Date(offerData.contractExpiry).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                </div>

                {/* Professional Compensation Section */}
                <div className="compensation-section">
                  <div className="compensation-title">Compensation Package</div>
                  
                  <div className="salary-highlight">
                    <div className="salary-content">
                      <div className="salary-info">
                        <div className="salary-label">Base Salary</div>
                        <div className="salary-amount">{formatCurrency(offerData.salary, offerData.currency)}</div>
                        <div className="salary-period">{offerData.salaryPeriod}</div>
                      </div>
                      <div className="salary-meta">
                        <div className="meta-item">
                          <span className="meta-label">Currency:</span>
                          {offerData.currency}
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Benefits:</span>
                          {offerData.benefits?.length || 0} included
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Benefits Table */}
                  {offerData.benefits && offerData.benefits.length > 0 && (
                    <div>
                      <h4 style={{ color: '#fbb604', marginBottom: '1rem' }}>Benefits & Perks</h4>
                      <table className="benefits-table">
                        <thead>
                          <tr>
                            <th>Benefit</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {offerData.benefits.map((benefit, index) => (
                            <tr key={benefit.id}>
                              <td>{benefit.title || `Benefit ${index + 1}`}</td>
                              <td>{benefit.description || 'No description provided'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <p>{offerData.closingParagraph}</p>

                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: isDarkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '8px',
                  borderLeft: '4px solid #fbb604'
                }}>
                  <h4 style={{ 
                    color: '#fbb604', 
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Employment Terms & Conditions
                  </h4>
                  <div style={{
                    color: isDarkTheme ? '#ddd' : '#333',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {offerData.customTermsAndConditions || getEmploymentTerms(offerData.employmentType)}
                  </div>
                </div>

                <div className="closing-section">
                  <div className="closing-text">
                    <p>Sincerely,</p>
                  </div>
                  
                  <div className="signature-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4rem' }}>
                      <div style={{ flex: 1 }}>
                        <div className="signature-space"></div>
                        <div className="signatory-name">{offerData.signatoryName || '[Signatory Name]'}</div>
                        <div className="signatory-title">{offerData.signatoryTitle || '[Title]'}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="signature-space"></div>
                        <div className="signatory-name">{offerData.employeeSignatureName || offerData.candidateName || '[Employee Name]'}</div>
                        <div className="signatory-title">{offerData.employeeSignatureTitle}</div>
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
                  <span className="contact-text">job@revolvo.tech</span>
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
          </OfferPreview>
        </PreviewSection>
      </CreatorContainer>
      </CreatorOverlay>
    </>
  );
};

export default JobOfferGenerator;