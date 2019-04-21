import React, { Component } from 'react';
import axios from 'axios';
import Case from './Case';
import parseJwt from '../../helpers/decryptAuthToken';
import {Redirect} from 'react-router-dom'

class LawyerGetCasesSorted extends Component {
    constructor(){
        super();
        this.state ={
            criterion :'',
            cases :[],
            lawyerId:'',
            home:0
        };
    }
    
    async componentDidMount(criteria){
        if (!localStorage.jwtToken) {
            alert("You must login!");
            this.setState({ home: 1 });
            return;
          }
          try{
              await axios.get('api/lawyers/auth')
          }catch(err){
              alert("You are not allowed to access this page");
              this.setState({ home: 1 });
              return;
          }
        this.setState({home:2});
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({lawyerId:data.id})
        const id = this.state.lawyerId;
        if(criteria === 'ID'){
            const getCases = await axios.get(`api/lawyers/getMyCasesByid/${id}`);
            this.setState({cases: getCases.data.data});
        }else{
            if(criteria === 'Date'){
                const getCases = await axios.get(`api/lawyers/getMyCasesByDate/${id}`);
                this.setState({cases: getCases.data.data});
            }
        }
    };

    changeCriterion= e => {
        this.setState({criterion: e.target.value})
        this.componentDidMount(e.target.value)
    }

    render() {
        if (this.state.home===0) return <div></div>;
        if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
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