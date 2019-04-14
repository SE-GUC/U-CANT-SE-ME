import React, { Component } from 'react'
import axios from 'axios';
import CaseSummary from './CaseSummary';
const { serverURI } = require("../../config/keys");

 class CasesSummary extends Component {
    state ={
        cases :[]
    };
    async componentDidMount(){

        const getCases = await axios.get(serverURI + "/cases");
        this.setState({cases: getCases.data.data});
    };
    render() {
        return (this.state.cases.map((x) => (
       <CaseSummary id ={x._id}key={x._id} case={x} />
        ))
        )
      }
};

export default CasesSummary

