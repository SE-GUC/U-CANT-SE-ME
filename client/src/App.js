import React, { Component } from 'react';
import './App.css';
import Comments from './components/Comments';
import Header from './components/layout/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Comments />
      </div>
    );
  }
}

export default App;
