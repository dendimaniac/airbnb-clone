import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CloudHome, Nhan!</Text>
      <Text style={styles.subtitile}>
        A selection of places to stay verified for quality and design.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10
  },
  title: {
    fontSize: 25,
    fontWeight: "700"
  },
  subtitile: {
    marginVertical: 5
  }
});

export default Title;
