import React from 'react'
import {ScrollView, Text} from 'react-native'
import Title from '../components/Title';
import Sort from '../components/Sort';
import List from '../components/List';

const SearchPage = (props) => {
    const {navigation}= props;
    const keySearch = props.navigation.state.params.input;
    return (
        <ScrollView>
            <List navigation={navigation} keySearch={keySearch} mode={"search"} />
        </ScrollView>
    )
}

export default SearchPage
