import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaDownload, FaPrint, FaEye, FaPlus, FaTrash,
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt,
  FaClock, FaDollarSign, FaGlobe, FaPaperPlane, FaEraser,
  FaSun, FaMoon, FaLinkedin, FaQrcode, FaBriefcase, FaIdCard,
  FaMapMarkerAlt, FaFileSignature, FaCalculator, FaMoneyBillWave
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import RevolvoLogo from "../../assets/revolvo-logo.png";
import RevolvoLogoDark from "../../assets/revolvo-logo-dark.png";

// Professional styling matching other creators
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

    /* Only show the salary slip */
    .printable-slip {
      visibility: visible !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: white !important;
      color: black !important;
      font-size: 10px !important;
      
      * {
        visibility: visible !important;
        color: black !important;
        background: white !important;
        font-family: 'Arial', sans-serif !important;
      }
      
      .slip-header {
        margin-bottom: 15px !important;
      }
      
      .company-logo img {
        max-height: 40px !important;
      }
    }
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
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 2rem;
  overflow-y: auto;
  max-height: 95vh;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #fbb604;
    border-radius: 4px;
    
    &:hover {
      background: #e6a503;
    }
  }

  h2 {
    color: #fbb604;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const SectionTitle = styled.div`
  color: #fbb604;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .icon {
    font-size: 0.9rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    color: #fbb604;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .icon {
      font-size: 0.9rem;
    }
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.875rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: #fbb604;
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
        width: 20px;
        height: 16px;
        font-size: 0.7rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
          background: rgba(251, 182, 4, 0.2);
        }
      }
    }
  }
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 1rem;
  align-items: end;
`;

const ItemSection = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 1rem;
  
  .remove-btn {
    background: rgba(255, 77, 87, 0.1);
    color: #ff4d57;
    border: 1px solid rgba(255, 77, 87, 0.2);
    border-radius: 8px;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 77, 87, 0.2);
      transform: scale(1.05);
    }
  }
`;

const AddItemBtn = styled.button`
  width: 100%;
  padding: 1rem;
  background: rgba(251, 182, 4, 0.1);
  border: 2px dashed rgba(251, 182, 4, 0.3);
  border-radius: 12px;
  color: #fbb604;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  
  &:hover {
    background: rgba(251, 182, 4, 0.2);
    border-color: rgba(251, 182, 4, 0.5);
    transform: translateY(-2px);
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

    &.primary {
      background: linear-gradient(135deg, #fbb604 0%, #f9a825 100%);
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
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
  }
`;

const PreviewSection = styled.div`
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
  padding: 2rem;
  overflow-y: auto;
  max-height: 95vh;
  position: relative;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #fbb604;
    border-radius: 4px;
    
    &:hover {
      background: #e6a503;
    }
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
    background: rgba(251, 182, 4, 0.1);
    border-color: rgba(251, 182, 4, 0.3);
    color: #fbb604;
    
    &:hover {
      background: rgba(251, 182, 4, 0.2);
      border-color: rgba(251, 182, 4, 0.5);
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(251, 182, 4, 0.2);
    }
  }

  &.theme {
    background: rgba(251, 182, 4, 0.1);
    border-color: rgba(251, 182, 4, 0.3);
    color: #fbb604;
    
    &:hover {
      background: rgba(251, 182, 4, 0.2);
      border-color: rgba(251, 182, 4, 0.5);
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(251, 182, 4, 0.2);
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
`;

const SlipPreview = styled.div`
  background: ${props => props.$isDarkTheme ? '#1a1a1a' : 'white'};
  color: ${props => props.$isDarkTheme ? 'white' : '#333'};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  min-height: 11.7in;
  width: 8.3in;
  margin: 0 auto;
  position: relative;
  font-family: 'Arial', sans-serif;

  .slip-header {
    background: ${props => props.$isDarkTheme 
      ? 'linear-gradient(135deg, #333 0%, #1a1a1a 100%)' 
      : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
    padding: 2rem;
    border-bottom: 3px solid #fbb604;
    position: relative;

    .company-section {
      display: flex;
      align-items: center;
      gap: 2rem;
      
      .logo {
        img {
          height: 60px;
          width: auto;
        }
      }
      
      .company-details {
        flex: 1;
        
        .company-name {
          font-size: 1.8rem;
          font-weight: 800;
          color: ${props => props.$isDarkTheme ? 'white' : '#333'};
          margin-bottom: 0.25rem;
          letter-spacing: 2px;
        }
        
        .tagline {
          color: #fbb604;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      }
    }

    .slip-title {
      position: absolute;
      top: 2rem;
      right: 2rem;
      text-align: right;
      
      .title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #fbb604;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .reference {
        font-size: 0.75rem;
        color: ${props => props.$isDarkTheme ? '#aaa' : '#666'};
        margin-top: 0.25rem;
      }
    }
  }

  .slip-content {
    padding: 2rem;
    
    .employee-section {
      background: ${props => props.$isDarkTheme 
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)' 
        : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)'};
      border-radius: 12px;
      border: 1px solid rgba(251, 182, 4, 0.1);
      padding: 1.5rem;
      margin-bottom: 2rem;
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
      
      .employee-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        
        .info-item {
          .label {
            font-size: 0.75rem;
            color: #fbb604;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.25rem;
          }
          
          .value {
            font-size: 0.9rem;
            color: ${props => props.$isDarkTheme ? 'white' : '#333'};
            font-weight: 500;
          }
        }
      }
    }
    
    .salary-breakdown {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
      
      .earnings, .deductions, .summary {
        background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(251, 182, 4, 0.1);
        
        .section-title {
          color: #fbb604;
          font-weight: 700;
          margin-bottom: 1rem;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(251, 182, 4, 0.2);
        }
        
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          
          .item-title {
            color: ${props => props.$isDarkTheme ? '#ccc' : '#555'};
          }
          
          .item-amount {
            font-weight: 600;
            color: ${props => props.$isDarkTheme ? 'white' : '#333'};
          }
        }
        
        .total {
          border-top: 2px solid #fbb604;
          padding-top: 0.75rem;
          margin-top: 0.75rem;
          font-weight: 700;
          font-size: 0.9rem;
          
          .item-title {
            color: #fbb604 !important;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .item-amount {
            color: #fbb604 !important;
          }
        }
      }
      
      .summary {
        .net-pay {
          background: linear-gradient(135deg, rgba(251, 182, 4, 0.1) 0%, rgba(249, 168, 37, 0.1) 100%);
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          margin-top: 1rem;
          
          .label {
            font-size: 0.75rem;
            color: #fbb604;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
          }
          
          .amount {
            font-size: 1.5rem;
            font-weight: 800;
            color: #fbb604;
          }
        }
      }
    }
  }

  .slip-footer {
    background: ${props => props.$isDarkTheme ? '#0f0f0f' : '#f8f9fa'};
    padding: 1.5rem 2rem;
    border-top: 1px solid rgba(251, 182, 4, 0.2);
    
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: ${props => props.$isDarkTheme ? '#aaa' : '#666'};
        
        svg {
          color: #fbb604;
          font-size: 0.9rem;
        }
        
        .contact-text {
          color: ${props => props.$isDarkTheme ? 'white' : '#333'};
        }
      }
    }
  }
`;

const SalarySlipGenerator = ({ onClose }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const previewRef = useRef(null);

  // Initialize form data with session storage
  const [slipData, setSlipData] = useState(() => {
    const savedData = sessionStorage.getItem('salarySlipData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved salary slip data:', error);
      }
    }
    
    return {
      // Company Information
      companyName: "Revolvo Tech",
      tagline: "Innovation in Motion",
      address: "Väinämöisenkatu 11, 33540 Tampere, Finland",
      phone: "+358 41 7408087",
      email: "job@revolvo.tech",
      website: "www.revolvo.tech",
      
      // Slip Details
      referenceNumber: `SAL${Date.now().toString().slice(-6)}`,
      payPeriod: new Date().toISOString().slice(0, 7), // YYYY-MM format
      payDate: new Date().toISOString().split('T')[0],
      
      // Employee Information
      employeeName: "",
      employeeId: "",
      designation: "",
      department: "",
      dateOfJoining: "",
      bankAccount: "",
      
      // Salary Structure
      earnings: [
        {
          id: Date.now() + 1,
          title: 'Basic Salary',
          amount: 50000
        },
        {
          id: Date.now() + 2,
          title: 'House Rent Allowance',
          amount: 15000
        },
        {
          id: Date.now() + 3,
          title: 'Transport Allowance',
          amount: 5000
        }
      ],
      
      deductions: [
        {
          id: Date.now() + 4,
          title: 'Provident Fund',
          amount: 2000
        },
        {
          id: Date.now() + 5,
          title: 'Income Tax',
          amount: 8000
        },
        {
          id: Date.now() + 6,
          title: 'WHT (Withholding Tax)',
          amount: 1500
        }
      ]
    };
  });

  // Save to sessionStorage whenever data changes
  useEffect(() => {
    try {
      sessionStorage.setItem('salarySlipData', JSON.stringify(slipData));
    } catch (error) {
      console.error('Error saving salary slip data:', error);
    }
  }, [slipData]);

  // Generate QR code on component mount
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrDataURL = await QRCode.toDataURL('https://revolvo.tech', {
          width: 80,
          margin: 1,
          color: {
            dark: isDarkTheme ? '#fbb604' : '#333333',
            light: isDarkTheme ? '#1a1a1a' : '#ffffff'
          }
        });
        setQrCodeUrl(qrDataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [isDarkTheme]);

  const updateField = (field, value) => {
    setSlipData(prev => ({ ...prev, [field]: value }));
  };

  const addEarning = () => {
    const newEarning = {
      id: Date.now(),
      title: '',
      amount: 0
    };
    setSlipData(prev => ({
      ...prev,
      earnings: [...prev.earnings, newEarning]
    }));
  };

  const updateEarning = (id, field, value) => {
    setSlipData(prev => ({
      ...prev,
      earnings: prev.earnings.map(earning => 
        earning.id === id ? { ...earning, [field]: field === 'amount' ? Number(value) || 0 : value } : earning
      )
    }));
  };

  const removeEarning = (id) => {
    setSlipData(prev => ({
      ...prev,
      earnings: prev.earnings.filter(earning => earning.id !== id)
    }));
  };

  const addDeduction = () => {
    const newDeduction = {
      id: Date.now(),
      title: '',
      amount: 0
    };
    setSlipData(prev => ({
      ...prev,
      deductions: [...prev.deductions, newDeduction]
    }));
  };

  const updateDeduction = (id, field, value) => {
    setSlipData(prev => ({
      ...prev,
      deductions: prev.deductions.map(deduction => 
        deduction.id === id ? { ...deduction, [field]: field === 'amount' ? Number(value) || 0 : value } : deduction
      )
    }));
  };

  const removeDeduction = (id) => {
    setSlipData(prev => ({
      ...prev,
      deductions: prev.deductions.filter(deduction => deduction.id !== id)
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const calculateTotals = () => {
    const totalEarnings = slipData.earnings.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalDeductions = slipData.deductions.reduce((sum, item) => sum + (item.amount || 0), 0);
    const netPay = totalEarnings - totalDeductions;
    
    return { totalEarnings, totalDeductions, netPay };
  };

  const clearForm = () => {
    sessionStorage.removeItem('salarySlipData');
    window.location.reload();
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: isDarkTheme ? '#1a1a1a' : '#ffffff'
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`salary-slip-${slipData.referenceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const printSlip = () => {
    window.print();
  };

  const { totalEarnings, totalDeductions, netPay } = calculateTotals();

  return (
    <PrintStyles>
      <CreatorOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <CreatorContainer
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {/* Form Section */}
          <FormSection>
            <h2>
              <FaCalculator />
              Salary Slip Generator
            </h2>

            {/* Company Information */}
            <SectionTitle>
              <FaBuilding className="icon" />
              Company Information
            </SectionTitle>

            <FormGroup>
              <label>
                <FaBuilding className="icon" />
                Company Name
              </label>
              <input
                type="text"
                value={slipData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Revolvo Tech"
              />
            </FormGroup>

            <FormGroup>
              <label>Tagline</label>
              <input
                type="text"
                value={slipData.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                placeholder="Innovation in Motion"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaMapMarkerAlt className="icon" />
                Address
              </label>
              <textarea
                value={slipData.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="Company address"
                rows="2"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaPhone className="icon" />
                Phone
              </label>
              <input
                type="text"
                value={slipData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+358 41 7408087"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaEnvelope className="icon" />
                Email
              </label>
              <input
                type="email"
                value={slipData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="job@revolvo.tech"
              />
            </FormGroup>

            {/* Employee Information */}
            <SectionTitle>
              <FaUser className="icon" />
              Employee Information
            </SectionTitle>

            <FormGroup>
              <label>
                <FaUser className="icon" />
                Employee Name
              </label>
              <input
                type="text"
                value={slipData.employeeName}
                onChange={(e) => updateField('employeeName', e.target.value)}
                placeholder="John Doe"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaIdCard className="icon" />
                Employee ID
              </label>
              <input
                type="text"
                value={slipData.employeeId}
                onChange={(e) => updateField('employeeId', e.target.value)}
                placeholder="EMP001"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaBriefcase className="icon" />
                Designation
              </label>
              <input
                type="text"
                value={slipData.designation}
                onChange={(e) => updateField('designation', e.target.value)}
                placeholder="Software Engineer"
              />
            </FormGroup>

            <FormGroup>
              <label>Department</label>
              <input
                type="text"
                value={slipData.department}
                onChange={(e) => updateField('department', e.target.value)}
                placeholder="Engineering"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaCalendarAlt className="icon" />
                Pay Period
              </label>
              <input
                type="month"
                value={slipData.payPeriod}
                onChange={(e) => updateField('payPeriod', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaCalendarAlt className="icon" />
                Pay Date
              </label>
              <input
                type="date"
                value={slipData.payDate}
                onChange={(e) => updateField('payDate', e.target.value)}
              />
            </FormGroup>

            {/* Earnings Section */}
            <SectionTitle>
              <FaMoneyBillWave className="icon" />
              Earnings
            </SectionTitle>

            {slipData.earnings.map((earning) => (
              <ItemSection key={earning.id}>
                <FormGroup>
                  <label>Earning Title</label>
                  <input
                    type="text"
                    value={earning.title}
                    onChange={(e) => updateEarning(earning.id, 'title', e.target.value)}
                    placeholder="Basic Salary"
                  />
                </FormGroup>
                <ItemGrid>
                  <FormGroup>
                    <label>Amount (EUR)</label>
                    <input
                      type="number"
                      value={earning.amount}
                      onChange={(e) => updateEarning(earning.id, 'amount', e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                  <div></div>
                  <button
                    className="remove-btn"
                    onClick={() => removeEarning(earning.id)}
                  >
                    <FaTrash />
                  </button>
                </ItemGrid>
              </ItemSection>
            ))}

            <AddItemBtn onClick={addEarning}>
              <FaPlus />
              Add Earning
            </AddItemBtn>

            {/* Deductions Section */}
            <SectionTitle>
              <FaDollarSign className="icon" />
              Deductions
            </SectionTitle>

            {slipData.deductions.map((deduction) => (
              <ItemSection key={deduction.id}>
                <FormGroup>
                  <label>Deduction Title</label>
                  <input
                    type="text"
                    value={deduction.title}
                    onChange={(e) => updateDeduction(deduction.id, 'title', e.target.value)}
                    placeholder="Provident Fund"
                  />
                </FormGroup>
                <ItemGrid>
                  <FormGroup>
                    <label>Amount (EUR)</label>
                    <input
                      type="number"
                      value={deduction.amount}
                      onChange={(e) => updateDeduction(deduction.id, 'amount', e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                  <div></div>
                  <button
                    className="remove-btn"
                    onClick={() => removeDeduction(deduction.id)}
                  >
                    <FaTrash />
                  </button>
                </ItemGrid>
              </ItemSection>
            ))}

            <AddItemBtn onClick={addDeduction}>
              <FaPlus />
              Add Deduction
            </AddItemBtn>

            {/* Action Buttons */}
            <ActionButtons>
              <button className="secondary" onClick={printSlip}>
                <FaPrint />
                Print Slip
              </button>
              <button className="primary" onClick={downloadPDF}>
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
            
            <SlipPreview ref={previewRef} className="printable-slip" $isDarkTheme={isDarkTheme}>
              <div className="slip-header">
                <div className="company-section">
                  <div className="logo">
                    <img src={isDarkTheme ? RevolvoLogo : RevolvoLogoDark} alt="Company Logo" />
                  </div>
                  <div className="company-details">
                    <div className="company-name">{slipData.companyName || 'REVOLVO TECH'}</div>
                    <div className="tagline">{slipData.tagline || 'Innovation in Motion'}</div>
                  </div>
                </div>
                
                <div className="slip-title">
                  <div className="title">Salary Slip</div>
                  <div className="reference">#{slipData.referenceNumber}</div>
                </div>
              </div>

              <div className="slip-content">
                {/* Employee Information */}
                <div className="employee-section">
                  <div className="employee-info">
                    <div className="info-item">
                      <div className="label">Employee Name</div>
                      <div className="value">{slipData.employeeName || '[Employee Name]'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Employee ID</div>
                      <div className="value">{slipData.employeeId || '[ID]'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Designation</div>
                      <div className="value">{slipData.designation || '[Designation]'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Department</div>
                      <div className="value">{slipData.department || '[Department]'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Pay Period</div>
                      <div className="value">{slipData.payPeriod ? new Date(slipData.payPeriod + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '[Pay Period]'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Pay Date</div>
                      <div className="value">{slipData.payDate ? new Date(slipData.payDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '[Pay Date]'}</div>
                    </div>
                  </div>
                </div>

                {/* Salary Breakdown */}
                <div className="salary-breakdown">
                  {/* Earnings */}
                  <div className="earnings">
                    <div className="section-title">Earnings</div>
                    {slipData.earnings.map((earning) => (
                      <div key={earning.id} className="item">
                        <span className="item-title">{earning.title || 'Untitled'}</span>
                        <span className="item-amount">{formatCurrency(earning.amount || 0)}</span>
                      </div>
                    ))}
                    <div className="item total">
                      <span className="item-title">Total Earnings</span>
                      <span className="item-amount">{formatCurrency(totalEarnings)}</span>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div className="deductions">
                    <div className="section-title">Deductions</div>
                    {slipData.deductions.map((deduction) => (
                      <div key={deduction.id} className="item">
                        <span className="item-title">{deduction.title || 'Untitled'}</span>
                        <span className="item-amount">{formatCurrency(deduction.amount || 0)}</span>
                      </div>
                    ))}
                    <div className="item total">
                      <span className="item-title">Total Deductions</span>
                      <span className="item-amount">{formatCurrency(totalDeductions)}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="summary">
                    <div className="section-title">Summary</div>
                    <div className="item">
                      <span className="item-title">Gross Pay</span>
                      <span className="item-amount">{formatCurrency(totalEarnings)}</span>
                    </div>
                    <div className="item">
                      <span className="item-title">Total Deductions</span>
                      <span className="item-amount">{formatCurrency(totalDeductions)}</span>
                    </div>
                    
                    <div className="net-pay">
                      <div className="label">Net Pay</div>
                      <div className="amount">{formatCurrency(netPay)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="slip-footer">
                <div className="contact-grid">
                  <div className="contact-item">
                    <FaEnvelope />
                    <span className="contact-text">{slipData.email}</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone />
                    <span className="contact-text">{slipData.phone}</span>
                  </div>
                  <div className="contact-item">
                    <FaGlobe />
                    <span className="contact-text">{slipData.website}</span>
                  </div>
                  <div className="contact-item">
                    <FaLinkedin />
                    <span className="contact-text">/company/revolvotech</span>
                  </div>
                </div>
              </div>
            </SlipPreview>
          </PreviewSection>
        </CreatorContainer>
      </CreatorOverlay>
    </PrintStyles>
  );
};

export default SalarySlipGenerator;