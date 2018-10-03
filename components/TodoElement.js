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
  Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';

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
    this.setState({
      /*text: this.props.text,*/
      checked: true
    })
    console.log(this.state.text);
    this.props.removeTodoElement(this.state.text);
  }

  render() {
    return (
      <View>

        <CheckBox
          center
          title='Todo'
          checked={this.state.checked}
          onClick={this.checkBoxChecked}
        />
        <Text>{this.props.text}</Text>

      </View>
    );
  }
}
