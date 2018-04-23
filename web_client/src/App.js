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
    return (
      <div className="App">
        <Navigation />
        <LoginForm />
      </div>
    );
  }
}

export default App;