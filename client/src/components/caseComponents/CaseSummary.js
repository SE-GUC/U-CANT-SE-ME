import React, { Component } from 'react'
import axios from 'axios';

export default class CaseSummary extends Component {
  getStyle = () => {
    return{
        background: '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted'
    } 
}
  state={
    assignedLawyerEmail:'not assigned yet',
    assignedReviewerEmail:'not assigned yet',
    caseCreationDate:'',
    caseStatus:'',
    creatorInvestorEmail:'not created by investor',
    creatorLawyerEmail:'not created by lawyer',
    form:[],
    managers:[],
    previouslyAssignedLawyers:[],
    previouslyAssignedReviewers:[]
  }
  async componentDidMount(){
    const{assignedLawyerId,assignedReviewerId,caseCreationDate,caseStatus,creatorInvestorId,
      creatorLawyerId,form,managers,previouslyAssignedLawyers,previouslyAssignedReviewers}=this.props.case;
      
      let getAssignedLawyer = '';
      let getAssignedReviewer = '';
      let getCreatorInvestor='';
      let  getCreatorLawyer ='';
      if(assignedLawyerId!==null){
        getAssignedLawyer =await axios.get(`api/lawyers/${assignedLawyerId}`);
        this.setState({assignedLawyerEmail: getAssignedLawyer.data.email}); 
      }
      if(assignedReviewerId!==null){
        getAssignedReviewer =await axios.get(`api/reviewers/${assignedReviewerId}`);
        this.setState({assignedReviewerEmail: getAssignedReviewer.data.data.email}); 
      }
      if(creatorLawyerId!==null){
        getCreatorLawyer =await axios.get(`api/lawyers/${creatorLawyerId}`);
        this.setState({creatorLawyerEmail: getCreatorLawyer.data.email}); 
      }
      if(creatorInvestorId!==null){
        getCreatorInvestor =await axios.get(`api/investors/${creatorInvestorId}`);
        this.setState({creatorInvestorEmail: getCreatorInvestor.data.email}); 
      }
      this.setState({caseStatus:caseStatus});
      this.setState({caseCreationDate:caseCreationDate});
      this.setState({form:form});
      this.setState({managers:managers});
      this.setState({previouslyAssignedLawyers:previouslyAssignedLawyers});
      this.setState({previouslyAssignedReviewers:previouslyAssignedReviewers});     
};
  render() {
    
    return (
      <div style={this.getStyle()}>
        <h5>Case</h5>
        <p>Arabic Name: {this.state.form.companyNameArabic}</p>
        <p>English Name : {this.state.form.companyNameEnglish}</p>
        <p>Creation Date: {this.state.caseCreationDate}</p>
        <p>Status: {this.state.caseStatus}</p>
        <h5>Form</h5>
        <p>CompanyType: {this.state.form.companyType}</p>
        <p>PhoneNumber: {this.state.form.phoneNumber}</p>
       </div>
     
    )
  }
}
