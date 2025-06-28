import { css } from 'styled-components';

// Main theme colors and styles
export const darkTheme = {
  colors: {
    primary: '#ffffff',
    secondary: '#e0e0e0',
    accent: '#ffffff',
    background: 'transparent',
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

// =============================================================================
// REVOLVO DESIGN SYSTEM
// Comprehensive styling guidelines for consistent UI/UX
// =============================================================================

export const designSystem = {
  // ---------------------------------------------------------------------------
  // COLOR PALETTE
  // ---------------------------------------------------------------------------
  colors: {
    // Primary Brand Colors
    primary: {
      gold: '#fbb604',           // Main accent color (buttons, highlights)
      goldLight: '#f59e0b',      // Lighter gold variant
      goldDark: '#d97706',       // Darker gold variant
      goldDeep: '#b45309',       // Deepest gold for shadows/depth
      yellow: '#FFEB3B',         // Bright yellow (logo accent)
    },
    
    // Secondary Colors
    secondary: {
      blue: '#3b82f6',           // Electric blue (eyes, accents)
      blueLight: '#60a5fa',      // Light blue variant
      blueDark: '#1d4ed8',       // Dark blue variant
      cyan: '#00d4ff',           // Cyan accent
    },
    
    // Neutral Colors
    neutral: {
      black: '#000000',          // Pure black background
      darkGray: '#1a1a1a',       // Dark gray for cards
      mediumGray: '#4a5568',     // Medium gray for borders
      lightGray: '#6b7280',      // Light gray for text
      white: '#ffffff',          // Pure white
      offWhite: '#f8f8f8',       // Off-white for subtle elements
    },
    
    // Text Colors
    text: {
      primary: '#ffffff',        // Main text color
      secondary: 'rgba(255, 255, 255, 0.8)',  // Secondary text
      muted: 'rgba(255, 255, 255, 0.6)',      // Muted text
      accent: '#fbb604',         // Accent text color
    },
    
    // Background Colors
    background: {
      primary: '#000000',        // Main background
      secondary: 'rgba(255, 255, 255, 0.05)',  // Card backgrounds
      accent: 'rgba(251, 182, 4, 0.1)',        // Accent backgrounds
    },
    
    // Border Colors
    border: {
      primary: 'rgba(255, 255, 255, 0.1)',     // Main borders
      accent: 'rgba(251, 182, 4, 0.3)',        // Accent borders
      focus: '#fbb604',                         // Focus states
    }
  },

  // ---------------------------------------------------------------------------
  // TYPOGRAPHY
  // ---------------------------------------------------------------------------
  typography: {
    // Font Families
    fonts: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Courier New", monospace',
    },
    
    // Font Sizes & Weights
    scale: {
      // Headings
      h1: {
        fontSize: '4.5rem',      // 72px
        fontWeight: '800',
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
        '@media (max-width: 1024px)': { fontSize: '3.5rem' },
        '@media (max-width: 768px)': { fontSize: '2.8rem' },
        '@media (max-width: 480px)': { fontSize: '2.2rem' },
      },
      h2: {
        fontSize: '3.5rem',      // 56px
        fontWeight: '800',
        lineHeight: '1.1',
        letterSpacing: '-0.01em',
        '@media (max-width: 768px)': { fontSize: '2.5rem' },
      },
      h3: {
        fontSize: '2.5rem',      // 40px
        fontWeight: '700',
        lineHeight: '1.2',
        '@media (max-width: 768px)': { fontSize: '2rem' },
      },
      h4: {
        fontSize: '2.2rem',      // 35px
        fontWeight: '700',
        lineHeight: '1.3',
        '@media (max-width: 768px)': { fontSize: '1.8rem' },
      },
      h5: {
        fontSize: '1.8rem',      // 29px
        fontWeight: '600',
        lineHeight: '1.3',
      },
      h6: {
        fontSize: '1.5rem',      // 24px
        fontWeight: '600',
        lineHeight: '1.4',
      },
      
      // Body Text
      bodyLarge: {
        fontSize: '1.25rem',     // 20px
        fontWeight: '400',
        lineHeight: '1.7',
        letterSpacing: '0.3px',
        '@media (max-width: 768px)': { fontSize: '1.1rem' },
      },
      body: {
        fontSize: '1.1rem',      // 18px
        fontWeight: '400',
        lineHeight: '1.6',
      },
      bodySmall: {
        fontSize: '1rem',        // 16px
        fontWeight: '400',
        lineHeight: '1.6',
      },
      
      // UI Elements
      button: {
        fontSize: '1.1rem',      // 18px
        fontWeight: '600',
        letterSpacing: '0.5px',
      },
      buttonLarge: {
        fontSize: '1.2rem',      // 19px
        fontWeight: '700',
        letterSpacing: '0.5px',
      },
      caption: {
        fontSize: '0.9rem',      // 14px
        fontWeight: '500',
        lineHeight: '1.4',
      },
      small: {
        fontSize: '0.8rem',      // 13px
        fontWeight: '400',
        lineHeight: '1.4',
      },
    }
  },

  // ---------------------------------------------------------------------------
  // SPACING SYSTEM
  // ---------------------------------------------------------------------------
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
    huge: '96px',
    
    // Section Spacing
    sectionPadding: '120px 8% 80px',
    sectionPaddingMobile: '80px 5% 40px',
    
    // Component Spacing
    cardPadding: '30px',
    buttonPadding: '18px 40px',
    inputPadding: '15px 20px',
  },

  // ---------------------------------------------------------------------------
  // COMPONENT STYLES
  // ---------------------------------------------------------------------------
  components: {
    // Buttons
    button: {
      primary: {
        background: 'linear-gradient(135deg, #FFCA28, #fbb604, #f99b04)',
        color: '#000',
        borderRadius: '12px',
        padding: '18px 40px',
        fontWeight: '700',
        fontSize: '1.1rem',
        letterSpacing: '0.5px',
        boxShadow: '0 8px 25px rgba(255, 202, 40, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        hover: {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: '0 15px 40px rgba(255, 202, 40, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3)',
          filter: 'brightness(1.1)',
        }
      },
      secondary: {
        background: 'transparent',
        border: '2px solid rgba(251, 182, 4, 0.6)',
        color: '#fbb604',
        borderRadius: '12px',
        padding: '16px 38px',
        fontWeight: '600',
        fontSize: '1.1rem',
        letterSpacing: '0.5px',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        hover: {
          transform: 'translateY(-4px) scale(1.02)',
          borderColor: '#fbb604',
          color: '#000',
          background: 'linear-gradient(135deg, #fbb604, #f99b04)',
          boxShadow: '0 15px 40px rgba(251, 182, 4, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)',
        }
      }
    },
    
    // Cards
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      hover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(251, 182, 4, 0.3)',
      }
    },
    
    // Inputs
    input: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      padding: '15px 20px',
      color: '#ffffff',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      focus: {
        borderColor: '#fbb604',
        boxShadow: '0 0 0 3px rgba(251, 182, 4, 0.1)',
        outline: 'none',
      }
    }
  },

  // ---------------------------------------------------------------------------
  // GRADIENTS & EFFECTS
  // ---------------------------------------------------------------------------
  effects: {
    gradients: {
      primary: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #fbb604 100%)',
      accent: 'linear-gradient(135deg, #fbb604, #f99b04, #d39404)',
      text: 'linear-gradient(135deg, #fbb604, #f99b04)',
      background: 'linear-gradient(135deg, rgba(251, 182, 4, 0.1), rgba(249, 155, 4, 0.1))',
    },
    
    shadows: {
      small: '0 2px 8px rgba(0, 0, 0, 0.1)',
      medium: '0 8px 25px rgba(0, 0, 0, 0.15)',
      large: '0 15px 35px rgba(0, 0, 0, 0.2)',
      glow: '0 0 20px rgba(251, 182, 4, 0.3)',
      glowHover: '0 0 30px rgba(251, 182, 4, 0.5)',
    },
    
    animations: {
      transition: 'all 0.3s ease',
      transitionSmooth: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
      hover: 'transform 0.3s ease, box-shadow 0.3s ease',
    }
  },

  // ---------------------------------------------------------------------------
  // BREAKPOINTS
  // ---------------------------------------------------------------------------
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1200px',
    wide: '1440px',
  },

  // ---------------------------------------------------------------------------
  // USAGE EXAMPLES
  // ---------------------------------------------------------------------------
  examples: {
    // Page Title
    pageTitle: {
      fontSize: '4.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #fbb604 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '30px',
    },
    
    // Section Title
    sectionTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: '20px',
    },
    
    // Body Text
    bodyText: {
      fontSize: '1.25rem',
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.7',
      letterSpacing: '0.3px',
    },
    
    // Accent Text
    accentText: {
      background: 'linear-gradient(135deg, #fbb604, #f99b04)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }
  },

  // ---------------------------------------------------------------------------
  // ANIMATION & MOTION SYSTEM
  // ---------------------------------------------------------------------------
  motion: {
    // Easing curves
    easing: {
      smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      snappy: 'cubic-bezier(0.4, 0, 0.2, 1)',
      gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    
    // Durations
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
      slower: '0.8s',
    },
    
    // Page transitions
    pageTransition: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: 'easeInOut' }
    },
    
    // Hover effects
    hover: {
      lift: 'translateY(-4px) scale(1.02)',
      glow: '0 15px 40px rgba(255, 202, 40, 0.3)',
      brightness: 'brightness(1.1)',
    },
    
    // Reveal animations
    reveal: {
      fadeUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' }
      },
      fadeLeft: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, ease: 'easeOut' }
      },
      stagger: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  },

  // ---------------------------------------------------------------------------
  // DARK MODE ENHANCEMENTS
  // ---------------------------------------------------------------------------
  darkMode: {
    // Enhanced color palette for dark mode
    colors: {
      background: {
        primary: '#000000',
        secondary: 'rgba(255, 255, 255, 0.03)',
        tertiary: 'rgba(255, 255, 255, 0.06)',
        elevated: 'rgba(255, 255, 255, 0.08)',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.8)',
        muted: 'rgba(255, 255, 255, 0.6)',
        accent: '#E0B23B', // Slightly desaturated for calm night-mode feel
      },
      accent: {
        primary: '#E0B23B', // Desaturated yellow for dark mode
        secondary: '#F9C643', // Warmer yellow variant
        glow: 'rgba(224, 178, 59, 0.3)',
      },
      border: {
        primary: 'rgba(255, 255, 255, 0.08)',
        secondary: 'rgba(255, 255, 255, 0.12)',
        accent: 'rgba(224, 178, 59, 0.3)',
      }
    },
    
    // Cursor effects
    cursor: {
      glow: `
        .cursor-glow {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(224, 178, 59, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
          transition: transform 0.1s ease;
        }
      `,
      trail: `
        .cursor-trail {
          position: fixed;
          width: 6px;
          height: 6px;
          background: rgba(224, 178, 59, 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
        }
      `
    }
  },
};

// Helper function to get design system values
export const getDesignToken = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], designSystem);
};

// CSS Custom Properties for easy usage
export const cssVariables = `
  :root {
    /* Colors */
    --color-primary-gold: ${designSystem.colors.primary.gold};
    --color-primary-gold-light: ${designSystem.colors.primary.goldLight};
    --color-primary-gold-dark: ${designSystem.colors.primary.goldDark};
    --color-secondary-blue: ${designSystem.colors.secondary.blue};
    --color-text-primary: ${designSystem.colors.text.primary};
    --color-text-secondary: ${designSystem.colors.text.secondary};
    --color-background-primary: ${designSystem.colors.background.primary};
    --color-background-secondary: ${designSystem.colors.background.secondary};
    
    /* Typography */
    --font-primary: ${designSystem.typography.fonts.primary};
    --font-size-h1: ${designSystem.typography.scale.h1.fontSize};
    --font-size-body: ${designSystem.typography.scale.body.fontSize};
    --font-size-button: ${designSystem.typography.scale.button.fontSize};
    
    /* Spacing */
    --spacing-sm: ${designSystem.spacing.sm};
    --spacing-md: ${designSystem.spacing.md};
    --spacing-lg: ${designSystem.spacing.lg};
    --spacing-xl: ${designSystem.spacing.xl};
    
    /* Effects */
    --gradient-primary: ${designSystem.effects.gradients.primary};
    --gradient-accent: ${designSystem.effects.gradients.accent};
    --shadow-medium: ${designSystem.effects.shadows.medium};
    --shadow-glow: ${designSystem.effects.shadows.glow};
    
    /* Transitions */
    --transition-smooth: ${designSystem.effects.animations.transitionSmooth};
  }
`;

// Export the design system as default
export default designSystem; 