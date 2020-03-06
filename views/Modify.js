import React, { useContext, useEffect, useState } from 'react';
import { Button, Content, Form, Item, Spinner, Text, } from 'native-base';

import { Dimensions, } from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import { MediaContext } from '../contexts/MediaContext';
import { validateField } from '../utils/validation';
import { uploadConstraints } from '../constants/validationConst';
import { mediaURL } from '../constants/urlConst';
import AsyncImage from '../components/AsyncImage';
import { Video } from 'expo-av';

const deviceHeight = Dimensions.get('window').height;

const Modify = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [send, setSend] = useState(false);

  const {
    handleTitleChange,
    handleDescriptionModify,
    handleLocationModify,
    handlePriceModify,
    handleCapacityModify,
    handleModify,
    description,
    inputs,
    errors,
    loading,
    setErrors,
    setInputs,
  } = useUploadForm();

  const validationProperties = {
    title: {title: inputs.title},
    description: {description: inputs.description},
  };

  const validate = (field, value) => {
    console.log('vp', validationProperties[field]);
    setErrors((errors) =>
      ({
        ...errors,
        [field]: validateField({[field]: value},
            uploadConstraints),
        fetch: undefined,
      }));
  };

  const file = props.navigation.state.params.file;

  useEffect(() => {
    setInputs((inputs) =>
      ({
        ...inputs,
        title: file.title,
      }));
  }, []);

  const handleTitle = (text) => {
    handleTitleChange(text);
    validate('title', text);
  };

  const handleDescription = (text) => {
    handleDescriptionModify(text);
    // validate('description', text);
  };

  const handleLocation = (text) => {
    handleLocationModify(text);
    // validate('description', text);
  };
  const handleCapacity = (text) => {
    handleCapacityModify(text);
    // validate('description', text);
  };
  const handlePrice = (text) => {
    handlePriceModify(text);
    // validate('description', text);
  };

  const modify = () => {
    console.log('reg field errors', errors);
    handleModify(file.file_id, props.navigation, setMedia);
  };

  const checkErrors = () => {
    console.log('errors', errors);
    if (errors.title !== undefined ||
      errors.description !== undefined) {
      setSend(false);
    } else {
      setSend(true);
    }
  };

  useEffect(() => {
    checkErrors();
  }, [errors]);

  console.log('send', send);

  return (
    <Content>
      {loading ? (
        <Spinner/>
      ) : (
        <Form>
          <Item>
            <FormTextInput
              placeholder='Title'
              onChangeText={handleTitle}
              value={inputs.title}
              error={errors.title}
            />
          </Item>
          <Item>
            <FormTextInput
              placeholder='Location'
              onChangeText={handleLocation}
              value={description.location}
              error={errors.description}
            />
          </Item>
          <Item>
            <FormTextInput
              placeholder='Capacity'
              onChangeText={handleCapacity}
              value={description.capacity}
              error={errors.description}
            />
          </Item>
          <Item>
            <FormTextInput
              placeholder='Price'
              onChangeText={handlePrice}
              value={description.price}
              error={errors.description}
            />
          </Item>
          <Item>
            <FormTextInput
              placeholder='Description'
              onChangeText={handleDescription}
              value={description.description}
              error={errors.description}
            />
          </Item>
          {file.media_type === 'image' ? (
              <AsyncImage
                style={{
                  width: '100%',
                  height: deviceHeight / 2,
                }}
                spinnerColor='#777'
                source={{uri: mediaURL + file.filename}}
              />) :
            (<Video
              source={{uri: mediaURL + file.filename}}
              useNativeControls
              style={{
                width: '100%',
                height: deviceHeight / 2,
              }}
              onError={(e) => {
                console.log('video error', e);
              }}
            />
            )
          }
          {send &&
          <Button full onPress={modify}>
            <Text>Send</Text>
          </Button>
          }
        </Form>
      )}
    </Content>
  );
};

// proptypes here
Modify.propTypes = {
  navigation: PropTypes.object,
};

export default Modify;
