import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import LoginReviewer from './components/login/Login_Reviewer';
import './App.css';

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
        <Route path="/LoginReviewer" component={LoginReviewer}/>
        </div>
      </Router>
    );
  }
}
export default App;
