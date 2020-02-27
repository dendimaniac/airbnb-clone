import React, { useEffect, useState } from 'react';
import { Body, Button, Card, CardItem, Container, Content, H1, H3, Icon, Left, Right, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import { AsyncStorage, Dimensions, StyleSheet } from 'react-native';
import { mediaURL } from '../constants/urlConst';
import { Video } from 'expo-av';
import { fetchDELETE, fetchGET, fetchPOST } from '../hooks/APIHooks';

const deviceHeight = Dimensions.get('window').height;

const Single = (props) => {
  const [user, setUser] = useState({});
  const [userAvatar, setUserAvatar] = useState('');
  const [saved, setSaved] = useState(undefined);
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

  const checkSaved = async () => {
    try {
      const savedLists = await fetchGET('favourites/file', file.file_id);
      savedLists.filter(item => item.user_id === file.user_id);
      console.log('saved', savedLists);
      if (savedLists.length !== 0) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    } catch (e) {
      console.log('checkSaved error', e);
    }
  };

  const saveOrUnsave = async () => {
    if (!saved) {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const json = await fetchPOST('favourites', {file_id: file.file_id}, token);
        console.log('Save', json);
        if (json.favourite_id) {
          setSaved(true);
        }
      } catch (e) {
        console.log('saving error', e);
      }
    } else if (saved) {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const json = await fetchDELETE('favourites/file', file.file_id, token);
        console.log('Unsave', json);
        if (json.message.includes('deleted')) {
          setSaved(false);
        }
      } catch (e) {
        console.log('unsaving error', e);
      }
    }
  };

  useEffect(() => {
    getUser();
    getUserAvatar();
    checkSaved();
  }, []);
  console.log(userAvatar);

  return (
    <>
      <Container>
        <Content>
          <Card style={styles.card}>
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
              {saved !== undefined &&
              <View style={styles.saveArea}>
                <Button rounded light onPress={saveOrUnsave}>
                  <Icon style={saved ? styles.savedIcon : styles.defaultSaveIcon} name={'heart'}/>
                </Button>
              </View>}
            </CardItem>
            <CardItem>
              <Body>
                <H1>{file.title}</H1>
              </Body>
            </CardItem>
            <CardItem style={styles.ownerAndBasicInfoSection}>
              <View>
                <Text>Helsinki, Finland</Text>
                <Text>Hosted by {user.username}</Text>
              </View>
              <View>
                {userAvatar === '' ?
                  <Icon name={'person'} style={styles.imageIcon}/> :
                  <AsyncImage
                    style={styles.imageAvatar}
                    spinnerColor='#777'
                    source={{uri: userAvatar}}/>
                }
              </View>
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
            <Text>Choose</Text>
          </Button>
        </Right>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 80
  },
  mainImageOrVideo: {
    width: '100%',
    height: deviceHeight / 3,
    resizeMode: 'contain',
  },
  saveArea: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  defaultSaveIcon: {
    color: 'black'
  },
  savedIcon: {
    color: 'red',
  },
  ownerAndBasicInfoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 75,
    flexDirection: 'row',
  },
  imageAvatar: {
    width: 70,
    height: 70,
    borderRadius: 500,
  },
  imageIcon: {
    fontSize: 70,
    color: 'black',
  },
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

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Single;
