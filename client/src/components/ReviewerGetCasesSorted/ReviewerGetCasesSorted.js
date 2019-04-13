import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { types } from 'util';
import axios from 'axios';
import Case from './Case';
class ReviewerGetCasesSorted extends Component {
    constructor(){
        super();
        this.state ={
            criterion :'ID',
            cases :[]
        };
    }
    
    async componentDidMount(criteria){
        if(criteria === 'ID'){
            const getCases = await axios.get('http://localhost:5000/api/reviewers/getMyCasesByid/5ca612f6dc10782330077c4e');
            this.setState({cases: getCases.data});
        }else{
            if(criteria === 'Date'){
                const getCases = await axios.get('http://localhost:5000/api/reviewers/getMyCasesByDate/5ca612f6dc10782330077c4e');
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