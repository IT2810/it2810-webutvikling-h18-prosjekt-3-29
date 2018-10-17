import React from 'react';
import { View, ScrollView, StyleSheet, Button, Text, Alert, AsyncStorage, Platform,TouchableHighlight,TouchableOpacity } from 'react-native';
import Countdown from  '../components/Countdown';
import ProgressCircle from 'react-native-progress-circle'
import { Icon } from 'expo';



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

  showInfo = () => {
    Alert.alert("Pomodoro", "The pomodoro technique is a time management method based on 25-minute stretches of focused work broken by 5 minute breaks. ")
  }

  //Blir kjørt hvis Countdown sier i fra at nedtellingen er ferdig
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

  //Tar i mot progress fra countdown 
  handleProgress = (progVal, type) => {
    if (type == "work") {
      this.setState({workProgress : progVal})
    } else if (type == "pause") {
      this.setState({pauseProgress : progVal})
    } 
  }

  //Skrur av og på Pomodoro og setter relevante states
  toggleButton = () => {
    this.setState({ startWork : !this.state.startWork})
    if (this.state.startPause) {
      this.setState({startPause : false})
    }
    this.setState({workProgress : 0})
    this.setState({pauseProgress : 0})
  }

  //Hvilken status Pomodoro er på akkurat nå 
  whereWeAt() {
    if (this.state.startWork == false && this.state.startPause == false) { return "idle" } 
    else if (this.state.startWork == true && this.state.startPause == false) { return "work" } 
    else if (this.state.startPause == true) { return "pause" }
  }

  //Hvilken timer som skal vises, jobb-timer (25 min) eller pause-timer (5 min) 
  //Satt til 25 sekunder og 5 sekunders for demonstrasjon, endre time til 25 og 5 for ekte pomodoro.
  whichTimer() {
    if (this.whereWeAt() == "idle") {
      return (<Text style={styles.countdownIdle}> 25 : 00 </Text>)
    } else if (this.whereWeAt() == "work") {
      return (<Countdown key="1" type="work" time="0.4166" onWorkFinished ={this.handleFinished} onProgress={this.handleProgress}/>)
    } else if (this.whereWeAt() == "pause") {
      return (<Countdown key="2" type="pause" time="0.08333" onWorkFinished ={this.handleFinished} onProgress={this.handleProgress}/>)
    }
  }

  //Bestemmer bakgrunnsfarge etter pomodoro-status
  whichBackgroundColor() {
    if (this.whereWeAt() == "idle") {
      return ('#f2f2f2')
    } else if (this.whereWeAt() == "work") {
      return ('#fc5849')
    } else if (this.whereWeAt() == "pause") {
      return ('#01FF70')
    }
  }
 /*          <Button title={this.state.startWork ? "stop" : "start" } onPress={this.toggleButton} />
*/

  //Hvilken tekst som skal vises
  whichText() {
    if (this.whereWeAt() == "idle") {
      return ('')
    } else if (this.whereWeAt() == "work") {
      return ('Study')
    } else if (this.whereWeAt() == "pause") {
      return ('Pause')
    }
  }

  render() {
    return (
      <ScrollView style={{backgroundColor : this.whichBackgroundColor()}}>
        <View style={[styles.container, {backgroundColor : this.whichBackgroundColor()}]}>
        <TouchableHighlight style={ styles.informationIcon } >
          <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle'}     
              size={40}
              onPress = {() => this.showInfo()}
          />
          </TouchableHighlight>
          <Text style={this.whereWeAt() == "idle" ? styles.idleHeader : styles.header}>  {this.whichText()}  </Text> 
          
          <ProgressCircle
              percent={this.state.startPause ? this.state.pauseProgress : this.state.workProgress}
              radius={150}
              borderWidth={5}
              color="#ffffff"
              shadowColor="#4b4b4b"
              bgColor={this.whichBackgroundColor()}>
          {this.whichTimer()}
          </ProgressCircle>
          {Platform.OS === "ios" ? null : <Text>{"\n"}</Text>}
          <TouchableOpacity
            style={[styles.button, {backgroundColor : this.whereWeAt() == "idle" ? '#fc5849' : '#fff'}]}
            onPress={this.toggleButton}>
            <Text> {this.state.startWork ? "stop" : "start" } </Text>
          </TouchableOpacity>
          <Text style={this.whereWeAt() == "idle" ? styles.idleText : styles.text }>{"\n\n"} Finished Pomodoros : {this.state.finishedPomodoros} </Text> 
        </View>
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
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  scrollContainer: {
    backgroundColor: '#fff',
  },
  informationIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
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
    marginBottom: 10,
  },
  header: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
  },
  idleText: {
    color:'#4b4b4b',
  },
  text: {
    color: 'white',
  },
  countdownIdle: {
    color: '#4b4b4b',
    fontSize: 30,
  },
  progressCircle: {
    marginBottom: 50, 
  },
  button: {
    marginTop: 10,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    borderRadius:100,
    marginBottom: -15,
  }
});
