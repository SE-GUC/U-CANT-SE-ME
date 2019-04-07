import React, { Component } from "react";
import axios from "axios";
import ViewMyFeesItem from "./ViewMyFeesItem";
import PayMyFees from "../PayMyFees/PayMyFeesItem";

const investorId = "5ca7594f3f074a35383a61a3";
// const investorId="5ca6229afd83c24bf091758e"

class ViewMyFees extends Component {
  state = {
    fees: []
  };
  
  componentDidMount() {
    // const { data: fees } = await axios.get(
    //   `http://localhost:5000/api/investors/viewMyFees/${investorId}/`
    // );
    // this.setState({ fees: fees.response });
    axios
      .get(`http://localhost:5000/api/investors/viewMyFees/${investorId}/`)
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
          <PayMyFees investorId = {investorId} caseId = {fees._id}/>
        </div>
      ))
    ) : (
      <ViewMyFeesItem valid={false} message={this.state.fees} />
    );
  }
}

export default ViewMyFees;
