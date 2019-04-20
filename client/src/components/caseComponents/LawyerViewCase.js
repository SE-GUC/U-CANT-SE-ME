import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken'
export default class LawyerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        lawyerID:"",
        home:false
    };
    async componentDidMount() {
        // check if localStorage.jwtTokenis not null else he must login
        if (!localStorage.jwtToken) {
          alert("You must login!");
          this.setState({ home: true });
        }
        try{
            await axios.get('api/admins/auth')
        }catch(err){this.setState({ home: true });}
        // check that it is a reviewer if not redirect to somewhere else
      }
    async componentDidMount(){
        if (!localStorage.jwtToken) {
            alert("You must login!");
            this.setState({ home: true });
        }
        try{
              await axios.get('api/admins/auth')
        }catch(err){
            alert("You are not allowed to access this page");
            this.setState({ home: true });
        }
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({lawyerID:data.id})
        const id =this.state.lawyerID;
        const getCases = await axios.get(`api/lawyers/getAllUnsignedCases/${id}`);
        await this.setState({cases: getCases.data});
    };
    
    async handelClick (index) {
        const id =this.state.lawyerID;
        await axios.get(`api/lawyers/assigncase/${id}/${index}`);
        alert("You Have Taken This Case")
        this.componentDidMount()
    }
    render() {
        return (this.state.cases.map((x) => (
        <button onClick={() => this.handelClick(x._id)}>
            <Case key={x._id} case={x} />
        </button>
        ))
        )
      }
};

