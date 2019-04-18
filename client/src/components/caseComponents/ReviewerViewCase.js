import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken';

export default class ReviewerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:""
    };
    async componentDidMount(){

        const data = parseJwt(localStorage.jwtToken)
        await this.setState({reviwerID:data.id})
        const id =this.state.reviwerID;
        const getCases = await axios.get(`api/reviewers/getAllUnsignedCases/${id}`);
        this.setState({cases: getCases.data});
    };
    
    async handelClick (index) {
        const id =this.state.reviwerID;
        await axios.get(`api/reviewers/assigncase/${id}/${index}`);
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

