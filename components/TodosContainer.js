import React, {Component} from 'react';
import {
  Alert,
  View,
  AsyncStorage
} from 'react-native';

import AddTodo from './AddTodo';
import TodoElementsContainer from './TodoElementsContainer';

export default class TodosContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      finishedTodos: ''
    }
  }

  componentDidMount() {
    this.getNrFinishedTodosFromAsync();
    this.getUnfinishedTodosFromAsync();
  }

  componentDidUpdate() {
    this.addUnfinishedTodosToAsync();
  }

  /*function for saving unfinished todos from async*/
  addUnfinishedTodosToAsync = async () => {
    let unfTodos = this.state.todos;
    try {
      await AsyncStorage.setItem('unfinishedTodos', JSON.stringify(unfTodos));
    } catch (error) {
      console.error(error);
    }
  }

  /*function for getting unfinished todos from async*/
  getUnfinishedTodosFromAsync = async () => {
    try {
      let unfTodos = await AsyncStorage.getItem('unfinishedTodos');
      this.setState({todos: JSON.parse(unfTodos)});
    } catch (error) {
      console.error(error);
    }
  }

  /*function for adding +1 on NR of completed todos in async storage*/
  addFinishedTodosToAsync = async () => {
    let counter = String(this.state.finishedTodos + 1);
    try {
      await AsyncStorage.setItem('finishedTodosCounter',counter);
      this.setState({finishedTodos: parseInt(counter)});
    } catch (error) {
      console.error(error);
    }
  }

  /*function for getting NR of completed todos in async storage*/
  getNrFinishedTodosFromAsync = async () => {
    try {
      let nrFinishedTodos = await AsyncStorage.getItem('finishedTodosCounter');
      if (nrFinishedTodos == null) {
        this.setState({finishedTodos: 0});
      }
      else {
        nrFinishedTodos = parseInt(nrFinishedTodos);
        this.setState({finishedTodos: nrFinishedTodos});
      }
    } catch (error) {
      console.error(error);
    }
  }

  addNewTodo = (txt) => {
    let list = this.state.todos;
    if ( !list.includes(txt) ) {
      this.setState({
        todos: [...this.state.todos, txt]
      })
    }
    else {
      Alert.alert("You already have this todo! Change it, so that you can keep them apart <3");
    }

  }

  removeTodo = (txt) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo !== txt)
    });
    /*updates the nr of completed todos in async storage*/
    this.addFinishedTodosToAsync();
  }

  render() {
    return (
      <View>
        <AddTodo addNewTodo={this.addNewTodo} />
        <TodoElementsContainer todos={this.state.todos} removeTodo={this.removeTodo}/>
      </View>
    );
  }
}
