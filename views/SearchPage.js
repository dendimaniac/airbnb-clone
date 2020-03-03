import React from 'react'
import { ScrollView, Text } from 'react-native'
import SearchBox from '../components/SearchBox';
import Title from '../components/Title';
import Sort from '../components/Sort';
import List from '../components/List';

const SearchPage = (props) => {

    const input = props.navigation.state.params.input;
    return (
        <ScrollView>
            <Title title={`Top search relate to "${input}" :`}/>
            <List mode={"search"}/>
        </ScrollView>
    )
}

export default SearchPage