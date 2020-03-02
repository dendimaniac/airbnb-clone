
import React, {Component} from "react";
import {Container, Header, Content, Icon, Picker, Form, Text} from "native-base";

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Sort by"
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <Content>
        <Form>
          <Picker
            mode="dropdown"
            iosHeader="Select option"
            iosIcon={<Icon name="arrow-dropdown-circle" style={this.state.selected !== "Sort by" ? {color: "#007aff", fontSize: 25} : {}} />}
            placeholder={this.state.selected}
            style={{width: undefined}}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Alphabetical Order" value="Alphabetical Order" />
            <Picker.Item label="Price Ascending" value="Price Ascending" />
            <Picker.Item label="Price Decending" value="Price Decending" />
          </Picker>
        </Form>
      </Content>
    );
  }
}
