import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import CasePreview from "./CasePreview";
import CaseContainer from "./CaseContainer";

class CasesContainerProps extends Component {
  state = {
    cases: [],
    investors: [],
    isCaseExpaned: false,
    expandedCase: {},
    msg: ""
  };

  async componentDidMount() {
        await this.setState({ cases: this.props.cases });
        console.log(this.state.cases)
  }

  render() {
    if (this.state.isCaseExpaned) {
      return (
        <CaseContainer expandedCase={this.state.expandedCase} />
      );
    } else {
      var counter = 0;
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

}


export default CasesContainerProps;
