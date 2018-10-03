import React, {Component} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AddTodo from './AddTodo';
import TodoElementsContainer from './TodoElementsContainer';

export default class TodosContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }

    this.addNewTodo = this.addNewTodo.bind(this);
  }

  addNewTodo = (txt) => {
    console.log(txt);
    this.setState({
      todos: [...this.state.todos, txt]
    })
  }


  render() {
    return (
      <View>
        <TodoElementsContainer todos={this.state.todos}/>
        <AddTodo addNewTodo={this.addNewTodo} />
      </View>
    );
  }
}
