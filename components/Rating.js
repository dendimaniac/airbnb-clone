import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Icon, Text, View } from 'native-base';
import { fetchGET } from "../hooks/APIHooks";

const Rating = props => {
  const [ratingArray, setRatingArray] = useState([]);
  const [postRating, setPostRating] = useState(0);
  const id = props.id;

  const getPostRating = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const json = await fetchGET('ratings/file', id, token);
    console.log('rating', json);
    setRatingArray(json);
    if (json.length !== 0) {
      let rating = 0;
      json.forEach(it => {
        rating += it.rating;
      });
      rating /= json.length;
      setPostRating(rating);
    }
  };

  useEffect(() => {
    getPostRating();
  }, []);

  return (
    <View style={styles.ratingAndPriceInfoSection}>
      <Icon name={'star'} style={{
        ...styles.ratingText,
        fontSize: props.fontSize + 7,
      }}/>
      <Text style={{
        ...styles.ratingText,
        fontSize: props.fontSize,
      }}>
        {postRating}
      </Text>
      <Text style={{fontSize: props.fontSize}}>
        ({ratingArray.length})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingAndPriceInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'green',
    marginRight: 5,
  },
});

export default Rating;
