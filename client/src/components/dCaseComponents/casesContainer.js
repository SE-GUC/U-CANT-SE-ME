import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import casePreview from "./casePreview";

class casesContainer extends Component {
  state = {
    cases: [],
    msg: ""
  };

  componentDidMount() {
    axios
      .get("api/cases/")
      .then(res => {
        if (res.data.data) {
          this.setState({ cases: res.data.data });
        }
      })
      .catch(err => {
        this.setState({ msg: err.response.data.error });
      });
  }

  render() {
    return this.state.cases.map(Case => (
      <casePreview key={Case._id} case={Case} />
    ));
  }
}
export default casesContainer;
