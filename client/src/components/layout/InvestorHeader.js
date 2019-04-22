import React from 'react';
import Button from '@material-ui/core/Button'
import '../../header.css'
function Header() {
  return (
    <header>
        <div class="container">
            <h1 class="logo"></h1>
            <nav>
              <ul>
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
        <Button variant="primary" size="large" onClick={() => {
        this.setState({updateProfile: true})
      }}>
              Update Profile
        </Button>
              </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header;
