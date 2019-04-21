import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Comments from './components/ViewComments/Comments'
import TrackMyCompany from './components/TrackMyCompany'
import MyCompanies from './components/GetMyCompanies/MyCompanies'
import Cases from './components/caseComponents/Cases'
import CasesSummary from './components/caseComponents/CasesSummary'
import CaseSwitch from './components/caseComponents/CaseSwitch'
import InvestorRegister from './components/InvestorRegister'
import ViewMyFees from './components/ViewMyFees/ViewMyFees'
import RegisterLawyer from './components/RegisterLawyer'
import RegisterReviewer from './components/RegisterReviewer'
import LawyerFillForm from './components/LawyerFillForm/LawyerFillForm'
import InvestorFillForm from'./components/InvestorFillForm/InvestorFillForm'
import lawyerUpdateCase from './components/lawyerUpdateCase'
import ElectronicJournals from './components/ElectronicJournals'
import Login from './components/login/Login'
import LastLawyer from './components/LastLawyer'
import LawyerViewCase from './components/caseComponents/LawyerViewCase'
import ReviewerViewCase from './components/caseComponents/ReviewerViewCase'
import addComment from './components/AddComment'
import LawyerViewAllCases from './components/caseComponents/LawyerViewAllCases'
import ReviewerViewAllCases from './components/caseComponents/ReviewerViewAllCases'
import AdminViewAllCases from './components/caseComponents/AdminViewAllCases'
import LawyerGetCasesSorted from './components/LawyerGetCasesSorted/LawyerGetCasesSorted'
import ReviewerGetCasesSorted from './components/ReviewerGetCasesSorted/ReviewerGetCasesSorted'
import InvestorUpdateCase from './components/InvestorUpdateCase'
import ReviewerViewTasks from './components/caseComponents/ReviewerViewTasks'
import LawyerViewTasks from './components/caseComponents/LawyerViewTasks'
import Forgot from './components/forgotAndReset/forgot'
import Reset from './components/forgotAndReset/reset'
import InvestorProfile from './components/InvestorProfile'
import LawyerProfile from './components/LawyerProfile'
import ReviewerProfile from './components/ReviewerProfile'
import AdminProfile from './components/AdminProfile'
import updateInvestorProfile from './components/updateInvestorProfile'
import CreateFormTemplate from './components/CreateFormTemplate/CreateFormTemplate'
import setAuthToken from './helpers/setAuthToken'
import homePage from './components/HomePage';
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
}
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        {/* <NavBarBlue/> */}
        <Route exact path="/" render={props => (
          <React.Fragment>
            <h1>Home</h1>
          </React.Fragment>
        )} />
                <Route path="/myHomePage" component={homePage}/>
        <Route path="/Login" component={Login}/>
        <Route path="/TrackMyCompany" component={TrackMyCompany}/>
        <Route path="/viewComments" component={Comments}/>
        <Route path="/MyCompanies" component={MyCompanies}/>
        <Route path="/GetAllCases" component={Cases}/>
        <Route path="/CasesSummary" component={CasesSummary}/>
        <Route path="/InvestorRegister" component={InvestorRegister}/>
        <Route path="/ViewMyFees" component={ViewMyFees}/>
        <Route path="/RegisterLawyer" component={RegisterLawyer}/>
        <Route path="/RegisterReviewer" component={RegisterReviewer}/>
        <Route path="/LawyerFillForm" component={LawyerFillForm}/>
        <Route path="/InvestorFillForm" component={InvestorFillForm}/>
        <Route path="/lawyerUpdateCase" component={lawyerUpdateCase}/>
        <Route path="/addComment" component={addComment}/>
        <Route path="/ElectronicJournals" component={ElectronicJournals}/>
        <Route path="/LastLawyer" component={LastLawyer}/>
        <Route path="/LawyerViewCase" component={LawyerViewCase}/>
        <Route path="/ReviewerViewCase" component={ReviewerViewCase}/>
        <Route path="/InvestorUpdateCase" component={InvestorUpdateCase}/>
        <Route path="/CaseSwitch" component={CaseSwitch}/>
        <Route path="/LawyerViewAllCases" component={LawyerViewAllCases}/>
        <Route path="/ReviewerViewAllCases" component={ReviewerViewAllCases}/>
        <Route path="/AdminViewAllCases" component={AdminViewAllCases}/>
        <Route path="/LawyerGetCasesSorted" component={LawyerGetCasesSorted}/>
        <Route path="/ReviewerGetCasesSorted" component={ReviewerGetCasesSorted}/>
        <Route path="/ReviewerViewTasks" component={ReviewerViewTasks}/>
        <Route path="/LawyerViewTasks" component={LawyerViewTasks}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/:type/reset/:token" component={Reset}/>
        <Route path="/profile" component={InvestorProfile}/>
        <Route path="/internalPortal/lawyer/profile" component={LawyerProfile}/>
        <Route path="/internalPortal/reviewer/profile" component={ReviewerProfile}/>
        <Route path="/internalPortal/admin/profile" component={AdminProfile}/>
        <Route path="/updateInvestorProfile" component={updateInvestorProfile}/>
        <Route path="/createFormTemplate" component={CreateFormTemplate}/>
        </div>
      </Router>
    )
  }
}
export default App
