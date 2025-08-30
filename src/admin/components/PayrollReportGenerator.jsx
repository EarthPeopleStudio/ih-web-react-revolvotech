import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaDownload, FaPrint, FaEye, FaPlus, FaTrash,
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt,
  FaClock, FaDollarSign, FaGlobe, FaPaperPlane, FaEraser,
  FaSun, FaMoon, FaLinkedin, FaQrcode, FaBriefcase, FaIdCard,
  FaMapMarkerAlt, FaFileSignature, FaCalculator, FaMoneyBillWave,
  FaUsers, FaChartLine, FaFileAlt
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

    /* Only show the payroll report */
    .printable-report {
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
      
      .report-header {
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

const EmployeeGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
`;

const EmployeeSection = styled.div`
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

const AddEmployeeBtn = styled.button`
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

const ReportPreview = styled.div`
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

  .report-header {
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

    .report-title {
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

  .report-content {
    padding: 2rem;
    
    .report-summary {
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
      
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        
        .summary-item {
          text-align: center;
          
          .label {
            font-size: 0.75rem;
            color: #fbb604;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
          }
          
          .value {
            font-size: 1.5rem;
            font-weight: 800;
            color: ${props => props.$isDarkTheme ? 'white' : '#333'};
          }
        }
      }
    }
    
    .employees-table {
      background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(251, 182, 4, 0.1);
      margin-bottom: 2rem;
      
      table {
        width: 100%;
        border-collapse: collapse;
        
        th {
          background: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.1)' : 'rgba(251, 182, 4, 0.15)'};
          color: #fbb604;
          padding: 1rem 0.75rem;
          text-align: left;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid rgba(251, 182, 4, 0.3);
        }
        
        td {
          padding: 0.875rem 0.75rem;
          font-size: 0.85rem;
          color: ${props => props.$isDarkTheme ? '#ddd' : '#555'};
          border-bottom: 1px solid rgba(251, 182, 4, 0.1);
        }
        
        tbody tr {
          &:nth-child(even) {
            background: ${props => props.$isDarkTheme ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
          }
          
          &:hover {
            background: ${props => props.$isDarkTheme ? 'rgba(251, 182, 4, 0.1)' : 'rgba(251, 182, 4, 0.05)'} !important;
          }
        }
        
        .amount {
          font-weight: 600;
          color: ${props => props.$isDarkTheme ? 'white' : '#333'};
          text-align: right;
        }
      }
    }
  }

  .report-footer {
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

const PayrollReportGenerator = ({ onClose }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const previewRef = useRef(null);

  // Initialize form data with session storage
  const [reportData, setReportData] = useState(() => {
    const savedData = sessionStorage.getItem('payrollReportData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved payroll report data:', error);
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
      
      // Report Details
      referenceNumber: `PAY${Date.now().toString().slice(-6)}`,
      reportPeriod: new Date().toISOString().slice(0, 7), // YYYY-MM format
      reportDate: new Date().toISOString().split('T')[0],
      
      // Employees
      employees: [
        {
          id: Date.now() + 1,
          name: 'John Doe',
          employeeId: 'EMP001',
          position: 'Software Engineer',
          basicSalary: 50000,
          allowances: 15000,
          deductions: 8000,
          netPay: 57000
        },
        {
          id: Date.now() + 2,
          name: 'Jane Smith',
          employeeId: 'EMP002',
          position: 'Product Manager',
          basicSalary: 60000,
          allowances: 18000,
          deductions: 10000,
          netPay: 68000
        }
      ]
    };
  });

  // Save to sessionStorage whenever data changes
  useEffect(() => {
    try {
      sessionStorage.setItem('payrollReportData', JSON.stringify(reportData));
    } catch (error) {
      console.error('Error saving payroll report data:', error);
    }
  }, [reportData]);

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
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const addEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      name: '',
      employeeId: '',
      position: '',
      basicSalary: 0,
      allowances: 0,
      deductions: 0,
      netPay: 0
    };
    setReportData(prev => ({
      ...prev,
      employees: [...prev.employees, newEmployee]
    }));
  };

  const updateEmployee = (id, field, value) => {
    setReportData(prev => ({
      ...prev,
      employees: prev.employees.map(employee => {
        if (employee.id === id) {
          const updatedEmployee = { ...employee, [field]: field.includes('Salary') || field.includes('allowances') || field.includes('deductions') ? Number(value) || 0 : value };
          
          // Auto-calculate net pay
          if (field === 'basicSalary' || field === 'allowances' || field === 'deductions') {
            updatedEmployee.netPay = (updatedEmployee.basicSalary || 0) + (updatedEmployee.allowances || 0) - (updatedEmployee.deductions || 0);
          }
          
          return updatedEmployee;
        }
        return employee;
      })
    }));
  };

  const removeEmployee = (id) => {
    setReportData(prev => ({
      ...prev,
      employees: prev.employees.filter(employee => employee.id !== id)
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const calculateTotals = () => {
    const totalBasic = reportData.employees.reduce((sum, emp) => sum + (emp.basicSalary || 0), 0);
    const totalAllowances = reportData.employees.reduce((sum, emp) => sum + (emp.allowances || 0), 0);
    const totalDeductions = reportData.employees.reduce((sum, emp) => sum + (emp.deductions || 0), 0);
    const totalNetPay = reportData.employees.reduce((sum, emp) => sum + (emp.netPay || 0), 0);
    
    return { totalBasic, totalAllowances, totalDeductions, totalNetPay };
  };

  const clearForm = () => {
    sessionStorage.removeItem('payrollReportData');
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
      pdf.save(`payroll-report-${reportData.referenceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const printReport = () => {
    window.print();
  };

  const { totalBasic, totalAllowances, totalDeductions, totalNetPay } = calculateTotals();

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
              <FaUsers />
              Payroll Report Generator
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
                value={reportData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Revolvo Tech"
              />
            </FormGroup>

            <FormGroup>
              <label>Tagline</label>
              <input
                type="text"
                value={reportData.tagline}
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
                value={reportData.address}
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
                value={reportData.phone}
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
                value={reportData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="job@revolvo.tech"
              />
            </FormGroup>

            {/* Report Information */}
            <SectionTitle>
              <FaFileAlt className="icon" />
              Report Information
            </SectionTitle>

            <FormGroup>
              <label>
                <FaCalendarAlt className="icon" />
                Report Period
              </label>
              <input
                type="month"
                value={reportData.reportPeriod}
                onChange={(e) => updateField('reportPeriod', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>
                <FaCalendarAlt className="icon" />
                Report Date
              </label>
              <input
                type="date"
                value={reportData.reportDate}
                onChange={(e) => updateField('reportDate', e.target.value)}
              />
            </FormGroup>

            {/* Employees Section */}
            <SectionTitle>
              <FaUsers className="icon" />
              Employees
            </SectionTitle>

            {reportData.employees.map((employee) => (
              <EmployeeSection key={employee.id}>
                <FormGroup>
                  <label>Employee Name</label>
                  <input
                    type="text"
                    value={employee.name}
                    onChange={(e) => updateEmployee(employee.id, 'name', e.target.value)}
                    placeholder="John Doe"
                  />
                </FormGroup>
                
                <EmployeeGrid>
                  <FormGroup>
                    <label>Employee ID</label>
                    <input
                      type="text"
                      value={employee.employeeId}
                      onChange={(e) => updateEmployee(employee.id, 'employeeId', e.target.value)}
                      placeholder="EMP001"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Position</label>
                    <input
                      type="text"
                      value={employee.position}
                      onChange={(e) => updateEmployee(employee.id, 'position', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </FormGroup>
                  <div></div>
                  <button
                    className="remove-btn"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    <FaTrash />
                  </button>
                </EmployeeGrid>

                <EmployeeGrid>
                  <FormGroup>
                    <label>Basic Salary (EUR)</label>
                    <input
                      type="number"
                      value={employee.basicSalary}
                      onChange={(e) => updateEmployee(employee.id, 'basicSalary', e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Allowances (EUR)</label>
                    <input
                      type="number"
                      value={employee.allowances}
                      onChange={(e) => updateEmployee(employee.id, 'allowances', e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Deductions (EUR)</label>
                    <input
                      type="number"
                      value={employee.deductions}
                      onChange={(e) => updateEmployee(employee.id, 'deductions', e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                  <div></div>
                </EmployeeGrid>
                
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(251, 182, 4, 0.1)', borderRadius: '8px', marginTop: '1rem' }}>
                  <span style={{ color: '#fbb604', fontWeight: '600', fontSize: '0.9rem' }}>
                    Net Pay: {formatCurrency(employee.netPay || 0)}
                  </span>
                </div>
              </EmployeeSection>
            ))}

            <AddEmployeeBtn onClick={addEmployee}>
              <FaPlus />
              Add Employee
            </AddEmployeeBtn>

            {/* Action Buttons */}
            <ActionButtons>
              <button className="secondary" onClick={printReport}>
                <FaPrint />
                Print Report
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
            
            <ReportPreview ref={previewRef} className="printable-report" $isDarkTheme={isDarkTheme}>
              <div className="report-header">
                <div className="company-section">
                  <div className="logo">
                    <img src={isDarkTheme ? RevolvoLogo : RevolvoLogoDark} alt="Company Logo" />
                  </div>
                  <div className="company-details">
                    <div className="company-name">{reportData.companyName || 'REVOLVO TECH'}</div>
                    <div className="tagline">{reportData.tagline || 'Innovation in Motion'}</div>
                  </div>
                </div>
                
                <div className="report-title">
                  <div className="title">Payroll Report</div>
                  <div className="reference">#{reportData.referenceNumber}</div>
                </div>
              </div>

              <div className="report-content">
                {/* Report Summary */}
                <div className="report-summary">
                  <div className="summary-grid">
                    <div className="summary-item">
                      <div className="label">Report Period</div>
                      <div className="value">{reportData.reportPeriod ? new Date(reportData.reportPeriod + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '[Period]'}</div>
                    </div>
                    <div className="summary-item">
                      <div className="label">Total Employees</div>
                      <div className="value">{reportData.employees.length}</div>
                    </div>
                    <div className="summary-item">
                      <div className="label">Total Basic Salary</div>
                      <div className="value">{formatCurrency(totalBasic)}</div>
                    </div>
                    <div className="summary-item">
                      <div className="label">Total Net Payroll</div>
                      <div className="value">{formatCurrency(totalNetPay)}</div>
                    </div>
                  </div>
                </div>

                {/* Employees Table */}
                <div className="employees-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>ID</th>
                        <th>Position</th>
                        <th>Basic Salary</th>
                        <th>Allowances</th>
                        <th>Deductions</th>
                        <th>Net Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.employees.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.name || '[Name]'}</td>
                          <td>{employee.employeeId || '[ID]'}</td>
                          <td>{employee.position || '[Position]'}</td>
                          <td className="amount">{formatCurrency(employee.basicSalary || 0)}</td>
                          <td className="amount">{formatCurrency(employee.allowances || 0)}</td>
                          <td className="amount">{formatCurrency(employee.deductions || 0)}</td>
                          <td className="amount">{formatCurrency(employee.netPay || 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="report-footer">
                <div className="contact-grid">
                  <div className="contact-item">
                    <FaEnvelope />
                    <span className="contact-text">{reportData.email}</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone />
                    <span className="contact-text">{reportData.phone}</span>
                  </div>
                  <div className="contact-item">
                    <FaGlobe />
                    <span className="contact-text">{reportData.website}</span>
                  </div>
                  <div className="contact-item">
                    <FaLinkedin />
                    <span className="contact-text">/company/revolvotech</span>
                  </div>
                </div>
              </div>
            </ReportPreview>
          </PreviewSection>
        </CreatorContainer>
      </CreatorOverlay>
    </PrintStyles>
  );
};

export default PayrollReportGenerator;