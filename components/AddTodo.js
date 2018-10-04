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

    //bruker addNewTodo i TodosContainer for å legge til ny sjekkboks med teksten som er i textinput, som blir lagret i state
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

        //BUTTON
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
    position: 'fixed',
    left: 0,
    alignItems: 'stretch',
  },
  buttonText: {
    margin: 2,
  }
});
