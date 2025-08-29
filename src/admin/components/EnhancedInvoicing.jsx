import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileInvoiceDollar, FaPlus, FaEdit, FaTrash, FaEye, FaSearch,
  FaUser, FaBuilding, FaClock, FaCalendarAlt, FaDollarSign, 
  FaFilter, FaSort, FaUsers, FaClipboardList, FaBell,
  FaChartLine, FaDownload, FaPrint, FaEnvelope, FaCog,
  FaUserTie, FaUserFriends, FaHistory, FaExclamationTriangle,
  FaCheck
} from "react-icons/fa";
import InvoiceViewer from "./InvoiceViewer";
import InvoiceCreator from "./InvoiceCreator";

const InvoicingContainer = styled.div`
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;

  .title-section {
    h1 {
      color: white;
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        color: #fbb604;
        font-size: 2rem;
      }
    }

    p {
      color: #888888;
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }

  .header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &.primary {
        background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
        color: white;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(251, 182, 4, 0.3);
        }
      }

      &.secondary {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cccccc;

        &:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }
      }
    }
  }
`;

const DashboardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.gradient || 'linear-gradient(135deg, #fbb604 0%, #f99b04 100%)'};
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .icon {
      width: 48px;
      height: 48px;
      background: ${props => props.iconBg || 'rgba(251, 182, 4, 0.1)'};
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => props.iconColor || '#fbb604'};
      font-size: 1.3rem;
    }

    .trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.8rem;
      font-weight: 600;
      
      &.up {
        color: #10b981;
      }
      
      &.down {
        color: #ef4444;
      }
    }
  }

  .stat-content {
    .title {
      color: #cccccc;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      color: white;
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.25rem;
    }

    .subtitle {
      color: #888888;
      font-size: 0.85rem;
    }
  }
`;

const TabNavigation = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  button {
    padding: 0.75rem 1.5rem;
    background: ${props => props.active ? 'linear-gradient(135deg, #fbb604 0%, #f99b04 100%)' : 'transparent'};
    border: none;
    border-radius: 8px;
    color: ${props => props.active ? 'white' : '#cccccc'};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;

    &:hover {
      color: white;
      background: ${props => props.active ? 'linear-gradient(135deg, #f99b04 0%, #fbb604 100%)' : 'rgba(255, 255, 255, 0.05)'};
    }
  }
`;

const ContentSection = styled.div`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    h3 {
      color: white;
      font-size: 1.4rem;
      font-weight: 700;
      margin: 0;
    }

    .icon {
      color: #fbb604;
      font-size: 1.2rem;
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const SearchAndFilters = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  margin-bottom: 2rem;

  .search-box {
    position: relative;

    input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: white;
      font-size: 0.9rem;

      &:focus {
        outline: none;
        border-color: rgba(251, 182, 4, 0.5);
        background: rgba(255, 255, 255, 0.08);
      }

      &::placeholder {
        color: #666666;
      }
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666666;
    }
  }

  select {
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: white;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: rgba(251, 182, 4, 0.5);
    }

    option {
      background: #0f0f0f;
      color: white;
    }
  }

  .action-button {
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: #cccccc;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: white;
    }
  }
`;

const DataTable = styled.div`
  .table-header {
    display: grid;
    grid-template-columns: ${props => props.$columns || 'repeat(7, 1fr) auto'};
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .header-cell {
      color: #cccccc;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      &:hover {
        color: #fbb604;
      }
    }
  }

  .table-body {
    max-height: 600px;
    overflow-y: auto;
  }
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: ${props => props.$columns || 'repeat(7, 1fr) auto'};
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .cell {
    color: white;
    font-size: 0.9rem;

    &.primary {
      font-weight: 600;
      color: #fbb604;
    }

    &.secondary {
      color: #cccccc;
    }

    &.amount {
      font-weight: 700;
      color: #10b981;
    }
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.8rem;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;

    &.paid {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    &.pending {
      background: rgba(251, 191, 36, 0.1);
      color: #fbbf24;
    }

    &.overdue {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    &.draft {
      background: rgba(156, 163, 175, 0.1);
      color: #9ca3af;
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;

    button {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.05);
      border: none;
      border-radius: 6px;
      color: #cccccc;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      &.view {
        &:hover {
          background: rgba(251, 182, 4, 0.1);
          color: #fbb604;
        }
      }

      &.edit {
        &:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
      }

      &.delete {
        &:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      }
    }
  }
`;

const EntityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(251, 182, 4, 0.3);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .entity-info {
      .name {
        color: white;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      .type {
        color: #fbb604;
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
    }

    .entity-status {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;

      &.active {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
      }

      &.inactive {
        background: rgba(156, 163, 175, 0.1);
        color: #9ca3af;
      }
    }
  }

  .card-details {
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;

      .label {
        color: #888888;
      }

      .value {
        color: #cccccc;
        font-weight: 500;
      }
    }
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);

    button {
      flex: 1;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border: none;
      border-radius: 6px;
      color: #cccccc;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(251, 182, 4, 0.1);
        color: #fbb604;
      }
    }
  }
`;

const EntityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const AlertCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;

  .alert-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;

    .icon {
      color: #ef4444;
      font-size: 1rem;
    }

    .title {
      color: white;
      font-weight: 600;
      font-size: 0.95rem;
    }
  }

  .alert-message {
    color: #fca5a5;
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const EnhancedInvoicing = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoiceCreator, setShowInvoiceCreator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Sample data - would come from API in real implementation
  const [invoices] = useState([
    {
      id: 1,
      number: 'INV-2024-001',
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      type: 'Employee',
      projectName: 'December 2024 Salary',
      amount: 5500,
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-02-15',
      items: [
        { description: 'Monthly Salary - Senior Developer', quantity: 1, rate: 5500, amount: 5500 }
      ],
      subtotal: 5500,
      taxRate: 0,
      taxAmount: 0,
      total: 5500
    },
    {
      id: 2,
      number: 'INV-2024-002',
      clientName: 'TechCorp Solutions',
      clientEmail: 'billing@techcorp.com',
      type: 'Client',
      projectName: 'Website Redesign',
      amount: 42369,
      status: 'pending',
      date: '2024-01-20',
      dueDate: '2024-02-20',
      items: [
        { description: 'Frontend Development - React.js Setup & Configuration', quantity: 15, rate: 150, amount: 2250 },
        { description: 'Frontend Development - Component Architecture & Routing', quantity: 20, rate: 150, amount: 3000 },
        { description: 'Frontend Development - Responsive Design Implementation', quantity: 12, rate: 150, amount: 1800 },
        { description: 'Frontend Development - State Management & Context API', quantity: 18, rate: 150, amount: 2700 },
        { description: 'Backend Development - API Design & Development', quantity: 25, rate: 175, amount: 4375 },
        { description: 'Backend Development - Database Schema & Implementation', quantity: 15, rate: 175, amount: 2625 },
        { description: 'Backend Development - Authentication & Security', quantity: 12, rate: 175, amount: 2100 },
        { description: 'Backend Development - Testing & Quality Assurance', quantity: 10, rate: 175, amount: 1750 },
        { description: 'UI/UX Design - User Research & Personas', quantity: 8, rate: 125, amount: 1000 },
        { description: 'UI/UX Design - Wireframing & Prototyping', quantity: 12, rate: 125, amount: 1500 },
        { description: 'UI/UX Design - Visual Design & Branding', quantity: 15, rate: 125, amount: 1875 },
        { description: 'UI/UX Design - User Testing & Feedback Integration', quantity: 6, rate: 125, amount: 750 },
        { description: 'DevOps & Deployment - CI/CD Pipeline Setup', quantity: 8, rate: 200, amount: 1600 },
        { description: 'DevOps & Deployment - Cloud Infrastructure Configuration', quantity: 6, rate: 200, amount: 1200 },
        { description: 'DevOps & Deployment - Performance Optimization', quantity: 4, rate: 200, amount: 800 },
        { description: 'Project Management - Sprint Planning & Coordination', quantity: 20, rate: 100, amount: 2000 },
        { description: 'Project Management - Client Communication & Updates', quantity: 10, rate: 100, amount: 1000 },
        { description: 'Documentation - Technical Documentation & API Docs', quantity: 8, rate: 125, amount: 1000 },
        { description: 'Documentation - User Manual & Training Materials', quantity: 6, rate: 125, amount: 750 },
        { description: 'Quality Assurance - Manual Testing & Bug Fixes', quantity: 15, rate: 150, amount: 2250 },
        { description: 'Quality Assurance - Automated Testing Implementation', quantity: 12, rate: 150, amount: 1800 },
        { description: 'Third-party Integrations - Payment Gateway Setup', quantity: 8, rate: 175, amount: 1400 },
        { description: 'Third-party Integrations - Analytics & Monitoring Tools', quantity: 4, rate: 175, amount: 700 },
        { description: 'SEO Optimization - Technical SEO Implementation', quantity: 6, rate: 125, amount: 750 },
        { description: 'SEO Optimization - Content Strategy & Meta Tags', quantity: 4, rate: 125, amount: 500 },
        { description: 'Security Audit - Vulnerability Assessment', quantity: 6, rate: 200, amount: 1200 },
        { description: 'Security Audit - Security Best Practices Implementation', quantity: 4, rate: 200, amount: 800 },
        { description: 'Training & Knowledge Transfer - Developer Training Session', quantity: 4, rate: 150, amount: 600 },
        { description: 'Training & Knowledge Transfer - Client Admin Training', quantity: 2, rate: 150, amount: 300 },
        { description: 'Post-Launch Support - Bug Fixes & Minor Enhancements', quantity: 10, rate: 150, amount: 1500 }
      ],
      subtotal: 52875,
      taxRate: 8.5,
      taxAmount: 4494.38,
      discount: 15000,
      total: 42369
    },
    {
      id: 3,
      number: 'INV-2024-003',
      clientName: 'Sarah Wilson',
      clientEmail: 'sarah.wilson@company.com',
      type: 'Employee',
      projectName: 'January 2024 Hours',
      amount: 3200,
      status: 'overdue',
      date: '2024-01-05',
      dueDate: '2024-01-20',
      items: [
        { description: 'Hourly Work - Junior Developer', quantity: 80, rate: 40, amount: 3200 }
      ],
      subtotal: 3200,
      taxRate: 0,
      taxAmount: 0,
      total: 3200
    }
  ]);

  const [employees] = useState([
    {
      id: 1,
      employeeId: 'EMP-001',
      name: 'John Doe',
      email: 'john@revolvo.tech',
      position: 'Senior Developer',
      dateOfJoining: '2022-03-15',
      type: 'salary',
      salary: 5500,
      hourlyRate: null,
      grossEarnings: 66000, // Annual gross
      federalTax: 9240, // 14% federal
      stateTax: 3300, // 5% state
      socialSecurity: 4092, // 6.2%
      medicare: 957, // 1.45%
      healthInsurance: 2400, // Annual deduction
      retirement401k: 3960, // 6% contribution
      netEarnings: 42051, // After all deductions
      status: 'active',
      nextInvoice: '2024-02-01',
      totalInvoiced: 33000,
      phone: '(555) 123-4567',
      address: '123 Developer St, Tech City, CA 90210'
    },
    {
      id: 2,
      employeeId: 'EMP-002',
      name: 'Sarah Wilson',
      email: 'sarah@revolvo.tech',
      position: 'Junior Developer',
      dateOfJoining: '2023-07-10',
      type: 'hourly',
      salary: null,
      hourlyRate: 40,
      grossEarnings: 41600, // Annual gross (40 hrs/week * 52 weeks * $20)
      federalTax: 4992, // 12% federal
      stateTax: 2080, // 5% state
      socialSecurity: 2579, // 6.2%
      medicare: 603, // 1.45%
      healthInsurance: 1800, // Annual deduction
      retirement401k: 2496, // 6% contribution
      netEarnings: 27050, // After all deductions
      status: 'active',
      nextInvoice: '2024-02-15',
      totalInvoiced: 12800,
      phone: '(555) 234-5678',
      address: '456 Code Ave, Dev Town, CA 90211'
    },
    {
      id: 3,
      employeeId: 'EMP-003',
      name: 'Mike Johnson',
      email: 'mike@revolvo.tech',
      position: 'UI/UX Designer',
      dateOfJoining: '2023-01-20',
      type: 'contract',
      salary: null,
      hourlyRate: 65,
      grossEarnings: 33800, // Annual gross (10 hrs/week * 52 weeks * $65)
      federalTax: 4056, // 12% federal
      stateTax: 1690, // 5% state
      socialSecurity: 2096, // 6.2%
      medicare: 490, // 1.45%
      healthInsurance: 0, // Not provided for contractors
      retirement401k: 0, // Not provided for contractors
      netEarnings: 25468, // After all deductions
      status: 'inactive',
      nextInvoice: null,
      totalInvoiced: 8500,
      phone: '(555) 345-6789',
      address: '789 Design Blvd, Art City, CA 90212'
    }
  ]);

  const [clients] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'billing@techcorp.com',
      contactPerson: 'David Smith',
      industry: 'Technology',
      status: 'active',
      nextInvoice: '2024-02-10',
      totalInvoiced: 75000,
      phone: '(555) 987-6543',
      address: '100 Business Park, Corp City, CA 90220'
    },
    {
      id: 2,
      name: 'StartupXYZ',
      email: 'founders@startupxyz.com',
      contactPerson: 'Lisa Chen',
      industry: 'Fintech',
      status: 'active',
      nextInvoice: '2024-02-05',
      totalInvoiced: 45000,
      phone: '(555) 456-7890',
      address: '250 Innovation Dr, Startup Valley, CA 90221'
    },
    {
      id: 3,
      name: 'Legacy Corp',
      email: 'procurement@legacycorp.com',
      contactPerson: 'Robert Brown',
      industry: 'Manufacturing',
      status: 'inactive',
      nextInvoice: null,
      totalInvoiced: 25000,
      phone: '(555) 654-3210',
      address: '500 Industrial Blvd, Factory Town, CA 90222'
    }
  ]);

  const stats = [
    {
      title: 'Total Outstanding',
      value: '$15,700',
      subtitle: '3 pending invoices',
      icon: <FaDollarSign />,
      trend: { value: '+5.2%', direction: 'up' },
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      iconBg: 'rgba(239, 68, 68, 0.1)',
      iconColor: '#ef4444'
    },
    {
      title: 'Monthly Revenue',
      value: '$28,400',
      subtitle: 'January 2024',
      icon: <FaChartLine />,
      trend: { value: '+12.8%', direction: 'up' },
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981'
    },
    {
      title: 'Active Clients',
      value: '24',
      subtitle: '5 new this month',
      icon: <FaUserFriends />,
      trend: { value: '+8.1%', direction: 'up' },
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      iconBg: 'rgba(59, 130, 246, 0.1)',
      iconColor: '#3b82f6'
    },
    {
      title: 'Team Members',
      value: '12',
      subtitle: '8 active invoices',
      icon: <FaUserTie />,
      trend: { value: '+2', direction: 'up' },
      gradient: 'linear-gradient(135deg, #fbb604 0%, #f99b04 100%)',
      iconBg: 'rgba(251, 182, 4, 0.1)',
      iconColor: '#fbb604'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesType = typeFilter === 'all' || invoice.type.toLowerCase() === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const overdueInvoices = invoices.filter(invoice => invoice.status === 'overdue');
  const upcomingInvoices = [...employees, ...clients]
    .filter(entity => entity.nextInvoice && entity.status === 'active')
    .sort((a, b) => new Date(a.nextInvoice) - new Date(b.nextInvoice));

  const getNextInvoiceDays = (nextInvoice) => {
    const days = Math.ceil((new Date(nextInvoice) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const renderInvoicesTab = () => (
    <ContentSection>
      <SectionHeader>
        <div className="title">
          <FaFileInvoiceDollar className="icon" />
          <h3>Invoice Management</h3>
        </div>
        <div className="actions">
          <button className="secondary">
            <FaDownload /> Export
          </button>
          <button className="primary" onClick={() => setShowInvoiceCreator(true)}>
            <FaPlus /> Create Invoice
          </button>
        </div>
      </SectionHeader>

      {overdueInvoices.length > 0 && (
        <AlertCard>
          <div className="alert-header">
            <FaExclamationTriangle className="icon" />
            <div className="title">Overdue Invoices Alert</div>
          </div>
          <div className="alert-message">
            You have {overdueInvoices.length} overdue invoice(s) totaling ${overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}. 
            Consider sending payment reminders or following up with clients.
          </div>
        </AlertCard>
      )}

      <SearchAndFilters>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search invoices by client, number, or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="employee">Employee</option>
          <option value="client">Client</option>
        </select>
        <div className="action-button">
          <FaFilter /> Filters
        </div>
      </SearchAndFilters>

      <DataTable $columns="1.2fr 1fr 1fr 1fr 1fr 1fr 0.8fr auto">
        <div className="table-header">
          <div className="header-cell">Invoice #</div>
          <div className="header-cell">Client/Employee</div>
          <div className="header-cell">Project</div>
          <div className="header-cell">Amount</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Date</div>
          <div className="header-cell">Due</div>
          <div className="header-cell">Actions</div>
        </div>
        <div className="table-body">
          {filteredInvoices.map(invoice => (
            <TableRow key={invoice.id} $columns="1.2fr 1fr 1fr 1fr 1fr 1fr 0.8fr auto">
              <div className="cell primary">{invoice.number}</div>
              <div className="cell">{invoice.clientName}</div>
              <div className="cell secondary">{invoice.projectName}</div>
              <div className="cell amount">${invoice.amount.toLocaleString()}</div>
              <div className="cell">
                <span className={`status ${invoice.status}`}>
                  {invoice.status === 'paid' && <FaCheck />}
                  {invoice.status === 'pending' && <FaClock />}
                  {invoice.status === 'overdue' && <FaExclamationTriangle />}
                  {invoice.status}
                </span>
              </div>
              <div className="cell secondary">{new Date(invoice.date).toLocaleDateString()}</div>
              <div className="cell secondary">{new Date(invoice.dueDate).toLocaleDateString()}</div>
              <div className="actions">
                <button className="view" onClick={() => setSelectedInvoice(invoice)} title="View">
                  <FaEye />
                </button>
                <button className="edit" title="Edit">
                  <FaEdit />
                </button>
                <button className="delete" title="Delete">
                  <FaTrash />
                </button>
              </div>
            </TableRow>
          ))}
        </div>
      </DataTable>
    </ContentSection>
  );

  const renderEmployeesTab = () => (
    <ContentSection>
      <SectionHeader>
        <div className="title">
          <FaUserTie className="icon" />
          <h3>Employee Management</h3>
        </div>
        <div className="actions">
          <button className="secondary">
            <FaDownload /> Export List
          </button>
          <button className="primary">
            <FaPlus /> Add Employee
          </button>
        </div>
      </SectionHeader>

      <EntityGrid>
        {employees.map(employee => (
          <EntityCard key={employee.id}>
            <div className="card-header">
              <div className="entity-info">
                <div className="name">{employee.name}</div>
                <div className="type">{employee.type} • {employee.position}</div>
              </div>
              <div className={`entity-status ${employee.status}`}>
                {employee.status}
              </div>
            </div>
            <div className="card-details">
              <div className="detail-row">
                <span className="label">Employee ID:</span>
                <span className="value">{employee.employeeId}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{employee.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date of Joining:</span>
                <span className="value">{new Date(employee.dateOfJoining).toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span className="label">
                  {employee.type === 'salary' ? 'Monthly Salary:' : 'Hourly Rate:'}
                </span>
                <span className="value">
                  ${employee.salary || employee.hourlyRate}{employee.type === 'hourly' ? '/hr' : ''}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Gross Earnings (Annual):</span>
                <span className="value">${employee.grossEarnings?.toLocaleString() || 0}</span>
              </div>
              <div className="detail-row">
                <span className="label">Net Earnings (Annual):</span>
                <span className="value" style={{ color: '#10b981', fontWeight: '600' }}>
                  ${employee.netEarnings?.toLocaleString() || 0}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Tax Deductions:</span>
                <span className="value" style={{ color: '#ef4444' }}>
                  ${((employee.federalTax || 0) + (employee.stateTax || 0)).toLocaleString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Benefits:</span>
                <span className="value">
                  ${((employee.healthInsurance || 0) + (employee.retirement401k || 0)).toLocaleString()}
                </span>
              </div>
              {employee.nextInvoice && (
                <div className="detail-row">
                  <span className="label">Next Invoice:</span>
                  <span className="value">
                    {getNextInvoiceDays(employee.nextInvoice)} days
                  </span>
                </div>
              )}
            </div>
            <div className="card-actions">
              <button>
                <FaEye /> View
              </button>
              <button>
                <FaFileInvoiceDollar /> Invoice
              </button>
              <button>
                <FaClipboardList /> Salary Slip
              </button>
              <button>
                <FaEdit /> Edit
              </button>
            </div>
          </EntityCard>
        ))}
      </EntityGrid>
    </ContentSection>
  );

  const renderClientsTab = () => (
    <ContentSection>
      <SectionHeader>
        <div className="title">
          <FaUserFriends className="icon" />
          <h3>Client Management</h3>
        </div>
        <div className="actions">
          <button className="secondary">
            <FaDownload /> Export List
          </button>
          <button className="primary">
            <FaPlus /> Add Client
          </button>
        </div>
      </SectionHeader>

      <EntityGrid>
        {clients.map(client => (
          <EntityCard key={client.id}>
            <div className="card-header">
              <div className="entity-info">
                <div className="name">{client.name}</div>
                <div className="type">{client.industry} • {client.contactPerson}</div>
              </div>
              <div className={`entity-status ${client.status}`}>
                {client.status}
              </div>
            </div>
            <div className="card-details">
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{client.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Contact:</span>
                <span className="value">{client.contactPerson}</span>
              </div>
              <div className="detail-row">
                <span className="label">Total Invoiced:</span>
                <span className="value">${client.totalInvoiced.toLocaleString()}</span>
              </div>
              {client.nextInvoice && (
                <div className="detail-row">
                  <span className="label">Next Invoice:</span>
                  <span className="value">
                    {getNextInvoiceDays(client.nextInvoice)} days
                  </span>
                </div>
              )}
            </div>
            <div className="card-actions">
              <button>
                <FaEye /> View
              </button>
              <button>
                <FaFileInvoiceDollar /> Invoice
              </button>
              <button>
                <FaEnvelope /> Email
              </button>
            </div>
          </EntityCard>
        ))}
      </EntityGrid>
    </ContentSection>
  );

  const renderScheduleTab = () => (
    <ContentSection>
      <SectionHeader>
        <div className="title">
          <FaCalendarAlt className="icon" />
          <h3>Invoice Schedule & Automation</h3>
        </div>
        <div className="actions">
          <button className="secondary">
            <FaCog /> Settings
          </button>
          <button className="primary">
            <FaBell /> Setup Automation
          </button>
        </div>
      </SectionHeader>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: 'white', marginBottom: '1rem' }}>Upcoming Invoices</h4>
        <DataTable $columns="1fr 1fr 1fr 1fr auto">
          <div className="table-header">
            <div className="header-cell">Entity</div>
            <div className="header-cell">Type</div>
            <div className="header-cell">Amount</div>
            <div className="header-cell">Due Date</div>
            <div className="header-cell">Actions</div>
          </div>
          <div className="table-body">
            {upcomingInvoices.slice(0, 5).map((entity, index) => (
              <TableRow key={index} $columns="1fr 1fr 1fr 1fr auto">
                <div className="cell primary">{entity.name}</div>
                <div className="cell">{entity.position || entity.industry}</div>
                <div className="cell amount">
                  ${(entity.salary || entity.hourlyRate * 160 || 5000).toLocaleString()}
                </div>
                <div className="cell">
                  {getNextInvoiceDays(entity.nextInvoice)} days
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>
                    {new Date(entity.nextInvoice).toLocaleDateString()}
                  </div>
                </div>
                <div className="actions">
                  <button className="view" title="Preview">
                    <FaEye />
                  </button>
                  <button className="edit" title="Generate Now">
                    <FaFileInvoiceDollar />
                  </button>
                </div>
              </TableRow>
            ))}
          </div>
        </DataTable>
      </div>

      <div>
        <h4 style={{ color: 'white', marginBottom: '1rem' }}>Automation Rules</h4>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '1.5rem',
          color: '#cccccc'
        }}>
          <p>• Salary invoices: Auto-generate on 1st of each month</p>
          <p>• Client invoices: Send reminders 7 days before due date</p>
          <p>• Overdue notices: Send automatically after 3 days past due</p>
          <p>• Monthly reports: Email summary to admin@revolvo.tech</p>
        </div>
      </div>
    </ContentSection>
  );

  return (
    <InvoicingContainer>
      <PageHeader>
        <div className="title-section">
          <h1>
            <FaFileInvoiceDollar className="icon" />
            Invoicing System
          </h1>
          <p>Comprehensive invoice management for employees, clients, and automated billing</p>
        </div>
        <div className="header-actions">
          <button className="secondary">
            <FaCog /> Settings
          </button>
          <button className="primary" onClick={() => setShowInvoiceCreator(true)}>
            <FaPlus /> Create Invoice
          </button>
        </div>
      </PageHeader>

      <DashboardStats>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            gradient={stat.gradient}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-header">
              <div className="icon">{stat.icon}</div>
              <div className={`trend ${stat.trend.direction}`}>
                {stat.trend.direction === 'up' ? '↗' : '↘'} {stat.trend.value}
              </div>
            </div>
            <div className="stat-content">
              <div className="title">{stat.title}</div>
              <div className="value">{stat.value}</div>
              <div className="subtitle">{stat.subtitle}</div>
            </div>
          </StatCard>
        ))}
      </DashboardStats>

      <TabNavigation>
        <button 
          active={activeTab === 'invoices'} 
          onClick={() => setActiveTab('invoices')}
        >
          <FaFileInvoiceDollar />
          Invoices
        </button>
        <button 
          active={activeTab === 'employees'} 
          onClick={() => setActiveTab('employees')}
        >
          <FaUserTie />
          Employees
        </button>
        <button 
          active={activeTab === 'clients'} 
          onClick={() => setActiveTab('clients')}
        >
          <FaUserFriends />
          Clients
        </button>
        <button 
          active={activeTab === 'schedule'} 
          onClick={() => setActiveTab('schedule')}
        >
          <FaCalendarAlt />
          Schedule & Automation
        </button>
      </TabNavigation>

      <AnimatePresence mode="wait">
        {activeTab === 'invoices' && renderInvoicesTab()}
        {activeTab === 'employees' && renderEmployeesTab()}
        {activeTab === 'clients' && renderClientsTab()}
        {activeTab === 'schedule' && renderScheduleTab()}
      </AnimatePresence>

      <AnimatePresence>
        {showInvoiceCreator && (
          <InvoiceCreator
            isOpen={showInvoiceCreator}
            onClose={() => setShowInvoiceCreator(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedInvoice && (
          <InvoiceViewer
            invoice={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        )}
      </AnimatePresence>
    </InvoicingContainer>
  );
};

export default EnhancedInvoicing;