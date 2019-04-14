import React, { Component } from 'react';
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
    
    async componentDidMount(){
        if(this.state.criterion === 'ID'){
            const getCases = await axios.get('http://localhost:5000/api/reviewers/getMyCasesByid/5ca612f6dc10782330077c4e');
            this.setState({cases: getCases.data});
        }else{
            if(this.state.criterion === 'Date'){
                const getCases = await axios.get('http://localhost:5000/api/reviewers/getMyCasesByDate/5ca612f6dc10782330077c4e');
                this.setState({cases: getCases.data});
            }
        }
    };

    changeCriterion= e => {
        this.setState({criterion: e.target.value})
        this.componentDidMount()
    }

    render() {
        return (
            <div>
                <label>Selection Criterion: </label>
                <select onChange={this.changeCriterion}>
                    <option value="ID">Case ID</option>
                    <option value="Date">Date Of Creation</option>
                </select>
                {this.state.cases.map((x) => (
                <Case key={x._id} case={x} />
                ))}
            </div>
        )
      }
}

export default ReviewerGetCasesSorted;