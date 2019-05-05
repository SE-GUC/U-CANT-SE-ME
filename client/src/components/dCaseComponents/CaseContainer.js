import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Stepper from "react-stepper-horizontal";
import axios from "axios";
import "../../App.css";
import InfoCard from "./InfoCard";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Fab } from "@material-ui/core";
import PayMyFees from "../PayMyFees/PayMyFeesItem";
import moment from "moment";
import AddComment from "./AddComment";
import UpdateForm from "./UpdateForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import parseJwt from "../../helpers/decryptAuthToken";

const styles = {
  card: {
    borderRadius: 12,
    fontFamily: "Helvetica Neue",
    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
    marginLeft: "5%",
    marginRight: "5%",
    marginButtom: "1%",
    marginTop: "1%",
    textAlign: "left"
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
};

class CaseContainer extends Component {
  state = {
    updateFormClicked: false,
    expandedCase: {},
    investor: {},
    reviewerName: "",
    creatorLawyerName: "",
    assignedLawyerName: "",
    currentUserId: this.props.currentUserId,
    commentsClicked: false,
    finished: false,
    loggedInType: ""
  };

  handleCommentsBack = async () => {
    await this.setState({ commentsClicked: false });
  };

  commentsClicked = async () => {
    await this.setState({ commentsClicked: true });
  };

  handleUpdateFormBack = async () => {
    await this.setState({ updateFormClicked: false });
  };

  updateFormClicked = async () => {
    await this.setState({ updateFormClicked: true });
  };

  acceptLawyer = async caseId => {
    try {
      await axios.put(
        `api/lawyers/updateCaseStatus/${caseId}/WaitingForReviewer`
      );
      window.location.reload();
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  rejectLawyer = async caseId => {
    try {
      await axios.put(`api/lawyers/updateCaseStatus/${caseId}/OnUpdate`);
      window.location.reload();
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  takeLawyer = async caseId => {
    if (
      window.confirm("Are you sure you want to assign yourself to this case ?")
    ) {
      try {
        await axios.get(
          `api/lawyers/assigncase/${this.state.currentUserId}/${caseId}`
        );
        window.location.reload();
      } catch (err) {
        alert(err.response.data.error);
      }
    }
  };
  acceptReviewer = async caseId => {
    try {
      await axios.put(`api/reviewers/updateCaseStatus/${caseId}/Accepted`);
      window.location.reload();
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  rejectReviewer = async caseId => {
    try {
      await axios.put(`api/reviewers/updateCaseStatus/${caseId}/OnUpdate`);
      window.location.reload();
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  takeReviewer = async caseId => {
    if (
      window.confirm("Are you sure you want to assign yourself to this case ?")
    ) {
      try {
        await axios.get(
          `api/reviewers/assigncase/${this.state.currentUserId}/${caseId}`
        );
        window.location.reload();
      } catch (err) {
        alert(err.response.data.error);
      }
    }
  };
  viewDecision = async id => {
    try {
      const decision = await axios.get(`api/lawyers/viewDecision/${id}`);
      var newWindow = window.open("_blank");
      newWindow.document.write(decision.data.data);
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  downloadDecision = async id => {
    axios({
      url: `api/lawyers/downloadDecision/${id}`,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Decision.pdf");
      document.body.appendChild(link);
      link.click();
    });
  };
  viewContract = async id => {
    try {
      const contract = await axios.get(`api/lawyers/viewContract/${id}`);
      var newWindow = window.open("_blank");
      newWindow.document.write(contract.data.data);
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  downloadContract = async id => {
    axios({
      url: `api/lawyers/downloadContract/${id}`,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Contract.pdf");
      document.body.appendChild(link);
      link.click();
    });
  };
  async componentDidMount() {
    const data = await parseJwt(localStorage.jwtToken);
    await this.setState({ loggedInType: data.type });

    await this.setState({ currentUserId: this.props.currentUserId });
    axios
      .get(`api/investors/${this.props.expandedCase.creatorInvestorId}`)
      .then(async res => {
        await this.setState({ investor: res.data.data });
      })
      .catch(err => {
        this.setState({ investor: "NA" });
      });

    if (this.props.creatorLawyerId)
      axios
        .get(`api/lawyers/${this.props.expandedCase.creatorLawyerId}`)
        .then(async res => {
          await this.setState({ creatorLawyerName: res.data.fullName });
        })
        .catch(err => {
          this.setState({ creatorLawyerName: "NA" });
        });

    if (this.props.assignedReviewerId)
      axios
        .get(`api/lawyers/${this.props.expandedCase.assignedReviewerId}`)
        .then(async res => {
          await this.setState({ reviewerName: res.data.fullName });
        })
        .catch(err => {
          this.setState({ reviewerName: "NA" });
        });

    if (this.props.assignedLawyerId)
      axios
        .get(`api/lawyers/${this.props.expandedCase.assignedLawyerId}`)
        .then(async res => {
          await this.setState({ assignedLawyerName: res.data.fullName });
        })
        .catch(err => {
          this.setState({ assignedLawyerName: "NA" });
        });

    axios
      .get(`api/lawyers/${this.props.expandedCase.assignedLawyerId}`)
      .then(async res => {
        await this.setState({ assignedLawyerName: res.data.fullName });
      })
      .catch(err => {
        this.setState({ assignedLawyerName: "NA" });
      });
    await this.setState({ finished: true });
  }

  formatTime(t) {
    return moment
      .utc(t.substring(0, 23))
      .format("DD, MMM, YYYY")
      .toUpperCase();
  }

  handleTextBox = event => {
    this.setState({ text: event.target.value });
  };

  render() {
    if (!this.state.finished) {
      return (
        <div>
          <CircularProgress style={{ marginTop: "50px" }} />
          <h3>Fetching Data</h3>
        </div>
      );
    } else {
      const classes = { ...styles };
      const expandedCase = this.props.expandedCase;

      var formFields = [];
      var caseComments = [];
      for (let atr in expandedCase.form) {
        let field = {
          fieldName: camelCaseToText(atr),
          fieldValue: expandedCase.form[atr]
        };
        formFields.push(field);
      }

      for (let i = 0; i < expandedCase.comments.length; i++) {
        let field = {
          fieldName: expandedCase.comments[i].author,
          fieldValue: expandedCase.comments[i].body
        };
        caseComments.push(field);
      }

      var stepperCounter = 0;
      var finalstate = "Accepted";
      if (expandedCase.caseStatus === "OnUpdate") stepperCounter = 0;
      if (expandedCase.caseStatus === "WaitingForLawyer") stepperCounter = 1;
      if (expandedCase.caseStatus === "AssignedToLawyer") stepperCounter = 2;
      if (expandedCase.caseStatus === "WaitingForReviewer") stepperCounter = 3;
      if (expandedCase.caseStatus === "AssignedToReviewer") stepperCounter = 4;
      if (expandedCase.caseStatus === "Accepted") stepperCounter = 5;
      if (expandedCase.caseStatus === "Rejected") {
        stepperCounter = 5;
        finalstate = "Rejected";
      }
      if (expandedCase.caseStatus === "Established") {
        stepperCounter = 6;
      }

      let buttonAccept;
      let buttonReject;
      let buttonPaying;
      let buttonTakeLawyer;
      let buttonTakeReviewer;
      let buttoncontract;
      let buttondownload;
      let updateFormButton;
      let comments = (
        <Fab
          id="comments "
          variant="extended"
          size="large"
          color="secondary"
          style={{
            color: "#FFFFFF",
            height: "31px",
            width: "107px",
            fontSize: "13px",
            boxShadow: "none",
            marginRight: "240px",
            marginTop: "6px",
            display: "block",
            margin: "0 auto"
          }}
          aria-label="Delete"
          onClick={this.commentsClicked.bind(this)}
        >
          {"Comments"}
        </Fab>
      );

      if (
        (this.state.currentUserId ===
          this.props.expandedCase.creatorInvestorId ||
          this.state.currentUserId ===
            this.props.expandedCase.creatorLawyerId) &&
        this.props.expandedCase.caseStatus === "OnUpdate"
      ) {
        updateFormButton = (
          <Fab
            id="updateForm "
            variant="extended"
            size="large"
            color="secondary"
            style={{
              color: "#FFFFFF",
              height: "31px",
              width: "107px",
              fontSize: "13px",
              boxShadow: "none",
              marginRight: "240px",
              marginTop: "6px",
              display: "block",
              margin: "0 auto"
            }}
            aria-label="Delete"
            onClick={this.updateFormClicked.bind(this)}
          >
            {"Update Form"}
          </Fab>
        );
      }

      if (
        (this.state.currentUserId ===
          this.props.expandedCase.assignedLawyerId ||
          this.state.currentUserId ===
            this.props.expandedCase.creatorLawyerId) &&
        this.props.expandedCase.caseStatus !== "WaitingForLawyer"
      ) {
        buttonAccept = (
          <Fab
            id="AcceptLawyer "
            variant="extended"
            size="large"
            color="secondary"
            style={{
              color: "#FFFFFF",
              height: "31px",
              width: "107px",
              fontSize: "13px",
              boxShadow: "none",
              marginRight: "240px",
              marginTop: "6px",
              display: "block",
              margin: "0 auto"
            }}
            aria-label="Delete"
            onClick={this.acceptLawyer.bind(this, this.props.expandedCase._id)}
          >
            {"Accept"}
          </Fab>
        );

        buttonReject = (
          <Fab
            id="RejectLawyer"
            variant="extended"
            size="large"
            color="secondary"
            style={{
              color: "#FFFFFF",
              height: "31px",
              width: "107px",
              fontSize: "13px",
              boxShadow: "none",
              marginRight: "240px",
              marginTop: "6px",
              display: "block",
              margin: "0 auto"
            }}
            aria-label="Delete"
            onClick={this.rejectLawyer.bind(this, this.props.expandedCase._id)}
          >
            {"Reject"}
          </Fab>
        );

        if (this.props.expandedCase.companyType === "SPC") {
          buttoncontract = (
            <Fab
              id="View"
              variant="extended"
              size="large"
              color="secondary"
              style={{
                color: "#FFFFFF",
                height: "31px",
                width: "107px",
                fontSize: "13px",
                boxShadow: "none",
                marginRight: "240px",
                marginTop: "6px",
                display: "block",
                margin: "0 auto"
              }}
              aria-label="Delete"
              onClick={this.viewDecision.bind(
                this,
                this.props.expandedCase._id
              )}
            >
              {"View Decision"}
            </Fab>
          );

          buttondownload = (
            <Fab
              id="Download"
              variant="extended"
              size="large"
              color="secondary"
              style={{
                color: "#FFFFFF",
                height: "31px",
                width: "107px",
                fontSize: "13px",
                boxShadow: "none",
                marginRight: "240px",
                marginTop: "6px",
                display: "block",
                margin: "0 auto"
              }}
              aria-label="Delete"
              onClick={this.downloadDecision.bind(
                this,
                this.props.expandedCase._id
              )}
            >
              {"Download Decision"}
            </Fab>
          );
        } else if (this.props.expandedCase.companyType === "SSC") {
          buttoncontract = (
            <Fab
              id="View"
              variant="extended"
              size="large"
              color="secondary"
              style={{
                color: "#FFFFFF",
                height: "31px",
                width: "107px",
                fontSize: "13px",
                boxShadow: "none",
                marginRight: "240px",
                marginTop: "6px",
                display: "block",
                margin: "0 auto"
              }}
              aria-label="Delete"
              onClick={this.viewContract.bind(
                this,
                this.props.expandedCase._id
              )}
            >
              {"View Contract"}
            </Fab>
          );

          buttondownload = (
            <Fab
              id="Download"
              variant="extended"
              size="large"
              color="secondary"
              style={{
                color: "#FFFFFF",
                height: "31px",
                width: "107px",
                fontSize: "13px",
                boxShadow: "none",
                marginRight: "240px",
                marginTop: "6px",
                display: "block",
                margin: "0 auto"
              }}
              aria-label="Delete"
              onClick={this.downloadContract.bind(
                this,
                this.props.expandedCase._id
              )}
            >
              {"Download Contract"}
            </Fab>
          );
        }
      }

      if (
        this.state.currentUserId ===
          this.props.expandedCase.assignedReviewerId &&
        this.props.expandedCase.caseStatus !== "WaitingForReviewer"
      ) {
        buttonAccept = (
          <Fab
            variant="extended"
            size="large"
            color="secondary"
            style={{
              color: "#FFFFFF",
              height: "31px",
              width: "107px",
              fontSize: "13px",
              boxShadow: "none",
              marginRight: "240px",
              marginTop: "6px",
              display: "block",
              margin: "0 auto"
            }}
            aria-label="Delete"
            onClick={this.acceptReviewer.bind(
              this,
              this.props.expandedCase._id
            )}
          >
            {"Accept"}
          </Fab>
        );

        buttonReject = (
          <Fab
            variant="extended"
            size="large"
            color="secondary"
            style={{
              color: "#FFFFFF",
              height: "31px",
              width: "107px",
              fontSize: "13px",
              boxShadow: "none",
              marginRight: "240px",
              marginTop: "6px",
              display: "block",
              margin: "0 auto"
            }}
            aria-label="Delete"
            onClick={this.rejectReviewer.bind(
              this,
              this.props.expandedCase._id
            )}
          >
            {"Reject"}
          </Fab>
        );
      }

      if (
        this.state.currentUserId ===
          this.props.expandedCase.creatorInvestorId &&
        this.props.expandedCase.caseStatus === "Accepted"
      ) {
        buttonPaying = (
          <div style = {{marginLeft: "2.5%", marginTop: "1%"}}>
            <PayMyFees
              investorId={this.state.investor._id}
              caseId={this.props.expandedCase._id}
            />
          </div>
        );
      }

      if (
        this.props.expandedCase.caseStatus === "WaitingForLawyer" &&
        this.state.loggedInType !== "investor"
      ) {
        buttonTakeLawyer = (
          <Fab
            variant="extended"
            size="large"
            color="secondary"
            style={{
              color: "#FFFFFF",
              height: "31px",
              width: "107px",
              fontSize: "13px",
              boxShadow: "none",
              marginRight: "240px",
              marginTop: "6px",
              display: "block",
              margin: "0 auto"
            }}
            aria-label="Delete"
            onClick={this.takeLawyer.bind(this, this.props.expandedCase._id)}
          >
            {"Start Reviewing"}
          </Fab>
        );
      }
      if (
        this.props.expandedCase.caseStatus === "WaitingForReviewer" &&
        this.state.loggedInType !== "investor"
      ) {
        buttonTakeReviewer = (
          <Fab
            variant="extended"
            size="large"
            color="secondary"
            style={{
              color: "#FFFFFF",
              height: "31px",
              width: "107px",
              fontSize: "13px",
              boxShadow: "none",
              marginRight: "240px",
              marginTop: "6px",
              display: "block",
              margin: "0 auto"
            }}
            aria-label="Delete"
            onClick={this.takeReviewer.bind(this, this.props.expandedCase._id)}
          >
            {"Start Reviewing"}
          </Fab>
        );
      }
      if (this.state.commentsClicked === true) {
        return (
          <AddComment
            caseID={this.props.expandedCase._id}
            handleCommentsBack={this.handleCommentsBack}
            classes={classes}
          />
        );
      } else if (this.state.updateFormClicked) {
        return (
          <UpdateForm
            case={this.props.expandedCase}
            handleUpdateFormBack={this.handleUpdateFormBack}
          />
        );
      } else {
        return (
          <div>
            <Fab
              variant="extended"
              size="large"
              color="secondary"
              style={{
                color: "#FFFFFF",
                height: "31px",
                width: "107px",
                fontSize: "13px",
                boxShadow: "none",
                margin: "0 auto"
              }}
              aria-label="Delete"
              onClick={this.props.handleBack}
            >
              {"Back"}
            </Fab>
            <InfoCard
              infoTitle={"Case Info"}
              fields={[
                {
                  fieldName: "Company type    ",
                  fieldValue: expandedCase.companyType
                },
                {
                  fieldName: "Date of creation",
                  fieldValue: this.formatTime(expandedCase.caseCreationDate)
                }
              ]}
            />

            <InfoCard infoTitle={"Form Info"} fields={formFields} />
            <br />
            {updateFormButton}

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
                  <h3> {"Case Progress"} </h3>
                  <Stepper
                    steps={[
                      { title: "On Update" },
                      { title: "Waiting For Lawyer" },
                      { title: "Assigned To Lawyer" },
                      { title: "Waiting For Reviewer" },
                      { title: "Assigned To Reviewer" },
                      { title: finalstate },
                      { title: "Established" }
                    ]}
                    activeStep={stepperCounter}
                  />
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={classes.card}>
              <CardContent>
                <div variant="h5" component="h2">
                  <h3> {"Case Fees"} </h3>

                  <div style={classes.root}>
                    <Typography component="h4">
                      {isNaN(calcFees(this.props.expandedCase)) ? (
                        "Unkown, Please contact us for help"
                      ) : (
                        <div
                          style={{
                            fontSize: "36px",
                            marginLeft: "10%",
                            marginTop: "7%"
                          }}
                        >
                          {calcFees(this.props.expandedCase) + " EGP"}
                        </div>
                      )}
                    </Typography>
                  </div>
                </div>

                {buttonPaying}
              </CardContent>
            </Card>
            <br />
            <br />
            <br />
            <br />
            <div
              style={{
                align: "center",
                display: "flex",
                marginTop: "-50px",
                marginBottom: "20px"
              }}
            >
              {comments}
              {buttonAccept}
              {buttoncontract}
              {buttondownload}
              {buttonReject}
              {buttonTakeLawyer}
              {buttonTakeReviewer}
            </div>
          </div>
        );
      }
    }
  }
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

export default CaseContainer;
