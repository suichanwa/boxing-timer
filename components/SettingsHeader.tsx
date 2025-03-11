import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Animated } from "react-native";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize, Padding, Gap } from "../../styles/GlobalStyles";
import PremiumBlock from "../../components/PremiumBlock";
import Toggle from "../../components/Toggle";
import { MaterialIcons } from '@expo/vector-icons';

// Import theme hook
import { useTheme } from "../hooks/useTheme";

import { useScreenAnimation } from "../hooks/useScreenAnimation";
import { useStaggeredItems } from "../hooks/useStaggeredItems";
import { useButtonAnimation } from "../hooks/useButtonAnimation";

const SettingsHeader = ({ onBackPress, colors }) => {
  const { scale, rotation, animateThenRun } = useButtonAnimation(-30);

  const handleBackPress = () => {
    animateThenRun(onBackPress);
  };

  return (
    <View style={[styles.header, { borderBottomColor: colors.divider }]}>
      <Animated.View style={{
        transform: [
          { scale },
          { rotate: rotation }
        ]
      }}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <View style={styles.arrowBack}>
            <View style={[styles.arrowLine, { backgroundColor: colors.active }]} />
            <View style={[styles.arrowHead, { borderColor: colors.active }]} />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const SettingItem = ({ label, description, value, onValueChange, animStyle, colors, icon }) => {
  return (
    <Animated.View style={[
      styles.settingRow, 
      animStyle, 
      { borderBottomColor: colors.border }
    ]}>
      <View style={styles.settingLabelContainer}>
        {icon && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>{label}</Text>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{description}</Text>
        </View>
      </View>
      <Toggle 
        value={value}
        onValueChange={onValueChange}
      />
    </Animated.View>
  );
};

const LanguageSelector = ({ label, description, selectedLanguage, onPress, animStyle, colors, icon }) => {
  return (
    <Animated.View style={[
      styles.settingRow, 
      animStyle, 
      { borderBottomColor: colors.border }
    ]}>
      <View style={styles.settingLabelContainer}>
        {icon && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>{label}</Text>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.languageSelector}
        onPress={onPress}
      >
        <Text style={[styles.languageText, { color: colors.textPrimary }]}>{selectedLanguage}</Text>
        <MaterialIcons name="arrow-forward-ios" size={14} color={colors.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const PremiumBanner = ({ onPress, animStyle, colors }) => {
  return (
    <Animated.View style={[styles.premiumBlockContainer, animStyle]}>
      <PremiumBlock 
        onPress={onPress}
        message="Get rid of the annoying ads!"
        price="For 0.99 USD"
      />
    </Animated.View>
  );
};

// Language code to display name mapping
const languageNames = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'zh': 'Chinese',
  'ar': 'Arabic',
  'bn': 'Bengali',
  'ja': 'Japanese',
  'ur': 'Urdu',
  'hi': 'Hindi',
};

// =====================================
// Main Component
// =====================================
const SettingsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get theme context
  const { colors, isDark, toggleTheme } = useTheme();
  
  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [rotationEnabled, setRotationEnabled] = useState(false);
  const [languageCode, setLanguageCode] = useState("en");
  
  const { opacity, translateY, animateOut } = useScreenAnimation();
  
  // Now we need 6 items for animation (including new options)
  const { itemsAnimatedStyles, resetItemAnimations } = useStaggeredItems(6);
  
  // Handle language selection from LanguageScreen
  useEffect(() => {
    if (route.params?.selectedLanguage) {
      setLanguageCode(route.params.selectedLanguage);
    }
  }, [route.params?.selectedLanguage]);
  
  // Fixed handleBack function to ensure we navigate to WorkoutSettings
  const handleBack = () => {
    animateOut(() => {
      // Explicitly navigate to WorkoutSettings instead of just going back
      navigation.navigate("WorkoutSettings");
    });
  };
  
  const handlePremiumPurchase = () => {
    console.log("Premium purchase initiated");
  };

  const handleLanguagePress = () => {
    navigation.navigate("Language", { currentLanguage: languageCode });
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor: colors.background
        }
      ]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <SettingsHeader onBackPress={handleBack} colors={colors} />
          
          {/* Settings Section */}
          <View style={styles.settingsSection}>
            {/* Sound Setting */}
            <SettingItem 
              label="Sound"
              description="Play sounds for timer events"
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              animStyle={itemsAnimatedStyles[0]}
              colors={colors}
              icon={
                <MaterialIcons 
                  name="volume-up" 
                  size={24} 
                  color={colors.textPrimary} 
                />
              }
            />
            
            {/* Vibration Setting */}
            <SettingItem 
              label="Vibration"
              description="Vibrate on timer events"
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              animStyle={itemsAnimatedStyles[1]}
              colors={colors}
              icon={
                <MaterialIcons 
                  name="vibration" 
                  size={24} 
                  color={colors.textPrimary} 
                />
              }
            />
            
            {/* Screen Rotation Setting */}
            <SettingItem 
              label="Screen Rotation"
              description="Allow app to rotate with device"
              value={rotationEnabled}
              onValueChange={setRotationEnabled}
              animStyle={itemsAnimatedStyles[2]}
              colors={colors}
              icon={
                <MaterialIcons 
                  name="screen-rotation" 
                  size={24} 
                  color={colors.textPrimary} 
                />
              }
            />
            
            {/* Language Setting */}
            <LanguageSelector 
              label="Language"
              description="Choose your preferred language"
              selectedLanguage={languageNames[languageCode] || 'English'}
              onPress={handleLanguagePress}
              animStyle={itemsAnimatedStyles[3]}
              colors={colors}
              icon={
                <MaterialIcons 
                  name="language" 
                  size={24} 
                  color={colors.textPrimary} 
                />
              }
            />
            
            {/* App Theme Setting */}
            <SettingItem 
              label="Dark Theme"
              description="Switch between light and dark mode"
              value={isDark}
              onValueChange={toggleTheme}
              animStyle={itemsAnimatedStyles[4]}
              colors={colors}
              icon={
                <MaterialIcons 
                  name={isDark ? "dark-mode" : "light-mode"} 
                  size={24} 
                  color={colors.textPrimary} 
                />
              }
            />
          </View>
          
          {/* Premium Block */}
          <PremiumBanner 
            onPress={handlePremiumPurchase} 
            animStyle={itemsAnimatedStyles[5]} 
            colors={colors}
          />
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBack: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLine: {
    width: 18,
    height: 2,
    position: 'absolute',
    left: 2,
  },
  arrowHead: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 2,
  },
  headerTitle: {
    fontSize: FontSize.large,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  premiumBlockContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    marginTop: 8,
  },
  settingsSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.body,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.regular,
  },
  settingIcon: {
    width: 24,
    height: 24,
  },
  // Language selector styles
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  languageText: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.body,
    marginRight: 4,
  },
});

export default SettingsScreen;