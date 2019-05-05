import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import CasesContainerProps from "../dCaseComponents/CasesContainerProps";
import CircularProgress from "@material-ui/core/CircularProgress";

class MyCompanies extends Component {
  state = {
    cases: [],
    msg: "",
    investorid: "",
    home: 0,
    finished: false
  };

  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try {
      await axios.get("../api/investors/auth");
    } catch (err) {
      alert("You are not allowed to access this page");
      this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({ investorid: data.id });
    const id = this.state.investorid;
    axios
      .get(`../api/investors/myCompanies/${id}`)
      .then(res => {
        if (Array.isArray(res.data.data))
          this.setState({ cases: res.data.data });
        else {
          this.setState({ msg: res.data.msg });
        }
      })
      .catch(err => {
        this.setState({ msg: err.response.data.error });
      });
    await this.setState({ finished: true });
  }

  render() {
    if (this.state.home === 0) return <div />;
    if (this.state.home === 1) return <Redirect to={{ pathname: "/" }} />;
    if (!this.state.finished) {
      return (
        <div>
          <CircularProgress style={{ marginTop: "50px" }} />
          <h3>Fetching Data</h3>
        </div>
      );
    } else {
      return this.state.cases.length === 0 ? (
        <h1>{this.state.msg}</h1>
      ) : (
        <CasesContainerProps
          cases={this.state.cases}
          currentUserId={this.state.investorid}
        />
      );
    }
  }
}
export default MyCompanies;
