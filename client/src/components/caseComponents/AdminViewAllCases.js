import React, { Component } from 'react'
import Cases from './Cases';


export default class AdminViewAllCases extends Component {
    state ={
        cases :[]
    };
    
    render() {
        return (
        <Cases/>
        )
      }
};