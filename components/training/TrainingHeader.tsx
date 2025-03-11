import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontFamily, FontSize, Color, Padding } from "../../styles/GlobalStyles";

interface TrainingHeaderProps {
  onBackPress: () => void;
  title?: string;
}

const TrainingHeader: React.FC<TrainingHeaderProps> = ({ 
  onBackPress, 
  title = "Training" 
}) => {
  return (
    <View style={styles.headerNavigation}>
      <View style={styles.navigationBar}>
        <TouchableOpacity 
          style={styles.leadingIcon} 
          onPress={onBackPress}
        >
          <View style={styles.arrowBack}>
            <View style={styles.arrowLine} />
            <View style={styles.arrowHead} />
          </View>
        </TouchableOpacity>
        <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
        <View style={styles.trailingIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerNavigation: {
    backgroundColor: Color.white,
  },
  navigationBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Padding.large,
  },
  leadingIcon: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowBack: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLine: {
    width: 18,
    height: 2,
    backgroundColor: Color.active,
    position: 'absolute',
    left: 2,
  },
  arrowHead: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: Color.active,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 2,
  },
  titleText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.large,
    color: Color.textPrimary,
    textAlign: "center",
    flex: 1,
  },
  trailingIcon: {
    width: 80,
  },
});

export default TrainingHeader;