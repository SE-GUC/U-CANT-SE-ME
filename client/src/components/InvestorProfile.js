import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'

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
        }
      }
  render() {
    return (
      <div>
        {
            this.state.trackMyCompanies? <Redirect to={{pathname: "/TrackMyCompany", state: {id: '5ca6229afd83c24bf091758e'}}}/>:
            this.state.myCompanies? <Redirect to={{pathname: "/MyCompanies"}}/>:
            this.state.comments? <Redirect to={{pathname: "/viewComments"}}/>:
            this.state.viewMyFees? <Redirect to={{pathname: "/ViewMyFees"}}/>:
            this.state.fillForm? <Redirect to={{pathname: "/InvestorFillForm"}}/>:
            this.state.updateCase? <Redirect to={{pathname: "/InvestorUpdateCase"}}/>:
            this.state.lastLawyer? <Redirect to={{pathname: "/LastLawyer"}}/>:<div/>
        }
        <Button variant="primary" size="large" onClick={() => {
        this.setState({trackMyCompanies: true})
      }}>
                Track my companies
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({myCompanies: true})
      }}>
                My Companies
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({comments: true})
      }}>
                View Comments On A SPECIFIC CASE
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({viewMyFees: true})
      }}>
                View My Fees
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({fillForm: true})
      }}>
              Fill a form
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({updateCase: true})
      }}>
              Update a case.
        </Button>
        <Button variant="primary" size="large" onClick={() => {
        this.setState({lastLawyer: true})
      }}>
              View Last Lawyer
        </Button>
      </div>
    )
  }
}
