import React from "react";
import { StyleSheet, Animated } from "react-native";
import { FontFamily } from "../../styles/GlobalStyles";

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  timerScale: Animated.Value;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  minutes, 
  seconds, 
  timerScale 
}) => {
  return (
    <Animated.Text 
      style={[
        styles.timerText,
        { transform: [{ scale: timerScale }] }
      ]}
    >
      {`${minutes.toString().padStart(2, '0')}\n${seconds.toString().padStart(2, '0')}`}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 180,
    fontFamily: FontFamily.semiBold,
    color: "#202020",
    textAlign: "center",
    lineHeight: 180,
  },
});

export default TimerDisplay;