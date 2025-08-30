import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaDownload, FaPrint, FaEye, FaPlus, FaTrash,
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt,
  FaClock, FaDollarSign, FaGlobe, FaPaperPlane, FaEraser,
  FaSun, FaMoon, FaLinkedin, FaQrcode, FaBriefcase, FaIdCard,
  FaMapMarkerAlt, FaFileSignature, FaCalculator, FaMoneyBillWave,
  FaPercent, FaReceipt, FaFileInvoiceDollar
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

    /* Only show the WHT certificate */
    .printable-certificate {
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
      
      .certificate-header {
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
`;

const CalculationPanel = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 2rem;
  
  .calc-header {
    color: #fbb604;
    font-weight: 700;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  }
  
  .calc-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    
    .label {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .value {
      font-weight: 600;
      color: white;
    }
  }
  
  .calc-total {
    border-top: 2px solid #fbb604;
    padding-top: 0.75rem;
    margin-top: 0.75rem;
    font-weight: 700;
    font-size: 1rem;
    
    .label {
      color: #fbb604 !important;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .value {
      color: #fbb604 !important;
      font-size: 1.2rem;
    }
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

const CertificatePreview = styled.div`
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

  .certificate-header {
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

    .certificate-title {
      position: absolute;
      top: 2rem;
      right: 2rem;
      text-align: right;
      
      .title {
        font-size: 1.3rem;
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

  .certificate-content {
    padding: 2rem;
    
    .payee-section {
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
      
      .section-title {
        color: #fbb604;
        font-weight: 700;
        margin-bottom: 1rem;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .payee-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
            font-size: 0.95rem;
            color: ${props => props.$isDarkTheme ? 'white' : '#333'};
            font-weight: 500;
          }
        }
      }
    }
    
    .calculation-section {
      background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
      border-radius: 12px;
      border: 1px solid rgba(251, 182, 4, 0.1);
      padding: 2rem;
      margin-bottom: 2rem;
      
      .calc-title {
        color: #fbb604;
        font-weight: 700;
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        text-align: center;
        padding-bottom: 1rem;
        border-bottom: 2px solid rgba(251, 182, 4, 0.2);
      }
      
      .calc-breakdown {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        margin-bottom: 2rem;
        
        .calc-column {
          .column-title {
            color: #fbb604;
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .calc-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
            font-size: 0.9rem;
            
            .item-label {
              color: ${props => props.$isDarkTheme ? '#ccc' : '#555'};
            }
            
            .item-value {
              font-weight: 600;
              color: ${props => props.$isDarkTheme ? 'white' : '#333'};
            }
          }
        }
      }
      
      .wht-summary {
        background: linear-gradient(135deg, rgba(251, 182, 4, 0.1) 0%, rgba(249, 168, 37, 0.1) 100%);
        padding: 1.5rem;
        border-radius: 8px;
        text-align: center;
        
        .summary-label {
          font-size: 0.85rem;
          color: #fbb604;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }
        
        .summary-amount {
          font-size: 2rem;
          font-weight: 800;
          color: #fbb604;
          margin-bottom: 0.25rem;
        }
        
        .summary-rate {
          font-size: 0.9rem;
          color: ${props => props.$isDarkTheme ? '#aaa' : '#666'};
        }
      }
    }
    
    .certificate-statement {
      background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #fbb604;
      margin-bottom: 2rem;
      font-style: italic;
      line-height: 1.6;
      color: ${props => props.$isDarkTheme ? '#ddd' : '#555'};
    }
  }

  .certificate-footer {
    background: ${props => props.$isDarkTheme ? '#0f0f0f' : '#f8f9fa'};
    padding: 1.5rem 2rem;
    border-top: 1px solid rgba(251, 182, 4, 0.2);
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      
      .contact-info {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
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
      
      .signature-section {
        text-align: right;
        
        .signature-line {
          border-bottom: 2px solid #fbb604;
          width: 200px;
          margin: 2rem 0 0.5rem 0;
          margin-left: auto;
        }
        
        .signature-label {
          font-size: 0.75rem;
          color: #fbb604;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }
  }
`;

const WHTCalculatorGenerator = ({ onClose }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const previewRef = useRef(null);

  // Initialize form data with session storage
  const [whtData, setWhtData] = useState(() => {
    const savedData = sessionStorage.getItem('whtCalculatorData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved WHT calculator data:', error);
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
      
      // Certificate Details
      referenceNumber: `WHT${Date.now().toString().slice(-6)}`,
      certificateDate: new Date().toISOString().split('T')[0],
      taxYear: new Date().getFullYear(),
      
      // Payee Information
      payeeName: "",
      payeeAddress: "",
      payeeId: "",
      payeeType: "individual", // individual, company
      
      // Payment Details
      serviceDescription: "",
      grossAmount: 0,
      whtRate: 10, // Default 10% WHT rate
      currency: "EUR"
    };
  });

  // Save to sessionStorage whenever data changes
  useEffect(() => {
    try {
      sessionStorage.setItem('whtCalculatorData', JSON.stringify(whtData));
    } catch (error) {
      console.error('Error saving WHT calculator data:', error);
    }
  }, [whtData]);

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
    setWhtData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: whtData.currency
    }).format(amount);
  };

  const calculateWHT = () => {
    const grossAmount = parseFloat(whtData.grossAmount) || 0;
    const whtRate = parseFloat(whtData.whtRate) || 0;
    
    const whtAmount = (grossAmount * whtRate) / 100;
    const netAmount = grossAmount - whtAmount;
    
    return {
      grossAmount,
      whtRate,
      whtAmount,
      netAmount
    };
  };

  const clearForm = () => {
    sessionStorage.removeItem('whtCalculatorData');
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
      pdf.save(`wht-certificate-${whtData.referenceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const printCertificate = () => {
    window.print();
  };

  const { grossAmount, whtRate, whtAmount, netAmount } = calculateWHT();

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
              <FaPercent />
              WHT Calculator & Certificate
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
                value={whtData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Revolvo Tech"
              />
            </FormGroup>

            <FormGroup>
              <label>Tagline</label>
              <input
                type="text"
                value={whtData.tagline}
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
                value={whtData.address}
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
                value={whtData.phone}
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
                value={whtData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="job@revolvo.tech"
              />
            </FormGroup>

            {/* Certificate Information */}
            <SectionTitle>
              <FaReceipt className="icon" />
              Certificate Information
            </SectionTitle>

            <FormGroup>
              <label>
                <FaCalendarAlt className="icon" />
                Certificate Date
              </label>
              <input
                type="date"
                value={whtData.certificateDate}
                onChange={(e) => updateField('certificateDate', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>Tax Year</label>
              <input
                type="number"
                value={whtData.taxYear}
                onChange={(e) => updateField('taxYear', parseInt(e.target.value))}
                placeholder="2024"
                min="2020"
                max="2030"
              />
            </FormGroup>

            {/* Payee Information */}
            <SectionTitle>
              <FaUser className="icon" />
              Payee Information
            </SectionTitle>

            <FormGroup>
              <label>
                <FaUser className="icon" />
                Payee Name
              </label>
              <input
                type="text"
                value={whtData.payeeName}
                onChange={(e) => updateField('payeeName', e.target.value)}
                placeholder="John Doe"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaMapMarkerAlt className="icon" />
                Payee Address
              </label>
              <textarea
                value={whtData.payeeAddress}
                onChange={(e) => updateField('payeeAddress', e.target.value)}
                placeholder="Payee address"
                rows="2"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaIdCard className="icon" />
                Payee ID/Tax Number
              </label>
              <input
                type="text"
                value={whtData.payeeId}
                onChange={(e) => updateField('payeeId', e.target.value)}
                placeholder="ID or Tax Number"
              />
            </FormGroup>

            <FormGroup>
              <label>Payee Type</label>
              <select
                value={whtData.payeeType}
                onChange={(e) => updateField('payeeType', e.target.value)}
              >
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </select>
            </FormGroup>

            {/* Payment Details */}
            <SectionTitle>
              <FaMoneyBillWave className="icon" />
              Payment Details
            </SectionTitle>

            <FormGroup>
              <label>Service Description</label>
              <textarea
                value={whtData.serviceDescription}
                onChange={(e) => updateField('serviceDescription', e.target.value)}
                placeholder="Description of services provided"
                rows="2"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaDollarSign className="icon" />
                Gross Amount
              </label>
              <input
                type="number"
                value={whtData.grossAmount}
                onChange={(e) => updateField('grossAmount', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaPercent className="icon" />
                WHT Rate (%)
              </label>
              <input
                type="number"
                value={whtData.whtRate}
                onChange={(e) => updateField('whtRate', parseFloat(e.target.value) || 0)}
                placeholder="10"
                min="0"
                max="100"
                step="0.1"
              />
            </FormGroup>

            <FormGroup>
              <label>Currency</label>
              <select
                value={whtData.currency}
                onChange={(e) => updateField('currency', e.target.value)}
              >
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="PKR">PKR - Pakistani Rupee</option>
              </select>
            </FormGroup>

            {/* Live Calculation Panel */}
            <CalculationPanel>
              <div className="calc-header">WHT Calculation</div>
              <div className="calc-row">
                <span className="label">Gross Amount:</span>
                <span className="value">{formatCurrency(grossAmount)}</span>
              </div>
              <div className="calc-row">
                <span className="label">WHT Rate:</span>
                <span className="value">{whtRate}%</span>
              </div>
              <div className="calc-row">
                <span className="label">WHT Amount:</span>
                <span className="value">{formatCurrency(whtAmount)}</span>
              </div>
              <div className="calc-row calc-total">
                <span className="label">Net Amount:</span>
                <span className="value">{formatCurrency(netAmount)}</span>
              </div>
            </CalculationPanel>

            {/* Action Buttons */}
            <ActionButtons>
              <button className="secondary" onClick={printCertificate}>
                <FaPrint />
                Print Certificate
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
            
            <CertificatePreview ref={previewRef} className="printable-certificate" $isDarkTheme={isDarkTheme}>
              <div className="certificate-header">
                <div className="company-section">
                  <div className="logo">
                    <img src={isDarkTheme ? RevolvoLogo : RevolvoLogoDark} alt="Company Logo" />
                  </div>
                  <div className="company-details">
                    <div className="company-name">{whtData.companyName || 'REVOLVO TECH'}</div>
                    <div className="tagline">{whtData.tagline || 'Innovation in Motion'}</div>
                  </div>
                </div>
                
                <div className="certificate-title">
                  <div className="title">WHT Certificate</div>
                  <div className="reference">#{whtData.referenceNumber}</div>
                </div>
              </div>

              <div className="certificate-content">
                {/* Payee Information */}
                <div className="payee-section">
                  <div className="section-title">Payee Information</div>
                  <div className="payee-info">
                    <div className="info-item">
                      <div className="label">Name</div>
                      <div className="value">{whtData.payeeName || '[Payee Name]'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Type</div>
                      <div className="value">{whtData.payeeType === 'individual' ? 'Individual' : 'Company'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">ID/Tax Number</div>
                      <div className="value">{whtData.payeeId || '[ID Number]'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Tax Year</div>
                      <div className="value">{whtData.taxYear}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Address</div>
                      <div className="value">{whtData.payeeAddress || '[Address]'}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Certificate Date</div>
                      <div className="value">{whtData.certificateDate ? new Date(whtData.certificateDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '[Date]'}</div>
                    </div>
                  </div>
                </div>

                {/* Calculation Section */}
                <div className="calculation-section">
                  <div className="calc-title">Withholding Tax Calculation</div>
                  
                  <div className="calc-breakdown">
                    <div className="calc-column">
                      <div className="column-title">Service Details</div>
                      <div className="calc-item">
                        <span className="item-label">Service Description:</span>
                        <span className="item-value">{whtData.serviceDescription || 'Professional Services'}</span>
                      </div>
                      <div className="calc-item">
                        <span className="item-label">Currency:</span>
                        <span className="item-value">{whtData.currency}</span>
                      </div>
                    </div>
                    
                    <div className="calc-column">
                      <div className="column-title">Amount Breakdown</div>
                      <div className="calc-item">
                        <span className="item-label">Gross Amount:</span>
                        <span className="item-value">{formatCurrency(grossAmount)}</span>
                      </div>
                      <div className="calc-item">
                        <span className="item-label">WHT Rate:</span>
                        <span className="item-value">{whtRate}%</span>
                      </div>
                      <div className="calc-item">
                        <span className="item-label">Net Amount:</span>
                        <span className="item-value">{formatCurrency(netAmount)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="wht-summary">
                    <div className="summary-label">Total WHT Deducted</div>
                    <div className="summary-amount">{formatCurrency(whtAmount)}</div>
                    <div className="summary-rate">At {whtRate}% rate</div>
                  </div>
                </div>

                {/* Certificate Statement */}
                <div className="certificate-statement">
                  This is to certify that withholding tax in the amount of <strong>{formatCurrency(whtAmount)}</strong> has been 
                  deducted from the gross payment of <strong>{formatCurrency(grossAmount)}</strong> made to the above-mentioned payee. 
                  The net amount paid after deducting withholding tax is <strong>{formatCurrency(netAmount)}</strong>. This certificate 
                  is issued for tax compliance and filing purposes.
                </div>
              </div>

              {/* Footer */}
              <div className="certificate-footer">
                <div className="footer-content">
                  <div className="contact-info">
                    <div className="contact-item">
                      <FaEnvelope />
                      <span className="contact-text">{whtData.email}</span>
                    </div>
                    <div className="contact-item">
                      <FaPhone />
                      <span className="contact-text">{whtData.phone}</span>
                    </div>
                    <div className="contact-item">
                      <FaGlobe />
                      <span className="contact-text">{whtData.website}</span>
                    </div>
                    <div className="contact-item">
                      <FaLinkedin />
                      <span className="contact-text">/company/revolvotech</span>
                    </div>
                  </div>
                  
                  <div className="signature-section">
                    <div className="signature-line"></div>
                    <div className="signature-label">Authorized Signature</div>
                  </div>
                </div>
              </div>
            </CertificatePreview>
          </PreviewSection>
        </CreatorContainer>
      </CreatorOverlay>
    </PrintStyles>
  );
};

export default WHTCalculatorGenerator;