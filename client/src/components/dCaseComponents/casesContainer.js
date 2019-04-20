import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import CasePreview from "./CasePreview";

class CasesContainer extends Component {
  state = {
    cases: [],
    investors: [],
    msg: ""
  };

  componentDidMount() {
    axios
      .get("api/dcases/")
      .then(res => {
        this.setState({cases:res.data.data});
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
    var counter = 0;
    return (
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {this.state.cases.map(Case => (
          <CasePreview
            key={Case._id}
            case={Case}
          />
        ))}
      </ul>
    );
  }
}
export default CasesContainer;
