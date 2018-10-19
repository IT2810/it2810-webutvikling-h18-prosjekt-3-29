import React, {Component} from 'react';
import AddTodo from './AddTodo';
import TodoElementsContainer from './TodoElementsContainer';
import {
  Alert,
  View,
  AsyncStorage,
  Image,
  StyleSheet,
  Text
} from 'react-native';

export default class TodosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      finishedTodos: '',
      showImg: false
    }
  }

  componentDidMount() {
    this.getUnfinishedTodosFromAsync();
  }

  componentDidUpdate() {
    this.addUnfinishedTodosToAsync();
  }

  //if todos are an empty list, show img-placeholder. If not, show todolist
  nrOfElementsInTodo = () => {
    if (this.state.todos.length == 0) {
      this.setState({
        showImg: true
      })
    } else {
      this.setState({
        showImg: false
      })
    }
  }

  //function for saving unfinished todos from async
  addUnfinishedTodosToAsync = async () => {
    let unfTodos = this.state.todos;
    try {
      await AsyncStorage.setItem('unfinishedTodos', JSON.stringify(unfTodos));
    } catch (error) {
      console.error(error);
    }
  }

  //function for getting unfinished todos from async
  getUnfinishedTodosFromAsync = async () => {
    try {
      let unfTodos = await AsyncStorage.getItem('unfinishedTodos');
      this.setState({todos: JSON.parse(unfTodos)}, () => {this.nrOfElementsInTodo()} );
    } catch (error) {
      console.error(error);
    }
  }

  //function for adding +1 on NR of completed todos in async storage
  addFinishedTodosToAsync = async () => {
    let counter = String(this.state.finishedTodos + 1);
    try {
      await AsyncStorage.setItem('finishedTodosCounter',counter);
      this.setState({finishedTodos: parseInt(counter)});
    } catch (error) {
      console.error(error);
    }
  }

  //function for getting NR of completed todos in async storage
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
      }, () => {
        this.nrOfElementsInTodo();
      })
    }
    else {
      Alert.alert("You already have this todo!");
    }
  }

  removeTodo = (txt) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo !== txt)
    }, () => {
      this.nrOfElementsInTodo();
    });
      this.addFinishedTodosToAsync();
  }

  render() {
    if (this.state.showImg) {
      content = 
      <View style={styles.imgTextPlaceholder}>
        <Image style={styles.img} source={require('../assets/images/planets.png')}/>
        <Text style={styles.textPlaceholder}>Yey! You have no todos!</Text>
      </View>;
    }
    if(!this.state.showImg) {
      content = 
      <View>
        <TodoElementsContainer todos={this.state.todos} removeTodo={this.removeTodo}/>
      </View>
    }
    return (
      <View>
        <AddTodo addNewTodo={this.addNewTodo} />
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 175,
    width: 175,
    marginTop: 120,
    opacity: 0.6
  },
  imgTextPlaceholder: {
    flex: 1,
    alignItems: 'center',
  },
  textPlaceholder: {
    marginTop: 20,
    opacity: 0.9
  }
});
