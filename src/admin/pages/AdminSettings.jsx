import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUser, FaBell, FaShieldAlt, FaDatabase, FaKey, FaPalette,
  FaGlobe, FaEnvelope, FaSms, FaCreditCard, FaDownload, FaUpload,
  FaToggleOn, FaToggleOff, FaSave, FaEdit, FaTrash, FaPlus,
  FaEye, FaEyeSlash, FaCog, FaServer, FaLock, FaUsers
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

const SettingsContainer = styled.div`
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;

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
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsSidebar = styled.div`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  height: fit-content;
`;

const SidebarItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.active ? 'rgba(251, 182, 4, 0.1)' : 'transparent'};
  border: none;
  border-radius: 10px;
  color: ${props => props.active ? '#fbb604' : '#cccccc'};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  .icon {
    font-size: 1.1rem;
    color: ${props => props.active ? '#fbb604' : '#888888'};
  }

  .label {
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

const SettingsContent = styled.div`
  background: linear-gradient(135deg, #0f0f0f 0%, #151515 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;

  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    color: #888888;
    font-size: 0.9rem;
  }
`;

const SettingGroup = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  h3 {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon {
      color: #fbb604;
      font-size: 1rem;
    }
  }
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);

  &:last-child {
    border-bottom: none;
  }

  .info {
    flex: 1;

    .title {
      color: white;
      font-weight: 600;
      font-size: 0.95rem;
      margin-bottom: 0.25rem;
    }

    .description {
      color: #888888;
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }

  .control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const Toggle = styled.button`
  background: ${props => props.active ? '#10b981' : '#374151'};
  border: none;
  border-radius: 20px;
  width: 48px;
  height: 24px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    transition: all 0.3s ease;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: rgba(255, 107, 53, 0.5);
    background: rgba(255, 255, 255, 0.05);
  }

  &::placeholder {
    color: #666666;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: rgba(255, 107, 53, 0.5);
  }

  option {
    background: #0f0f0f;
    color: white;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.primary ? 'linear-gradient(135deg, #fbb604 0%, #f99b04 100%)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.primary ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  color: ${props => props.primary ? 'white' : '#cccccc'};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(135deg, #f99b04 0%, #fbb604 100%)' : 'rgba(255, 255, 255, 0.08)'};
    transform: translateY(-1px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile settings
    email: 'admin@revolvo.tech',
    firstName: 'Admin',
    lastName: 'User',
    timezone: 'UTC-8',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    criticalAlerts: true,
    
    // Security settings
    twoFactorAuth: false,
    sessionTimeout: '24',
    passwordExpiry: '90',
    
    // System settings
    dataRetention: '365',
    backupFrequency: 'daily',
    maintenanceMode: false,
    
    // API settings
    rateLimiting: true,
    corsOrigins: 'https://revolvo.tech',
    webhookUrl: '',
    
    // Billing settings
    currency: 'USD',
    taxRate: '8.5',
    invoicePrefix: 'REV'
  });

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'system', label: 'System', icon: <FaDatabase /> },
    { id: 'api', label: 'API & Integration', icon: <FaKey /> },
    { id: 'billing', label: 'Billing', icon: <FaCreditCard /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <>
            <SectionHeader>
              <h2>Profile Settings</h2>
              <p>Manage your account information and preferences</p>
            </SectionHeader>

            <SettingGroup>
              <h3><FaUser className="icon" /> Personal Information</h3>
              <SettingItem>
                <div className="info">
                  <div className="title">Email Address</div>
                  <div className="description">Your primary email for account notifications</div>
                </div>
                <div className="control">
                  <Input 
                    type="email" 
                    value={settings.email}
                    onChange={(e) => updateSetting('email', e.target.value)}
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">First Name</div>
                  <div className="description">Your first name as shown in the dashboard</div>
                </div>
                <div className="control">
                  <Input 
                    type="text" 
                    value={settings.firstName}
                    onChange={(e) => updateSetting('firstName', e.target.value)}
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Last Name</div>
                  <div className="description">Your last name as shown in the dashboard</div>
                </div>
                <div className="control">
                  <Input 
                    type="text" 
                    value={settings.lastName}
                    onChange={(e) => updateSetting('lastName', e.target.value)}
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Timezone</div>
                  <div className="description">Your local timezone for date and time display</div>
                </div>
                <div className="control">
                  <Select 
                    value={settings.timezone}
                    onChange={(e) => updateSetting('timezone', e.target.value)}
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">GMT (UTC+0)</option>
                  </Select>
                </div>
              </SettingItem>
            </SettingGroup>
          </>
        );

      case 'notifications':
        return (
          <>
            <SectionHeader>
              <h2>Notification Settings</h2>
              <p>Control how and when you receive notifications</p>
            </SectionHeader>

            <SettingGroup>
              <h3><FaBell className="icon" /> Email Notifications</h3>
              <SettingItem>
                <div className="info">
                  <div className="title">Email Notifications</div>
                  <div className="description">Receive notifications via email</div>
                </div>
                <div className="control">
                  <Toggle 
                    active={settings.emailNotifications}
                    onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Weekly Reports</div>
                  <div className="description">Receive weekly summary reports</div>
                </div>
                <div className="control">
                  <Toggle 
                    active={settings.weeklyReports}
                    onClick={() => updateSetting('weeklyReports', !settings.weeklyReports)}
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Critical Alerts</div>
                  <div className="description">Immediate notifications for critical issues</div>
                </div>
                <div className="control">
                  <Toggle 
                    active={settings.criticalAlerts}
                    onClick={() => updateSetting('criticalAlerts', !settings.criticalAlerts)}
                  />
                </div>
              </SettingItem>
            </SettingGroup>
          </>
        );

      case 'security':
        return (
          <>
            <SectionHeader>
              <h2>Security Settings</h2>
              <p>Manage your account security and access controls</p>
            </SectionHeader>

            <SettingGroup>
              <h3><FaShieldAlt className="icon" /> Authentication</h3>
              <SettingItem>
                <div className="info">
                  <div className="title">Two-Factor Authentication</div>
                  <div className="description">Add an extra layer of security to your account</div>
                </div>
                <div className="control">
                  <Toggle 
                    active={settings.twoFactorAuth}
                    onClick={() => updateSetting('twoFactorAuth', !settings.twoFactorAuth)}
                  />
                  <Button>Configure</Button>
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Session Timeout</div>
                  <div className="description">Automatically log out after inactivity (hours)</div>
                </div>
                <div className="control">
                  <Select 
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                  >
                    <option value="1">1 hour</option>
                    <option value="4">4 hours</option>
                    <option value="8">8 hours</option>
                    <option value="24">24 hours</option>
                  </Select>
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Password Expiry</div>
                  <div className="description">Force password change after (days)</div>
                </div>
                <div className="control">
                  <Select 
                    value={settings.passwordExpiry}
                    onChange={(e) => updateSetting('passwordExpiry', e.target.value)}
                  >
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="never">Never</option>
                  </Select>
                </div>
              </SettingItem>
            </SettingGroup>
          </>
        );

      case 'system':
        return (
          <>
            <SectionHeader>
              <h2>System Settings</h2>
              <p>Configure system-wide settings and maintenance</p>
            </SectionHeader>

            <SettingGroup>
              <h3><FaServer className="icon" /> System Configuration</h3>
              <SettingItem>
                <div className="info">
                  <div className="title">Maintenance Mode</div>
                  <div className="description">Enable maintenance mode to restrict access</div>
                </div>
                <div className="control">
                  <Toggle 
                    active={settings.maintenanceMode}
                    onClick={() => updateSetting('maintenanceMode', !settings.maintenanceMode)}
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Data Retention</div>
                  <div className="description">How long to keep analytics data (days)</div>
                </div>
                <div className="control">
                  <Select 
                    value={settings.dataRetention}
                    onChange={(e) => updateSetting('dataRetention', e.target.value)}
                  >
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                  </Select>
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Backup Frequency</div>
                  <div className="description">How often to backup system data</div>
                </div>
                <div className="control">
                  <Select 
                    value={settings.backupFrequency}
                    onChange={(e) => updateSetting('backupFrequency', e.target.value)}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </Select>
                </div>
              </SettingItem>
            </SettingGroup>
          </>
        );

      case 'api':
        return (
          <>
            <SectionHeader>
              <h2>API & Integration Settings</h2>
              <p>Configure API access and third-party integrations</p>
            </SectionHeader>

            <SettingGroup>
              <h3><FaKey className="icon" /> API Configuration</h3>
              <SettingItem>
                <div className="info">
                  <div className="title">Rate Limiting</div>
                  <div className="description">Enable API rate limiting for security</div>
                </div>
                <div className="control">
                  <Toggle 
                    active={settings.rateLimiting}
                    onClick={() => updateSetting('rateLimiting', !settings.rateLimiting)}
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">CORS Origins</div>
                  <div className="description">Allowed origins for cross-origin requests</div>
                </div>
                <div className="control">
                  <Input 
                    type="text" 
                    value={settings.corsOrigins}
                    onChange={(e) => updateSetting('corsOrigins', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Webhook URL</div>
                  <div className="description">URL to receive webhook notifications</div>
                </div>
                <div className="control">
                  <Input 
                    type="url" 
                    value={settings.webhookUrl}
                    onChange={(e) => updateSetting('webhookUrl', e.target.value)}
                    placeholder="https://your-webhook-url.com"
                  />
                </div>
              </SettingItem>
            </SettingGroup>
          </>
        );

      case 'billing':
        return (
          <>
            <SectionHeader>
              <h2>Billing Settings</h2>
              <p>Manage billing preferences and invoice settings</p>
            </SectionHeader>

            <SettingGroup>
              <h3><FaCreditCard className="icon" /> Billing Configuration</h3>
              <SettingItem>
                <div className="info">
                  <div className="title">Currency</div>
                  <div className="description">Default currency for billing and reports</div>
                </div>
                <div className="control">
                  <Select 
                    value={settings.currency}
                    onChange={(e) => updateSetting('currency', e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </Select>
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Tax Rate</div>
                  <div className="description">Default tax rate percentage</div>
                </div>
                <div className="control">
                  <Input 
                    type="number" 
                    value={settings.taxRate}
                    onChange={(e) => updateSetting('taxRate', e.target.value)}
                    placeholder="8.5"
                    step="0.1"
                  />
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Invoice Prefix</div>
                  <div className="description">Prefix for invoice numbers</div>
                </div>
                <div className="control">
                  <Input 
                    type="text" 
                    value={settings.invoicePrefix}
                    onChange={(e) => updateSetting('invoicePrefix', e.target.value)}
                    placeholder="REV"
                  />
                </div>
              </SettingItem>
            </SettingGroup>
          </>
        );

      case 'appearance':
        return (
          <>
            <SectionHeader>
              <h2>Appearance Settings</h2>
              <p>Customize the look and feel of your dashboard</p>
            </SectionHeader>

            <SettingGroup>
              <h3><FaPalette className="icon" /> Theme Preferences</h3>
              <SettingItem>
                <div className="info">
                  <div className="title">Theme Mode</div>
                  <div className="description">Choose your preferred theme</div>
                </div>
                <div className="control">
                  <Select>
                    <option value="dark">Dark Mode</option>
                    <option value="light">Light Mode</option>
                    <option value="auto">Auto</option>
                  </Select>
                </div>
              </SettingItem>
              <SettingItem>
                <div className="info">
                  <div className="title">Accent Color</div>
                  <div className="description">Primary accent color for the interface</div>
                </div>
                <div className="control">
                  <Select>
                    <option value="orange">Orange (Default)</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                  </Select>
                </div>
              </SettingItem>
            </SettingGroup>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SettingsContainer>
      <PageHeader>
        <h1>Settings</h1>
        <p>Manage your account, security, and system preferences</p>
      </PageHeader>

      <SettingsGrid>
        <SettingsSidebar>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </SidebarItem>
          ))}
        </SettingsSidebar>

        <SettingsContent>
          {renderContent()}
          
          <ActionButtons>
            <Button>
              <FaDownload /> Export Settings
            </Button>
            <Button primary>
              <FaSave /> Save Changes
            </Button>
          </ActionButtons>
        </SettingsContent>
      </SettingsGrid>
    </SettingsContainer>
  );
};

export default AdminSettings;