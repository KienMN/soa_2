import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import withAuth from './withAuth'
import AuthService from './AuthService'
const Auth = new AuthService();

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