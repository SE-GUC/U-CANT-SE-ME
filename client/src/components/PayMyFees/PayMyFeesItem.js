import React, { Component } from "react";
import PayMyFees from "./PayMyFees";
import SnackBar from "../snackbar";

class PayMyFeesItem extends Component {
  state = {
    clicked: false,
    completed: false,
    failed: false,
    alerted: false,
    alertType: "",
    alertMsg: ""
  };

  onClick = async () => {
    await this.setState({ alerted: false, alertType: "", alertMsg: "" });
    this.setState({
      clicked: !this.state.clicked,
      completed: false,
      failed: false
    });
  };

  submitAction = async verdict => {
    await this.setState({ alerted: false, alertType: "", alertMsg: "" });
    this.setState({
      clicked: false,
      completed: verdict.completed,
      failed: verdict.failed
    });
    if (this.state.failed) {
      await this.setState({
        alerted: true,
        alertType: "error",
        alertMsg: "Payment Failed! Please check your card information!"
      });
    }
    if (this.state.completed) {
      await this.setState({
        alerted: true,
        alertType: "success",
        alertMsg:
          "Payment has been received successfully, your Company has been established!"
      });
    }
  };

  render() {
    let alertSnack;
    if (this.state.alerted)
      alertSnack = (
        <SnackBar
          message={this.state.alertMsg}
          variant={this.state.alertType}
        />
      );

    const { clicked } = this.state;
    if (clicked) {
      return (
        <React.Fragment>
          <PayMyFees
            investorId={this.props.investorId}
            caseId={this.props.caseId}
            submitAction={this.submitAction}
          />
          {alertSnack}
          <button onClick={this.onClick} style={cancelBtnStyle}>
            cancel
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          {alertSnack}
          <button onClick={this.onClick} style={payBtnStyle}>
            Pay Fees
          </button>
        </div>
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
