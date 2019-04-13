import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { types } from 'util';
import axios from 'axios';
import Case from './Case';
class LawyerGetCasesSorted extends Component {
    constructor(){
        super();
        this.state ={
            criterion :'',
            cases :[]
        };
    }
    
    async componentDidMount(criteria){
        if(criteria === 'ID'){
            const getCases = await axios.get('http://localhost:5000/api/lawyers/getMyCasesByid/5ca76f5f00b48e09001936e7');
            this.setState({cases: getCases.data});
        }else{
            if(criteria === 'Date'){
                const getCases = await axios.get('http://localhost:5000/api/lawyers/getMyCasesByDate/5ca76f5f00b48e09001936e7');
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

export default LawyerGetCasesSorted;