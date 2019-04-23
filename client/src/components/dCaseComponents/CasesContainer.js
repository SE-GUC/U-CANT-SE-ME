import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import CasePreview from "./CasePreview";
import CaseContainer from "./CaseContainer";

class CasesContainer extends Component {
  state = {
    cases: [],
    investors: [],
    isCaseExpaned: false,
    expandedCase: {},
    msg: ""
  };

  componentDidMount() {
    axios
      .get("api/cases/")
      .then(res => {
        this.setState({ cases: res.data.data });
      })
      .catch(err => {
        this.setState({ msg: err.response.data.error });
      });
  }

  render() {
    if (this.state.isCaseExpaned) {
      return (
        <CaseContainer expandedCase={this.state.expandedCase} handleBack={this.handleBack} />
      );
    } else {
      return (
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.cases.map(Case => (
            <CasePreview
              key={Case._id}
              case={Case}
              handleCaseFullDetails={this.handleCaseFullDetails}
            />
          ))}
        </ul>
      );
    }
  }

  handleCaseFullDetails = (expandedCase) => {
    this.setState({ isCaseExpaned: true })
    this.setState({ expandedCase: expandedCase })
  }
  handleBack = () => {
    this.setState({ isCaseExpaned: false })
    this.setState({ expandedCase: {} })
  }

}


export default CasesContainer;
