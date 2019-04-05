import React, { Component } from 'react'

export default class Case extends Component {
  render() {
    const{assignedLawyerId,assignedReviewerId,caseCreationDate,caseStatus,creatorInvestorId,
      creatorLawyerId,form,managers,previouslyAssignedLawyers,previouslyAssignedReviewers}=this.props.case;
      // console.log("----------------");
      // console.log(this.props.case);
    return (
      <div>
         <h4>caseCreationDate: {caseCreationDate}</h4>
      </div>
    )
  }
}
