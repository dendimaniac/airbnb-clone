import React, { useState } from "react";
import { Text, View, StyleSheet, Picker, TouchableOpacity } from "react-native";

const Sort = () => {
  const [option, setOption] = useState("Price Ascending");
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text
          style={{
            height: "100%",
            textAlign: "center",
            paddingVertical: 8,
            fontWeight: "bold"
          }}
        >
          Sort:{" "}
        </Text>
      </View>
      <View style={styles.item}>
        <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
          <Text
            style={{
              height: "100%",
              textAlign: "center",
              paddingVertical: 8,
              fontWeight: "bold"
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
        <View style={{ display: openOptions ? "" : "none" }}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={option}
            onValueChange={itemValue => {
              setOption(itemValue);
              setOpenOptions(!openOptions);
            }}
          >
            <Picker.Item label="Top Rating" value="Top Rating" />
            <Picker.Item label="Price Ascending" value="Price Ascending" />
            <Picker.Item label="Price Decending" value="Price Decending" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 0.5,
    height: "5%"
  },
  item: {
    width: "50%",
    borderRightWidth: 0.4,
    paddingLeft: 0
  },
  pickerStyle: {
    zIndex: 3,
    position: "relative",
    width: "100%",
    top: 0
  }
});

export default Sort;
