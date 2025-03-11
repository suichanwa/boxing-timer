import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontFamily, FontSize, Padding } from "../../styles/GlobalStyles";

interface TrainingHeaderProps {
  onBackPress: () => void;
  title?: string;
  colors: any; // Theme colors
}

const TrainingHeader: React.FC<TrainingHeaderProps> = ({ 
  onBackPress, 
  title = "Training",
  colors
}) => {
  return (
    <View style={[styles.headerNavigation, { backgroundColor: colors.background }]}>
      <View style={[styles.navigationBar, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
        <TouchableOpacity 
          style={styles.leadingIcon} 
          onPress={onBackPress}
        >
          <View style={styles.arrowBack}>
            <View style={[styles.arrowLine, { backgroundColor: colors.active }]} />
            <View style={[styles.arrowHead, { borderColor: colors.active }]} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.titleText, { color: colors.textPrimary }]} numberOfLines={1}>{title}</Text>
        <View style={styles.trailingIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerNavigation: {
    width: '100%',
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
    position: 'absolute',
    left: 2,
  },
  arrowHead: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 2,
  },
  titleText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.large,
    textAlign: "center",
    flex: 1,
  },
  trailingIcon: {
    width: 80,
  },
});

export default TrainingHeader;