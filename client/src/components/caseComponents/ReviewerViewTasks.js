import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';

export default class ReviewerViewTasks extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:"5ca9eeca72c0c6231cc3c7cf"
    };

    async componentDidMount(){

        const id =this.state.reviwerID;
        const getCases = await axios.get(`http://localhost:5000/api/reviewers/reviewerTasks/${id}`);
        this.setState({cases: getCases.data.Tasks});

    };

    render() {
        return (this.state.cases.map((x) => (
            <Case key={x._id} case={x} />
        ))
        )
      }

};