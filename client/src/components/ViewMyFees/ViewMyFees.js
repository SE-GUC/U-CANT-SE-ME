import React, { Component } from "react";
import axios from "axios";
import ViewMyFeesItem from "./ViewMyFeesItem";
import PayMyFees from "../PayMyFees/PayMyFeesItem";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

class ViewMyFees extends Component {
  state = {
    fees: [],
    investorId: "",
    finished: false
  };

  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try {
      await axios.get("../api/investors/auth");
    } catch (err) {
      alert("You are not allowed");
      this.setState({ home: 1 });
      return;
    }
    await this.setState({ home: 2 });
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({ investorId: data.id });
    const id = this.state.investorId;
    axios
      .get(`../api/investors/viewMyFees/${id}/`)
      .then(async res => await this.setState({ fees: res.data }));
    await this.setState({ finished: true });
  }

  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted"
    };
  };

  render() {
    if (this.state.home === 0) return <div> </div>;
    if (this.state.home === 1) return <Redirect to={{ pathname: "/" }} />;
    if (!this.state.finished) {
      return (
        <div>
          <CircularProgress style={{ marginTop: "50px" }} />
          <h3>Fetching Data</h3>
        </div>
      );
    } else {
      return this.state.fees.data ? (
        this.state.fees.data.map(fees => (
          <div key={fees.companyName} style={this.getStyle()}>
            <ViewMyFeesItem fees={fees} valid={true} />
            <PayMyFees investorId={this.state.investorId} caseId={fees._id} />
          </div>
        ))
      ) : (
        <ViewMyFeesItem valid={false} message={this.state.fees.msg} />
      );
    }
  }
}

export default ViewMyFees;
