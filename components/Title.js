import React from "react";
import {View, Text, StyleSheet} from "react-native";

const Title = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>

      {props.subtitle !== undefined &&
        <Text style={styles.subtitile}>
          {props.subtitle}
        </Text>
      }
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
