import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBar from "../snackbar";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  state = {
    clicked: false
  };

  async submit(ev) {
    await this.setState({ clicked: true });
    await this.setState({ alerted: false, alertType: "", alertMsg: "" });
    let { token } = await this.props.stripe.createToken({ name: "Payment" });
    let verdict = {};
    try {
      await axios.post(
        `api/investors/payFees/${this.props.investorId}/${this.props.caseId}`,
        { tokenId: token.id }
      );
      verdict = { completed: true, failed: false };
    } catch (err) {
      verdict = { completed: false, failed: true };
    }
    this.props.submitAction(verdict);
    await this.setState({ clicked:false });
  }

  render() {
    let alertSnack;
    if (this.state.alerted)
      alertSnack = (
        <SnackBar
          message={this.state.alertMsg}
          variant={this.state.alertType}
        />
      );
    return (
      <div className="checkout">
        {alertSnack}
        <p>Would you like to complete the payment?</p>
        <CardElement />
        {this.state.clicked ? (
          <CircularProgress
            style={{
              display: "inlineBlock",
              marginTop: "2%",
              marginLeft: "3%",
              marginBottom: "1%"
            }}
          />
        ) : (
          <button style={btnStyle} onClick={this.submit}>
            {"$ "}
            Pay{" "}
          </button>
        )}
      </div>
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
  fontSize: "16px",
  borderRadius: "25px"
};

export default injectStripe(CheckoutForm);
