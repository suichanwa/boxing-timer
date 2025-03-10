import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Animated, Modal } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Gap, BorderRadius } from "../../styles/GlobalStyles";

// Add the Alert component import
import Alert from "../../components/Alert";

const TrainingScreen = ({ route }) => {
  const navigation = useNavigation();
  
  // Get params from route or use defaults
  const {
    roundTime = 180,
    restTime = 60,
    rounds = 3
  } = route?.params || {};
  
  // Timer states
  const [isRunning, setIsRunning] = useState(true);
  const [currentRound, setCurrentRound] = useState(0); // 0 = get ready, 1-n = actual rounds
  const [timeLeft, setTimeLeft] = useState(5); // 5 second get ready period
  const [isRest, setIsRest] = useState(false);
  
  // State for showing the alert
  const [showAlert, setShowAlert] = useState(false);
  
  // Animation for timer scale
  const timerScale = useRef(new Animated.Value(1)).current;
  
  // Effect for timer countdown
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up for current period
            if (currentRound === 0) {
              // Get ready period finished, start first round
              setCurrentRound(1);
              return roundTime;
            } else if (isRest) {
              // Rest period finished, start next round
              if (currentRound >= rounds) {
                // Workout complete
                setIsRunning(false);
                // Navigate back to WorkoutSettings after slight delay
                setTimeout(() => {
                  navigation.navigate("WorkoutSettings");
                }, 1000);
                return 0;
              } else {
                setCurrentRound(prev => prev + 1);
                setIsRest(false);
                return roundTime;
              }
            } else {
              // Round finished, start rest period
              setIsRest(true);
              return restTime;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
      
      // Pulse animation on every second
      Animated.sequence([
        Animated.timing(timerScale, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(timerScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isRest, currentRound, rounds, roundTime, restTime, timeLeft, navigation]);

  // Format time into minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { minutes: mins, seconds: secs };
  };

  // Get current phase text
  const getCurrentPhaseText = () => {
    if (currentRound === 0) return "Get Ready";
    if (isRest) return "Rest";
    return `Round ${currentRound}/${rounds}`;
  };
  
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
    // Skip to next phase
    if (currentRound === 0) {
      // Skip get ready
      setCurrentRound(1);
      setTimeLeft(roundTime);
      setIsRest(false);
    } else if (isRest) {
      // Skip rest
      if (currentRound >= rounds) {
        // Workout complete - navigate to WorkoutSettings instead of Home
        navigation.navigate("WorkoutSettings");
      } else {
        setCurrentRound(prev => prev + 1);
        setIsRest(false);
        setTimeLeft(roundTime);
      }
    } else {
      // Skip round
      setIsRest(true);
      setTimeLeft(restTime);
    }
  };

  const { minutes, seconds } = formatTime(timeLeft);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerNavigation}>
        <View style={styles.navigationBar}>
          <TouchableOpacity 
            style={styles.leadingIcon} 
            onPress={handleStopPress}
          >
            {/* Replace text with arrow icon */}
            <View style={styles.arrowBack}>
              <View style={styles.arrowLine} />
              <View style={styles.arrowHead} />
            </View>
          </TouchableOpacity>
          <Text style={styles.titleText} numberOfLines={1}>Training</Text>
          <View style={styles.trailingIcon} />
        </View>
      </View>

      {/* Timer content */}
      <View style={styles.timerContainer}>
        {/* Phase chip */}
        <View style={[styles.phaseChip, { backgroundColor: getPhaseColor() }]}>
          <Text style={styles.phaseText}>
            {`${getCurrentPhaseText()} ${currentRound === 0 ? "" : isRest ? "" : currentRound + "/" + rounds}`}
          </Text>
        </View>

        {/* Timer display */}
        <Animated.Text 
          style={[
            styles.timerText,
            { transform: [{ scale: timerScale }] }
          ]}
        >
          {`${minutes.toString().padStart(2, '0')}\n${seconds.toString().padStart(2, '0')}`}
        </Animated.Text>

        {/* Control buttons */}
        <View style={styles.controlsContainer}>
          {/* Stop button */}
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={handleStopPress}
          >
            <View style={styles.buttonInner}>
              <View style={styles.stopIcon} />
            </View>
          </TouchableOpacity>

          {/* Play/Pause button */}
          <TouchableOpacity 
            style={styles.playPauseButton}
            onPress={handlePauseResume}
          >
            {isRunning ? (
              <View style={styles.pauseIcon}>
                <View style={styles.pauseBar} />
                <View style={styles.pauseBar} />
              </View>
            ) : (
              <View style={styles.playIcon} />
            )}
          </TouchableOpacity>

          {/* Skip button */}
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={handleSkip}
          >
            <View style={styles.skipIcon}>
              <View style={styles.skipBar} />
              <View style={styles.skipTriangle} />
            </View>
          </TouchableOpacity>
        </View>
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
  headerNavigation: {
    backgroundColor: Color.white,
  },
  navigationBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Padding.large,
  },
  leadingIcon: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  // New styles for the arrow back icon
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
  cancelText: {
    color: Color.active,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.large,
  },
  titleText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.large,
    color: Color.textPrimary,
    textAlign: "center",
    flex: 1,
  },
  trailingIcon: {
    width: 80,
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Padding.large,
    gap: 32,
  },
  phaseChip: {
    borderRadius: 9999,
    paddingVertical: Padding.small,
    paddingHorizontal: Padding.large,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  phaseText: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    color: Color.white,
    textAlign: "center",
  },
  timerText: {
    fontSize: 180,
    fontFamily: FontFamily.semiBold,
    color: "#202020",
    textAlign: "center",
    lineHeight: 180,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Color.background,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInner: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  stopIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#202020",
    borderRadius: 4,
  },
  playPauseButton: {
    width: 128,
    height: 96,
    borderRadius: 32,
    backgroundColor: "#db3c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  pauseIcon: {
    width: 48,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pauseBar: {
    width: 12,
    height: 32,
    borderRadius: 4,
    backgroundColor: Color.white,
    marginHorizontal: 4,
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 32,
    borderRightWidth: 0,
    borderBottomWidth: 24,
    borderTopWidth: 24,
    borderLeftColor: Color.white,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  skipIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  skipBar: {
    position: "absolute",
    right: 8,
    width: 4,
    height: 24,
    backgroundColor: "#202020",
    borderRadius: 2,
  },
  skipTriangle: {
    position: "absolute",
    left: 10,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderRightWidth: 20,
    borderBottomWidth: 12,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "#202020",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
});

export default TrainingScreen;