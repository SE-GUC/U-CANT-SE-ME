import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

class PayMyFees extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_SjpdD73PtkQQIAgyoVhN0Sbn00EkCOek4A">
        <div className="example">
          <h3>Pay your Fees Online</h3>
          <Elements>
            <CheckoutForm
              investorId={this.props.investorId}
              caseId={this.props.caseId}
              submitAction={this.props.submitAction}
            />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default PayMyFees;
