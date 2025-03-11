import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Gap, Padding, BorderRadius } from "../../styles/GlobalStyles";
import { useTheme } from "../hooks/useTheme";

const Frame = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  // Create animated value for button position (starts off-screen)
  const buttonPosition = useRef(new Animated.Value(900)).current;
  
  // Animation for button floating up
  useEffect(() => {
    Animated.spring(buttonPosition, {
      toValue: 656, 
      tension: 50,
      friction: 7,
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <View style={[styles.view, { backgroundColor: colors.background }]}>
      <Animated.View 
        style={[
          styles.btnParent, 
          styles.btnParentPosition,
          { top: buttonPosition }
        ]}
      >
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("WorkoutSettings")}
        >
          <Text style={[styles.addNote, { color: colors.textInverted }]}>Continue</Text>
        </TouchableOpacity>
        
        <View style={styles.poweredByParent}>
          <Text style={[styles.poweredBy, { color: colors.textPrimary }]}>{`Powered by `}</Text>
          <Image
            style={styles.logoIcon}
            contentFit="contain"
            source={require("../../assets/WWA logo.svg")}
          />
        </View>
      </Animated.View>

      <View style={styles.bottomTabBarWithLabels}>
        <View style={styles.tabs}>
          <View style={styles.tab1}>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../../assets/logo.png")}
            />
            <Text style={[styles.notes, { color: colors.active }]}>Notes</Text>
          </View>
          <View style={styles.tab1}>
            <Text style={styles.archive}>To-Dos</Text>
          </View>
          <View style={styles.tab1}>
            <Text style={styles.archive}>Locked</Text>
          </View>
          <View style={styles.tab1}>
            <Text style={styles.archive}>Saved</Text>
          </View>
        </View>
        <View style={styles.gestureIndicatorBar}>
          <View style={[styles.rectangle, { backgroundColor: colors.divider }]} />
        </View>
      </View>

      <Image
        style={styles.logoIcon1}
        contentFit="contain"
        source={require("../../assets/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: Color.white,
    width: "100%",
    height: 856,
    minHeight: 852,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  btnParentPosition: {
    left: "50%",
    position: "absolute",
  },
  btnParent: {
    marginLeft: -127.5,
    // top: 656, // Removed as we're controlling it with animation
    gap: 16,
    zIndex: 2,
    alignItems: "center",
  },
  btn: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    elevation: 7,
    shadowOpacity: 1,
    borderRadius: 74,
    backgroundColor: Color.primary,
    width: 255,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: Padding.medium,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  addNote: {
    lineHeight: 23,
    color: Color.white,
    fontFamily: FontFamily.medium,
    fontWeight: "500",
    textAlign: "center",
    fontSize: FontSize.large,
    flex: 1,
  },
  poweredByParent: {
    flexDirection: "row",
    gap: Gap.small,
    alignItems: "center",
  },
  poweredBy: {
    letterSpacing: -0.4,
    fontWeight: "600",
    fontFamily: FontFamily.semiBold,
    color: Color.textPrimary,
    textAlign: "left",
    fontSize: FontSize.large,
  },
  logoIcon: {
    width: 40, // Adjusted size for SVG logo
    height: 20, // Adjusted size for SVG logo
  },
  bottomTabBarWithLabels: {
    bottom: 0,
    left: 0,
    width: 393,
    justifyContent: "flex-end",
    paddingTop: 4,
    zIndex: 1,
    position: "absolute",
    gap: Gap.small,
    alignItems: "center",
    overflow: "hidden",
  },
  tabs: {
    opacity: 0.01, // As per original design
    alignSelf: "stretch",
    flexDirection: "row",
  },
  tab1: {
    height: 40,
    flex: 1,
    alignItems: "center",
  },
  icon: {
    top: "50%",
    marginTop: -20,
    height: 24,
    width: 24,
    left: "50%",
    marginLeft: -12,
    position: "absolute",
  },
  notes: {
    marginTop: 7,
    top: "50%",
    color: Color.active,
    textAlign: "center",
    lineHeight: 15,
    fontSize: FontSize.small,
    fontFamily: FontFamily.medium,
    fontWeight: "500",
  },
  archive: {
    marginTop: 7,
    top: "50%",
    color: "rgba(250, 236, 232, 0.62)",
    textAlign: "center",
    lineHeight: 15,
    fontSize: FontSize.small,
    fontFamily: FontFamily.medium,
    fontWeight: "500",
  },
  gestureIndicatorBar: {
    height: 32,
    alignSelf: "stretch",
    overflow: "hidden",
    position: "relative",
  },
  rectangle: {
    left: "50%",
    marginLeft: -60,
    bottom: 8,
    borderRadius: 360,
    backgroundColor: "#f6edeb",
    width: 120,
    height: 4,
    opacity: 0.5,
    position: "absolute",
  },
  logoIcon1: {
    top: "50%",
    marginTop: -66,
    width: 132,
    height: 132,
    left: "50%",
    marginLeft: -66,
    position: "absolute",
    zIndex: 0,
  },
});

export default Frame;