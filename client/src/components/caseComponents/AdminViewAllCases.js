import React, { Component } from "react";
import CaseSwitch from "./CaseSwitch";
import axios from "axios";
import {Redirect} from 'react-router-dom';

export default class AdminViewAllCases extends Component {
  state = {
    cases: [],
    home: 0
  };
  async componentDidMount() {
    // check if localStorage.jwtTokenis not null else he must login
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try{
        await axios.get('api/admins/auth')
    }catch(err){
        alert("You are not allowed to access this page");
        this.setState({ home: 1 });
        return;
    }
    this.setState({home:2})
    // check that it is a reviewer if not redirect to somewhere else
  }
  render() {
    if (this.state.home===0) return <div></div>;
    if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
    else return <CaseSwitch />;
  }
}
