import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken'
export default class LawyerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        lawyerID:""
    };
    async componentDidMount(){
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({lawyerID:data.id})
        const id =this.state.lawyerID;
        const getCases = await axios.get(`api/lawyers/getAllUnsignedCases/${id}`);
        await this.setState({cases: getCases.data});
    };
    
    async handelClick (index) {
        const id =this.state.lawyerID;
        await axios.get(`api/lawyers/assigncase/${id}/${index}`);
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

