import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  FaUsers, FaWifi, FaExclamationTriangle, FaMedal,
  FaClock, FaMapMarkerAlt, FaDollarSign, FaChartLine, FaShieldAlt
} from "react-icons/fa";
import { HiTrendingUp, HiOutlineDotsVertical } from "react-icons/hi";
import USASVGMap from "./USASVGMap";

const MetricsContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #888888;
      font-size: 0.85rem;
    }
  }
`;

const ChartCard = styled.div`
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  grid-column: span 2;

  @media (max-width: 1200px) {
    grid-column: span 1;
  }

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
  }
`;

const RoleMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const RoleCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;

  .role-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;

    .icon {
      width: 28px;
      height: 28px;
      background: ${props => props.$roleColor || '#fbb604'};
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.9rem;
    }

    .name {
      color: white;
      font-weight: 600;
      font-size: 0.95rem;
    }
  }

  .metrics {
    .metric {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      .label {
        color: #888888;
        font-size: 0.8rem;
      }

      .value {
        color: white;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
  }
`;

const ChoreoMetricsPanel = ({ data }) => {
  const { metrics } = data;

  const safetyMetrics = [
    {
      title: "Emergency Alerts",
      value: metrics.emergencyAlerts,
      subtitle: "This month",
      icon: <FaExclamationTriangle />,
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      iconBg: "rgba(239, 68, 68, 0.1)",
      iconColor: "#ef4444"
    },
    {
      title: "Verified Users",
      value: `${metrics.verifiedUsers}%`,
      subtitle: "Background checks complete",
      icon: <FaShieldAlt />,
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      iconBg: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981"
    },
    {
      title: "Online Users",
      value: metrics.onlineUsers,
      subtitle: `${metrics.websocketConnections} connections`,
      icon: <FaWifi />,
      gradient: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
      iconBg: "rgba(30, 136, 229, 0.1)",
      iconColor: "#1e88e5"
    },
    {
      title: "Active Bids",
      value: metrics.activeBids,
      subtitle: `${metrics.avgBiddingTime} min avg time`,
      icon: <FaClock />,
      gradient: "linear-gradient(135deg, #8e24aa 0%, #5e35b1 100%)",
      iconBg: "rgba(142, 36, 170, 0.1)",
      iconColor: "#8e24aa"
    }
  ];

  const roleData = [
    {
      name: "Young Helpers",
      icon: <FaMedal />,
      color: "#fbb604",
      count: metrics.youngHelpers.count,
      metrics: [
        { label: "Avg Earnings", value: `$${metrics.youngHelpers.avgEarnings}` },
        { label: "Completion", value: `${metrics.youngHelpers.completionRate}%` },
        { label: "Badges", value: metrics.youngHelpers.badgesEarned }
      ]
    },
    {
      name: "Adult Helpers",
      icon: <FaUsers />,
      color: "#10b981",
      count: metrics.adultHelpers.count,
      metrics: [
        { label: "Avg Earnings", value: `$${metrics.adultHelpers.avgEarnings}` },
        { label: "Rating", value: `${metrics.adultHelpers.avgRating}⭐` },
        { label: "Verified", value: metrics.adultHelpers.backgroundChecks }
      ]
    },
    {
      name: "Chore Posters",
      icon: <FaChartLine />,
      color: "#1e88e5",
      count: metrics.chorePoster.count,
      metrics: [
        { label: "Avg Spent", value: `$${metrics.chorePoster.avgSpent}` },
        { label: "Satisfaction", value: `${metrics.chorePoster.satisfactionRate}⭐` },
        { label: "Repeat Rate", value: `${metrics.chorePoster.repeatCustomers}%` }
      ]
    },
    {
      name: "Business Users",
      icon: <FaDollarSign />,
      color: "#8e24aa",
      count: metrics.business.count,
      metrics: [
        { label: "Team Size", value: metrics.business.teamSize },
        { label: "Revenue", value: `$${(metrics.business.corporateRevenue / 1000)}k` },
        { label: "Bulk Orders", value: metrics.business.bulkOrders }
      ]
    }
  ];

  const geographyData = data.geography?.primaryMarkets || [];

  return (
    <MetricsContainer>
      {/* Safety & Real-time Metrics */}
      <MetricsGrid>
        {safetyMetrics.map((metric, index) => (
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
              <div className="subtitle">{metric.subtitle}</div>
            </div>
          </MetricCard>
        ))}
      </MetricsGrid>

      {/* Role-based Performance */}
      <ChartCard>
        <div className="header">
          <h3>User Role Performance</h3>
        </div>
        <RoleMetricsGrid>
          {roleData.map((role, index) => (
            <RoleCard key={index} $roleColor={role.color}>
              <div className="role-header">
                <div className="icon">{role.icon}</div>
                <div className="name">{role.name}</div>
              </div>
              <div className="metrics">
                <div className="metric">
                  <span className="label">Count</span>
                  <span className="value">{role.count}</span>
                </div>
                {role.metrics.map((metric, mIndex) => (
                  <div key={mIndex} className="metric">
                    <span className="label">{metric.label}</span>
                    <span className="value">{metric.value}</span>
                  </div>
                ))}
              </div>
            </RoleCard>
          ))}
        </RoleMetricsGrid>
      </ChartCard>

      {/* Geographic Performance - Interactive Map */}
      <div style={{ gridColumn: 'span 2' }}>
        <USASVGMap />
      </div>
    </MetricsContainer>
  );
};

export default ChoreoMetricsPanel;