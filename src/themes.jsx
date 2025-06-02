import { css } from 'styled-components';

// Main theme colors and styles
export const darkTheme = {
  colors: {
    primary: '#ffffff',
    secondary: '#e0e0e0',
    accent: '#ffffff',
    background: '#000000',
    cardBg: 'rgba(25, 25, 25, 0.95)',
    darkCardBg: '#0A0A0A',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    highlight: '#f8f8f8',
    highlightHover: '#f8f8f8',
    gradientPrimary: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
    gradientHover: 'linear-gradient(135deg, #a0a0a0 0%, #ffffff 100%)',
  },
  buttons: {
    background: '#131313',
    border: 'rgba(255, 255, 255, 0.1)',
    glow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    hoverBackground: '#1a1a1a',
    hoverGlow: '0 6px 20px rgba(0, 0, 0, 0.4)',
    text: '#ffffff',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    section: '80px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    round: '50%',
  },
  typography: {
    fontFamily: "'Poppins', 'Helvetica', 'Arial', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      xxxl: '2.5rem',
      hero: '3.5rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  shadows: {
    small: '0 2px 5px rgba(0, 0, 0, 0.15)',
    medium: '0 10px 30px rgba(0, 0, 0, 0.2)',
    large: '0 15px 50px rgba(0, 0, 0, 0.3)',
    button: '0 4px 15px rgba(0, 0, 0, 0.3)',
    buttonHover: '0 6px 20px rgba(0, 0, 0, 0.4)',
  },
  zIndex: {
    base: 0,
    content: 1,
    header: 1000,
    modal: 2000,
    tooltip: 3000,
  },
};

// Create CSS variables from the theme object
export const themeToVars = theme => css`
  --primary-color: ${theme.colors.primary};
  --secondary-color: ${theme.colors.secondary};
  --accent-color: ${theme.colors.accent};
  --dark-bg: ${theme.colors.background};
  --card-bg: ${theme.colors.cardBg};
  --dark-card-bg: ${theme.colors.darkCardBg};
  --text-primary: ${theme.colors.textPrimary};
  --text-secondary: ${theme.colors.textSecondary};
  --gradient-primary: ${theme.colors.gradientPrimary};
  --gradient-hover: ${theme.colors.gradientHover};
  --border-color: ${theme.colors.borderColor};
  --shadow-color: ${theme.colors.shadowColor};
  --highlight: ${theme.colors.highlight};
  --highlight-hover: ${theme.colors.highlightHover};

  /* Button styles */
  --button-bg: ${theme.buttons.background};
  --button-border: ${theme.buttons.border};
  --button-glow: ${theme.buttons.glow};
  --button-hover-bg: ${theme.buttons.hoverBackground};
  --button-hover-glow: ${theme.buttons.hoverGlow};
  --button-text: ${theme.buttons.text};

  /* Spacing */
  --spacing-xs: ${theme.spacing.xs};
  --spacing-sm: ${theme.spacing.sm};
  --spacing-md: ${theme.spacing.md};
  --spacing-lg: ${theme.spacing.lg};
  --spacing-xl: ${theme.spacing.xl};
  --spacing-xxl: ${theme.spacing.xxl};
  --spacing-section: ${theme.spacing.section};

  /* Border radius */
  --border-radius-sm: ${theme.borderRadius.sm};
  --border-radius-md: ${theme.borderRadius.md};
  --border-radius-lg: ${theme.borderRadius.lg};
  --border-radius-xl: ${theme.borderRadius.xl};
  --border-radius-xxl: ${theme.borderRadius.xxl};
  --border-radius-round: ${theme.borderRadius.round};

  /* Typography */
  --font-family: ${theme.typography.fontFamily};
  --font-size-xs: ${theme.typography.fontSize.xs};
  --font-size-sm: ${theme.typography.fontSize.sm};
  --font-size-md: ${theme.typography.fontSize.md};
  --font-size-lg: ${theme.typography.fontSize.lg};
  --font-size-xl: ${theme.typography.fontSize.xl};
  --font-size-xxl: ${theme.typography.fontSize.xxl};
  --font-size-xxxl: ${theme.typography.fontSize.xxxl};
  --font-size-hero: ${theme.typography.fontSize.hero};

  --font-weight-light: ${theme.typography.fontWeight.light};
  --font-weight-regular: ${theme.typography.fontWeight.regular};
  --font-weight-medium: ${theme.typography.fontWeight.medium};
  --font-weight-semibold: ${theme.typography.fontWeight.semiBold};
  --font-weight-bold: ${theme.typography.fontWeight.bold};
  --font-weight-extrabold: ${theme.typography.fontWeight.extraBold};

  --line-height-tight: ${theme.typography.lineHeight.tight};
  --line-height-normal: ${theme.typography.lineHeight.normal};
  --line-height-relaxed: ${theme.typography.lineHeight.relaxed};

  /* Transitions */
  --transition-fast: ${theme.transitions.fast};
  --transition-normal: ${theme.transitions.normal};
  --transition-slow: ${theme.transitions.slow};

  /* Shadows */
  --shadow-small: ${theme.shadows.small};
  --shadow-medium: ${theme.shadows.medium};
  --shadow-large: ${theme.shadows.large};
  --shadow-button: ${theme.shadows.button};
  --shadow-button-hover: ${theme.shadows.buttonHover};

  /* Z-index */
  --z-index-base: ${theme.zIndex.base};
  --z-index-content: ${theme.zIndex.content};
  --z-index-header: ${theme.zIndex.header};
  --z-index-modal: ${theme.zIndex.modal};
  --z-index-tooltip: ${theme.zIndex.tooltip};
`;

// Common styled components that can be reused across the app
export const commonStyles = {
  // Card component styles
  card: css`
    background: var(--card-bg);
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-lg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-medium);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-large);
      border-color: rgba(255, 255, 255, 0.15);
    }
  `,
  
  // Section container
  section: css`
    padding: var(--spacing-section) 8%;
    position: relative;
  `,
  
  // Gradient text
  gradientText: css`
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,
  
  // Button styles
  button: css`
    padding: var(--spacing-md) var(--spacing-xl);
    border: none;
    border-radius: var(--border-radius-md);
    background: var(--button-bg);
    color: var(--button-text);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: var(--button-glow);
    
    &:hover {
      transform: translateY(-2px);
      background: var(--button-hover-bg);
      box-shadow: var(--button-hover-glow);
    }
  `,
  
  // Input field
  input: css`
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-md);
    color: var(--text-primary);
    font-size: var(--font-size-md);
    transition: border-color var(--transition-normal);

    &:focus {
      outline: none;
      border-color: var(--text-primary);
    }
  `,
  
  // Responsive container
  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    width: 100%;
  `,
  
  // Flex box utilities
  flexRow: css`
    display: flex;
    flex-direction: row;
  `,
  
  flexColumn: css`
    display: flex;
    flex-direction: column;
  `,
  
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  
  // Grid utilities
  grid: css`
    display: grid;
    gap: var(--spacing-lg);
  `,
  
  // Heading styles
  heading1: css`
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-extrabold);
    margin-bottom: var(--spacing-lg);
    color: var(--text-primary);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-xxxl);
    }
  `,
  
  heading2: css`
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }
  `,
  
  heading3: css`
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
  `,
  
  // Paragraph text
  bodyText: css`
    color: var(--text-secondary);
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);
  `,
};

export default darkTheme; 