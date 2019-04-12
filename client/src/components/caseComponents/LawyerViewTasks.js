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

    render() {
        return (this.state.cases.map((x) => (
            <Case key={x._id} case={x} />
        ))
        )
      }

};