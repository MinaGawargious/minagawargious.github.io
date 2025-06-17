import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Palette as PaletteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useColorContext } from '../theme/ColorContext';

// Utility functions for color conversion
const rgbaToHex = (rgba) => {
  if (!rgba || typeof rgba !== 'string') return '#000000';
  
  // If it's already a hex color, return it
  if (rgba.startsWith('#')) return rgba;
  
  // Handle rgba format
  const rgbaMatch = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]);
    const g = parseInt(rgbaMatch[2]);
    const b = parseInt(rgbaMatch[3]);
    
    // Convert to hex
    const hex = '#' + 
      Math.round(r).toString(16).padStart(2, '0') +
      Math.round(g).toString(16).padStart(2, '0') +
      Math.round(b).toString(16).padStart(2, '0');
    
    return hex;
  }
  
  return '#000000';
};

const hexToRgba = (hex, alpha = 1) => {
  if (!hex || !hex.startsWith('#')) return `rgba(0, 0, 0, ${alpha})`;
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ColorPicker = ({ open, onClose, mode, customCursorEnabled, setCustomCursorEnabled }) => {
  const { customColors, updateColor } = useColorContext();
  const [localColors, setLocalColors] = useState(customColors);
  const [inputValues, setInputValues] = useState({});
  const [lastValidColors, setLastValidColors] = useState({});
  
  // Refs for debouncing
  const debounceTimeouts = useRef({});
  const pendingUpdates = useRef(new Set());

  // Update local colors when dialog opens to ensure we have current colors
  useEffect(() => {
    if (open) {
      // Always use the current colors from context, not saved localStorage values
      setLocalColors(customColors);
      
      // Initialize input values and last valid colors
      const newInputValues = {};
      const newLastValidColors = {};
      
      // Helper to populate values for all color fields
      const populateValues = (category, subcategory, property, value) => {
        const fieldKey = `${category}-${subcategory || 'main'}-${property || 'main'}`;
        const displayValue = rgbaToHex(value);
        newInputValues[fieldKey] = displayValue;
        newLastValidColors[fieldKey] = displayValue;
      };
      
      // Populate for all color fields
      populateValues('primary', null, 'main', customColors.primary.main);
      populateValues('primary', null, 'light', customColors.primary.light);
      populateValues('secondary', null, 'main', customColors.secondary.main);
      populateValues('secondary', null, 'light', customColors.secondary.light);
      populateValues('background', null, 'dark', customColors.background.dark);
      populateValues('background', null, 'light', customColors.background.light);
      populateValues('background', 'paper', 'dark', customColors.background.paper.dark);
      populateValues('background', 'paper', 'light', customColors.background.paper.light);
      populateValues('text', 'tertiary', 'dark', customColors.text.tertiary.dark);
      populateValues('text', 'tertiary', 'light', customColors.text.tertiary.light);
      populateValues('text', 'quaternary', 'dark', customColors.text.quaternary.dark);
      populateValues('text', 'quaternary', 'light', customColors.text.quaternary.light);
      populateValues('utility', 'overlay', 'dark', customColors.utility.overlay.dark);
      populateValues('utility', 'overlay', 'light', customColors.utility.overlay.light);
      populateValues('utility', 'shadow', 'dark', customColors.utility.shadow.dark);
      populateValues('utility', 'shadow', 'light', customColors.utility.shadow.light);
      populateValues('scrollbar', 'track', 'dark', customColors.scrollbar.track.dark);
      populateValues('scrollbar', 'track', 'light', customColors.scrollbar.track.light);
      populateValues('scrollbar', 'thumb', 'dark', customColors.scrollbar.thumb.dark);
      populateValues('scrollbar', 'thumb', 'light', customColors.scrollbar.thumb.light);
      populateValues('cursor', 'primary', 'dark', customColors.cursor.primary.dark);
      populateValues('cursor', 'primary', 'light', customColors.cursor.primary.light);
      populateValues('cursor', 'accent', 'dark', customColors.cursor.accent.dark);
      populateValues('cursor', 'accent', 'light', customColors.cursor.accent.light);
      
      setInputValues(newInputValues);
      setLastValidColors(newLastValidColors);
    } else {
      // Clean up timeouts when dialog closes
      Object.values(debounceTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      debounceTimeouts.current = {};
      pendingUpdates.current.clear();
    }
  }, [open, customColors]);

  const handleColorChange = useCallback((category, subcategory, property, value) => {
    setLocalColors(prev => {
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

    // Apply change immediately
    updateColor(category, subcategory, property, value);
  }, [updateColor]);

  // Helper function to validate hex color
  const isValidHex = (color) => {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  };

  // Debounced color update function
  const debouncedColorUpdate = useCallback((category, subcategory, property, value, originalValue) => {
    const fieldKey = `${category}-${subcategory || 'main'}-${property || 'main'}`;
    
    // Clear existing timeout for this field
    if (debounceTimeouts.current[fieldKey]) {
      clearTimeout(debounceTimeouts.current[fieldKey]);
    }
    
    // Set new timeout
    debounceTimeouts.current[fieldKey] = setTimeout(() => {
      // Only update if this is still the most recent update
      if (pendingUpdates.current.has(fieldKey)) {
        pendingUpdates.current.delete(fieldKey);
        
        const isRgba = originalValue && originalValue.includes('rgba');
        if (isRgba) {
          const alpha = originalValue.match(/rgba?\([^)]*,\s*([\d.]+)\)/)?.[1] || '1';
          const rgbaValue = hexToRgba(value, parseFloat(alpha));
          handleColorChange(category, subcategory, property, rgbaValue);
        } else {
          handleColorChange(category, subcategory, property, value);
        }
        
        // Update last valid color
        setLastValidColors(prev => ({ ...prev, [fieldKey]: value }));
      }
    }, 150); // 150ms delay
  }, [handleColorChange]);

  // Helper function to handle color updates
  const updateColorIfValid = (category, subcategory, property, newValue, originalValue) => {
    if (isValidHex(newValue)) {
      const fieldKey = `${category}-${subcategory || 'main'}-${property || 'main'}`;
      
      // Mark this field as having a pending update
      pendingUpdates.current.add(fieldKey);
      
      // Use debounced update for color picker interactions
      debouncedColorUpdate(category, subcategory, property, newValue, originalValue);
    }
  };

  // Handle blur/enter - revert to last valid if current is invalid
  const handleFinishEditing = (fieldKey) => {
    if (!isValidHex(inputValues[fieldKey])) {
      setInputValues(prev => ({ ...prev, [fieldKey]: lastValidColors[fieldKey] }));
    }
  };

  const handleReset = () => {
    // Define default colors
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
    
    // Update local state immediately
    setLocalColors(defaultColors);
    
    // Apply all changes to context immediately
    Object.keys(defaultColors).forEach(category => {
      const categoryData = defaultColors[category];
      if (typeof categoryData === 'object' && !Array.isArray(categoryData)) {
        Object.keys(categoryData).forEach(subcategory => {
          const subcategoryData = categoryData[subcategory];
          if (typeof subcategoryData === 'object' && !Array.isArray(subcategoryData)) {
            Object.keys(subcategoryData).forEach(property => {
              updateColor(category, subcategory, property, subcategoryData[property]);
            });
          } else {
            updateColor(category, subcategory, null, subcategoryData);
          }
        });
      } else {
        updateColor(category, null, null, categoryData);
      }
    });
  };

  const handleClose = () => {
    // Reset any unsaved changes by reloading from context
    setLocalColors(customColors);
    onClose();
  };

  const renderColorField = (category, subcategory, property, value, label) => {
    const fieldKey = `${category}-${subcategory || 'main'}-${property || 'main'}`;
    
    // Convert rgba to hex for display if needed
    const displayValue = rgbaToHex(value);
    const isRgba = value && value.includes('rgba');
    const inputValue = inputValues[fieldKey] || displayValue;
    
    return (
      <Grid item xs={12} sm={6} md={6} key={fieldKey}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: '0 0 auto' }}>
            <input
              type="color"
              value={displayValue}
              onChange={(e) => {
                const newValue = e.target.value;
                updateColorIfValid(category, subcategory, property, newValue, value);
              }}
              style={{
                width: '40px',
                height: '40px',
                border: '2px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: 0,
                backgroundColor: value,
              }}
            />
            {isRgba && (
              <Tooltip title="This color uses transparency (rgba). The hex value shown is the solid color equivalent.">
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: 'white',
                    cursor: 'help',
                  }}
                >
                  α
                </Box>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              size="small"
              label={label}
              value={inputValue}
              onChange={(e) => {
                const newValue = e.target.value;
                // Prevent deleting the # character
                if (!newValue.startsWith('#')) {
                  return; // Don't update if # is missing
                }
                // Only allow valid hex digits after the #
                const hexPart = newValue.slice(1); // Remove the #
                const validHexPart = hexPart.replace(/[^0-9A-Fa-f]/g, ''); // Keep only valid hex digits
                const filteredValue = '#' + validHexPart;
                
                setInputValues(prev => ({ ...prev, [fieldKey]: filteredValue }));
                updateColorIfValid(category, subcategory, property, filteredValue, value);
              }}
              onBlur={() => handleFinishEditing(fieldKey)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleFinishEditing(fieldKey);
                  e.target.blur();
                }
              }}
              sx={{ width: '100%' }}
            />
          </Box>
        </Box>
      </Grid>
    );
  };

  // Helper to render all color fields for a given mode
  const renderModeColors = (mode) => {
    const isDark = mode === 'dark';
    return (
      <Grid container spacing={2}>
        {/* Text Colors */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Text Colors</Typography>
          <Grid container spacing={2}>
            {renderColorField('primary', null, isDark ? 'main' : 'light', localColors.primary[isDark ? 'main' : 'light'], 'Primary')}
            {renderColorField('secondary', null, isDark ? 'main' : 'light', localColors.secondary[isDark ? 'main' : 'light'], 'Secondary')}
            {renderColorField('text', 'tertiary', isDark ? 'dark' : 'light', localColors.text.tertiary[isDark ? 'dark' : 'light'], 'Tertiary')}
            {renderColorField('text', 'quaternary', isDark ? 'dark' : 'light', localColors.text.quaternary[isDark ? 'dark' : 'light'], 'Quaternary')}
          </Grid>
        </Grid>
        {/* Background */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Background Colors</Typography>
          <Grid container spacing={2}>
            {renderColorField('background', 'paper', isDark ? 'dark' : 'light', localColors.background.paper[isDark ? 'dark' : 'light'], 'Odd Sections')}
            {renderColorField('background', null, isDark ? 'dark' : 'light', localColors.background[isDark ? 'dark' : 'light'], 'Even Sections')}
          </Grid>
        </Grid>
        {/* Utility */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Utility Colors</Typography>
          <Grid container spacing={2}>
            {renderColorField('utility', 'overlay', isDark ? 'dark' : 'light', localColors.utility.overlay[isDark ? 'dark' : 'light'], 'Experience Image')}
            {renderColorField('utility', 'shadow', isDark ? 'dark' : 'light', localColors.utility.shadow[isDark ? 'dark' : 'light'], 'Hover Shadow')}
          </Grid>
        </Grid>
        {/* Scrollbar */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Scrollbar Colors</Typography>
          <Grid container spacing={2}>
            {renderColorField('scrollbar', 'track', isDark ? 'dark' : 'light', localColors.scrollbar.track[isDark ? 'dark' : 'light'], 'Track')}
            {renderColorField('scrollbar', 'thumb', isDark ? 'dark' : 'light', localColors.scrollbar.thumb[isDark ? 'dark' : 'light'], 'Thumb')}
          </Grid>
        </Grid>
        {/* Cursor - Only show if custom cursor is enabled */}
        {customCursorEnabled && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Cursor Colors</Typography>
            <Grid container spacing={2}>
              {renderColorField('cursor', 'primary', isDark ? 'dark' : 'light', localColors.cursor.primary[isDark ? 'dark' : 'light'], 'Body Color')}
              {renderColorField('cursor', 'accent', isDark ? 'dark' : 'light', localColors.cursor.accent[isDark ? 'dark' : 'light'], 'Accent')}
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '80vh',
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PaletteIcon />
          Customize Colors
        </Typography>
        <Tooltip title="Reset to Default Colors">
          <IconButton onClick={handleReset} color="warning">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            People have different color preferences, so I added a color picker. Click on any color swatch to open the color picker, or type a hex value directly.
            Changes apply immediately as you type or pick colors.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={customCursorEnabled}
                onChange={(e) => setCustomCursorEnabled(e.target.checked)}
                color="primary"
              />
            }
            label="Custom Cursor"
            labelPlacement="start"
          />
        </Box>
        
        <Accordion defaultExpanded={mode === 'dark'}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaletteIcon />
              Dark Mode Colors
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {renderModeColors('dark')}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={mode === 'light'}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaletteIcon />
              Light Mode Colors
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {renderModeColors('light')}
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorPicker; 