import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>SUMERGITE</h1>
      <Link style={linkStyle} to="/">Home</Link> 
    | <Link style={linkStyle} to="/LoginInternalPortal">Login InternalPortal</Link> 
    | <Link style={linkStyle} to="/MyCompanies">My Companies</Link> 
    | <Link style={linkStyle} to="/TrackMyCompany">Track my companies</Link>
    | <Link style={linkStyle} to="/viewComments">Comments</Link> 
    | <Link style={linkStyle} to="/InvestorRegister">Register Investor</Link>   
    | <Link style={linkStyle} to="/ViewMyFees">View my Fees</Link> 

    | <Link style={linkStyle} to="/getAllCases">Cases</Link>

    | <Link style={linkStyle} to="/RegisterLawyer">Register Lawyer</Link> 
    | <Link style={linkStyle} to="/RegisterReviewer">Register Reviewer</Link> 
    | <Link style={linkStyle} to="/LawyerFillForm">Lawyer Fill Form</Link>
    | <Link style={linkStyle} to="/InvestorFillForm">Investor Fill Form</Link>
    |  <Link style={linkStyle} to="/lawyerUpdateCase">lawyerUpdateCase</Link>
    |  <Link style={linkStyle} to="/login">Login</Link>
    |  <Link style={linkStyle} to="/LastLawyer">LastLawyer</Link>
    |  <Link style={linkStyle} to="/LawyerViewCase">LawyerViewCase</Link>
    |  <Link style={linkStyle} to="/ReviewerViewCase">ReviewerViewCase</Link>
    |  <Link style={linkStyle} to="/InvestorUpdateCase">InvestorUpdateCase</Link>


    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Header;
