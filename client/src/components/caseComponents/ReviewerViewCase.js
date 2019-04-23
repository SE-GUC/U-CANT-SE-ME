import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken';
import {Redirect} from 'react-router-dom'
import CasePreview from '../dCaseComponents/CasePreview'
import CasesContainerProps from '../dCaseComponents/CasesContainerProps';
export default class ReviewerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:"",
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
          const data = parseJwt(localStorage.jwtToken)
          await this.setState({reviwerID:data.id})
          const id =this.state.reviwerID;
          
          const getCases = await axios.get(`api/reviewers/getAllUnsignedCases/${id}`);
          await this.setState({cases: getCases.data.data});
        this.setState({home:2});
    };
    
    async handelClick (index) {
        const id =this.state.reviwerID;
        await axios.get(`api/reviewers/assigncase/${id}/${index}`);
        alert("You Have Taken This Case")
        this.componentDidMount()
    }
    render() {
        if (this.state.home===0) return <div />;
        if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        else
        return (
            this.state.cases.length===0?<h1> There are no unassigned cases</h1>:
            <CasesContainerProps cases={this.state.cases} currentUserId={this.state.reviwerID}/>
        )
      }
      handleCaseFullDetails = (expandedCase) => {
        this.setState({ isCaseExpaned: true })
        this.setState({ expandedCase: expandedCase })
      }
};

