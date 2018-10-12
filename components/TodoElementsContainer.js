import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';

import TodoElement from './TodoElement';

export default class TodoElementsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  removeTodoElement = (txt) => {
    this.props.removeTodo(txt);
  }

  render() {
    return (
      <View style={styles.todos}>
        {/*her går vi gjennom lista som ble sendt ned fra todoscontainer, og legger dem til i viewet.*/}
        { this.props.todos.map((todo) => <TodoElement text={todo} removeTodoElement={this.removeTodoElement}/>) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todos: {
    marginTop: 17,
  },
});
