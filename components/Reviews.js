import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { H3, Spinner, Text, View, } from 'native-base';
import { fetchGET } from "../hooks/APIHooks";
import ReviewItem from "./ReviewItem";

const Reviews = props => {
  const [loading, setLoading] = useState(true);
  const [reviewsArray, setReviewsArray] = useState(undefined);
  const file = props.file;

  const getReview = async () => {
    const json = await fetchGET('comments/file', file.file_id);
    console.log(json);
    setReviewsArray(json);
    setLoading(false);
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <View style={styles.container}>
      <H3>Reviews</H3>
      {loading ?
        <Spinner/> :
        (reviewsArray && reviewsArray.length !== 0) ?
          (reviewsArray.map((item, index) => (
            <ReviewItem
              key={index}
              item={item}/>
          ))) :
          <Text style={styles.noReviewText}>No reviews yet. Be the first to review it!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  noReviewText: {
    marginTop: 15,
  },
});

export default Reviews;
