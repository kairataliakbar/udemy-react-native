import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import ContainerNumber from '../components/ContainerNumber';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    width: 300,
    maxWidth: '90%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  listContainerBig: {
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
});

const renderListItem = (value, index) => (
  <View key={index} style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}># {index}</Text>
    <Text style={DefaultStyles.bodyText}>{value}</Text>
  </View>
);

const generateRandomNumber = (min, max, exclude) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(minNumber, maxNumber, randomNumber);
  } else {
    return randomNumber;
  }
};

const GameScreen = ({ userChoose, onGameOver }) => {
  const initialGuess = generateRandomNumber(1, 100, userChoose);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  });

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (userChoose == currentGuess) {
      onGameOver(pastGuess.length);
    }
  }, [currentGuess]);

  const validationUserChooseNumber = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoose)
      || (direction === "greater" && currentGuess > userChoose)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    };
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuess([nextNumber, ...pastGuess]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.titleText}>Guess a Number</Text>
      {availableDeviceHeight > 500 ? (
        <>
          <ContainerNumber>{currentGuess}</ContainerNumber>
          <Card style={styles.buttonsContainer}>
            <MainButton onPress={() => validationUserChooseNumber("lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
            <MainButton onPress={() => validationUserChooseNumber("greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
          </Card>
        </>
      ) : (
        <View style={styles.controls}>
          <MainButton onPress={() => validationUserChooseNumber("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <ContainerNumber>{currentGuess}</ContainerNumber>
          <MainButton onPress={() => validationUserChooseNumber("greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      )}
      <View
        style={availableDeviceWidth > 350
          ? styles.listContainer
          : styles.listContainerBig}
      >
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) => renderListItem(guess, pastGuess.length - index))}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;
