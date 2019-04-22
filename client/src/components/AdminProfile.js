import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import parseJwt from '../helpers/decryptAuthToken';
import NavBarDashboard from './NavBarDashboard';
export default class AdminProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            caseSummary: false,
            caseSwitch: false,
            viewAllCases: false,
            registerLawyer: false,
            registerReviewer: false,
            createFormTemplate: false,
            home:0
        }
      }
  render() {
    if (this.state.home===0) return <div> </div>;
    if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <div>
      <NavBarDashboard dashboardRedirect="/AdminDashBoard" sumergiteColor= '#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' dashboard='bold' profile='lighter' homepage='lighter' DASHBOARD={true} PROFILE={true} ProfileMargin='120px' HomePageMargin='0px'/>
        <div  style={{paddingTop: '10vh'}}>
        {
            this.state.caseSummary? <Redirect to={{pathname: "/CasesSummary"}}/>:
            this.state.caseSwitch? <Redirect to={{pathname: "/CaseSwitch"}}/>:
            this.state.viewAllCases? <Redirect to={{pathname: "/AdminViewAllCases"}}/>:
            this.state.registerLawyer? <Redirect to={{pathname: "/RegisterLawyer"}}/>:
            this.state.registerReviewer? <Redirect to={{pathname: "/RegisterReviewer"}}/>:
            this.state.createFormTemplate? <Redirect to={{pathname: "/CreateFormTemplate"}}/>:<div/>
        }
        <Button variant="primary" size="large" onClick={() => {
        this.setState({caseSummary: true})
      }}>
                Case Summary
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({caseSwitch: true})
      }}>
                Case Switch
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({viewAllCases: true})
      }}>
                View All Cases
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({registerLawyer: true})
      }}>
                Register Lawyer
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({registerReviewer: true})
      }}>
                Register Reviewer
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({createFormTemplate: true})
      }}>
                Create Form Template
        </Button>
      </div>
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
        await axios.get('../../../api/admins/auth')
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
