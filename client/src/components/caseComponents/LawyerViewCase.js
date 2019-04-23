import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken'
import {Redirect} from 'react-router-dom'
import CasePreview from '../dCaseComponents/CasePreview'
import CasesContainerProps from '../dCaseComponents/CasesContainerProps';
export default class LawyerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        lawyerID:"",
        home:0
    };
    async componentDidMount(){
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
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({lawyerID:data.id})
        const id =this.state.lawyerID;
        const getCases = await axios.get(`api/lawyers/getAllUnsignedCases/${id}`);
        await this.setState({cases: getCases.data.data});
        this.setState({home:2})
    };
    
    async handelClick (index) {
        const id =this.state.lawyerID;
        await axios.get(`api/lawyers/assigncase/${id}/${index}`);
        alert("You Have Taken This Case")
        this.componentDidMount()
    }
    render() {
        if (this.state.home===0) return <div />;
        if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        else
        return (
            this.state.cases.length===0?<h1> There are no unassigned cases</h1>:
            <CasesContainerProps cases={this.state.cases} currentUserId={this.state.lawyerID}/>
        )
      }
      handleCaseFullDetails = (expandedCase) => {
        this.setState({ isCaseExpaned: true })
        this.setState({ expandedCase: expandedCase })
      }
};