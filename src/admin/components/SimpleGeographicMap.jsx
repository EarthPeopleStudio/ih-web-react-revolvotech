import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaGlobe, FaUsers, FaDollarSign, FaChartLine, FaMapMarkerAlt,
  FaArrowUp, FaArrowDown, FaFilter
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

const MapContainer = styled.div`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  width: 100%;
`;

const MapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .title-section {
    h3 {
      color: white;
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .icon {
        color: #fbb604;
        font-size: 1.2rem;
      }
    }

    p {
      color: #888888;
      font-size: 0.9rem;
    }
  }

  .controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const CountrySelector = styled.select`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  min-width: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(251, 182, 4, 0.5);
    background: rgba(255, 255, 255, 0.05);
  }

  option {
    background: #0f0f0f;
    color: white;
    padding: 0.5rem;
  }
`;

const MetricSelector = styled.select`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  min-width: 180px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(251, 182, 4, 0.5);
    background: rgba(255, 255, 255, 0.05);
  }

  option {
    background: #0f0f0f;
    color: white;
  }
`;

const USMapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
`;

const StateCard = styled(motion.div)`
  aspect-ratio: 1;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  position: relative;

  &:hover {
    transform: scale(1.05);
    border-color: #fbb604;
    box-shadow: 0 4px 12px rgba(251, 182, 4, 0.2);
  }

  .state-code {
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.25rem;
  }

  .state-value {
    font-size: 0.6rem;
    color: #cccccc;
    text-align: center;
  }

  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(8, 8, 8, 0.95);
    border: 1px solid rgba(251, 182, 4, 0.3);
    border-radius: 8px;
    padding: 0.75rem;
    min-width: 150px;
    z-index: 100;
    pointer-events: none;
    
    .state-name {
      color: #fbb604;
      font-weight: 700;
      font-size: 0.8rem;
      margin-bottom: 0.25rem;
    }
    
    .metric {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: #cccccc;
      margin-bottom: 0.1rem;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;

  .label {
    color: #888888;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    color: #fbb604;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #cccccc;

    .color-box {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
`;

// US State performance data with abbreviations
const stateData = {
  "CA": { name: "California", users: 12500, revenue: 45000, growth: 12.5, score: 85 },
  "TX": { name: "Texas", users: 8900, revenue: 32000, growth: 8.3, score: 78 },
  "FL": { name: "Florida", users: 6700, revenue: 24500, growth: 15.2, score: 82 },
  "NY": { name: "New York", users: 9800, revenue: 38000, growth: 6.8, score: 80 },
  "IL": { name: "Illinois", users: 5400, revenue: 18500, growth: 9.1, score: 73 },
  "PA": { name: "Pennsylvania", users: 4200, revenue: 15200, growth: 7.4, score: 71 },
  "OH": { name: "Ohio", users: 3800, revenue: 13800, growth: 5.9, score: 69 },
  "GA": { name: "Georgia", users: 4600, revenue: 16700, growth: 11.3, score: 75 },
  "NC": { name: "N. Carolina", users: 3500, revenue: 12400, growth: 8.7, score: 72 },
  "MI": { name: "Michigan", users: 3200, revenue: 11800, growth: 4.2, score: 67 },
  "NJ": { name: "New Jersey", users: 2900, revenue: 11200, growth: 6.1, score: 70 },
  "VA": { name: "Virginia", users: 2700, revenue: 9800, growth: 9.5, score: 74 },
  "WA": { name: "Washington", users: 4100, revenue: 16200, growth: 13.7, score: 81 },
  "AZ": { name: "Arizona", users: 2800, revenue: 9500, growth: 10.2, score: 76 },
  "MA": { name: "Massachusetts", users: 3100, revenue: 12600, growth: 5.4, score: 79 },
  "TN": { name: "Tennessee", users: 2400, revenue: 8700, growth: 7.8, score: 68 },
  "IN": { name: "Indiana", users: 2100, revenue: 7400, growth: 4.9, score: 65 },
  "CO": { name: "Colorado", users: 2600, revenue: 9200, growth: 12.1, score: 77 },
  "MD": { name: "Maryland", users: 1900, revenue: 7800, growth: 6.3, score: 73 },
  "MO": { name: "Missouri", users: 1800, revenue: 6200, growth: 3.7, score: 62 }
};

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" }
];

const metrics = [
  { value: "score", label: "Performance Score" },
  { value: "users", label: "Active Users" },
  { value: "revenue", label: "Revenue Generated" },
  { value: "growth", label: "Growth Rate" }
];

const SimpleGeographicMap = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedMetric, setSelectedMetric] = useState("score");
  const [hoveredState, setHoveredState] = useState(null);

  const getColorForValue = (value, metric) => {
    let intensity;
    switch (metric) {
      case "score":
        intensity = value / 100;
        break;
      case "users":
        intensity = Math.min(value / 15000, 1);
        break;
      case "revenue":
        intensity = Math.min(value / 50000, 1);
        break;
      case "growth":
        intensity = Math.min(value / 20, 1);
        break;
      default:
        intensity = 0.5;
    }
    
    const minColor = [15, 15, 15];
    const maxColor = [251, 182, 4];
    
    const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * intensity);
    const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * intensity);
    const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * intensity);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const totalUsers = Object.values(stateData).reduce((sum, state) => sum + state.users, 0);
  const totalRevenue = Object.values(stateData).reduce((sum, state) => sum + state.revenue, 0);
  const avgGrowth = Object.values(stateData).reduce((sum, state) => sum + state.growth, 0) / Object.values(stateData).length;
  const avgScore = Object.values(stateData).reduce((sum, state) => sum + state.score, 0) / Object.values(stateData).length;

  return (
    <MapContainer>
      <MapHeader>
        <div className="title-section">
          <h3>
            <FaGlobe className="icon" />
            Geographic Performance
          </h3>
          <p>Regional performance metrics by state</p>
        </div>
        <div className="controls">
          <MetricSelector
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            {metrics.map(metric => (
              <option key={metric.value} value={metric.value}>
                {metric.label}
              </option>
            ))}
          </MetricSelector>
          <CountrySelector
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </CountrySelector>
        </div>
      </MapHeader>

      {selectedCountry === "US" && (
        <>
          <USMapGrid>
            {Object.entries(stateData).map(([stateCode, data]) => (
              <StateCard
                key={stateCode}
                color={getColorForValue(data[selectedMetric], selectedMetric)}
                onMouseEnter={() => setHoveredState({ code: stateCode, ...data })}
                onMouseLeave={() => setHoveredState(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="state-code">{stateCode}</div>
                <div className="state-value">
                  {selectedMetric === 'users' ? `${(data[selectedMetric] / 1000).toFixed(1)}k` :
                   selectedMetric === 'revenue' ? `$${(data[selectedMetric] / 1000).toFixed(0)}k` :
                   selectedMetric === 'growth' ? `${data[selectedMetric]}%` :
                   `${data[selectedMetric]}/100`}
                </div>
                
                {hoveredState?.code === stateCode && (
                  <motion.div
                    className="tooltip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="state-name">{data.name}</div>
                    <div className="metric">
                      <span>Score:</span>
                      <span>{data.score}/100</span>
                    </div>
                    <div className="metric">
                      <span>Users:</span>
                      <span>{data.users.toLocaleString()}</span>
                    </div>
                    <div className="metric">
                      <span>Revenue:</span>
                      <span>${data.revenue.toLocaleString()}</span>
                    </div>
                    <div className="metric">
                      <span>Growth:</span>
                      <span>+{data.growth}%</span>
                    </div>
                  </motion.div>
                )}
              </StateCard>
            ))}
          </USMapGrid>

          <Legend>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgba(15, 15, 15, 1)" }}></div>
              <span>Low</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgba(251, 182, 4, 0.3)" }}></div>
              <span>Medium</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgba(251, 182, 4, 0.7)" }}></div>
              <span>High</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "#fbb604" }}></div>
              <span>Excellent</span>
            </div>
          </Legend>

          <StatsGrid>
            <StatItem>
              <div className="label">Total Users</div>
              <div className="value">{totalUsers.toLocaleString()}</div>
            </StatItem>
            <StatItem>
              <div className="label">Total Revenue</div>
              <div className="value">${totalRevenue.toLocaleString()}</div>
            </StatItem>
            <StatItem>
              <div className="label">Avg Growth</div>
              <div className="value">{avgGrowth.toFixed(1)}%</div>
            </StatItem>
            <StatItem>
              <div className="label">Avg Score</div>
              <div className="value">{avgScore.toFixed(0)}/100</div>
            </StatItem>
          </StatsGrid>
        </>
      )}

      {selectedCountry !== "US" && (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          color: '#888888' 
        }}>
          <FaGlobe style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fbb604' }} />
          <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>
            {countries.find(c => c.code === selectedCountry)?.name} Data
          </h4>
          <p>Geographic data visualization for {countries.find(c => c.code === selectedCountry)?.name} coming soon!</p>
        </div>
      )}
    </MapContainer>
  );
};

export default SimpleGeographicMap;