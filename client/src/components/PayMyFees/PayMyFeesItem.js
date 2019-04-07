import React, { Component } from "react";
import PayMyFees from "./PayMyFees";
import axios from "axios";

class PayMyFeesItem extends Component {
  state = { clicked: false, completed: false, failed: false };

  onClick = () => {
    this.setState({
      clicked: !this.state.clicked,
      completed: false,
      failed: false
    });
  };

  submitAction = verdict => {
    this.setState({
      clicked: false,
      completed: verdict.completed,
      failed: verdict.failed
    });
  };

  render() {
    const { clicked, completed, failed } = this.state;
    if (clicked) {
      return (
        <React.Fragment>
          <PayMyFees
            investorId={this.props.investorId}
            caseId={this.props.caseId}
            submitAction={this.submitAction}
          />
          <button onClick={this.onClick} style={cancelBtnStyle}>
            cancel
          </button>
        </React.Fragment>
      );
    } else {
      if (failed)
        alert("Payment Failed! Please check your card information!");
      if (completed) alert("Payment has been received successfully");
      return (
        <button onClick={this.onClick} style={payBtnStyle}>
          Pay Fees
        </button>
      );
    }
  }
}

const payBtnStyle = {
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inlineBlock",
  fontSize: "16px",
  borderRadius: "25px"
};

const cancelBtnStyle = {
  backgroundColor: "#f54029",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inlineBlock",
  fontSize: "16px",
  borderRadius: "25px"
};

export default PayMyFeesItem;
