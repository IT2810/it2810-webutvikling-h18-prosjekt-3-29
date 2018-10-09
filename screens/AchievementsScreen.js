import React from 'react';
import { View, StyleSheet, Button, Text, Alert, AsyncStorage, Image} from 'react-native';
import { NavigationEvents } from "react-navigation";
import * as Progress from 'react-native-progress';





const pomodoroWeight = 100  
const focusWeight = 20


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

  
  
  xpConverter = (donePomodoros, focusPoints) => {
      return donePomodoros*pomodoroWeight + focusPoints*focusWeight
    }
    
    
    
    _getXpAsync = async () => {
        try {
            console.log("xp")
            let donePomodoros = await AsyncStorage.getItem('pomodoroCounter');
            let focusPoints = await AsyncStorage.getItem('focusPoints')
            
            if (donePomodoros == null) { donePomodoros = 0; } 
            else                       { donePomodros = parseInt(donePomodoros) }
            if (focusPoints == null)   { focusPoints = 0; }  
            else                       { focusPoints = parseInt(focusPoints) }
            
            let xpPoints = this.xpConverter(donePomodoros, focusPoints)
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
              <View style={styles.container}>
                  <Image source={require('../assets/images/achievements.png')}/>
                  <Text>XP: {this.state.xp}</Text>
                  <Text>Level : {this.state.level}</Text>
                  <Text>Percent: {Math.floor(this.state.percent * 100)}%</Text>
                  <Progress.Bar 
                      progress={this.state.percent}
                      animated={true}
                      width={250}
                      height={10}
                  >
                  </Progress.Bar>
                  
                  {/*Kjører hver gang denne taben er valgt*/}
                  <NavigationEvents
                  onWillFocus={payload => {
                      this._getXpAsync()
                  }}/>
    
              </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        alignItems: 'center'
    },
});
