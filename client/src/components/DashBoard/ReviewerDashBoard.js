import React, { Component } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import ReviewerViewTasks from "../caseComponents/ReviewerViewTasks";
import ReviewerViewCase from "../caseComponents/ReviewerViewCase";
import { BrowserRouter as Router } from "react-router-dom";
import CasesContainer from "../dCaseComponents/CasesContainer";
import NavBarDashboard from "../NavBarDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import parseJwt from "../../helpers/decryptAuthToken";

export default class ReviewerDashBoard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dashboardwidth: 0,
      lang: "",
      pass: 0
    };
  }
  async handleToggle() {
    var width = document.getElementById("dashboard").clientWidth;
    if (width === 64) width = 240;
    else width = 64;
    if (this._isMounted) {
      await this.setState({ dashboardwidth: width });
    }
    document.getElementById("UnassignedCases").style.marginLeft = `${width}px`;
    document.getElementById("Tasks").style.marginLeft = `${width}px`;
    document.getElementById("AllCases").style.marginLeft = `${width}px`;
    document.getElementById("logo").style.marginLeft = `${width}px`;
    document.getElementById(
      "navbarSupportedContent"
    ).style.marginLeft = `${width}px`;
  }
  async componentWillMount() {
    this._isMounted = true;
    const data = await parseJwt(localStorage.jwtToken);
    if ((data === undefined || data.type !== "reviewer") && this._isMounted)
      await this.setState({ pass: 2 });
    if (this._isMounted) await this.setState({ pass: 1 });
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      if (localStorage.getItem("lang"))
        this.setState({ lang: localStorage.getItem("lang") });
      else this.setState({ lang: "eng" });
      var width = 64;
      if (document.getElementById("dashboard") !== null)
        width = document.getElementById("dashboard").clientWidth;
      if (this._isMounted) await this.setState({ dashboardwidth: width });
    }
    document.getElementById("logo").style.marginLeft = `64px`;
    document.getElementById("navbarSupportedContent").style.marginLeft = `64px`;
  }
  componentWillUnmount() {
    this._isMounted = false;
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
        marginTop: "20vh"
      },
      divStyleHide: {
        display: "none",
        marginLeft: this.state.dashboardwidth,
        justifyContent: "center",
        marginTop: "20vh"
      }
    };
    if (this.state.pass === 2) return <Redirect to="/" />;
    else if (this.state.pass === 0) return <div />;
    else
      return (
        <div>
          <NavBarDashboard
            sumergiteColor="#3480E3"
            boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
            dashboard="bold"
            profile="lighter"
            homepage="lighter"
            DASHBOARDD={true}
            PROFILEE={true}
            ProfileMargin="120px"
            HomePageMargin="0px"
            dashboardRedirect="/ReviewerDashBoard"
            profileRedirect="/internalPortal/reviewer/profile"
          />
          <SideNav
            onToggle={this.handleToggle}
            id="dashboard"
            onSelect={this.handleSelect}
            style={styles.navStyle}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="viewtasks">
              <NavItem eventKey="viewtasks">
                <NavIcon>
                  <FontAwesomeIcon icon={faTasks} style={styles.iconStyle} />
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng" ? "View Tasks" : "أظهر مهماتي"}
                </NavText>
              </NavItem>

              <NavItem eventKey="viewunasignedcases">
                <NavIcon>
                  <FontAwesomeIcon
                    icon={faSuitcaseRolling}
                    style={styles.iconStyle}
                  />
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng"
                    ? "View Unassigned Cases"
                    : "أظهر العمليات المتاحة"}
                </NavText>
              </NavItem>

              <NavItem eventKey="viewallcases">
                <NavIcon>
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    style={styles.iconStyle}
                  />
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
