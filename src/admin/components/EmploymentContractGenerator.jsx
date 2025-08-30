import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaFileContract, FaTimes, FaDownload, FaPrint, FaEnvelope,
  FaUser, FaCalendarAlt, FaDollarSign, FaClock, FaGavel,
  FaBuilding, FaPhone, FaMapMarkerAlt, FaIdCard, FaCheck
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CreatorOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreatorContainer = styled(motion.div)`
  background: #0a0a0a;
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 20px;
  width: 95vw;
  height: 95vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(249, 155, 4, 0.05));
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: between;
  align-items: center;

  h2 {
    color: white;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;

    .icon {
      color: #fbb604;
      font-size: 1.6rem;
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

  &.close {
    background: rgba(220, 38, 127, 0.2);
    border-color: rgba(220, 38, 127, 0.3);
    color: #dc267f;

    &:hover {
      background: rgba(220, 38, 127, 0.3);
      border-color: #dc267f;
      transform: scale(1.05);
    }
  }

  &.download {
    background: rgba(34, 197, 94, 0.2);
    border-color: rgba(34, 197, 94, 0.3);
    color: #22c55e;

    &:hover {
      background: rgba(34, 197, 94, 0.3);
      border-color: #22c55e;
      transform: scale(1.05);
    }
  }

  &.print {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.3);
    color: #6366f1;

    &:hover {
      background: rgba(99, 102, 241, 0.3);
      border-color: #6366f1;
      transform: scale(1.05);
    }
  }

  &.email {
    background: rgba(251, 182, 4, 0.2);
    border-color: rgba(251, 182, 4, 0.3);
    color: #fbb604;

    &:hover {
      background: rgba(251, 182, 4, 0.3);
      border-color: #fbb604;
      transform: scale(1.05);
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  border-right: 1px solid rgba(251, 182, 4, 0.1);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #fbb604, #f99b04);
    border-radius: 4px;
    
    &:hover {
      background: linear-gradient(135deg, #f99b04, #fbb604);
    }
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
  grid-template-columns: ${props => props.columns || 'repeat(auto-fit, minmax(250px, 1fr))'};
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
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;

    &:focus {
      outline: none;
      border-color: #fbb604;
      background: rgba(251, 182, 4, 0.05);
      box-shadow: 0 0 0 3px rgba(251, 182, 4, 0.1);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #fbb604, #f99b04);
      border-radius: 3px;
      
      &:hover {
        background: linear-gradient(135deg, #f99b04, #fbb604);
      }
    }
  }
`;

const PreviewSection = styled.div`
  flex: 1.2;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PreviewContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #fbb604, #f99b04);
    border-radius: 4px;
    
    &:hover {
      background: linear-gradient(135deg, #f99b04, #fbb604);
    }
  }
`;

const ContractDocument = styled.div`
  background: white;
  width: 21cm;
  min-height: 29.7cm;
  margin: 0 auto;
  padding: 2.5cm;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #333;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  page-break-after: always;

  @media print {
    box-shadow: none;
    margin: 0;
    padding: 2cm;
  }
`;

const ContractHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 3px solid #fbb604;
  padding-bottom: 1.5rem;

  h1 {
    font-size: 24pt;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
    letter-spacing: 1px;
  }

  .subtitle {
    font-size: 14pt;
    color: #666;
    font-weight: 500;
  }
`;

const ContractSection = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 14pt;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 1rem 0;
    padding: 0.5rem 0;
    border-bottom: 2px solid #fbb604;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      color: #fbb604;
      font-size: 12pt;
    }
  }

  p {
    margin: 0 0 1rem 0;
    text-align: justify;
  }

  .clause-number {
    font-weight: 700;
    color: #fbb604;
    margin-right: 0.5rem;
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
    font-size: 12pt;
    font-weight: 700;
    color: #fbb604;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 10pt;
    }
  }

  p {
    margin: 0.25rem 0;
    font-size: 10pt;
    color: #555;
  }
`;

const SignatureSection = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  .signature-block {
    text-align: center;

    .signature-line {
      border-bottom: 2px solid #333;
      height: 3rem;
      margin-bottom: 0.5rem;
    }

    .signature-label {
      font-size: 10pt;
      color: #666;
      font-weight: 500;
    }

    .signature-name {
      font-size: 11pt;
      font-weight: 700;
      color: #333;
      margin-top: 0.5rem;
    }

    .signature-title {
      font-size: 9pt;
      color: #666;
      font-style: italic;
    }
  }
`;

const ActionButtons = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(251, 182, 4, 0.1);
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1rem;

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
      background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
      color: #000;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(251, 182, 4, 0.3);
      }
    }

    &.secondary {
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #6366f1;

      &:hover {
        background: rgba(99, 102, 241, 0.2);
        transform: translateY(-2px);
      }
    }

    &.success {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #22c55e;

      &:hover {
        background: rgba(34, 197, 94, 0.2);
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

const EmploymentContractGenerator = ({ onClose }) => {
  const previewRef = useRef();

  const [contractData, setContractData] = useState(() => {
    const saved = sessionStorage.getItem('employment-contract-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved contract data');
      }
    }
    
    return {
      // Company Information
      companyName: "Revolvo Technologies",
      companyAddress: "123 Business District, Tech City",
      companyPhone: "+1 (555) 123-4567",
      companyEmail: "hr@revolvo.tech",
      
      // Employee Information
      employeeName: "",
      employeeAddress: "",
      employeePhone: "",
      employeeEmail: "",
      employeeId: "",
      
      // Contract Details
      position: "",
      department: "",
      startDate: "",
      contractType: "Permanent",
      workingHours: "40 hours per week",
      salary: "",
      salaryPeriod: "Monthly",
      
      // Terms and Conditions
      probationPeriod: "3 months",
      noticePeriod: "30 days",
      benefits: "Health insurance, Annual leave, Performance bonus",
      responsibilities: "",
      
      // Additional Terms
      confidentiality: true,
      nonCompete: false,
      intellectualProperty: true,
      
      // Contract Date
      contractDate: new Date().toISOString().split('T')[0]
    };
  });

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...contractData,
      [field]: value
    };
    setContractData(updatedData);
    
    try {
      sessionStorage.setItem('employment-contract-data', JSON.stringify(updatedData));
    } catch (e) {
      console.warn('Failed to save contract data to session storage');
    }
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Employment_Contract_${contractData.employeeName?.replace(/\s+/g, '_') || 'Contract'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const subject = `Employment Contract - ${contractData.position || 'Position'} at ${contractData.companyName}`;
    const body = `Dear ${contractData.employeeName},\n\nPlease find attached your employment contract for the position of ${contractData.position} at ${contractData.companyName}.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nHuman Resources\n${contractData.companyName}`;
    
    const mailtoLink = `mailto:${contractData.employeeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      const clearedData = {
        companyName: "Revolvo Technologies",
        companyAddress: "123 Business District, Tech City",
        companyPhone: "+1 (555) 123-4567",
        companyEmail: "hr@revolvo.tech",
        employeeName: "",
        employeeAddress: "",
        employeePhone: "",
        employeeEmail: "",
        employeeId: "",
        position: "",
        department: "",
        startDate: "",
        contractType: "Permanent",
        workingHours: "40 hours per week",
        salary: "",
        salaryPeriod: "Monthly",
        probationPeriod: "3 months",
        noticePeriod: "30 days",
        benefits: "Health insurance, Annual leave, Performance bonus",
        responsibilities: "",
        confidentiality: true,
        nonCompete: false,
        intellectualProperty: true,
        contractDate: new Date().toISOString().split('T')[0]
      };
      setContractData(clearedData);
      sessionStorage.removeItem('employment-contract-data');
    }
  };

  return (
    <CreatorOverlay>
      <CreatorContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <TopButtons>
          <TopButton className="email" onClick={handleSendEmail} title="Send via Email">
            <FaEnvelope />
          </TopButton>
          <TopButton className="print" onClick={handlePrint} title="Print Contract">
            <FaPrint />
          </TopButton>
          <TopButton className="download" onClick={handleDownloadPDF} title="Download PDF">
            <FaDownload />
          </TopButton>
          <TopButton className="close" onClick={onClose} title="Close">
            <FaTimes />
          </TopButton>
        </TopButtons>

        <Header>
          <h2>
            <FaFileContract className="icon" />
            Employment Contract Generator
          </h2>
        </Header>

        <MainContent>
          <FormSection>
            <FormGroup>
              <h3>
                <FaBuilding className="icon" />
                Company Information
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaBuilding className="icon" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={contractData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Company name"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaPhone className="icon" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={contractData.companyPhone}
                    onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                    placeholder="Company phone"
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
                    value={contractData.companyAddress}
                    onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                    placeholder="Complete company address"
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaEnvelope className="icon" />
                    Company Email
                  </label>
                  <input
                    type="email"
                    value={contractData.companyEmail}
                    onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                    placeholder="hr@company.com"
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
                    Employee Name
                  </label>
                  <input
                    type="text"
                    value={contractData.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    placeholder="Full name"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaIdCard className="icon" />
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={contractData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    placeholder="EMP001"
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaMapMarkerAlt className="icon" />
                    Employee Address
                  </label>
                  <input
                    type="text"
                    value={contractData.employeeAddress}
                    onChange={(e) => handleInputChange('employeeAddress', e.target.value)}
                    placeholder="Complete address"
                  />
                </InputGroup>
              </FormRow>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaPhone className="icon" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={contractData.employeePhone}
                    onChange={(e) => handleInputChange('employeePhone', e.target.value)}
                    placeholder="Phone number"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaEnvelope className="icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contractData.employeeEmail}
                    onChange={(e) => handleInputChange('employeeEmail', e.target.value)}
                    placeholder="employee@email.com"
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>

            <FormGroup>
              <h3>
                <FaFileContract className="icon" />
                Contract Details
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaUser className="icon" />
                    Position/Job Title
                  </label>
                  <input
                    type="text"
                    value={contractData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Job position"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaBuilding className="icon" />
                    Department
                  </label>
                  <input
                    type="text"
                    value={contractData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="Department name"
                  />
                </InputGroup>
              </FormRow>
              <FormRow columns="1fr 1fr 1fr">
                <InputGroup>
                  <label>
                    <FaCalendarAlt className="icon" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={contractData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaFileContract className="icon" />
                    Contract Type
                  </label>
                  <select
                    value={contractData.contractType}
                    onChange={(e) => handleInputChange('contractType', e.target.value)}
                  >
                    <option value="Permanent">Permanent</option>
                    <option value="Fixed-term">Fixed-term</option>
                    <option value="Probationary">Probationary</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaClock className="icon" />
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={contractData.workingHours}
                    onChange={(e) => handleInputChange('workingHours', e.target.value)}
                    placeholder="40 hours per week"
                  />
                </InputGroup>
              </FormRow>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaDollarSign className="icon" />
                    Salary Amount
                  </label>
                  <input
                    type="text"
                    value={contractData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="50,000"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaCalendarAlt className="icon" />
                    Salary Period
                  </label>
                  <select
                    value={contractData.salaryPeriod}
                    onChange={(e) => handleInputChange('salaryPeriod', e.target.value)}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Annual">Annual</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </InputGroup>
              </FormRow>
            </FormGroup>

            <FormGroup>
              <h3>
                <FaGavel className="icon" />
                Terms & Conditions
              </h3>
              <FormRow columns="1fr 1fr">
                <InputGroup>
                  <label>
                    <FaCalendarAlt className="icon" />
                    Probation Period
                  </label>
                  <input
                    type="text"
                    value={contractData.probationPeriod}
                    onChange={(e) => handleInputChange('probationPeriod', e.target.value)}
                    placeholder="3 months"
                  />
                </InputGroup>
                <InputGroup>
                  <label>
                    <FaCalendarAlt className="icon" />
                    Notice Period
                  </label>
                  <input
                    type="text"
                    value={contractData.noticePeriod}
                    onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                    placeholder="30 days"
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaCheck className="icon" />
                    Benefits Package
                  </label>
                  <textarea
                    value={contractData.benefits}
                    onChange={(e) => handleInputChange('benefits', e.target.value)}
                    placeholder="Health insurance, annual leave, performance bonus..."
                    rows="3"
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <label>
                    <FaUser className="icon" />
                    Job Responsibilities
                  </label>
                  <textarea
                    value={contractData.responsibilities}
                    onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                    placeholder="Key responsibilities and duties..."
                    rows="4"
                  />
                </InputGroup>
              </FormRow>
            </FormGroup>
          </FormSection>

          <PreviewSection>
            <PreviewContainer>
              <ContractDocument ref={previewRef}>
                <ContractHeader>
                  <h1>EMPLOYMENT CONTRACT</h1>
                  <div className="subtitle">Agreement of Employment</div>
                </ContractHeader>

                <InfoGrid>
                  <InfoBlock>
                    <h3>
                      <FaBuilding className="icon" />
                      Employer
                    </h3>
                    <p><strong>{contractData.companyName}</strong></p>
                    <p>{contractData.companyAddress}</p>
                    <p>Phone: {contractData.companyPhone}</p>
                    <p>Email: {contractData.companyEmail}</p>
                  </InfoBlock>
                  <InfoBlock>
                    <h3>
                      <FaUser className="icon" />
                      Employee
                    </h3>
                    <p><strong>{contractData.employeeName || '[Employee Name]'}</strong></p>
                    <p>ID: {contractData.employeeId || '[Employee ID]'}</p>
                    <p>{contractData.employeeAddress || '[Employee Address]'}</p>
                    <p>Phone: {contractData.employeePhone || '[Phone]'}</p>
                    <p>Email: {contractData.employeeEmail || '[Email]'}</p>
                  </InfoBlock>
                </InfoGrid>

                <ContractSection>
                  <h2>
                    <FaFileContract className="icon" />
                    1. POSITION AND DUTIES
                  </h2>
                  <p>
                    <span className="clause-number">1.1</span>
                    The Employee is hereby employed in the position of <strong>{contractData.position || '[Position]'}</strong> in the {contractData.department || '[Department]'} department.
                  </p>
                  <p>
                    <span className="clause-number">1.2</span>
                    The Employee's primary responsibilities include:
                  </p>
                  <p style={{ marginLeft: '1rem', fontStyle: 'italic' }}>
                    {contractData.responsibilities || 'Key responsibilities and duties as assigned by the supervisor and outlined in the job description.'}
                  </p>
                </ContractSection>

                <ContractSection>
                  <h2>
                    <FaCalendarAlt className="icon" />
                    2. TERM OF EMPLOYMENT
                  </h2>
                  <p>
                    <span className="clause-number">2.1</span>
                    This employment contract shall commence on <strong>{contractData.startDate || '[Start Date]'}</strong> and shall be of <strong>{contractData.contractType}</strong> nature.
                  </p>
                  <p>
                    <span className="clause-number">2.2</span>
                    The Employee is subject to a probationary period of <strong>{contractData.probationPeriod}</strong> from the date of commencement.
                  </p>
                </ContractSection>

                <ContractSection>
                  <h2>
                    <FaClock className="icon" />
                    3. WORKING HOURS
                  </h2>
                  <p>
                    <span className="clause-number">3.1</span>
                    The Employee's normal working hours shall be <strong>{contractData.workingHours}</strong>, Monday through Friday, unless otherwise specified.
                  </p>
                </ContractSection>

                <ContractSection>
                  <h2>
                    <FaDollarSign className="icon" />
                    4. COMPENSATION
                  </h2>
                  <p>
                    <span className="clause-number">4.1</span>
                    The Employee shall receive a {contractData.salaryPeriod.toLowerCase()} salary of <strong>{contractData.salary ? `$${contractData.salary}` : '[Salary Amount]'}</strong>, payable in accordance with the Company's standard payroll practices.
                  </p>
                  <p>
                    <span className="clause-number">4.2</span>
                    The Employee shall be entitled to the following benefits: {contractData.benefits}
                  </p>
                </ContractSection>

                <ContractSection>
                  <h2>
                    <FaGavel className="icon" />
                    5. TERMINATION
                  </h2>
                  <p>
                    <span className="clause-number">5.1</span>
                    Either party may terminate this agreement by providing <strong>{contractData.noticePeriod}</strong> written notice to the other party.
                  </p>
                  <p>
                    <span className="clause-number">5.2</span>
                    The Company reserves the right to terminate this agreement immediately in cases of gross misconduct or breach of contract terms.
                  </p>
                </ContractSection>

                <ContractSection>
                  <h2>
                    <FaGavel className="icon" />
                    6. CONFIDENTIALITY AND NON-DISCLOSURE
                  </h2>
                  <p>
                    <span className="clause-number">6.1</span>
                    The Employee agrees to maintain strict confidentiality regarding all proprietary information, trade secrets, and business operations of the Company.
                  </p>
                  <p>
                    <span className="clause-number">6.2</span>
                    This obligation shall continue beyond the termination of employment.
                  </p>
                </ContractSection>

                <ContractSection>
                  <h2>
                    <FaGavel className="icon" />
                    7. GENERAL PROVISIONS
                  </h2>
                  <p>
                    <span className="clause-number">7.1</span>
                    This contract constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements.
                  </p>
                  <p>
                    <span className="clause-number">7.2</span>
                    Any modifications to this contract must be in writing and signed by both parties.
                  </p>
                  <p>
                    <span className="clause-number">7.3</span>
                    This contract shall be governed by applicable employment laws and regulations.
                  </p>
                </ContractSection>

                <SignatureSection>
                  <div className="signature-block">
                    <div className="signature-line"></div>
                    <div className="signature-label">EMPLOYER SIGNATURE</div>
                    <div className="signature-name">{contractData.companyName}</div>
                    <div className="signature-title">Authorized Representative</div>
                    <div style={{ marginTop: '1rem', fontSize: '9pt', color: '#666' }}>
                      Date: {contractData.contractDate}
                    </div>
                  </div>
                  <div className="signature-block">
                    <div className="signature-line"></div>
                    <div className="signature-label">EMPLOYEE SIGNATURE</div>
                    <div className="signature-name">{contractData.employeeName || '[Employee Name]'}</div>
                    <div className="signature-title">Employee</div>
                    <div style={{ marginTop: '1rem', fontSize: '9pt', color: '#666' }}>
                      Date: ______________
                    </div>
                  </div>
                </SignatureSection>
              </ContractDocument>
            </PreviewContainer>
          </PreviewSection>
        </MainContent>

        <ActionButtons>
          <button className="clear" onClick={handleClear}>
            <FaTimes />
            Clear All
          </button>
          <button className="secondary" onClick={handleSendEmail}>
            <FaEnvelope />
            Send Contract via Email
          </button>
          <button className="success" onClick={handlePrint}>
            <FaPrint />
            Print Contract
          </button>
          <button className="primary" onClick={handleDownloadPDF}>
            <FaDownload />
            Download PDF
          </button>
        </ActionButtons>
      </CreatorContainer>
    </CreatorOverlay>
  );
};

export default EmploymentContractGenerator;