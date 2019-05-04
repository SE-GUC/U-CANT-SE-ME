import React, { Component } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import LawyerViewTasks from "../caseComponents/LawyerViewTasks";
import LawyerViewCase from "../caseComponents/LawyerViewCase";
import { BrowserRouter as Router } from "react-router-dom";
import CasesContainer from "../dCaseComponents/CasesContainer";
import NavBarDashboard from "../NavBarDashboard";
import LawyerFillForm from "../dCaseComponents/FillForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

export default class LawyerDashBoard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dashboardwidth: 0,
      lang: ""
    };
  }
  async handleToggle() {
    var width = document.getElementById("dashboard").clientWidth;
    if (width === 64) width = 240;
    else width = 64;
    if (this._isMounted) await this.setState({ dashboardwidth: width });
    document.getElementById("UnassignedCases").style.marginLeft = `${width}px`;
    document.getElementById("Tasks").style.marginLeft = `${width}px`;
    document.getElementById("AllCases").style.marginLeft = `${width}px`;
    document.getElementById("logo").style.marginLeft = `${width}px`;
    document.getElementById(
      "navbarSupportedContent"
    ).style.marginLeft = `${width}px`;
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      if (localStorage.getItem("lang"))
        this.setState({ lang: localStorage.getItem("lang") });
      else this.setState({ lang: "eng" });
      const width = document.getElementById("dashboard").clientWidth;
      await this.setState({ dashboardwidth: width });
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
    document.getElementById("FillForm").style.display = "none";
    document.getElementById("AllCases").style.display = "none";

    if (selected === "viewunasignedcases")
      document.getElementById("UnassignedCases").style.display = null;

    if (selected === "viewtasks")
      document.getElementById("Tasks").style.display = null;

    if (selected === "viewallcases")
      document.getElementById("AllCases").style.display = null;

    if (selected === "createnewcompany")
      document.getElementById("FillForm").style.display = null;
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
          DASHBOARDD={true}
          PROFILEE={true}
          ProfileMargin="120px"
          HomePageMargin="0px"
          dashboardRedirect="/LawyerDashBoard"
          profileRedirect="/internalPortal/lawyer/profile"
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
                <FontAwesomeIcon icon={faBriefcase} style={styles.iconStyle} />
              </NavIcon>
              <NavText>
                {this.state.lang === "eng"
                  ? "View All Cases"
                  : "أظهر جميع العمليات"}
              </NavText>
            </NavItem>

            <NavItem eventKey="createnewcompany">
              <NavIcon>
                <FontAwesomeIcon icon={faBuilding} style={styles.iconStyle} />
              </NavIcon>
              <NavText>
                {this.state.lang === "eng" ? "Create a Company" : "انشىء شركة"}
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
        <div id="FillForm" style={styles.divStyleHide}>
          <LawyerFillForm />
        </div>
      </div>
    );
  }
}
