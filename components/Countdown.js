import React, { Component } from 'react';

import {Text} from 'react-native';

export class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endDate : new Date(new Date().getTime() + this.props.time*60*1000),
      min: 0,
      sec: 0,
      centiSec : 0,
      finished : false,
    }
  }

  handleFinished = () => {
    this.props.onWorkFinished(this.props.type)
  }

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
    this.interval = setInterval(() => {
      let minLeft = this.addZero(Math.floor((this.state.endDate - new Date())/1000/60)); 
      let secLeft = this.addZero(Math.floor((this.state.endDate - new Date() - minLeft*60*1000)/1000));
      let centiSecLeft = Math.floor((this.state.endDate - new Date() - minLeft *1000*60 - secLeft*1000))


    if (minLeft < 1 && secLeft < 1) {
      centiSecLeft = "000"
      this.handleFinished()
      clearInterval(this.interval);
      
    }

      this.setState ({min: minLeft})
      this.setState ({sec: secLeft})
      this.setState ({centiSec : centiSecLeft})
    }, 1);
  }


  render() {


    return (
        <Text> {this.state.min} : {this.state.sec} : {this.state.centiSec}</Text>
    )
  }
}
