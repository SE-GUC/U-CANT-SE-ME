import React, { Component } from 'react';
import Comment from './Comment';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken'
class Comments extends Component {
    state = {
        comments: [],
        investorId:""
    }
    async componentDidMount() {
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({investorId:data.id})
        const investorID=this.state.investorId
        const caseID="5ca62338fd83c24bf091758f"
        const {data: comments} = await axios.get(`api/investors/lawyerComments/${investorID}/${caseID}`)
        this.setState({comments: comments.comments})
    }

render(){
  return (
      this.state.comments.map((comment) => (<Comment key={comment._id} comment={comment} />
  )))
  }
}

export default Comments;
