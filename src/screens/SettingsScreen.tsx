import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Gap, BorderRadius } from "../../styles/GlobalStyles";
import PremiumBlock from "../../components/PremiumBlock";
import Toggle from "../../components/Toggle";

const SettingsScreen = () => {
  const navigation = useNavigation();
  
  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  
  // Handle premium purchase
  const handlePremiumPurchase = () => {
    // Implementation would connect to in-app purchase system
    console.log("Premium purchase initiated");
  };

  // Handle back navigation
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <View style={styles.arrowBack}>
              <View style={styles.arrowLine} />
              <View style={styles.arrowHead} />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Settings Section */}
        <View style={styles.settingsSection}>
          {/* Sound Setting */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Sound</Text>
              <Text style={styles.settingDescription}>Play sounds for timer events</Text>
            </View>
            <Toggle 
              value={soundEnabled}
              onValueChange={setSoundEnabled}
            />
          </View>
          
          {/* Vibration Setting */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Vibration</Text>
              <Text style={styles.settingDescription}>Vibrate on timer events</Text>
            </View>
            <Toggle 
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
            />
          </View>
        </View>
        
        {/* Premium Block - moved under settings labels */}
        <View style={styles.premiumBlockContainer}>
          <PremiumBlock 
            onPress={handlePremiumPurchase}
            message="Get rid of the annoying ads!"
            price="For 0.99 USD"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
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
    borderBottomColor: Color.background,
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
    backgroundColor: Color.active,
    position: 'absolute',
    left: 2,
  },
  arrowHead: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: Color.active,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 2,
  },
  headerTitle: {
    fontSize: FontSize.large,
    fontFamily: FontFamily.semiBold,
    color: Color.textPrimary,
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
    borderBottomColor: Color.colorGhostwhite,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.body,
    color: Color.textPrimary,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.regular,
    color: Color.textSecondary,
  },
});

export default SettingsScreen;