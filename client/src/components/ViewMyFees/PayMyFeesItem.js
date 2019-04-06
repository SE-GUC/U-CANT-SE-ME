import React, { Component } from "react";
import axios from "axios";

class PayMyFees extends Component {
  
//   componentDidMount() {
//     const investorID = "5ca7594f3f074a35383a61a3";
//     // const investorID="5ca6229afd83c24bf091758e"
//     // const { data: fees } = await axios.get(
//     //   `http://localhost:5000/api/investors/viewMyFees/${investorID}/`
//     // );
//     // this.setState({ fees: fees.response });
//     axios
//       .get(`http://localhost:5000/api/investors/viewMyFees/${investorID}/`)
//       .then(res => this.setState({ fees: res.data.response }));
//   }


  render() {
      return <button style={btnStyle}> Pay Fees </button>
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
}

export default PayMyFees;
