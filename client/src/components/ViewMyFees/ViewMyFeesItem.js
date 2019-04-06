import React, { Component } from "react";

export class ViewMyFeesItem extends Component {
  companyNameStyle = () => {
    return {
      fontFamily: "Century Gothic"
    };
  };
  feesStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      fontFamily: "Consolas"
    };
  };

  render() {
    const valid = this.props.valid;
    if (valid) {
      const { companyName, fees } = this.props.fees;
      return (
        <React.Fragment>
          <h3 style={this.companyNameStyle()}>{companyName}</h3>
          <h4 style={this.feesStyle()}>{fees}</h4>
        </React.Fragment>
      );
    } else {
      return <h3 style={this.companyNameStyle()}>{this.props.message}</h3>;
    }
  }
}

export default ViewMyFeesItem;
