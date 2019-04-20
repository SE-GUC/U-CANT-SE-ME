import React, { Component } from "react";
import CaseSwitch from "./CaseSwitch";
import parseJwt from "../../helpers/decryptAuthToken";
import axios from "axios";
import {Redirect} from 'react-router-dom';

export default class AdminViewAllCases extends Component {
  state = {
    cases: [],
    home: false
  };
  async componentDidMount() {
    // check if localStorage.jwtTokenis not null else he must login
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: true });
    }
    try{
        await axios.get('api/admins/auth')
    }catch(err){this.setState({ home: true });}
    // check that it is a reviewer if not redirect to somewhere else
  }
  render() {
    if (this.state.home) return <Redirect to={{ pathname: "/" }} />;
    else return <CaseSwitch />;
  }
}
