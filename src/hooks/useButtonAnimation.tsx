import { useRef } from 'react';
import { Animated } from 'react-native';

export const useButtonAnimation = (rotationDegrees = 180) => {
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonRotate = useRef(new Animated.Value(0)).current;
  
  // Convert rotation value to degrees for transform
  const rotation = buttonRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${rotationDegrees}deg`]
  });

  // Animate button and then run callback
  const animateThenRun = (callback) => {
    Animated.sequence([
      Animated.parallel([
        // Scale down slightly
        Animated.timing(buttonScale, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        // Rotate
        Animated.timing(buttonRotate, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // Scale back up
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Execute callback after animation
      if (callback && typeof callback === 'function') {
        callback();
      }
      
      // Reset rotation after delay
      setTimeout(() => {
        buttonRotate.setValue(0);
      }, 500);
    });
  };

  return {
    scale: buttonScale,
    rotation,
    animateThenRun,
  };
};