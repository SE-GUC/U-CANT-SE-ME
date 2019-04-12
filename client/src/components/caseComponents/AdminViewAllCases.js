import React, { Component } from 'react'
import CaseSwitch from './CaseSwitch';


export default class AdminViewAllCases extends Component {
    state ={
        cases :[]
    };

    render() {
        return (
        <CaseSwitch/>
        )
      }
}; 