import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers, FaPlus, FaSearch, FaFilter, FaStar, 
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaEdit, FaTrash,
  FaDollarSign, FaFileInvoiceDollar, FaCalendarAlt, FaTimes
} from "react-icons/fa";
import RevolvoCard from "../components/RevolvoCard";

const ContactsContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  background: #0a0a0a;
`;

const ContactsSidebar = styled.div`
  width: 350px;
  background: #0f0f0f;
  border-right: 1px solid rgba(251, 182, 4, 0.1);
  display: flex;
  flex-direction: column;
`;

const ContactsMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
`;

const SidebarHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .icon {
      color: #fbb604;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  .search-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:focus-within {
      border-color: rgba(251, 182, 4, 0.3);
      background: rgba(255, 255, 255, 0.08);
    }
    
    input {
      flex: 1;
      background: none;
      border: none;
      color: white;
      outline: none;
      font-size: 0.9rem;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    .search-icon {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(251, 182, 4, 0.3);
  }
`;

const FilterTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FilterTab = styled.button`
  padding: 0.75rem 1rem;
  background: ${props => props.active ? 'rgba(251, 182, 4, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'rgba(251, 182, 4, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? '#fbb604' : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  
  &:hover {
    background: rgba(251, 182, 4, 0.05);
    color: #fbb604;
  }
  
  .count {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
  }
`;

const ContactsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem 1rem;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(251, 182, 4, 0.5);
    }
  }
`;

const ContactItem = styled(motion.div)`
  padding: 1rem;
  background: ${props => props.active ? 'rgba(251, 182, 4, 0.1)' : 'rgba(255, 255, 255, 0.02)'};
  border: 1px solid ${props => props.active ? 'rgba(251, 182, 4, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 10px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(251, 182, 4, 0.05);
    border-color: rgba(251, 182, 4, 0.2);
    transform: translateX(4px);
  }
`;

const ContactAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  font-size: 1.1rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  flex: 1;
  
  .name {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .star {
      color: ${props => props.starred ? '#fbb604' : 'rgba(255, 255, 255, 0.3)'};
      cursor: pointer;
      
      &:hover {
        color: #fbb604;
      }
    }
  }
  
  .details {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .company {
    color: rgba(251, 182, 4, 0.8);
  }
`;

const ContactDetails = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  .contact-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-weight: 700;
    font-size: 2rem;
    margin-right: 1.5rem;
  }
  
  .contact-info {
    flex: 1;
    
    .name {
      color: white;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .star {
        color: ${props => props.starred ? '#fbb604' : 'rgba(255, 255, 255, 0.3)'};
        cursor: pointer;
        font-size: 1.5rem;
        
        &:hover {
          color: #fbb604;
        }
      }
    }
    
    .company {
      color: rgba(251, 182, 4, 0.8);
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    
    .contact-methods {
      display: flex;
      gap: 1.5rem;
      
      .method {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.95rem;
        
        .icon {
          color: #fbb604;
        }
      }
    }
  }
  
  .actions {
    display: flex;
    gap: 1rem;
  }
`;

const ActionButton = styled.button`
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.edit {
    background: rgba(251, 182, 4, 0.1);
    color: #fbb604;
    
    &:hover {
      background: rgba(251, 182, 4, 0.2);
      transform: translateY(-2px);
    }
  }
  
  &.delete {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    
    &:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: translateY(-2px);
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.2), rgba(249, 155, 4, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: #fbb604;
    font-size: 1.5rem;
  }
  
  .value {
    color: white;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }
`;

// Mock data - replace with real data
const mockContacts = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@acmecorp.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    starred: true,
    type: "Client",
    invoiceCount: 5,
    totalValue: 15000,
    lastContact: "2 days ago"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@techstartup.com",
    phone: "+1 (555) 987-6543",
    company: "Tech Startup Inc",
    starred: false,
    type: "Prospect",
    invoiceCount: 2,
    totalValue: 8500,
    lastContact: "1 week ago"
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@digitalagency.com", 
    phone: "+1 (555) 456-7890",
    company: "Digital Agency LLC",
    starred: false,
    type: "Client",
    invoiceCount: 3,
    totalValue: 4200,
    lastContact: "3 days ago"
  }
];

const AdminContacts = () => {
  const [contacts] = useState(mockContacts);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { key: "all", label: "All Contacts", icon: FaUsers, count: contacts.length },
    { key: "clients", label: "Clients", icon: FaUser, count: contacts.filter(c => c.type === "Client").length },
    { key: "prospects", label: "Prospects", icon: FaBuilding, count: contacts.filter(c => c.type === "Prospect").length },
    { key: "starred", label: "Starred", icon: FaStar, count: contacts.filter(c => c.starred).length }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeFilter) {
      case "clients":
        return matchesSearch && contact.type === "Client";
      case "prospects":
        return matchesSearch && contact.type === "Prospect";
      case "starred":
        return matchesSearch && contact.starred;
      default:
        return matchesSearch;
    }
  });

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const toggleStar = (contactId) => {
    // In real app, this would update the contact
    console.log("Toggle star for contact:", contactId);
  };

  return (
    <ContactsContainer>
      <ContactsSidebar>
        <SidebarHeader>
          <h2>
            <FaUsers className="icon" />
            Contacts
          </h2>
          
          <SearchContainer>
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <AddButton>
              <FaPlus />
              Add
            </AddButton>
          </SearchContainer>
          
          <FilterTabs>
            {filterOptions.map((filter) => (
              <FilterTab
                key={filter.key}
                active={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
              >
                <filter.icon />
                {filter.label}
                <span className="count">{filter.count}</span>
              </FilterTab>
            ))}
          </FilterTabs>
        </SidebarHeader>
        
        <ContactsList>
          <AnimatePresence>
            {filteredContacts.map((contact) => (
              <ContactItem
                key={contact.id}
                active={selectedContact?.id === contact.id}
                onClick={() => setSelectedContact(contact)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ContactAvatar>
                    {getInitials(contact.firstName, contact.lastName)}
                  </ContactAvatar>
                  
                  <ContactInfo starred={contact.starred}>
                    <div className="name">
                      {contact.firstName} {contact.lastName}
                      <FaStar 
                        className="star"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(contact.id);
                        }}
                      />
                    </div>
                    <div className="details">
                      <div className="company">{contact.company}</div>
                      <div>{contact.email}</div>
                      <div>{contact.phone}</div>
                    </div>
                  </ContactInfo>
                </div>
              </ContactItem>
            ))}
          </AnimatePresence>
        </ContactsList>
      </ContactsSidebar>
      
      <ContactsMain>
        {selectedContact ? (
          <ContactDetails>
            <DetailHeader starred={selectedContact.starred}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="contact-avatar">
                  {getInitials(selectedContact.firstName, selectedContact.lastName)}
                </div>
                
                <div className="contact-info">
                  <div className="name">
                    {selectedContact.firstName} {selectedContact.lastName}
                    <FaStar 
                      className="star"
                      onClick={() => toggleStar(selectedContact.id)}
                    />
                  </div>
                  <div className="company">{selectedContact.company}</div>
                  <div className="contact-methods">
                    <div className="method">
                      <FaEnvelope className="icon" />
                      {selectedContact.email}
                    </div>
                    <div className="method">
                      <FaPhone className="icon" />
                      {selectedContact.phone}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="actions">
                <ActionButton className="edit">
                  <FaEdit />
                </ActionButton>
                <ActionButton className="delete">
                  <FaTrash />
                </ActionButton>
              </div>
            </DetailHeader>
            
            <StatsGrid>
              <StatCard>
                <div className="icon">
                  <FaFileInvoiceDollar />
                </div>
                <div className="value">{selectedContact.invoiceCount}</div>
                <div className="label">Invoices Sent</div>
              </StatCard>
              
              <StatCard>
                <div className="icon">
                  <FaDollarSign />
                </div>
                <div className="value">${selectedContact.totalValue.toLocaleString()}</div>
                <div className="label">Total Value</div>
              </StatCard>
              
              <StatCard>
                <div className="icon">
                  <FaCalendarAlt />
                </div>
                <div className="value">{selectedContact.lastContact}</div>
                <div className="label">Last Contact</div>
              </StatCard>
            </StatsGrid>
            
            <RevolvoCard 
              title="Recent Activity" 
              subtitle="Latest interactions and transactions"
            >
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                Activity timeline will be implemented here
              </div>
            </RevolvoCard>
          </ContactDetails>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center'
          }}>
            <div>
              <FaUsers style={{ fontSize: '4rem', marginBottom: '1rem', color: 'rgba(251, 182, 4, 0.3)' }} />
              <h3>Select a contact</h3>
              <p>Choose a contact from the list to view details</p>
            </div>
          </div>
        )}
      </ContactsMain>
    </ContactsContainer>
  );
};

export default AdminContacts;