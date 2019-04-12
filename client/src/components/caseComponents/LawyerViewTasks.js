import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';

export default class LawyerViewTasks extends Component {
    state ={
        cases :[],
        caseid:"",
        LawyerID:"5ca777485c74d20e80486f9c"
    };

    async componentDidMount(){

        const id =this.state.LawyerID;
        const getCases = await axios.get(`http://localhost:5000/api/lawyers/lawyerTasks/${id}`);
        this.setState({cases: getCases.data.Tasks});
    };
    accept=async (caseId)=>
    {
        try
        {
            await axios.put(`http://localhost:5000/api/lawyers/updateCaseStatus/${caseId}/WaitingForReviewer`);
            const newArr=this.state.cases.filter(function(value, index, arr){
                return caseId === value._id;
            });
            if(this.state.cases.length===1)
                this.setState({cases:[]})
            else
                this.setState({cases:newArr})
        }
        catch(error)
        {
            throw error;
        }
    }
    render() {
        return (this.state.cases.map((x) => (
            <div>
            <Case key={x._id} case={x} />
            <button onClick={() => this.accept(x._id)}>Accept</button>
            </div>
        ))
        )
      }

};