import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import './App.css';
import Comments from './components/ViewComments/Comments'


import TrackMyCompany from './components/TrackMyCompany';
import MyCompanies from './components/GetMyCompanies/MyCompanies';
import ViewMyFees from './components/ViewMyFees/ViewMyFees';
import RegisterLawyer from './components/RegisterLawyer';
import RegisterReviewer from './components/RegisterReviewer';

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


        <Route path="/TrackMyCompany" component={TrackMyCompany}/>

        <Route path="/viewComments" component={Comments}/>

        <Route path="/MyCompanies" component={MyCompanies}/>

        <Route path="/ViewMyFees" component={ViewMyFees}/>

        <Route path="/RegisterLawyer" component={RegisterLawyer}/>

        <Route path="/RegisterReviewer" component={RegisterReviewer}/>

        </div>
      </Router>
    );
  }
}
export default App;
