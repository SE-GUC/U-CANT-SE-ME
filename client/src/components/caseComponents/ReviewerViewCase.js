import React, { Component } from "react";
import axios from "axios";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import CasesContainerProps from "../dCaseComponents/CasesContainerProps";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBar from "../snackbar";

export default class ReviewerViewCase extends Component {
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
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({ reviwerID: data.id });
    const id = this.state.reviwerID;

    const getCases = await axios.get(`api/reviewers/getAllUnsignedCases/${id}`);
    await this.setState({ cases: getCases.data.data });
    await this.setState({ home: 2 });
    await this.setState({ finished: true });
  }

  async handelClick(index) {
    await this.setState({ alerted: false, alertType: "", alertMsg: "" });
    const id = this.state.reviwerID;
    await axios.get(`api/reviewers/assigncase/${id}/${index}`);
    await this.setState({
      alerted: true,
      alertType: "success",
      alertMsg: "You Have Taken This Case"
    });
    this.componentDidMount();
  }
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
            {alertSnack}
          </div>
        );
      } else {
        return this.state.cases.length === 0 ? (
          <h1> There are no unassigned cases</h1>
        ) : (
          <div>
            {alertSnack}
            <CasesContainerProps
              cases={this.state.cases}
              currentUserId={this.state.reviwerID}
            />
          </div>
        );
      }
    }
  }
  handleCaseFullDetails = expandedCase => {
    this.setState({ isCaseExpaned: true });
    this.setState({ expandedCase: expandedCase });
  };
}
