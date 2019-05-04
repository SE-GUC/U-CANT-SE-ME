import React, { Component } from "react";
import axios from "axios";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import CasesContainerProps from "../dCaseComponents/CasesContainerProps";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class LawyerViewTasks extends Component {
  state = {
    cases: [],
    caseid: "",
    lawyerId: "",
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
    await this.setState({ home: 2 });
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({ lawyerId: data.id });
    const id = this.state.lawyerId;
    const getCases = await axios.get(`api/lawyers/lawyerTasks/${id}`);
    await this.setState({ cases: getCases.data.Tasks });
    await this.setState({ finished: true });
  }
  accept = async caseId => {
    try {
      await axios.put(
        `api/lawyers/updateCaseStatus/${caseId}/WaitingForReviewer`
      );
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
          <h1>You dont have any cases.</h1>
        ) : (
          <header className="LawyerViewTasks">
            <div>
              <CasesContainerProps
                cases={this.state.cases}
                currentUserId={this.state.lawyerId}
              />
            </div>
          </header>
        );
      }
    }
  }
}
