import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CheckBox, ListItem, Body } from 'native-base';

export default class TodoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      checked: false
    }
    this.checkBoxChecked = this.checkBoxChecked.bind(this);
  }

  checkBoxChecked = () => {
    this.props.removeTodoElement(this.props.text);
  }

  render() {
    return (
      <View>
        <ListItem>
          <CheckBox
            center
            title='Todo'
            checked={this.state.checked}
            onPress={this.checkBoxChecked}
          />
          <Body>
            <Text>{this.props.text}</Text>
          </Body>
        </ListItem>


      </View>
    );
  }
}
