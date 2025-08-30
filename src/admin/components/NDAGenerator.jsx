import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaDownload, FaPrint, FaEye, FaPlus, FaTrash,
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt,
  FaClock, FaDollarSign, FaGlobe, FaPaperPlane, FaEraser,
  FaSun, FaMoon, FaLinkedin, FaQrcode, FaBriefcase, FaIdCard,
  FaMapMarkerAlt, FaFileSignature, FaShieldAlt, FaHandshake,
  FaFileContract, FaGavel, FaLock, FaExclamationTriangle
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
    
    .printable-nda,
    .printable-nda * {
      visibility: visible !important;
    }
    
    .printable-nda {
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
    
    .printable-nda * {
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

const NDAPreview = styled.div`
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
  font-size: 0.9rem;
  line-height: 1.6;

  &.printable-nda {
    border: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 210mm;
    min-height: 297mm;
    padding: 15mm;
    margin: 0;
    background: #0a0a0a;
    font-size: 11pt;
  }
`;

const NDAHeader = styled.div`
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

const NDASection = styled.div`
  margin-bottom: 2rem;

  h3 {
    color: #fbb604;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(251, 182, 4, 0.3);

    .icon {
      font-size: 1.1rem;
    }
  }

  p {
    margin: 0 0 1rem 0;
    color: rgba(255, 255, 255, 0.9);
    text-align: justify;
    line-height: 1.7;
  }

  .clause-number {
    color: #fbb604;
    font-weight: 700;
    margin-right: 0.5rem;
  }
`;

const WarningBox = styled.div`
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(220, 38, 127, 0.05));
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .icon {
    color: #ff6b6b;
    font-size: 1.5rem;
    margin-top: 0.25rem;
  }

  .content {
    flex: 1;

    h4 {
      color: #ff6b6b;
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
`;

const SignatureSection = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  .signature-block {
    text-align: center;

    .signature-line {
      border-bottom: 2px solid #fbb604;
      height: 3rem;
      margin-bottom: 0.5rem;
    }

    .signature-label {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
      font-weight: 500;
    }

    .signature-name {
      font-size: 1rem;
      font-weight: 700;
      color: white;
      margin-top: 0.5rem;
    }

    .signature-title {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.6);
      font-style: italic;
    }
  }
`;

const NDAGenerator = ({ isOpen, onClose }) => {
  const previewRef = useRef();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const [ndaData, setNdaData] = useState(() => {
    const saved = sessionStorage.getItem('nda-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved NDA data');
      }
    }
    
    return {
      // Disclosing Party Information
      disclosingPartyName: "Revolvo Technologies",
      disclosingPartyType: "Company",
      disclosingPartyAddress: "123 Business District, Tech City",
      disclosingPartyEmail: "legal@revolvo.tech",
      
      // Receiving Party Information
      receivingPartyName: "",
      receivingPartyType: "Individual",
      receivingPartyAddress: "",
      receivingPartyEmail: "",
      
      // NDA Details
      ndaTitle: "Non-Disclosure Agreement",
      effectiveDate: new Date().toISOString().split('T')[0],
      duration: "5 years",
      purpose: "To discuss potential business opportunities, partnerships, or collaborations",
      
      // Custom Terms
      customClauses: "",
      jurisdiction: "State of California",
      
      // Agreement Date
      agreementDate: new Date().toISOString().split('T')[0]
    };
  });

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...ndaData,
      [field]: value
    };
    setNdaData(updatedData);
    
    try {
      sessionStorage.setItem('nda-data', JSON.stringify(updatedData));
    } catch (e) {
      console.warn('Failed to save NDA data to session storage');
    }
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
      pdf.save(`NDA_${ndaData.receivingPartyName?.replace(/\s+/g, '_') || 'Agreement'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const subject = `Non-Disclosure Agreement - ${ndaData.ndaTitle}`;
    const body = `Dear ${ndaData.receivingPartyName},\n\nPlease find attached the Non-Disclosure Agreement for review and signature.\n\nPurpose: ${ndaData.purpose}\nDuration: ${ndaData.duration}\nEffective Date: ${ndaData.effectiveDate}\n\nPlease review the terms carefully and let us know if you have any questions.\n\nBest regards,\n${ndaData.disclosingPartyName}`;
    
    const mailtoLink = `mailto:${ndaData.receivingPartyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      const clearedData = {
        disclosingPartyName: "Revolvo Technologies",
        disclosingPartyType: "Company",
        disclosingPartyAddress: "123 Business District, Tech City",
        disclosingPartyEmail: "legal@revolvo.tech",
        receivingPartyName: "",
        receivingPartyType: "Individual",
        receivingPartyAddress: "",
        receivingPartyEmail: "",
        ndaTitle: "Non-Disclosure Agreement",
        effectiveDate: new Date().toISOString().split('T')[0],
        duration: "5 years",
        purpose: "To discuss potential business opportunities, partnerships, or collaborations",
        customClauses: "",
        jurisdiction: "State of California",
        agreementDate: new Date().toISOString().split('T')[0]
      };
      setNdaData(clearedData);
      sessionStorage.removeItem('nda-data');
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

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
              <FaShieldAlt className="icon" />
              NDA Generator
            </FormTitle>

            <FormGroup>
              <h3>
                <FaBuilding className="icon" />
                Disclosing Party Information
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaBuilding className="icon" />
                    Party Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={ndaData.disclosingPartyName}
                    onChange={(e) => handleInputChange('disclosingPartyName', e.target.value)}
                    placeholder="Your organization name"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaUser className="icon" />
                    Party Type
                  </label>
                  <select
                    value={ndaData.disclosingPartyType}
                    onChange={(e) => handleInputChange('disclosingPartyType', e.target.value)}
                  >
                    <option value="Company">Company</option>
                    <option value="Individual">Individual</option>
                    <option value="Partnership">Partnership</option>
                    <option value="LLC">LLC</option>
                  </select>
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaMapMarkerAlt className="icon" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={ndaData.disclosingPartyAddress}
                    onChange={(e) => handleInputChange('disclosingPartyAddress', e.target.value)}
                    placeholder="Complete address"
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
                    value={ndaData.disclosingPartyEmail}
                    onChange={(e) => handleInputChange('disclosingPartyEmail', e.target.value)}
                    placeholder="legal@company.com"
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>

            <FormGroup>
              <h3>
                <FaUser className="icon" />
                Receiving Party Information
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaUser className="icon" />
                    Party Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={ndaData.receivingPartyName}
                    onChange={(e) => handleInputChange('receivingPartyName', e.target.value)}
                    placeholder="Recipient name"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaUser className="icon" />
                    Party Type
                  </label>
                  <select
                    value={ndaData.receivingPartyType}
                    onChange={(e) => handleInputChange('receivingPartyType', e.target.value)}
                  >
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                    <option value="Partnership">Partnership</option>
                    <option value="LLC">LLC</option>
                  </select>
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaMapMarkerAlt className="icon" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={ndaData.receivingPartyAddress}
                    onChange={(e) => handleInputChange('receivingPartyAddress', e.target.value)}
                    placeholder="Complete address"
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
                    value={ndaData.receivingPartyEmail}
                    onChange={(e) => handleInputChange('receivingPartyEmail', e.target.value)}
                    placeholder="recipient@email.com"
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>

            <FormGroup>
              <h3>
                <FaFileContract className="icon" />
                Agreement Details
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaCalendarAlt className="icon" />
                    Effective Date
                  </label>
                  <input
                    type="date"
                    value={ndaData.effectiveDate}
                    onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaClock className="icon" />
                    Duration
                  </label>
                  <select
                    value={ndaData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  >
                    <option value="1 year">1 year</option>
                    <option value="2 years">2 years</option>
                    <option value="3 years">3 years</option>
                    <option value="5 years">5 years</option>
                    <option value="Indefinite">Indefinite</option>
                  </select>
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaHandshake className="icon" />
                    Purpose of Disclosure
                  </label>
                  <textarea
                    value={ndaData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    placeholder="Describe the purpose of information sharing..."
                    rows="3"
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaGavel className="icon" />
                    Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={ndaData.jurisdiction}
                    onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                    placeholder="State of California"
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>

            <FormGroup>
              <h3>
                <FaFileSignature className="icon" />
                Additional Terms
              </h3>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaFileSignature className="icon" />
                    Custom Clauses (Optional)
                  </label>
                  <textarea
                    value={ndaData.customClauses}
                    onChange={(e) => handleInputChange('customClauses', e.target.value)}
                    placeholder="Add any additional terms or clauses specific to this agreement..."
                    rows="4"
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
                Print NDA
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
            <NDAPreview ref={previewRef} className="printable-nda" $isDarkTheme={isDarkTheme}>
              <NDAHeader>
                <h1>NON-DISCLOSURE AGREEMENT</h1>
                <div className="subtitle">{ndaData.ndaTitle}</div>
              </NDAHeader>

              <InfoGrid>
                <InfoBlock>
                  <h3>
                    <FaBuilding className="icon" />
                    Disclosing Party
                  </h3>
                  <div className="info-item">
                    <span className="label">Name:</span>
                    <span className="value">{ndaData.disclosingPartyName}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Type:</span>
                    <span className="value">{ndaData.disclosingPartyType}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Address:</span>
                    <span className="value">{ndaData.disclosingPartyAddress}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{ndaData.disclosingPartyEmail}</span>
                  </div>
                </InfoBlock>

                <InfoBlock>
                  <h3>
                    <FaUser className="icon" />
                    Receiving Party
                  </h3>
                  <div className="info-item">
                    <span className="label">Name:</span>
                    <span className="value">{ndaData.receivingPartyName || '[Receiving Party Name]'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Type:</span>
                    <span className="value">{ndaData.receivingPartyType}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Address:</span>
                    <span className="value">{ndaData.receivingPartyAddress || '[Address]'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{ndaData.receivingPartyEmail || '[Email]'}</span>
                  </div>
                </InfoBlock>
              </InfoGrid>

              <div style={{ 
                marginBottom: '2rem', 
                padding: '1rem', 
                background: 'rgba(251, 182, 4, 0.05)', 
                borderRadius: '8px', 
                border: '1px solid rgba(251, 182, 4, 0.2)' 
              }}>
                <div className="info-item">
                  <span className="label">Effective Date:</span>
                  <span className="value">{ndaData.effectiveDate}</span>
                </div>
                <div className="info-item">
                  <span className="label">Duration:</span>
                  <span className="value">{ndaData.duration}</span>
                </div>
                <div className="info-item">
                  <span className="label">Jurisdiction:</span>
                  <span className="value">{ndaData.jurisdiction}</span>
                </div>
              </div>

              <NDASection>
                <h3>
                  <FaHandshake className="icon" />
                  1. PURPOSE
                </h3>
                <p>
                  <span className="clause-number">1.1</span>
                  The purpose of this Non-Disclosure Agreement is: {ndaData.purpose}
                </p>
                <p>
                  <span className="clause-number">1.2</span>
                  Both parties wish to explore potential business opportunities while maintaining strict confidentiality of all disclosed information.
                </p>
              </NDASection>

              <NDASection>
                <h3>
                  <FaLock className="icon" />
                  2. DEFINITION OF CONFIDENTIAL INFORMATION
                </h3>
                <p>
                  <span className="clause-number">2.1</span>
                  "Confidential Information" means any and all information disclosed by the Disclosing Party to the Receiving Party, whether orally, in writing, electronically, or in any other form, including but not limited to:
                </p>
                <p style={{ marginLeft: '1rem' }}>
                  (a) Technical data, know-how, research, product plans, products, services, customers, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, or other business information;
                </p>
                <p style={{ marginLeft: '1rem' }}>
                  (b) Financial information, business plans, projections, marketing plans, customer lists, pricing information, or other proprietary business information.
                </p>
              </NDASection>

              <NDASection>
                <h3>
                  <FaShieldAlt className="icon" />
                  3. OBLIGATIONS OF RECEIVING PARTY
                </h3>
                <p>
                  <span className="clause-number">3.1</span>
                  The Receiving Party agrees to hold all Confidential Information in strict confidence and not to disclose such information to any third party without the prior written consent of the Disclosing Party.
                </p>
                <p>
                  <span className="clause-number">3.2</span>
                  The Receiving Party shall use the Confidential Information solely for the purpose stated in Section 1 and shall not use such information for any other purpose.
                </p>
                <p>
                  <span className="clause-number">3.3</span>
                  The Receiving Party shall take reasonable precautions to protect the confidentiality of the Confidential Information, using the same degree of care that it uses to protect its own confidential information, but in no event less than reasonable care.
                </p>
              </NDASection>

              <NDASection>
                <h3>
                  <FaClock className="icon" />
                  4. TERM AND TERMINATION
                </h3>
                <p>
                  <span className="clause-number">4.1</span>
                  This Agreement shall remain in effect for a period of {ndaData.duration} from the Effective Date, unless terminated earlier by mutual agreement of the parties.
                </p>
                <p>
                  <span className="clause-number">4.2</span>
                  Upon termination of this Agreement, the Receiving Party shall promptly return or destroy all documents, materials, and other tangible manifestations of Confidential Information.
                </p>
              </NDASection>

              <NDASection>
                <h3>
                  <FaGavel className="icon" />
                  5. GENERAL PROVISIONS
                </h3>
                <p>
                  <span className="clause-number">5.1</span>
                  This Agreement shall be governed by and construed in accordance with the laws of {ndaData.jurisdiction}.
                </p>
                <p>
                  <span className="clause-number">5.2</span>
                  Any violation of this Agreement may cause irreparable harm to the Disclosing Party, and monetary damages may be inadequate to compensate for such breach. Therefore, the Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance.
                </p>
                <p>
                  <span className="clause-number">5.3</span>
                  This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings.
                </p>
              </NDASection>

              {ndaData.customClauses && (
                <NDASection>
                  <h3>
                    <FaFileSignature className="icon" />
                    6. ADDITIONAL TERMS
                  </h3>
                  <p>{ndaData.customClauses}</p>
                </NDASection>
              )}

              <WarningBox>
                <FaExclamationTriangle className="icon" />
                <div className="content">
                  <h4>IMPORTANT LEGAL NOTICE</h4>
                  <p>
                    This document constitutes a legally binding agreement. Please review all terms carefully before signing. 
                    We recommend consulting with legal counsel to ensure this agreement meets your specific needs and complies with applicable laws.
                  </p>
                </div>
              </WarningBox>

              <SignatureSection>
                <div className="signature-block">
                  <div className="signature-line"></div>
                  <div className="signature-label">DISCLOSING PARTY</div>
                  <div className="signature-name">{ndaData.disclosingPartyName}</div>
                  <div className="signature-title">Authorized Representative</div>
                  <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Date: {ndaData.agreementDate}
                  </div>
                </div>
                <div className="signature-block">
                  <div className="signature-line"></div>
                  <div className="signature-label">RECEIVING PARTY</div>
                  <div className="signature-name">{ndaData.receivingPartyName || '[Receiving Party Name]'}</div>
                  <div className="signature-title">Signature</div>
                  <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Date: ______________
                  </div>
                </div>
              </SignatureSection>

              <div style={{ 
                marginTop: '2rem', 
                textAlign: 'center', 
                color: 'rgba(255, 255, 255, 0.5)', 
                fontSize: '0.8rem' 
              }}>
                <p style={{ margin: 0 }}>Generated on: {new Date().toLocaleDateString()}</p>
                <p style={{ margin: '0.25rem 0 0 0' }}>This is a computer-generated legal document.</p>
              </div>
            </NDAPreview>
          </PreviewSection>
        </CreatorContainer>
      </CreatorOverlay>
    </>
  );
};

export default NDAGenerator;