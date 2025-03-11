import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useScreenAnimation = (initialDelay = 0) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(50)).current;

  // Entry animation
  useEffect(() => {
    const animationSequence = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: initialDelay,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        delay: initialDelay,
        useNativeDriver: true,
      }),
    ]);
    
    animationSequence.start();
    
    return () => {
      animationSequence.stop();
    };
  }, []);

  // Exit animation function
  const animateOut = (onComplete) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(onComplete);
  };

  return {
    opacity: fadeAnim,
    translateY: translateAnim,
    animateOut,
  };
};