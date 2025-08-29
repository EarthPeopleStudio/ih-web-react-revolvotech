import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaDownload, FaPrint, FaUser, FaBriefcase, FaDollarSign, FaHandshake } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GeneratorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 100vh;
  background: #0a0a0a;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const FormPanel = styled.div`
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  overflow-y: auto;
  max-height: 100vh;
  
  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .icon {
      color: #fbb604;
    }
  }
`;

const PreviewPanel = styled.div`
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  
  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h3 {
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    .actions {
      display: flex;
      gap: 0.75rem;
      
      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        color: #888888;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
        
        &.primary {
          background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
          color: white;
          
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 5px 15px rgba(251, 182, 4, 0.4);
          }
        }
      }
    }
  }
  
  .preview-content {
    flex: 1;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    color: #888888;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  input, textarea, select {
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    color: white;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: rgba(251, 182, 4, 0.5);
      background: rgba(255, 255, 255, 0.05);
    }
    
    &::placeholder {
      color: #666666;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
    line-height: 1.5;
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

const SectionHeader = styled.h3`
  color: #fbb604;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const JobOfferPreview = styled.div`
  width: 100%;
  background: white;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
  min-height: 800px;
  line-height: 1.6;
  
  .offer-header {
    text-align: center;
    border-bottom: 3px solid #fbb604;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    
    .company-name {
      font-size: 2.2rem;
      font-weight: 800;
      color: #333;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .company-tagline {
      font-size: 1rem;
      color: #666;
      font-style: italic;
      margin-bottom: 1.5rem;
    }
    
    .document-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fbb604;
      margin-bottom: 1rem;
    }
    
    .reference-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: #666;
      margin-top: 1rem;
    }
  }
  
  .candidate-section {
    margin-bottom: 2rem;
    
    .section-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 1rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.5rem;
    }
    
    .candidate-details {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #fbb604;
      
      p {
        margin: 0.5rem 0;
        
        strong {
          color: #333;
          margin-right: 1rem;
          display: inline-block;
          min-width: 120px;
        }
      }
    }
  }
  
  .offer-content {
    margin-bottom: 2rem;
    
    .greeting {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .offer-text {
      margin-bottom: 2rem;
      text-align: justify;
      
      p {
        margin-bottom: 1rem;
      }
    }
  }
  
  .position-details {
    background: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 2rem;
    
    .section-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #fbb604;
      margin-bottom: 1.5rem;
      text-align: center;
      border-bottom: 2px solid #fbb604;
      padding-bottom: 0.5rem;
    }
    
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      
      .detail-group {
        .group-title {
          font-weight: 700;
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .detail-item {
          margin-bottom: 0.75rem;
          
          .label {
            font-weight: 600;
            color: #555;
            display: inline-block;
            min-width: 140px;
          }
          
          .value {
            color: #333;
            font-weight: 500;
          }
        }
      }
    }
  }
  
  .compensation-section {
    background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    text-align: center;
    
    .section-title {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    
    .salary-amount {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }
    
    .salary-period {
      font-size: 1.1rem;
      opacity: 0.9;
      margin-bottom: 1rem;
    }
    
    .benefits-list {
      text-align: left;
      max-width: 600px;
      margin: 0 auto;
      
      ul {
        list-style: none;
        padding: 0;
        
        li {
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          
          &:last-child {
            border-bottom: none;
          }
          
          &:before {
            content: "✓";
            margin-right: 1rem;
            font-weight: bold;
          }
        }
      }
    }
  }
  
  .terms-section {
    margin-bottom: 2rem;
    
    .section-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 1rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.5rem;
    }
    
    .terms-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      
      .term-item {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
        border-left: 3px solid #fbb604;
        
        .term-title {
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .term-value {
          color: #666;
        }
      }
    }
  }
  
  .next-steps {
    background: #e8f4fd;
    border: 1px solid #b3d9f7;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    
    .section-title {
      font-weight: 700;
      color: #1e88e5;
      margin-bottom: 1rem;
    }
    
    ol {
      color: #333;
      padding-left: 1.5rem;
      
      li {
        margin-bottom: 0.5rem;
      }
    }
  }
  
  .closing-section {
    margin-bottom: 3rem;
    
    p {
      margin-bottom: 1rem;
      text-align: justify;
    }
  }
  
  .signature-section {
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    
    .signature-block {
      text-align: center;
      
      .signature-line {
        width: 200px;
        height: 80px;
        border-bottom: 2px solid #333;
        margin-bottom: 1rem;
      }
      
      .signature-info {
        .name {
          font-weight: 700;
          color: #333;
        }
        
        .title {
          color: #666;
          font-size: 0.9rem;
        }
        
        .date {
          color: #666;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
      }
    }
  }
  
  .footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #eee;
    text-align: center;
    font-size: 0.8rem;
    color: #999;
  }
`;

const JobOfferGenerator = () => {
  const previewRef = useRef();
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "Revolvo Tech",
    companyTagline: "Innovation Through Technology",
    
    // Candidate Info
    candidateName: "",
    candidateAddress: "",
    candidateEmail: "",
    candidatePhone: "",
    
    // Position Details
    position: "",
    department: "",
    reportingManager: "",
    startDate: "",
    employmentType: "Full-time",
    workLocation: "Office",
    
    // Compensation
    salary: "",
    salaryPeriod: "per annum",
    benefits: "Health Insurance\nPaid Time Off\nRetirement Plan\nProfessional Development Budget",
    
    // Terms
    probationPeriod: "3 months",
    noticePeriod: "30 days",
    workingHours: "9 AM to 6 PM",
    workingDays: "Monday to Friday",
    
    // Additional
    offerValidUntil: "",
    signatoryName: "John Doe",
    signatoryTitle: "Chief Executive Officer",
    referenceNumber: `JO-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `Job_Offer_${formData.candidateName.replace(/\s+/g, '_')}_${formData.referenceNumber}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handlePrint = () => {
    if (previewRef.current) {
      const printContent = previewRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Job Offer</title>
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
    <GeneratorContainer>
      <FormPanel>
        <h2>
          <FaHandshake className="icon" />
          Job Offer Generator
        </h2>
        
        <FormGroup>
          <label>Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Company Name"
          />
        </FormGroup>

        <FormGroup>
          <label>Company Tagline</label>
          <input
            type="text"
            value={formData.companyTagline}
            onChange={(e) => handleInputChange('companyTagline', e.target.value)}
            placeholder="Company motto or tagline"
          />
        </FormGroup>

        <SectionHeader>
          <FaUser />
          Candidate Information
        </SectionHeader>
        
        <FormGroup>
          <label>Candidate Name</label>
          <input
            type="text"
            value={formData.candidateName}
            onChange={(e) => handleInputChange('candidateName', e.target.value)}
            placeholder="Full Name"
          />
        </FormGroup>

        <FormGroup>
          <label>Candidate Address</label>
          <textarea
            value={formData.candidateAddress}
            onChange={(e) => handleInputChange('candidateAddress', e.target.value)}
            placeholder="Full address"
            rows={3}
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <label>Email</label>
            <input
              type="email"
              value={formData.candidateEmail}
              onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
              placeholder="candidate@email.com"
            />
          </FormGroup>
          <FormGroup>
            <label>Phone</label>
            <input
              type="text"
              value={formData.candidatePhone}
              onChange={(e) => handleInputChange('candidatePhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormGroup>
        </FormRow>

        <SectionHeader>
          <FaBriefcase />
          Position Details
        </SectionHeader>
        
        <FormRow>
          <FormGroup>
            <label>Position Title</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              placeholder="Software Engineer"
            />
          </FormGroup>
          <FormGroup>
            <label>Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              placeholder="Engineering"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Reporting Manager</label>
            <input
              type="text"
              value={formData.reportingManager}
              onChange={(e) => handleInputChange('reportingManager', e.target.value)}
              placeholder="Manager Name"
            />
          </FormGroup>
          <FormGroup>
            <label>Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Employment Type</label>
            <select
              value={formData.employmentType}
              onChange={(e) => handleInputChange('employmentType', e.target.value)}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label>Work Location</label>
            <select
              value={formData.workLocation}
              onChange={(e) => handleInputChange('workLocation', e.target.value)}
            >
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </FormGroup>
        </FormRow>

        <SectionHeader>
          <FaDollarSign />
          Compensation & Benefits
        </SectionHeader>
        
        <FormRow>
          <FormGroup>
            <label>Salary Amount</label>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              placeholder="$75,000"
            />
          </FormGroup>
          <FormGroup>
            <label>Salary Period</label>
            <select
              value={formData.salaryPeriod}
              onChange={(e) => handleInputChange('salaryPeriod', e.target.value)}
            >
              <option value="per annum">Per Annum</option>
              <option value="per month">Per Month</option>
              <option value="per hour">Per Hour</option>
            </select>
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label>Benefits (one per line)</label>
          <textarea
            value={formData.benefits}
            onChange={(e) => handleInputChange('benefits', e.target.value)}
            placeholder="Health Insurance&#10;Paid Time Off&#10;Retirement Plan"
            rows={5}
          />
        </FormGroup>

        <SectionHeader>Terms & Conditions</SectionHeader>
        
        <FormRow>
          <FormGroup>
            <label>Probation Period</label>
            <input
              type="text"
              value={formData.probationPeriod}
              onChange={(e) => handleInputChange('probationPeriod', e.target.value)}
              placeholder="3 months"
            />
          </FormGroup>
          <FormGroup>
            <label>Notice Period</label>
            <input
              type="text"
              value={formData.noticePeriod}
              onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
              placeholder="30 days"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Working Hours</label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => handleInputChange('workingHours', e.target.value)}
              placeholder="9 AM to 6 PM"
            />
          </FormGroup>
          <FormGroup>
            <label>Working Days</label>
            <input
              type="text"
              value={formData.workingDays}
              onChange={(e) => handleInputChange('workingDays', e.target.value)}
              placeholder="Monday to Friday"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Offer Valid Until</label>
            <input
              type="date"
              value={formData.offerValidUntil}
              onChange={(e) => handleInputChange('offerValidUntil', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label>Reference Number</label>
            <input
              type="text"
              value={formData.referenceNumber}
              onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
              placeholder="JO-2024-0001"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Signatory Name</label>
            <input
              type="text"
              value={formData.signatoryName}
              onChange={(e) => handleInputChange('signatoryName', e.target.value)}
              placeholder="John Doe"
            />
          </FormGroup>
          <FormGroup>
            <label>Signatory Title</label>
            <input
              type="text"
              value={formData.signatoryTitle}
              onChange={(e) => handleInputChange('signatoryTitle', e.target.value)}
              placeholder="Chief Executive Officer"
            />
          </FormGroup>
        </FormRow>
      </FormPanel>

      <PreviewPanel>
        <div className="preview-header">
          <h3>Job Offer Preview</h3>
          <div className="actions">
            <button onClick={handlePrint}>
              <FaPrint />
              Print
            </button>
            <button className="primary" onClick={handleDownloadPDF}>
              <FaDownload />
              Download PDF
            </button>
          </div>
        </div>
        
        <div className="preview-content">
          <JobOfferPreview ref={previewRef}>
            <div className="offer-header">
              <div className="company-name">{formData.companyName}</div>
              <div className="company-tagline">{formData.companyTagline}</div>
              <div className="document-title">JOB OFFER LETTER</div>
              <div className="reference-info">
                <span>Ref: {formData.referenceNumber}</span>
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="candidate-section">
              <div className="section-title">Candidate Information</div>
              <div className="candidate-details">
                <p><strong>Name:</strong>{formData.candidateName || 'N/A'}</p>
                <p><strong>Address:</strong>{formData.candidateAddress || 'N/A'}</p>
                <p><strong>Email:</strong>{formData.candidateEmail || 'N/A'}</p>
                <p><strong>Phone:</strong>{formData.candidatePhone || 'N/A'}</p>
              </div>
            </div>

            <div className="offer-content">
              <div className="greeting">
                Dear {formData.candidateName || '[Candidate Name]'},
              </div>
              
              <div className="offer-text">
                <p>
                  We are pleased to extend this offer of employment to you for the position of <strong>{formData.position || '[Position Title]'}</strong> 
                  in our <strong>{formData.department || '[Department]'}</strong> department at {formData.companyName}.
                </p>
                
                <p>
                  After careful consideration of your qualifications, experience, and interview performance, we believe you would be an excellent 
                  addition to our team. We are excited about the possibility of you joining our organization and contributing to our continued success.
                </p>
                
                <p>
                  This offer letter outlines the terms and conditions of your employment, which we believe are competitive and reflect the value 
                  we place on your skills and expertise.
                </p>
              </div>
            </div>

            <div className="position-details">
              <div className="section-title">Position Details</div>
              <div className="details-grid">
                <div className="detail-group">
                  <div className="group-title">Job Information</div>
                  <div className="detail-item">
                    <span className="label">Position:</span>
                    <span className="value">{formData.position || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Department:</span>
                    <span className="value">{formData.department || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Reporting Manager:</span>
                    <span className="value">{formData.reportingManager || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Employment Type:</span>
                    <span className="value">{formData.employmentType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Work Location:</span>
                    <span className="value">{formData.workLocation}</span>
                  </div>
                </div>
                <div className="detail-group">
                  <div className="group-title">Schedule & Terms</div>
                  <div className="detail-item">
                    <span className="label">Start Date:</span>
                    <span className="value">{formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Working Hours:</span>
                    <span className="value">{formData.workingHours}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Working Days:</span>
                    <span className="value">{formData.workingDays}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Probation Period:</span>
                    <span className="value">{formData.probationPeriod}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Notice Period:</span>
                    <span className="value">{formData.noticePeriod}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="compensation-section">
              <div className="section-title">Compensation Package</div>
              <div className="salary-amount">{formData.salary || '$0'}</div>
              <div className="salary-period">{formData.salaryPeriod}</div>
              <div className="benefits-list">
                <h4>Benefits & Perks:</h4>
                <ul>
                  {formData.benefits.split('\n').filter(benefit => benefit.trim()).map((benefit, index) => (
                    <li key={index}>{benefit.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="next-steps">
              <div className="section-title">Next Steps</div>
              <ol>
                <li>Please review all terms and conditions carefully</li>
                <li>If you accept this offer, please sign and return this letter by {formData.offerValidUntil ? new Date(formData.offerValidUntil).toLocaleDateString() : '[Date]'}</li>
                <li>Submit required documentation (ID, education certificates, etc.)</li>
                <li>Complete pre-employment requirements if applicable</li>
                <li>Prepare for your first day on {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : '[Start Date]'}</li>
              </ol>
            </div>

            <div className="closing-section">
              <p>
                We are thrilled about the prospect of having you join our team and look forward to the fresh perspective and valuable 
                contributions you will bring to {formData.companyName}. Should you have any questions about this offer or need any 
                clarification, please don't hesitate to contact us.
              </p>
              
              <p>
                This offer is contingent upon successful completion of background checks and any other pre-employment requirements 
                as deemed necessary by the company.
              </p>
              
              <p>Welcome to the {formData.companyName} family!</p>
            </div>

            <div className="signature-section">
              <div className="signature-block">
                <div className="signature-line"></div>
                <div className="signature-info">
                  <div className="name">{formData.signatoryName}</div>
                  <div className="title">{formData.signatoryTitle}</div>
                  <div className="date">{formData.companyName}</div>
                </div>
              </div>
              <div className="signature-block">
                <div className="signature-line"></div>
                <div className="signature-info">
                  <div className="name">{formData.candidateName || '[Candidate Name]'}</div>
                  <div className="title">Candidate Acceptance</div>
                  <div className="date">Date: _______________</div>
                </div>
              </div>
            </div>

            <div className="footer">
              This offer letter is valid until {formData.offerValidUntil ? new Date(formData.offerValidUntil).toLocaleDateString() : '[Date]'}. 
              Generated on {new Date().toLocaleDateString()} | {formData.companyName}
            </div>
          </JobOfferPreview>
        </div>
      </PreviewPanel>
    </GeneratorContainer>
  );
};

export default JobOfferGenerator;