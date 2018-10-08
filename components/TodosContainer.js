import React, {Component} from 'react';
import {
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
    //txt oppdaterer seg ikke når det kun er et element igjen? elleeeer
    console.log(txt);
    this.setState ({
      todos: this.state.todos.filter(todo => todo !== txt)
    });
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
