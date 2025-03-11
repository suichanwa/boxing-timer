import React, { useRef, useEffect } from "react";
import { 
  Text, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Modal, 
  Animated,
  Easing,
  Dimensions
} from "react-native";
import { FontFamily, FontSize, Gap } from "../styles/GlobalStyles";

interface AlertProps {
  onContinue: () => void;
  onQuit: () => void;
  colors: any; // Theme colors
}

const Alert: React.FC<AlertProps> = ({ onContinue, onQuit, colors }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const continueButtonScale = useRef(new Animated.Value(1)).current;
  const quitButtonScale = useRef(new Animated.Value(1)).current;

  // Entry animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ]).start();
  }, []);

  // Exit with animation
  const animateAndRun = (callback) => {
    // Scale down button
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (callback) callback();
    });
  };

  // Button press animations
  const animateContinueButton = () => {
    Animated.sequence([
      Animated.timing(continueButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(continueButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      animateAndRun(onContinue);
    });
  };

  const animateQuitButton = () => {
    Animated.sequence([
      Animated.timing(quitButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(quitButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      animateAndRun(onQuit);
    });
  };

  return (
    <Modal 
      visible={true} 
      transparent={true}
      animationType="none"
    >
      <Animated.View 
        style={[
          styles.overlay,
          { 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: fadeAnim 
          }
        ]}
      >
        <Animated.View 
          style={[
            styles.alertContainer,
            { 
              backgroundColor: colors.background,
              borderColor: colors.border,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Are You Sure?
            </Text>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              Do you really want to give up?
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Animated.View 
              style={[
                styles.buttonWrapper,
                { transform: [{ scale: continueButtonScale }] }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  { borderColor: colors.border }
                ]}
                onPress={animateContinueButton}
                activeOpacity={0.8}
              >
                <Text style={[styles.continueText, { color: colors.active }]}>
                  I can do it
                </Text>
              </TouchableOpacity>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.buttonWrapper,
                { transform: [{ scale: quitButtonScale }] }
              ]}
            >
              <TouchableOpacity 
                style={[
                  styles.button,
                  { borderColor: colors.border }
                ]}
                onPress={animateQuitButton}
                activeOpacity={0.8}
              >
                <Text style={[styles.quitText, { color: colors.error }]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');
const alertWidth = Math.min(300, width - 40);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: alertWidth,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.large,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.small,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  continueText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.medium,
    textAlign: 'center',
  },
  quitText: {
    fontFamily: FontFamily.medium, 
    fontSize: FontSize.medium,
    textAlign: 'center',
  }
});

export default Alert;