import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken';
import {Redirect} from 'react-router-dom'
const  prefix="http://localhost:5000/";
export default class LawyerViewTasks extends Component {
    state ={
        cases :[],
        caseid:"",
        lawyerId:"",
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
        this.setState({ home: 2 });
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({lawyerId:data.id})
        const id =this.state.lawyerId;
        const getCases = await axios.get(`api/lawyers/lawyerTasks/${id}`);
        await this.setState({cases: getCases.data.Tasks});
    };
    accept=async (caseId)=>
    {
        try
        {
            await axios.put(`api/lawyers/updateCaseStatus/${caseId}/WaitingForReviewer`);
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

    viewDecision=async (id) =>
    {
        window.open(`${prefix}api/lawyers/viewDecision/${id}`,'_blank');
    }
    downloadDecision=async (id) =>
    {
        window.open(`${prefix}api/lawyers/downloadDecision/${id}`,'_blank');
    }
    viewContract=async (id) =>
    {
        window.open(`${prefix}api/lawyers/viewContract/${id}`,'_blank');
    }
    downloadContract=async (id) =>
    {
        window.open(`${prefix}api/lawyers/downloadContract/${id}`,'_blank');
    }

    render() {
        if (this.state.home===0) return <div/>;
        if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        else
        return (
            this.state.cases.length==0? <h1>You dont have any cases.</h1>:
            <header className="LawyerViewTasks">
            <div>
                {this.state.cases.map((x) => (
                    <div>
                        {x.companyType==="SPC"?
                        <div>
                            <button onClick={() => this.viewDecision(x._id)}>View Decision</button>
                            <button onClick={() =>this.downloadDecision(x._id)}>Download PDF</button>
                        </div>:
                        <div>
                            <button onClick={() =>this.viewContract(x._id)}>View Contract</button>
                            <button onClick={() =>this.downloadContract(x._id)}>Download PDF</button>
                        </div>
                        }
                        <Case key={x._id} case={x} />
                        <button onClick={() => this.accept(x._id)}>Accept</button>
                    </div>
                    ))}
            </div>
            </header>
        )
      }

};
