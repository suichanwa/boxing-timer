import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from "@react-navigation/native";
import Timer from '../../components/Timer';
import Button from '../../components/Button';
import { FontFamily, FontSize, Color, Gap, Padding } from '../../styles/GlobalStyles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showSettings, setShowSettings] = useState(false);
  
  // Default boxing timer settings
  const [roundTime, setRoundTime] = useState(180); // 3 minutes
  const [restTime, setRestTime] = useState(60);    // 1 minute
  const [rounds, setRounds] = useState(3);         // 3 rounds
  
  // Function to start the training
  const startTraining = () => {
    navigation.navigate("Training", {
      roundTime,
      restTime,
      rounds
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Boxing Timer</Text>
          {/* This would be your logo */}
          <Image
            style={styles.logoImage}
            contentFit="cover"
            source={require('../../assets/logo.png')}
          />
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Rounds</Text>
            <Text style={styles.infoValue}>{rounds}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Round Time</Text>
            <Text style={styles.infoValue}>{Math.floor(roundTime/60)}:00</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Rest Time</Text>
            <Text style={styles.infoValue}>{Math.floor(restTime/60)}:00</Text>
          </View>
        </View>
        
        <Timer 
          roundTime={roundTime} 
          restTime={restTime} 
          rounds={rounds} 
        />
        
        <Button
          title="START TRAINING"
          onPress={startTraining}
          variant="primary"
          style={styles.startButton}
        />
        
        <Button
          title={showSettings ? "Hide Settings" : "Show Settings"}
          onPress={() => setShowSettings(!showSettings)}
          variant="secondary"
          style={styles.settingsButton}
        />
        
        {showSettings && (
          <View style={styles.settingsContainer}>
            <Text style={styles.settingsLabel}>
              Settings will be implemented in the future
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.semiBold,
    color: Color.textPrimary,
    marginBottom: 10,
  },
  logoImage: {
    width: 100,
    height: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.medium,
    color: Color.textSecondary,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.semiBold,
    color: Color.textPrimary,
  },
  startButton: {
    marginTop: 30,
    minWidth: 200,
  },
  settingsButton: {
    marginTop: 20,
    backgroundColor: Color.background,
  },
  settingsContainer: {
    marginTop: 20,
    width: '100%',
    padding: 20,
    backgroundColor: Color.background,
    borderRadius: 10,
  },
  settingsLabel: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
    color: Color.textSecondary,
  },
});

export default HomeScreen;