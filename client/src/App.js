import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Header from './components/Header';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cpuLoad: {},
      endpoint: "http://127.0.0.1:4001",
      cpuLoadData: [],

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
      
    })

  }

  render() {

    const { cpuLoad, 
            cpuLoadData,
          } = this.state;
          

    return (
        <div className="app">
          <Header title={"Real Time System Load"} url="/"/>
        </div>
    );
  }
}

export default App;