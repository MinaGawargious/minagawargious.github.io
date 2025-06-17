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

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#64ffda' : '#005577',
    },
    secondary: {
      main: mode === 'dark' ? '#8892b0' : '#222b3a',
    },
    background: {
      default: mode === 'dark' ? '#0a192f' : '#f5f7fa',
      paper: mode === 'dark' ? '#112240' : '#fff',
    },
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

function App() {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleTheme = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const darkCursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g transform=\"rotate(-120 16 16)\"><polygon points=\"8,8 24,16 8,24\" fill=\"%23005577\" stroke=\"%2364ffda\" stroke-width=\"2\"/><circle cx=\"26\" cy=\"16\" r=\"3\" fill=\"white\" stroke=\"%2364ffda\" stroke-width=\"2\"/><line x1=\"4\" y1=\"16\" x2=\"8\" y2=\"16\" stroke=\"%2364ffda\" stroke-width=\"2\"/></g></svg>') 8 6, auto";
    const lightCursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g transform=\"rotate(-120 16 16)\"><polygon points=\"8,8 24,16 8,24\" fill=\"%23005577\" stroke=\"%23005577\" stroke-width=\"2\"/><circle cx=\"26\" cy=\"16\" r=\"3\" fill=\"white\" stroke=\"%23005577\" stroke-width=\"2\"/><line x1=\"4\" y1=\"16\" x2=\"8\" y2=\"16\" stroke=\"%23005577\" stroke-width=\"2\"/></g></svg>') 8 6, auto";
    document.body.style.cursor = mode === 'dark' ? darkCursor : lightCursor;
  }, [mode]);

  // Helper function to determine background color
  const getSectionBgColor = (index) => {
    return index % 2 === 0 ? 'background.paper' : 'background.default';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header toggleTheme={toggleTheme} mode={mode} />
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

export default App;
