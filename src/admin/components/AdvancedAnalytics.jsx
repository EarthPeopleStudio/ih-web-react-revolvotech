import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { 
  EnhancedAreaChart, 
  EnhancedDonutChart, 
  EnhancedBarChart, 
  EnhancedLineChart,
  EnhancedRadialChart 
} from "./EnhancedCharts";
import {
  FaDollarSign, FaUsers, FaChartBar,
  FaCalendarAlt, FaDownload, FaExpand, FaFilter, FaEye,
  FaShare, FaClock, FaArrowUp, FaArrowDown, FaBolt,
  FaGlobe, FaRocket, FaStar
} from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";

// Styled Components
const AnalyticsContainer = styled.div`
  width: 100%;
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100vh;
`;

const AnalyticsHeader = styled.div`
  margin-bottom: 2rem;
  
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    
    .title-section {
      h1 {
        color: white;
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        
        .icon {
          color: #fbb604;
        }
      }
      
      p {
        color: #888888;
        font-size: 1rem;
        line-height: 1.5;
      }
    }
    
    .header-actions {
      display: flex;
      gap: 1rem;
      
      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        color: #888888;
        font-size: 0.9rem;
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
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const MetricCard = styled(motion.div)`
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
    background: ${props => props.gradient || 'linear-gradient(135deg, #fbb604 0%, #f99b04 100%)'};
  }
  
  .metric-header {
    display: flex;
    justify-content: between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    
    .metric-icon {
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
    
    .metric-trend {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      
      &.positive {
        color: #10b981;
      }
      
      &.negative {
        color: #ef4444;
      }
      
      .trend-icon {
        font-size: 0.7rem;
      }
    }
  }
  
  .metric-content {
    .metric-label {
      color: #888888;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .metric-value {
      color: white;
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }
    
    .metric-description {
      color: #666666;
      font-size: 0.8rem;
      line-height: 1.4;
    }
  }
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(motion.div)`
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    .chart-title {
      h3 {
        color: white;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      
      p {
        color: #666666;
        font-size: 0.85rem;
      }
    }
    
    .chart-actions {
      display: flex;
      gap: 0.5rem;
      
      button {
        width: 36px;
        height: 36px;
        border: none;
        background: rgba(255, 255, 255, 0.03);
        color: #888888;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
      }
    }
  }
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const InsightCard = styled.div`
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  
  .insight-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    
    .insight-icon {
      width: 40px;
      height: 40px;
      background: rgba(251, 182, 4, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fbb604;
    }
    
    .insight-title {
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
    }
  }
  
  .insight-content {
    .insight-text {
      color: #cccccc;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    
    .insight-metrics {
      display: flex;
      gap: 1rem;
      
      .metric {
        text-align: center;
        
        .metric-value {
          color: #fbb604;
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .metric-label {
          color: #666666;
          font-size: 0.8rem;
        }
      }
    }
  }
`;

// Mock data for advanced analytics
const revenueGrowthData = [
  { month: 'Jan', revenue: 45000, growth: 12, customers: 180, avgOrder: 250 },
  { month: 'Feb', revenue: 52000, growth: 18, customers: 210, avgOrder: 247 },
  { month: 'Mar', revenue: 48000, growth: -8, customers: 195, avgOrder: 246 },
  { month: 'Apr', revenue: 61000, growth: 27, customers: 245, avgOrder: 249 },
  { month: 'May', revenue: 55000, growth: -10, customers: 220, avgOrder: 250 },
  { month: 'Jun', revenue: 67000, growth: 22, customers: 268, avgOrder: 250 },
  { month: 'Jul', revenue: 72000, growth: 7, customers: 288, avgOrder: 250 },
  { month: 'Aug', revenue: 78000, growth: 8, customers: 312, avgOrder: 250 }
];

const deviceData = [
  { name: 'Desktop', value: 45, sessions: 15420, color: '#fbb604' },
  { name: 'Mobile', value: 35, sessions: 12050, color: '#10b981' },
  { name: 'Tablet', value: 20, sessions: 6880, color: '#8b5cf6' }
];

const geographicData = [
  { country: 'United States', sessions: 18500, revenue: 42000, color: '#fbb604' },
  { country: 'Canada', sessions: 8200, revenue: 18500, color: '#10b981' },
  { country: 'United Kingdom', sessions: 6800, revenue: 15200, color: '#3b82f6' },
  { country: 'Germany', sessions: 5200, revenue: 12800, color: '#8b5cf6' },
  { country: 'Australia', sessions: 3800, revenue: 9200, color: '#f59e0b' }
];

const performanceData = [
  { hour: '00:00', pageViews: 120, bounceRate: 45 },
  { hour: '04:00', pageViews: 80, bounceRate: 52 },
  { hour: '08:00', pageViews: 450, bounceRate: 38 },
  { hour: '12:00', pageViews: 680, bounceRate: 35 },
  { hour: '16:00', pageViews: 590, bounceRate: 40 },
  { hour: '20:00', pageViews: 320, bounceRate: 42 }
];

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  const keyMetrics = [
    {
      label: 'Total Revenue',
      value: '$487,200',
      change: '+18.5%',
      trend: 'positive',
      description: 'Compared to last period',
      icon: <FaDollarSign />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981'
    },
    {
      label: 'Active Users',
      value: '24,580',
      change: '+12.3%',
      trend: 'positive',
      description: 'Monthly active users',
      icon: <FaUsers />,
      gradient: 'linear-gradient(135deg, #fbb604 0%, #f99b04 100%)',
      iconBg: 'rgba(251, 182, 4, 0.1)',
      iconColor: '#fbb604'
    },
    {
      label: 'Conversion Rate',
      value: '3.24%',
      change: '+0.8%',
      trend: 'positive',
      description: 'Visitors to customers',
      icon: <HiTrendingUp />,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      iconBg: 'rgba(59, 130, 246, 0.1)',
      iconColor: '#3b82f6'
    },
    {
      label: 'Avg. Session',
      value: '4m 32s',
      change: '-5.2%',
      trend: 'negative',
      description: 'Time spent on site',
      icon: <FaClock />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: '#8b5cf6'
    },
    {
      label: 'Customer LTV',
      value: '$1,847',
      change: '+22.1%',
      trend: 'positive',
      description: 'Lifetime value',
      icon: <FaStar />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: '#f59e0b'
    },
    {
      label: 'Page Speed',
      value: '1.8s',
      change: '-12%',
      trend: 'positive',
      description: 'Average load time',
      icon: <FaBolt />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      iconBg: 'rgba(236, 72, 153, 0.1)',
      iconColor: '#ec4899'
    }
  ];

  return (
    <AnalyticsContainer>
      <AnalyticsHeader>
        <div className="header-top">
          <div className="title-section">
            <h1>
              <FaChartBar className="icon" />
              Business Intelligence
            </h1>
            <p>Advanced analytics and insights to drive data-driven decisions for your business growth</p>
          </div>
          <div className="header-actions">
            <button>
              <FaFilter />
              Filter
            </button>
            <button>
              <FaDownload />
              Export
            </button>
            <button className="primary">
              <FaRocket />
              Generate Report
            </button>
          </div>
        </div>
      </AnalyticsHeader>

      <MetricsGrid>
        {keyMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            gradient={metric.gradient}
            iconBg={metric.iconBg}
            iconColor={metric.iconColor}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="metric-header">
              <div className="metric-icon">{metric.icon}</div>
              <div className={`metric-trend ${metric.trend}`}>
                {metric.trend === 'positive' ? <FaArrowUp className="trend-icon" /> : <FaArrowDown className="trend-icon" />}
                {metric.change}
              </div>
            </div>
            <div className="metric-content">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-description">{metric.description}</div>
            </div>
          </MetricCard>
        ))}
      </MetricsGrid>

      <ChartsSection>
        <ChartCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="chart-header">
            <div className="chart-title">
              <h3>Revenue Growth & Customer Acquisition</h3>
              <p>Monthly revenue trends with customer growth correlation</p>
            </div>
            <div className="chart-actions">
              <button><FaExpand /></button>
              <button><FaDownload /></button>
            </div>
          </div>
          <EnhancedAreaChart 
            data={revenueGrowthData}
            height={350}
            colors={['#fbb604', '#10b981']}
          />
        </ChartCard>

        <ChartCard
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="chart-header">
            <div className="chart-title">
              <h3>Device Distribution</h3>
              <p>Traffic breakdown by device type</p>
            </div>
            <div className="chart-actions">
              <button><FaEye /></button>
              <button><FaShare /></button>
            </div>
          </div>
          <EnhancedDonutChart 
            data={deviceData}
            height={350}
            colors={['#fbb604', '#10b981', '#8b5cf6']}
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            {deviceData.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  background: item.color 
                }} />
                <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </ChartsSection>

      <InsightsGrid>
        <InsightCard>
          <div className="insight-header">
            <div className="insight-icon">
              <FaGlobe />
            </div>
            <div className="insight-title">Geographic Performance</div>
          </div>
          <div className="insight-content">
            <div className="insight-text">
              Top performing regions driving 68% of total revenue. US market shows strongest conversion rates.
            </div>
            <div className="insight-metrics">
              {geographicData.slice(0, 3).map((country, index) => (
                <div key={index} className="metric">
                  <div className="metric-value">
                    ${(country.revenue / 1000).toFixed(0)}K
                  </div>
                  <div className="metric-label">{country.country}</div>
                </div>
              ))}
            </div>
          </div>
        </InsightCard>

        <InsightCard>
          <div className="insight-header">
            <div className="insight-icon">
              <FaClock />
            </div>
            <div className="insight-title">Peak Performance Hours</div>
          </div>
          <div className="insight-content">
            <div className="insight-text">
              Highest traffic occurs between 12-4 PM with lowest bounce rates. Optimize campaigns for these hours.
            </div>
            <EnhancedLineChart 
              data={performanceData.map(item => ({
                label: item.hour,
                revenue: item.pageViews
              }))}
              height={120}
              colors={['#fbb604']}
            />
          </div>
        </InsightCard>

        <InsightCard>
          <div className="insight-header">
            <div className="insight-icon">
              <FaRocket />
            </div>
            <div className="insight-title">Growth Opportunities</div>
          </div>
          <div className="insight-content">
            <div className="insight-text">
              Mobile conversion rate is 23% below desktop. Optimizing mobile experience could increase revenue by $120K annually.
            </div>
            <div className="insight-metrics">
              <div className="metric">
                <div className="metric-value">23%</div>
                <div className="metric-label">Mobile Gap</div>
              </div>
              <div className="metric">
                <div className="metric-value">$120K</div>
                <div className="metric-label">Potential</div>
              </div>
              <div className="metric">
                <div className="metric-value">35%</div>
                <div className="metric-label">Mobile Traffic</div>
              </div>
            </div>
          </div>
        </InsightCard>
      </InsightsGrid>
    </AnalyticsContainer>
  );
};

export default AdvancedAnalytics;