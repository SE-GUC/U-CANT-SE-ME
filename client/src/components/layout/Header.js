import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>SUMERGITE</h1>
      <Link style={linkStyle} to="/">Home</Link> 
    | <Link style={linkStyle} to="/profile/:id">Investor Profile</Link>
    | <Link style={linkStyle} to="/internalPortal/lawyer/profile/:id">Lawyer Profile</Link>
    | <Link style={linkStyle} to="/internalPortal/reviewer/profile/:id">Reviewer Profile</Link>
    | <Link style={linkStyle} to="/internalPortal/admin/profile/:id">Admin Profile</Link>
    | <Link style={linkStyle} to="/LoginInternalPortal">Login InternalPortal</Link>
    | <Link style={linkStyle} to="/login">Login</Link>
    | <Link style={linkStyle} to="/InvestorRegister">Register Investor</Link>
    | <Link style={linkStyle} to="/ElectronicJournals">Electronic Journals</Link>
    |  <Link style={linkStyle} to="/updateInvestorProfile">updateInvestorProfile</Link>

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
