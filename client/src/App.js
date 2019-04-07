import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import LoginInternalPortal from './components/login/Login_InternalPortal';
import './App.css';
import Comments from './components/ViewComments/Comments'


import TrackMyCompany from './components/TrackMyCompany';
import MyCompanies from './components/GetMyCompanies/MyCompanies';
import InvestorRegister from './components/InvestorRegister'
import ViewMyFees from './components/ViewMyFees/ViewMyFees';
import RegisterLawyer from './components/RegisterLawyer';
import RegisterReviewer from './components/RegisterReviewer';
import LawyerFillForm from './components/LawyerFillForm/LawyerFillForm';
import InvestorFillForm from'./components/InvestorFillForm/InvestorFillForm'

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
        <Route path="/LoginInternalPortal" component={LoginInternalPortal}/>

        <Route path="/TrackMyCompany" component={TrackMyCompany}/>

        <Route path="/viewComments" component={Comments}/>

        <Route path="/MyCompanies" component={MyCompanies}/>


        <Route path="/InvestorRegister" component={InvestorRegister}/>
          
        <Route path="/ViewMyFees" component={ViewMyFees}/>

        <Route path="/LawyerFillForm" component={LawyerFillForm}/>

        <Route path="/InvestorFillForm" component={InvestorFillForm}/>
        </div>
      </Router>
    );
  }
}
export default App;
