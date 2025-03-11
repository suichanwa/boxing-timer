import React, { useEffect, useRef } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Animated,
  StatusBar
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize, Padding } from "../../styles/GlobalStyles";
import { useTheme } from "../hooks/useTheme";
import { useScreenAnimation } from "../hooks/useScreenAnimation";

// Languages list with native names and English translations
const languages = [
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese' },
  { code: 'zh', nativeName: '中文', englishName: 'Mandarin Chinese' },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi' },
  { code: 'fr', nativeName: 'Français', englishName: 'French' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian' },
];

const LanguageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, isDark } = useTheme();
  const { opacity, translateY, animateOut } = useScreenAnimation();
  
  // Get currently selected language from route params or default to English
  const currentLanguage = route.params?.currentLanguage || 'en';
  
  // Animation for list items
  const itemAnimations = useRef(
    languages.map(() => new Animated.Value(0))
  ).current;
  
  // Animate list items entering
  useEffect(() => {
    const animations = languages.map((_, index) => {
      return Animated.timing(itemAnimations[index], {
        toValue: 1,
        duration: 300,
        delay: 100 + (index * 50),
        useNativeDriver: true,
      });
    });
    
    Animated.stagger(50, animations).start();
  }, []);
  
  // Handle language selection
  const selectLanguage = (languageCode) => {
    animateOut(() => {
      // Return selected language to the previous screen
      navigation.navigate({
        name: 'Settings',
        params: { selectedLanguage: languageCode },
        merge: true,
      });
    });
  };
  
  // Handle back button press
  const handleBack = () => {
    animateOut(() => {
      navigation.goBack();
    });
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          opacity,
          transform: [{ translateY }]
        }
      ]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <MaterialIcons 
              name="arrow-back" 
              size={24} 
              color={colors.active} 
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Choose Language
          </Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Language List */}
        <ScrollView style={styles.scrollView}>
          {languages.map((language, index) => {
            const isSelected = language.code === currentLanguage;
            
            // Animation values for each item
            const translateX = itemAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0]
            });
            
            const itemOpacity = itemAnimations[index];
            
            return (
              <Animated.View 
                key={language.code}
                style={{
                  opacity: itemOpacity,
                  transform: [{ translateX }]
                }}
              >
                <TouchableOpacity 
                  style={[
                    styles.languageItem, 
                    { borderBottomColor: colors.border },
                    isSelected && { backgroundColor: `${colors.active}10` }
                  ]}
                  onPress={() => selectLanguage(language.code)}
                >
                  <View style={styles.languageInfo}>
                    <Text style={[styles.nativeName, { color: colors.textPrimary }]}>
                      {language.nativeName}
                    </Text>
                    <Text style={[styles.englishName, { color: colors.textSecondary }]}>
                      {language.englishName}
                    </Text>
                  </View>
                  
                  {isSelected && (
                    <MaterialIcons 
                      name="check" 
                      size={24} 
                      color={colors.active} 
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.large,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: Padding.medium,
    borderBottomWidth: 1,
  },
  languageInfo: {
    flex: 1,
  },
  nativeName: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.body,
    marginBottom: 4,
  },
  englishName: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.regular,
  },
});

export default LanguageScreen;