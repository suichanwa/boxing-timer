import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  StatusBar 
} from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from "../hooks/useTheme";
import { useScreenAnimation } from "../hooks/useScreenAnimation";
import { FontFamily, FontSize, Padding, Gap } from "../../styles/GlobalStyles";
import Button from "../../components/Button";
import Timer from "../../components/Timer";
import PremiumBlock from "../../components/PremiumBlock";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  
  // Animation hooks
  const { opacity, translateY, animateOut } = useScreenAnimation();
  const settingsButtonScale = useRef(new Animated.Value(1)).current;
  const settingsButtonRotate = useRef(new Animated.Value(0)).current;
  
  // Default boxing timer settings
  const [roundTime, setRoundTime] = useState(180); // 3 minutes
  const [restTime, setRestTime] = useState(60);    // 1 minute
  const [rounds, setRounds] = useState(3);         // 3 rounds
  
  // Calculate total training time
  const totalTrainingTime = rounds * (roundTime / 60) + (rounds - 1) * (restTime / 60);
  const totalHours = Math.floor(totalTrainingTime / 60);
  const totalMinutes = Math.floor(totalTrainingTime % 60);
  const totalTimeString = totalHours > 0 
    ? `${totalHours}h ${totalMinutes}m` 
    : `${totalMinutes} min`;
  
  // Function to start the training with animation
  const startTraining = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(settingsButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(settingsButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Animate screen transition
    animateOut(() => {
      navigation.navigate("Training", {
        roundTime,
        restTime,
        rounds
      });
    });
  };
  
  // Navigate to workout settings with animation
  const navigateToWorkoutSettings = () => {
    // Animate button press
    Animated.sequence([
      Animated.parallel([
        // Scale down slightly
        Animated.timing(settingsButtonScale, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        // Rotate
        Animated.timing(settingsButtonRotate, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // Scale back up
      Animated.timing(settingsButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate after animation completes
      animateOut(() => {
        navigation.navigate("WorkoutSettings");
      });
      
      // Reset rotation after navigation
      setTimeout(() => {
        settingsButtonRotate.setValue(0);
      }, 500);
    });
  };
  
  // Navigate to settings screen
  const navigateToSettings = () => {
    animateOut(() => {
      navigation.navigate("Settings");
    });
  };
  
  // Handle premium purchase
  const handlePremiumPurchase = () => {
    console.log("Premium purchase initiated");
  };
  
  // Convert rotation value to degrees for transform
  const spin = settingsButtonRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          opacity,
          transform: [{ translateY }]
        }
      ]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Header with settings button */}
          <View style={[styles.header, { borderBottomColor: colors.divider }]}>
            <Animated.View style={{
              transform: [
                { scale: settingsButtonScale },
                { rotate: spin }
              ]
            }}>
              <TouchableOpacity 
                style={styles.settingsButton}
                onPress={navigateToSettings}
              >
                <MaterialIcons 
                  name="settings" 
                  size={24} 
                  color={colors.textPrimary} 
                />
              </TouchableOpacity>
            </Animated.View>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Boxing Timer</Text>
            <View style={styles.placeholder} />
          </View>
          
          {/* Premium Block */}
          <View style={styles.premiumBlockContainer}>
            <PremiumBlock 
              onPress={handlePremiumPurchase}
              style={styles.premiumBlock}
              message="Get rid of the annoying ads!"
              price="For 0.99 USD"
            />
          </View>
          
          {/* Main content */}
          <View style={styles.content}>
            {/* Training info card */}
            <View style={[styles.infoCard, { backgroundColor: colors.surfaceVariant }]}>
              <View style={styles.infoCardRow}>
                <Text style={[styles.infoCardTitle, { color: colors.textPrimary }]}>
                  Total Training Time
                </Text>
                <Text style={[styles.infoCardValue, { color: colors.textSecondary }]}>
                  {totalTimeString}
                </Text>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              
              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Rounds</Text>
                  <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{rounds}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Round Time</Text>
                  <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                    {Math.floor(roundTime/60)}:{(roundTime % 60).toString().padStart(2, '0')}
                  </Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Rest Time</Text>
                  <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                    {Math.floor(restTime/60)}:{(restTime % 60).toString().padStart(2, '0')}
                  </Text>
                </View>
              </View>
            </View>
            
            {/* Play Button */}
            <View style={styles.btn}>
              <View style={[styles.btnChild, { borderColor: colors.active }]} />
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: colors.surfaceVariant }]}
                onPress={startTraining}
              >
                <View style={[styles.playArrowIcon, { 
                  borderLeftColor: colors.active,
                  borderRightColor: "transparent",
                  borderBottomColor: "transparent",
                  borderTopColor: "transparent"
                }]} />
              </TouchableOpacity>
            </View>
            
            {/* Customize Workout Button */}
            <TouchableOpacity
              style={[styles.customizeButton, { borderColor: colors.border }]}
              onPress={navigateToWorkoutSettings}
            >
              <Text style={[styles.customizeButtonText, { color: colors.textPrimary }]}>
                Customize Workout
              </Text>
              <MaterialIcons name="tune" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
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
  scrollViewContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: 16,
    paddingBottom: 8,
    width: '100%',
  },
  premiumBlock: {
    width: '100%',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  infoCard: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  infoCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  infoCardTitle: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.semiBold,
  },
  infoCardValue: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.regular,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.semiBold,
  },
  btn: {
    width: 111,
    height: 111,
    marginVertical: 20,
    position: 'relative',
  },
  btnChild: {
    top: 0,
    left: 0,
    position: "absolute",
    width: 111,
    height: 111,
    borderRadius: 55.5,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  button: {
    borderRadius: 48,
    width: 96,
    height: 96,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    top: 8,
    left: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playArrowIcon: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 24,
    borderRightWidth: 0,
    borderBottomWidth: 16,
    borderTopWidth: 16,
    marginLeft: 5,
  },
  customizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    gap: 8,
  },
  customizeButtonText: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.medium,
  },
});

export default HomeScreen;