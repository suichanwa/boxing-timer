// Import gesture handler at the very top
import 'react-native-gesture-handler';

// React core imports
import React, { useState, useEffect } from 'react';
import { LogBox, StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Navigation imports 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

// Import theme provider
import { ThemeProvider } from './src/context/ThemeContext';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import TrainingScreen from './src/screens/TrainingScreen';
import WorkoutSettings from './src/screens/WorkoutSettings';
import SettingsScreen from './src/screens/SettingsScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import Frame from './src/screens/Frame';

// Create navigation stack
const Stack = createStackNavigator();

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'ViewPropTypes will be removed from React Native',
  'Screen native module hasn\'t been linked',
  'TurboModuleRegistry.getEnforcing',
  'react-native-gesture-handler module was not found'
]);

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Loading state for screens initialization
  const [isReady, setIsReady] = useState(false);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  // Setup effect for initializing
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load/initialize anything else required here
        setTimeout(() => {
          setIsReady(true);
        }, 100);
      } catch (e) {
        console.warn('Error loading app:', e);
      }
    }
    prepare();
  }, []);
  
  // Hide splash screen when fonts are loaded and app is ready
  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              gestureEnabled: false
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Training" component={TrainingScreen} />
            <Stack.Screen name="WorkoutSettings" component={WorkoutSettings} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="Frame" component={Frame} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}