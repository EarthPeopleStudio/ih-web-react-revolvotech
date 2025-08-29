import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  FaCreditCard, FaSms, FaGift, FaImage, FaDatabase, FaServer,
  FaWifi, FaMapMarkerAlt, FaDollarSign, FaExclamationTriangle,
  FaShieldAlt, FaEye, FaMobile, FaGithub, FaPalette, FaFileAlt,
  FaBell, FaChartBar, FaBug, FaGoogle, FaEnvelope
} from "react-icons/fa";
import { SiHeroku, SiAmazon, SiFirebase, SiDatadog, SiNotion } from "react-icons/si";
import { HiOutlineDotsVertical } from "react-icons/hi";

const ServiceContainer = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
`;

const ServiceCard = styled(motion.div)`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => `linear-gradient(90deg, ${props.color}, ${props.color}88)`};
    border-radius: 16px 16px 0 0;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .service-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .icon {
        width: 40px;
        height: 40px;
        background: ${props => `${props.color}15`};
        border: 1px solid ${props => `${props.color}30`};
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.color};
        font-size: 1.1rem;
      }

      .details {
        .name {
          color: white;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .category {
          color: #888888;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }

    .menu {
      color: #666666;
      cursor: pointer;
      font-size: 1rem;
      
      &:hover {
        color: #888888;
      }
    }
  }

  .cost {
    color: ${props => props.color};
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px ${props => `${props.color}40`};
  }

  .description {
    color: #cccccc;
    font-size: 0.85rem;
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  .usage {
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    .usage-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;

      .label {
        color: #888888;
      }

      .value {
        color: white;
        font-weight: 600;
      }
    }
  }
`;

const ChartCard = styled.div`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h3 {
      color: white;
      font-size: 1.3rem;
      font-weight: 700;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }

    .total-cost {
      color: #ff4757;
      font-size: 1.4rem;
      font-weight: 800;
      text-shadow: 0 0 20px #ff475740;
    }
  }
`;

const AlertCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 71, 87, 0.15) 0%, rgba(255, 71, 87, 0.05) 100%);
  border: 1px solid rgba(255, 71, 87, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(20px);

  .alert-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;

    .icon {
      color: #ff4757;
      font-size: 1.2rem;
      text-shadow: 0 0 10px #ff475740;
    }

    .title {
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
    }
  }

  .alert-message {
    color: #ffb3ba;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryCard = styled.div`
  background: linear-gradient(135deg, ${props => `${props.color}10`} 0%, ${props => `${props.color}05`} 100%);
  border: 1px solid ${props => `${props.color}20`};
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;

  .category-name {
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .category-cost {
    color: ${props => props.color};
    font-size: 1.5rem;
    font-weight: 800;
    text-shadow: 0 0 15px ${props => `${props.color}40`};
  }
`;

const ServiceCostsPanel = ({ data }) => {
  const { servicesCosts } = data;
  
  const services = [
    {
      name: "Stripe",
      category: "Payment",
      cost: servicesCosts.monthly.stripe,
      icon: <FaCreditCard />,
      color: "#635bff",
      description: "Payment processing fees for marketplace transactions",
      usage: [
        { label: "Monthly Volume", value: "~$62,000" },
        { label: "Fee Rate", value: "2.9% + $0.30" },
        { label: "Transactions", value: "1,240" }
      ]
    },
    {
      name: "Heroku",
      category: "Infrastructure",
      cost: servicesCosts.monthly.heroku,
      icon: <SiHeroku />,
      color: "#430098",
      description: "Backend hosting with Standard dynos and Redis add-on",
      usage: [
        { label: "Dynos", value: "3 Standard" },
        { label: "Add-ons", value: "Redis, Postgres" },
        { label: "Uptime", value: "99.9%" }
      ]
    },
    {
      name: "Checkr",
      category: "Security",
      cost: servicesCosts.monthly.checkr,
      icon: <FaShieldAlt />,
      color: "#fbb604",
      description: "Background checks for adult helper verification",
      usage: [
        { label: "Checks/Month", value: "95" },
        { label: "Cost per Check", value: "$4.00" },
        { label: "Pass Rate", value: "92%" }
      ]
    },
    {
      name: "AWS Services",
      category: "Infrastructure",
      cost: servicesCosts.monthly.aws,
      icon: <SiAmazon />,
      color: "#ff9900",
      description: "S3 storage, SES email, ML services (Comprehend, Rekognition)",
      usage: [
        { label: "S3 Storage", value: "245 GB" },
        { label: "SES Emails", value: "12,500/mo" },
        { label: "ML API Calls", value: "3,200/mo" }
      ]
    },
    {
      name: "Twilio",
      category: "Communication",
      cost: servicesCosts.monthly.twilio,
      icon: <FaSms />,
      color: "#f22f46",
      description: "SMS verification, emergency alerts, and notifications",
      usage: [
        { label: "SMS Sent", value: "2,850/mo" },
        { label: "Rate", value: "$0.0075/SMS" },
        { label: "Emergency", value: "45 alerts" }
      ]
    },
    {
      name: "Jumio",
      category: "Security",
      cost: servicesCosts.monthly.jumio,
      icon: <FaEye />,
      color: "#00d4aa",
      description: "AI-powered identity verification and fraud prevention",
      usage: [
        { label: "Verifications", value: "180/mo" },
        { label: "Success Rate", value: "96%" },
        { label: "Avg Time", value: "30 sec" }
      ]
    },
    {
      name: "Datadog",
      category: "Analytics",
      cost: servicesCosts.monthly.datadog,
      icon: <SiDatadog />,
      color: "#632ca6",
      description: "Application performance monitoring and logging",
      usage: [
        { label: "Hosts", value: "5" },
        { label: "Log Ingestion", value: "50GB/day" },
        { label: "Alerts", value: "125/mo" }
      ]
    },
    {
      name: "Firebase",
      category: "Mobile",
      cost: servicesCosts.monthly.firebase,
      icon: <SiFirebase />,
      color: "#ffca28",
      description: "Push notifications and mobile analytics for Flutter app",
      usage: [
        { label: "Push Sent", value: "85K/mo" },
        { label: "Analytics", value: "2.4K users" },
        { label: "Crashlytics", value: "Active" }
      ]
    }
  ];

  const categoryData = Object.entries(servicesCosts.categories).map(([name, cost]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    cost,
    percentage: ((cost / servicesCosts.total) * 100).toFixed(1)
  }));

  const categoryColors = {
    Payments: "#635bff",
    Infrastructure: "#ff9900", 
    Security: "#fbb604",
    Communication: "#f22f46",
    Analytics: "#632ca6",
    Mobile: "#ffca28",
    Tools: "#2ecc71"
  };

  // Enhanced cost trends with more realistic data
  const costTrends = [
    { month: 'Jul', total: 4200, payments: 1400, infrastructure: 1200, security: 450, communication: 500, analytics: 250, mobile: 120, tools: 80 },
    { month: 'Aug', total: 4650, payments: 1550, infrastructure: 1300, security: 480, communication: 520, analytics: 280, mobile: 130, tools: 90 },
    { month: 'Sep', total: 4980, payments: 1650, infrastructure: 1350, security: 510, communication: 540, analytics: 300, mobile: 135, tools: 95 },
    { month: 'Oct', total: 5150, payments: 1720, infrastructure: 1400, security: 540, communication: 560, analytics: 315, mobile: 140, tools: 75 },
    { month: 'Nov', total: 5350, payments: 1850, infrastructure: 1480, security: 580, communication: 580, analytics: 325, mobile: 145, tools: 90 },
    { month: 'Dec', total: 5520, payments: 1950, infrastructure: 1550, security: 600, communication: 600, analytics: 340, mobile: 150, tools: 80 },
    { month: 'Jan', total: servicesCosts.total, payments: servicesCosts.categories.payments, infrastructure: servicesCosts.categories.infrastructure, security: servicesCosts.categories.security, communication: servicesCosts.categories.communication, analytics: servicesCosts.categories.analytics, mobile: servicesCosts.categories.mobile, tools: servicesCosts.categories.tools }
  ];

  const monthlyIncrease = ((servicesCosts.total - 5520) / 5520 * 100).toFixed(1);

  return (
    <ServiceContainer>
      {/* Cost Alert */}
      {monthlyIncrease > 0 && (
        <AlertCard
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="alert-header">
            <FaExclamationTriangle className="icon" />
            <div className="title">Monthly Service Costs Alert</div>
          </div>
          <div className="alert-message">
            External service costs increased by {monthlyIncrease}% this month to ${servicesCosts.total.toLocaleString()}/mo. 
            Primary increases: Stripe processing fees (+$170) and Checkr background checks (+$20) due to higher user volume.
          </div>
        </AlertCard>
      )}

      {/* Category Overview */}
      <CategoryGrid>
        {categoryData.map((category, index) => (
          <CategoryCard key={index} color={categoryColors[category.name]}>
            <div className="category-name">{category.name}</div>
            <div className="category-cost">${category.cost}</div>
          </CategoryCard>
        ))}
      </CategoryGrid>

      {/* Service Cards */}
      <ServiceGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            color={service.color}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <div className="header">
              <div className="service-info">
                <div className="icon">{service.icon}</div>
                <div className="details">
                  <div className="name">{service.name}</div>
                  <div className="category">{service.category}</div>
                </div>
              </div>
              <HiOutlineDotsVertical className="menu" />
            </div>
            <div className="cost">${service.cost}/mo</div>
            <div className="description">{service.description}</div>
            <div className="usage">
              {service.usage.map((item, uIndex) => (
                <div key={uIndex} className="usage-item">
                  <span className="label">{item.label}:</span>
                  <span className="value">{item.value}</span>
                </div>
              ))}
            </div>
          </ServiceCard>
        ))}
      </ServiceGrid>

      {/* Enhanced Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <ChartCard>
          <div className="header">
            <h3>Cost Distribution</h3>
            <div className="total-cost">${servicesCosts.total.toLocaleString()}/mo</div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <defs>
                {Object.keys(categoryColors).map(category => (
                  <React.Fragment key={category}>
                    <linearGradient id={`gradient-${category}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={categoryColors[category]} stopOpacity={1}/>
                      <stop offset="50%" stopColor={categoryColors[category]} stopOpacity={0.8}/>
                      <stop offset="100%" stopColor={categoryColors[category]} stopOpacity={0.6}/>
                    </linearGradient>
                    <filter id={`shadow-${category}`}>
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={categoryColors[category]} floodOpacity="0.3"/>
                    </filter>
                  </React.Fragment>
                ))}
              </defs>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={130}
                paddingAngle={4}
                dataKey="cost"
                startAngle={90}
                endAngle={450}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient-${entry.name})`}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={1}
                    filter={`url(#shadow-${entry.name})`}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(10, 10, 10, 0.98)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  borderRadius: '16px',
                  backdropFilter: 'blur(40px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  padding: '12px 16px',
                  color: '#ffffff'
                }}
                labelStyle={{ color: '#ffffff', fontWeight: '700', fontSize: '14px' }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Monthly Cost']}
                labelFormatter={(label) => `${label} Category`}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={50}
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => (
                  <span style={{
                    color: '#e0e0e0', 
                    fontSize: '13px', 
                    fontWeight: '500',
                    textShadow: '0 0 10px rgba(255,255,255,0.1)'
                  }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <div className="header">
            <h3>7-Month Cost Trends</h3>
            <div className="total-cost">+{monthlyIncrease}% growth</div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={costTrends} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4757" stopOpacity={0.6}/>
                  <stop offset="40%" stopColor="#ff4757" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#ff4757" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="paymentsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#635bff" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#635bff" stopOpacity={0.5}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid 
                strokeDasharray="2 4" 
                stroke="rgba(255,255,255,0.06)" 
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                stroke="#a0a0a0" 
                fontSize={13}
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a0a0a0' }}
              />
              <YAxis 
                stroke="#a0a0a0" 
                fontSize={13}
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a0a0a0' }}
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              />
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
                  fontSize: '15px',
                  marginBottom: '8px'
                }}
                formatter={(value, name) => [
                  `$${value.toLocaleString()}`, 
                  name === 'total' ? 'Total Cost' : 'Payment Processing'
                ]}
                labelFormatter={(label) => `${label} 2024`}
                itemStyle={{ color: '#ffffff' }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#ff4757" 
                fill="url(#totalGradient)" 
                strokeWidth={4}
                dot={{ 
                  fill: '#ff4757', 
                  strokeWidth: 3, 
                  stroke: '#ffffff',
                  r: 6,
                  filter: 'url(#glow)'
                }}
                activeDot={{ 
                  r: 8, 
                  fill: '#ff4757',
                  stroke: '#ffffff',
                  strokeWidth: 3,
                  filter: 'url(#glow)'
                }}
              />
              <Bar 
                dataKey="payments" 
                fill="url(#paymentsGradient)" 
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </ServiceContainer>
  );
};

export default ServiceCostsPanel;