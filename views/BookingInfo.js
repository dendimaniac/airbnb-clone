import React, { useEffect, useState } from 'react';
import { Button, Item, Text, View } from 'native-base';
import { AsyncStorage, Dimensions, StyleSheet } from 'react-native';
import AsyncImage from "../components/AsyncImage";
import { mediaURL } from "../constants/urlConst";
import FormTextInput from "../components/FormTextInput";
import useBookingForm from "../hooks/BookingHooks";
import { fetchPOST } from "../hooks/APIHooks";

const deviceHeight = Dimensions.get('window').height;

const BookingInfo = props => {
  const {navigation} = props;
  const [userData, setUserData] = useState({});
  const file = navigation.state.params.file;

  const {
    handleEmailChange,
    handleFullnameChange,
    validateField,
    validateOnSend,
    inputs,
    setInputs,
    errors,
    setErrors
  } = useBookingForm();

  const validationProperties = {
    email: {email: inputs.email},
    full_name: {full_name: inputs.full_name},
  };

  const getUserData = async () => {
    const userFromStorage = await AsyncStorage.getItem("user");
    const uData = JSON.parse(userFromStorage);
    setInputs(uData);
  };

  const bookAsync = async () => {
    const regValid = validateOnSend(validationProperties);
    console.log('reg field errors', errors);
    const userFromStorage = await AsyncStorage.getItem("user");
    const uData = JSON.parse(userFromStorage);
    if (!regValid) {
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      const data = {
        file_id: file.file_id,
        tag: 'booked' + uData.user_id,
      };
      const json = await fetchPOST('tags', data, token);
      console.log(json);
      navigation.push('BookedSuccess');
    } catch (e) {
      console.log('book error', e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View>
      <AsyncImage
        style={styles.mainImageOrVideo}
        spinnerColor='#777'
        source={{uri: mediaURL + file.filename}}
      />
      <View>
        <Item>
          <FormTextInput
            autoCapitalize='none'
            value={inputs.full_name}
            placeholder='Full name'
            onChangeText={handleFullnameChange}
            onEndEditing={() => {
              validateField(validationProperties.full_name);
            }}
            error={errors.full_name}
          />
        </Item>
        <Item>
          <FormTextInput
            autoCapitalize='none'
            value={inputs.email}
            placeholder='email'
            onChangeText={handleEmailChange}
            onEndEditing={() => {
              validateField(validationProperties.email);
            }}
            error={errors.email}
          />
        </Item>
      </View>
      <Button full info onPress={bookAsync}>
        <Text>Book</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  mainImageOrVideo: {
    width: '100%',
    height: 2 * deviceHeight / 5,
    resizeMode: 'cover',
  },
});

export default BookingInfo;
