import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useStaggeredItems = (itemCount, staggerDelay = 100) => {
  // Create arrays to hold animation values
  const opacityAnimations = useRef(
    Array(itemCount).fill(0).map(() => new Animated.Value(0))
  ).current;
  
  const translateAnimations = useRef(
    Array(itemCount).fill(0).map(() => new Animated.Value(20))
  ).current;

  // Prepare animated styles
  const itemsAnimatedStyles = opacityAnimations.map((opacity, index) => ({
    opacity,
    transform: [{ translateY: translateAnimations[index] }]
  }));

  // Run animations on mount
  useEffect(() => {
    // Create staggered animation
    const animations = [];
    
    for (let i = 0; i < itemCount; i++) {
      animations.push(
        Animated.parallel([
          Animated.timing(opacityAnimations[i], {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(translateAnimations[i], {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    }
    
    Animated.stagger(staggerDelay, animations).start();
  }, []);

  // Reset all animations (for potential reuse)
  const resetItemAnimations = (reverse = false) => {
    const animations = [];
    
    for (let i = 0; i < itemCount; i++) {
      const index = reverse ? (itemCount - 1 - i) : i;
      animations.push(
        Animated.parallel([
          Animated.timing(opacityAnimations[index], {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(translateAnimations[index], {
            toValue: 20,
            duration: 150,
            useNativeDriver: true,
          }),
        ])
      );
    }
    
    return Animated.stagger(50, animations);
  };

  return {
    itemsAnimatedStyles,
    resetItemAnimations,
  };
};