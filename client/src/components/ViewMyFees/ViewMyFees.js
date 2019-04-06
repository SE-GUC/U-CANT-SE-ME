import React, { Component } from "react";
import axios from "axios";
import ViewMyFeesItem from "./ViewMyFeesItem";
import PayMyFees from "./PayMyFeesItem";

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

  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted"
    };
  };

  render() {
    return Array.isArray(this.state.fees) ? (
      this.state.fees.map(fees => (
        <div key={fees.companyName} style = {this.getStyle()}>
          <ViewMyFeesItem fees={fees} valid={true} />
          <PayMyFees />
        </div>
      ))
    ) : (
      <ViewMyFeesItem valid={false} message={this.state.fees} />
    );
  }
}

export default ViewMyFees;
