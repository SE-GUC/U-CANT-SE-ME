import React, { Component } from 'react';
import axios from 'axios';


export default class PreviouslyAssignedReviewers extends Component {
  state ={
    reviewerEmail:''
  };
  async componentDidMount(){
    const reviewerID=this.props.reviewer;
    const getReviewer=await axios.get(`http://localhost:5000/api/reviewers/${reviewerID}`);
    this.setState({reviewerEmail: getReviewer.data.data.email}); 
  }

  render() {
    return (
      <div>
        <h4>previousReviewerEmail:{this.state.reviewerEmail}</h4>
      </div>
    )
  }
}
