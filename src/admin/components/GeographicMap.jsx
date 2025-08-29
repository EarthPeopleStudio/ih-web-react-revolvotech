import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
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
  height: 350px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .rsm-geography {
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      stroke: #fbb604;
      stroke-width: 2;
    }
  }

  svg {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    display: block;
  }

  @media (max-width: 1200px) {
    height: 300px;
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

// US State performance data
const stateData = {
  "California": { users: 12500, revenue: 45000, growth: 12.5, score: 85 },
  "Texas": { users: 8900, revenue: 32000, growth: 8.3, score: 78 },
  "Florida": { users: 6700, revenue: 24500, growth: 15.2, score: 82 },
  "New York": { users: 9800, revenue: 38000, growth: 6.8, score: 80 },
  "Illinois": { users: 5400, revenue: 18500, growth: 9.1, score: 73 },
  "Pennsylvania": { users: 4200, revenue: 15200, growth: 7.4, score: 71 },
  "Ohio": { users: 3800, revenue: 13800, growth: 5.9, score: 69 },
  "Georgia": { users: 4600, revenue: 16700, growth: 11.3, score: 75 },
  "North Carolina": { users: 3500, revenue: 12400, growth: 8.7, score: 72 },
  "Michigan": { users: 3200, revenue: 11800, growth: 4.2, score: 67 },
  "New Jersey": { users: 2900, revenue: 11200, growth: 6.1, score: 70 },
  "Virginia": { users: 2700, revenue: 9800, growth: 9.5, score: 74 },
  "Washington": { users: 4100, revenue: 16200, growth: 13.7, score: 81 },
  "Arizona": { users: 2800, revenue: 9500, growth: 10.2, score: 76 },
  "Massachusetts": { users: 3100, revenue: 12600, growth: 5.4, score: 79 },
  "Tennessee": { users: 2400, revenue: 8700, growth: 7.8, score: 68 },
  "Indiana": { users: 2100, revenue: 7400, growth: 4.9, score: 65 },
  "Colorado": { users: 2600, revenue: 9200, growth: 12.1, score: 77 },
  "Maryland": { users: 1900, revenue: 7800, growth: 6.3, score: 73 },
  "Missouri": { users: 1800, revenue: 6200, growth: 3.7, score: 62 }
};

// Major cities with high activity
const cityMarkers = [
  { name: "San Francisco", coordinates: [-122.4194, 37.7749], users: 3200, revenue: 12500 },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522], users: 4100, revenue: 15800 },
  { name: "New York", coordinates: [-74.0059, 40.7128], users: 5600, revenue: 21200 },
  { name: "Chicago", coordinates: [-87.6298, 41.8781], users: 2800, revenue: 9400 },
  { name: "Houston", coordinates: [-95.3698, 29.7604], users: 2100, revenue: 7800 },
  { name: "Miami", coordinates: [-80.1918, 25.7617], users: 1900, revenue: 7200 },
  { name: "Seattle", coordinates: [-122.3321, 47.6062], users: 2400, revenue: 9800 },
  { name: "Austin", coordinates: [-97.7431, 30.2672], users: 1600, revenue: 5900 }
];

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" }
];

const metrics = [
  { value: "score", label: "Performance Score" },
  { value: "users", label: "Active Users" },
  { value: "revenue", label: "Revenue Generated" },
  { value: "growth", label: "Growth Rate" }
];

// US States TopoJSON URL - this is the standard react-simple-maps approach
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const GeographicMap = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedMetric, setSelectedMetric] = useState("score");
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mapError, setMapError] = useState(false);

  const getColorForValue = (value, metric) => {
    let intensity;
    switch (metric) {
      case "score":
        intensity = value / 100; // Score is 0-100
        break;
      case "users":
        intensity = Math.min(value / 15000, 1); // Max users for color scale
        break;
      case "revenue":
        intensity = Math.min(value / 50000, 1); // Max revenue for color scale
        break;
      case "growth":
        intensity = Math.min(value / 20, 1); // Max growth rate for color scale
        break;
      default:
        intensity = 0.5;
    }
    
    // Create gradient from dark to gold
    const minColor = [15, 15, 15]; // Dark background
    const maxColor = [251, 182, 4]; // Gold color
    
    const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * intensity);
    const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * intensity);
    const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * intensity);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleMouseEnter = (geo, event) => {
    const stateName = geo.properties.name;
    const data = stateData[stateName];
    
    if (data) {
      setHoveredState({ name: stateName, data });
      setTooltipPosition({ x: event.pageX + 10, y: event.pageY - 10 });
    }
  };

  const handleMouseMove = (event) => {
    if (hoveredState) {
      setTooltipPosition({ x: event.pageX + 10, y: event.pageY - 10 });
    }
  };

  const handleMouseLeave = () => {
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
          <p>Interactive map showing regional performance metrics</p>
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
          <MapWrapper onMouseMove={handleMouseMove}>
            <ComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{
                scale: 650
              }}
              width={800}
              height={350}
              viewBox="0 0 800 350"
            >
              <ZoomableGroup>
                <Geographies 
                  geography={geoUrl}
                  onGeographyPathError={(error) => {
                    console.error("Geography error:", error);
                    setMapError(true);
                  }}
                >
                  {({ geographies }) => {
                    console.log("Geographies loaded:", geographies.length); // Debug
                    if (geographies.length === 0) {
                      console.warn("No geographies loaded");
                    }
                    return geographies.map(geo => {
                      const stateName = geo.properties?.name || geo.properties?.NAME || geo.properties?.NAME_EN;
                      const stateInfo = stateData[stateName];
                      const fillColor = stateInfo 
                        ? getColorForValue(stateInfo[selectedMetric], selectedMetric)
                        : "rgba(100, 100, 100, 0.3)";

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke="rgba(255, 255, 255, 0.2)"
                          strokeWidth={0.5}
                          onMouseEnter={(event) => handleMouseEnter(geo, event)}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            default: {
                              outline: "none"
                            },
                            hover: {
                              fill: "#fbb604",
                              stroke: "#f99b04",
                              strokeWidth: 2,
                              outline: "none"
                            },
                            pressed: {
                              outline: "none"
                            }
                          }}
                        />
                      );
                    });
                  }}
                </Geographies>

                {/* City Markers */}
                {cityMarkers.map(city => (
                  <Marker key={city.name} coordinates={city.coordinates}>
                    <circle
                      r={Math.sqrt(city.users / 100)}
                      fill="rgba(251, 182, 4, 0.8)"
                      stroke="rgba(251, 182, 4, 1)"
                      strokeWidth={1}
                    />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>

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
                  <span className="value">{hoveredState.data.score}/100</span>
                </div>
                <div className="metric">
                  <span>Active Users:</span>
                  <span className="value">{hoveredState.data.users.toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span>Revenue:</span>
                  <span className="value">${hoveredState.data.revenue.toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span>Growth Rate:</span>
                  <span className="value">+{hoveredState.data.growth}%</span>
                </div>
              </Tooltip>
            )}
          </MapWrapper>

          <Legend>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgba(255, 255, 255, 0.05)" }}></div>
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

export default GeographicMap;