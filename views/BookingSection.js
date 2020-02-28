import React from "react";
import { Button, Icon, Left, Right, Text, View } from "native-base";
import { StyleSheet } from 'react-native';

const BookingSection = props => {
  return (
    <View style={styles.bottomBookingSection}>
      <Left>
        <View>
          <Text>
            50$ / night
          </Text>
        </View>
        <View style={styles.ratingAndPriceInfoSection}>
          <Icon name={'star'} style={styles.ratingText}/>
          <Text style={styles.ratingText}>
            4.9
          </Text>
          <Text>
            (304)
          </Text>
        </View>
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
