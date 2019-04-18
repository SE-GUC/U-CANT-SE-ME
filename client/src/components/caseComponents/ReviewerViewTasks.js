import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken';

export default class ReviewerViewTasks extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:""
    };

    async componentDidMount(){

        const data = parseJwt(localStorage.jwtToken)
        await this.setState({reviwerID:data.id})
        const id =this.state.reviwerID;
        const getCases = await axios.get(`api/reviewers/reviewerTasks/${id}`);
        this.setState({cases: getCases.data.Tasks});

    };
    accept=async (caseId)=>
    {
        try
        {
            await axios.put(`api/reviewers/updateCaseStatus/${caseId}/Accepted`);
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