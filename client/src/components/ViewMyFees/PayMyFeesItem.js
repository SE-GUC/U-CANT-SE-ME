import React, { Component } from "react";
import axios from "axios";

class PayMyFees extends Component {

  onClick = () => {
      console.log(this.props.investorId);
      console.log(this.props.caseId);
  };

  render() {
    return (
      <button onClick={this.onClick} style={btnStyle}>
        Pay Fees
      </button>
    );
  }
}

const btnStyle = {
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inlineBlock",
  fontSize: "16px"
};

export default PayMyFees;
