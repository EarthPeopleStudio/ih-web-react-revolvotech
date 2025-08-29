import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaGlobe, FaUsers, FaDollarSign, FaChartLine, FaMapMarkerAlt,
  FaArrowUp, FaArrowDown, FaFilter, FaMedal, FaTimes
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import usSvg from "./us.svg";

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
  height: 500px;
  background: 
    radial-gradient(circle at 30% 20%, rgba(251, 182, 4, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(251, 182, 4, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.2);

  svg {
    width: 100% !important;
    height: 100% !important;
    max-width: 100%;
    max-height: 100%;

    path[id] {
      cursor: pointer !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      fill-rule: evenodd !important;
      transform-origin: center !important;

      &:hover {
        stroke: #fbb604 !important;
        stroke-width: 2.5 !important;
        filter: brightness(1.3) drop-shadow(0 0 8px rgba(251, 182, 4, 0.6)) !important;
        transform: scale(1.02) !important;
        z-index: 10 !important;
      }
    }
  }

  @media (max-width: 1200px) {
    height: 450px;
    padding: 1rem;
  }
`;

const StateDialog = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(10, 10, 10, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 2rem;
  z-index: 2000;
  backdrop-filter: blur(40px);
  min-width: 320px;
  max-width: 400px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(251, 182, 4, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .state-info {
      .state-name {
        color: #fbb604;
        font-weight: 800;
        font-size: 1.4rem;
        margin-bottom: 0.25rem;
        text-shadow: 0 0 15px rgba(251, 182, 4, 0.4);
      }
      
      .state-code {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        transform: scale(1.1);
      }
    }
  }

  .performance-overview {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(251, 182, 4, 0.1) 0%, rgba(251, 182, 4, 0.05) 100%);
    border-radius: 12px;
    border: 1px solid rgba(251, 182, 4, 0.2);

    .score-section {
      .score-label {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      .score-value {
        color: #fbb604;
        font-size: 2.2rem;
        font-weight: 800;
        text-shadow: 0 0 20px rgba(251, 182, 4, 0.4);
        line-height: 1;
      }

      .score-suffix {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.2rem;
        font-weight: 500;
      }
    }

    .performance-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(251, 182, 4, 0.2) 0%, rgba(251, 182, 4, 0.1) 100%);
      border: 1px solid rgba(251, 182, 4, 0.3);
      border-radius: 16px;
      padding: 0.75rem 1rem;
      font-size: 0.85rem;
      color: #fbb604;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-align: center;
      min-width: 100px;
    }
  }

  .metrics-grid {
    display: grid;
    gap: 0.75rem;

    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(251, 182, 4, 0.2);
        transform: translateY(-1px);
      }

      .metric-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #cccccc;
        font-size: 0.9rem;
        font-weight: 500;
        
        .icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(251, 182, 4, 0.1);
          border-radius: 6px;
          color: #fbb604;
          font-size: 0.8rem;
        }
      }

      .metric-value {
        color: white;
        font-weight: 700;
        font-size: 1rem;
      }
    }
  }
`;

const DialogOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1999;
  cursor: pointer;
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

const USASVGMap = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedMetric, setSelectedMetric] = useState("score");
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedStateDialog, setSelectedStateDialog] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    // Load and process the SVG
    fetch(usSvg)
      .then(response => response.text())
      .then(svgText => {
        // Process SVG to add initial colors and styling
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        
        // Fix the root SVG element styling
        const svgElement = svgDoc.querySelector('svg');
        if (svgElement) {
          // Remove the fill: none from root SVG
          svgElement.setAttribute('style', 'stroke-linejoin: round;');
        }
        
        const paths = svgDoc.querySelectorAll('path[id]');
        
        paths.forEach(path => {
          const stateId = path.getAttribute('id');
          const stateInfo = stateData[stateId];
          
          if (stateInfo) {
            // Apply initial color based on score
            const color = getColorForValue(stateInfo.score, 'score');
            path.setAttribute('fill', color);
            path.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
            path.setAttribute('stroke-width', '1');
            // Override any existing styles
            path.removeAttribute('style');
          } else {
            // Default color for states without data
            path.setAttribute('fill', 'rgba(100, 100, 100, 0.3)');
            path.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
            path.setAttribute('stroke-width', '1');
            path.removeAttribute('style');
          }
        });
        
        // Convert back to string
        const serializer = new XMLSerializer();
        const processedSvg = serializer.serializeToString(svgDoc);
        setSvgContent(processedSvg);
      })
      .catch(error => {
        console.error("Error loading SVG:", error);
      });
  }, []);

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
    
    // Enhanced gradient system with multiple color stops
    if (intensity <= 0.2) {
      // Very low performance - dark red to dark orange
      const minColor = [40, 20, 20]; // Dark red
      const maxColor = [80, 40, 30]; // Dark orange
      const localIntensity = intensity / 0.2;
      const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * localIntensity);
      const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * localIntensity);
      const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * localIntensity);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (intensity <= 0.4) {
      // Low performance - dark orange to amber
      const minColor = [80, 40, 30]; // Dark orange
      const maxColor = [160, 80, 20]; // Amber
      const localIntensity = (intensity - 0.2) / 0.2;
      const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * localIntensity);
      const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * localIntensity);
      const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * localIntensity);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (intensity <= 0.6) {
      // Medium performance - amber to yellow
      const minColor = [160, 80, 20]; // Amber
      const maxColor = [200, 150, 40]; // Yellow-orange
      const localIntensity = (intensity - 0.4) / 0.2;
      const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * localIntensity);
      const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * localIntensity);
      const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * localIntensity);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (intensity <= 0.8) {
      // Good performance - yellow to bright gold
      const minColor = [200, 150, 40]; // Yellow-orange
      const maxColor = [251, 182, 4]; // Brand gold
      const localIntensity = (intensity - 0.6) / 0.2;
      const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * localIntensity);
      const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * localIntensity);
      const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * localIntensity);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Excellent performance - bright gold to premium gold with green tint
      const minColor = [251, 182, 4]; // Brand gold
      const maxColor = [255, 215, 0]; // Bright gold
      const localIntensity = (intensity - 0.8) / 0.2;
      const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * localIntensity);
      const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * localIntensity);
      const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * localIntensity);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  const handleStateHover = (event, stateId) => {
    const data = stateData[stateId];
    if (data) {
      setHoveredState({ code: stateId, ...data });
      setTooltipPosition({ 
        x: event.pageX + 10, 
        y: event.pageY - 10 
      });
    }
  };

  const handleStateLeave = () => {
    setHoveredState(null);
  };

  const handleStateClick = (event, stateId) => {
    const data = stateData[stateId];
    if (data) {
      setSelectedStateDialog({ code: stateId, ...data });
      setHoveredState(null); // Hide tooltip when dialog opens
    }
  };

  const closeDialog = () => {
    setSelectedStateDialog(null);
  };

  const addEventListeners = () => {
    const mapContainer = document.querySelector('#usa-svg-map');
    if (!mapContainer) return;
    
    const svg = mapContainer.querySelector('svg');
    if (!svg) return;
    
    const paths = svg.querySelectorAll('path[id]');
    
    paths.forEach(path => {
      const stateId = path.getAttribute('id');
      const stateInfo = stateData[stateId];
      
      if (stateInfo) {
        // Remove existing listeners to prevent duplicates
        path.removeEventListener('mouseenter', path._mouseEnterHandler);
        path.removeEventListener('mouseleave', path._mouseLeaveHandler);
        path.removeEventListener('mousemove', path._mouseMoveHandler);
        path.removeEventListener('click', path._clickHandler);
        
        // Create and store event handlers
        path._mouseEnterHandler = (e) => handleStateHover(e, stateId);
        path._mouseLeaveHandler = handleStateLeave;
        path._mouseMoveHandler = (e) => {
          if (hoveredState && hoveredState.code === stateId) {
            setTooltipPosition({ x: e.pageX + 10, y: e.pageY - 10 });
          }
        };
        path._clickHandler = (e) => handleStateClick(e, stateId);
        
        // Add event listeners
        path.addEventListener('mouseenter', path._mouseEnterHandler);
        path.addEventListener('mouseleave', path._mouseLeaveHandler);
        path.addEventListener('mousemove', path._mouseMoveHandler);
        path.addEventListener('click', path._clickHandler);
        
        // Add hover styles and ensure fill is visible
        path.style.cursor = 'pointer';
        path.style.transition = 'all 0.3s ease';
        path.style.fillRule = 'evenodd';
        
        // Force the fill color
        const stateInfo = stateData[stateId];
        if (stateInfo) {
          const color = getColorForValue(stateInfo[selectedMetric], selectedMetric);
          path.style.fill = color;
        }
      }
    });
  };

  useEffect(() => {
    if (!svgContent) return;
    
    // Add event listeners after SVG content is loaded
    setTimeout(() => {
      addEventListeners();
    }, 100);
  }, [svgContent]);

  useEffect(() => {
    // Update colors when metric changes
    const mapContainer = document.querySelector('#usa-svg-map');
    if (mapContainer) {
      const svg = mapContainer.querySelector('svg');
      if (svg) {
        const paths = svg.querySelectorAll('path[id]');
        paths.forEach(path => {
          const stateId = path.getAttribute('id');
          const stateInfo = stateData[stateId];
          
          if (stateInfo) {
            const color = getColorForValue(stateInfo[selectedMetric], selectedMetric);
            // Use both methods to ensure the color is applied
            path.style.fill = color;
            path.setAttribute('fill', color);
          }
        });
      }
    }
  }, [selectedMetric, svgContent]);

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
            {svgContent && (
              <div
                id="usa-svg-map"
                dangerouslySetInnerHTML={{ __html: svgContent }}
                style={{ width: '100%', height: '100%' }}
              />
            )}

            {/* Quick Hover Tooltip */}
            {hoveredState && !selectedStateDialog && (
              <motion.div
                style={{ 
                  position: 'absolute',
                  left: tooltipPosition.x,
                  top: tooltipPosition.y,
                  background: 'linear-gradient(135deg, rgba(8, 8, 8, 0.95) 0%, rgba(15, 15, 15, 0.9) 100%)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  pointerEvents: 'none',
                  zIndex: 1000,
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(251, 182, 4, 0.4)',
                  minWidth: '200px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4), 0 0 15px rgba(251, 182, 4, 0.1)'
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ 
                  color: '#fbb604', 
                  fontWeight: '700', 
                  fontSize: '0.95rem',
                  marginBottom: '6px',
                  textShadow: '0 0 10px rgba(251, 182, 4, 0.3)'
                }}>
                  {hoveredState.name}
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '4px',
                  color: '#cccccc'
                }}>
                  <span>Score:</span>
                  <span style={{ color: '#fbb604', fontWeight: '600' }}>
                    {hoveredState.score}/100
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '4px',
                  color: '#cccccc'
                }}>
                  <span>Users:</span>
                  <span style={{ color: 'white', fontWeight: '600' }}>
                    {hoveredState.users.toLocaleString()}
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px',
                  color: '#cccccc'
                }}>
                  <span>Growth:</span>
                  <span style={{ 
                    color: hoveredState.growth > 10 ? '#10b981' : hoveredState.growth > 5 ? '#fbb604' : '#ff6b6b', 
                    fontWeight: '600' 
                  }}>
                    +{hoveredState.growth}%
                  </span>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.75rem',
                  fontStyle: 'italic',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '6px'
                }}>
                  Click for detailed view
                </div>
              </motion.div>
            )}
          </MapWrapper>

          {/* State Details Dialog */}
          {selectedStateDialog && (
            <>
              <DialogOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closeDialog}
              />
              <StateDialog
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="dialog-header">
                  <div className="state-info">
                    <div className="state-name">{selectedStateDialog.name}</div>
                    <div className="state-code">{selectedStateDialog.code}</div>
                  </div>
                  <button className="close-btn" onClick={closeDialog}>
                    <FaTimes />
                  </button>
                </div>

                <div className="performance-overview">
                  <div className="score-section">
                    <div className="score-label">Performance Score</div>
                    <div className="score-value">
                      {selectedStateDialog.score}
                      <span className="score-suffix">/100</span>
                    </div>
                  </div>
                  <div className="performance-badge">
                    {selectedStateDialog.score >= 80 ? "🏆 Excellent" :
                     selectedStateDialog.score >= 60 ? "⭐ Great" :
                     selectedStateDialog.score >= 40 ? "📈 Good" :
                     selectedStateDialog.score >= 20 ? "⚠️ Fair" : "🔄 Needs Improvement"}
                  </div>
                </div>

                <div className="metrics-grid">
                  <div className="metric-row">
                    <div className="metric-label">
                      <div className="icon"><FaUsers /></div>
                      Active Users
                    </div>
                    <div className="metric-value">{selectedStateDialog.users.toLocaleString()}</div>
                  </div>
                  
                  <div className="metric-row">
                    <div className="metric-label">
                      <div className="icon"><FaDollarSign /></div>
                      Monthly Revenue
                    </div>
                    <div className="metric-value">${selectedStateDialog.revenue.toLocaleString()}</div>
                  </div>
                  
                  <div className="metric-row">
                    <div className="metric-label">
                      <div className="icon"><FaChartLine /></div>
                      Growth Rate
                    </div>
                    <div className="metric-value">+{selectedStateDialog.growth}%</div>
                  </div>
                  
                  <div className="metric-row">
                    <div className="metric-label">
                      <div className="icon"><FaMapMarkerAlt /></div>
                      Region Rank
                    </div>
                    <div className="metric-value">
                      #{Object.values(stateData)
                        .sort((a, b) => b.score - a.score)
                        .findIndex(state => state.name === selectedStateDialog.name) + 1} of 50
                    </div>
                  </div>
                </div>
              </StateDialog>
            </>
          )}

          <Legend>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgb(40, 20, 20)" }}></div>
              <span>Poor (0-20%)</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgb(160, 80, 20)" }}></div>
              <span>Fair (20-40%)</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgb(200, 150, 40)" }}></div>
              <span>Good (40-60%)</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgb(251, 182, 4)" }}></div>
              <span>Great (60-80%)</span>
            </div>
            <div className="legend-item">
              <div className="color-box" style={{ background: "rgb(255, 215, 0)" }}></div>
              <span>Excellent (80-100%)</span>
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

export default USASVGMap;