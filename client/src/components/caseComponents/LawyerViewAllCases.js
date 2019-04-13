import React, { Component } from 'react'
import CaseSwitch from './CaseSwitch';


export default class LawyerViewAllCases extends Component {
    state ={
        cases :[]
    };

    render() {
        return (
        <CaseSwitch/>
        )
      }
};