import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView, Alert, Animated } from "react-native";
import { Image } from "expo-image";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Gap, Border } from "../../styles/GlobalStyles";
import PremiumBlock from "../../components/PremiumBlock";

// Import theme hook
import { useTheme } from "../hooks/useTheme";

const WorkoutSettings = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  
  // Get theme context
  const { colors, isDark } = useTheme();
  
  // Animation values
  const settingsButtonScale = useRef(new Animated.Value(1)).current;
  const settingsButtonRotate = useRef(new Animated.Value(0)).current;
  
  // Workout settings state
  const [rounds, setRounds] = useState(3);
  const [roundDuration, setRoundDuration] = useState(3); // minutes
  const [restDuration, setRestDuration] = useState(1); // minutes
  const [warmupDuration, setWarmupDuration] = useState(30); // seconds
  
  // Calculate total training time
  const totalTrainingTime = warmupDuration/60 + rounds * roundDuration + (rounds - 1) * restDuration;
  const totalHours = Math.floor(totalTrainingTime / 60);
  const totalMinutes = Math.floor(totalTrainingTime % 60);
  const totalSeconds = Math.round((totalTrainingTime - Math.floor(totalTrainingTime)) * 60);
  
  // Format total time
  const formattedTotalTime = totalHours > 0 
    ? `${totalHours}h ${totalMinutes}m`
    : `${totalMinutes} Minutes`;
  
  // Load sound
  async function loadSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/sounds/dingdongsond.mp3"));
      setSound(sound);
    } catch (error) {
      console.log('Error loading sound', error);
    }
  }
  
  // Play sound
  async function playSound() {
    try {
      if (sound) {
        await sound.replayAsync();
      } else {
        // If sound isn't loaded yet, load and play
        const { sound: newSound } = await Audio.Sound.createAsync(require("../../assets/sounds/dingdongsond.mp3"));
        await newSound.playAsync();
      }
    } catch (error) {
      console.log('Error playing sound', error);
    }
  }
  
  // Load sound on component mount
  useEffect(() => {
    loadSound();
    
    // Cleanup function to unload sound when component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  // Handle adjustment of values
  const adjustValue = (setter, currentValue, increment) => {
    setter(Math.max(1, currentValue + increment));
  };
  
  // Handle starting the workout
  const startWorkout = async () => {
    // Play sound before navigating
    await playSound();
    
    // Navigate after a slight delay to ensure sound plays
    setTimeout(() => {
      navigation.navigate("Training", {
        roundTime: roundDuration * 60,
        restTime: restDuration * 60,
        rounds: rounds,
      });
    }, 300);
  };

  // Navigate to settings page with animation
  const navigateToSettings = () => {
    // Play button animation
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
      navigation.navigate("Settings");
      
      // Reset rotation after navigation
      setTimeout(() => {
        settingsButtonRotate.setValue(0);
      }, 500);
    });
  };

  // Handle premium purchase
  const handlePremiumPurchase = () => {
    Alert.alert(
      "Premium Subscription",
      "This will remove all ads from the app for $0.99 USD",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Purchase", onPress: () => console.log("Premium purchased") }
      ]
    );
  };
  
  // Convert rotation value to degrees for transform
  const spin = settingsButtonRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.divider }]}>
          {/* Settings icon with animation */}
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
              <Image
                style={[styles.settingIcon, { tintColor: colors.textPrimary }]}
                contentFit="contain"
                source={require("../../assets/settings.svg")}
              />
            </TouchableOpacity>
          </Animated.View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Workout Settings</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Premium Block - Positioned right after header */}
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
          {/* Total Training Length */}
          <View style={[styles.taskManagementTableCellTod, { backgroundColor: colors.surfaceVariant }]}>
            <View style={styles.tableCell}>
              <View style={styles.labelsChevron}>
                <View style={styles.labels}>
                  <View style={styles.row1}>
                    <Text 
                      style={[styles.totalTrainingLength, { color: colors.textPrimary }]}
                      numberOfLines={2}
                    >
                      Total Training Length
                    </Text>
                    <Text
                      style={[styles.minutes, { color: colors.textSecondary }]}
                      numberOfLines={2}
                    >
                      {formattedTotalTime}
                    </Text>
                  </View>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              </View>
            </View>
          </View>
        
          {/* Number of Rounds setting */}
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingLabelContainer}>
              <Image 
                style={[styles.settingIcon, { tintColor: colors.textPrimary, marginRight: 12 }]}
                contentFit="contain"
                source={require("../../assets/rounds.svg")}
              />
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Number of Rounds</Text>
            </View>
            <View style={styles.adjustmentControls}>
              <TouchableOpacity 
                style={[styles.adjustButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => adjustValue(setRounds, rounds, -1)}
              >
                <Text style={[styles.adjustButtonText, { color: colors.active }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.valueText, { color: colors.textPrimary }]}>{rounds}</Text>
              <TouchableOpacity 
                style={[styles.adjustButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => adjustValue(setRounds, rounds, 1)}
              >
                <Text style={[styles.adjustButtonText, { color: colors.active }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Round Duration setting */}
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingLabelContainer}>
              <Image 
                style={[styles.settingIcon, { tintColor: colors.textPrimary, marginRight: 12 }]}
                contentFit="contain"
                source={require("../../assets/fight.svg")}
              />
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Round Duration (min)</Text>
            </View>
            <View style={styles.adjustmentControls}>
              <TouchableOpacity 
                style={[styles.adjustButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => adjustValue(setRoundDuration, roundDuration, -1)}
              >
                <Text style={[styles.adjustButtonText, { color: colors.active }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.valueText, { color: colors.textPrimary }]}>{roundDuration}</Text>
              <TouchableOpacity 
                style={[styles.adjustButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => adjustValue(setRoundDuration, roundDuration, 1)}
              >
                <Text style={[styles.adjustButtonText, { color: colors.active }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Rest Duration setting */}
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingLabelContainer}>
              <Image 
                style={[styles.settingIcon, { tintColor: colors.textPrimary, marginRight: 12 }]}
                contentFit="contain"
                source={require("../../assets/rest.svg")}
              />
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Rest Duration (min)</Text>
            </View>
            <View style={styles.adjustmentControls}>
              <TouchableOpacity 
                style={[styles.adjustButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => adjustValue(setRestDuration, restDuration, -1)}
              >
                <Text style={[styles.adjustButtonText, { color: colors.active }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.valueText, { color: colors.textPrimary }]}>{restDuration}</Text>
              <TouchableOpacity 
                style={[styles.adjustButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => adjustValue(setRestDuration, restDuration, 1)}
              >
                <Text style={[styles.adjustButtonText, { color: colors.active }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Warm-up Duration setting */}
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingLabelContainer}>
              <Image 
                style={[styles.settingIcon, { tintColor: colors.textPrimary, marginRight: 12 }]}
                contentFit="contain"
                source={require("../../assets/rounds.svg")} // Using rounds icon as fallback for warmup
              />
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Warm-up Duration (sec)</Text>
            </View>
            <View style={styles.adjustmentControls}>
              <TouchableOpacity 
                style={[styles.adjustButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => adjustValue(setWarmupDuration, warmupDuration, -5)}
              >
                <Text style={[styles.adjustButtonText, { color: colors.active }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.valueText, { color: colors.textPrimary }]}>{warmupDuration}</Text>
              <TouchableOpacity 
                style={[styles.adjustButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => adjustValue(setWarmupDuration, warmupDuration, 5)}
              >
                <Text style={[styles.adjustButtonText, { color: colors.active }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Play Button Design */}
          <View style={styles.btn}>
            <View style={[styles.btnChild, { borderColor: colors.active }]} />
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.surfaceVariant }]}
              onPress={startWorkout}
            >
              <View style={[styles.playArrowIcon, { 
                borderLeftColor: colors.active,
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                borderTopColor: "transparent"
              }]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
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
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: FontSize.screenHeader_size,
    fontFamily: FontFamily.h3,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 0,
    alignItems: 'center',
    width: '100%',
  },
  taskManagementTableCellTod: {
    width: "100%",
    marginBottom: 16,
  },
  tableCell: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  labelsChevron: {
    alignItems: "center",
    gap: Gap.gap_md,
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  labels: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_base,
    zIndex: 0,
    flex: 1,
  },
  row1: {
    gap: Gap.gap_sm,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalTrainingLength: {
    fontSize: FontSize.h3_size,
    letterSpacing: 0,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.h3,
    overflow: "hidden",
    textAlign: "left",
    flex: 1,
  },
  minutes: {
    fontSize: FontSize.screenHeader_size,
    lineHeight: 23,
    fontFamily: FontFamily.dMSansRegular,
    overflow: "hidden",
    textAlign: "right",
  },
  divider: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    height: 1,
    zIndex: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: FontSize.body_size,
    fontFamily: FontFamily.body,
  },
  adjustmentControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adjustButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustButtonText: {
    fontSize: 20,
    fontFamily: FontFamily.h3,
  },
  valueText: {
    fontSize: FontSize.body_size,
    fontFamily: FontFamily.h3,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  
  // Play button styles
  btn: {
    width: 111,
    height: 111,
    marginTop: 40,
    marginBottom: 20,
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
    marginLeft: -48,
    top: 8,
    left: "50%",
    borderRadius: 48,
    width: 96,
    height: 96,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
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
  }
});

export default WorkoutSettings;