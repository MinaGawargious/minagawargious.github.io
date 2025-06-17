import React, { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Home from './components/Home';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { updateCSSVariables } from './theme/themeUtils';
import { ColorProvider, useColorContext } from './theme/ColorContext';

// Move theme color generation here to make dependencies explicit
const getThemeColors = (mode, colors) => ({
  primary: {
    main: mode === 'dark' ? colors.primary.main : colors.primary.light,
  },
  secondary: {
    main: mode === 'dark' ? colors.secondary.main : colors.secondary.light,
  },
  background: {
    default: mode === 'dark' ? colors.background.dark : colors.background.light,
    paper: mode === 'dark' ? colors.background.paper.dark : colors.background.paper.light,
  },
  text: {
    primary: mode === 'dark' ? colors.text.tertiary.dark : colors.text.tertiary.light,
    secondary: mode === 'dark' ? colors.text.quaternary.dark : colors.text.quaternary.light,
  },
  utility: {
    overlay: mode === 'dark' ? colors.utility.overlay.dark : colors.utility.overlay.light,
    shadow: mode === 'dark' ? colors.utility.shadow.dark : colors.utility.shadow.light,
    pdfBackground: colors.utility.pdfBackground,
  },
  cursor: {
    primary: mode === 'dark' ? colors.cursor.primary.dark : colors.cursor.primary.light,
    accent: mode === 'dark' ? colors.cursor.accent.dark : colors.cursor.accent.light,
  },
});

function AppContent() {
  const [mode, setMode] = useState('dark');
  const [customCursorEnabled, setCustomCursorEnabled] = useState(() => {
    const saved = localStorage.getItem('portfolio-custom-cursor-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const { customColors } = useColorContext();
  
  // Create theme with explicit dependencies
  const theme = useMemo(() => {
    const themeColors = getThemeColors(mode, customColors);
    return createTheme({
      palette: {
        mode,
        ...themeColors,
        utility: themeColors.utility,
      },
      typography: {
        fontFamily: '"Roboto Mono", monospace',
        h1: {
          fontSize: '4rem',
          fontWeight: 600,
        },
        h2: {
          fontSize: '2.5rem',
          fontWeight: 600,
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 600,
        },
      },
    });
  }, [mode, customColors]);
  
  const toggleTheme = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // Save custom cursor setting to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-custom-cursor-enabled', JSON.stringify(customCursorEnabled));
  }, [customCursorEnabled]);

  // Update everything when colors or mode changes
  useEffect(() => {
    // Update CSS variables
    updateCSSVariables(mode);
    
    // Update cursor using theme colors
    if (customCursorEnabled) {
      const themeColors = getThemeColors(mode, customColors);
      const darkCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g transform="rotate(-120 16 16)"><polygon points="8,8 24,16 8,24" fill="${encodeURIComponent(themeColors.cursor.primary)}" stroke="${encodeURIComponent(themeColors.cursor.accent)}" stroke-width="2"/><circle cx="26" cy="16" r="3" fill="white" stroke="${encodeURIComponent(themeColors.cursor.accent)}" stroke-width="2"/><line x1="4" y1="16" x2="8" y2="16" stroke="${encodeURIComponent(themeColors.cursor.accent)}" stroke-width="2"/></g></svg>') 8 6, auto`;
      const lightCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g transform="rotate(-120 16 16)"><polygon points="8,8 24,16 8,24" fill="${encodeURIComponent(themeColors.cursor.primary)}" stroke="${encodeURIComponent(themeColors.cursor.accent)}" stroke-width="2"/><circle cx="26" cy="16" r="3" fill="white" stroke="${encodeURIComponent(themeColors.cursor.accent)}" stroke-width="2"/><line x1="4" y1="16" x2="8" y2="16" stroke="${encodeURIComponent(themeColors.cursor.accent)}" stroke-width="2"/></g></svg>') 8 6, auto`;
      document.body.style.cursor = mode === 'dark' ? darkCursor : lightCursor;
    } else {
      // Use default cursor
      document.body.style.cursor = 'default';
    }
  }, [mode, customColors, customCursorEnabled]);

  // Helper function to determine background color
  const getSectionBgColor = (index) => {
    return index % 2 === 0 ? 'background.paper' : 'background.default';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header toggleTheme={toggleTheme} mode={mode} customCursorEnabled={customCursorEnabled} setCustomCursorEnabled={setCustomCursorEnabled} />
        <Box component="main">
          <Home bgColor={getSectionBgColor(0)} />
          <Education bgColor={getSectionBgColor(1)} />
          <Experience bgColor={getSectionBgColor(2)} />
          <Projects bgColor={getSectionBgColor(3)} />
          <Skills bgColor={getSectionBgColor(4)} />
          <Resume bgColor={getSectionBgColor(5)} />
          <Contact bgColor={getSectionBgColor(6)} />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ColorProvider>
      <AppContent />
    </ColorProvider>
  );
}

export default App;
