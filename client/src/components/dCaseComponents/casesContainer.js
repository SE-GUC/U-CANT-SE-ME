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
      })
      .catch(err => {
        this.setState({ msg: err.response.data.error });
      });
  }

  render() {
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
