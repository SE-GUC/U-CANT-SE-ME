import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";

export default class DashBoard extends Component {
  handleSelect = selected => {
    console.log(selected);
    if(selected === "home")
    {
      document.getElementById("Companies").style.display="none";
      document.getElementById("Home").style.display="inline";
    }else
    if (selected === "case/all") {
      document.getElementById("Companies").style.display="inline";
      document.getElementById("Home").style.display="none";
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
      },
      divStyleShow:{
        display: ' inline',
        textAlign: "center"
        // marginLeft:"64px",
        // backgroundColor:"black"
      },
      divStyleHide:{
        display: 'none'
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
        <div id="Home" style={styles.divStyleShow}>
          <h1>Home</h1>
        </div>
        <div id="Companies" style={styles.divStyleShow}>
          <h1>Companies</h1>
        </div>
      </div>
    );
  }
}
