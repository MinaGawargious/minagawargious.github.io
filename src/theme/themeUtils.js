// Theme utilities for managing CSS custom properties
import { getBackground, getText, getScrollbar, getCursor, getPrimary } from './colors';

// Function to update CSS custom properties based on theme mode
export const updateCSSVariables = (mode) => {
  const root = document.documentElement;
  const background = getBackground();
  const text = getText();
  const scrollbar = getScrollbar();
  const cursor = getCursor();
  
  if (mode === 'dark') {
    root.style.setProperty('--color-background', background.dark);
    root.style.setProperty('--color-text', text.tertiary.dark);
    root.style.setProperty('--color-text-secondary', text.quaternary.dark);
    root.style.setProperty('--color-scrollbar-track', scrollbar.track.dark);
    root.style.setProperty('--color-scrollbar-thumb', scrollbar.thumb.dark);
    root.style.setProperty('--color-cursor-primary', cursor.primary);
    root.style.setProperty('--color-cursor-accent', cursor.accent);
  } else {
    root.style.setProperty('--color-background', background.light);
    root.style.setProperty('--color-text', text.tertiary.light);
    root.style.setProperty('--color-text-secondary', text.quaternary.light);
    root.style.setProperty('--color-scrollbar-track', scrollbar.track.light);
    root.style.setProperty('--color-scrollbar-thumb', scrollbar.thumb.light);
    root.style.setProperty('--color-cursor-primary', cursor.primary);
    root.style.setProperty('--color-cursor-accent', cursor.primary);
  }
};

// Function to get theme-aware color values
export const getThemeColor = (colorKey, mode) => {
  const background = getBackground();
  const text = getText();
  const primary = getPrimary();
  
  const colorMap = {
    background: mode === 'dark' ? background.dark : background.light,
    text: mode === 'dark' ? text.tertiary.dark : text.tertiary.light,
    'text-secondary': mode === 'dark' ? text.quaternary.dark : text.quaternary.light,
    primary: mode === 'dark' ? primary.main : primary.light,
    secondary: mode === 'dark' ? primary.main : primary.light, // Using primary as fallback
  };
  
  return colorMap[colorKey] || primary.main;
}; 