import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaPlus, FaTrash, FaDownload, FaPrint, FaEye,
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt,
  FaClock, FaDollarSign, FaGlobe, FaPaperPlane, FaEraser
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import RevolvoLogo from "../../assets/revolvo-logo.png";

// Print-only styles to isolate and format the invoice
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
    
    /* Show only the invoice content */
    .printable-invoice,
    .printable-invoice * {
      visibility: visible !important;
    }
    
    /* Make the invoice become the entire page - no container */
    .printable-invoice {
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
    .printable-invoice * {
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
      border-color: rgba(255, 165, 0, 0.5);
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(255, 165, 0, 0.2);
    }
  }

  &.close {
    background: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.3);
    color: #ff4757;
    
    &:hover {
      background: rgba(255, 0, 0, 0.2);
      border-color: rgba(255, 0, 0, 0.5);
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(255, 0, 0, 0.2);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon {
      color: #fbb604;
    }
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: white;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 0, 0, 0.1);
      border-color: rgba(255, 0, 0, 0.3);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;

    .icon {
      color: #fbb604;
      font-size: 0.8rem;
    }
  }

  input, textarea, select {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 0.75rem;
    color: white;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    word-wrap: break-word;
    overflow-wrap: break-word;

    &:focus {
      outline: none;
      border-color: #fbb604;
      background: rgba(255, 255, 255, 0.08);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    /* Custom scrollbar for textareas and select dropdowns */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #fbb604;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ffcc33;
    }
  }

  /* Regular input fields - single line with text wrapping */
  input[type="text"], input[type="email"], input[type="tel"], input[type="date"] {
    white-space: nowrap;
    overflow-x: auto;
  }

  /* Textareas - preserve line breaks and allow enter key */
  textarea {
    white-space: pre-wrap; /* Preserves line breaks and spaces */
    resize: vertical;
    min-height: 80px;
  }

  /* Number input spinner buttons */
  input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    /* Firefox */
    -moz-appearance: textfield;
  }

  /* Custom number input with styled buttons */
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
        width: 20px;
        height: 16px;
        background: rgba(251, 182, 4, 0.1);
        border: 1px solid rgba(251, 182, 4, 0.3);
        border-radius: 4px;
        color: #fbb604;
        font-size: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
          background: rgba(251, 182, 4, 0.2);
          border-color: #fbb604;
        }
        
        &:active {
          transform: scale(0.9);
        }
      }
    }
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

`;

const SectionTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    color: #fbb604;
    font-size: 1rem;
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
    }
  }
`;

const AddItemBtn = styled.button`
  background: rgba(251, 182, 4, 0.1);
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 10px;
  color: #fbb604;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;

  &:hover {
    background: rgba(251, 182, 4, 0.2);
    border-color: #fbb604;
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

    &.primary {
      background: linear-gradient(135deg, #fbb604 0%, #f39c12 100%);
      color: #0f0f0f;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(251, 182, 4, 0.3);
      }
    }

    &.secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

// Invoice Preview Styles - matching the existing invoice viewer design
const InvoicePreview = styled.div`
  background: #0a0a0a;
  color: white;
  line-height: 1.6;
  font-size: 14px;
  width: 800px;
  max-width: 100%;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  margin-bottom: 2rem;
  box-sizing: border-box;

  .invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
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
      align-items: center;
      gap: 1.5rem;

      .logo {
        width: 70px;
        height: 70px;
        
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
          font-weight: 600;
          color: white;
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
          color: #aaa;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
      }
    }

    .invoice-details {
      text-align: right;
      .invoice-title {
        font-size: 3rem;
        font-weight: 900;
        color: #fbb604;
        margin-bottom: 0.5rem;
        letter-spacing: 3px;
        text-shadow: 0 0 20px rgba(251, 182, 4, 0.3);
      }
      .invoice-number {
        font-size: 1.1rem;
        color: #fff;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      .invoice-dates {
        font-size: 0.95rem;
        color: #bbb;
        line-height: 1.6;
      }
    }
  }

  .billing-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2.5rem;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
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
      background: linear-gradient(90deg, #fbb604 0%, #f99b04 100%);
      border-radius: 12px 12px 0 0;
    }

    .billing-block {
      position: relative;
      
      .label {
        font-size: 0.75rem;
        color: #fbb604;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: 0.75rem;
        letter-spacing: 1px;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 20px;
          height: 1px;
          background: #fbb604;
        }
      }
      
      .content {
        color: #fff;
        .primary {
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
          color: white;
        }
        .secondary {
          color: #ccc;
          font-size: 0.9rem;
          line-height: 1.6;
        }
      }
    }
  }

  .items-section {
    margin-bottom: 3rem;

    table {
      width: 100%;
      border-collapse: collapse;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(251, 182, 4, 0.1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

      thead {
        background: linear-gradient(135deg, rgba(251, 182, 4, 0.25) 0%, rgba(249, 155, 4, 0.15) 100%);
        th {
          padding: 1.2rem 1rem;
          text-align: left;
          color: #fbb604;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid rgba(251, 182, 4, 0.3);
          position: relative;
          
          &:last-child {
            text-align: right;
          }
          
          &:first-child {
            border-radius: 12px 0 0 0;
          }
          
          &:last-child {
            border-radius: 0 12px 0 0;
          }
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: background-color 0.2s ease;
          
          &:hover {
            background: rgba(255, 255, 255, 0.02);
          }
          
          &:last-child {
            border-bottom: none;
            
            td:first-child {
              border-radius: 0 0 0 12px;
            }
            
            td:last-child {
              border-radius: 0 0 12px 0;
            }
          }

          td {
            padding: 1.2rem 1rem;
            color: #fff;
            font-size: 0.95rem;
            vertical-align: top;
            
            &:last-child {
              text-align: right;
              font-weight: 700;
              color: #fbb604;
              font-size: 1rem;
            }
            
            .description {
              font-weight: 600;
              margin-bottom: 0.25rem;
              color: white;
            }
            
            .details {
              font-size: 0.85rem;
              color: #bbb;
              line-height: 1.4;
              white-space: pre-wrap; /* Preserve line breaks in invoice preview */
            }
          }
        }
      }
    }
  }

  .totals-section {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    margin-bottom: 2rem;

    .notes {
      flex: 1;
      .notes-title {
        color: #fbb604;
        font-weight: 600;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }
      .notes-content {
        color: #ccc;
        font-size: 0.85rem;
        line-height: 1.5;
        background: rgba(255, 255, 255, 0.03);
        padding: 1rem;
        border-radius: 6px;
        border-left: 3px solid #fbb604;
        white-space: pre-wrap; /* Preserve line breaks */
      }
    }

    .summary {
      min-width: 300px;
      .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        
        &.total {
          border-top: 2px solid #fbb604;
          border-bottom: none;
          margin-top: 0.5rem;
          padding-top: 1rem;
          font-size: 1.2rem;
          font-weight: 700;
          color: #fbb604;
        }
        
        .label {
          color: #aaa;
        }
        .value {
          color: #fff;
          font-weight: 600;
        }
      }
    }
  }

  .notes-section, .terms-section {
    margin-top: 2rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    border-left: 4px solid #fbb604;
    
    .section-title {
      color: #fbb604;
      font-weight: 700;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 1rem;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 30px;
        height: 1px;
        background: #fbb604;
      }
    }
    
    .content {
      color: #ccc;
      line-height: 1.6;
      font-size: 0.9rem;
    }
  }

  .footer {
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #888;

    .contact {
      display: flex;
      gap: 2rem;
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        svg {
          color: #fbb604;
        }
      }
    }

    .company-info {
      text-align: right;
    }
  }
`;

const InvoiceCreator = ({ isOpen, onClose }) => {
  // Deterministic invoice number generator
  const generateInvoiceNumber = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Last 2 digits of year
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    
    // Create a simple hash based on current timestamp for uniqueness within the day
    const timestamp = now.getTime();
    const hash = timestamp % 10000; // Get last 4 digits for uniqueness
    const sequence = hash.toString().padStart(4, '0');
    
    // Format: YMD-XXXX (e.g., 240828-1234)
    return `${year}${month}${day}-${sequence}`;
  };

  // Default form data
  const getDefaultData = () => ({
    documentType: 'invoice', // 'invoice' or 'proposal'
    billingType: 'milestone', // Always milestone-based billing
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD',
    projectTitle: '',
    projectDescription: '',
    contractReference: '',
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
      company: ''
    },
    items: [
      {
        id: 1,
        title: '',
        description: '',
        hours: 0,
        rate: 0,
        amount: 0,
        deliveryDate: '' // for milestone delivery timeline
      }
    ],
    paymentInstructions: {
      bankName: '',
      bankAddress: '',
      accountTitle: '',
      accountNumber: '',
      swiftBic: '',
      iban: '',
      paypalEmail: '',
      payoneerEmail: '',
      wiseEmail: ''
    },
    additionalItems: [], // Additional line items with title and amount
    notes: '',
    terms: 'Payment is due within 30 days of invoice date. Late payments may incur additional charges.\n\nFast-Track Option: Project can be delivered twice as fast for 2x milestone rates through additional development resources. Contact us to check availability for your timeline requirements.',
    thankYouNote: 'Thank you for your business! Looking forward to continued collaboration.'
  });

  // Load saved data from sessionStorage (clears on page refresh/tab close)
  const [invoiceData, setInvoiceData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('invoiceFormData');
      if (saved) {
        const parsedData = JSON.parse(saved);
        const defaultData = getDefaultData();
        // Always generate a new invoice number and ensure all required fields exist
        return {
          ...defaultData, // Start with defaults
          ...parsedData, // Override with saved data
          invoiceNumber: generateInvoiceNumber(), // Always new invoice number
          additionalItems: parsedData.additionalItems || [] // Ensure additionalItems exists
        };
      }
    } catch (error) {
      console.error('Error loading saved invoice data:', error);
    }
    return getDefaultData();
  });

  const previewRef = useRef();

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('invoiceFormData', JSON.stringify(invoiceData));
  }, [invoiceData]);

  // Clear all form fields
  const clearForm = () => {
    setInvoiceData(getDefaultData());
    sessionStorage.removeItem('invoiceFormData');
  };

  // Additional items functions
  const addAdditionalItem = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      amount: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      additionalItems: [...(prev.additionalItems || []), newItem]
    }));
  };

  const removeAdditionalItem = (id) => {
    setInvoiceData(prev => ({
      ...prev,
      additionalItems: (prev.additionalItems || []).filter(item => item.id !== id)
    }));
  };

  const updateAdditionalItem = (id, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      additionalItems: (prev.additionalItems || []).map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      description: '',
      hours: 0,
      rate: 0,
      amount: 0,
      deliveryDate: ''
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Helper function to calculate completion date based on working hours
  const calculateCompletionDate = (hours, startDate = new Date()) => {
    if (!hours || hours <= 0) return '';
    
    const workingHoursPerDay = 8;
    const totalWorkDays = Math.ceil(hours / workingHoursPerDay);
    
    const completionDate = new Date(startDate);
    let workDaysAdded = 0;
    
    // If it's less than or equal to 8 hours and we're starting on a weekday, complete same day
    if (hours <= workingHoursPerDay) {
      const dayOfWeek = completionDate.getDay();
      // If starting on a weekday (Monday-Friday), complete the same day
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        return completionDate.toISOString().split('T')[0];
      }
      // If starting on weekend, move to next Monday
      while (completionDate.getDay() === 0 || completionDate.getDay() === 6) {
        completionDate.setDate(completionDate.getDate() + 1);
      }
      return completionDate.toISOString().split('T')[0];
    }
    
    // For more than 8 hours, add work days
    while (workDaysAdded < totalWorkDays) {
      // Skip weekends (0 = Sunday, 6 = Saturday)
      const dayOfWeek = completionDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workDaysAdded++;
        if (workDaysAdded >= totalWorkDays) break;
      }
      completionDate.setDate(completionDate.getDate() + 1);
    }
    
    return completionDate.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  };

  const updateItem = (id, field, value) => {
    setInvoiceData(prev => {
      // First, update the specific item
      const updatedItems = prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'hours' || field === 'rate') {
            updatedItem.amount = (Number(updatedItem.hours) || 0) * (Number(updatedItem.rate) || 0);
          }
          return updatedItem;
        }
        return item;
      });

      // Recalculate ALL delivery dates when hours change to ensure proper chaining
      if (field === 'hours') {
        let currentStartDate = new Date();
        
        // Process items in order and update delivery dates sequentially
        for (let i = 0; i < updatedItems.length; i++) {
          const hours = Number(updatedItems[i].hours) || 0;
          
          if (hours > 0) {
            // Calculate completion date for this milestone
            const completionDate = calculateCompletionDate(hours, currentStartDate);
            updatedItems[i] = { ...updatedItems[i], deliveryDate: completionDate };
            
            // Set start date for next milestone (day after this one completes)
            if (completionDate) {
              currentStartDate = new Date(completionDate);
              currentStartDate.setDate(currentStartDate.getDate() + 1);
            }
          } else {
            // If no hours, clear the delivery date
            updatedItems[i] = { ...updatedItems[i], deliveryDate: '' };
          }
        }
      }

      return {
        ...prev,
        items: updatedItems
      };
    });
  };

  // Special handler for milestone titles that auto-adds numbering
  const updateMilestoneTitle = (id, value) => {
    setInvoiceData(prev => {
      const itemIndex = prev.items.findIndex(item => item.id === id);
      const milestoneNumber = itemIndex + 1;
      
      // Remove any existing number prefix (1. , 2. , etc.)
      const cleanValue = value.replace(/^\d+\.\s*/, '');
      
      // Add the correct number prefix if there's content
      const numberedValue = cleanValue ? `${milestoneNumber}. ${cleanValue}` : '';
      
      return {
        ...prev,
        items: prev.items.map(item => 
          item.id === id 
            ? { ...item, title: numberedValue }
            : item
        )
      };
    });
  };

  const updateClient = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      client: { ...prev.client, [field]: value }
    }));
  };

  const updatePaymentInstructions = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      paymentInstructions: { ...prev.paymentInstructions, [field]: value }
    }));
  };

  const updateInvoiceField = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const calculateSubtotal = () => {
    // Calculate milestone amounts
    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    
    // Add additional items
    const additionalTotal = (invoiceData.additionalItems || []).reduce((sum, item) => sum + (item.amount || 0), 0);
    
    return subtotal + additionalTotal;
  };

  const calculateTax = () => {
    return 0; // No tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const downloadPNG = async () => {
    const element = previewRef.current;
    
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#0a0a0a',
      useCORS: true,
      height: element.scrollHeight,
      width: element.scrollWidth
    });
    
    // Create download link
    const link = document.createElement('a');
    link.download = `Invoice-${invoiceData.invoiceNumber}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadPDF = async () => {
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
    
    // Fill entire page with black background first
    pdf.setFillColor(10, 10, 10); // #0a0a0a in RGB
    pdf.rect(0, 0, 210, 297, 'F'); // Fill entire A4 page
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const maxHeight = 297; // A4 height in mm
    const canvasRatio = canvas.height / canvas.width;
    const imgHeight = imgWidth * canvasRatio;
    
    if (imgHeight <= maxHeight) {
      // Content fits perfectly
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      // Scale down to fit one page (like online converters do!)
      const scaledHeight = maxHeight;
      const scaledWidth = scaledHeight / canvasRatio;
      const xOffset = (imgWidth - scaledWidth) / 2; // Center horizontally
      pdf.addImage(imgData, 'JPEG', xOffset, 0, scaledWidth, scaledHeight);
    }
    
    pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
  };

  const sendInvoice = async () => {
    // Validation
    if (!invoiceData.client.email) {
      alert('Please enter client email address before sending invoice.');
      return;
    }

    if (invoiceData.items.length === 0 || invoiceData.items.every(item => !item.title && item.hours === 0)) {
      alert('Please add at least one milestone before sending invoice.');
      return;
    }

    try {
      // TODO: Replace this with actual API call when backend is ready
      console.log('Sending invoice to:', invoiceData.client.email);
      console.log('Invoice data:', invoiceData);
      
      // Simulate API call
      alert(`Invoice ${invoiceData.invoiceNumber} will be sent to ${invoiceData.client.email}\n\n(Backend implementation needed for actual email sending)`);
      
      // When backend is ready, replace above with:
      /*
      const response = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceData,
          clientEmail: invoiceData.client.email
        })
      });

      if (response.ok) {
        alert(`Invoice ${invoiceData.invoiceNumber} sent successfully to ${invoiceData.client.email}!`);
      } else {
        alert('Failed to send invoice. Please try again.');
      }
      */
      
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice. Please try again.');
    }
  };

  if (!isOpen) return null;

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
      >
        {/* Form Section */}
        <FormSection>
          <Header>
            <h2>
              <FaPlus className="icon" />
              {invoiceData.documentType === 'proposal' ? 'Create Proposal' : 'Create Invoice'}
            </h2>
          </Header>

          {/* Document Type Selector */}
          <SectionTitle>
            <FaBuilding className="icon" />
            Document Type
          </SectionTitle>

          <FormGroup>
            <label>Document Type</label>
            <select
              value={invoiceData.documentType}
              onChange={(e) => updateInvoiceField('documentType', e.target.value)}
            >
              <option value="invoice">Invoice - Request Payment</option>
              <option value="proposal">Proposal - Project Quote</option>
            </select>
          </FormGroup>


          {/* Invoice Details */}
          <SectionTitle>
            <FaCalendarAlt className="icon" />
            {invoiceData.documentType === 'proposal' ? 'Proposal Details' : 'Invoice Details'}
          </SectionTitle>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              {invoiceData.documentType === 'proposal' ? 'Proposal Number' : 'Invoice Number'}
            </label>
            <input
              type="text"
              value={invoiceData.invoiceNumber}
              onChange={(e) => updateInvoiceField('invoiceNumber', e.target.value)}
              placeholder="INV-001"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceData.date}
              onChange={(e) => updateInvoiceField('date', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaCalendarAlt className="icon" />
              Due Date
            </label>
            <input
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => updateInvoiceField('dueDate', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaDollarSign className="icon" />
              Currency
            </label>
            <select
              value={invoiceData.currency}
              onChange={(e) => updateInvoiceField('currency', e.target.value)}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="PKR">PKR - Pakistani Rupee</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Contract/SOW Reference (Optional)</label>
            <input
              type="text"
              value={invoiceData.contractReference}
              onChange={(e) => updateInvoiceField('contractReference', e.target.value)}
              placeholder="SOW-2024-001 or Contract #ABC-123"
            />
          </FormGroup>

          {/* Client Information */}
          <SectionTitle>
            <FaUser className="icon" />
            Client Information
          </SectionTitle>

          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Company Name
            </label>
            <input
              type="text"
              value={invoiceData.client.company}
              onChange={(e) => updateClient('company', e.target.value)}
              placeholder="Client Company Name"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaUser className="icon" />
              Contact Name
            </label>
            <input
              type="text"
              value={invoiceData.client.name}
              onChange={(e) => updateClient('name', e.target.value)}
              placeholder="John Doe"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaEnvelope className="icon" />
              Email
            </label>
            <input
              type="email"
              value={invoiceData.client.email}
              onChange={(e) => updateClient('email', e.target.value)}
              placeholder="john@company.com"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaPhone className="icon" />
              Phone
            </label>
            <input
              type="tel"
              value={invoiceData.client.phone}
              onChange={(e) => updateClient('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Address
            </label>
            <textarea
              value={invoiceData.client.address}
              onChange={(e) => updateClient('address', e.target.value)}
              placeholder="123 Main St, City, State 12345"
            />
          </FormGroup>

          {/* Project Details */}
          <SectionTitle>
            <FaBuilding className="icon" />
            Project Information
          </SectionTitle>

          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Project Title
            </label>
            <input
              type="text"
              value={invoiceData.projectTitle}
              onChange={(e) => updateInvoiceField('projectTitle', e.target.value)}
              placeholder="4-App Development Project"
            />
          </FormGroup>

          <FormGroup>
            <label>Project Description</label>
            <textarea
              value={invoiceData.projectDescription}
              onChange={(e) => updateInvoiceField('projectDescription', e.target.value)}
              placeholder="Custom application development with milestone-based deliverables"
            />
          </FormGroup>

          {/* Project Milestones */}
          <SectionTitle>
            <FaDollarSign className="icon" />
            Project Milestones
          </SectionTitle>

          {invoiceData.items.map((item) => (
            <ItemSection key={item.id}>
              <div style={{ marginBottom: '1rem' }}>
                <FormGroup>
                  <label>Milestone Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateMilestoneTitle(item.id, e.target.value)}
                    placeholder={`${invoiceData.items.indexOf(item) + 1}. App Development - Phase ${invoiceData.items.indexOf(item) + 1}`}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Milestone Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Milestone development including planning, implementation, and testing"
                    rows="2"
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                    <FaCalendarAlt className="icon" />
                    Delivery Date {invoiceData.documentType === 'proposal' ? '(Estimated)' : ''}
                  </label>
                  <input
                    type="date"
                    value={item.deliveryDate}
                    onChange={(e) => updateItem(item.id, 'deliveryDate', e.target.value)}
                  />
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '0.25rem',
                    fontStyle: 'italic'
                  }}>
                    Auto-calculated based on 8hr work days (Mon-Fri). Excludes public holidays - adjust manually if needed.
                  </div>
                </FormGroup>
              </div>
              <ItemGrid>
                <FormGroup>
                  <label>
                    <FaClock className="icon" />
                    Hours
                  </label>
                  <div className="number-input-container">
                    <input
                      type="number"
                      step="0.01"
                      value={item.hours}
                      onChange={(e) => updateItem(item.id, 'hours', e.target.value === '' ? 0 : Number(e.target.value))}
                      placeholder="40"
                    />
                    <div className="number-controls">
                      <button type="button" onClick={() => updateItem(item.id, 'hours', (item.hours || 0) + 1)}>▲</button>
                      <button type="button" onClick={() => updateItem(item.id, 'hours', Math.max(0, (item.hours || 0) - 1))}>▼</button>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <label>
                    <FaDollarSign className="icon" />
                    Rate/Hour
                  </label>
                  <div className="number-input-container">
                    <input
                      type="number"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', e.target.value === '' ? 0 : Number(e.target.value))}
                      placeholder="100"
                    />
                    <div className="number-controls">
                      <button type="button" onClick={() => updateItem(item.id, 'rate', (item.rate || 0) + 1)}>▲</button>
                      <button type="button" onClick={() => updateItem(item.id, 'rate', Math.max(0, (item.rate || 0) - 1))}>▼</button>
                    </div>
                  </div>
                </FormGroup>
                {invoiceData.items.length > 1 && (
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </ItemGrid>
              <div style={{ color: 'white', fontWeight: '700', textAlign: 'right' }}>
                Amount: ${item.amount.toFixed(2)}
              </div>
            </ItemSection>
          ))}

              <AddItemBtn onClick={addItem}>
                <FaPlus />
                Add Milestone
              </AddItemBtn>

          {/* Additional Line Items */}
          <SectionTitle>
            <FaDollarSign className="icon" />
            Additional Items
          </SectionTitle>

          {(invoiceData.additionalItems || []).map((item) => (
            <ItemSection key={item.id}>
              <div style={{ marginBottom: '1rem' }}>
                <FormGroup>
                  <label>Item Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateAdditionalItem(item.id, 'title', e.target.value)}
                    placeholder="e.g., Domain Registration, Additional Feature, etc."
                  />
                </FormGroup>
              </div>
              <ItemGrid>
                <FormGroup>
                  <label>
                    <FaDollarSign className="icon" />
                    Amount
                  </label>
                  <div className="number-input-container">
                    <input
                      type="number"
                      step="0.01"
                      value={item.amount}
                      onChange={(e) => updateAdditionalItem(item.id, 'amount', e.target.value === '' ? 0 : Number(e.target.value))}
                      placeholder="0.00"
                    />
                    <div className="number-controls">
                      <button type="button" onClick={() => updateAdditionalItem(item.id, 'amount', (item.amount || 0) + 1)}>▲</button>
                      <button type="button" onClick={() => updateAdditionalItem(item.id, 'amount', Math.max(0, (item.amount || 0) - 1))}>▼</button>
                    </div>
                  </div>
                </FormGroup>
                <button
                  className="remove-btn"
                  onClick={() => removeAdditionalItem(item.id)}
                >
                  <FaTrash />
                </button>
              </ItemGrid>
            </ItemSection>
          ))}

          {(invoiceData.additionalItems || []).length === 0 && (
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', padding: '2rem', fontStyle: 'italic' }}>
              No additional items added
            </div>
          )}

          <AddItemBtn onClick={addAdditionalItem}>
            <FaPlus />
            Add Additional Item
          </AddItemBtn>

          {/* Notes and Terms */}
          <SectionTitle>Additional Information</SectionTitle>

          <FormGroup>
            <label>Notes</label>
            <textarea
              value={invoiceData.notes}
              onChange={(e) => updateInvoiceField('notes', e.target.value)}
              placeholder="Project notes or additional information..."
            />
          </FormGroup>

          <FormGroup>
            <label>Payment Terms</label>
            <textarea
              value={invoiceData.terms || 'Payment is due within 30 days of invoice date. Late payments may incur additional charges.\n\nFast-Track Option: Project can be delivered twice as fast for 2x milestone rates through additional development resources. Contact us to check availability for your timeline requirements.'}
              onChange={(e) => updateInvoiceField('terms', e.target.value)}
              placeholder="Payment terms, due dates, and pricing options..."
              rows="4"
            />
          </FormGroup>

          <FormGroup>
            <label>Thank You Note</label>
            <textarea
              value={invoiceData.thankYouNote}
              onChange={(e) => updateInvoiceField('thankYouNote', e.target.value)}
              placeholder="Thank you for your business! Looking forward to continued collaboration."
              rows="2"
            />
          </FormGroup>

          {/* Payment Instructions */}
          <SectionTitle>Payment Instructions</SectionTitle>

          <FormGroup>
            <label>Bank Name</label>
            <input
              type="text"
              value={invoiceData.paymentInstructions.bankName}
              onChange={(e) => updatePaymentInstructions('bankName', e.target.value)}
              placeholder="e.g., Standard Chartered Bank"
            />
          </FormGroup>

          <FormGroup>
            <label>Bank Address</label>
            <textarea
              value={invoiceData.paymentInstructions.bankAddress}
              onChange={(e) => updatePaymentInstructions('bankAddress', e.target.value)}
              placeholder="Bank branch address including city and country"
              rows="2"
            />
          </FormGroup>

          <FormGroup>
            <label>Account Title</label>
            <input
              type="text"
              value={invoiceData.paymentInstructions.accountTitle}
              onChange={(e) => updatePaymentInstructions('accountTitle', e.target.value)}
              placeholder="e.g., Revolvo Tech"
            />
          </FormGroup>

          <FormGroup>
            <label>Account Number</label>
            <input
              type="text"
              value={invoiceData.paymentInstructions.accountNumber}
              onChange={(e) => updatePaymentInstructions('accountNumber', e.target.value)}
              placeholder="Account number"
            />
          </FormGroup>

          <FormGroup>
            <label>SWIFT/BIC Code</label>
            <input
              type="text"
              value={invoiceData.paymentInstructions.swiftBic}
              onChange={(e) => updatePaymentInstructions('swiftBic', e.target.value)}
              placeholder="e.g., SCBLPKKA"
            />
          </FormGroup>

          <FormGroup>
            <label>IBAN</label>
            <input
              type="text"
              value={invoiceData.paymentInstructions.iban}
              onChange={(e) => updatePaymentInstructions('iban', e.target.value)}
              placeholder="International Bank Account Number"
            />
          </FormGroup>

          <SectionTitle>Alternative Payment Methods</SectionTitle>

          <FormGroup>
            <label>PayPal Email (Optional)</label>
            <input
              type="email"
              value={invoiceData.paymentInstructions.paypalEmail}
              onChange={(e) => updatePaymentInstructions('paypalEmail', e.target.value)}
              placeholder="paypal@revolvo.tech"
            />
          </FormGroup>

          <FormGroup>
            <label>Payoneer Email (Optional)</label>
            <input
              type="email"
              value={invoiceData.paymentInstructions.payoneerEmail}
              onChange={(e) => updatePaymentInstructions('payoneerEmail', e.target.value)}
              placeholder="payoneer@revolvo.tech"
            />
          </FormGroup>

          <FormGroup>
            <label>Wise Email (Optional)</label>
            <input
              type="email"
              value={invoiceData.paymentInstructions.wiseEmail}
              onChange={(e) => updatePaymentInstructions('wiseEmail', e.target.value)}
              placeholder="wise@revolvo.tech"
            />
          </FormGroup>

          <ActionButtons>
            <button className="secondary" onClick={sendInvoice}>
              <FaPaperPlane />
              {invoiceData.documentType === 'proposal' ? 'Send Proposal' : 'Send Invoice'}
            </button>
            <button className="primary" onClick={downloadPDF}>
              <FaDownload />
              Download PDF
            </button>
            <button className="primary" onClick={downloadPNG}>
              <FaDownload />
              Download PNG
            </button>
          </ActionButtons>
        </FormSection>

        {/* Preview Section */}
        <PreviewSection>
          <TopButtons>
            <TopButton className="clear" onClick={clearForm} title="Clear all fields">
              <FaEraser />
            </TopButton>
            <TopButton className="close" onClick={onClose} title="Close">
              <FaTimes />
            </TopButton>
          </TopButtons>
          <InvoicePreview ref={previewRef} className="printable-invoice">
            <div className="invoice-header">
              <div className="company-section">
                <div className="logo">
                  <img src={RevolvoLogo} alt="Revolvo Logo" />
                </div>
                <div className="company-details">
                  <div className="company-name">REVOLVO TECH</div>
                  <div className="tagline">Innovation in Motion</div>
                </div>
              </div>
              <div className="invoice-details">
                <div className="invoice-title">
                  {invoiceData.documentType === 'proposal' ? 'PROPOSAL' : 'INVOICE'}
                </div>
                <div className="invoice-number">#{invoiceData.invoiceNumber}</div>
                <div className="invoice-dates">
                  <div>Date: {new Date(invoiceData.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}</div>
                  {invoiceData.documentType === 'proposal' ? (
                    <div>Valid Until: {new Date(invoiceData.dueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}</div>
                  ) : (
                    <div>Due: {new Date(invoiceData.dueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="billing-section">
              <div className="billing-block">
                <div className="label">Bill To</div>
                <div className="content">
                  <div className="primary">
                    {invoiceData.client.company || invoiceData.client.name || 'Client Name'}
                  </div>
                  <div className="secondary">
                    {invoiceData.client.name && invoiceData.client.company && (
                      <div>{invoiceData.client.name}</div>
                    )}
                    {invoiceData.client.email && <div>{invoiceData.client.email}</div>}
                    {invoiceData.client.phone && <div>{invoiceData.client.phone}</div>}
                    {invoiceData.client.address && <div>{invoiceData.client.address}</div>}
                  </div>
                </div>
              </div>
              <div className="billing-block">
                <div className="label">Project Details</div>
                <div className="content">
                  <div className="primary">{invoiceData.projectTitle || 'Project Title'}</div>
                  <div className="secondary" style={{ whiteSpace: 'pre-wrap' }}>
                    {invoiceData.projectDescription || 'Project description will appear here'}
                  </div>
                </div>
              </div>
              <div className="billing-block">
                <div className="label">Payment Info</div>
                <div className="content">
                  <div className="secondary">
                    Currency: {invoiceData.currency}<br />
                    Terms: Net 30 days<br />
                    {invoiceData.contractReference && (
                      <>Contract: {invoiceData.contractReference}<br /></>
                    )}
                    Total: {invoiceData.currency === 'USD' ? '$' : invoiceData.currency + ' '}{calculateTotal().toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="items-section">
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Hours</th>
                      <th>Rate</th>
                      <th>{invoiceData.documentType === 'proposal' ? 'Delivery' : 'Completed'}</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="description">
                            {item.title || `${invoiceData.items.indexOf(item) + 1}. Project milestone`}
                          </div>
                          <div className="details">
                            {item.description || 'Milestone development including planning, implementation, and testing'}
                          </div>
                        </td>
                        <td>{item.hours || 0}</td>
                        <td>{invoiceData.currency === 'USD' ? '$' : invoiceData.currency + ' '}{item.rate || 0}/hr</td>
                        <td>
                          {item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          }) : 'TBD'}
                        </td>
                        <td>{invoiceData.currency === 'USD' ? '$' : invoiceData.currency + ' '}{item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            <div className="totals-section">
              <div className="notes">
                <div className="notes-title">Payment Terms</div>
                <div className="notes-content" style={{ whiteSpace: 'pre-wrap' }}>
                  {invoiceData.terms || 'Payment is due within 30 days of invoice date. Late payments may incur additional charges.\n\nFast-Track Option: Project can be delivered twice as fast for 2x milestone rates through additional development resources. Contact us to check availability for your timeline requirements.'}
                </div>
              </div>
              <div className="summary">
                  {invoiceData.items.map((item, index) => (
                    <div key={item.id} className="summary-row">
                      <span className="label">{item.title || `${index + 1}. Milestone ${index + 1}`}</span>
                      <span className="value">{invoiceData.currency === 'USD' ? '$' : invoiceData.currency + ' '}{item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                
                {/* Additional Items */}
                {(invoiceData.additionalItems || []).map((item) => (
                  <div key={item.id} className="summary-row">
                    <span className="label">{item.title || 'Additional Item'}</span>
                    <span className="value">{invoiceData.currency === 'USD' ? '$' : invoiceData.currency + ' '}{(item.amount || 0).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="summary-row total">
                  <span className="label">Total Amount</span>
                  <span className="value">{invoiceData.currency === 'USD' ? '$' : invoiceData.currency + ' '}{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Instructions Section */}
            {(invoiceData.paymentInstructions.bankName || invoiceData.paymentInstructions.paypalEmail || invoiceData.paymentInstructions.payoneerEmail || invoiceData.paymentInstructions.wiseEmail) && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid #fbb604' }}>
                <div style={{ color: '#fbb604', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Payment Instructions</div>
                <div style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.9rem' }}>
                  {invoiceData.paymentInstructions.bankName && (
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: 'white' }}>Bank Transfer:</strong><br />
                      Bank: {invoiceData.paymentInstructions.bankName}<br />
                      {invoiceData.paymentInstructions.bankAddress && <div style={{ whiteSpace: 'pre-wrap' }}>Address: {invoiceData.paymentInstructions.bankAddress}</div>}
                      {invoiceData.paymentInstructions.accountTitle && <>Account Title: {invoiceData.paymentInstructions.accountTitle}<br /></>}
                      {invoiceData.paymentInstructions.accountNumber && <>Account: {invoiceData.paymentInstructions.accountNumber}<br /></>}
                      {invoiceData.paymentInstructions.swiftBic && <>SWIFT/BIC: {invoiceData.paymentInstructions.swiftBic}<br /></>}
                      {invoiceData.paymentInstructions.iban && <>IBAN: {invoiceData.paymentInstructions.iban}<br /></>}
                    </div>
                  )}
                  {(invoiceData.paymentInstructions.paypalEmail || invoiceData.paymentInstructions.payoneerEmail || invoiceData.paymentInstructions.wiseEmail) && (
                    <div>
                      <strong style={{ color: 'white' }}>Alternative Payment Methods:</strong><br />
                      {invoiceData.paymentInstructions.paypalEmail && <>PayPal: {invoiceData.paymentInstructions.paypalEmail}<br /></>}
                      {invoiceData.paymentInstructions.payoneerEmail && <>Payoneer: {invoiceData.paymentInstructions.payoneerEmail}<br /></>}
                      {invoiceData.paymentInstructions.wiseEmail && <>Wise: {invoiceData.paymentInstructions.wiseEmail}<br /></>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {invoiceData.notes && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid #fbb604' }}>
                <div style={{ color: '#fbb604', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Project Notes</div>
                <div style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{invoiceData.notes}</div>
              </div>
            )}

            {/* Thank You Note */}
            {invoiceData.thankYouNote && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(251, 182, 4, 0.1) 0%, rgba(249, 155, 4, 0.05) 100%)', borderRadius: '12px', border: '1px solid rgba(251, 182, 4, 0.2)', textAlign: 'center' }}>
                <div style={{ color: '#fbb604', fontWeight: '600', fontSize: '1rem', lineHeight: '1.6' }}>{invoiceData.thankYouNote}</div>
              </div>
            )}

            <div className="footer">
              <div className="contact">
                <div className="contact-item">
                  <FaEnvelope />
                  billing@revolvo.tech
                </div>
                <div className="contact-item">
                  <FaPhone />
                  +358 41 7408087
                </div>
                <div className="contact-item">
                  <FaGlobe />
                  revolvo.tech
                </div>
              </div>
              <div className="company-info">
              </div>
            </div>
          </InvoicePreview>
        </PreviewSection>
      </CreatorContainer>
      </CreatorOverlay>
    </>
  );
};

export default InvoiceCreator;