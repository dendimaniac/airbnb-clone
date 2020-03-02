import React from "react";
import {View, Text, StyleSheet} from "react-native";

const Title = (props) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      {props.title &&
        <Text style={styles.title}>{props.title}</Text>
      }
      {/* End title */}

      {/* Subtitle */}
      {props.subtitle &&
        <Text style={styles.subtitile}>
          {props.subtitle}
        </Text>
      }
      {/* End subtitle */}

      {/* This only for search page */}
      {props.count  &&
        <Text style={styles.count}>
          {props.count} places to stay
        </Text>
      }
      {/* Ending  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  title: {
    fontSize: 25,
    fontWeight: "700"
  },
  subtitile: {
    marginVertical: 5
  },
  count: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    paddingTop:5
  }
});

export default Title;
