import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaDownload, FaPrint, FaCalculator, FaDollarSign, FaUser, FaCalendarAlt } from "react-icons/fa";
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
  
  input, select {
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
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: rgba(251, 182, 4, 0.1);
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  
  h3 {
    color: #fbb604;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    
    .label {
      color: #cccccc;
      font-size: 0.9rem;
    }
    
    .value {
      color: white;
      font-weight: 600;
      
      &.total {
        color: #fbb604;
        font-size: 1.1rem;
      }
    }
  }
`;

const SalarySlipPreview = styled.div`
  width: 100%;
  background: white;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
  min-height: 600px;
  
  .slip-header {
    text-align: center;
    border-bottom: 2px solid #fbb604;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
    
    .company-name {
      font-size: 1.8rem;
      font-weight: 800;
      color: #333;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .document-title {
      font-size: 1.4rem;
      font-weight: 600;
      color: #fbb604;
      margin-bottom: 1rem;
    }
    
    .period-info {
      font-size: 1rem;
      color: #666;
      font-weight: 500;
    }
  }
  
  .employee-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    
    .employee-info {
      .section-title {
        font-weight: 700;
        color: #333;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        border-bottom: 1px solid #ddd;
        padding-bottom: 0.5rem;
      }
      
      .info-row {
        display: flex;
        margin-bottom: 0.75rem;
        
        .label {
          font-weight: 600;
          color: #555;
          min-width: 120px;
        }
        
        .value {
          color: #333;
          font-weight: 500;
        }
      }
    }
  }
  
  .salary-breakdown {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    
    .earnings, .deductions {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      
      .section-header {
        background: #fbb604;
        color: white;
        padding: 1rem;
        font-weight: 700;
        font-size: 1.1rem;
        text-align: center;
      }
      
      .section-content {
        padding: 1rem;
        
        .salary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #eee;
          
          &:last-child {
            border-bottom: none;
            font-weight: 700;
            background: #f8f9fa;
            margin: 0 -1rem;
            padding: 1rem;
          }
          
          .item-label {
            color: #555;
          }
          
          .item-value {
            color: #333;
            font-weight: 600;
            
            &.total {
              color: #fbb604;
              font-size: 1.1rem;
            }
          }
        }
      }
    }
  }
  
  .net-salary {
    background: #fbb604;
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 2rem;
    
    .net-label {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .net-amount {
      font-size: 2rem;
      font-weight: 800;
    }
    
    .net-words {
      font-size: 0.9rem;
      margin-top: 0.5rem;
      opacity: 0.9;
    }
  }
  
  .slip-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    
    .signature-section {
      text-align: center;
      
      .signature-line {
        width: 200px;
        height: 60px;
        border-bottom: 1px solid #333;
        margin-bottom: 0.5rem;
      }
      
      .signature-label {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
  
  .generated-info {
    text-align: center;
    font-size: 0.8rem;
    color: #999;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
`;

const SalarySlipGenerator = () => {
  const previewRef = useRef();
  const [formData, setFormData] = useState({
    companyName: "Revolvo Tech",
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    joiningDate: "",
    payPeriod: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    workingDays: 22,
    presentDays: 22,
    
    // Earnings
    basicSalary: 0,
    houseRentAllowance: 0,
    transportAllowance: 0,
    medicalAllowance: 0,
    otherAllowances: 0,
    overtime: 0,
    bonus: 0,
    
    // Deductions
    providentFund: 0,
    tax: 0,
    insurance: 0,
    otherDeductions: 0,
    leaves: 0,
    lateDeduction: 0
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field.includes('Salary') || field.includes('Allowance') || field.includes('overtime') || field.includes('bonus') || field.includes('Fund') || field.includes('tax') || field.includes('insurance') || field.includes('Deduction') || field.includes('leaves') || field.includes('Days') ? parseFloat(value) || 0 : value
    }));
  };

  // Calculate totals
  const totalEarnings = formData.basicSalary + formData.houseRentAllowance + formData.transportAllowance + formData.medicalAllowance + formData.otherAllowances + formData.overtime + formData.bonus;
  
  const totalDeductions = formData.providentFund + formData.tax + formData.insurance + formData.otherDeductions + formData.leaves + formData.lateDeduction;
  
  const netSalary = totalEarnings - totalDeductions;

  const numberToWords = (num) => {
    if (num === 0) return "Zero";
    
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    
    const convertHundreds = (num) => {
      let result = "";
      if (num > 99) {
        result += ones[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }
      if (num > 19) {
        result += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      } else if (num > 9) {
        result += teens[num - 10] + " ";
        return result;
      }
      if (num > 0) {
        result += ones[num] + " ";
      }
      return result;
    };

    const convertThousands = (num) => {
      if (num >= 1000000) {
        return convertHundreds(Math.floor(num / 1000000)) + "Million " + convertThousands(num % 1000000);
      }
      if (num >= 1000) {
        return convertHundreds(Math.floor(num / 1000)) + "Thousand " + convertHundreds(num % 1000);
      }
      return convertHundreds(num);
    };

    return convertThousands(Math.floor(num)) + "Only";
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

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save(`${formData.employeeName}_Salary_Slip_${formData.payPeriod.replace(' ', '_')}.pdf`);
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
            <title>Print Salary Slip</title>
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
          <FaDollarSign className="icon" />
          Salary Slip Generator
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

        <h3 style={{ color: '#fbb604', marginBottom: '1rem', marginTop: '2rem' }}>Employee Information</h3>
        
        <FormRow>
          <FormGroup>
            <label>Employee Name</label>
            <input
              type="text"
              value={formData.employeeName}
              onChange={(e) => handleInputChange('employeeName', e.target.value)}
              placeholder="Full Name"
            />
          </FormGroup>
          <FormGroup>
            <label>Employee ID</label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => handleInputChange('employeeId', e.target.value)}
              placeholder="EMP001"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Designation</label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
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
            <label>Pay Period</label>
            <input
              type="text"
              value={formData.payPeriod}
              onChange={(e) => handleInputChange('payPeriod', e.target.value)}
              placeholder="January 2024"
            />
          </FormGroup>
          <FormGroup>
            <label>Joining Date</label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => handleInputChange('joiningDate', e.target.value)}
            />
          </FormGroup>
        </FormRow>

        <h3 style={{ color: '#fbb604', marginBottom: '1rem', marginTop: '2rem' }}>Earnings</h3>
        
        <FormRow>
          <FormGroup>
            <label>Basic Salary ($)</label>
            <input
              type="number"
              value={formData.basicSalary}
              onChange={(e) => handleInputChange('basicSalary', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
          <FormGroup>
            <label>House Rent Allowance ($)</label>
            <input
              type="number"
              value={formData.houseRentAllowance}
              onChange={(e) => handleInputChange('houseRentAllowance', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Transport Allowance ($)</label>
            <input
              type="number"
              value={formData.transportAllowance}
              onChange={(e) => handleInputChange('transportAllowance', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
          <FormGroup>
            <label>Medical Allowance ($)</label>
            <input
              type="number"
              value={formData.medicalAllowance}
              onChange={(e) => handleInputChange('medicalAllowance', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Other Allowances ($)</label>
            <input
              type="number"
              value={formData.otherAllowances}
              onChange={(e) => handleInputChange('otherAllowances', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
          <FormGroup>
            <label>Overtime ($)</label>
            <input
              type="number"
              value={formData.overtime}
              onChange={(e) => handleInputChange('overtime', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label>Bonus ($)</label>
          <input
            type="number"
            value={formData.bonus}
            onChange={(e) => handleInputChange('bonus', e.target.value)}
            placeholder="0"
          />
        </FormGroup>

        <h3 style={{ color: '#ef4444', marginBottom: '1rem', marginTop: '2rem' }}>Deductions</h3>
        
        <FormRow>
          <FormGroup>
            <label>Provident Fund ($)</label>
            <input
              type="number"
              value={formData.providentFund}
              onChange={(e) => handleInputChange('providentFund', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
          <FormGroup>
            <label>Tax ($)</label>
            <input
              type="number"
              value={formData.tax}
              onChange={(e) => handleInputChange('tax', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>Insurance ($)</label>
            <input
              type="number"
              value={formData.insurance}
              onChange={(e) => handleInputChange('insurance', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
          <FormGroup>
            <label>Leave Deduction ($)</label>
            <input
              type="number"
              value={formData.leaves}
              onChange={(e) => handleInputChange('leaves', e.target.value)}
              placeholder="0"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label>Other Deductions ($)</label>
          <input
            type="number"
            value={formData.otherDeductions}
            onChange={(e) => handleInputChange('otherDeductions', e.target.value)}
            placeholder="0"
          />
        </FormGroup>

        <SummaryCard>
          <h3>
            <FaCalculator />
            Salary Summary
          </h3>
          <div className="summary-row">
            <span className="label">Total Earnings:</span>
            <span className="value">${totalEarnings.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Total Deductions:</span>
            <span className="value">${totalDeductions.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Net Salary:</span>
            <span className="value total">${netSalary.toFixed(2)}</span>
          </div>
        </SummaryCard>
      </FormPanel>

      <PreviewPanel>
        <div className="preview-header">
          <h3>Salary Slip Preview</h3>
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
          <SalarySlipPreview ref={previewRef}>
            <div className="slip-header">
              <div className="company-name">{formData.companyName}</div>
              <div className="document-title">SALARY SLIP</div>
              <div className="period-info">For the month of {formData.payPeriod}</div>
            </div>

            <div className="employee-section">
              <div className="employee-info">
                <div className="section-title">Employee Information</div>
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{formData.employeeName || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="label">Employee ID:</span>
                  <span className="value">{formData.employeeId || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="label">Designation:</span>
                  <span className="value">{formData.designation || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="label">Department:</span>
                  <span className="value">{formData.department || 'N/A'}</span>
                </div>
              </div>
              <div className="employee-info">
                <div className="section-title">Attendance Information</div>
                <div className="info-row">
                  <span className="label">Working Days:</span>
                  <span className="value">{formData.workingDays}</span>
                </div>
                <div className="info-row">
                  <span className="label">Present Days:</span>
                  <span className="value">{formData.presentDays}</span>
                </div>
                <div className="info-row">
                  <span className="label">Joining Date:</span>
                  <span className="value">{formData.joiningDate ? new Date(formData.joiningDate).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="label">Pay Period:</span>
                  <span className="value">{formData.payPeriod}</span>
                </div>
              </div>
            </div>

            <div className="salary-breakdown">
              <div className="earnings">
                <div className="section-header">EARNINGS</div>
                <div className="section-content">
                  <div className="salary-item">
                    <span className="item-label">Basic Salary</span>
                    <span className="item-value">${formData.basicSalary.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">House Rent Allowance</span>
                    <span className="item-value">${formData.houseRentAllowance.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Transport Allowance</span>
                    <span className="item-value">${formData.transportAllowance.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Medical Allowance</span>
                    <span className="item-value">${formData.medicalAllowance.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Other Allowances</span>
                    <span className="item-value">${formData.otherAllowances.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Overtime</span>
                    <span className="item-value">${formData.overtime.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Bonus</span>
                    <span className="item-value">${formData.bonus.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Total Earnings</span>
                    <span className="item-value total">${totalEarnings.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="deductions">
                <div className="section-header">DEDUCTIONS</div>
                <div className="section-content">
                  <div className="salary-item">
                    <span className="item-label">Provident Fund</span>
                    <span className="item-value">${formData.providentFund.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Tax</span>
                    <span className="item-value">${formData.tax.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Insurance</span>
                    <span className="item-value">${formData.insurance.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Leave Deduction</span>
                    <span className="item-value">${formData.leaves.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Other Deductions</span>
                    <span className="item-value">${formData.otherDeductions.toFixed(2)}</span>
                  </div>
                  <div className="salary-item">
                    <span className="item-label">Total Deductions</span>
                    <span className="item-value total">${totalDeductions.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="net-salary">
              <div className="net-label">NET SALARY</div>
              <div className="net-amount">${netSalary.toFixed(2)}</div>
              <div className="net-words">{numberToWords(netSalary)}</div>
            </div>

            <div className="slip-footer">
              <div className="signature-section">
                <div className="signature-line"></div>
                <div className="signature-label">Employee Signature</div>
              </div>
              <div className="signature-section">
                <div className="signature-line"></div>
                <div className="signature-label">HR Signature</div>
              </div>
            </div>

            <div className="generated-info">
              This is a system-generated salary slip. Generated on {new Date().toLocaleDateString()}
            </div>
          </SalarySlipPreview>
        </div>
      </PreviewPanel>
    </GeneratorContainer>
  );
};

export default SalarySlipGenerator;