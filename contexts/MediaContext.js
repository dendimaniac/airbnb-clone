/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MediaContext = React.createContext([{}, () => {}]);

const mediaObject = {
  allFiles: [],
  myFiles: [],
};

const MediaProvider = (props) => {
  const [media, setMedia] = useState(mediaObject);
  const [user, setUser] = useState({
    userdata: {},
    avatar: 'https://',
  });
  return (
    <MediaContext.Provider value={[media, setMedia],[user, setUser]}>
      {props.children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node,
};

export {MediaContext, MediaProvider};
