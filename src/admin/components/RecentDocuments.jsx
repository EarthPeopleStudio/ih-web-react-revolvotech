import React from 'react';
import styled from 'styled-components';
import { FaFileInvoiceDollar, FaDownload, FaEye, FaEdit, FaClock, FaDollarSign } from 'react-icons/fa';
import RevolvoCard from './RevolvoCard';

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(251, 182, 4, 0.05);
    border-color: rgba(251, 182, 4, 0.2);
    transform: translateX(4px);
  }
`;

const DocumentIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  
  &.invoice {
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.2), rgba(249, 155, 4, 0.1));
    color: #fbb604;
  }
  
  &.proposal {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(67, 160, 71, 0.1));
    color: #4caf50;
  }
`;

const DocumentInfo = styled.div`
  flex: 1;
  
  .title {
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .details {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
`;

const DocumentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${DocumentItem}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  
  &.view {
    background: rgba(30, 136, 229, 0.1);
    color: #1e88e5;
    
    &:hover {
      background: rgba(30, 136, 229, 0.2);
    }
  }
  
  &.download {
    background: rgba(76, 175, 80, 0.1);
    color: #4caf50;
    
    &:hover {
      background: rgba(76, 175, 80, 0.2);
    }
  }
  
  &.edit {
    background: rgba(251, 182, 4, 0.1);
    color: #fbb604;
    
    &:hover {
      background: rgba(251, 182, 4, 0.2);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.5);
  
  .empty-icon {
    font-size: 3rem;
    color: rgba(251, 182, 4, 0.3);
    margin-bottom: 1rem;
  }
  
  .empty-text {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .empty-subtext {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.3);
  }
`;

// Mock data - in real app this would come from API/state
const recentDocuments = [
  {
    id: 1,
    type: 'invoice',
    number: 'INV-240828-001',
    client: 'Acme Corp',
    amount: 2500,
    date: '2 hours ago',
    status: 'sent'
  },
  {
    id: 2,
    type: 'proposal', 
    number: 'PROP-240828-002',
    client: 'Tech Startup Inc',
    amount: 8500,
    date: '1 day ago',
    status: 'draft'
  },
  {
    id: 3,
    type: 'invoice',
    number: 'INV-240827-003',
    client: 'Digital Agency LLC',
    amount: 1200,
    date: '3 days ago',
    status: 'paid'
  }
];

const RecentDocuments = ({ limit = 5 }) => {
  const documents = recentDocuments.slice(0, limit);
  
  const formatCurrency = (amount) => `$${amount.toLocaleString()}`;
  
  const handleDocumentAction = (action, document) => {
    console.log(`${action} document:`, document);
    // Handle actions - view, download, edit
  };

  return (
    <RevolvoCard
      title="Recent Documents"
      subtitle="Latest invoices and proposals"
    >
      {documents.length > 0 ? (
        <TimelineContainer>
          {documents.map((doc) => (
            <DocumentItem key={doc.id}>
              <DocumentIcon className={doc.type}>
                <FaFileInvoiceDollar />
              </DocumentIcon>
              
              <DocumentInfo>
                <div className="title">
                  {doc.number} - {doc.client}
                </div>
                <div className="details">
                  <div className="detail-item">
                    <FaDollarSign />
                    {formatCurrency(doc.amount)}
                  </div>
                  <div className="detail-item">
                    <FaClock />
                    {doc.date}
                  </div>
                  <div className="detail-item">
                    <span style={{
                      background: doc.status === 'paid' ? '#4caf50' : 
                                doc.status === 'sent' ? '#fbb604' : '#666',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase'
                    }}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              </DocumentInfo>
              
              <DocumentActions>
                <ActionButton 
                  className="view"
                  onClick={() => handleDocumentAction('view', doc)}
                  title="View Document"
                >
                  <FaEye />
                </ActionButton>
                <ActionButton 
                  className="download"
                  onClick={() => handleDocumentAction('download', doc)}
                  title="Download PDF"
                >
                  <FaDownload />
                </ActionButton>
                <ActionButton 
                  className="edit"
                  onClick={() => handleDocumentAction('edit', doc)}
                  title="Edit Document"
                >
                  <FaEdit />
                </ActionButton>
              </DocumentActions>
            </DocumentItem>
          ))}
        </TimelineContainer>
      ) : (
        <EmptyState>
          <FaFileInvoiceDollar className="empty-icon" />
          <div className="empty-text">No documents yet</div>
          <div className="empty-subtext">Create your first invoice or proposal to get started</div>
        </EmptyState>
      )}
    </RevolvoCard>
  );
};

export default RecentDocuments;