import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';

 
export default class ReviewerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:"5ca9eeca72c0c6231cc3c7cf"
    };
    async componentDidMount(){

        const id =this.state.reviwerID;
        const getCases = await axios.get(`http://localhost:5000/api/reviewers/getAllUnsignedCases/${id}`);
        this.setState({cases: getCases.data});
         console.log(getCases.data);
    
        // my comments to understand arrayOfCases 
        // getCases.data.data[0]  the first case in the array 
    };
    
    async handelClick (index) {
        const id =this.state.reviwerID;
        const res = await axios.get(`http://localhost:5000/api/reviewers/assigncase/${id}/${index}`);
        // console.log(res.data)
        alert("You Have Taken This Case")
        window.location.reload()
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

