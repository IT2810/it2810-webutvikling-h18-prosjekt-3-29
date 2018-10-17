import React from 'react';
import { View, StyleSheet, Text, AsyncStorage, Image, ScrollView} from 'react-native';
import { NavigationEvents } from "react-navigation";
import * as Progress from 'react-native-progress';

const pomodoroWeight = 100
const focusWeight = 20
const todoWeight = 30

export default class AchievementsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xp : 0,
      level : 0,
      percent: 0,
    }
  }

  static navigationOptions = {
    title: 'Achievements',
   };

  componentDidMount() {
    this._getXpAsync();
  }

  xpConverter = (donePomodoros, focusPoints, finishedTodos) => {
    return donePomodoros*pomodoroWeight + focusPoints*focusWeight + finishedTodos*todoWeight
  }

  /*function that calculates users XP with values from async*/
  _getXpAsync = async () => {
    try {

      let donePomodoros = await AsyncStorage.getItem('pomodoroCounter');
      let focusPoints = await AsyncStorage.getItem('focusPoints')
      let finishedTodos = await AsyncStorage.getItem('finishedTodosCounter')

      if (donePomodoros == null) { donePomodoros = 0; }
      else                       { donePomodros = parseInt(donePomodoros) }
      if (focusPoints == null)   { focusPoints = 0; }
      else                       { focusPoints = parseInt(focusPoints) }
      if (finishedTodos == null) { finishedTodos = 0;}
      else                       { finishedTodos = parseInt(finishedTodos) }

      let xpPoints = this.xpConverter(donePomodoros, focusPoints, finishedTodos)

      this.setState({xp : xpPoints })
      this.setState({level : Math.floor(xpPoints/1000)+1})
      this.setState({percent : xpPoints%1000 / 1000})

    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  render() {
    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image style={styles.img} source={require('../assets/images/first.png')}/>
          <View style={styles.textContainer}>
            <Text style={styles.text}><Text style={styles.boldText}> XP:</Text> {this.state.xp}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Level:</Text> {this.state.level}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Percent:</Text> {Math.floor(this.state.percent * 100)}%</Text>
          </View>
          <Progress.Bar style={styles.progressBar}
              progress={this.state.percent}
              animated={true}
              width={250}
              height={20}
              borderRadius={20}
          >
          </Progress.Bar>

          {/*Kjører hver gang denne taben er valgt*/}
          <NavigationEvents
          onWillFocus={payload => {
              this._getXpAsync()
          }}/>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 15,
      alignItems: 'center',
  },
  img: {
    marginBottom: 30,
    marginTop: 30,
    width: 170,
    height: 170
  },
  text: {
    marginBottom: 15,
    fontSize: 21,
    marginRight: 60,
    marginLeft: 60,
    textAlign: 'center'
  },
  progressBar: {
    marginTop: 95,
    backgroundColor: '#f7f9fc',
  },
  boldText: {
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: '#f2f2f2',
  }
});
