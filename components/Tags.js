import React from "react";
import {ScrollView, View, StyleSheet} from "react-native";
import {Button, Text} from 'native-base'

const Tags = (props) => {
  const tags = ["Helsinki", "Vantaa", "Tampere"];
  return (
    <View style={styles.view}>
      <ScrollView horizontal>
        {tags.map((item, index) => (
          <Button light key={index} style={styles.item} onPress={() => {
            props.navigation.push("SearchPage", {input: item})
          }}>
            <Text style={{
              fontSize: 12,
            }}>#{item}</Text>
          </Button>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 15,
    margin: 2,
    borderWidth: 0.2,
    borderRadius: 30,
    borderColor: "#C4C3C2",
  },

  view: {
    marginHorizontal: 20,
    marginVertical: 10,
  }
});

export default Tags;
