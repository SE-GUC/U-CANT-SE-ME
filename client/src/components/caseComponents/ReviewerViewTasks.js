import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken';
import {Redirect} from 'react-router-dom'
export default class ReviewerViewTasks extends Component {
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
        this.setState({home:2})
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({reviwerID:data.id})
        const id =this.state.reviwerID;
        const getCases = await axios.get(`api/reviewers/reviewerTasks/${id}`);
        this.setState({cases: getCases.data.Tasks});

    };
    accept=async (caseId)=>
    {
        try
        {
            await axios.put(`api/reviewers/updateCaseStatus/${caseId}/Accepted`);
            const newArr=this.state.cases.filter(function(value, index, arr){
                return caseId === value._id;
            });
            if(this.state.cases.length===1)
                this.setState({cases:[]})
            else
                this.setState({cases:newArr})
        }
        catch(error)
        {
            throw error;
        }
    }
    render() {
        if (this.state.home===0) return <div></div>;
        if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        else
        return (this.state.cases.map((x) => (
            <div>
                <Case key={x._id} case={x} />
                <button onClick={() => this.accept(x._id)}>Accept</button>
            </div>
        ))
        )
      }

};