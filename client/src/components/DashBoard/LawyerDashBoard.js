import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Redirect } from "react-router-dom";
import LawyerViewTasks from "../caseComponents/LawyerViewTasks";
import LawyerViewCase from "../caseComponents/LawyerViewCase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CaseSwitch from "../caseComponents/CaseSwitch";
import CasesContainer from "../dCaseComponents/CasesContainer";
import { red } from "@material-ui/core/colors";

import NavBarDashboard from "../NavBarDashboard";

import Tooltip from '@material-ui/core/Tooltip';

export default class LawyerDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardwidth: 0,
      lang: ""
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
    const width = document.getElementById("dashboard").clientWidth;
    await this.setState({ dashboardwidth: width });
  }
  handleSelect = selected => {
    document.getElementById("UnassignedCases").style.display = "none";
    document.getElementById("Tasks").style.display = "none";
    document.getElementById("AllCases").style.display = "none";
  }
  async handleToggle(){
    console.log("dondo")
    // await 5000
    var width = document.getElementById("dashboard").clientWidth
    if(width===64)
      width=240
    else
      width=64
    await this.setState({dashboardwidth:width});
    document.getElementById("UnassignedCases").style.marginLeft=`${width}px`;
    document.getElementById("Tasks").style.marginLeft=`${width}px`;
    document.getElementById("AllCases").style.marginLeft=`${width}px`;
    document.getElementById("logo").style.marginLeft=`${width}px`;
  


    if (selected === "viewunasignedcases")
      document.getElementById("UnassignedCases").style.display = null;

    if (selected === "viewtasks")
      document.getElementById("Tasks").style.display = null;

    if (selected === "viewallcases")
      document.getElementById("AllCases").style.display = null;
  };
  render() {
    const styles = {
      iconStyle: {
        fontSize: "1.75em"
      },
      navStyle: {
        background: "#3480E3",
        position: "fixed"
      },
      divStyleShow: {
        marginLeft: this.state.dashboardwidth,
        paddingTop: "10vh"
      },
      divStyleHide: {
        display: "none",
        marginLeft: this.state.dashboardwidth,
        paddingTop: "10vh"
      }
    };
    return (
      <div>

        <NavBarDashboard
          sumergiteColor="#3480E3"
          boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
          dashboard="bold"
          profile="lighter"
          homepage="lighter"
          DASHBOARD={true}
          PROFILE={true}
          ProfileMargin="120px"
          HomePageMargin="0px"
          dashboardRedirect="/LawyerDashBoard"
          profileRedirect="/internalPortal/lawyer/profile"
        />
        <SideNav
          id="dashboard"
          onSelect={this.handleSelect}
          style={styles.navStyle}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="viewtasks">
            <NavItem eventKey="viewtasks">

              <NavIcon>
                <a className="fas fa-tasks" style={styles.iconStyle} />
              </NavIcon>
              <NavText>
                {this.state.lang === "eng" ? "View Tasks" : "أظهر مهماتي"}
              </NavText>
            </NavItem>

            <NavItem eventKey="viewunasignedcases">
              <NavIcon>
                <a className="fas fa-suitcase-rolling" style={styles.iconStyle} />
              </NavIcon>
              <NavText>
                {this.state.lang === "eng"
                  ? "View Unassigned Cases"
                  : "أظهر العمليات المتاحة"}
              </NavText>
            </NavItem>

            <NavItem eventKey="viewallcases">
              <NavIcon>
                <a className="fas fa-briefcase" style={styles.iconStyle} />
              </NavIcon>
              <NavText>
                {this.state.lang === "eng"
                  ? "View All Cases"
                  : "أظهر جميع العمليات"}
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>

        <div id="UnassignedCases" style={styles.divStyleHide}>
          <Router>
            <LawyerViewCase />
          </Router>
        </div>
        <div id="Tasks" style={styles.divStyleShow}>
          <Router>
            <LawyerViewTasks />
          </Router>
        </div>
        <div id="AllCases" style={styles.divStyleHide}>
          <CasesContainer />
        </div>
      </div>
    );
  }
}
