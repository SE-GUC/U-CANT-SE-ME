import React, { Component } from 'react';
import axios from 'axios';
import Case from './Case';

class ReviewerGetCasesSorted extends Component {
    constructor(){
        super();
        this.state ={
            criterion :'ID',
            cases :[],
            reviewerId:""
        };
    }
    
    async componentDidMount(criteria){
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({reviwerId:data.id})
        const id = this.state.reviewerId;
        if(criteria === 'ID'){
            const getCases = await axios.get(`api/reviewers/getMyCasesByid/${id}`);
            this.setState({cases: getCases.data});
        }else{
            if(criteria === 'Date'){
                const getCases = await axios.get(`api/reviewers/getMyCasesByDate/${id}`);
                this.setState({cases: getCases.data});
            }
        }
    };

    changeCriterion= e => {
        this.setState({criterion: e.target.value})
        this.componentDidMount(e.target.value)
    }

    render() {
        return (
            <div>
                <label>Selection Criterion: </label>
                <select onChange={this.changeCriterion}>
                    <option value=""></option>
                    <option value="ID">Case ID / Date Of Creation Ascending</option>
                    <option value="Date">Date Of Creation Descending</option>
                </select>
                {this.state.cases.map((x) => (
                <Case key={x._id} case={x} />
                ))}
            </div>
        )
      }
}

export default ReviewerGetCasesSorted;