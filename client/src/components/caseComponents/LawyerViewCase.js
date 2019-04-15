import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
const serverURI = require("../../config/keys").serverURI;
 
export default class LawyerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        lawyerID:"5ca777485c74d20e80486f9c"
    };
    async componentDidMount(){
        const id =this.state.lawyerID;
        const getCases = await axios.get(serverURI + `/lawyers/getAllUnsignedCases/${id}`);
        this.setState({cases: getCases.data});
    };
    
    async handelClick (index) {
        const id =this.state.lawyerID;
        await axios.get(serverURI + `/lawyers/assigncase/${id}/${index}`);
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

