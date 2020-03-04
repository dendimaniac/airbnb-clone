import React from "react";
import { Button, Left, Right, Text, View } from "native-base";
import { StyleSheet } from 'react-native';
import Rating from "../components/Rating";

const BookingSection = props => {
  return (
    <View style={styles.bottomBookingSection}>
      <Left>
        <View>
          <Text>
            50$ / night
          </Text>
        </View>
        <Rating fontSize={17} id={props.id}/>
      </Left>
      <Right>
        <Button danger full style={styles.chooseButton}>
          <Text>Book</Text>
        </Button>
      </Right>
    </View>);
};

const styles = StyleSheet.create({
  bottomBookingSection: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    padding: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  ratingAndPriceInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'green',
    marginRight: 5
  },
  chooseButton: {
    borderRadius: 5,
  }
});

export default BookingSection;
