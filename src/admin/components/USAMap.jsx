import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import USAMapComponent from "react-usa-map";
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

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .usa-map-container {
    width: 100%;
    max-width: 800px;
    height: 100%;
  }

  svg {
    width: 100% !important;
    height: 100% !important;
    max-width: 100%;
    max-height: 100%;
  }

  @media (max-width: 1200px) {
    height: 350px;
    padding: 1rem;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  background: rgba(8, 8, 8, 0.95);
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 12px;
  padding: 1rem;
  pointer-events: none;
  z-index: 1000;
  backdrop-filter: blur(20px);
  min-width: 200px;

  .state-name {
    color: #fbb604;
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #cccccc;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;

    .value {
      color: white;
      font-weight: 600;
    }

    &.primary .value {
      color: #fbb604;
    }
  }
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1.5rem;
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

// US State performance data with proper state abbreviations
const stateData = {
  "CA": { name: "California", users: 12500, revenue: 45000, growth: 12.5, score: 85 },
  "TX": { name: "Texas", users: 8900, revenue: 32000, growth: 8.3, score: 78 },
  "FL": { name: "Florida", users: 6700, revenue: 24500, growth: 15.2, score: 82 },
  "NY": { name: "New York", users: 9800, revenue: 38000, growth: 6.8, score: 80 },
  "IL": { name: "Illinois", users: 5400, revenue: 18500, growth: 9.1, score: 73 },
  "PA": { name: "Pennsylvania", users: 4200, revenue: 15200, growth: 7.4, score: 71 },
  "OH": { name: "Ohio", users: 3800, revenue: 13800, growth: 5.9, score: 69 },
  "GA": { name: "Georgia", users: 4600, revenue: 16700, growth: 11.3, score: 75 },
  "NC": { name: "North Carolina", users: 3500, revenue: 12400, growth: 8.7, score: 72 },
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
  "MO": { name: "Missouri", users: 1800, revenue: 6200, growth: 3.7, score: 62 },
  "WI": { name: "Wisconsin", users: 2300, revenue: 8100, growth: 5.2, score: 66 },
  "MN": { name: "Minnesota", users: 2200, revenue: 8400, growth: 6.8, score: 71 },
  "AL": { name: "Alabama", users: 1600, revenue: 5500, growth: 4.1, score: 63 },
  "SC": { name: "South Carolina", users: 1700, revenue: 6100, growth: 7.3, score: 68 },
  "OR": { name: "Oregon", users: 1900, revenue: 7200, growth: 9.4, score: 74 },
  "KY": { name: "Kentucky", users: 1400, revenue: 4800, growth: 3.9, score: 61 },
  "LA": { name: "Louisiana", users: 1500, revenue: 5200, growth: 4.6, score: 62 },
  "UT": { name: "Utah", users: 1800, revenue: 6800, growth: 11.2, score: 76 },
  "NV": { name: "Nevada", users: 1600, revenue: 5900, growth: 8.9, score: 72 },
  "CT": { name: "Connecticut", users: 1300, revenue: 5100, growth: 4.3, score: 69 },
  "OK": { name: "Oklahoma", users: 1200, revenue: 4200, growth: 3.5, score: 58 },
  "KS": { name: "Kansas", users: 1100, revenue: 3800, growth: 2.9, score: 56 },
  "IA": { name: "Iowa", users: 1000, revenue: 3500, growth: 2.4, score: 54 },
  "AR": { name: "Arkansas", users: 900, revenue: 3100, growth: 2.1, score: 52 },
  "MS": { name: "Mississippi", users: 800, revenue: 2800, growth: 1.8, score: 50 },
  "NE": { name: "Nebraska", users: 850, revenue: 2900, growth: 2.3, score: 53 },
  "NM": { name: "New Mexico", users: 950, revenue: 3300, growth: 3.2, score: 57 },
  "ID": { name: "Idaho", users: 1050, revenue: 3600, growth: 4.1, score: 61 },
  "WV": { name: "West Virginia", users: 750, revenue: 2500, growth: 1.5, score: 48 },
  "HI": { name: "Hawaii", users: 1200, revenue: 4500, growth: 6.2, score: 68 },
  "ME": { name: "Maine", users: 980, revenue: 3400, growth: 3.8, score: 60 },
  "NH": { name: "New Hampshire", users: 1100, revenue: 4100, growth: 4.5, score: 65 },
  "VT": { name: "Vermont", users: 720, revenue: 2600, growth: 2.7, score: 55 },
  "RI": { name: "Rhode Island", users: 890, revenue: 3200, growth: 3.4, score: 58 },
  "DE": { name: "Delaware", users: 780, revenue: 2900, growth: 3.1, score: 57 },
  "MT": { name: "Montana", users: 650, revenue: 2300, growth: 2.2, score: 52 },
  "WY": { name: "Wyoming", users: 520, revenue: 1900, growth: 1.9, score: 50 },
  "ND": { name: "North Dakota", users: 580, revenue: 2100, growth: 2.0, score: 51 },
  "SD": { name: "South Dakota", users: 610, revenue: 2200, growth: 2.4, score: 53 },
  "AK": { name: "Alaska", users: 480, revenue: 1800, growth: 1.7, score: 49 }
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

const USAMap = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedMetric, setSelectedMetric] = useState("score");
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
    
    // Create gradient from dark to gold
    const minColor = [40, 40, 40]; // Darker for visibility
    const maxColor = [251, 182, 4]; // Gold color
    
    const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * intensity);
    const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * intensity);
    const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * intensity);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Create the states config for react-usa-map
  const statesCustomConfig = () => {
    const config = {};
    Object.entries(stateData).forEach(([stateCode, data]) => {
      config[stateCode] = {
        fill: getColorForValue(data[selectedMetric], selectedMetric),
        clickHandler: (event) => console.log('Clicked on ', stateCode)
      };
    });
    return config;
  };

  const mapHandler = (event) => {
    const stateCode = event.target.dataset.name;
    const data = stateData[stateCode];
    
    if (data) {
      setHoveredState({ code: stateCode, ...data });
      setTooltipPosition({ 
        x: event.pageX + 10, 
        y: event.pageY - 10 
      });
    }
  };

  const mapMouseLeave = () => {
    setHoveredState(null);
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
          <p>Interactive US map showing state-level performance metrics</p>
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
          <MapWrapper>
            <div className="usa-map-container">
              <USAMapComponent
                customize={statesCustomConfig()}
                onClick={mapHandler}
                onMouseOver={mapHandler}
                onMouseOut={mapMouseLeave}
                width="100%"
                height="100%"
              />
            </div>

            {/* Tooltip */}
            {hoveredState && (
              <Tooltip
                style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="state-name">{hoveredState.name}</div>
                <div className="metric primary">
                  <span>Performance Score:</span>
                  <span className="value">{hoveredState.score}/100</span>
                </div>
                <div className="metric">
                  <span>Active Users:</span>
                  <span className="value">{hoveredState.users.toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span>Revenue:</span>
                  <span className="value">${hoveredState.revenue.toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span>Growth Rate:</span>
                  <span className="value">+{hoveredState.growth}%</span>
                </div>
              </Tooltip>
            )}
          </MapWrapper>

          <Legend>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgb(40, 40, 40)" }}></div>
              <span>Low Performance</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgba(251, 182, 4, 0.3)" }}></div>
              <span>Medium Performance</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgba(251, 182, 4, 0.7)" }}></div>
              <span>High Performance</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "#fbb604" }}></div>
              <span>Excellent Performance</span>
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

export default USAMap;