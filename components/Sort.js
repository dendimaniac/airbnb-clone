import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Sort = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>Sort: </Text>
      </View>
      <View style={styles.item}>
        <Text>Rating</Text>
      </View>
      <View style={styles.item}>
        <Text>Price U</Text>
      </View>
      <View style={styles.item}>
        <Text>Price D</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth:0.5,
    height:"5%"
  },
  item: {
    width:"25%",
    borderRightWidth:0.4,
    paddingLeft:0,
  }
});

export default Sort;
