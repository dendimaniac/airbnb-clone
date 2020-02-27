import React, { useEffect, useState } from 'react';
import { Body, Button, Card, CardItem, Container, Content, H1, H3, Icon, Left, Right, Text, View, } from 'native-base';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import { AsyncStorage, Dimensions, StyleSheet } from 'react-native';
import { mediaURL } from '../constants/urlConst';
import { Video } from 'expo-av';
import { fetchGET } from '../hooks/APIHooks';

const deviceHeight = Dimensions.get('window').height;

const Single = (props) => {
  const [user, setUser] = useState({});
  const [userAvatar, setUserAvatar] = useState('');
  const {navigation} = props;
  const file = navigation.state.params.file;

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const json = await fetchGET('users', file.user_id, token);
      setUser(json);
    } catch (e) {
      console.log('getUser error', e);
    }
  };

  const getUserAvatar = async () => {
    try {
      const avatarPic = await fetchGET('tags', 'avatar_' + file.user_id);
      console.log('avpic', avatarPic);
      if (avatarPic && avatarPic.length !== 0) {
        let avPic = mediaURL + avatarPic[0].filename;
        setUserAvatar(avPic);
      }
    } catch (e) {
      console.log('getUserAvatar error', e);
    }
  };

  useEffect(() => {
    getUser();
    getUserAvatar();
  }, []);
  console.log(userAvatar);

  return (
    <>
      <Container>
        <Content>
          <Card>
            <CardItem bordered>
              {file.media_type === 'image' ? (
                  <AsyncImage
                    style={styles.mainImageOrVideo}
                    spinnerColor='#777'
                    source={{uri: mediaURL + file.filename}}
                  />) :
                (<Video
                    source={{uri: mediaURL + file.filename}}
                    resizeMode={'cover'}
                    useNativeControls
                    style={styles.mainImageOrVideo}
                    onError={(e) => {
                      console.log('video error', e);
                    }}
                    onLoad={(evt) => {
                      console.log('onload', evt);
                    }}
                  />
                )
              }
            </CardItem>
            <CardItem>
              <Body>
                <H1>{file.title}</H1>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Helsinki, Finland</Text>
                <Text>Hosted by {user.username}</Text>
              </Body>

              <Right>
                {userAvatar === '' ?
                  <Icon name={'person'} style={styles.imageIcon}/> :
                  <AsyncImage
                    style={styles.imageAvatar}
                    spinnerColor='#777'
                    source={{uri: userAvatar}}/>
                }
              </Right>
            </CardItem>
            <CardItem>
              <Text>
                {file.description}
              </Text>
            </CardItem>
            <CardItem>
              <H3>
                Reviews
              </H3>
            </CardItem>
          </Card>
        </Content>
      </Container>
      <View
        style={styles.bottomBookingSection}>
        <Left>
          <View>
            <Text>
              50$/night
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
            <Text>Choose</Text>
          </Button>
        </Right>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainImageOrVideo: {
    width: '100%',
    height: deviceHeight / 3,
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  imageIcon: {
    fontSize: 50,
    color: 'black',
  },
  bottomBookingSection: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    zIndex: 3,
    padding: 20,
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

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Single;
