import React, { Component } from 'react';
import Comment from './Comment';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken'
import {Redirect} from 'react-router-dom'

class Comments extends Component {
    state = {
        comments: [],
        investorId:""
    }
    async componentDidMount() {
        if (!localStorage.jwtToken) {
            alert("You must login!");
            this.setState({ home: 1 });
            return;
          }
          try{
              await axios.get('api/investors/auth')
          }catch(err){
              alert("You are not allowed to access this page");
              this.setState({ home: 1 });
              return;
          }
        await this.setState({home:2});
       
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({investorId:data.id})
        const investorID=this.state.investorId
        const caseID="5ca62338fd83c24bf091758f"
        const {data: comments} = await axios.get(`api/investors/lawyerComments/${investorID}/${caseID}`)
        this.setState({comments: comments.comments})
    }

render(){
    if (this.state.home===0) return <div></div>;
    if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
  return (
      this.state.comments.map((comment) => (<Comment key={comment._id} comment={comment} />
  )))
  }
}

export default Comments;
