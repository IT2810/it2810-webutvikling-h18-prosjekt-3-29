import React from 'react';
import { ScrollView, StyleSheet, Button, Text, Alert, AsyncStorage} from 'react-native';
import { Countdown } from  '../components/Countdown';

export default class PomodoroScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finishedPomodoros : '',
      startWork : false,
      startPause : false,
    }
  }

  static navigationOptions = {
    title: 'Pomodoro',
  };

  componentDidMount() {
    this._getFinishedPomodorosFromAsync()
  }

  handleFinished = (finVal) => {
    if (finVal == "work") {
      this.setState({startPause : true})
    } else if (finVal == "pause") {
      this.setState({startPause : false})
      this.setState({startWork : false})
      Alert.alert("Pomodoro finished, gz")
      this._addFinishedPomodoroToAsync();
    }
  }

  toggleButton = () => {
    this.setState({ startWork : !this.state.startWork})
    if (this.state.startPause) {
      this.setState({startPause : false})
    }

  }

  render() {
    return (
        <ScrollView style={styles.container}>
            <Text> Work: </Text> {this.state.startWork ? <Countdown type="work" time="0.1" onWorkFinished ={this.handleFinished}/> : <Text> 25 : 00 : 000</Text>}
            <Text> Pause: </Text> {this.state.startPause ? <Countdown type="pause" time="0.05" onWorkFinished ={this.handleFinished}/> : <Text> 05 : 00 : 000</Text>}
            <Button title={this.state.startWork ? "stop" : "start" } onPress={this.toggleButton}/>
            
            <Text>{"\n\n\n\n"} Finished Pomodoros : {this.state.finishedPomodoros} </Text> 
        </ScrollView>
    );
  }






  //funksjoner for get og set av async-item

  _addFinishedPomodoroToAsync = async () => {

    let counter = String(this.state.finishedPomodoros + 1)

    try {
      await AsyncStorage.setItem('pomodoroCounter', counter);
      this.setState({finishedPomodoros : parseInt(counter)})
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
      
  }

  _getFinishedPomodorosFromAsync = async () => {
    console.log("async")
    try {
      let donePomodoros = await AsyncStorage.getItem('pomodoroCounter');
     if (donePomodoros == null) {
       console.log("fin: " + 0)
      this.setState({finishedPomodoros : 0})
     }
     else {
       donePomodoros = parseInt(donePomodoros)
       this.setState({finishedPomodoros : donePomodoros})
     }
   } catch (error) {
     // Error retrieving data
     console.log(error.message);
   }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
