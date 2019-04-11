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
        getAssignedLawyer =await axios.get(`http://localhost:5000/api/lawyers/${assignedLawyerId}`);
        this.setState({assignedLawyerEmail: getAssignedLawyer.data.email}); 
      }
      if(assignedReviewerId!==null){
        getAssignedReviewer =await axios.get(`http://localhost:5000/api/reviewers/${assignedReviewerId}`);
        this.setState({assignedReviewerEmail: getAssignedReviewer.data.data.email}); 
      }
      if(creatorLawyerId!==null){
        getCreatorLawyer =await axios.get(`http://localhost:5000/api/lawyers/${creatorLawyerId}`);
        this.setState({creatorLawyerEmail: getCreatorLawyer.data.email}); 
      }
      if(creatorInvestorId!==null){
        getCreatorInvestor =await axios.get(`http://localhost:5000/api/investors/${creatorInvestorId}`);
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
        <h1>Case</h1>
        <h2>companyNameArabic:{this.state.form.companyNameArabic}</h2>
        <h2>companyNameEnglish:{this.state.form.companyNameEnglish}</h2>
        <h3>caseCreationDate:{this.state.caseCreationDate}</h3>
        <h3>caseStatus:{this.state.caseStatus}</h3>
        <h1>Form</h1>
        <h3>companyType:{this.state.form.companyType}</h3>
        <h3>phoneNumber:{this.state.form.phoneNumber}</h3>
       </div>
     
    )
  }
}
