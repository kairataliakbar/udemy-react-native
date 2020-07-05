import React from "react";
import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

const Input = ({ style, ...restProps }) => (
  <TextInput {...restProps} style={{ ...styles.input, ...style }} />
);

export default Input;
