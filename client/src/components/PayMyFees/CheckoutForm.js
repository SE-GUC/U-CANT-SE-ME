import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

const serverURI = require("../../config/keys").serverURI;

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Payment" });
    let verdict = {};
    try {
      await axios.post(
        serverURI + `/investors/payFees/${this.props.investorId}/${this.props.caseId}`,
        { tokenId: token.id }
      );
      verdict = { completed: true, failed: false };
    } catch (err) {
      console.log(err);
      verdict = { completed: false, failed: true };
    }
    this.props.submitAction(verdict);
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the payment?</p>
        <CardElement />
        <button style={btnStyle} onClick={this.submit}>
          {"$ "}
          Pay{" "}
        </button>
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
