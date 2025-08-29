import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import {
  FaHome, FaUsers, FaChartLine, FaCog, FaSignOutAlt, FaBell,
  FaArrowUp, FaArrowDown, FaDollarSign, FaShoppingCart,
  FaUserPlus, FaEye, FaCode, FaRocket, FaGlobe, FaServer,
  FaCheckCircle, FaExclamationTriangle, FaTimesCircle,
  FaCalendarAlt, FaDownload, FaFilter, FaSearch, FaFileInvoiceDollar
} from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown, HiOutlineDotsVertical } from "react-icons/hi";
import { BiDollar } from "react-icons/bi";
import { AdminContext } from "../AdminApp";
import AppSelector from "../components/AppSelector";
import ChoreoMetricsPanel from "../components/ChoreoMetricsPanel";
import ServiceCostsPanel from "../components/ServiceCostsPanel";
import DateRangePicker from "../components/DateRangePicker";
import { getAppData } from "../data/appData";
import AdminAnalytics from "./AdminAnalytics";
import AdminSettings from "./AdminSettings";
import AdminInvoicing from "./AdminInvoicing";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
`;

const Sidebar = styled.div`
  width: 260px;
  background: #0f0f0f;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 80px;
  }
`;

const Logo = styled.div`
  padding: 0 2rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
  }

  .text {
    font-weight: 800;
    font-size: 1.3rem;
    color: white;
    letter-spacing: -0.02em;

    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

const NavMenu = styled.nav`
  flex: 1;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  color: ${props => props.active ? '#fbb604' : '#888888'};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background: rgba(255, 107, 53, 0.05);
  }

  ${props => props.active && `
    background: rgba(251, 182, 4, 0.1);
    
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
    }
  `}

  .icon {
    font-size: 1.1rem;
  }

  .label {
    font-size: 0.95rem;
    font-weight: 500;

    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
`;

const TopBar = styled.div`
  height: 70px;
  background: #0f0f0f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  max-width: 500px;

  .search-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    transition: all 0.3s ease;

    &:focus-within {
      border-color: rgba(255, 107, 53, 0.3);
      background: rgba(255, 255, 255, 0.05);
    }

    input {
      flex: 1;
      background: none;
      border: none;
      color: white;
      font-size: 0.95rem;
      outline: none;

      &::placeholder {
        color: #666666;
      }
    }

    .icon {
      color: #666666;
    }
  }
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .notification {
    position: relative;
    color: #888888;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }

    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 18px;
      height: 18px;
      background: #fbb604;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
    }
  }

  .user-menu {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .name {
      color: white;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .dropdown {
      color: #666666;
    }
  }
`;

const Dashboard = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    color: white;
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  p {
    color: #888888;
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
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
    background: ${props => props.gradient || 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)'};
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .icon {
      width: 48px;
      height: 48px;
      background: ${props => props.iconBg || 'rgba(255, 107, 53, 0.1)'};
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => props.iconColor || '#ff6b35'};
      font-size: 1.3rem;
    }

    .menu {
      color: #666666;
      cursor: pointer;
      
      &:hover {
        color: #888888;
      }
    }
  }

  .content {
    .label {
      color: #888888;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .value {
      color: white;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .change {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;

      &.positive {
        color: #10b981;
      }

      &.negative {
        color: #ef4444;
      }

      .icon {
        font-size: 0.8rem;
      }
    }
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h3 {
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .actions {
      display: flex;
      gap: 1rem;

      button {
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        color: #888888;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        &.active {
          background: rgba(251, 182, 4, 0.1);
          border-color: rgba(251, 182, 4, 0.3);
          color: #fbb604;
        }
      }
    }
  }
`;

const TableCard = styled.div`
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h3 {
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
    }

    button {
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      th {
        padding: 1rem;
        text-align: left;
        color: #888888;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      }

      td {
        padding: 1rem;
        color: #cccccc;
        font-size: 0.95rem;

        &.status {
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;

            &.active {
              background: rgba(16, 185, 129, 0.1);
              color: #10b981;
            }

            &.pending {
              background: rgba(251, 191, 36, 0.1);
              color: #fbbf24;
            }

            &.inactive {
              background: rgba(239, 68, 68, 0.1);
              color: #ef4444;
            }
          }
        }
      }
    }
  }
`;

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 45000, profit: 12000, expenses: 33000 },
  { month: 'Feb', revenue: 52000, profit: 15000, expenses: 37000 },
  { month: 'Mar', revenue: 48000, profit: 13000, expenses: 35000 },
  { month: 'Apr', revenue: 61000, profit: 18000, expenses: 43000 },
  { month: 'May', revenue: 55000, profit: 16000, expenses: 39000 },
  { month: 'Jun', revenue: 67000, profit: 21000, expenses: 46000 },
  { month: 'Jul', revenue: 72000, profit: 24000, expenses: 48000 },
];

const projectData = [
  { name: 'Web Dev', value: 35, color: '#ff6b35' },
  { name: 'Mobile', value: 25, color: '#8e24aa' },
  { name: 'AI/ML', value: 20, color: '#1e88e5' },
  { name: 'Consulting', value: 20, color: '#26a69a' },
];

// Dynamic data based on selected app
const getTableData = (selectedApp, appData) => {
  if (selectedApp === 'choreo') {
    return {
      title: 'User Activity Overview',
      headers: ['User Type', 'Count', 'Activity', 'Revenue Share', 'Status'],
      data: [
        { id: 1, name: 'Young Helpers', count: appData.metrics.youngHelpers.count, activity: `${appData.metrics.youngHelpers.completionRate}% completion`, value: '$0 (Gift Cards)', status: 'active' },
        { id: 2, name: 'Adult Helpers', count: appData.metrics.adultHelpers.count, activity: `${appData.metrics.adultHelpers.avgRating}⭐ rating`, value: '$28,000', status: 'active' },
        { id: 3, name: 'Chore Posters', count: appData.metrics.chorePoster.count, activity: `$${appData.metrics.chorePoster.avgSpent} avg spent`, value: '$17,000', status: 'active' },
        { id: 4, name: 'Guardians', count: appData.metrics.guardians.count, activity: `${appData.metrics.guardians.oversightActions} oversight actions`, value: '$0', status: 'active' },
        { id: 5, name: 'Business Users', count: appData.metrics.business.count, activity: `${appData.metrics.business.teamSize} team members`, value: '$12,000', status: 'active' }
      ]
    };
  } else if (selectedApp === 'website') {
    return {
      title: 'Recent Clients',
      headers: ['Client', 'Project', 'Value', 'Status', 'Date'],
      data: [
        { id: 1, name: 'TechCorp Inc.', project: 'E-commerce Platform', value: '$45,000', status: 'active', date: '2024-01-15' },
        { id: 2, name: 'StartupXYZ', project: 'Mobile App', value: '$28,000', status: 'pending', date: '2024-01-18' },
        { id: 3, name: 'Global Retail', project: 'AI Analytics', value: '$62,000', status: 'active', date: '2024-01-20' },
        { id: 4, name: 'FinanceHub', project: 'Trading Platform', value: '$95,000', status: 'active', date: '2024-01-22' },
        { id: 5, name: 'HealthTech', project: 'Patient Portal', value: '$38,000', status: 'pending', date: '2024-01-25' }
      ]
    };
  } else {
    return {
      title: 'Project Portfolio',
      headers: ['Project', 'Type', 'Value', 'Status', 'Duration'],
      data: [
        { id: 1, name: 'AI Research Tool', project: 'R&D', value: '$15,000', status: 'active', date: '45 days' },
        { id: 2, name: 'Blockchain Explorer', project: 'Client Work', value: '$28,000', status: 'pending', date: '30 days' },
        { id: 3, name: 'IoT Dashboard', project: 'Consulting', value: '$22,000', status: 'active', date: '60 days' },
        { id: 4, name: 'ML Pipeline', project: 'R&D', value: '$18,000', status: 'active', date: '90 days' },
        { id: 5, name: 'Mobile Framework', project: 'Open Source', value: '$8,000', status: 'pending', date: '120 days' }
      ]
    };
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AdminContext);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('month');
  const [selectedApp, setSelectedApp] = useState('choreo'); // Default to Choreo
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Get app-specific data
  const appData = getAppData(selectedApp);
  const formatCurrency = (amount) => `$${amount.toLocaleString()}`;
  const formatPercentage = (value) => `${value > 0 ? '+' : ''}${value}%`;
  
  // Get dynamic table data
  const tableInfo = getTableData(selectedApp, appData);
  
  // Filter data based on date range
  const getFilteredData = (data) => {
    if (!dateRange.startDate && !dateRange.endDate) {
      return data; // No filtering
    }
    
    // This is where you would implement actual date filtering
    // For now, we'll show the same data but with a status indicator
    return data;
  };
  
  const isDateFiltered = dateRange.startDate || dateRange.endDate;

  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(appData.overview.totalRevenue),
      change: formatPercentage(appData.overview.monthlyGrowth),
      positive: appData.overview.monthlyGrowth > 0,
      icon: <FaDollarSign />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981'
    },
    {
      label: 'Net Profit',
      value: formatCurrency(appData.overview.netProfit),
      change: `${((appData.overview.netProfit / appData.overview.totalRevenue) * 100).toFixed(1)}% margin`,
      positive: appData.overview.netProfit > 0,
      icon: <HiTrendingUp />,
      gradient: 'linear-gradient(135deg, #fbb604 0%, #f99b04 100%)',
      iconBg: 'rgba(251, 182, 4, 0.1)',
      iconColor: '#fbb604'
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(appData.overview.totalExpenses),
      change: `${((appData.overview.totalExpenses / appData.overview.totalRevenue) * 100).toFixed(1)}% of revenue`,
      positive: false,
      icon: <FaShoppingCart />,
      gradient: 'linear-gradient(135deg, #8e24aa 0%, #5e35b1 100%)',
      iconBg: 'rgba(142, 36, 170, 0.1)',
      iconColor: '#8e24aa'
    },
    {
      label: selectedApp === 'choreo' ? 'Active Users' : selectedApp === 'website' ? 'Active Projects' : 'Total Projects',
      value: selectedApp === 'choreo' ? appData.overview.activeUsers.toLocaleString() : appData.overview.activeProjects || appData.overview.totalProjects,
      change: appData.overview.projectStatus,
      positive: true,
      icon: selectedApp === 'choreo' ? <FaUsers /> : <FaRocket />,
      gradient: 'linear-gradient(135deg, #1e88e5 0%, #39a0ed 100%)',
      iconBg: 'rgba(30, 136, 229, 0.1)',
      iconColor: '#1e88e5'
    }
  ];

  const renderPageContent = () => {
    switch (activeNav) {
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      case 'invoicing':
        return <AdminInvoicing />;
      default:
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                  {appData.name} Dashboard
                </h1>
                <p style={{ color: '#888888', fontSize: '1rem' }}>
                  Financial overview and performance metrics for {appData.description}
                  {isDateFiltered && (
                    <span style={{ 
                      color: '#fbb604', 
                      fontWeight: '600', 
                      marginLeft: '1rem',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(251, 182, 4, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      📅 Filtered: {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <DateRangePicker 
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                />
              </div>
            </div>

            <StatsGrid>
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
                  <div className="header">
                    <div className="icon">{stat.icon}</div>
                    <HiOutlineDotsVertical className="menu" />
                  </div>
                  <div className="content">
                    <div className="label">{stat.label}</div>
                    <div className="value">{stat.value}</div>
                    <div className={`change ${stat.positive ? 'positive' : 'negative'}`}>
                      {stat.positive ? <FaArrowUp className="icon" /> : <FaArrowDown className="icon" />}
                      {stat.change}
                    </div>
                  </div>
                </StatCard>
              ))}
            </StatsGrid>

            {/* Choreo-specific detailed metrics */}
            {selectedApp === 'choreo' && (
              <>
                <ChoreoMetricsPanel data={appData} />
                <ServiceCostsPanel data={appData} />
              </>
            )}

            <ChartsGrid>
              <ChartCard>
                <div className="header">
                  <h3>Revenue & Profit Overview</h3>
                  <div className="actions">
                    <button className={timeRange === 'week' ? 'active' : ''} onClick={() => setTimeRange('week')}>Week</button>
                    <button className={timeRange === 'month' ? 'active' : ''} onClick={() => setTimeRange('month')}>Month</button>
                    <button className={timeRange === 'year' ? 'active' : ''} onClick={() => setTimeRange('year')}>Year</button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={appData.revenue}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fbb604" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#fbb604" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#666666" />
                    <YAxis stroke="#666666" />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#ffffff' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#fbb604" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                    <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard>
                <div className="header">
                  <h3>Expense Breakdown</h3>
                  <div className="actions">
                    <button><FaDownload /></button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <defs>
                      {(appData.expenses?.categories || []).map((entry, index) => (
                        <React.Fragment key={index}>
                          <linearGradient id={`expenseGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                            <stop offset="50%" stopColor={entry.color} stopOpacity={0.8}/>
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                          </linearGradient>
                          <filter id={`expenseShadow-${index}`}>
                            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor={entry.color} floodOpacity="0.3"/>
                          </filter>
                        </React.Fragment>
                      ))}
                    </defs>
                    <Pie
                      data={appData.expenses?.categories || []}
                      cx="50%"
                      cy="45%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={4}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {(appData.expenses?.categories || []).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#expenseGradient-${index})`}
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth={1}
                          filter={`url(#expenseShadow-${index})`}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(8, 8, 8, 0.98)', 
                        border: '1px solid rgba(255,255,255,0.15)', 
                        borderRadius: '16px',
                        backdropFilter: 'blur(40px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                        padding: '16px 20px',
                        color: '#ffffff'
                      }}
                      labelStyle={{ 
                        color: '#ffffff', 
                        fontWeight: '700', 
                        fontSize: '14px'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                      labelFormatter={(label) => `${label} Expenses`}
                      itemStyle={{ color: '#ffffff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                  {(appData.expenses?.categories || []).map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color }} />
                      <span style={{ color: '#888888', fontSize: '0.85rem' }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </ChartsGrid>

            <TableCard>
              <div className="header">
                <h3>{tableInfo.title}</h3>
                <button>View All</button>
              </div>
              <table>
                <thead>
                  <tr>
                    {tableInfo.headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableInfo.data.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      {selectedApp === 'choreo' && (
                        <>
                          <td style={{ color: '#888888' }}>{item.count}</td>
                          <td>{item.activity}</td>
                          <td style={{ color: '#10b981', fontWeight: '600' }}>{item.value}</td>
                        </>
                      )}
                      {selectedApp === 'website' && (
                        <>
                          <td>{item.project}</td>
                          <td style={{ color: '#10b981', fontWeight: '600' }}>{item.value}</td>
                        </>
                      )}
                      {selectedApp === 'other' && (
                        <>
                          <td>{item.project}</td>
                          <td style={{ color: '#10b981', fontWeight: '600' }}>{item.value}</td>
                        </>
                      )}
                      <td className="status">
                        <span className={`badge ${item.status}`}>
                          {item.status === 'active' && <FaCheckCircle />}
                          {item.status === 'pending' && <FaExclamationTriangle />}
                          {item.status === 'inactive' && <FaTimesCircle />}
                          {item.status}
                        </span>
                      </td>
                      <td>{selectedApp === 'choreo' ? item.status : item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableCard>
          </>
        );
    }
  };

  return (
    <>
      <GlobalStyle />
      <DashboardContainer>
        <Sidebar>
          <div style={{ padding: '0 2rem', marginBottom: '3rem' }}>
            <AppSelector 
              selectedApp={selectedApp}
              onAppSelect={setSelectedApp}
            />
          </div>

          <NavMenu>
            <NavItem 
              active={activeNav === 'dashboard'} 
              onClick={() => setActiveNav('dashboard')}
            >
              <FaHome className="icon" />
              <span className="label">Dashboard</span>
            </NavItem>
            <NavItem 
              active={activeNav === 'clients'} 
              onClick={() => setActiveNav('clients')}
            >
              <FaUsers className="icon" />
              <span className="label">Clients</span>
            </NavItem>
            <NavItem 
              active={activeNav === 'analytics'} 
              onClick={() => setActiveNav('analytics')}
            >
              <FaChartLine className="icon" />
              <span className="label">Analytics</span>
            </NavItem>
            <NavItem 
              active={activeNav === 'invoicing'} 
              onClick={() => setActiveNav('invoicing')}
            >
              <FaFileInvoiceDollar className="icon" />
              <span className="label">Invoicing</span>
            </NavItem>
            <NavItem 
              active={activeNav === 'settings'} 
              onClick={() => setActiveNav('settings')}
            >
              <FaCog className="icon" />
              <span className="label">Settings</span>
            </NavItem>
            <NavItem onClick={handleLogout}>
              <FaSignOutAlt className="icon" />
              <span className="label">Logout</span>
            </NavItem>
          </NavMenu>
        </Sidebar>

        <MainContent>
          <TopBar>
            <SearchBar>
              <div className="search-input">
                <FaSearch className="icon" />
                <input type="text" placeholder="Search clients, projects..." />
              </div>
            </SearchBar>

            <TopBarActions>
              <div className="notification">
                <FaBell />
                <div className="badge">5</div>
              </div>
              <div className="user-menu">
                <div className="avatar">A</div>
                <div className="name">Admin</div>
                <HiOutlineDotsVertical className="dropdown" />
              </div>
            </TopBarActions>
          </TopBar>

          <Dashboard>
            {renderPageContent()}
          </Dashboard>
        </MainContent>
      </DashboardContainer>
    </>
  );
};

export default AdminDashboard;