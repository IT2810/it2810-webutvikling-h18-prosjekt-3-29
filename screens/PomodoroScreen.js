import React from 'react';
import { View, ScrollView, StyleSheet, Button, Text, Alert, AsyncStorage, Platform,TouchableHighlight,TouchableOpacity } from 'react-native';
import Countdown from  '../components/Countdown';
import ProgressCircle from 'react-native-progress-circle'
import { Icon } from 'expo';

export default class PomodoroScreen extends React.Component {
  
  state = {
    //Satt til kort varighet for demonstrasjonens skyld, endre til 25 og 5 for riktig.
    workTime : 0.04166,
    pauseTime : 0.008333,

    finishedPomodoros : '',
    startWork : false,
    startPause : false,
    countDownProgress : 0,
    backgroundColor : "#fff",
    text : '',
    textColor : '#4b4b4b',
    countdownSettings : [0, 'idle', '25'],
  }

  static navigationOptions = {
    title: 'Pomodoro',
  };

  updateStates = (type) => {
    this.setState ({
    countDownProgress : 0,
      })
    
    if (type == "idle") {
      this.setState ({
        backgroundColor : '#fff',
        textColor : '#4b4b4b',
        text : '',
        startWork : false,
        startPause : false,
        countdownSettings : [0, 'idle', '25']
      })
    } else if (type == "work") {
      this.setState({
        backgroundColor : '#fc5849',
        textColor : '#fff',
        text : 'Study',
        startWork : true,
        countdownSettings : [1, 'work', this.state.workTime]
      })
    } else if (type == 'pause') {
      this.setState ({
        backgroundColor : '#01FF70',
        textColor : '#fff',
        text : 'Pause',
        startPause : true,
        countdownSettings : [2, 'pause', this.state.pauseTime]
        })
    }
  }

  //Skrur av og på Pomodoro og setter relevante states
  toggleButton = () => {
    if (this.state.startWork || this.state.startPause ) {
      this.updateStates("idle");
    } else {
      this.updateStates("work")
    }
  } 

  //Blir kjørt hvis Countdown sier i fra at nedtellingen er ferdig
  handleFinished = (type) => {
    if (type == "work") {
      this.updateStates("pause")
    } else if (type == "pause") {
      this.updateStates("idle")
      Alert.alert("Pomodoro finished, gz")
      this._addFinishedPomodoroToAsync();
    }
  }

  //Tar i mot progress fra countdown 
  handleProgress = (progVal) => {
    this.setState({ countDownProgress : progVal})
  }

  componentDidMount() {
    this._getFinishedPomodorosFromAsync()
  }

  showInfo = () => {
    Alert.alert("Pomodoro", "The pomodoro technique is a time management method based on 25-minute stretches of focused work broken by 5 minute breaks. ")
  }
  
  //Pomodoros i async += 1
  _addFinishedPomodoroToAsync = async () => {
    let counter = String(this.state.finishedPomodoros+1)
    try {
      await AsyncStorage.setItem('pomodoroCounter', counter);
      this.setState({finishedPomodoros : parseInt(counter)})
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  //Henter fullførte pomodoros fra async
  _getFinishedPomodorosFromAsync = async () => {
    try {
      let donePomodoros = await AsyncStorage.getItem('pomodoroCounter');
     if (donePomodoros == null) {
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

  render() {
    return (
      <ScrollView style={{backgroundColor : this.state.backgroundColor}}>
        <View style={styles.container}>

        <TouchableHighlight style={ styles.informationIcon } >
          <Icon.Ionicons
              color = {this.state.textColor}
              name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle'}     
              size={40}
              onPress = {() => this.showInfo()}
          />
          </TouchableHighlight>

          <Text style={styles.header}> {this.state.text}  </Text> 
          
          <ProgressCircle
            percent={this.state.countDownProgress}
            radius={150}
            borderWidth={5}
            color="#fff"
            shadowColor="#4b4b4b"
            bgColor={this.state.backgroundColor}
          >
            <Countdown 
              key={this.state.countdownSettings[0]} 
              type={this.state.countdownSettings[1]} 
              time={this.state.countdownSettings[2]} 
              textColor = {this.state.textColor} 
              onWorkFinished ={this.handleFinished} 
              onProgress={this.handleProgress}
            />
          </ProgressCircle>

          {Platform.OS === "ios" ? null : <Text>{"\n"}</Text>}
          <Button title={this.state.startWork ? "stop" : "start" } onPress={this.toggleButton} />
          <Text style={{ color : this.state.textColor,}}>{"\n\n"} Finished Pomodoros : {this.state.finishedPomodoros} </Text> 
        
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  informationIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  header: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
  },
});
