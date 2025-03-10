import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontFamily, FontSize, Color, Padding, BorderRadius } from '../styles/GlobalStyles';

const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  variant = 'primary', // primary, secondary, danger
  size = 'medium', // small, medium, large
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, getVariantStyle(), getSizeStyle(), style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    elevation: 7,
    shadowOpacity: 1,
  },
  primaryButton: {
    backgroundColor: Color.primary,
  },
  secondaryButton: {
    backgroundColor: Color.background,
    borderWidth: 1,
    borderColor: Color.primary,
  },
  dangerButton: {
    backgroundColor: Color.roundColor,
  },
  smallButton: {
    paddingVertical: Padding.small,
    paddingHorizontal: Padding.medium,
  },
  mediumButton: {
    paddingVertical: Padding.medium,
    paddingHorizontal: Padding.large,
  },
  largeButton: {
    paddingVertical: Padding.large,
    paddingHorizontal: Padding.large,
  },
  buttonText: {
    color: Color.white,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
  },
});

export default Button;