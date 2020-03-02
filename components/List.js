/* eslint-disable max-len */
import React, {useContext, useEffect, useState} from "react";
import {Spinner} from "native-base";
import ListItem from "./ListItem";
import {MediaContext} from "../contexts/MediaContext";
import {getAllMedia, getFavoriteMedia, getUserMedia} from "../hooks/APIHooks";
import PropTypes from "prop-types";
import {AsyncStorage, StyleSheet, } from "react-native";
import ImageCover from "./ImageCover";
import {ScrollView} from "react-native-gesture-handler";
import Tags from "../components/Tags";
import Title from "./Title";
import {View, Text} from 'react-native';
import Sort from './Sort';

const List = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [loading, setLoading] = useState(true);
  const getMedia = async mode => {
    try {
      console.log("mode", mode);
      const allData = await getAllMedia();
      const token = await AsyncStorage.getItem("userToken");
      const myData = await getUserMedia(token);
      const favouriteMedia = await getFavoriteMedia(token);
      setMedia({
        allFiles: allData.reverse(),
        myFiles: myData,
        favouriteMedia: favouriteMedia,
      });
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getMedia(props.mode);
  }, []);

  return (
    <View>
      {loading ? (
        <Spinner />
      ) : (
          <>
            {props.mode === "all" && (
              <ScrollView>
                <Tags />
                <ImageCover />
                <Title title={"Welcome to CloudHome, Nhan!"} subtitle={"A selection of places to stay verified for quality and design."} />
                <View style={styles.wrapContainer}>
                  {media.allFiles.map((item, index) => (
                    <ListItem
                      key={index}
                      navigation={props.navigation}
                      singleMedia={item}
                      mode={props.mode}
                      getMedia={getMedia}
                    />
                  ))}
                </View>
              </ScrollView>
            )}
            {props.mode === "myfiles" && (

              <ScrollView>
                <Title title={"List of your appartments "} />
                <Sort />
                <View style={styles.columnContainer}>
                  {media.myFiles.map((item, index) => (
                    <ListItem
                      key={index}
                      navigation={props.navigation}
                      singleMedia={item}
                      mode={props.mode}
                      getMedia={getMedia}
                    />
                  ))}
                </View>
              </ScrollView>
            )}
            {props.mode === 'saved' &&
              <ScrollView >
                <Title title={"List of saved appartments "} />
                <View style={styles.wrapContainer}>
                  {media.favouriteMedia.length === 0 && <View>
                    <Text>
                      There is nothing saved
                  </Text>
                  </View>}
                  {media.favouriteMedia.map((item, index) => (
                    <ListItem
                      key={index}
                      navigation={props.navigation}
                      singleMedia={item}
                      mode={props.mode}
                      getMedia={getMedia}
                    />
                  ))}
                </View>
              </ScrollView>
            }
            {props.mode === "search" && (
              <ScrollView>
                <Title count={media.myFiles.length}/>
                <Sort />
                <View style={styles.columnContainer}>
                  {media.myFiles.map((item, index) => (
                    <ListItem
                      key={index}
                      navigation={props.navigation}
                      singleMedia={item}
                      mode={props.mode}
                      getMedia={getMedia}
                    />
                  ))}
                </View>
              </ScrollView>
            )}
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 75,
    justifyContent: "space-between",
  },
  columnContainer: {
    marginHorizontal: 20,
    marginBottom: 75,
  }
});

List.propTypes = {
  navigation: PropTypes.object,
  mode: PropTypes.string
};

export default List;
