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
      .get("api/dcases/")
      .then(res => {
        this.setState({ cases: res.data.data });
        //   const investors = [];
        //   for (let i = 0; i < res.data.data.length; i++) {
        //     const investorId = res.data.data[i].creatorInvestorId;
        //     axios
        //       .get(`api/investors/${investorId}`)
        //       .then(resInvestor => {
        //         // should be .data.data
        //         investors.push(resInvestor.data.fullName);
        //       })
        //       .catch(investorError => {
        //         investors.push("NA");
        //       });
        //   }
        //   this.setState({ cases: res.data.data, investors: investors });
      })
      .catch(err => {
        this.setState({ msg: err.response.data.error });
      });
  }

  render() {
    if (this.state.isCaseExpaned) {
      return (
         <CaseContainer/>
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


export default CasesContainer;
