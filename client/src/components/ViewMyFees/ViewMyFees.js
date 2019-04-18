import React, { Component } from "react";
import axios from "axios";
import ViewMyFeesItem from "./ViewMyFeesItem";
import PayMyFees from "../PayMyFees/PayMyFeesItem";


class ViewMyFees extends Component {
  state = {
    fees: [],
    investorId:""
  };
  
  async componentDidMount() {
    const data = parseJwt(localStorage.jwtToken)
    await this.setState({investorId:data.id})
    const id = this.state.investorId
    axios
      .get(`api/investors/viewMyFees/${id}/`)
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
