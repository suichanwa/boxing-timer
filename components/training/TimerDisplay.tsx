import React from "react";
import { StyleSheet, Animated } from "react-native";
import { FontFamily } from "../../styles/GlobalStyles";

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  timerScale: Animated.Value;
  color?: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  minutes, 
  seconds, 
  timerScale,
  color = "#202020" 
}) => {
  return (
    <Animated.Text 
      style={[
        styles.timerText,
        { 
          transform: [{ scale: timerScale }],
          color
        }
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
    textAlign: "center",
    lineHeight: 180,
  },
});

export default TimerDisplay;