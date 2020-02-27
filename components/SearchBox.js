import React from "react";
import { Icon } from "native-base";
import { TextInput, StyleSheet, View, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;

const SearchBox = props => {
  const placeholder = `Try "sicily" `;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.icon}>
          <Icon active name="ios-search" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          onSubmitEditing={props.navigation.push("Upload")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    marginTop: 10
  },
  item: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    height: deviceHeight / 20,
    flexDirection: "row",
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: "grey",
    alignContent: "center",
    alignItems: "center",
    zIndex: 300
  },
  icon: {
    paddingHorizontal: 10,
    width: "12%"
  },
  textInput: {
    width: "88%"
  }
});

export default SearchBox;
