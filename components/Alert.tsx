import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { Color, FontFamily, FontSize, Gap } from "../styles/GlobalStyles";

interface AlertProps {
  onContinue: () => void;
  onQuit: () => void;
}

const Alert: React.FC<AlertProps> = ({ onContinue, onQuit }) => {
  return (
    <Modal 
      visible={true} 
      transparent={true}
      animationType="fade"
    >
      <View style={styles.alert}>
        <View style={styles.frame}>
          <View style={styles.titleAndDescription}>
            <Text style={styles.areYouSure}>Are You Sure?</Text>
            <Text style={styles.doYouReally}>Do you really want to give up?</Text>
          </View>
          <View style={styles.buttonParent}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonBorder]}
              onPress={onContinue}
            >
              <Text style={[styles.title, styles.titlePosition]}>
                I can do it
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonBorder]}
              onPress={onQuit}
            >
              <Text style={[styles.title1, styles.titlePosition]}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonBorder: {
    borderColor: "rgba(84, 84, 88, 0.65)",
    borderStyle: "solid",
  },
  titlePosition: {
    lineHeight: 23,
    marginTop: -11,
    fontFamily: FontFamily.medium,
    fontWeight: "500",
    textAlign: "center",
    fontSize: FontSize.large,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  areYouSure: {
    letterSpacing: -0.4,
    fontWeight: "600",
    fontFamily: FontFamily.semiBold,
    textAlign: "center",
    color: Color.textPrimary,
    fontSize: FontSize.large,
    alignSelf: "stretch",
  },
  doYouReally: {
    fontSize: FontSize.small,
    lineHeight: 15,
    fontFamily: FontFamily.medium,
    fontWeight: "500",
    textAlign: "center",
    color: Color.textPrimary,
    alignSelf: "stretch",
  },
  titleAndDescription: {
    width: 270,
    paddingHorizontal: 16,
    paddingBottom: 15,
    gap: 8,
    alignItems: "center",
  },
  title: {
    marginLeft: -39,
    color: Color.textPrimary,
  },
  button: {
    borderTopWidth: 0.3,
    height: 44,
    flex: 1,
  },
  title1: {
    marginLeft: -15,
    color: "#ff3b30", // System red color
  },
  buttonParent: {
    flexDirection: "row",
    alignSelf: "stretch",
    gap: 2,
  },
  frame: {
    marginTop: -61.5,
    marginLeft: -134.5,
    borderRadius: 14,
    backgroundColor: Color.white,
    borderColor: "rgba(105, 90, 86, 0.2)",
    borderWidth: 1,
    justifyContent: "center",
    paddingTop: 19,
    gap: 2,
    alignItems: "center",
    borderStyle: "solid",
    left: "50%",
    top: "50%",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alert: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Alert;