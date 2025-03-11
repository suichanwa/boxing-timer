import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Color, BorderRadius } from "../../styles/GlobalStyles";

interface ControlPanelProps {
  isRunning: boolean;
  onPauseResume: () => void;
  onStop: () => void;
  onSkip: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isRunning,
  onPauseResume,
  onStop,
  onSkip
}) => {
  return (
    <View style={styles.controlsContainer}>
      {/* Stop button */}
      <TouchableOpacity 
        style={styles.controlButton}
        onPress={onStop}
      >
        <View style={styles.buttonInner}>
          <View style={styles.stopIcon} />
        </View>
      </TouchableOpacity>

      {/* Play/Pause button */}
      <TouchableOpacity 
        style={styles.playPauseButton}
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
        style={styles.controlButton}
        onPress={onSkip}
      >
        <View style={styles.skipIcon}>
          <View style={styles.skipBar} />
          <View style={styles.skipTriangle} />
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
    backgroundColor: Color.background,
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
    backgroundColor: "#202020",
    borderRadius: 4,
  },
  playPauseButton: {
    width: 128,
    height: 96,
    borderRadius: 32,
    backgroundColor: "#db3c3c",
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
    backgroundColor: Color.white,
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
    borderLeftColor: Color.white,
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
    backgroundColor: "#202020",
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
    borderRightColor: "#202020",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
});

export default ControlPanel;