import React, { Component } from "react";
import axios from "axios";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import CasesContainerProps from "../dCaseComponents/CasesContainerProps";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBar from "../snackbar";

export default class ReviewerViewTasks extends Component {
  state = {
    cases: [],
    caseid: "",
    reviwerID: "",
    home: 0,
    finished: false,
    alerted: false,
    alertType: "",
    alertMsg: ""
  };

  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      await this.setState({ home: 1 });
      return;
    }
    try {
      await axios.get("api/reviewers/auth");
    } catch (err) {
      alert("You are not allowed to access this page");
      await this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({ reviwerID: data.id });
    const id = this.state.reviwerID;
    const getCases = await axios.get(`api/reviewers/reviewerTasks/${id}`);
    await this.setState({ cases: getCases.data.Tasks });
    await this.setState({ finished: true });
  }
  accept = async caseId => {
    await this.setState({ alerted: false, alertType: "", alertMsg: "" });
    try {
      await axios.put(`api/reviewers/updateCaseStatus/${caseId}/Accepted`);
      await this.setState({
        alerted: true,
        alertType: "success",
        alertMsg: "You Have Accepted this Case"
      });
      const newArr = this.state.cases.filter(function(value, index, arr) {
        return caseId === value._id;
      });
      if (this.state.cases.length === 1) this.setState({ cases: [] });
      else this.setState({ cases: newArr });
    } catch (error) {
      throw error;
    }
  };
  render() {
    let alertSnack;
    if (this.state.alerted)
      alertSnack = (
        <SnackBar
          message={this.state.alertMsg}
          variant={this.state.alertType}
        />
      );
    if (this.state.home === 0) return <div />;
    if (this.state.home === 1) return <Redirect to={{ pathname: "/" }} />;
    else {
      if (!this.state.finished) {
        return (
          <div>
            <CircularProgress style={{ marginTop: "50px" }} />
            <h3>Fetching Data</h3>
          </div>
        );
      } else {
        return this.state.cases.length === 0 ? (
          <h1>You don't have any cases.</h1>
        ) : (
          <header className="ReviewerViewTasks">
            <div>
              <CasesContainerProps
                cases={this.state.cases}
                currentUserId={this.state.reviwerID}
              />
              {alertSnack}
            </div>
          </header>
        );
      }
    }
  }
}
