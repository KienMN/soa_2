import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    if (localStorage.getItem("username") === null) {
			window.location.href = "http://127.0.0.1:8088/login"
		} else {
      window.location.href = "http://127.0.0.1:8088/dashboard"
    }
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;