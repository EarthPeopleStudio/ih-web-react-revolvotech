import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaDownload, FaPrint, FaEye, FaSave, FaBuilding, FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
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
    min-height: 120px;
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

const LetterheadPreview = styled.div`
  width: 100%;
  background: white;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
  min-height: 600px;
  
  .letterhead-header {
    border-bottom: 3px solid #fbb604;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
    
    .company-info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      
      .logo-section {
        flex: 1;
        
        .company-name {
          font-size: 2rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .tagline {
          font-size: 1rem;
          color: #666;
          font-style: italic;
        }
      }
      
      .contact-info {
        text-align: right;
        font-size: 0.9rem;
        color: #555;
        line-height: 1.6;
        
        .contact-item {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
          
          .icon {
            color: #fbb604;
            width: 16px;
          }
        }
      }
    }
    
    .reference-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 1rem;
      font-size: 0.9rem;
      
      .ref-item {
        display: flex;
        gap: 1rem;
        
        .label {
          font-weight: 600;
          color: #333;
          min-width: 80px;
        }
        
        .value {
          color: #666;
        }
      }
    }
  }
  
  .letterhead-body {
    .date-section {
      text-align: right;
      margin-bottom: 2rem;
      font-size: 0.95rem;
      color: #666;
    }
    
    .recipient-section {
      margin-bottom: 2rem;
      
      .recipient-title {
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
      }
      
      .recipient-details {
        color: #666;
        line-height: 1.6;
      }
    }
    
    .subject-section {
      margin-bottom: 2rem;
      
      .subject-label {
        font-weight: 600;
        display: inline;
        color: #333;
        margin-right: 1rem;
      }
      
      .subject-text {
        color: #666;
        font-weight: 500;
      }
    }
    
    .content-section {
      margin-bottom: 3rem;
      
      .greeting {
        margin-bottom: 1.5rem;
        color: #333;
        font-weight: 500;
      }
      
      .main-content {
        line-height: 1.8;
        color: #555;
        margin-bottom: 2rem;
        text-align: justify;
      }
      
      .closing {
        margin-bottom: 1rem;
        color: #333;
      }
    }
    
    .signature-section {
      margin-top: 3rem;
      
      .signature-space {
        height: 60px;
        margin-bottom: 1rem;
      }
      
      .signatory-name {
        font-weight: 600;
        color: #333;
        border-top: 1px solid #ddd;
        padding-top: 0.5rem;
        display: inline-block;
        min-width: 200px;
      }
      
      .signatory-title {
        color: #666;
        font-size: 0.9rem;
        margin-top: 0.25rem;
      }
    }
  }
  
  .letterhead-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    font-size: 0.8rem;
    color: #999;
    text-align: center;
  }
`;

const LetterheadGenerator = () => {
  const previewRef = useRef();
  const [formData, setFormData] = useState({
    companyName: "Revolvo Tech",
    tagline: "Innovation Through Technology",
    address: "123 Tech Street, Innovation District, City 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@revolvo.tech",
    website: "www.revolvo.tech",
    referenceNumber: "REF/2024/001",
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

      pdf.save(`${formData.companyName}_Letterhead_${formData.referenceNumber}.pdf`);
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
    <GeneratorContainer>
      <FormPanel>
        <h2>
          <FaBuilding className="icon" />
          Letterhead Generator
        </h2>
        
        <FormGroup>
          <label>Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Your Company Name"
          />
        </FormGroup>

        <FormGroup>
          <label>Company Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => handleInputChange('tagline', e.target.value)}
            placeholder="Company motto or tagline"
          />
        </FormGroup>

        <FormGroup>
          <label>Company Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Full company address"
            rows={3}
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <label>Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormGroup>
          <FormGroup>
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="contact@company.com"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Website</label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="www.company.com"
            />
          </FormGroup>
          <FormGroup>
            <label>Reference Number</label>
            <input
              type="text"
              value={formData.referenceNumber}
              onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
              placeholder="REF/2024/001"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label>Recipient</label>
          <input
            type="text"
            value={formData.recipientTitle}
            onChange={(e) => handleInputChange('recipientTitle', e.target.value)}
            placeholder="To Whom It May Concern"
          />
        </FormGroup>

        <FormGroup>
          <label>Recipient Address (Optional)</label>
          <textarea
            value={formData.recipientAddress}
            onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
            placeholder="Recipient's full address"
            rows={3}
          />
        </FormGroup>

        <FormGroup>
          <label>Subject</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Letter subject"
          />
        </FormGroup>

        <FormGroup>
          <label>Letter Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Main letter content..."
            rows={8}
          />
        </FormGroup>

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
          <h3>Letter Preview</h3>
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
          <LetterheadPreview ref={previewRef}>
            <div className="letterhead-header">
              <div className="company-info">
                <div className="logo-section">
                  <div className="company-name">{formData.companyName}</div>
                  <div className="tagline">{formData.tagline}</div>
                </div>
                <div className="contact-info">
                  <div className="contact-item">
                    <FaBuilding className="icon" />
                    <span>{formData.address}</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="icon" />
                    <span>{formData.phone}</span>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="icon" />
                    <span>{formData.email}</span>
                  </div>
                  <div className="contact-item">
                    <FaGlobe className="icon" />
                    <span>{formData.website}</span>
                  </div>
                </div>
              </div>
              <div className="reference-section">
                <div className="ref-item">
                  <span className="label">Ref No:</span>
                  <span className="value">{formData.referenceNumber}</span>
                </div>
                <div className="ref-item">
                  <span className="label">Date:</span>
                  <span className="value">{formData.date}</span>
                </div>
              </div>
            </div>

            <div className="letterhead-body">
              {formData.recipientAddress && (
                <div className="recipient-section">
                  <div className="recipient-title">{formData.recipientTitle}</div>
                  <div className="recipient-details">{formData.recipientAddress}</div>
                </div>
              )}

              <div className="subject-section">
                <span className="subject-label">Subject:</span>
                <span className="subject-text">{formData.subject}</span>
              </div>

              <div className="content-section">
                <div className="greeting">{formData.greeting}</div>
                <div className="main-content">
                  {formData.content.split('\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                  ))}
                </div>
                <div className="closing">{formData.closing}</div>
              </div>

              <div className="signature-section">
                <div className="signature-space"></div>
                <div className="signatory-name">{formData.signatoryName}</div>
                <div className="signatory-title">{formData.signatoryTitle}</div>
              </div>
            </div>

            <div className="letterhead-footer">
              {formData.footerText}
            </div>
          </LetterheadPreview>
        </div>
      </PreviewPanel>
    </GeneratorContainer>
  );
};

export default LetterheadGenerator;