import React, { Component } from 'react'
import CaseSwitch from './CaseSwitch';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class ReviewerViewAllCases extends Component {
    state ={
        cases :[],
        home:0
    };
    async componentDidMount(){
        if (!localStorage.jwtToken) {
            alert("You must login!");
            this.setState({ home: 1 });
            return;
        }
        try{
              await axios.get('api/reviewers/auth')
        }catch(err){
            alert("You are not allowed to access this page");
            this.setState({ home: 1 });
            return;
        }
        this.setState({home:2})
    }
    render() {
        if (this.state.home===0) return <div/>;
        if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        else
        return (
        <CaseSwitch/>
        )
      }
};