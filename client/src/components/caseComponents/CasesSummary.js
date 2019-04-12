import React, { Component } from 'react'
import axios from 'axios';
import CaseSummary from './CaseSummary';

 class CasesSummary extends Component {
    state ={
        cases :[]
    };
    async componentDidMount(){

        const getCases = await axios.get("http://localhost:5000/api/cases");
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

