import React, { Component } from "react";
import axios from "axios";
import ViewMyFeesItem from "./ViewMyFeesItem";

class ViewMyFees extends Component {
  state = {
    fees: []
  };
  
  componentDidMount() {
    const investorID = "5ca7594f3f074a35383a61a3";
    // const investorID="5ca6229afd83c24bf091758e"
    // const { data: fees } = await axios.get(
    //   `http://localhost:5000/api/investors/viewMyFees/${investorID}/`
    // );
    // this.setState({ fees: fees.response });
    axios
      .get(`http://localhost:5000/api/investors/viewMyFees/${investorID}/`)
      .then(res => this.setState({ fees: res.data.response }));
  }

  render() {
    return Array.isArray(this.state.fees) ? (
      this.state.fees.map(fees => (
        <ViewMyFeesItem key={fees.companyName} fees={fees} valid={true} />
      ))
    ) : (
      <ViewMyFeesItem valid={false} message={this.state.fees} />
    );
  }
}

export default ViewMyFees;
