import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color, Padding } from "../../styles/GlobalStyles";

interface PhaseChipProps {
  phase: string;
  backgroundColor?: string;
}

const PhaseChip: React.FC<PhaseChipProps> = ({ 
  phase,
  backgroundColor = Color.roundColor
}) => {
  return (
    <View style={[styles.phaseChip, { backgroundColor }]}>
      <Text style={styles.phaseText}>{phase}</Text>
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
    color: Color.white,
    textAlign: "center",
  },
});

export default PhaseChip;