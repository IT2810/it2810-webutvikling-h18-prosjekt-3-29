import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native';

export class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime : 0,
      endDate : new Date(new Date().getTime() + this.props.time*60*1000),
      min: 0,
      sec: 0,
      progress : 0,
    }
  }

  //Sier i fra til PomodoroScreen at nedtellingen er ferdig, og hvilken (work/pause)
  handleFinished = () => {
    this.props.onWorkFinished(this.props.type)
  }

  //sender progress i prosent til PomodoroScreen, til bruk i ProgressCircle
  handleProgress = (prog) => {
    this.props.onProgress(prog, this.props.type)
  }

  //legger til en null foran tall under 10
  addZero(tall) {
    tall = String(tall);
    while (tall.length < 2) {
      tall = '0' + tall;
    }
    return tall;
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  componentDidMount() {

    //Setter startverdier med en gang, siden state bruker litt lang tid
    if (this.props.type == "work") {
      this.setState({min: "25"})
    }
    else if (this.props.type == "pause") {
      this.setState({min: "05"})
    }
    this.setState ({sec: "00"})

    this.setState({startTime : new Date()})

    //Oppdaterer nedtelling-verdier hvert 10. millisekund
    this.interval = setInterval(() => {
      let now = new Date() 
      let minLeft = this.addZero(Math.floor((this.state.endDate - now)/1000/60)); 
      let secLeft = this.addZero(Math.floor((this.state.endDate - now - minLeft*60*1000)/1000));
      let progress = (now - this.state.startTime) / (this.state.endDate-this.state.startTime) * 100
      this.handleProgress(progress)

      this.setState ({min: minLeft})
      this.setState ({sec: secLeft})

      //Nedtellingen er ferdig, sier i fra til PomodoroScreen og avlsutter intervallet
      if (this.state.endDate - now < 10) {
        this.handleFinished()
        clearInterval(this.interval);  
      }
    }, 10);
  }

  render() {
    return (
        <Text style={styles.countdown}> {this.state.min} : {this.state.sec} </Text>
    )
  }
}

const styles = StyleSheet.create({
  countdown: {
    color: 'white',
    fontSize: 30,
  },
});
