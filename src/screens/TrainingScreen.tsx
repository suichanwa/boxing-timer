import React, { useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Padding } from "../../styles/GlobalStyles";
import Alert from "../../components/Alert";

// Import hooks
import { useTimer } from "../hooks/useTimer";
import { useTimerAnimation } from "../hooks/useTimerAnimation";
import { useTheme } from "../hooks/useTheme";

// Import custom components
import TrainingHeader from "../../components/training/TrainingHeader";
import PhaseChip from "../../components/training/PhaseChip";
import TimerDisplay from "../../components/training/TimerDisplay";
import ControlPanel from "../../components/training/ControlPanel";

const TrainingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  
  // Get params from route or use defaults
  const {
    roundTime = 180,
    restTime = 60,
    rounds = 3
  } = route?.params || {};
  
  // State for showing the alert
  const [showAlert, setShowAlert] = useState(false);
  
  // Use custom hooks for timer logic and animation
  const {
    isRunning,
    setIsRunning,
    currentRound,
    timeLeft,
    isRest,
    formatTime,
    getCurrentPhase,
    skipToNext
  } = useTimer({
    roundTime,
    restTime,
    rounds
  });
  
  const timerScale = useTimerAnimation(isRunning);
  
  // Get background color based on current phase and respect theme
  const getPhaseColor = () => {
    if (currentRound === 0) return colors.warning; // Get ready color
    if (isRest) return colors.rest; // Rest color
    return colors.round; // Round color
  };
  
  // Get phase text color (always white for best contrast)
  const getPhaseTextColor = () => {
    return "#FFFFFF"; // White for good contrast against colored backgrounds
  };

  // Handle button presses
  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };
  
  const handleStopPress = () => {
    // Instead of immediately navigating back, we show the alert
    if (isRunning) {
      setIsRunning(false);
    }
    setShowAlert(true);
  };
  
  const handleQuitConfirmed = () => {
    // User confirmed quitting - navigate to WorkoutSettings
    setShowAlert(false);
    navigation.navigate("WorkoutSettings");
  };
  
  const handleContinueWorkout = () => {
    // User decided to continue
    setShowAlert(false);
  };
  
  const handleSkip = () => {
    const shouldNavigate = skipToNext();
    if (shouldNavigate) {
      navigation.navigate("WorkoutSettings");
    }
  };

  const { minutes, seconds } = formatTime(timeLeft);
  const phaseText = getCurrentPhase();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <TrainingHeader 
        onBackPress={handleStopPress}
        colors={colors}
      />

      {/* Timer content */}
      <View style={styles.timerContainer}>
        {/* Phase chip */}
        <PhaseChip 
          phase={phaseText} 
          backgroundColor={getPhaseColor()} 
          textColor={getPhaseTextColor()}
        />

        {/* Timer display */}
        <TimerDisplay 
          minutes={minutes}
          seconds={seconds}
          timerScale={timerScale}
          color={colors.textPrimary}
        />

        {/* Control buttons */}
        <ControlPanel
          isRunning={isRunning}
          onPauseResume={handlePauseResume}
          onStop={handleStopPress}
          onSkip={handleSkip}
          colors={colors}
        />
      </View>

      {/* Alert Modal */}
      {showAlert && (
        <Alert
          onContinue={handleContinueWorkout}
          onQuit={handleQuitConfirmed}
          colors={colors}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Padding.large,
    gap: 32,
  },
});

export default TrainingScreen;