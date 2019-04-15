import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
const serverURI = require("../../config/keys").serverURI;
 
export default class ReviewerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:"5ca9eeca72c0c6231cc3c7cf"
    };
    async componentDidMount(){

        const id =this.state.reviwerID;
        const getCases = await axios.get(serverURI + `/reviewers/getAllUnsignedCases/${id}`);
        this.setState({cases: getCases.data});
    };
    
    async handelClick (index) {
        const id =this.state.reviwerID;
        await axios.get(serverURI + `/reviewers/assigncase/${id}/${index}`);
        alert("You Have Taken This Case")
        this.componentDidMount()
    }
    render() {
        return (this.state.cases.map((x) => (
        <button onClick={() => this.handelClick(x._id)}>
            <Case key={x._id} case={x} />
        </button>
        ))
        )
      }
};

