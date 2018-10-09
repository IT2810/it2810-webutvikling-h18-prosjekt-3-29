import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TodosContainer from '../components/TodosContainer';

export default class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedTodos: ''
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.getNrFinishedTodosFromAsync();
  }

  /*function for SAVING nr of completed todos in async storage, this will be used to calculate the users XP*/
  addFinishedTodosToAsync = async () => {
    let counter = String(this.state.finishedTodos + 1);
    try {
      await AsyncStorage.setItem('finishedTodosCounter',counter);
      this.setState = ({finishedTodos: parseInt(counter)});
    } catch (error) {
      console.log(error);
    }
  }

  /*function for GETTING nr of completed todos in async storage*/
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


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.todoContainer}>
            <Text style={styles.header}>Todo</Text>
            <Text>{this.state.finishedTodos}</Text>
            <TodosContainer addFinishedTodosToAsync={this.addFinishedTodosToAsync}/>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  todoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 35,
  },
});
