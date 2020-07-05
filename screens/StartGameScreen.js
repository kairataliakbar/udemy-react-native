import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import ContainerNumber from "../components/ContainerNumber";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  input: {
    width: 60,
    textAlign: "center",
  },
  confirmedTextContainer: {
    margin: 30,
    alignItems: "center",
  },
});

const StartGameScreen = ({ onStartGame }) => {
  const [enteredText, setEnteredText] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonLayout, setButtonLayout] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const layoutUpdate = () => setButtonLayout(Dimensions.get('window').width / 4);

    Dimensions.addEventListener('change', layoutUpdate);
    return () => {
      Dimensions.removeEventListener('change', layoutUpdate);
    };
  });

  const handleCheckEnteredText = (text) => {
    setEnteredText(text.replace(/[^0-9]/g, ''));
  };

  const handleResetButton = () => {
    setEnteredText("");
    setConfirmed(false);
  };

  const handleConfirmButton = () => {
    const chosenNumber = parseInt(enteredText);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has be a number between 1 and 99.",
        [{ text: "Okey", onPress: handleResetButton }]
      );
      return;
    }
    setSelectedNumber(enteredText);
    setEnteredText("");
    setConfirmed(true);
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={{...styles.title, ...DefaultStyles.titleText}}>
              Start a New Game!
            </Text>
            <Card style={styles.inputContainer}>
              <Text style={DefaultStyles.bodyText}>Select a Number</Text>
              <Input
                style={styles.input}
                autoCorrect={false}
                blurOnSubmit
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={handleCheckEnteredText}
                value={enteredText}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonLayout }}>
                  <Button
                    title="Reset"
                    onPress={handleResetButton}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: buttonLayout }}>
                  <Button
                    title="Confirm"
                    onPress={handleConfirmButton}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmed && (
              <Card style={styles.confirmedTextContainer}>
                <Text>You selected</Text>
                <ContainerNumber>{selectedNumber}</ContainerNumber>
                <MainButton onPress={() => onStartGame(selectedNumber)}>
                  START GAME
                </MainButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;
