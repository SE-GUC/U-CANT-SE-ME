import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import './App.css';

import MyCompanies from './components/GetMyCompanies/MyCompanies';
import Cases from './components/Cases';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Header />
        <Route exact path="/" render={props => (
          <React.Fragment>
            <h1>Home</h1>
          </React.Fragment>
        )} />
        <Route path="/MyCompanies" component={MyCompanies}/>
        <Route path="/GetAllCases" component={Cases}/>
        </div>
      </Router>
    );
  }
}
export default App;
