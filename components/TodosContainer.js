import React, {Component} from 'react';
import {
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
    this.removeTodo = this.removeTodo.bind(this);
  }

  addNewTodo = (txt) => {
    //legger til den nye todoen i lista. LIsta sendes så ned til TodoElementsContainer
    this.setState({
      todos: [...this.state.todos, txt]
    })
  }

  removeTodo = (txt) => {
    //updates the todolist - removes the box clicked
    //txt is not set to be something until second time pushed....
    this.setState ({
      todos: this.state.todos.filter(e => e !== txt)
    })
  }

  render() {
    return (
      <View>
        <TodoElementsContainer todos={this.state.todos} removeTodo={this.removeTodo}/>
        <AddTodo addNewTodo={this.addNewTodo} />
      </View>
    );
  }
}
