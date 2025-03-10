import React, { useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Border, Padding, Color } from "../styles/GlobalStyles";

interface ToggleProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  value = false,
  onValueChange = () => {},
  disabled = false
}) => {
  // Animated value for knob position
  const slideAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;
  
  // Update animation when value changes
  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, slideAnimation]);
  
  // Handle toggle press
  const handleToggle = () => {
    if (disabled) return;
    onValueChange(!value);
  };
  
  // Interpolate position and background color
  const knobPosition = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22] // Left padding when off, right padding when on
  });
  
  const backgroundColor = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(37, 80, 126, 0.09)", Color.primary] // Inactive/active colors
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={handleToggle}
      disabled={disabled}
    >
      <Animated.View 
        style={[
          styles.toggle, 
          styles.knobLayout,
          { backgroundColor }
        ]}
      >
        <Animated.View 
          style={[
            styles.knob, 
            styles.knobLayout,
            { left: knobPosition }
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  knobLayout: {
    overflow: "hidden",
    borderRadius: Border.br_341xl,
  },
  knob: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    elevation: 7,
    shadowOpacity: 1,
    backgroundColor: "#fff",
    width: 28,
    height: 28,
    position: "absolute", // Added to allow positioning
    top: 2, // Center vertically
  },
  toggle: {
    width: 52,
    height: 32,
    paddingVertical: Padding.p_11xs,
  },
});

export default Toggle;