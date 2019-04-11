import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';

 
export default class LawyerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        lawyerID:"5ca777485c74d20e80486f9c"
    };
    async componentDidMount(){

        const id =this.state.lawyerID;
        const getCases = await axios.get(`http://localhost:5000/api/lawyers/getAllUnsignedCases/${id}`);
        this.setState({cases: getCases.data});
         console.log(getCases.data);
    
        // my comments to understand arrayOfCases 
        // getCases.data.data[0]  the first case in the array 
    };
    
    async handelClick (index) {
        const id =this.state.lawyerID;
        const res = await axios.get(`http://localhost:5000/api/lawyers/assigncase/${id}/${index}`);
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

