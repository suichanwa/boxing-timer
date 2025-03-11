import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../../styles/themes'; // Fixed path: one more level up

// Try to import AsyncStorage, but provide fallbacks if it fails
let AsyncStorage;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  AsyncStorage = {
    getItem: async () => null,
    setItem: async () => {},
  };
  console.warn('AsyncStorage is not available. Theme preferences will not be saved.');
}

export const ThemeContext = createContext({
  isDark: false,
  colors: lightTheme,
  setIsDark: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Get device color scheme
  const deviceTheme = useColorScheme();
  
  // State for theme
  const [isDark, setIsDark] = useState(deviceTheme === 'dark');

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    saveThemePreference();
  }, [isDark]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Save theme preference to storage
  const saveThemePreference = async () => {
    try {
      await AsyncStorage.setItem('APP_THEME', isDark ? 'dark' : 'light');
    } catch (error) {
      console.log('Failed to save theme preference', error);
    }
  };

  // Load theme preference from storage
  const loadThemePreference = async () => {
    try {
      const value = await AsyncStorage.getItem('APP_THEME');
      if (value !== null) {
        setIsDark(value === 'dark');
      }
    } catch (error) {
      console.log('Failed to load theme preference', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors: isDark ? darkTheme : lightTheme,
        setIsDark,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};