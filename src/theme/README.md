# Centralized Color System

This directory contains the centralized color system for the portfolio website. All colors used throughout the application are defined here for easy maintenance and consistency.

## Files

### `colors.js`
The main color palette file containing all color definitions organized by semantic meaning:

- **Primary Colors**: Main brand colors (`#64ffda`, `#005577`, `#4cd8b2`)
- **Secondary Colors**: Supporting colors (`#8892b0`, `#222b3a`)
- **Background Colors**: Background variants for dark/light modes
- **Text Colors**: Text color definitions
- **Utility Colors**: Special purpose colors (shadows, overlays, etc.)
- **Scrollbar Colors**: Custom scrollbar styling colors
- **Cursor Colors**: Custom cursor SVG colors

### `themeUtils.js`
Utility functions for theme management:

- `updateCSSVariables(mode)`: Updates CSS custom properties based on theme mode
- `getThemeColor(colorKey, mode)`: Gets theme-aware color values

## Usage

### In React Components
```javascript
import { primary, secondary, utility } from '../theme/colors';

// Use colors directly
<Box sx={{ bgcolor: primary.main, color: secondary.main }}>
  Content
</Box>

// Use utility colors
<Box sx={{ boxShadow: `0 4px 8px ${utility.shadow}` }}>
  Card
</Box>
```

### In Theme Configuration
```javascript
import { getThemeColors } from './theme/colors';

const themeColors = getThemeColors(mode);
// Use themeColors.primary.main, themeColors.background.default, etc.
```

### In CSS
The system automatically updates CSS custom properties:
```css
.my-element {
  background-color: var(--color-background);
  color: var(--color-text);
}
```

## Adding New Colors

1. Add the color to the appropriate section in `colors.js`
2. If it's theme-dependent, add it to the `getThemeColors()` function
3. If it needs CSS custom properties, add it to `updateCSSVariables()` in `themeUtils.js`

## Benefits

- **Single Source of Truth**: All colors defined in one place
- **Easy Maintenance**: Change colors in one file to update everywhere
- **Theme Consistency**: Ensures consistent colors across dark/light modes
- **Type Safety**: Import specific color groups for better IDE support
- **Future-Proof**: Easy to add new themes or color schemes

## Color Categories

- **Primary**: Main brand colors used for headings, buttons, and accents
- **Secondary**: Supporting colors for text and secondary elements
- **Background**: Background colors for different sections and surfaces
- **Text**: Text color definitions
- **Utility**: Special purpose colors like shadows, overlays, and PDF backgrounds
- **Scrollbar**: Custom scrollbar styling
- **Cursor**: Custom cursor SVG colors 