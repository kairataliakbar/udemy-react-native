import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    padding: 20,
    elevation: 8,
    backgroundColor: "white",
  }
});

const Card = ({ style, children }) => (
  <View style={{ ...styles.card, ...style }}>
    {children}
  </View>
);

export default Card;
