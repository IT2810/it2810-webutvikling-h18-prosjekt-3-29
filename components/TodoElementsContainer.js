import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
} from 'react-native';

import TodoElement from './TodoElement';

export default class TodoElementsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.removeTodoElement = this.removeTodoElement.bind(this);
  }

  removeTodoElement = (txt) => {
    this.props.removeTodo(txt);
  }

  render() {
    return (
      <View>
        /*her går vi gjennom lista som ble sendt ned fra todoscontainer, og legger dem til.*/
        { this.props.todos.map((todo) => <TodoElement text={todo} removeTodoElement={this.removeTodoElement}/>) }
      </View>
    );
  }
}
