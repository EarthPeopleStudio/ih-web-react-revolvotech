import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, ScatterChart, Scatter
} from "recharts";
import {
  FaUsers, FaDollarSign, FaChartLine,
  FaCalendarAlt, FaDownload, FaFilter, FaEye, FaClock, FaMapMarkerAlt,
  FaPercent, FaArrowUp, FaArrowDown
} from "react-icons/fa";
import { HiOutlineDotsVertical, HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import DateRangePicker from "../components/DateRangePicker";
import AdvancedAnalytics from "../components/AdvancedAnalytics";
import { 
  EnhancedAreaChart, 
  EnhancedDonutChart, 
  EnhancedBarChart, 
  EnhancedLineChart,
  EnhancedRadialChart 
} from "../components/EnhancedCharts";

const AnalyticsContainer = styled.div`
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
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    p {
      color: #888888;
      font-size: 1rem;
    }
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled(motion.div)`
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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .icon {
      width: 40px;
      height: 40px;
      background: ${props => props.iconBg || 'rgba(251, 182, 4, 0.1)'};
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => props.iconColor || '#fbb604'};
      font-size: 1.1rem;
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
    .title {
      color: white;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .value {
      color: #10b981;
      font-size: 2rem;
      font-weight: 800;
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

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h3 {
      color: white;
      font-size: 1.3rem;
      font-weight: 700;
    }

    .controls {
      display: flex;
      gap: 1rem;

      button {
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        color: #888888;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.08);
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

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [viewType, setViewType] = useState('overview');
  const [analyticsMode, setAnalyticsMode] = useState('advanced'); // Default to advanced view

  // Advanced analytics data
  const userAcquisitionData = [
    { month: 'Jul', organic: 145, paid: 89, referral: 34, social: 22 },
    { month: 'Aug', organic: 189, paid: 112, referral: 45, social: 28 },
    { month: 'Sep', organic: 234, paid: 145, referral: 56, social: 35 },
    { month: 'Oct', organic: 289, paid: 178, referral: 67, social: 43 },
    { month: 'Nov', organic: 345, paid: 212, referral: 78, social: 51 },
    { month: 'Dec', organic: 412, paid: 267, referral: 89, social: 62 },
    { month: 'Jan', organic: 478, paid: 298, referral: 102, social: 74 }
  ];

  const conversionFunnelData = [
    { stage: 'Visitors', users: 12500, percentage: 100 },
    { stage: 'Sign Ups', users: 3750, percentage: 30 },
    { stage: 'Email Verified', users: 3375, percentage: 90 },
    { stage: 'Profile Complete', users: 2700, percentage: 80 },
    { stage: 'First Action', users: 2025, percentage: 75 },
    { stage: 'Active Users', users: 1620, percentage: 80 }
  ];

  const revenueBySourceData = [
    { source: 'Commission Fees', value: 28000, percentage: 62, color: '#fbb604' },
    { source: 'Subscriptions', value: 12000, percentage: 27, color: '#10b981' },
    { source: 'Advertisements', value: 5000, percentage: 11, color: '#1e88e5' }
  ];

  const userBehaviorData = [
    { hour: '00', sessions: 45, avgDuration: 8.2 },
    { hour: '06', sessions: 89, avgDuration: 12.4 },
    { hour: '09', sessions: 234, avgDuration: 15.6 },
    { hour: '12', sessions: 345, avgDuration: 18.9 },
    { hour: '15', sessions: 289, avgDuration: 16.7 },
    { hour: '18', sessions: 412, avgDuration: 22.3 },
    { hour: '21', sessions: 198, avgDuration: 14.5 }
  ];

  const analyticsMetrics = [
    {
      title: "Page Views",
      value: "1.2M",
      change: "+12.5%",
      positive: true,
      icon: <FaEye />,
      gradient: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
      iconBg: "rgba(30, 136, 229, 0.1)",
      iconColor: "#1e88e5"
    },
    {
      title: "Session Duration",
      value: "8m 34s",
      change: "+2.1%",
      positive: true,
      icon: <FaClock />,
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      iconBg: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981"
    },
    {
      title: "Bounce Rate",
      value: "24.8%",
      change: "-3.4%",
      positive: true,
      icon: <FaPercent />,
      gradient: "linear-gradient(135deg, #8e24aa 0%, #5e35b1 100%)",
      iconBg: "rgba(142, 36, 170, 0.1)",
      iconColor: "#8e24aa"
    },
    {
      title: "Conversion Rate",
      value: "3.8%",
      change: "+0.7%",
      positive: true,
      icon: <HiTrendingUp />,
      gradient: "linear-gradient(135deg, #fbb604 0%, #f99b04 100%)",
      iconBg: "rgba(251, 182, 4, 0.1)",
      iconColor: "#fbb604"
    }
  ];

  // If advanced mode is selected, show the new advanced analytics
  if (analyticsMode === 'advanced') {
    return <AdvancedAnalytics />;
  }

  return (
    <AnalyticsContainer>
      <PageHeader>
        <div className="title-section">
          <h1>Analytics Dashboard</h1>
          <p>Detailed insights into user behavior, conversion metrics, and business performance</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setAnalyticsMode('basic')}
              style={{
                padding: '0.5rem 1rem',
                background: analyticsMode === 'basic' ? 'rgba(251, 182, 4, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: analyticsMode === 'basic' ? '1px solid rgba(251, 182, 4, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                color: analyticsMode === 'basic' ? '#fbb604' : '#888888',
                cursor: 'pointer'
              }}
            >
              Basic
            </button>
            <button 
              onClick={() => setAnalyticsMode('advanced')}
              style={{
                padding: '0.5rem 1rem',
                background: analyticsMode === 'advanced' ? 'rgba(251, 182, 4, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: analyticsMode === 'advanced' ? '1px solid rgba(251, 182, 4, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                color: analyticsMode === 'advanced' ? '#fbb604' : '#888888',
                cursor: 'pointer'
              }}
            >
              Advanced
            </button>
          </div>
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>
      </PageHeader>

      {/* Key Metrics */}
      <MetricsGrid>
        {analyticsMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            gradient={metric.gradient}
            iconBg={metric.iconBg}
            iconColor={metric.iconColor}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="header">
              <div className="icon">{metric.icon}</div>
              <HiOutlineDotsVertical className="menu" />
            </div>
            <div className="content">
              <div className="title">{metric.title}</div>
              <div className="value">{metric.value}</div>
              <div className={`change ${metric.positive ? 'positive' : 'negative'}`}>
                {metric.positive ? <FaArrowUp className="icon" /> : <FaArrowDown className="icon" />}
                {metric.change} vs last month
              </div>
            </div>
          </MetricCard>
        ))}
      </MetricsGrid>

      {/* Charts Section */}
      <ChartSection>
        {/* User Acquisition */}
        <ChartCard>
          <div className="header">
            <h3>User Acquisition Channels</h3>
            <div className="controls">
              <button className="active">Stacked</button>
              <button>Separate</button>
              <button><FaDownload /></button>
            </div>
          </div>
          <EnhancedAreaChart 
            data={userAcquisitionData.map(item => ({
              month: item.month,
              revenue: item.organic + item.paid,
              profit: item.referral + item.social
            }))}
            height={350}
            colors={['#10b981', '#fbb604']}
          />
        </ChartCard>

        {/* Revenue Breakdown */}
        <ChartCard>
          <div className="header">
            <h3>Revenue Source Analysis</h3>
            <div className="controls">
              <button className="active">Donut</button>
              <button>Pie</button>
              <button><FaDownload /></button>
            </div>
          </div>
          <EnhancedDonutChart 
            data={revenueBySourceData}
            height={350}
            colors={['#fbb604', '#10b981', '#1e88e5']}
          />
        </ChartCard>

        {/* Conversion Funnel */}
        <ChartCard>
          <div className="header">
            <h3>Conversion Funnel Analysis</h3>
            <div className="controls">
              <button className="active">Funnel</button>
              <button>Table</button>
              <button><FaDownload /></button>
            </div>
          </div>
          <EnhancedBarChart 
            data={conversionFunnelData.map(item => ({
              label: item.stage,
              revenue: item.users
            }))}
            height={350}
            colors={['#fbb604']}
          />
        </ChartCard>

        {/* User Behavior */}
        <ChartCard>
          <div className="header">
            <h3>User Behavior by Time</h3>
            <div className="controls">
              <button className="active">24h</button>
              <button>7d</button>
              <button><FaDownload /></button>
            </div>
          </div>
          <EnhancedLineChart 
            data={userBehaviorData.map(item => ({
              label: item.hour,
              revenue: item.sessions
            }))}
            height={350}
            colors={['#1e88e5']}
          />
        </ChartCard>
      </ChartSection>
    </AnalyticsContainer>
  );
};

export default AdminAnalytics;