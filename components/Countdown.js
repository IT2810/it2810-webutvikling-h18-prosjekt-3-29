import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native';

export default class Countdown extends Component {
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

  //Tells PomodoroScreen that the countdown is finished and what type of countdown is running(work/pause)
  handleFinished = () => {
    this.props.onWorkFinished(this.props.type)
  }

  //Sends progress in percentage to PomodoroScreen, to be usen in ProgressCircle
  handleProgress = (prog) => {
   this.props.onProgress(prog)
  }

  //String formatting
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
    //Sets initial start value
    if (this.props.type == "work" || this.props.type == "idle") {
      this.setState({min: "25"})
    }
    else if (this.props.type == "pause") {
      this.setState({min: "05"})
    }

    this.setState ({sec: "00"})
    this.setState({startTime : new Date()})

    //Refreshes animation progress every 50 second (it makes it smooth)
    if (this.props.type != "idle") {
      this.interval = setInterval(() => {
        let now = new Date() 
        let minLeft = this.addZero(Math.floor((this.state.endDate - now)/1000/60)); 
        let secLeft = this.addZero(Math.floor((this.state.endDate - now - minLeft*60*1000)/1000)+1);
      
        if (secLeft == 60) {
          secLeft = this.addZero(0)
          minLeft = this.addZero(this.state.min)
        }

        let progress = (now - this.state.startTime) / (this.state.endDate-this.state.startTime) * 100
        this.handleProgress(progress)
        this.setState ({min: minLeft})
        this.setState ({sec: secLeft})

        //Countdown is finished, tells PomodoroScreen
        if (this.state.endDate - now < 10) {
          this.handleFinished()
          clearInterval(this.interval);  
        }
      }, 20);
    }
  }

  render() {
    return (
        <Text style={{fontSize : 30, color : this.props.textColor}}> {this.state.min} : {this.state.sec} </Text>
    )
  }
}
