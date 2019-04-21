import React, { Component } from 'react'
import axios from 'axios';
import CaseSummary from './CaseSummary';
import { Redirect } from 'react-router-dom'

 class CasesSummary extends Component {
    state ={
        cases :[],
        home: 0
    };
    async componentDidMount(){

        if (!localStorage.jwtToken) {
            alert("You must login!");
            this.setState({ home: 1 });
            return;
          }
          try{
              await axios.get('../api/admins/allAuth')
          }catch(err){
            alert("You are not allowed");
            this.setState({ home: 1 });
            return;
          }
          this.setState({ home: 2 });
        const getCases = await axios.get("api/cases");
        this.setState({cases: getCases.data.data});
    };
    render() {
      if (this.state.home===0) return <div> </div>;
      if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        return (this.state.cases.map((x) => (
       <CaseSummary id ={x._id}key={x._id} case={x} />
        ))
        )
      }
};

export default CasesSummary

