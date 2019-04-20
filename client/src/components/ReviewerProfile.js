import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import parseJwt from '../helpers/decryptAuthToken';
export default class ReviewerProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            getAllCases: false,
            viewCase: false,
            caseSummary: false,
            caseSwitch: false,
            viewAllCases: false,
            getCasesSorted: false,
            viewTasks: false,
            home:0
        }
      }
  render() {
    if (this.state.home===0) return <div> </div>;
    if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <div>
        {
            this.state.getAllCases? <Redirect to={{pathname: "/getAllCases"}}/>:
            this.state.viewCase? <Redirect to={{pathname: "/ReviewerViewCase"}}/>:
            this.state.caseSummary? <Redirect to={{pathname: "/CasesSummary"}}/>:
            this.state.caseSwitch? <Redirect to={{pathname: "/CaseSwitch"}}/>:
            this.state.viewAllCases? <Redirect to={{pathname: "/ReviewerViewAllCases"}}/>:
            this.state.getCasesSorted? <Redirect to={{pathname: "/ReviewerGetCasesSorted"}}/>:
            this.state.viewTasks? <Redirect to={{pathname: "/ReviewerViewTasks"}}/>:<div/>
        }
        <Button variant="primary" size="large" onClick={() => {
        this.setState({getAllCases: true})
      }}>
                Get All Cases
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({viewCase: true})
      }}>
                View Case
        </Button>
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
        this.setState({getCasesSorted: true})
      }}>
                Get Cases Sorted
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({viewTasks: true})
      }}>
                View Tasks
        </Button>
        <br />
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
        await axios.get('../api/reviewers/auth')
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
