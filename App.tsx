import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from 'react-native-screens';
import { LogBox } from 'react-native';
import { ThemeProvider, ThemeContext } from "./src/context/ThemeContext";

LogBox.ignoreLogs([
  'Unable to find viewstate for tag', // Ignore viewstate tag errors
]);

enableScreens();

// Import screens
import Frame from "./src/screens/Frame";
import HomeScreen from "./src/screens/HomeScreen";
import TrainingScreen from "./src/screens/TrainingScreen";
import WorkoutSettings from "./src/screens/WorkoutSettings";
import SettingsScreen from "./src/screens/SettingsScreen";
// Ensure this import path is correct
import LanguageScreen from "./src/screens/LanguageScreen";

const Stack = createNativeStackNavigator();

// Create a themed navigation container component
const ThemedApp = () => {
  const [hideSplashScreen, setHideSplashScreen] = useState(true);
  
  // Get the current theme
  const { isDark } = React.useContext(ThemeContext);

  // Fix for potential screen rendering issues
  useEffect(() => {
    // Short delay to ensure the app is fully initialized
    const timer = setTimeout(() => {
      setHideSplashScreen(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName="Frame"
          >
            {/* Start with Frame as the initial screen */}
            <Stack.Screen
              name="Frame"
              component={Frame}
              options={{ headerShown: false }}
            />
            {/* Workout Settings screen */}
            <Stack.Screen
              name="WorkoutSettings"
              component={WorkoutSettings}
              options={{ headerShown: false }}
            />
            {/* Settings screen */}
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
            {/* Language selection screen - ensure name is exactly "Language" */}
            <Stack.Screen
              name="Language"
              component={LanguageScreen}
              options={{ headerShown: false }}
            />
            {/* Timer settings screen */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            {/* Active training screen */}
            <Stack.Screen
              name="Training"
              component={TrainingScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
      
      {/* Status bar adapts to theme */}
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
};

// Make sure to verify that the LanguageScreen component exists
// and is properly exported from its file
export default function App() {
  const [fontsLoaded, error] = useFonts({
    "PublicSans-Medium": require("./assets/fonts/PublicSans-Medium.ttf"),
    "PublicSans-SemiBold": require("./assets/fonts/PublicSans-SemiBold.ttf"),
    "PublicSans-Bold": require("./assets/fonts/PublicSans-Bold.ttf"),
    "PublicSans-Regular": require("./assets/fonts/PublicSans-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter_28pt-SemiBold.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter_28pt-Regular.ttf"),
    // Add DMSans font - you'll need to download this font
    "DMSans-Regular": require("./assets/fonts/PublicSans-Regular.ttf"), // Temporarily using PublicSans as fallback
    "DMSans-Bold": require("./assets/fonts/PublicSans-Bold.ttf"), // Temporarily using PublicSans as fallback
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  // Wrap the entire app with ThemeProvider
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}