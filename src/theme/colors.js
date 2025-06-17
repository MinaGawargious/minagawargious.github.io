// Centralized color palette for the portfolio website
// All colors used throughout the application should be defined here

// Default colors (fallback)
const defaultColors = {
  // Primary brand colors
  primary: {
    main: '#ffffff',        // Main primary color (dark mode)
    light: '#005577',       // Primary color for light mode
  },
  
  // Secondary colors
  secondary: {
    main: '#8892b0',        // Secondary text color (dark mode)
    light: '#222b3a',       // Secondary color for light mode
  },
  
  // Background colors
  background: {
    dark: '#0a192f',        // Main background (dark mode)
    light: '#f5f7fa',       // Main background (light mode)
    paper: {
      dark: '#112240',      // Paper/section background (dark mode)
      light: '#ffffff',        // Paper/section background (light mode)
    },
  },
  
  // Text colors
  text: {
    tertiary: {
      dark: '#8892b0',     // Tertiary text color (dark mode)
      light: '#8892b0',    // Tertiary text color (light mode)
    },
    quaternary: {
      dark: '#8892b0',     // Quaternary text color (dark mode)
      light: '#8892b0',    // Quaternary text color (light mode)
    },
  },
  
  // Utility colors
  utility: {
    overlay: {
      dark: '#ffffff',  // White overlay with transparency (dark mode)
      light: '#ffffff', // White overlay with transparency (light mode)
    },
    shadow: {
      dark: '#000000',         // Shadow color (dark mode)
      light: '#000000',        // Shadow color (light mode)
    },
    pdfBackground: '#222222',                 // PDF viewer background
  },
  
  // Scrollbar colors
  scrollbar: {
    track: {
      dark: '#0a192f',       // Scrollbar track background (dark mode)
      light: '#f5f7fa',      // Scrollbar track background (light mode)
    },
    thumb: {
      dark: '#ffffff',       // Scrollbar thumb color (dark mode)
      light: '#005577',      // Scrollbar thumb color (light mode)
    },
  },
  
  // Cursor colors
  cursor: {
    primary: {
      dark: '#005577',     // Primary cursor color (dark mode)
      light: '#005577',    // Primary cursor color (light mode)
    },
    accent: {
      dark: '#8892b0',      // Accent cursor color (dark mode)
      light: '#8892b0',     // Accent cursor color (light mode)
    },
  },
};

// Function to get colors (will be overridden by ColorContext)
let getColors = () => defaultColors;

// Function to set the color getter (used by ColorContext)
export const setColorGetter = (colorGetter) => {
  getColors = colorGetter;
};

// Export colors object that dynamically gets current colors
export const colors = new Proxy({}, {
  get(target, prop) {
    const currentColors = getColors();
    return currentColors[prop];
  }
});

// Helper function to get theme-aware colors
export const getThemeColors = (mode) => {
  const currentColors = getColors();
  
  return {
  primary: {
      main: mode === 'dark' ? currentColors.primary.main : currentColors.primary.light,
  },
  secondary: {
      main: mode === 'dark' ? currentColors.secondary.main : currentColors.secondary.light,
  },
  background: {
      default: mode === 'dark' ? currentColors.background.dark : currentColors.background.light,
      paper: mode === 'dark' ? currentColors.background.paper.dark : currentColors.background.paper.light,
  },
  text: {
      primary: mode === 'dark' ? currentColors.text.tertiary.dark : currentColors.text.tertiary.light,
      secondary: mode === 'dark' ? currentColors.text.quaternary.dark : currentColors.text.quaternary.light,
  },
  utility: {
      overlay: mode === 'dark' ? currentColors.utility.overlay.dark : currentColors.utility.overlay.light,
      shadow: mode === 'dark' ? currentColors.utility.shadow.dark : currentColors.utility.shadow.light,
      pdfBackground: currentColors.utility.pdfBackground,
  },
  cursor: {
      primary: mode === 'dark' ? currentColors.cursor.primary.dark : currentColors.cursor.primary.light,
      accent: mode === 'dark' ? currentColors.cursor.accent.dark : currentColors.cursor.accent.light,
  },
  scrollbar: {
      track: mode === 'dark' ? currentColors.scrollbar.track.dark : currentColors.scrollbar.track.light,
      thumb: mode === 'dark' ? currentColors.scrollbar.thumb.dark : currentColors.scrollbar.thumb.light,
  },
  };
};

// Export individual color groups for direct access
export const getPrimary = () => getColors().primary;
export const getSecondary = () => getColors().secondary;
export const getBackground = () => getColors().background;
export const getText = () => getColors().text;
export const getUtility = () => getColors().utility;
export const getScrollbar = () => getColors().scrollbar;
export const getCursor = () => getColors().cursor; 

// Check: primary color hover, text color primary, pdfbackground, 