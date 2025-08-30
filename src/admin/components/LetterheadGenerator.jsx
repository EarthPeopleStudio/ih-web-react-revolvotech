import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaDownload, FaPrint, FaBuilding, FaEnvelope, FaPhone, FaGlobe,
  FaTimes, FaMoon, FaSun, FaEraser, FaQrcode, FaPaperPlane,
  FaLinkedin
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from 'qrcode';
import RevolvoLogo from "../../assets/revolvo-logo.png";
import RevolvoLogoDark from "../../assets/revolvo-logo-dark.png";

// Matching invoice creator structure exactly
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

// Top buttons positioned exactly like invoice creator
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

  &:active {
    transform: scale(0.95);
  }
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
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: rgba(251, 182, 4, 0.5);
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 3px rgba(251, 182, 4, 0.1);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
    line-height: 1.5;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Action buttons matching invoice creator exactly
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
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
  }
`;

const LetterheadPreview = styled.div`
  width: 900px;
  max-width: 100%;
  background: ${props => props.$isDarkTheme ? '#0a0a0a' : '#ffffff'};
  color: ${props => props.$isDarkTheme ? 'white' : '#333333'};
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  min-height: 600px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  box-sizing: border-box;
  position: relative;
  transition: all 0.3s ease;
  
  .letterhead-header {
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

    .letterhead-details {
      text-align: right;
      margin-top: 0.5rem;
      
      .letterhead-title {
        font-size: 3rem;
        font-weight: 900;
        color: #fbb604;
        margin-bottom: 0.75rem;
        letter-spacing: 3px;
        text-shadow: 0 0 20px rgba(251, 182, 4, 0.3);
        line-height: 1;
      }
      
      .letterhead-meta {
        .reference-number {
          font-size: 1.3rem;
          color: #fbb604;
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(251, 182, 4, 0.3);
          letter-spacing: 0.5px;
        }
        .letterhead-date {
          font-size: 0.95rem;
          color: ${props => props.$isDarkTheme ? '#bbb' : '#444'};
          line-height: 1.6;
        }
      }
    }
  }
  
  .letterhead-body {
    .content-section {
      margin-bottom: 3rem;
      
      .greeting {
        margin-bottom: 1.5rem;
        color: ${props => props.$isDarkTheme ? 'white' : '#333'};
        font-weight: 600;
        font-size: 1.05rem;
      }
      
      .main-content {
        line-height: 1.8;
        color: ${props => props.$isDarkTheme ? '#ccc' : '#555'};
        margin-bottom: 2rem;
        text-align: justify;
        font-size: 1rem;
      }
      
      .closing {
        margin-bottom: 1rem;
        color: ${props => props.$isDarkTheme ? 'white' : '#333'};
        font-weight: 500;
      }
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
  
  .letterhead-footer {
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
          font-size: 0.9rem;
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

const LetterheadGenerator = ({ onClose }) => {
  // Deterministic reference number generator
  const generateReferenceNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    
    // Create a simple hash based on current timestamp for uniqueness within the day
    const timestamp = now.getTime();
    const hash = timestamp % 1000; // Get last 3 digits for uniqueness
    const sequence = hash.toString().padStart(3, '0');
    
    // Format: LTR-YYYY-MMDD-XXX (e.g., LTR-2024-0830-123)
    return `LTR-${year}-${month}${day}-${sequence}`;
  };

  // Get document type information
  const getDocumentTypeInfo = (type) => {
    const types = {
      'business-letter': { title: 'OFFICIAL', description: 'Official Business Letter' },
      'employment-verification': { title: 'EMPLOYMENT', description: 'Employment Verification Letter' },
      'leave-request': { title: 'LEAVE REQUEST', description: 'Leave of Absence Request' },
      'memo': { title: 'MEMORANDUM', description: 'Internal Memorandum' },
      'notice': { title: 'NOTICE', description: 'Official Company Notice' },
      'confidential': { title: 'CONFIDENTIAL', description: 'Confidential Document' }
    };
    return types[type] || types['business-letter'];
  };

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const previewRef = useRef();
  
  const [letterData, setLetterData] = useState(() => {
    const saved = sessionStorage.getItem('letterheadData');
    return saved ? JSON.parse(saved) : {
      companyName: "Revolvo Tech",
      tagline: "Innovation in Motion",
      address: "Väinämöisenkatu 11, 33540 Tampere, Finland",
      phone: "+358 40 123 4567",
      email: "contact@revolvo.tech",
      website: "www.revolvo.tech",
      documentType: "business-letter",
      referenceNumber: generateReferenceNumber(),
      date: new Date().toLocaleDateString(),
      recipientTitle: "To Whom It May Concern",
      recipientName: "",
      recipientAddress: "",
      subject: "Official Business Correspondence",
      greeting: "Dear Sir/Madam,",
      content: "This letter serves as an official communication from our organization. Please find the necessary details and information contained within this document.\n\nWe trust this correspondence finds you in good health and high spirits. Should you require any clarification or additional information, please do not hesitate to contact our office using the details provided above.\n\nWe look forward to your prompt response and continued business relationship.",
      closing: "Thank you for your time and consideration.",
      signatoryName: "John Doe",
      signatoryTitle: "Chief Executive Officer",
      footerText: "This is an official document generated by Revolvo Tech. Please retain this letter for your records."
    };
  });

  // Save to session storage whenever data changes
  useEffect(() => {
    sessionStorage.setItem('letterheadData', JSON.stringify(letterData));
  }, [letterData]);
  
  // Generate QR code for revolvo.tech
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL('https://revolvo.tech', {
          width: 120,
          margin: 1,
          color: {
            dark: isDarkTheme ? '#fbb604' : '#333333',
            light: isDarkTheme ? '#0a0a0a' : '#ffffff'
          }
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [isDarkTheme]);
  
  // Clear session storage when component unmounts
  useEffect(() => {
    return () => {
      const handleBeforeUnload = () => {
        sessionStorage.removeItem('letterheadData');
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  const clearForm = () => {
    setLetterData({
      companyName: "Revolvo Tech",
      tagline: "Innovation in Motion",
      address: "Väinämöisenkatu 11, 33540 Tampere, Finland",
      phone: "+358 40 123 4567",
      email: "contact@revolvo.tech",
      website: "www.revolvo.tech",
      documentType: "business-letter",
      referenceNumber: generateReferenceNumber(),
      date: new Date().toLocaleDateString(),
      recipientTitle: "To Whom It May Concern",
      recipientName: "",
      recipientAddress: "",
      subject: "Official Business Correspondence",
      greeting: "Dear Sir/Madam,",
      content: "This letter serves as an official communication from our organization.",
      closing: "Thank you for your time and consideration.",
      signatoryName: "John Doe",
      signatoryTitle: "Chief Executive Officer",
      footerText: "This is an official document generated by Revolvo Tech. Please retain this letter for your records."
    });
  };
  
  const updateLetterData = (field, value) => {
    setLetterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const downloadPrintPDF = async () => {
    if (!previewRef.current) return;
    setIsGeneratingPDF(true);

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: previewRef.current.scrollWidth,
        height: previewRef.current.scrollHeight
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      
      if (imgHeight > 295) {
        let yPosition = 0;
        const pageHeight = 295;
        
        while (yPosition < imgHeight) {
          pdf.addImage(
            canvas.toDataURL('image/png'), 
            'PNG', 
            0, 
            -yPosition, 
            imgWidth, 
            imgHeight
          );
          yPosition += pageHeight;
          
          if (yPosition < imgHeight) {
            pdf.addPage();
          }
        }
      } else {
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      }

      const fileName = `${letterData.companyName}_Letterhead_${letterData.referenceNumber.replace(/\//g, '_')}_Print.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating print PDF:', error);
      alert('Error generating PDF for printing. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  const downloadViewingPDF = async () => {
    if (!previewRef.current) return;
    setIsGeneratingPDF(true);

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const totalHeight = Math.max(imgHeight, 297);

      const pdf = new jsPDF('p', 'mm', [210, totalHeight]);
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

      const fileName = `${letterData.companyName}_Letterhead_${letterData.referenceNumber.replace(/\//g, '_')}_View.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating viewing PDF:', error);
      alert('Error generating PDF for viewing. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    if (previewRef.current) {
      const printContent = previewRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Letterhead</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <CreatorOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CreatorContainer
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Form Section */}
        <FormSection>
          <Header>
            <h2>
              <FaBuilding className="icon" />
              Letterhead Generator
            </h2>
          </Header>
          
          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Document Type
            </label>
            <select
              value={letterData.documentType}
              onChange={(e) => updateLetterData('documentType', e.target.value)}
            >
              <option value="business-letter">Official Business Letter</option>
              <option value="employment-verification">Employment Verification</option>
              <option value="leave-request">Leave of Absence Request</option>
              <option value="memo">Internal Memorandum</option>
              <option value="notice">Official Company Notice</option>
              <option value="confidential">Confidential Document</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Company Name
            </label>
            <input
              type="text"
              value={letterData.companyName}
              onChange={(e) => updateLetterData('companyName', e.target.value)}
              placeholder="Your Company Name"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Company Tagline
            </label>
            <input
              type="text"
              value={letterData.tagline}
              onChange={(e) => updateLetterData('tagline', e.target.value)}
              placeholder="Company motto or tagline"
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Company Address
            </label>
            <textarea
              value={letterData.address}
              onChange={(e) => updateLetterData('address', e.target.value)}
              placeholder="Full company address"
              rows={3}
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <label>
                <FaPhone className="icon" />
                Phone Number
              </label>
              <input
                type="text"
                value={letterData.phone}
                onChange={(e) => updateLetterData('phone', e.target.value)}
                placeholder="+358 40 123 4567"
              />
            </FormGroup>
            <FormGroup>
              <label>
                <FaEnvelope className="icon" />
                Email Address
              </label>
              <input
                type="email"
                value={letterData.email}
                onChange={(e) => updateLetterData('email', e.target.value)}
                placeholder="contact@company.com"
              />
            </FormGroup>
          </FormRow>


          <FormGroup>
            <label>
              <FaBuilding className="icon" />
              Reference Number
            </label>
            <input
              type="text"
              value={letterData.referenceNumber}
              onChange={(e) => updateLetterData('referenceNumber', e.target.value)}
              placeholder="LTR-2024-0830-123"
            />
          </FormGroup>

          <FormGroup>
            <label>Recipient</label>
            <input
              type="text"
              value={letterData.recipientTitle}
              onChange={(e) => updateLetterData('recipientTitle', e.target.value)}
              placeholder="To Whom It May Concern"
            />
          </FormGroup>

          <FormGroup>
            <label>Recipient Address (Optional)</label>
            <textarea
              value={letterData.recipientAddress}
              onChange={(e) => updateLetterData('recipientAddress', e.target.value)}
              placeholder="Recipient's full address"
              rows={3}
            />
          </FormGroup>

          <FormGroup>
            <label>Subject</label>
            <input
              type="text"
              value={letterData.subject}
              onChange={(e) => updateLetterData('subject', e.target.value)}
              placeholder="Letter subject"
            />
          </FormGroup>

          <FormGroup>
            <label>Greeting</label>
            <input
              type="text"
              value={letterData.greeting}
              onChange={(e) => updateLetterData('greeting', e.target.value)}
              placeholder="Dear Sir/Madam,"
            />
          </FormGroup>

          <FormGroup>
            <label>Letter Content</label>
            <textarea
              value={letterData.content}
              onChange={(e) => updateLetterData('content', e.target.value)}
              placeholder="Main letter content..."
              rows={8}
            />
          </FormGroup>

          <FormGroup>
            <label>Closing</label>
            <input
              type="text"
              value={letterData.closing}
              onChange={(e) => updateLetterData('closing', e.target.value)}
              placeholder="Thank you for your time and consideration."
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <label>Signatory Name</label>
              <input
                type="text"
                value={letterData.signatoryName}
                onChange={(e) => updateLetterData('signatoryName', e.target.value)}
                placeholder="John Doe"
              />
            </FormGroup>
            <FormGroup>
              <label>Signatory Title</label>
              <input
                type="text"
                value={letterData.signatoryTitle}
                onChange={(e) => updateLetterData('signatoryTitle', e.target.value)}
                placeholder="Chief Executive Officer"
              />
            </FormGroup>
          </FormRow>
          
          <ActionButtons>
            <button className="secondary" onClick={handlePrint} disabled={isGeneratingPDF}>
              <FaPrint />
              Print
            </button>
            <button className="primary" onClick={downloadPrintPDF} disabled={isGeneratingPDF}>
              <FaPrint />
              {isGeneratingPDF ? 'Generating...' : 'Download for Printing'}
            </button>
            <button className="primary" onClick={downloadViewingPDF} disabled={isGeneratingPDF}>
              <FaDownload />
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
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
          
          <LetterheadPreview ref={previewRef} $isDarkTheme={isDarkTheme}>
            <div className="letterhead-header">
              <div className="company-section">
                <div className="logo">
                  <img src={isDarkTheme ? RevolvoLogo : RevolvoLogoDark} alt="Company Logo" />
                </div>
                <div className="company-details">
                  <div className="company-name">{letterData.companyName}</div>
                  <div className="tagline">{letterData.tagline}</div>
                  <div className="company-address">
                    {letterData.address}
                  </div>
                </div>
              </div>
              <div className="letterhead-details">
                <div className="letterhead-title">{getDocumentTypeInfo(letterData.documentType).title}</div>
                <div className="letterhead-meta">
                  <div className="reference-number">#{letterData.referenceNumber}</div>
                  <div className="letterhead-date">
                    <div>Date: {letterData.date}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '2.5rem',
              marginBottom: '3rem',
              padding: '2rem',
              background: isDarkTheme 
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)' 
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(251, 182, 4, 0.1)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #fbb604 0%, #f99b04 100%)',
                borderRadius: '12px 12px 0 0'
              }}></div>
              
              <div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#fbb604',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  letterSpacing: '1px',
                  position: 'relative'
                }}>To</div>
                <div style={{ color: isDarkTheme ? '#fff' : '#333' }}>
                  <div style={{
                    fontWeight: '800',
                    marginBottom: '0.5rem',
                    fontSize: '1.05rem',
                    color: isDarkTheme ? 'white' : '#333'
                  }}>
                    {letterData.recipientTitle || 'Recipient Name'}
                  </div>
                  <div style={{
                    color: isDarkTheme ? '#ccc' : '#444',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    {letterData.recipientAddress && <div>{letterData.recipientAddress}</div>}
                  </div>
                </div>
              </div>
              
              <div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#fbb604',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  letterSpacing: '1px',
                  position: 'relative'
                }}>Subject</div>
                <div style={{ color: isDarkTheme ? '#fff' : '#333' }}>
                  <div style={{
                    fontWeight: '800',
                    marginBottom: '0.5rem',
                    fontSize: '1.05rem',
                    color: isDarkTheme ? 'white' : '#333'
                  }}>{letterData.subject || 'Letter Subject'}</div>
                  <div style={{
                    color: isDarkTheme ? '#ccc' : '#444',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}>
                    Official business correspondence
                  </div>
                </div>
              </div>
              
              <div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#fbb604',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  letterSpacing: '1px',
                  position: 'relative'
                }}>Document Info</div>
                <div style={{ color: isDarkTheme ? '#fff' : '#333' }}>
                  <div style={{
                    color: isDarkTheme ? '#ccc' : '#444',
                    fontSize: '0.9rem',
                    lineHeight: '1.6'
                  }}>
                    Ref: {letterData.referenceNumber}<br />
                    Date: {letterData.date}<br />
                    {getDocumentTypeInfo(letterData.documentType).description}
                  </div>
                </div>
              </div>
            </div>

            <div className="letterhead-body">

              <div className="content-section">
                <div className="greeting">{letterData.greeting}</div>
                <div className="main-content">
                  {letterData.content.split('\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                  ))}
                </div>
                <div className="closing">{letterData.closing}</div>
              </div>

              <div className="signature-section">
                <div className="signature-space"></div>
                <div className="signatory-name">{letterData.signatoryName}</div>
                <div className="signatory-title">{letterData.signatoryTitle}</div>
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}></div>

            <div className="letterhead-footer">
              <div className="contact-grid">
                <div className="contact-item">
                  <FaEnvelope />
                  <span className="contact-text">{letterData.email}</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <span className="contact-text">{letterData.phone}</span>
                </div>
                <div className="contact-item">
                  <FaGlobe />
                  <span className="contact-text">{letterData.website}</span>
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
          </LetterheadPreview>
        </PreviewSection>
      </CreatorContainer>
    </CreatorOverlay>
  );
};

export default LetterheadGenerator;