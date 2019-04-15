import React, { Component } from 'react';
import Comment from './Comment';
import axios from 'axios';

class Comments extends Component {
    state = {
        comments: []
    }
    async componentDidMount() {
        const investorID="5ca6229afd83c24bf091758e"
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
