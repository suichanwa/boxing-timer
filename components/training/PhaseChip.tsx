import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Padding } from "../../styles/GlobalStyles";

interface PhaseChipProps {
  phase: string;
  backgroundColor?: string;
  textColor?: string;
}

const PhaseChip: React.FC<PhaseChipProps> = ({ 
  phase,
  backgroundColor = "#db3c3c",
  textColor = "#FFFFFF"
}) => {
  return (
    <View style={[styles.phaseChip, { backgroundColor }]}>
      <Text style={[styles.phaseText, { color: textColor }]}>{phase}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: "center",
  },
});

export default PhaseChip;