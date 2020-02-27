import React from "react";
import List from "../components/List";
import PropTypes from "prop-types";
import SearchBox from "../components/SearchBox";
import Sort from '../components/Sort';

const Home = props => {
  const { navigation } = props;
  return (
    <>
      <SearchBox navigation={navigation} />
      <Sort />
      {/* <List navigation={navigation} mode={"all"}></List> */}
    </>
  );
};

Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
