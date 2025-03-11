import { Color } from './GlobalStyles';

// Light theme (based on existing colors)
export const lightTheme = {
  // Background colors
  background: Color.white,
  surface: Color.background,
  surfaceVariant: Color.colorGhostwhite,
  
  // Text colors
  textPrimary: Color.textPrimary,
  textSecondary: Color.textSecondary,
  textInverted: Color.white,

  // UI colors
  primary: Color.primary,
  active: Color.active,
  roundColor: Color.roundColor,
  restColor: Color.restColor,
  
  // Utility
  divider: Color.orangeDarkTextHeading,
  border: Color.colorGray_200,
  
  // Status
  error: '#ff3b30',
};

// Dark theme
export const darkTheme = {
  // Background colors
  background: '#121212', // Dark background
  surface: '#1E1E1E',    // Slightly lighter dark
  surfaceVariant: '#2A2A2A', // Card/item backgrounds
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textInverted: '#000000',

  // UI colors (keeping some the same for brand recognition)
  primary: Color.primary,  // Same purple
  active: Color.active,    // Same orange
  roundColor: Color.roundColor, // Same red
  restColor: Color.restColor,   // Same blue
  
  // Utility
  divider: '#333333',
  border: '#333333',
  
  // Status
  error: '#ff453a', // Darker red for dark mode
};