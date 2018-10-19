import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import TodosContainer from '../components/TodosContainer';

export default class TodoScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.todoContainer}>
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
    backgroundColor: '#fcfcfc',
  },
  contentContainer: {
    paddingTop: 10,
  },
  todoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
