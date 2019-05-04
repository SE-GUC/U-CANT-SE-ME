import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MyCompanies from "./components/GetMyCompanies/MyCompanies";
import InvestorRegister from "./components/InvestorRegister";
import ViewMyFees from "./components/ViewMyFees/ViewMyFees";
import RegisterLawyer from "./components/RegisterLawyer";
import RegisterReviewer from "./components/RegisterReviewer";
import ElectronicJournals from "./components/ElectronicJournals";
import Login from "./components/login/Login";
import LawyerViewCase from "./components/caseComponents/LawyerViewCase";
import ReviewerViewCase from "./components/caseComponents/ReviewerViewCase";
import ReviewerViewTasks from "./components/caseComponents/ReviewerViewTasks";
import LawyerViewTasks from "./components/caseComponents/LawyerViewTasks";
import Forgot from "./components/forgotAndReset/forgot";
import Reset from "./components/forgotAndReset/reset";
import InvestorProfile from "./components/InvestorProfile";
import LawyerProfile from "./components/LawyerProfile";
import ReviewerProfile from "./components/ReviewerProfile";
import updateInvestorProfile from "./components/updateInvestorProfile";
import CreateFormTemplate from "./components/CreateFormTemplate/CreateFormTemplate";
import CasesContainer from "./components/dCaseComponents/CasesContainer";
import setAuthToken from "./helpers/setAuthToken";
import InvestorDashBoard from "./components/DashBoard/InvestorDashBoard";
import LawyerDashBoard from "./components/DashBoard/LawyerDashBoard";
import AdminDashBoard from "./components/DashBoard/AdminDashBoard";
import ReviewerDashBoard from "./components/DashBoard/ReviewerDashBoard";
import heroPage from "./components/HomePage";
import fillForm from "./components/dCaseComponents/FillForm";
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route exact path="/" component={heroPage} />
            <Route path="/Login" component={Login} />
            <Route path="/MyCompanies" component={MyCompanies} />
            <Route path="/InvestorRegister" component={InvestorRegister} />
            <Route path="/ViewMyFees" component={ViewMyFees} />
            <Route path="/RegisterLawyer" component={RegisterLawyer} />
            <Route path="/RegisterReviewer" component={RegisterReviewer} />
            <Route path="/ElectronicJournals" component={ElectronicJournals} />
            <Route path="/LawyerViewCase" component={LawyerViewCase} />
            <Route path="/ReviewerViewCase" component={ReviewerViewCase} />
            <Route path="/ReviewerViewTasks" component={ReviewerViewTasks} />
            <Route path="/LawyerViewTasks" component={LawyerViewTasks} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/:type/reset/:token" component={Reset} />
            <Route path="/profile" component={InvestorProfile} />
            <Route
              path="/internalPortal/lawyer/profile"
              component={LawyerProfile}
            />
            <Route
              path="/internalPortal/reviewer/profile"
              component={ReviewerProfile}
            />
            <Route
              path="/updateInvestorProfile"
              component={updateInvestorProfile}
            />
            <Route path="/createFormTemplate" component={CreateFormTemplate} />
            <Route path="/CasesContainer" component={CasesContainer} />
            <Route path="/investorDashboard" component={InvestorDashBoard} />
            <Route path="/lawyerDashboard" component={LawyerDashBoard} />
            <Route path="/reviewerDashboard" component={ReviewerDashBoard} />
            <Route path="/adminDashboard" component={AdminDashBoard} />
            <Route path="/FillFormS" component={fillForm} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
