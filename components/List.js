/* eslint-disable max-len */
import React, {useContext, useEffect, useState} from "react";
import {Spinner} from "native-base";
import ListItem from "./ListItem";
import {MediaContext} from "../contexts/MediaContext";
import {getAllMedia, getFavoriteMedia, getUserMedia, getBookingMedia} from "../hooks/APIHooks";
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
  const [option, setOption] = useState(undefined);

  //Get keySearch from Search page
  const keySearch = props.keySearch;

  const handleOption = (list, option) => {
    if (list.length > 1) {
      switch (option) {
        case "Alphabetical Order":
          return list.sort((a, b) => a.title.localeCompare(b.title));
        case "Price Ascending":
          return list.sort((a, b) => JSON.parse(a.description).price - JSON.parse(b.description).price);
        case "Price Decending":
          return list.sort((a, b) => JSON.parse(b.description).price - JSON.parse(a.description).price);
        default: return list;
      }
    } else {
      return list;
    }
  }
  const getMedia = async mode => {
    try {
      console.log("mode", mode);
      const allData = await getAllMedia();
      const token = await AsyncStorage.getItem("userToken");
      const myData = await getUserMedia(token);
      const favouriteMedia = await getFavoriteMedia(token);
      const bookingMedia = await getBookingMedia();
      setMedia({
        allFiles: allData.reverse(),
        myFiles: myData,
        favouriteMedia: favouriteMedia,
        profile: myData,
        booked: bookingMedia
      });
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getMedia(props.mode);
  }, []);

  let searchList;
  if (props.mode === "search") {
    searchList = media.myFiles.filter(item => JSON.parse(item.description).location === keySearch);
  }

  console.log("Option here", option)

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
                {media.myFiles.length > 1 && <Sort setOption={setOption} />}
                <View style={styles.columnContainer}>
                  {handleOption(media.myFiles, option).map((item, index) => (
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
                {searchList.length !== 0 &&
                  <>
                    <Title count={searchList.length} />
                    {searchList.length > 1 && <Sort setOption={setOption} />}
                    <View style={styles.columnContainer}>
                      {searchList.map((item, index) => (
                        <ListItem
                          key={index}
                          navigation={props.navigation}
                          singleMedia={item}
                          mode={props.mode}
                          getMedia={getMedia}
                        />
                      ))}
                    </View>
                  </>
                }
                {searchList.length === 0 &&
                  <Title subtitle={"There nothing match your search!"} />
                }
              </ScrollView>
            )}
            {props.mode === "booked" && (
              <ScrollView>
                <Title title={"List of your booking: "} subtitle={media.booked.length>0?"":"There is nothing booked."}/>
                {media.booked.length > 1 && <Sort setOption={setOption} />}
                <View style={styles.wrapContainer}>
                  {handleOption(media.booked, option).map((item, index) => (
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
