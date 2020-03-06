import React from 'react'
import { ScrollView } from 'react-native'
import Title from '../components/Title';
import List from '../components/List';

const SearchPage = (props) => {

  const keySearch = props.navigation.state.params.input;
  return (
    <ScrollView>
      <Title title={`Top search relate to "${keySearch}" :`}/>
      <List keySearch={keySearch} mode={"search"}/>
    </ScrollView>
  )
};

export default SearchPage
