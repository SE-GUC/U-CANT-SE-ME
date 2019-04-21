import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {Toggle,Nav,NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";

export default class DashBoard extends Component {
  handleSelect = selected => {
    console.log(selected);
    if (selected === "case/all") {
    }
  };
  render() {
    const styles = {
      iconStyle: {
        fontSize: "1.75em"
      },
      navStyle: {
        background: "#3d58db",
        zindex:"0"
      }
    };
    return (
      <div>
        <SideNav onSelect={this.handleSelect} style={styles.navStyle}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <i className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="case">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>Case</NavText>
              <NavItem eventKey="case/all">
                <NavText>All</NavText>
              </NavItem>
              <NavItem eventKey="case/awaitingpayment">
                <NavText>Waiting For Payment</NavText>
              </NavItem>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <div >
        </div>
      </div>
    );
  }
}
