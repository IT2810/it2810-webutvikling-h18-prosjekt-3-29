import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TodosContainer from '../components/TodosContainer';

export default class TodoScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.todoContainer}>
            <Text style={styles.header}>Todo</Text>
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
