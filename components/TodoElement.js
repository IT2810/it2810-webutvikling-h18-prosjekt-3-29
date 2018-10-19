import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CheckBox, ListItem, Body } from 'native-base';
import Dialog from "react-native-dialog";

export default class TodoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      checked: false,
      dialogVisible: false
    }
  }

  checkBoxChecked = () => {
    this.props.removeTodoElement(this.props.text);
    this.setState({ dialogVisible: false });
  }

  /*function for handling popup of confirm-dialog - gets called when a checkbox is checked*/
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  /*function for handling popup - hides popup when user selects "cancel"*/
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    return (
      <View>
        <View>
          <ListItem>
            <CheckBox style={styles.checkBox}
              center
              title='Todo'
              checked={this.state.checked}
              onPress={this.showDialog}
            />
            <Body>
              <Text  style={styles.checkBoxText}>{this.props.text}</Text>
            </Body>
          </ListItem>
        </View>
        
        <View>
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Finish todo</Dialog.Title>
            <Dialog.Description>
            Do you want to finish this todo?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            <Dialog.Button label="Finish" onPress={this.checkBoxChecked} />
          </Dialog.Container>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkBox: {
    marginRight: 17,
    borderColor: 'gray',
    height: 25,
    width: 25,
    backgroundColor: '#fefefe',
  },
  checkBoxText: {
    fontSize: 17,
  }
});
