import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";

import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  }
});

const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }),
      }}
    >
      <Text style={{...styles.headerTitle, ...DefaultStyles.titleText }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
