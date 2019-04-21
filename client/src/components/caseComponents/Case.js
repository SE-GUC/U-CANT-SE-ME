import React, { Component } from 'react'
import axios from 'axios';
import Managers from './Managers';
import { Link } from 'react-router-dom';
import moment from 'moment'
import TextField from "@material-ui/core/TextField"

export default class Case extends Component {
  
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

  formatTime(t) {
    return moment.utc(t.substring(0, 23)).format('DD, MMM, HH:mm').toUpperCase();
  }
  
  render() {
    
    return (
      <div>
        <h2 className="text-center text-info">Case</h2>
        <Link to={{pathname: "/addComment",state:{caseID: this.props.case._id}}}>Add Comment</Link>
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Arabic Company Name"
          style={{ margin: 15 }}
          value={this.state.form.companyNameArabic}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="English Company Name"
          style={{ margin: 15 }}
          value={this.state.form.companyNameEnglish}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField disabled
          id="standard-full-width"
          label="Case's DOC"
          style={{ margin: 15 }}
          value={this.formatTime(this.state.caseCreationDate)}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Assigned Lawyer's Email"
          style={{ margin: 15 }}
          value={this.state.assignedLawyerEmail}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Assigned Reviewer's Email"
          style={{ margin: 15 }}
          value={this.state.assignedReviewerEmail}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Investor's Email"
          style={{ margin: 15 }}
          value={this.state.creatorInvestorEmail}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Initiating Lawyer's Email"
          style={{ margin: 15 }}
          value={this.state.creatorLawyerEmail}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Case Status"
          style={{ margin: 15 }}
          value={this.state.caseStatus}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <h2 className="text-center text-info">Form</h2>
        <TextField disabled
          id="standard-full-width"
          label="Company Type"
          style={{ margin: 15 }}
          value={this.state.form.companyType}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Company's Capital"
          style={{ margin: 15 }}
          value={this.state.form.capital}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Currency"
          style={{ margin: 15 }}
          value={this.state.form.currencyUsedForCapital}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Head Office Address"
          style={{ margin: 15 }}
          value={this.state.form.headOfficeAddress}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Head Office City"
          style={{ margin: 15 }}
          value={this.state.form.headOfficeCity}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Head Office Governorate"
          style={{ margin: 15 }}
          value={this.state.form.headOfficeGovernorate}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Legal Form Of Company"
          style={{ margin: 15 }}
          value={this.state.form.legalFormOfCompany}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Regulated Law"
          style={{ margin: 15 }}
          value={this.state.form.regulatedLaw}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Phone Number"
          style={{ margin: 15 }}
          value={this.state.form.phoneNumber}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField disabled
          id="standard-full-width"
          label="Fax Number"
          style={{ margin: 15 }}
          value={this.state.form.fax}
          // helperText="Full width!"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <h2 className="text-center text-info">Managers</h2>
        <Managers managersArray={this.state.managers} />
        <br />
        <div className="dropdown-divider"></div>
        <br />
       </div>
     
    )
  }
}
