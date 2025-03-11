import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useTimerAnimation = (isRunning: boolean) => {
  const timerScale = useRef(new Animated.Value(1)).current;
  
  // Pulse animation on every second when running
  useEffect(() => {
    let animationSequence;
    
    if (isRunning) {
      animationSequence = Animated.sequence([
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
      ]);
      
      animationSequence.start();
    }
    
    return () => {
      if (animationSequence) {
        animationSequence.stop();
      }
    };
  }, [isRunning, timerScale]);
  
  return timerScale;
};