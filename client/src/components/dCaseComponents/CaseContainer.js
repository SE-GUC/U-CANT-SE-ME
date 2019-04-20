import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper from 'react-stepper-horizontal'
import axios from "axios";
import "../../App.css";
import InfoCard from "./InfoCard";
import { Button } from "@material-ui/core";



class CaseContainer extends Component {
    state = {
        expandedCase: {},
        investor: {},
        reviewerName: "",
        creatorLawyerName: "",
        assignedLawyerName: ""
    };


    componentDidMount() {
        axios
            .get(`api/investors/${this.props.expandedCase.creatorInvestorId}`)
            .then(res => {
                this.setState({ investor: res.data });
            })
            .catch(err => {
                this.setState({ investor: "NA" });
            })

        if (this.props.creatorLawyerId)
            axios
                .get(`api/lawyers/${this.props.expandedCase.creatorLawyerId}`)
                .then(res => {
                    this.setState({ creatorLawyerName: res.data.fullName });
                })
                .catch(err => {
                    this.setState({ creatorLawyerName: "NA" });
                })

        if (this.props.assignedReviewerId)
            axios
                .get(`api/lawyers/${this.props.expandedCase.assignedReviewerId}`)
                .then(res => {
                    this.setState({ reviewerName: res.data.fullName });
                })
                .catch(err => {
                    this.setState({ reviewerName: "NA" });
                })

        if (this.props.assignedLawyerId)
            axios
                .get(`api/lawyers/${this.props.expandedCase.assignedLawyerId}`)
                .then(res => {
                    this.setState({ assignedLawyerName: res.data.fullName });
                })
                .catch(err => {
                    this.setState({ assignedLawyerName: "NA" });
                })

    }

    render() {
      
        var stepperCounter = 0;
        var finalstate = 'Accepted';
        if (this.props.expandedCase.caseStatus == 'OnUpdate')
            stepperCounter = 0
        if (this.props.expandedCase.caseStatus == 'WaitingForLawyer')
            stepperCounter = 1
        if (this.props.expandedCase.caseStatus == 'AssignedToLawyer')
            stepperCounter = 2
        if (this.props.expandedCase.caseStatus == 'WaitingForReviewer')
            stepperCounter = 3
        if (this.props.expandedCase.caseStatus == 'AssignedToReviewer')
            stepperCounter = 4
        if (this.props.expandedCase.caseStatus == 'Accepted')
            stepperCounter = 5
        if (this.props.expandedCase.caseStatus == 'Rejected'){
            stepperCounter = 5
            finalstate= 'Rejected'
        }

        console.log(this.props.expandedCase.caseStatus)

        return <div>
            <InfoCard
              infoTitle={"Company info."}
              fields={[
                  {
                      fieldName:"first info" ,
                      fieldValue:"this is info"
                  },
                  {
                    fieldName:"second info" ,
                    fieldValue:"this is info"
                 },

              ]}
            />
            {/* <Paper style={classes.root} elevation={1}>
                <Typography variant="h2" component="h3">
                    {this.props.expandedCase.form.companyNameArabic}
                </Typography>
                <Typography component="p">
                    Type of the company : {this.props.expandedCase.companyType}
                </Typography>
                <Typography component="p">
                    Date of case creation :  {this.props.expandedCase.caseCreationDate}
                </Typography>
                <Typography component="p">
                    Investor name :  {this.state.investor.fullName}
                </Typography>
                <Typography component="p">
                    Investor email :  {this.state.investor.email}
                </Typography>
                <Typography component="p">
                    Investor fax :  {this.state.investor.fax}
                </Typography>
                <Typography component="p">
                    Investor telephone number :  {this.state.investor.telephoneNumber}
                </Typography>
                <Typography component="p">
                    Investor telephone number :  {this.state.investor.telephoneNumber}
                </Typography>
                <Typography component="p">
                    Reviewer name :  {this.state.reviewerName}
                </Typography>
                <Typography component="p">
                    Creator lawyer name :  {this.state.creatorLawyerName}
                </Typography>
                <Typography component="p">
                    Assigned lawyer name :  {this.state.assignedLawyerName}
                </Typography>
              
                <Typography component="p">
                    <Stepper steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: finalstate }]} activeStep={stepperCounter} />
                </Typography>
                 

            </Paper> */}
        </div>
    }
}


export default (CaseContainer);
