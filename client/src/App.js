import React, { Component } from 'react';
import './App.css';
import TrackMyCompany from './components/TrackMyCompany';
//import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
  //     <Router>
  //   <Route path="/" component={TrackMyCompany}></Route>
  // </Router>
      <div className="App">
        <header className="App-header">
         <p>Tracking Company state</p>
        <TrackMyCompany/>
        </header>
      </div>
      
    );
  }
}

export default App;
