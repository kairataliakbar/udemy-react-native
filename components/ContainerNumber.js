import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  number: {
    fontSize: 22,
    color: Colors.accent,
  },
});

const ContainerNumber = ({ children }) => (
  <View style={styles.container}>
    <Text style={styles.number}>{children}</Text>
  </View>
);

export default ContainerNumber;
