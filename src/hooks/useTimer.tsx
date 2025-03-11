import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export interface TimerConfig {
  roundTime: number;
  restTime: number;
  rounds: number;
  warmupTime?: number;
}

export const useTimer = (config: TimerConfig) => {
  const { roundTime, restTime, rounds, warmupTime = 5 } = config;
  const navigation = useNavigation();
  
  // Timer states
  const [isRunning, setIsRunning] = useState(true);
  const [currentRound, setCurrentRound] = useState(0); // 0 = get ready, 1-n = actual rounds
  const [timeLeft, setTimeLeft] = useState(warmupTime); // Default warmup time
  const [isRest, setIsRest] = useState(false);
  
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
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isRest, currentRound, rounds, roundTime, restTime, navigation]);

  // Format time into minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { minutes: mins, seconds: secs };
  };
  
  // Get current phase text
  const getCurrentPhase = () => {
    if (currentRound === 0) return "Get Ready";
    if (isRest) return "Rest";
    return `Round ${currentRound}/${rounds}`;
  };
  
  // Skip to next phase
  const skipToNext = () => {
    if (currentRound === 0) {
      // Skip get ready
      setCurrentRound(1);
      setTimeLeft(roundTime);
      setIsRest(false);
      return false; // Don't navigate
    } else if (isRest) {
      // Skip rest
      if (currentRound >= rounds) {
        // Workout complete
        return true; // Signal to navigate
      } else {
        setCurrentRound(prev => prev + 1);
        setIsRest(false);
        setTimeLeft(roundTime);
        return false;
      }
    } else {
      // Skip round
      setIsRest(true);
      setTimeLeft(restTime);
      return false;
    }
  };

  return {
    isRunning,
    setIsRunning,
    currentRound,
    timeLeft,
    isRest,
    formatTime,
    getCurrentPhase,
    skipToNext,
  };
};