import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Fab,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';

export default class AddTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      value: ""
    }
  }

  addNewTodo = () => {
    if (this.state.text.length >= 1) {
      this.props.addNewTodo(this.state.text)
      this.setState({
        text: ""
      })
    }
  }

  render() {
    return (
      <View style={styles.addTodoContainer}>

        //TEXTINPUT
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(txt) => this.setState({text: txt})}
            value={this.state.text}
          />
        </View>

        //BUTTON
        <View>
          <TouchableOpacity onPress={this.addNewTodo}
           style={styles.addSpecificTodoBtn}
         >
           <Text>Add new Todo!</Text>
         </TouchableOpacity>
       </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1
  },
  addSpecificTodoBtn: {
    backgroundColor: '#ff7096',
    bottom: 0,
    height: 30,
  },
  addTodoContainer: {
    position: 'fixed',
    bottom: -130,
    left: 0,
    alignItems: 'stretch',
  }
});
