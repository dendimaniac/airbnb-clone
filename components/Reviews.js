import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Spinner, Text, View, } from 'native-base';
import { fetchGET } from "../hooks/APIHooks";
import ReviewItem from "./ReviewItem";
import AddingReview from "./AddingReview";

const Reviews = props => {
  const [loading, setLoading] = useState(true);
  const [postedByCurrentUser, setPostedByCurrentUser] = useState(true);
  const [reviewsArray, setReviewsArray] = useState(undefined);
  const file = props.file;
  console.log(file);

  const getReview = async () => {
    const json = await fetchGET('comments/file', file.file_id);
    console.log(json);
    setReviewsArray(json);
    setLoading(false);
  };

  const checkPostedByCurrentUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const info = await fetchGET('users/user', '', token);
    setPostedByCurrentUser(info.user_id === file.user_id);
  };

  useEffect(() => {
    getReview();
    checkPostedByCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Reviews</Text>
      {loading ?
        <Spinner/> :
        (reviewsArray && reviewsArray.length !== 0) ?
          (reviewsArray.map((item, index) => (
            <ReviewItem
              key={index}
              item={item}/>
          ))) :
          <Text style={styles.noReviewText}>No reviews yet. Be the first to review it!</Text>}
      {postedByCurrentUser ? <></> : <AddingReview id={file.file_id} setReviewsArray={setReviewsArray}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  noReviewText: {
    marginBottom: 15,
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25
  }
});

export default Reviews;
