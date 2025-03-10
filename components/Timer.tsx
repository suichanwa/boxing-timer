import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Color, FontFamily, FontSize } from '../styles/GlobalStyles';
import Button from './Button';

const Timer = ({ roundTime = 180, restTime = 60, rounds = 3 }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [isRest, setIsRest] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up for current period
            if (isRest) {
              // Rest period finished, start new round
              if (currentRound >= rounds) {
                // Workout complete
                setIsRunning(false);
                return 0;
              } else {
                setCurrentRound(prev => prev + 1);
                setIsRest(false);
                return roundTime;
              }
            } else {
              // Round finished, start rest period
              setIsRest(true);
              return restTime;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isRest, currentRound, rounds, roundTime, restTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentRound(1);
    setTimeLeft(roundTime);
    setIsRest(false);
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.timerCircle,
        isRest ? styles.restBackground : styles.roundBackground
      ]}>
        <Text style={styles.phaseText}>
          {isRest ? 'REST' : `ROUND ${currentRound}/${rounds}`}
        </Text>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>
      
      <View style={styles.controlsContainer}>
        <Button
          title={isRunning ? 'PAUSE' : 'START'}
          onPress={toggleTimer}
          variant={isRunning ? 'secondary' : 'primary'}
          style={styles.controlButton}
        />
        
        <Button
          title="RESET"
          onPress={resetTimer}
          variant="danger"
          style={styles.controlButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  roundBackground: {
    backgroundColor: Color.roundColor,
  },
  restBackground: {
    backgroundColor: Color.restColor,
  },
  phaseText: {
    color: Color.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.semiBold,
    marginBottom: 10,
  },
  timerText: {
    color: Color.white,
    fontSize: FontSize.huge,
    fontFamily: FontFamily.semiBold,
  },
  controlsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  controlButton: {
    minWidth: 120,
  }
});

export default Timer;