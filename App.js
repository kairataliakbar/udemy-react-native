import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!loading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoading(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  const handleRestart = () => {
    setUserNumber(null);
    setGuessRound(0);
  };

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  let content = <StartGameScreen onStartGame={handleStartGame} />;

  if (userNumber && guessRound > 0) {
    content = (
      <GameOverScreen
        rounds={guessRound}
        userNumber={userNumber}
        onRestart={handleRestart}
      />
    );
  } else if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen
        userChoose={userNumber}
        onGameOver={(value) => setGuessRound(value)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
        {content}
    </SafeAreaView>
  );
}
