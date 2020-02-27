import React from "react";
import {  
  Icon
} from "native-base";
import PropTypes from "prop-types";
import { mediaURL } from "../constants/urlConst";
import { fetchDELETE } from "../hooks/APIHooks";
import { AsyncStorage, StyleSheet } from "react-native";
import { View, Image, Text, TouchableOpacity, Dimensions } from "react-native";

const width= Dimensions.get("window").width;
const ListItem = props => {
  const { singleMedia, mode, getMedia, navigation } = props;
  const { title, description, file_id, thumbnails } = singleMedia;
  console.log(thumbnails.w320);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.push("Single", { file: singleMedia });
      }}
    >
      <Image
        source={{ uri: mediaURL + thumbnails.w320 }}
        style={{
          height: 150,
          width: "100%",
          borderRadius: 5
        }}
      />
      <View>
        <Text numberOfLines={1} style={{ ...styles.title, color: "#9E6969" }} numberOfLines={1}>
          Japan
        </Text>
        <Text numberOfLines={1} style={{ ...styles.title }} numberOfLines={1}>
          Feeling samurai soul
        </Text>
        <Text>82 € per person</Text>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Icon style={{fontSize:13}} name="star" />
            <Text numberOfLines={1}> 4.99 </Text>
          </View>
          <Text>(1088)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width-40)*0.48,
    height:"25%",
    marginVertical: 5
  },
  textContainer: {},
  title: {
    fontSize: 12,
    fontWeight: "700",
    paddingVertical: 3
  },
  bottom: {
    flexDirection: "row",
    alignItems:"center",
    paddingVertical: 3,
    alignContent:"flex-start"

  },
  bottomLeft: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

/*
<BaseListItem>
      <Left>
        <Thumbnail
          square
          large
          source={{ uri: mediaURL + props.singleMedia.thumbnails.w160 }}
        />
      </Left>
      <Body>
        <H3 numberOfLines={1}>{title}</H3>
        <Text numberOfLines={1}>{description}</Text>
      </Body>
      <Right>
        <Button
          full
          onPress={() => {
            props.navigation.push("Single", { file: singleMedia });
          }}
        >
          <Icon name="eye" />
        </Button>
        {props.mode === "myfiles" && (
          <>
            <Button
              full
              warning
              onPress={() => {
                props.navigation.push("Modify", { file: singleMedia });
              }}
            >
              <Icon name="create" />
            </Button>
            <Button
              full
              danger
              onPress={async () => {
                const token = await AsyncStorage.getItem("userToken");
                const del = await fetchDELETE("media", file_id, token);
                console.log("delete", del);
                if (del.message) {
                  getMedia(mode);
                }
              }}
            >
              <Icon name="trash" />
            </Button>
          </>
        )}
      </Right>
    </BaseListItem>*/

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  mode: PropTypes.string,
  getMedia: PropTypes.func
};

export default ListItem;
