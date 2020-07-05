import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from 'react-native';

import MainButton from '../components/MainButton';
import DefaultStyle from '../constants/default-styles';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
});

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  })

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyle.titleText}>Game Over!</Text>
        {availableDeviceHeight > 500 && (
          <View
            style={[
              styles.imageContainer,
              {
                width: availableDeviceWidth * 0.7,
                height: availableDeviceWidth * 0.7,
                borderRadius: availableDeviceWidth * 0.7 / 2,
                marginVertical: availableDeviceHeight > 600 ? 30 : 10,
              }
            ]}
          >
            <Image
              source={require('../assets/original.png')}
              // source={{uri: 'https://zviazda.by/sites/default/files/field/image/cnn_0.jpg'}}
              style={styles.image}
              />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text
            style={[
              DefaultStyle.bodyText,
              {
                fontSize: availableDeviceHeight > 600 ? 20 : 16,
                textAlign: 'center',
              }
            ]}
          >
            Your phone needed <Text style={styles.highlight}>{rounds}</Text>{" "}
            rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
          </Text>
        </View>
        <MainButton onPress={onRestart}>
          NEW GAME
        </MainButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;
