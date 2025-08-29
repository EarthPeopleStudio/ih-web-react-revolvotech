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

  return (
    <AnalyticsContainer>
      <PageHeader>
        <div className="title-section">
          <h1>Advanced Analytics</h1>
          <p>Detailed insights into user behavior, conversion metrics, and business performance</p>
        </div>
        <DateRangePicker 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
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
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={userAcquisitionData}>
              <defs>
                <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbb604" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#fbb604" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="referralGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#1e88e5" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8e24aa" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#8e24aa" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#a0a0a0" fontSize={12} />
              <YAxis stroke="#a0a0a0" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(8, 8, 8, 0.98)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  borderRadius: '12px',
                  color: '#ffffff'
                }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
              <Area type="monotone" dataKey="organic" stackId="1" stroke="#10b981" fill="url(#organicGradient)" />
              <Area type="monotone" dataKey="paid" stackId="1" stroke="#fbb604" fill="url(#paidGradient)" />
              <Area type="monotone" dataKey="referral" stackId="1" stroke="#1e88e5" fill="url(#referralGradient)" />
              <Area type="monotone" dataKey="social" stackId="1" stroke="#8e24aa" fill="url(#socialGradient)" />
            </AreaChart>
          </ResponsiveContainer>
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
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <defs>
                {revenueBySourceData.map((entry, index) => (
                  <React.Fragment key={index}>
                    <linearGradient id={`revenueGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.7}/>
                    </linearGradient>
                  </React.Fragment>
                ))}
              </defs>
              <Pie
                data={revenueBySourceData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={4}
                dataKey="value"
              >
                {revenueBySourceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#revenueGradient-${index})`}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(8, 8, 8, 0.98)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  borderRadius: '12px',
                  color: '#ffffff'
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={50}
                formatter={(value) => <span style={{color: '#cccccc', fontSize: '13px'}}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
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
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={conversionFunnelData} layout="horizontal">
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#a0a0a0" fontSize={12} />
              <YAxis dataKey="stage" type="category" stroke="#a0a0a0" fontSize={12} width={100} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(8, 8, 8, 0.98)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  borderRadius: '12px',
                  color: '#ffffff'
                }}
                formatter={(value, name) => [
                  name === 'users' ? `${value.toLocaleString()} users` : `${value}%`,
                  name === 'users' ? 'Count' : 'Conversion'
                ]}
                itemStyle={{ color: '#ffffff' }}
              />
              <Bar dataKey="users" fill="#fbb604" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={userBehaviorData}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="hour" stroke="#a0a0a0" fontSize={12} />
              <YAxis yAxisId="left" stroke="#a0a0a0" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#a0a0a0" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(8, 8, 8, 0.98)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  borderRadius: '12px',
                  color: '#ffffff'
                }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="sessions" fill="#1e88e5" name="Sessions" radius={[2, 2, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="avgDuration" stroke="#10b981" strokeWidth={3} name="Avg Duration (min)" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartSection>
    </AnalyticsContainer>
  );
};

export default AdminAnalytics;