import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
const { serverURI } = require("../../config/keys");

export default class ReviewerViewTasks extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:"5ca9eeca72c0c6231cc3c7cf"
    };

    async componentDidMount(){

        const id =this.state.reviwerID;
        const getCases = await axios.get(serverURI + `/reviewers/reviewerTasks/${id}`);
        this.setState({cases: getCases.data.Tasks});

    };
    accept=async (caseId)=>
    {
        try
        {
            await axios.put(serverURI + `/reviewers/updateCaseStatus/${caseId}/Accepted`);
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