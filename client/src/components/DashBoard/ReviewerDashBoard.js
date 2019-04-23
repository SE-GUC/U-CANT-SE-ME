import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Redirect } from "react-router-dom";
import ReviewerViewTasks from "../caseComponents/ReviewerViewTasks";
import ReviewerViewCase from "../caseComponents/ReviewerViewCase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CasesContainer from "../dCaseComponents/CasesContainer";
import NavBarDashboard from "../NavBarDashboard";
export default class ReviewerDashBoard extends Component {
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
        justifyContent: "center",
        paddingTop: "10vh"
      },
      divStyleHide: {
        display: "none",
        marginLeft: this.state.dashboardwidth,
        justifyContent: "center",
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
          dashboardRedirect="/ReviewerDashBoard"
          profileRedirect="/internalPortal/reviewer/profile"
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
                <a className="fas fa-tasks"  style={styles.iconStyle} />
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
            <ReviewerViewCase />
          </Router>
        </div>
        <div id="Tasks" style={styles.divStyleShow}>
          <Router>
            <ReviewerViewTasks />
          </Router>
        </div>
        <div id="AllCases" style={styles.divStyleHide}>
          <Router>
            <CasesContainer />
          </Router>
        </div>
      </div>
    );
  }
}
