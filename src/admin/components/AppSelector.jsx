import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { HiCode, HiGlobe, HiCog, HiSparkles } from "react-icons/hi";

const SelectorContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SelectorButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  min-width: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(251, 182, 4, 0.3);
  }

  .icon {
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    text-align: left;
    min-width: 0;

    .name {
      font-weight: 600;
      font-size: 0.95rem;
      margin-bottom: 0.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .desc {
      font-size: 0.75rem;
      color: #888888;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .chevron {
    color: #666666;
    transition: transform 0.3s ease;
    flex-shrink: 0;
    font-size: 0.9rem;
    
    &.open {
      transform: rotate(180deg);
    }
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-top: 0.5rem;
  overflow: hidden;
  z-index: 1000;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  max-height: 400px;
  overflow-y: auto;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  min-height: auto;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    background: rgba(251, 182, 4, 0.1);
    border-left: 3px solid #fbb604;
  }

  .icon {
    width: 24px;
    height: 24px;
    background: ${props => props.iconBg || 'rgba(255, 107, 53, 0.1)'};
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: ${props => props.iconColor || '#fbb604'};
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    text-align: left;
    min-width: 0;

    .name {
      font-weight: 600;
      font-size: 0.85rem;
      margin-bottom: 0.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .desc {
      font-size: 0.7rem;
      color: #888888;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .stats {
    text-align: right;
    flex-shrink: 0;
    min-width: 0;
    
    .revenue {
      font-weight: 600;
      color: #10b981;
      font-size: 0.75rem;
      white-space: nowrap;
    }
    
    .status {
      font-size: 0.65rem;
      color: #666666;
      white-space: nowrap;
    }
  }
`;

const apps = [
  {
    id: 'overview',
    name: 'All Apps Overview',
    description: 'Combined metrics across all projects',
    icon: <HiGlobe />,
    iconBg: 'rgba(251, 182, 4, 0.1)',
    iconColor: '#fbb604',
    revenue: '$125,000',
    status: 'Active'
  },
  {
    id: 'choreo',
    name: 'Choreo',
    description: 'Chore marketplace platform',
    icon: <HiSparkles />,
    iconBg: 'rgba(142, 36, 170, 0.1)',
    iconColor: '#8e24aa',
    revenue: '$45,000',
    status: 'Beta'
  },
  {
    id: 'website',
    name: 'Revolvo Website',
    description: 'Main company website',
    icon: <HiCode />,
    iconBg: 'rgba(30, 136, 229, 0.1)',
    iconColor: '#1e88e5',
    revenue: '$35,000',
    status: 'Live'
  },
  {
    id: 'other',
    name: 'Other Projects',
    description: 'Additional client work',
    icon: <HiCog />,
    iconBg: 'rgba(38, 166, 154, 0.1)',
    iconColor: '#26a69a',
    revenue: '$45,000',
    status: 'Various'
  }
];

const AppSelector = ({ selectedApp, onAppSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedAppData = apps.find(app => app.id === selectedApp) || apps[0];

  const handleSelect = (appId) => {
    onAppSelect(appId);
    setIsOpen(false);
  };

  return (
    <SelectorContainer>
      <SelectorButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="icon" style={{ background: selectedAppData.iconBg, color: selectedAppData.iconColor }}>
          {selectedAppData.icon}
        </div>
        <div className="info">
          <div className="name">{selectedAppData.name}</div>
          <div className="desc">{selectedAppData.description}</div>
        </div>
        <FaChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
      </SelectorButton>

      {isOpen && (
        <Dropdown
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {apps.map(app => (
            <DropdownItem
              key={app.id}
              className={selectedApp === app.id ? 'active' : ''}
              onClick={() => handleSelect(app.id)}
              iconBg={app.iconBg}
              iconColor={app.iconColor}
            >
              <div className="icon">
                {app.icon}
              </div>
              <div className="info">
                <div className="name">{app.name}</div>
                <div className="desc">{app.description}</div>
              </div>
              <div className="stats">
                <div className="revenue">{app.revenue}</div>
                <div className="status">{app.status}</div>
              </div>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SelectorContainer>
  );
};

export default AppSelector;