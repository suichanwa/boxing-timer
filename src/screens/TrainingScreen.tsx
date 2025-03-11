import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding } from "../../styles/GlobalStyles";
import Alert from "../../components/Alert";

// Import hooks
import { useTimer } from "../hooks/useTimer";
import { useTimerAnimation } from "../hooks/useTimerAnimation";

// Import custom components
import TrainingHeader from "../../components/training/TrainingHeader";
import PhaseChip from "../../components/training/PhaseChip";
import TimerDisplay from "../../components/training/TimerDisplay";
import ControlPanel from "../../components/training/ControlPanel";

const TrainingScreen = ({ route }) => {
  const navigation = useNavigation();
  
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
  
  // Get background color based on current phase
  const getPhaseColor = () => {
    if (currentRound === 0) return "#eb981c"; // Get ready color
    if (isRest) return Color.restColor; // Rest color
    return Color.roundColor; // Round color
  };

  // Handle button presses
  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };
  
  const handleStopPress = () => {
    // Instead of immediately navigating back, we show the alert
    setShowAlert(true);
  };
  
  const handleQuitConfirmed = () => {
    // User confirmed quitting - navigate to WorkoutSettings instead of Home
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
    <View style={styles.container}>
      {/* Header */}
      <TrainingHeader onBackPress={handleStopPress} />

      {/* Timer content */}
      <View style={styles.timerContainer}>
        {/* Phase chip */}
        <PhaseChip 
          phase={phaseText} 
          backgroundColor={getPhaseColor()} 
        />

        {/* Timer display */}
        <TimerDisplay 
          minutes={minutes}
          seconds={seconds}
          timerScale={timerScale}
        />

        {/* Control buttons */}
        <ControlPanel
          isRunning={isRunning}
          onPauseResume={handlePauseResume}
          onStop={handleStopPress}
          onSkip={handleSkip}
        />
      </View>

      {/* Alert Modal */}
      {showAlert && (
        <Alert
          onContinue={handleContinueWorkout}
          onQuit={handleQuitConfirmed}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
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