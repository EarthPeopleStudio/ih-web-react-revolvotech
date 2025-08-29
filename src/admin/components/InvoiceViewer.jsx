import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaTimes, FaPrint, FaDownload, FaShareAlt, FaCheck,
  FaClock, FaExclamationTriangle, FaEnvelope, FaPhone, FaGlobe
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import RevolvoLogo from "../../assets/revolvo-logo.png";

// Print-only styles to isolate and format the invoice
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
    
    /* Show only the invoice content */
    .printable-invoice,
    .printable-invoice * {
      visibility: visible !important;
    }
    
    /* Make the invoice become the entire page - no container */
    .printable-invoice {
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
      outline: none !important;
      z-index: 999999 !important;
      font-size: 14pt !important;
      
      /* Optimize content layout for full page usage */
      .invoice-header {
        margin-bottom: 25pt !important;
        padding-bottom: 15pt !important;
        
        .company-name {
          font-size: 28pt !important;
        }
        
        .invoice-title {
          font-size: 48pt !important;
        }
      }
      
      .billing-section {
        margin-bottom: 25pt !important;
        padding: 20pt !important;
        font-size: 16pt !important;
      }
      
      .items-section {
        margin-bottom: 25pt !important;
        
        table {
          font-size: 16pt !important;
          
          th, td {
            padding: 15pt 12pt !important;
            line-height: 1.4 !important;
          }
        }
      }
      
      .totals-section {
        margin-bottom: 25pt !important;
        gap: 30pt !important;
        font-size: 16pt !important;
        
        .summary-row.total {
          font-size: 24pt !important;
        }
      }
      
      .footer {
        padding-top: 25pt !important;
        font-size: 14pt !important;
      }
    }
    
    /* Remove container constraints */
    body, html {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      overflow: visible !important;
    }
  }
`;

const InvoiceOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const InvoiceModal = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
  width: min(800px, 90vw);
  height: min(1130px, 90vh);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
  border-radius: 16px 16px 0 0;
  color: white;

  .title {
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;

    button {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 8px;
      padding: 0.5rem;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }
    }
  }
`;

const PrintableInvoice = styled.div`
  padding: 2rem;
  background: #0a0a0a;
  color: white;
  line-height: 1.6;
  font-size: 14px;
  flex: 1;
  overflow-y: auto;

  .invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
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
      align-items: center;
      gap: 1.5rem;

      .logo {
        width: 70px;
        height: 70px;
        
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
          font-weight: 600;
          color: white;
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
          color: #aaa;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
      }
    }

    .invoice-details {
      text-align: right;
      .invoice-title {
        font-size: 3rem;
        font-weight: 900;
        color: #fbb604;
        margin-bottom: 0.5rem;
        letter-spacing: 3px;
        text-shadow: 0 0 20px rgba(251, 182, 4, 0.3);
      }
      .invoice-number {
        font-size: 1.1rem;
        color: #fff;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      .invoice-dates {
        font-size: 0.95rem;
        color: #bbb;
        line-height: 1.6;
      }
    }
  }

  .billing-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2.5rem;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
    border-radius: 12px;
    border: 1px solid rgba(251, 182, 4, 0.1);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #fbb604 0%, #f99b04 100%);
      border-radius: 12px 12px 0 0;
    }

    .billing-block {
      position: relative;
      
      .label {
        font-size: 0.75rem;
        color: #fbb604;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: 0.75rem;
        letter-spacing: 1px;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 20px;
          height: 1px;
          background: #fbb604;
        }
      }
      
      .content {
        color: #fff;
        .primary {
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
          color: white;
        }
        .secondary {
          color: #ccc;
          font-size: 0.9rem;
          line-height: 1.6;
        }
      }
    }
  }

  .items-section {
    margin-bottom: 3rem;

    table {
      width: 100%;
      border-collapse: collapse;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(251, 182, 4, 0.1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

      thead {
        background: linear-gradient(135deg, rgba(251, 182, 4, 0.25) 0%, rgba(249, 155, 4, 0.15) 100%);
        th {
          padding: 1.2rem 1rem;
          text-align: left;
          color: #fbb604;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid rgba(251, 182, 4, 0.3);
          position: relative;
          
          &:last-child {
            text-align: right;
          }
          
          &:first-child {
            border-radius: 12px 0 0 0;
          }
          
          &:last-child {
            border-radius: 0 12px 0 0;
          }
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: background-color 0.2s ease;
          
          &:hover {
            background: rgba(255, 255, 255, 0.02);
          }
          
          &:last-child {
            border-bottom: none;
            
            td:first-child {
              border-radius: 0 0 0 12px;
            }
            
            td:last-child {
              border-radius: 0 0 12px 0;
            }
          }
          
          td {
            padding: 1.2rem 1rem;
            color: #ddd;
            font-size: 0.95rem;
            
            &.description {
              color: #fff;
              font-weight: 600;
              position: relative;
            }
            
            &.amount {
              text-align: right;
              font-weight: 700;
              color: #fbb604;
              font-size: 1rem;
            }
            
            &.center {
              text-align: center;
              color: #bbb;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  .totals-section {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    margin-bottom: 2rem;

    .notes {
      flex: 1;
      .notes-title {
        color: #fbb604;
        font-weight: 600;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }
      .notes-content {
        color: #ccc;
        font-size: 0.85rem;
        line-height: 1.5;
        background: rgba(255, 255, 255, 0.03);
        padding: 1rem;
        border-radius: 6px;
        border-left: 3px solid #fbb604;
      }
    }

    .summary {
      min-width: 300px;
      .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        
        &.total {
          border-top: 2px solid #fbb604;
          border-bottom: none;
          margin-top: 0.5rem;
          padding-top: 1rem;
          font-size: 1.2rem;
          font-weight: 700;
          color: #fbb604;
        }
        
        .label {
          color: #aaa;
        }
        .value {
          color: #fff;
          font-weight: 600;
        }
      }
    }
  }

  .footer {
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #888;

    .contact {
      display: flex;
      gap: 2rem;
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        svg {
          color: #fbb604;
        }
      }
    }

    .company-info {
      text-align: right;
    }
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;

  &.paid {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
  }
  &.pending {
    background: rgba(251, 191, 36, 0.2);
    color: #fbbf24;
  }
  &.overdue {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }
`;

const InvoiceViewer = ({ invoice, onClose }) => {
  const invoiceRef = useRef();

  if (!invoice) return null;

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#0a0a0a'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${invoice.number}.pdf`);
  };

  const printInvoice = () => {
    window.print();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <FaCheck />;
      case 'pending': return <FaClock />;
      case 'overdue': return <FaExclamationTriangle />;
      default: return <FaClock />;
    }
  };

  return (
    <>
      <PrintStyles />
      <InvoiceOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
      <InvoiceModal
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <InvoiceHeader className="no-print">
          <div className="title">
            Invoice {invoice.number}
            <StatusBadge className={invoice.status}>
              {getStatusIcon(invoice.status)}
              {invoice.status}
            </StatusBadge>
          </div>
          <div className="actions">
            <button onClick={printInvoice} title="Print">
              <FaPrint />
            </button>
            <button onClick={downloadPDF} title="Download PDF">
              <FaDownload />
            </button>
            <button onClick={() => navigator.share && navigator.share({ title: `Invoice ${invoice.number}` })} title="Share">
              <FaShareAlt />
            </button>
            <button onClick={onClose} title="Close">
              <FaTimes />
            </button>
          </div>
        </InvoiceHeader>

        <PrintableInvoice ref={invoiceRef} className="printable-invoice">
          <div className="invoice-header">
            <div className="company-section">
              <div className="logo">
                <img src={RevolvoLogo} alt="Revolvo Tech" />
              </div>
              <div className="company-details">
                <div className="company-name">REVOLVO TECH</div>
                <div className="tagline">Innovation in Motion</div>
              </div>
            </div>
            <div className="invoice-details">
              <div className="invoice-title">INVOICE</div>
              <div className="invoice-number">#{invoice.number}</div>
              <div className="invoice-dates">
                Date: {new Date(invoice.date).toLocaleDateString()}<br />
                Due: {new Date(invoice.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="billing-section">
            <div className="billing-block">
              <div className="label">Bill To</div>
              <div className="content">
                <div className="primary">{invoice.clientName}</div>
                <div className="secondary">
                  {invoice.clientEmail}<br />
                  {invoice.clientPhone && `${invoice.clientPhone}`}
                  {invoice.clientAddress && <><br />{invoice.clientAddress}</>}
                </div>
              </div>
            </div>
            <div className="billing-block">
              <div className="label">Project Details</div>
              <div className="content">
                <div className="primary">{invoice.projectName || 'Professional Services'}</div>
                <div className="secondary">
                  Type: {invoice.type}<br />
                  Terms: Net 30 days
                </div>
              </div>
            </div>
            <div className="billing-block">
              <div className="label">Payment Info</div>
              <div className="content">
                <div className="secondary">
                  Currency: USD<br />
                  Status: {invoice.status}<br />
                  Total: ${invoice.total.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="items-section">
            <table>
              <thead>
                <tr>
                  <th style={{width: '50%'}}>Description</th>
                  <th style={{width: '15%'}} className="center">Qty/Hours</th>
                  <th style={{width: '15%'}} className="center">Rate</th>
                  <th style={{width: '20%'}}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="description">{item.description}</td>
                    <td className="center">{item.quantity}</td>
                    <td className="center">${item.rate.toFixed(2)}</td>
                    <td className="amount">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="totals-section">
            <div className="notes">
              <div className="notes-title">Payment Terms</div>
              <div className="notes-content">
                {invoice.notes || 'Payment is due within 30 days of invoice date. Late payments may incur additional charges. Thank you for your business!'}
              </div>
            </div>
            <div className="summary">
              <div className="summary-row">
                <span className="label">Subtotal</span>
                <span className="value">${invoice.subtotal.toFixed(2)}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="summary-row">
                  <span className="label">Discount</span>
                  <span className="value">-${invoice.discount.toFixed(2)}</span>
                </div>
              )}
              {invoice.taxRate > 0 && (
                <div className="summary-row">
                  <span className="label">Tax ({invoice.taxRate}%)</span>
                  <span className="value">${invoice.taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span className="label">Total Amount</span>
                <span className="value">${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="footer">
            <div className="contact">
              <div className="contact-item">
                <FaEnvelope />
                billing@revolvo.tech
              </div>
              <div className="contact-item">
                <FaPhone />
                (555) 123-4567
              </div>
              <div className="contact-item">
                <FaGlobe />
                revolvo.tech
              </div>
            </div>
            <div className="company-info">
            </div>
          </div>
        </PrintableInvoice>
      </InvoiceModal>
    </InvoiceOverlay>
    </>
  );
};

export default InvoiceViewer;