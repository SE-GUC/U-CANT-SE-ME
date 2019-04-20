import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import '../header.css'
import Comments from './ViewComments/Comments'
import TrackMyCompany from './TrackMyCompany';
import MyCompanies from './GetMyCompanies/MyCompanies'
import ViewMyFees from './ViewMyFees/ViewMyFees'
import InvestorFillForm from'./InvestorFillForm/InvestorFillForm'
import LastLawyer from './LastLawyer'
import InvestorUpdateCase from './InvestorUpdateCase'
import UpdateInvestorProfile from './updateInvestorProfile'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import parseJwt from '../helpers/decryptAuthToken';
export default class InvestorProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            trackMyCompanies: false,
            comments: false,
            myCompanies: false,
            viewMyFees: false,
            fillForm: false,
            updateCase: false,
            lastLawyer: false,
            updateProfile: false,
            home:0
        }
      }
  render() {
    if (this.state.home===0) return <div> </div>;
    if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <div>
        <header>
          <div class="container">
            <h1 class="logo"></h1>
              <nav>
                <ul>
                  <li><Button variant="primary" onClick={() => {
                    this.setState({updateProfile: false, lastLawyer: false, updateCase: false, fillForm: false, viewMyFees: false, myCompanies: false, trackMyCompanies: true})
                  }}>
                      Track my companies
                  </Button></li>
                  <li><Button variant="primary" onClick={() => {
                    this.setState({updateProfile: false, lastLawyer: false, updateCase: false, fillForm: false, viewMyFees: false, myCompanies: true, trackMyCompanies: false})
                  }}>
                      My Companies
                  </Button></li>
                  <li><Button variant="primary" onClick={() => {
                    this.setState({updateProfile: false, lastLawyer: false, updateCase: false, fillForm: false, viewMyFees: true, myCompanies: false, trackMyCompanies: false})
                  }}>
                      View My Fees
                  </Button></li>
                  <li><Button variant="primary" onClick={() => {
                    this.setState({updateProfile: false, lastLawyer: false, updateCase: false, fillForm: true, viewMyFees: false, myCompanies: false, trackMyCompanies: false})
                      }}>
                        Fill a form
                  </Button></li>
                  <li><Button variant="primary" onClick={() => {
                    this.setState({updateProfile: false, lastLawyer: false, updateCase: true, fillForm: false, viewMyFees: false, myCompanies: false, trackMyCompanies: false})
                  }}>
                      Update a case.
                  </Button></li>
                  <li><Button variant="primary" onClick={() => {
                    this.setState({updateProfile: false, lastLawyer: true, updateCase: false, fillForm: false, viewMyFees: false, myCompanies: false, trackMyCompanies: false})
                  }}>
                      View Last Lawyer
                  </Button></li>
                  <li><Button variant="primary" onClick={() => {
                    this.setState({updateProfile: true, lastLawyer: false, updateCase: false, fillForm: false, viewMyFees: false, myCompanies: false, trackMyCompanies: false})
                  }}>
                      Update Profile
                  </Button></li>
                </ul>
              </nav>
            </div>
          </header>
          <br />
          {
              this.state.trackMyCompanies? <TrackMyCompany/>:
              this.state.myCompanies? <MyCompanies/>:
              this.state.comments? <Comments/>:
              this.state.viewMyFees? <ViewMyFees/>:
              this.state.fillForm? <InvestorFillForm/>:
              this.state.updateCase? <InvestorUpdateCase/>:
              this.state.lastLawyer? <LastLawyer/>:
              this.state.updateProfile? <UpdateInvestorProfile/>:<div/>
          }
      </div>
    )
  }
  async componentDidMount(){
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try{
        await axios.get('../api/investors/auth')
    }catch(err){
      alert("You are not allowed");
      this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
      const data = parseJwt(localStorage.jwtToken)
    await this.setState({id:data.id})
  };
}
