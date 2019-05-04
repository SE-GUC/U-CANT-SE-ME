import React, { Component } from "react";
import axios from "axios";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import CasesContainerProps from "../dCaseComponents/CasesContainerProps";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class LawyerViewCase extends Component {
  state = {
    cases: [],
    caseid: "",
    lawyerID: "",
    home: 0,
    finished: false
  };
  async componentDidMount() {
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
    const id = this.state.lawyerID;
    await axios.get(`api/lawyers/assigncase/${id}/${index}`);
    alert("You Have Taken This Case");
    this.componentDidMount();
  }
  render() {
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
          <h1> There are no unassigned cases</h1>
        ) : (
          <CasesContainerProps
            cases={this.state.cases}
            currentUserId={this.state.lawyerID}
          />
        );
      }
    }
  }
  handleCaseFullDetails = expandedCase => {
    this.setState({ isCaseExpaned: true });
    this.setState({ expandedCase: expandedCase });
  };
}
