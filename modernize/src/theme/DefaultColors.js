const baselightTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#FFB800',
      light: '#FFF9E6',
      dark: '#E6A500',
    },
    secondary: {
      main: '#49BEFF',
      light: '#E8F7FF',
      dark: '#23afdb',
    },
    success: {
      main: '#13DEB9',
      light: '#E6FFFA',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',
    },
    text: {
      primary: '#2A3547',
      secondary: '#2A3547',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
    background: {
      default: '#ffffff',
    },
  },
};

const baseDarkTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#FFB800',
      light: '#FFF9E6',
      dark: '#E6A500',
    },
    secondary: {
      main: '#777e89',
      light: '#2a2a2a',
      dark: '#173f98',
    },
    success: {
      main: '#13DEB9',
      light: '#2a2a2a',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#2a2a2a',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#2a2a2a',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#2a2a2a',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#2a2a2a',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#2a2a2a',
      200: '#333333',
      300: '#666666',
      400: '#999999',
      500: '#cccccc',
      600: '#ffffff',
      A700: '#333333',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
    action: {
      disabledBackground: 'rgba(255,255,255,0.12)',
      hoverOpacity: 0.08,
      hover: '#333333',
    },
    divider: '#333333',
    background: {
      default: '#1a1a1a',
      dark: '#1a1a1a',
      paper: '#1a1a1a',
    },
  },
};

export { baseDarkTheme, baselightTheme };
