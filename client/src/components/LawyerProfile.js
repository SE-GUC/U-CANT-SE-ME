import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'

export default class LawyerProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            getAllCases: false,
            fillForm: false,
            updateCase: false,
            viewCase: false,
            caseSummary: false,
            caseSwitch: false,
            viewAllCases: false,
            getCasesSorted: false,
            viewTasks: false
        }
      }
  render() {
    return (
      <div>
        {
            this.state.getAllCases? <Redirect to={{pathname: "/getAllCases"}}/>:
            this.state.fillForm? <Redirect to={{pathname: "/LawyerFillForm"}}/>:
            this.state.updateCase? <Redirect to={{pathname: "/lawyerUpdateCase"}}/>:
            this.state.viewCase? <Redirect to={{pathname: "/LawyerViewCase"}}/>:
            this.state.caseSummary? <Redirect to={{pathname: "/CasesSummary"}}/>:
            this.state.caseSwitch? <Redirect to={{pathname: "/CaseSwitch"}}/>:
            this.state.viewAllCases? <Redirect to={{pathname: "/LawyerViewAllCases"}}/>:
            this.state.getCasesSorted? <Redirect to={{pathname: "/LawyerGetCasesSorted"}}/>:
            this.state.viewTasks? <Redirect to={{pathname: "/LawyerViewTasks"}}/>:<div/>
        }
        <Button variant="primary" size="large" onClick={() => {
        this.setState({getAllCases: true})
      }}>
                Get All Cases
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({fillForm: true})
      }}>
                Fill Form
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({updateCase: true})
      }}>
                Update Case
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
      </div>
    )
  }
}
