import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Header from './components/Header';
import Main from './components/Main';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cpuLoad: {},
      endpoint: "http://127.0.0.1:4001",
      cpuLoadData: [],
      lineColors: {}

    };

  }

  componentDidMount() {
    const { endpoint } = this.state;

    // configure socket on client side
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {

      if (this.state.cpuLoadData === undefined){
        this.setState({ cpuLoadData: this.state.cpuLoad});
      }
      else if (this.state.cpuLoadData.length <= 4){
        let array = this.state.cpuLoadData;
        array.push(this.state.cpuLoad);
        this.setState({ cpuLoadData: array });
      } 
      else {
        let array = this.state.cpuLoadData;
        array.shift();
        array.push(this.state.cpuLoad);
        this.setState({ cpuLoadData: array });
      }

      this.setState({cpuLoad: data.cpuLoad});
      
      this.getColors(Object.keys(this.state.cpuLoad).length-2);
      
    })

  }

  //get colors for each line on graph
  getColors(num){
    let count = this.state.lineColors.length

    if (count >= num || count < 0) {
      return;
    } else {
      this.generateRandomColors(num);
    }
  }

  //randomly generate colors for each line on graph
  generateRandomColors(num){

    let letters = '0123456789ABCDEF';
    let color = '#';
    let arrOfColors = [];

    for (var i = 0; i <= num; i++){
      for (var j = 0; j < 6; j++){
        color += letters[Math.floor(Math.random() * 16)];
      }

      arrOfColors.push(color);
      color = '#';
    }

    this.setState({lineColors: arrOfColors});
  }

  render() {

    const { cpuLoad, 
            cpuLoadData,
            lineColors
          } = this.state;
          

    return (
        <div className="app">
          <Header title={"Real Time System Load"} url="https://github.com/eyao06/RealtimeSystemLoad"/>
          <Main cpuLoadData={cpuLoadData} cpuLoad={cpuLoad} lineColors={lineColors} url="https://github.com/eyao06/RealtimeSystemLoad"/>
        </div>
    );
  }
}

export default App;