import React, {Component} from 'react';
import TodoElement from './TodoElement';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class TodoElementsContainer extends Component {
  constructor(props) {
    super(props);
  }

  removeTodoElement = (txt) => {
    this.props.removeTodo(txt);
  }

  render() {
    return (
      <View style={styles.todos}>
        {/*Loop trough the list that is passed down from todoscontainer, and adds it to the view */}
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
