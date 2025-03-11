import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { BorderRadius } from "../../styles/GlobalStyles";

interface ControlPanelProps {
  isRunning: boolean;
  onPauseResume: () => void;
  onStop: () => void;
  onSkip: () => void;
  colors: any; // Theme colors
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isRunning,
  onPauseResume,
  onStop,
  onSkip,
  colors
}) => {
  return (
    <View style={styles.controlsContainer}>
      {/* Stop button */}
      <TouchableOpacity 
        style={[styles.controlButton, { backgroundColor: colors.surfaceVariant }]}
        onPress={onStop}
      >
        <View style={styles.buttonInner}>
          <View style={[styles.stopIcon, { backgroundColor: colors.textPrimary }]} />
        </View>
      </TouchableOpacity>

      {/* Play/Pause button */}
      <TouchableOpacity 
        style={[styles.playPauseButton, { backgroundColor: isRunning ? colors.error : colors.success }]}
        onPress={onPauseResume}
      >
        {isRunning ? (
          <View style={styles.pauseIcon}>
            <View style={styles.pauseBar} />
            <View style={styles.pauseBar} />
          </View>
        ) : (
          <View style={styles.playIcon} />
        )}
      </TouchableOpacity>

      {/* Skip button */}
      <TouchableOpacity 
        style={[styles.controlButton, { backgroundColor: colors.surfaceVariant }]}
        onPress={onSkip}
      >
        <View style={styles.skipIcon}>
          <View style={[styles.skipBar, { backgroundColor: colors.textPrimary }]} />
          <View style={[styles.skipTriangle, { borderRightColor: colors.textPrimary }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInner: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  stopIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  playPauseButton: {
    width: 128,
    height: 96,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseIcon: {
    width: 48,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pauseBar: {
    width: 12,
    height: 32,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 4,
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 32,
    borderRightWidth: 0,
    borderBottomWidth: 24,
    borderTopWidth: 24,
    borderLeftColor: "#FFFFFF",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  skipIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  skipBar: {
    position: "absolute",
    right: 8,
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  skipTriangle: {
    position: "absolute",
    left: 10,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderRightWidth: 20,
    borderBottomWidth: 12,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
});

export default ControlPanel;