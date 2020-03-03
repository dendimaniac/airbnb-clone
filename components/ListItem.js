import React from "react";
import PropTypes from "prop-types";
import { mediaURL } from "../constants/urlConst";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Rating from "./Rating";

const width = Dimensions.get("window").width;
const ListItem = props => {
  const {singleMedia, mode, getMedia, navigation} = props;
  const {title, description, file_id, thumbnails} = singleMedia;
  console.log(thumbnails.w320);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.push("Single", {file: singleMedia});
      }}
    >
      <Image
        source={{uri: mediaURL + thumbnails.w320}}
        style={{
          height: 150,
          width: "100%",
          borderRadius: 5
        }}
      />
      <View>
        <Text numberOfLines={1} style={{...styles.title, color: "#9E6969"}} numberOfLines={1}>
          Japan
        </Text>
        <Text numberOfLines={1} style={{...styles.title}} numberOfLines={1}>
          {title}
        </Text>
        <Text>82 € per person</Text>
        <Rating fontSize={13} id={file_id}/>
        {/*<View style={styles.bottom}>*/}
        {/*  <View style={styles.bottomLeft}>*/}
        {/*    <Icon style={{fontSize:13}} name="star" />*/}
        {/*    <Text numberOfLines={1}> 4.99 </Text>*/}
        {/*  </View>*/}
        {/*  <Text>(1088)</Text>*/}
        {/*</View>*/}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - 40) * 0.48,
    marginVertical: 5,
  },
  textContainer: {},
  title: {
    fontSize: 12,
    fontWeight: "700",
    paddingVertical: 3
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
    alignContent: "flex-start"

  },
  bottomLeft: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  mode: PropTypes.string,
  getMedia: PropTypes.func
};

export default ListItem;
