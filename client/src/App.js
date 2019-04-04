import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TrackMyCompany from './components/TrackMyCompany';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            hello yoyo
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        <TrackMyCompany/>
          </a>
        </header>
      </div>
    );
  }
}

export default App;
