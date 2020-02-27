import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';

const AsyncImage = (props) => {
  // console.log('Asimage props', props);
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setLoaded(true);
  };
  const {
    style,
    spinnerColor,
    source,
  } = props;
  console.log('loaded', loaded);
  return (
    <View style={[
      style, {
        flex: 1,
      }]}>
      <Image
        source={source}
        resizeMode={'contain'}
        style={props.style}
        onLoad={onLoad}/>
      {!loaded &&
      <View style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -13,
      }}>
        <Spinner color={spinnerColor}/>
      </View>
      }
    </View>
  );
};

AsyncImage.propTypes = {
  spinnerColor: PropTypes.string,
  style: PropTypes.object,
  source: PropTypes.object,
};

export default AsyncImage;
