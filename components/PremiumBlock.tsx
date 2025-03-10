import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color } from "../styles/GlobalStyles";

interface PremiumBlockProps {
  onPress?: () => void;
  price?: string;
  message?: string;
  style?: object;
  visible?: boolean;
}

const PremiumBlock: React.FC<PremiumBlockProps> = ({
  onPress = () => {},
  price = "For 0.99 USD",
  message = "Get rid of the annoying ads!",
  style = {},
  visible = true,
}) => {
  if (!visible) return null;
  
  return (
    <View style={[styles.premiumBlock, style]}>
      {/* Background PNG image */}
      <View style={styles.backgroundContainer}>
        <Image
          style={styles.backgroundImage}
          contentFit="cover"
          source={require("../assets/premium-block.png")}
        />
      </View>
      
      {/* Premium message */}
      <View style={styles.textContainer}>
        <Text style={styles.subText}>{message}</Text>
      </View>
      
      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{price}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  premiumBlock: {
    borderRadius: 10,
    backgroundColor: Color.primary,
    width: "100%",
    height: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    paddingHorizontal: 16,
    position: "relative",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    zIndex: 1,
  },
  subText: {
    fontSize: FontSize.large,
    lineHeight: 24,
    fontFamily: FontFamily.bold,
    color: Color.white,
    textAlign: "left",
    maxWidth: "90%",
  },
  buttonContainer: {
    marginLeft: 8,
    zIndex: 1,
  },
  primaryBtn: {
    shadowColor: "rgba(21, 16, 78, 0.23)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 11.56,
    elevation: 11.56,
    shadowOpacity: 1,
    borderRadius: 100,
    backgroundColor: Color.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.semiBold,
    color: Color.primary,
    textAlign: "center",
  },
});

export default PremiumBlock;