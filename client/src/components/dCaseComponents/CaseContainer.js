import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper from 'react-stepper-horizontal'
import axios from "axios";
import "../../App.css";
import InfoCard from "./InfoCard";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import PayMyFees from "../PayMyFees/PayMyFeesItem";

const styles = {
    card: {
        borderRadius: 12,
        fontFamily: "Helvetica Neue",
        boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
        marginLeft: "5%",
        marginRight: "5%",
        marginButtom: "1%",
        marginTop: "1%",
    },
    media: {
        height: 140
    },
    root: {
        width: 345
    },
    button: {
        background: "none",

        border: "none",
        fontSize: "16px",
        outline: "none",
        cursor: "pointer",
        color: "#FFFFFF",
        fontWeight: "bold",
        marginTop: "2%",
        marginRight: "2%",
        borderRadius: "1000px",
        backgroundColor: "#E53167",
        fontStyle: "Helvatica Neue"
    }

}


class CaseContainer extends Component {
    state = {
        expandedCase: {},
        investor: {},
        reviewerName: "",
        creatorLawyerName: "",
        assignedLawyerName: "",
        currentUserId: "5ca76f5f00b48e09001936e7"
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
        const classes = { ...styles };
        const expandedCase = this.props.expandedCase;

        var formFields = []
        var caseComments = []
        console.log(this.props.expandedCase.form)
        for (let atr in expandedCase.form) {
            let field = {
                fieldName: camelCaseToText(atr),
                fieldValue: expandedCase.form[atr]
            }
            formFields.push(field)
        }

        for (let i = 0; i < expandedCase.comments.length; i++) {
            let field = {
                fieldName: expandedCase.comments[i].author,
                fieldValue: expandedCase.comments[i].body
            }
            caseComments.push(field)
        }


        var stepperCounter = 0;
        var finalstate = 'Accepted';
        if (expandedCase.caseStatus == 'OnUpdate')
            stepperCounter = 0
        if (expandedCase.caseStatus == 'WaitingForLawyer')
            stepperCounter = 1
        if (expandedCase.caseStatus == 'AssignedToLawyer')
            stepperCounter = 2
        if (expandedCase.caseStatus == 'WaitingForReviewer')
            stepperCounter = 3
        if (expandedCase.caseStatus == 'AssignedToReviewer')
            stepperCounter = 4
        if (expandedCase.caseStatus == 'Accepted')
            stepperCounter = 5
        if (expandedCase.caseStatus == 'Rejected') {
            stepperCounter = 5
            finalstate = 'Rejected'
        }
        if (expandedCase.caseStatus == 'Established') {
            stepperCounter = 6
        }

        let buttonAccept
        let buttonReject
        if (this.state.currentUserId == this.props.expandedCase.assignedLawyerId||this.state.currentUserId == this.props.expandedCase.creatorLawyerId) {
            buttonAccept =   <button onClick={axios.get(`api/lawyers/updateCaseStatus/${this.props.expandedCase._id}/Accepted`)} >
            Accept
          </button>

            buttonReject =    <button onClick={axios.get(`api/lawyers/updateCaseStatus/${this.props.expandedCase._id}/Rejected`)} >
            Reject
          </button>

        }

        if (this.state.currentUserId == this.props.expandedCase.assignedReviewerId) {
            buttonAccept =   <button onClick={axios.get(`api/reviewers/updateCaseStatus/${this.props.expandedCase._id}/Accepted`)} >
            Accept
          </button>

            buttonReject =    <button onClick={axios.get(`api/reviewers/updateCaseStatus/${this.props.expandedCase._id}/Rejected`)} >
            Reject
          </button>

        }


        return <div>
            <InfoCard
                infoTitle={"Case Info"}
                fields={[
                    {
                        fieldName: "Company type    ",
                        fieldValue: expandedCase.companyType
                    },
                    {
                        fieldName: "Date of creation",
                        fieldValue: expandedCase.caseCreationDate
                    },
                    
                ]}
                
                />

            <InfoCard
                infoTitle={"Form Info"}
                
                fields={formFields}
                
                />

            <InfoCard
                infoTitle={"Investor Info"}
                fields={[
                    {
                        fieldName: "Investor name    ",
                        fieldValue: this.state.investor.fullName
                    },
                    {
                        fieldName: "Investor Nationality  ",
                        fieldValue: this.state.investor.nationality

                    },
                    {
                        fieldName: "Investor email    ",
                        fieldValue: this.state.investor.email
                        
                    },
                    {
                        fieldName: "Investor telephone number   ",
                        fieldValue: this.state.investor.telephoneNumber
                        
                    },
                    {
                        fieldName: "Investor fax    ",
                        fieldValue: this.state.investor.fax
                        
                    }
                ]}
                />


            <Card style={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography component="p">
                            <h3> {"Case Progress"} </h3>
                            <Stepper steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: finalstate }, { title: 'Established' }]} activeStep={stepperCounter} />
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>

            <Card style={classes.card}>
                <CardActionArea>
                    <CardContent>

                        <div gutterBottom variant="h5" component="h2">
                            <h3> {"Case Fees"} </h3>

                            <div style={classes.root}>
                                <Typography component="h4">
                                    {calcFees(this.props.expandedCase)}
                                </Typography>
                            </div>

                        </div>


                        <PayMyFees investorId={this.state.investor._id} caseId={this.props.expandedCase._id} />



                    </CardContent>
                </CardActionArea>
            </Card>

            <InfoCard
                infoTitle={"Comments"}
                
                fields={caseComments}
                
                />

              {buttonAccept}
              {buttonReject}
        </div>


}
}

function textToCamelCase(str) {
    let tokens = str.toLowerCase().split(" ").filter(s => s.length > 0);
    let res = "";
    for (let i = 0; i < tokens.length; i++)
    res += i > 0 ? tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1) : tokens[i];
    return res;
}

function camelCaseToText(str) {
    let res = str.length > 0 ? str[0].toUpperCase() : "";
    for (let i = 1; i < str.length; i++)
        res += (str[i] === str[i].toUpperCase() ? " " : "") + str[i];
    return res;
}

function calcFees(case1) {
    if (case1.form.regulatedLaw && case1.form.regulatedLaw.includes("72")) {
        return 610;
    }
    const capital = case1.form.capital;
    let ans = 56;
    ans += Math.min(1000, Math.max(100, capital / 1000.0));
    ans += Math.min(1000, Math.max(10, capital / 400.0));
    return ans;
}


export default (CaseContainer);
