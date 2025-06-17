import React, { createContext, useContext, useState, useEffect } from 'react';
import { setColorGetter } from './colors';

const ColorContext = createContext();

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};

export const ColorProvider = ({ children }) => {
  const [customColors, setCustomColors] = useState(() => {
    // Start with default colors on page load
    const defaultColors = {
      primary: {
        main: '#00bcd4',
        light: '#005577',
      },
      secondary: {
        main: '#8892b0',
        light: '#222b3a',
      },
      background: {
        dark: '#0a192f',
        light: '#f5f7fa',
        paper: {
          dark: '#112240',
          light: '#ffffff',
        },
      },
      text: {
        tertiary: {
          dark: '#8892b0',
          light: '#8892b0',
        },
        quaternary: {
          dark: '#8892b0',
          light: '#8892b0',
        },
      },
      utility: {
        overlay: {
          dark: '#ffffff',
          light: '#ffffff',
        },
        shadow: {
          dark: '#000000',
          light: '#000000',
        },
        pdfBackground: '#222222',
      },
      scrollbar: {
        track: {
          dark: '#0a192f',
          light: '#f5f7fa',
        },
        thumb: {
          dark: '#00bcd4',
          light: '#005577',
        },
      },
      cursor: {
        primary: {
          dark: '#005577',
          light: '#005577',
        },
        accent: {
          dark: '#00bcd4',
          light: '#00bcd4',
        },
      },
    };
    
    return defaultColors;
  });

  // Connect the color getter to colors.js
  useEffect(() => {
    setColorGetter(() => customColors);
  }, [customColors]);

  const updateColor = (category, subcategory, property, value) => {
    setCustomColors(prev => {
      const newColors = { ...prev };
      
      if (subcategory) {
        if (property) {
          newColors[category][subcategory][property] = value;
        } else {
          newColors[category][subcategory] = value;
        }
      } else {
        if (property) {
          newColors[category][property] = value;
        } else {
          newColors[category] = value;
        }
      }
      
      return newColors;
    });
  };

  const resetColors = () => {
    const defaultColors = {
      primary: {
        main: '#00bcd4',
        light: '#005577',
      },
      secondary: {
        main: '#8892b0',
        light: '#222b3a',
      },
      background: {
        dark: '#0a192f',
        light: '#f5f7fa',
        paper: {
          dark: '#112240',
          light: '#ffffff',
        },
      },
      text: {
        tertiary: {
          dark: '#8892b0',
          light: '#8892b0',
        },
        quaternary: {
          dark: '#8892b0',
          light: '#8892b0',
        },
      },
      utility: {
        overlay: {
          dark: '#ffffff',
          light: '#ffffff',
        },
        shadow: {
          dark: '#000000',
          light: '#000000',
        },
        pdfBackground: '#222222',
      },
      scrollbar: {
        track: {
          dark: '#0a192f',
          light: '#f5f7fa',
        },
        thumb: {
          dark: '#00bcd4',
          light: '#005577',
        },
      },
      cursor: {
        primary: {
          dark: '#005577',
          light: '#005577',
        },
        accent: {
          dark: '#00bcd4',
          light: '#00bcd4',
        },
      },
    };
    setCustomColors(defaultColors);
  };

  // Save colors to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-custom-colors', JSON.stringify(customColors));
  }, [customColors]);

  const value = {
    customColors,
    updateColor,
    resetColors,
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
}; 