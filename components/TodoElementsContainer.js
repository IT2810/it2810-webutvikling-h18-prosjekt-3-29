import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
  Button
} from 'react-native';

import TodoElement from './TodoElement';

export default class TodoElementsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        { this.props.todos.map((todo) => <TodoElement text={todo}/>) }
      </View>
    );
  }
}
