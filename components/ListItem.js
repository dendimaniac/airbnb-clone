import React from "react";
import {Icon} from "native-base";
import PropTypes from "prop-types";
import {mediaURL} from "../constants/urlConst";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Button, AsyncStorage} from "react-native";
import {fetchDELETE} from '../hooks/APIHooks';

const width = Dimensions.get("window").width;
const ListItem = props => {
  const {singleMedia, mode, getMedia, navigation} = props;
  const {title, description, file_id, thumbnails} = singleMedia;
  console.log(thumbnails.w320);
  return (
    <TouchableOpacity
      style={(mode === "myfiles" || mode === "search") ? styles.columContainer : styles.wrapContainer}
      onPress={() => {
        navigation.push("Single", {file: singleMedia});
      }}
      onLongPress={() => {

      }}
    >
      {mode === 'myfiles' &&
        <>
          <Button
            title={"modify"}
            onPress={
              () => {
                props.navigation.push('Modify', {file: props.singleMedia});
              }
            }
          >
            <Icon name='create' />
          </Button>
          <Button
            title={"delete"}
            onPress={async () => {
              const token = await AsyncStorage.getItem('userToken');
              const del = await fetchDELETE('media', props.singleMedia.file_id,
                token);
              console.log('delete', del);
              if (del.message) {
                props.getMedia(props.mode);
              }
            }}
          >
            <Icon name='trash' />
          </Button>
        </>
      }
      <Image
        source={{uri: mediaURL + thumbnails.w320}}
        style={{
          height: (mode === "myfiles" || mode === "search") ? 250 : 150,
          width: "100%",
          borderRadius: 5
        }}
      />
      <View style={(mode === "myfiles" || mode === "search") ? {flexDirection: "row", justifyContent: "space-between"} : {}}>
        <View style={{marginVertical: 3}}>
          <Text numberOfLines={1} style={(mode === "myfiles" || mode === "search") ? {...styles.title2} : {...styles.title1, color: "#9E6969"}} numberOfLines={1}>
            Japan
          </Text>
          <Text numberOfLines={1} style={(mode === "myfiles" || mode === "search") ? {...styles.subtitle2} : {...styles.subtitle1}} numberOfLines={1}>
            Feeling samurai soul
          </Text>
          {mode !== "myfiles" &&
            <Text>82 € per person</Text>
          }
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Icon style={{fontSize: 13, color: (mode === "myfiles" || mode === "search") ? "red" : ""}} name="star" />
            <Text numberOfLines={1}> 4.99 </Text>
          </View>
          <Text>(1088)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapContainer: {
    width: (width - 40) * 0.48,
    marginVertical: 5,
  },
  columContainer: {
    marginVertical: 15,
  },
  title1: {
    fontSize: 12,
    fontWeight: "700",
    paddingVertical: 3
  },
  subtitle1: {
    fontSize: 12,
    fontWeight: "700",
    paddingVertical: 3
  },
  title2: {
    fontSize: 14,
    paddingVertical: 3,
    color: "#727272"
  },
  subtitle2: {
    fontSize: 16,
    paddingVertical: 3,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
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
