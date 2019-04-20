import React, { Component } from 'react'
import CaseSwitch from './CaseSwitch';


export default class LawyerViewAllCases extends Component {
    state ={
        cases :[]
    };
    async componentDidMount() {
        // check if localStorage.jwtTokenis not null else he must login
        if (!localStorage.jwtToken) {
          alert("You must login!");
          this.setState({ home: true });
        }
        try{
            await axios.get('api/lawyers/auth')
        }catch(err){
            alert("You are not allowed to access this page");
            this.setState({ home: true });
        }
        // check that it is a reviewer if not redirect to somewhere else
      }
    render() {
        return (
        <CaseSwitch/>
        )
      }
};