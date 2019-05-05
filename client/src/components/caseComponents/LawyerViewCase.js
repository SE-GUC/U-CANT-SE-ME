import React, { Component } from "react";
import axios from "axios";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import CasesContainerProps from "../dCaseComponents/CasesContainerProps";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBar from "../snackbar";

export default class LawyerViewCase extends Component {
  state = {
    cases: [],
    caseid: "",
    lawyerID: "",
    home: 0,
    finished: false,
    alerted: false,
    alertType: "",
    alertMsg: ""
  };
  async componentDidMount() {
    await this.setState({ finished: false });
    if (!localStorage.jwtToken) {
      alert("You must login!");
      await this.setState({ home: 1 });
      return;
    }
    try {
      await axios.get("api/lawyers/auth");
    } catch (err) {
      alert("You are not allowed to access this page");
      await this.setState({ home: 1 });
      return;
    }
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({ lawyerID: data.id });
    const id = this.state.lawyerID;
    const getCases = await axios.get(`api/lawyers/getAllUnsignedCases/${id}`);
    await this.setState({ cases: getCases.data.data });
    await this.setState({ home: 2 });
    await this.setState({ finished: true });
  }

  async handelClick(index) {
    await this.setState({ alerted: false, alertType: "", alertMsg: "" });
    const id = this.state.lawyerID;
    await axios.get(`api/lawyers/assigncase/${id}/${index}`);
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
          </div>
        );
      } else {
        return this.state.cases.length === 0 ? (
          <div>
            <h1> There are no unassigned cases</h1>
            {alertSnack}
          </div>
        ) : (
          <div>
            <CasesContainerProps
              cases={this.state.cases}
              currentUserId={this.state.lawyerID}
            />
            {alertSnack}
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
