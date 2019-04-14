import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'

export default class AdminProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            caseSummary: false,
            caseSwitch: false,
            viewAllCases: false,
            registerLawyer: false,
            registerReviewer: false
        }
      }
  render() {
    return (
      <div>
        {
            this.state.caseSummary? <Redirect to={{pathname: "/CasesSummary"}}/>:
            this.state.caseSwitch? <Redirect to={{pathname: "/CaseSwitch"}}/>:
            this.state.viewAllCases? <Redirect to={{pathname: "/AdminViewAllCases"}}/>:
            this.state.registerLawyer? <Redirect to={{pathname: "/RegisterLawyer"}}/>:
            this.state.registerReviewer? <Redirect to={{pathname: "/RegisterReviewer"}}/>:<div/>
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
      </div>
    )
  }
}
