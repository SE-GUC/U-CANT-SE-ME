import React, { Component } from 'react'
import CaseSwitch from './CaseSwitch';


export default class ReviewerViewAllCases extends Component {
    state ={
        cases :[]
    };

    render() {
        return (
        <CaseSwitch/>
        )
      }
};