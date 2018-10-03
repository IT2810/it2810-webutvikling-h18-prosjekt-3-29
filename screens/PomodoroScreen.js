import React from 'react';
import { View, StyleSheet, Button, Text, Alert, AsyncStorage} from 'react-native';
import { Countdown } from  '../components/Countdown';
import ProgressCircle from 'react-native-progress-circle'

export default class PomodoroScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finishedPomodoros : '',
      startWork : false,
      startPause : false,
      workProgress : 0,
      pauseProgress : 0,
    }
  }

  static navigationOptions = {
    title: 'Pomodoro',
  };

  componentDidMount() {
    this._getFinishedPomodorosFromAsync()
  }

  handleFinished = (type) => {
    if (type == "work") {
      this.setState({startPause : true})
      this.setState({workProgress : 0})
    } else if (type == "pause") {
      this.setState({startPause : false})
      this.setState({startWork : false})
      Alert.alert("Pomodoro finished, gz")
      this._addFinishedPomodoroToAsync();
      this.setState({pauseProgress : 0})
    }
  }

  handleProgress = (progVal, type) => {
    if (type == "work") {
      this.setState({workProgress : progVal})
    } else if (type == "pause") {
      this.setState({pauseProgress : progVal})
    } 
  }

  toggleButton = () => {
    this.setState({ startWork : !this.state.startWork})
    if (this.state.startPause) {
      this.setState({startPause : false})
    }
    this.setState({workProgress : 0})
    this.setState({pauseProgress : 0})

  }

  whereWeAt() {
    if (this.state.startWork == false && this.state.startPause == false) { return "idle" } 
    else if (this.state.startWork == true && this.state.startPause == false) { return "work" } 
    else if (this.state.startPause == true) { return "pause" }
  }

  whichTimer() {
    if (this.whereWeAt() == "idle") {
      return (<Text style={styles.countdownIdle}> 25 : 00 </Text>)
    } else if (this.whereWeAt() == "work") {
      return (<Countdown key="1" type="work" time="0.5" onWorkFinished ={this.handleFinished} onProgress={this.handleProgress}/>)
    } else if (this.whereWeAt() == "pause") {
      return (<Countdown key="2" type="pause" time="0.25" onWorkFinished ={this.handleFinished} onProgress={this.handleProgress}/>)
    }
  }

  idleOrNot() {
    return (this.whereWeAt() == "idle")
  }

  whichBackgroundColor() {
    if (this.whereWeAt() == "idle") {
      return ('#fff')
    } else if (this.whereWeAt() == "work") {
      return ('#FF4136')
    } else if (this.whereWeAt() == "pause") {
      return ('#01FF70')
    }
  }



  render() {
    return (
        <View style={[styles.container, {backgroundColor : this.whichBackgroundColor()}]}>

          <Text style={this.idleOrNot() ? styles.idleHeader : styles.header}>  {this.whereWeAt()}  </Text>

          <ProgressCircle style={styles.progressCircle}
              percent={this.state.startPause ? this.state.pauseProgress : this.state.workProgress}
              radius={150}
              borderWidth={5}
              color="#ffffff"
              shadowColor="#4b4b4b"
              bgColor={this.whichBackgroundColor()}
          >

            {this.whichTimer()}

          </ProgressCircle>

            <Text>{"\n"}</Text>

            
            <Button title={this.state.startWork ? "stop" : "start" } onPress={this.toggleButton}/>
            
            <Text>{"\n\n"} Finished Pomodoros : {this.state.finishedPomodoros} </Text> 
        </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  workColor: {
    backgroundColor: '#FF4136',
  },
  pauseColor: {
    backgroundColor: '#01FF70',
  },
  idleHeader: {
    color: '#4b4b4b',
    fontSize: 30,
  },
  header: {
    color: 'white',
    fontSize: 30,
  },
  countdownIdle: {
    color: '#4b4b4b',
    fontSize: 30,
  },
});
