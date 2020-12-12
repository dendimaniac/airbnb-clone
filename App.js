/* eslint-disable max-len, no-undef */
import React, {useState, useEffect} from 'react';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';

import {MediaProvider} from './contexts/MediaContext';
import Navigator from './navigators/Navigator';

const App = () => {
  const [fontReady, setFontReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    setFontReady(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontReady) {
    console.log('Waiting for fonts...');
    return (
      <AppLoading />
    );
  }
  return (
    <MediaProvider>
      <Navigator/>
    </MediaProvider>
  );
};

export default App;
