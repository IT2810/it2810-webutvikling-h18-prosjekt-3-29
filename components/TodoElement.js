import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Fab,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';

export default class TodoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      checked: false
    }


  }

  render() {
    return (
      <View>

      //this is the todo-component
        <CheckBox
          center
          title='Todo'
          checked={this.state.checked}
          onClick={() => this.setState({
            checked: true
          })}
        />
        <Text>{this.props.text}</Text>

      </View>
    );
  }
}
