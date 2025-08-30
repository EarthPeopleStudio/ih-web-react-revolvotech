import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaFileInvoiceDollar, FaFileContract, FaMoneyBillWave, 
  FaUserTie, FaGavel, FaBuilding, FaPlus, FaEye, FaDownload,
  FaShieldAlt, FaHandshake
} from "react-icons/fa";
import InvoiceCreator from "../components/InvoiceCreator";
import RecentDocuments from "../components/RecentDocuments";
import LetterheadGenerator from "../components/LetterheadGenerator";
import SalarySlipGenerator from "../components/SalarySlipGenerator";
import JobOfferGenerator from "../components/JobOfferGenerator";
import PayrollReportGenerator from "../components/PayrollReportGenerator";
import WHTCalculatorGenerator from "../components/WHTCalculatorGenerator";
import EmploymentContractGenerator from "../components/EmploymentContractGenerator";
import BonusSlipGenerator from "../components/BonusSlipGenerator";
import ExpenseReportGenerator from "../components/ExpenseReportGenerator";
import NDAGenerator from "../components/NDAGenerator";

// Document Type Cards inspired by modernize
const DocumentsContainer = styled.div`
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  
  h1 {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .icon {
      color: #fbb604;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    max-width: 600px;
  }
`;

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

// Modernize-inspired card with Revolvo styling
const DocumentCard = styled(motion.div)`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #fbb604 0%, #f99b04 100%);
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(251, 182, 4, 0.6);
    box-shadow: 0 20px 40px rgba(251, 182, 4, 0.15);
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.2), rgba(249, 155, 4, 0.1));
  border: 2px solid rgba(251, 182, 4, 0.3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fbb604;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  ${DocumentCard}:hover & {
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.3), rgba(249, 155, 4, 0.2));
    border-color: #fbb604;
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &.primary {
    background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
    color: #000;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(251, 182, 4, 0.3);
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
`;


const documentTypes = [
  {
    id: "invoices",
    title: "Invoices & Proposals",
    description: "Create professional invoices and project proposals with milestone-based billing and automatic calculations.",
    icon: FaFileInvoiceDollar,
    color: "#fbb604",
    available: true
  },
  {
    id: "employment",
    title: "Employment Documents",
    description: "Generate job offers, employment contracts, salary slips, and performance review templates.",
    icon: FaUserTie,
    color: "#4CAF50",
    available: true
  },
  {
    id: "legal",
    title: "Legal Documents",
    description: "Create NDAs, service agreements, terms of service, and other legal documentation.",
    icon: FaGavel,
    color: "#9C27B0",
    available: true
  },
  {
    id: "financial",
    title: "Financial Documents", 
    description: "Generate payroll slips, salary statements, WHT calculations, bonus payments, and financial reports.",
    icon: FaMoneyBillWave,
    color: "#FF5722",
    available: true
  },
  {
    id: "government",
    title: "Government Forms",
    description: "Create official letterheads, government correspondence, and regulatory compliance documents.",
    icon: FaBuilding,
    color: "#2196F3",
    available: true
  }
];

const AdminDocuments = () => {
  const [activeCreator, setActiveCreator] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);

  const handleCreateDocument = (documentType) => {
    if (documentType === "invoices") {
      setActiveCreator("invoice");
    } else if (documentType === "employment") {
      setActiveCreator("jobOffer"); // Open Job Offer Letter directly
    } else if (documentType === "financial") {
      setSelectedDocumentType("financial"); // Show Financial Documents selection dialog
    } else if (documentType === "legal") {
      setSelectedDocumentType("legal"); // Show Legal Documents selection dialog
    } else if (documentType === "government") {
      setActiveCreator("letterhead");
    } else {
      // For future document types
      console.log(`Creating ${documentType} document`);
    }
  };

  const handleEmploymentDocumentSelect = (docType) => {
    setActiveCreator(docType);
    setSelectedDocumentType(null);
  };

  const handleFinancialDocumentSelect = (docType) => {
    setActiveCreator(docType);
    setSelectedDocumentType(null);
  };

  const handleLegalDocumentSelect = (docType) => {
    setActiveCreator(docType);
    setSelectedDocumentType(null);
  };

  return (
    <DocumentsContainer>
      <Header>
        <h1>
          <FaFileInvoiceDollar className="icon" />
          Document Management
        </h1>
        <p>
          Create, manage, and track all your business documents from invoices to contracts. 
          Professional templates with automated calculations and PDF export.
        </p>
      </Header>

      <DocumentGrid>
        {documentTypes.map((docType, index) => (
          <DocumentCard
            key={docType.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CardIcon>
              <docType.icon />
            </CardIcon>
            
            <CardTitle>{docType.title}</CardTitle>
            <CardDescription>{docType.description}</CardDescription>
            
            <CardActions>
              <ActionButton
                className="primary"
                onClick={() => handleCreateDocument(docType.id)}
                disabled={!docType.available}
                style={{ 
                  opacity: docType.available ? 1 : 0.5,
                  cursor: docType.available ? 'pointer' : 'not-allowed'
                }}
              >
                <FaPlus />
                {docType.available ? 'Create New' : 'Coming Soon'}
              </ActionButton>
              
              {docType.available && (
                <ActionButton className="secondary">
                  <FaEye />
                  View All
                </ActionButton>
              )}
            </CardActions>
          </DocumentCard>
        ))}
      </DocumentGrid>

      <RecentDocuments />

      {/* Employment Document Selection Modal */}
      {selectedDocumentType === "employment" && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#0f0f0f',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Select Employment Document Type</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <ActionButton 
                className="primary" 
                onClick={() => handleEmploymentDocumentSelect('jobOffer')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaUserTie style={{ marginRight: '1rem' }} />
                Job Offer Letter
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleEmploymentDocumentSelect('employmentContract')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaFileContract style={{ marginRight: '1rem' }} />
                Employment Contract
              </ActionButton>
              <ActionButton 
                className="secondary" 
                onClick={() => setSelectedDocumentType(null)}
                style={{ justifyContent: 'center', padding: '0.75rem' }}
              >
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      )}

      {/* Financial Documents Selection Modal */}
      {selectedDocumentType === "financial" && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#0f0f0f',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Select Financial Document Type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <ActionButton 
                className="primary" 
                onClick={() => handleFinancialDocumentSelect('salarySlip')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaMoneyBillWave style={{ marginRight: '1rem' }} />
                Salary Slip Generator
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleFinancialDocumentSelect('payrollReport')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaFileInvoiceDollar style={{ marginRight: '1rem' }} />
                Payroll Report
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleFinancialDocumentSelect('bonusSlip')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaGavel style={{ marginRight: '1rem' }} />
                Bonus Slip Generator
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleFinancialDocumentSelect('expenseReport')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaBuilding style={{ marginRight: '1rem' }} />
                Expense Report
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleFinancialDocumentSelect('whtCalculator')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaGavel style={{ marginRight: '1rem' }} />
                WHT Calculator
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleFinancialDocumentSelect('taxStatement')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaFileContract style={{ marginRight: '1rem' }} />
                Tax Statement
              </ActionButton>
              <ActionButton 
                className="secondary" 
                onClick={() => setSelectedDocumentType(null)}
                style={{ justifyContent: 'center', padding: '0.75rem', gridColumn: 'span 2' }}
              >
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      )}

      {/* Legal Documents Selection Modal */}
      {selectedDocumentType === "legal" && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#0f0f0f',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Select Legal Document Type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <ActionButton 
                className="primary" 
                onClick={() => handleLegalDocumentSelect('nda')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaShieldAlt style={{ marginRight: '1rem' }} />
                NDA Generator
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleLegalDocumentSelect('serviceAgreement')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaHandshake style={{ marginRight: '1rem' }} />
                Service Agreement
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleLegalDocumentSelect('privacyPolicy')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaFileContract style={{ marginRight: '1rem' }} />
                Privacy Policy
              </ActionButton>
              <ActionButton 
                className="primary" 
                onClick={() => handleLegalDocumentSelect('termsOfService')}
                style={{ justifyContent: 'flex-start', padding: '1rem' }}
              >
                <FaGavel style={{ marginRight: '1rem' }} />
                Terms of Service
              </ActionButton>
              <ActionButton 
                className="secondary" 
                onClick={() => setSelectedDocumentType(null)}
                style={{ justifyContent: 'center', padding: '0.75rem', gridColumn: 'span 2' }}
              >
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      )}

      {/* Document Creators */}
      {activeCreator === "invoice" && (
        <InvoiceCreator 
          isOpen={true} 
          onClose={() => setActiveCreator(null)} 
        />
      )}

      {activeCreator === "letterhead" && (
        <LetterheadGenerator onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "salarySlip" && (
        <SalarySlipGenerator onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "jobOffer" && (
        <JobOfferGenerator onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "payrollReport" && (
        <PayrollReportGenerator isOpen={true} onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "whtCalculator" && (
        <WHTCalculatorGenerator isOpen={true} onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "employmentContract" && (
        <EmploymentContractGenerator isOpen={true} onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "bonusSlip" && (
        <BonusSlipGenerator isOpen={true} onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "expenseReport" && (
        <ExpenseReportGenerator isOpen={true} onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "taxStatement" && (
        <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
          Tax Statement Generator - Coming Soon
        </div>
      )}

      {activeCreator === "nda" && (
        <NDAGenerator isOpen={true} onClose={() => setActiveCreator(null)} />
      )}

      {activeCreator === "serviceAgreement" && (
        <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
          Service Agreement Generator - Coming Soon
        </div>
      )}

      {activeCreator === "privacyPolicy" && (
        <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
          Privacy Policy Generator - Coming Soon
        </div>
      )}

      {activeCreator === "termsOfService" && (
        <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
          Terms of Service Generator - Coming Soon
        </div>
      )}
    </DocumentsContainer>
  );
};

export default AdminDocuments;