import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Gap, Border } from "../../styles/GlobalStyles";
import PremiumBlock from "../../components/PremiumBlock";

const WorkoutSettings = () => {
  const navigation = useNavigation();
  
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
  
  // Handle adjustment of values
  const adjustValue = (setter, currentValue, increment) => {
    setter(Math.max(1, currentValue + increment));
  };
  
  // Handle starting the workout
  const startWorkout = () => {
    navigation.navigate("Training", {
      roundTime: roundDuration * 60,
      restTime: restDuration * 60,
      rounds: rounds,
    });
  };

  // Navigate to settings page
  const navigateToSettings = () => {
    navigation.navigate("Settings");
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          {/* Settings icon instead of back arrow */}
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={navigateToSettings}
          >
            <Image
              style={styles.settingsIcon}
              contentFit="contain"
              source={require("../../assets/settings.svg")}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Workout Settings</Text>
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
          <View style={styles.taskManagementTableCellTod}>
            <View style={styles.tableCell}>
              <View style={styles.labelsChevron}>
                <View style={styles.labels}>
                  <View style={styles.row1}>
                    <Text 
                      style={styles.totalTrainingLength}
                      numberOfLines={2}
                    >
                      Total Training Length
                    </Text>
                    <Text
                      style={styles.minutes}
                      numberOfLines={2}
                    >
                      {formattedTotalTime}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider} />
              </View>
            </View>
          </View>
        
          {/* Number of Rounds setting */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Image 
                style={styles.settingIcon}
                contentFit="contain"
                source={require("../../assets/rounds.svg")}
              />
              <Text style={styles.settingLabel}>Number of Rounds</Text>
            </View>
            <View style={styles.adjustmentControls}>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => adjustValue(setRounds, rounds, -1)}
              >
                <Text style={styles.adjustButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.valueText}>{rounds}</Text>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => adjustValue(setRounds, rounds, 1)}
              >
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Round Duration setting */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Image 
                style={styles.settingIcon}
                contentFit="contain"
                source={require("../../assets/fight.svg")}
              />
              <Text style={styles.settingLabel}>Round Duration (min)</Text>
            </View>
            <View style={styles.adjustmentControls}>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => adjustValue(setRoundDuration, roundDuration, -1)}
              >
                <Text style={styles.adjustButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.valueText}>{roundDuration}</Text>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => adjustValue(setRoundDuration, roundDuration, 1)}
              >
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Rest Duration setting */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Image 
                style={styles.settingIcon}
                contentFit="contain"
                source={require("../../assets/rest.svg")}
              />
              <Text style={styles.settingLabel}>Rest Duration (min)</Text>
            </View>
            <View style={styles.adjustmentControls}>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => adjustValue(setRestDuration, restDuration, -1)}
              >
                <Text style={styles.adjustButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.valueText}>{restDuration}</Text>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => adjustValue(setRestDuration, restDuration, 1)}
              >
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Warm-up Duration setting */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Image 
                style={styles.settingIcon}
                contentFit="contain"
                source={require("../../assets/rounds.svg")} // Using rounds icon as fallback for warmup
              />
              <Text style={styles.settingLabel}>Warm-up Duration (sec)</Text>
            </View>
            <View style={styles.adjustmentControls}>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => adjustValue(setWarmupDuration, warmupDuration, -5)}
              >
                <Text style={styles.adjustButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.valueText}>{warmupDuration}</Text>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => adjustValue(setWarmupDuration, warmupDuration, 5)}
              >
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Play Button Design */}
          <View style={styles.btn}>
            <View style={styles.btnChild} />
            <TouchableOpacity 
              style={styles.button}
              onPress={startWorkout}
            >
              <View style={styles.playArrowIcon} />
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
    backgroundColor: Color.neutral100,
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
    borderBottomColor: Color.orangeDarkTextHeading,
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
  settingsIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: FontSize.screenHeader_size,
    fontFamily: FontFamily.h3,
    color: Color.colorBlack,
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
    backgroundColor: Color.colorGhostwhite,
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
    color: Color.colorBlack,
    overflow: "hidden",
    textAlign: "left",
    flex: 1,
  },
  minutes: {
    fontSize: FontSize.screenHeader_size,
    lineHeight: 23,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorGray_100,
    overflow: "hidden",
    textAlign: "right",
  },
  divider: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.colorGray_200,
    height: 1,
    zIndex: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorGhostwhite,
    width: '100%',
    paddingHorizontal: 16,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: Color.colorBlack,
  },
  settingLabel: {
    fontSize: FontSize.body_size,
    fontFamily: FontFamily.body,
    color: Color.colorBlack,
  },
  adjustmentControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adjustButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Color.colorGhostwhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustButtonText: {
    fontSize: 20,
    fontFamily: FontFamily.h3,
    color: Color.primaryColor1,
  },
  valueText: {
    fontSize: FontSize.body_size,
    fontFamily: FontFamily.h3,
    color: Color.colorBlack,
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
    borderColor: Color.primaryColor1,
    borderStyle: 'dashed',
  },
  button: {
    marginLeft: -48,
    top: 8,
    left: "50%",
    borderRadius: 48,
    backgroundColor: Color.colorGhostwhite,
    width: 96,
    height: 96,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    shadowColor: Color.colorBlack,
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
    borderLeftColor: Color.primaryColor1,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginLeft: 5,
  }
});

export default WorkoutSettings;