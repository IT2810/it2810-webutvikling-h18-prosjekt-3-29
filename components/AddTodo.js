import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { Input, Button, Item } from 'native-base';

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
        <View>
          <Item rounded={true} style={styles.inputField}>
            <Input
              placeholder="Write your todo here.."
              onChangeText={(txt) => this.setState({text: txt})}
              value={this.state.text}
            />
            <Button rounded onPress={this.addNewTodo}
             style={styles.addSpecificTodoBtn}
           >
             <Text style={styles.buttonText}>Add!</Text>
           </Button>
          </Item>
        </View>
      <View>
     </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    width: 300,
  },
  addSpecificTodoBtn: {
    backgroundColor: '#ff7096',
    bottom: 0,
    height: 30,
    margin: 8,
  },
  addTodoContainer: {
    position: 'relative',
    left: 0,
    alignItems: 'stretch',
    marginTop: 30
  },
  buttonText: {
    margin: 2,
  }
});
