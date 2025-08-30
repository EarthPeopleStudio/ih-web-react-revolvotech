import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaDownload, FaPrint, FaEye, FaPlus, FaTrash,
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt,
  FaClock, FaDollarSign, FaGlobe, FaPaperPlane, FaEraser,
  FaSun, FaMoon, FaLinkedin, FaQrcode, FaBriefcase, FaIdCard,
  FaMapMarkerAlt, FaFileSignature, FaGift, FaShieldAlt, FaHandshake,
  FaFileContract, FaPercent, FaCalculator, FaStar, FaCheck
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import RevolvoLogo from "../../assets/revolvo-logo.png";
import RevolvoLogoDark from "../../assets/revolvo-logo-dark.png";

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
    
    .printable-bonus,
    .printable-bonus * {
      visibility: visible !important;
    }
    
    .printable-bonus {
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
    
    .printable-bonus * {
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
      transform: scale(1.05);
    }
  }

  &.theme {
    background: rgba(251, 182, 4, 0.1);
    border-color: rgba(251, 182, 4, 0.3);
    color: #fbb604;
    
    &:hover {
      background: rgba(251, 182, 4, 0.2);
      border-color: #fbb604;
      transform: scale(1.05);
    }
  }

  &.close {
    background: rgba(220, 38, 127, 0.1);
    border-color: rgba(220, 38, 127, 0.3);
    color: #dc267f;
    
    &:hover {
      background: rgba(220, 38, 127, 0.2);
      border-color: #dc267f;
      transform: scale(1.05);
    }
  }

  &.download {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.3);
    color: #22c55e;
    
    &:hover {
      background: rgba(34, 197, 94, 0.2);
      border-color: #22c55e;
      transform: scale(1.05);
    }
  }

  &.print {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    color: #6366f1;
    
    &:hover {
      background: rgba(99, 102, 241, 0.2);
      border-color: #6366f1;
      transform: scale(1.05);
    }
  }

  &.email {
    background: rgba(251, 182, 4, 0.1);
    border-color: rgba(251, 182, 4, 0.3);
    color: #fbb604;
    
    &:hover {
      background: rgba(251, 182, 4, 0.2);
      border-color: #fbb604;
      transform: scale(1.05);
    }
  }
`;

const FormTitle = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .icon {
    color: #fbb604;
    font-size: 1.8rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;

  h3 {
    color: #fbb604;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1rem;
    }
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fit, minmax(200px, 1fr))'};
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .required {
      color: #ff6b6b;
    }

    .icon {
      color: #fbb604;
      font-size: 0.8rem;
    }
  }

  input, select, textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    color: white;
    font-size: 0.95rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #fbb604;
      background: rgba(251, 182, 4, 0.1);
      box-shadow: 0 0 0 3px rgba(251, 182, 4, 0.2);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
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
        transform: translateY(-2px);
      }
    }

    &.print {
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #6366f1;

      &:hover {
        background: rgba(99, 102, 241, 0.2);
        transform: translateY(-2px);
      }
    }

    &.clear {
      background: rgba(251, 182, 4, 0.1);
      border: 1px solid rgba(251, 182, 4, 0.3);
      color: #fbb604;

      &:hover {
        background: rgba(251, 182, 4, 0.2);
        transform: translateY(-2px);
      }
    }
  }
`;

const BonusPreview = styled.div`
  width: 100%;
  max-width: 600px;
  background: #0a0a0a;
  border: 2px solid rgba(251, 182, 4, 0.3);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  position: relative;

  &.printable-bonus {
    border: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 210mm;
    min-height: 297mm;
    padding: 15mm;
    margin: 0;
    background: #0a0a0a;
  }
`;

const BonusHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #fbb604, #f9a825);
    border-radius: 2px;
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #fbb604;
    margin: 0 0 0.5rem 0;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    font-weight: 500;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoBlock = styled.div`
  h3 {
    color: #fbb604;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1rem;
    }
  }

  .info-item {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
    margin: 0.25rem 0;
    display: flex;
    justify-content: space-between;

    .label {
      color: rgba(255, 255, 255, 0.7);
    }

    .value {
      color: white;
      font-weight: 600;
    }
  }
`;

const BonusDetailsSection = styled.div`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(249, 162, 37, 0.05));
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;

  h3 {
    color: #fbb604;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1.1rem;
    }
  }

  .bonus-calculation {
    display: grid;
    gap: 0.75rem;

    .calc-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(251, 182, 4, 0.2);
      
      &:last-child {
        border-bottom: none;
        font-weight: 700;
        font-size: 1.1rem;
        color: #fbb604;
        background: rgba(251, 182, 4, 0.1);
        margin: 0.5rem -1.5rem -1.5rem;
        padding: 1rem 1.5rem;
        border-radius: 0 0 12px 12px;
      }

      .label {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.95rem;
      }

      .value {
        color: white;
        font-weight: 600;
        font-size: 0.95rem;
      }
    }
  }
`;

const BonusSlipGenerator = ({ isOpen, onClose }) => {
  const previewRef = useRef();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const [bonusData, setBonusData] = useState(() => {
    const saved = sessionStorage.getItem('bonus-slip-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved bonus data');
      }
    }
    
    return {
      // Company Information
      companyName: "Revolvo Technologies",
      companyAddress: "123 Business District, Tech City",
      companyPhone: "+1 (555) 123-4567",
      companyEmail: "job@revolvo.tech",
      
      // Employee Information
      employeeName: "",
      employeeId: "",
      department: "",
      position: "",
      
      // Bonus Details
      bonusType: "Performance Bonus",
      bonusPeriod: "",
      bonusReason: "",
      baseAmount: "",
      bonusPercentage: "",
      additionalAmount: "",
      
      // Tax Information
      taxDeductions: "",
      
      // Issue Details
      issueDate: new Date().toISOString().split('T')[0],
      paymentDate: ""
    };
  });

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...bonusData,
      [field]: value
    };
    setBonusData(updatedData);
    
    try {
      sessionStorage.setItem('bonus-slip-data', JSON.stringify(updatedData));
    } catch (e) {
      console.warn('Failed to save bonus data to session storage');
    }
  };

  const calculateTotals = () => {
    const base = parseFloat(bonusData.baseAmount) || 0;
    const percentage = parseFloat(bonusData.bonusPercentage) || 0;
    const additional = parseFloat(bonusData.additionalAmount) || 0;
    const tax = parseFloat(bonusData.taxDeductions) || 0;
    
    const bonusAmount = (base * percentage / 100) + additional;
    const netAmount = bonusAmount - tax;
    
    return { base, percentage, additional, tax, bonusAmount, netAmount };
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0a0a0a'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Bonus_Slip_${bonusData.employeeName?.replace(/\s+/g, '_') || 'Employee'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const { netAmount } = calculateTotals();
    const subject = `Bonus Slip - ${bonusData.bonusType} for ${bonusData.employeeName}`;
    const body = `Dear ${bonusData.employeeName},\n\nCongratulations! Please find attached your bonus slip.\n\nBonus Details:\n- Type: ${bonusData.bonusType}\n- Period: ${bonusData.bonusPeriod}\n- Net Amount: $${netAmount.toFixed(2)}\n\nBest regards,\nHuman Resources\n${bonusData.companyName}`;
    
    const mailtoLink = `mailto:${bonusData.employeeEmail || bonusData.companyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      const clearedData = {
        companyName: "Revolvo Technologies",
        companyAddress: "123 Business District, Tech City",
        companyPhone: "+1 (555) 123-4567",
        companyEmail: "job@revolvo.tech",
        employeeName: "",
        employeeId: "",
        department: "",
        position: "",
        bonusType: "Performance Bonus",
        bonusPeriod: "",
        bonusReason: "",
        baseAmount: "",
        bonusPercentage: "",
        additionalAmount: "",
        taxDeductions: "",
        issueDate: new Date().toISOString().split('T')[0],
        paymentDate: ""
      };
      setBonusData(clearedData);
      sessionStorage.removeItem('bonus-slip-data');
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const { base, percentage, additional, tax, bonusAmount, netAmount } = calculateTotals();

  if (!isOpen) return null;

  return (
    <>
      <PrintStyles />
      <CreatorOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TopButtons>
          <TopButton className="clear" onClick={handleClear} title="Clear Form">
            <FaEraser />
          </TopButton>
          <TopButton className="theme" onClick={toggleTheme} title="Toggle Theme">
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </TopButton>
          <TopButton className="email" onClick={handleSendEmail} title="Send Email">
            <FaPaperPlane />
          </TopButton>
          <TopButton className="print" onClick={handlePrint} title="Print">
            <FaPrint />
          </TopButton>
          <TopButton className="download" onClick={handleDownloadPDF} title="Download PDF">
            <FaDownload />
          </TopButton>
          <TopButton className="close" onClick={onClose} title="Close">
            <FaTimes />
          </TopButton>
        </TopButtons>

        <CreatorContainer
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <FormSection>
            <FormTitle>
              <FaGift className="icon" />
              Bonus Slip Generator
            </FormTitle>

            <FormGroup>
              <h3>
                <FaBuilding className="icon" />
                Company Information
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaBuilding className="icon" />
                    Company Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={bonusData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Your company name"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaPhone className="icon" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={bonusData.companyPhone}
                    onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaMapMarkerAlt className="icon" />
                    Company Address
                  </label>
                  <input
                    type="text"
                    value={bonusData.companyAddress}
                    onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                    placeholder="Complete company address"
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaEnvelope className="icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={bonusData.companyEmail}
                    onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                    placeholder="job@company.com"
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>

            <FormGroup>
              <h3>
                <FaUser className="icon" />
                Employee Information
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaUser className="icon" />
                    Employee Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={bonusData.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    placeholder="Full employee name"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaIdCard className="icon" />
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={bonusData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    placeholder="EMP001"
                  />
                </InputGroup>
              </FormRow>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaBuilding className="icon" />
                    Department
                  </label>
                  <input
                    type="text"
                    value={bonusData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="Department name"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaBriefcase className="icon" />
                    Position
                  </label>
                  <input
                    type="text"
                    value={bonusData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Job position"
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>

            <FormGroup>
              <h3>
                <FaGift className="icon" />
                Bonus Details
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaGift className="icon" />
                    Bonus Type
                  </label>
                  <select
                    value={bonusData.bonusType}
                    onChange={(e) => handleInputChange('bonusType', e.target.value)}
                  >
                    <option value="Performance Bonus">Performance Bonus</option>
                    <option value="Annual Bonus">Annual Bonus</option>
                    <option value="Holiday Bonus">Holiday Bonus</option>
                    <option value="Achievement Bonus">Achievement Bonus</option>
                    <option value="Retention Bonus">Retention Bonus</option>
                    <option value="Project Completion Bonus">Project Completion Bonus</option>
                  </select>
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaCalendarAlt className="icon" />
                    Bonus Period
                  </label>
                  <input
                    type="text"
                    value={bonusData.bonusPeriod}
                    onChange={(e) => handleInputChange('bonusPeriod', e.target.value)}
                    placeholder="Q1 2024, Annual 2024"
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaStar className="icon" />
                    Bonus Reason/Achievement
                  </label>
                  <textarea
                    value={bonusData.bonusReason}
                    onChange={(e) => handleInputChange('bonusReason', e.target.value)}
                    placeholder="Describe the reason for this bonus award..."
                    rows="3"
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>

            <FormGroup>
              <h3>
                <FaCalculator className="icon" />
                Bonus Calculation
              </h3>
              <FormRow columns="1fr 1fr 1fr">
                <InputGroup>
                  <label>
                    <FaDollarSign className="icon" />
                    Base Amount
                  </label>
                  <input
                    type="number"
                    value={bonusData.baseAmount}
                    onChange={(e) => handleInputChange('baseAmount', e.target.value)}
                    placeholder="50000"
                    step="0.01"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaPercent className="icon" />
                    Bonus Percentage
                  </label>
                  <input
                    type="number"
                    value={bonusData.bonusPercentage}
                    onChange={(e) => handleInputChange('bonusPercentage', e.target.value)}
                    placeholder="10"
                    step="0.1"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaDollarSign className="icon" />
                    Additional Amount
                  </label>
                  <input
                    type="number"
                    value={bonusData.additionalAmount}
                    onChange={(e) => handleInputChange('additionalAmount', e.target.value)}
                    placeholder="1000"
                    step="0.01"
                  />
                </InputGroup>
              </FormRow>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaDollarSign className="icon" />
                    Tax Deductions
                  </label>
                  <input
                    type="number"
                    value={bonusData.taxDeductions}
                    onChange={(e) => handleInputChange('taxDeductions', e.target.value)}
                    placeholder="500"
                    step="0.01"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaCalendarAlt className="icon" />
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={bonusData.paymentDate}
                    onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>

            <ActionButtons>
              <button className="clear" onClick={handleClear}>
                <FaTrash />
                Clear All
              </button>
              <button className="print" onClick={handlePrint}>
                <FaPrint />
                Print Slip
              </button>
              <button className="secondary" onClick={handleSendEmail}>
                <FaEnvelope />
                Send via Email
              </button>
              <button className="primary" onClick={handleDownloadPDF}>
                <FaDownload />
                Download PDF
              </button>
            </ActionButtons>
          </FormSection>

          <PreviewSection>
            <BonusPreview ref={previewRef} className="printable-bonus" $isDarkTheme={isDarkTheme}>
              <BonusHeader>
                <h1>BONUS SLIP</h1>
                <div className="subtitle">Employee Bonus Statement</div>
              </BonusHeader>

              <InfoGrid>
                <InfoBlock>
                  <h3>
                    <FaBuilding className="icon" />
                    Company Details
                  </h3>
                  <div className="info-item">
                    <span className="label">Name:</span>
                    <span className="value">{bonusData.companyName}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Address:</span>
                    <span className="value">{bonusData.companyAddress}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone:</span>
                    <span className="value">{bonusData.companyPhone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{bonusData.companyEmail}</span>
                  </div>
                </InfoBlock>

                <InfoBlock>
                  <h3>
                    <FaUser className="icon" />
                    Employee Details
                  </h3>
                  <div className="info-item">
                    <span className="label">Name:</span>
                    <span className="value">{bonusData.employeeName || '[Employee Name]'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">ID:</span>
                    <span className="value">{bonusData.employeeId || '[Employee ID]'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Department:</span>
                    <span className="value">{bonusData.department || '[Department]'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Position:</span>
                    <span className="value">{bonusData.position || '[Position]'}</span>
                  </div>
                </InfoBlock>
              </InfoGrid>

              <BonusDetailsSection>
                <h3>
                  <FaGift className="icon" />
                  Bonus Information
                </h3>
                <div className="bonus-calculation">
                  <div className="calc-row">
                    <span className="label">Bonus Type:</span>
                    <span className="value">{bonusData.bonusType}</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Period:</span>
                    <span className="value">{bonusData.bonusPeriod || '[Period]'}</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Issue Date:</span>
                    <span className="value">{bonusData.issueDate}</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Payment Date:</span>
                    <span className="value">{bonusData.paymentDate || '[Payment Date]'}</span>
                  </div>
                </div>
              </BonusDetailsSection>

              <BonusDetailsSection>
                <h3>
                  <FaDollarSign className="icon" />
                  Bonus Calculation
                </h3>
                <div className="bonus-calculation">
                  <div className="calc-row">
                    <span className="label">Base Amount:</span>
                    <span className="value">${base.toFixed(2)}</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Bonus Percentage:</span>
                    <span className="value">{percentage}%</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Percentage Amount:</span>
                    <span className="value">${((base * percentage) / 100).toFixed(2)}</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Additional Amount:</span>
                    <span className="value">${additional.toFixed(2)}</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Gross Bonus:</span>
                    <span className="value">${bonusAmount.toFixed(2)}</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Tax Deductions:</span>
                    <span className="value">-${tax.toFixed(2)}</span>
                  </div>
                  <div className="calc-row">
                    <span className="label">Net Bonus Amount:</span>
                    <span className="value">${netAmount.toFixed(2)}</span>
                  </div>
                </div>
              </BonusDetailsSection>

              {bonusData.bonusReason && (
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(249, 162, 37, 0.05))', 
                  border: '1px solid rgba(251, 182, 4, 0.3)', 
                  borderRadius: '12px', 
                  padding: '1.5rem', 
                  marginBottom: '2rem' 
                }}>
                  <h3 style={{ 
                    color: '#fbb604', 
                    margin: '0 0 1rem 0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem' 
                  }}>
                    <FaStar style={{ fontSize: '1.1rem' }} />
                    Achievement Recognition
                  </h3>
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    margin: 0, 
                    fontStyle: 'italic', 
                    lineHeight: '1.5' 
                  }}>
                    {bonusData.bonusReason}
                  </p>
                </div>
              )}

              <div style={{ 
                textAlign: 'center', 
                marginTop: '2rem', 
                padding: '1rem', 
                border: '1px solid rgba(251, 182, 4, 0.3)', 
                borderRadius: '8px',
                background: 'rgba(251, 182, 4, 0.05)'
              }}>
                <p style={{ 
                  margin: 0, 
                  color: '#fbb604', 
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}>
                  🎉 Congratulations on your outstanding performance! 🎉
                </p>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: '0.9rem'
                }}>
                  This bonus reflects your valuable contribution to our organization.
                </p>
              </div>

              <div style={{ 
                marginTop: '2rem', 
                textAlign: 'center', 
                color: 'rgba(255, 255, 255, 0.5)', 
                fontSize: '0.8rem' 
              }}>
                <p style={{ margin: 0 }}>Generated on: {new Date().toLocaleDateString()}</p>
                <p style={{ margin: '0.25rem 0 0 0' }}>This is a computer-generated document.</p>
              </div>
            </BonusPreview>
          </PreviewSection>
        </CreatorContainer>
      </CreatorOverlay>
    </>
  );
};

export default BonusSlipGenerator;