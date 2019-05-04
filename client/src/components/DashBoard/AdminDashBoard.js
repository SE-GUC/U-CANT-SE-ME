import React, { Component } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import RegisterLawyer from "../RegisterLawyer";
import RegisterReviewer from "../RegisterReviewer";
import CasesContainer from "../dCaseComponents/CasesContainer";
import CreateFormTemplate from "../CreateFormTemplate/CreateFormTemplate";
import NavBarDashboard from "../NavBarDashboard";
import FormTemplate from "../CreateFormTemplate/FormTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import parseJwt from "../../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";

export default class AdminDashBoard extends Component {
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
    if (this._isMounted) await this.setState({ dashboardwidth: width });
    document.getElementById("CreateFormJSON").style.marginLeft = `${width}px`;
    document.getElementById(
      "CreateFormInteractive"
    ).style.marginLeft = `${width}px`;
    document.getElementById("RegisterLawyer").style.marginLeft = `${width}px`;
    document.getElementById("RegisterReviewer").style.marginLeft = `${width}px`;
    document.getElementById("AllCases").style.marginLeft = `${width}px`;
    document.getElementById("logo").style.marginLeft = `${width}px`;
    document.getElementById(
      "navbarSupportedContent"
    ).style.marginLeft = `${width}px`;
  }
  async componentWillMount() {
    this._isMounted = true;
    const data = await parseJwt(localStorage.jwtToken);
    if ((data === undefined || data.type !== "admin") && this._isMounted)
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
    document.getElementById("CreateFormJSON").style.display = "none";
    document.getElementById("CreateFormInteractive").style.display = "none";
    document.getElementById("RegisterLawyer").style.display = "none";
    document.getElementById("RegisterReviewer").style.display = "none";
    document.getElementById("AllCases").style.display = "none";

    if (selected === "createformtemplate/code")
      document.getElementById("CreateFormJSON").style.display = null;

    if (selected === "createformtemplate/interactive")
      document.getElementById("CreateFormInteractive").style.display = null;

    if (selected === "register/lawyer")
      document.getElementById("RegisterLawyer").style.display = null;

    if (selected === "register/reviewer")
      document.getElementById("RegisterReviewer").style.display = null;

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
        position: "fixed",
        boxShadow: "5px 0px 20px rgba(0, 0, 0, 0.16)"
      },
      divStyleShow: {
        marginLeft: this.state.dashboardwidth,
        justifyContent: "center",
        paddingTop: "10vh"
      },
      divStyleHide: {
        display: "none",
        textAlign: "center",
        marginLeft: this.state.dashboardwidth,
        justifyContent: "center",
        paddingTop: "10vh"
      },
      divStyleHideRegister: {
        display: "none",
        marginLeft: this.state.dashboardwidth,
        justifyContent: "center"
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
            electronicJournals="lighter"
            DASHBOARDD={true}
            PROFILEE={true}
            ProfileMargin="0px"
            HomePageMargin="0px"
            admin={true}
          />
          <SideNav
            id="dashboard"
            onSelect={this.handleSelect}
            style={styles.navStyle}
            onToggle={this.handleToggle}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="viewallcases">
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

              <NavItem eventKey="register">
                <NavIcon>
                  <FontAwesomeIcon icon={faUserTie} style={styles.iconStyle} />{" "}
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng" ? "Register" : "سجل موظف"}
                </NavText>
                <NavItem eventKey="register/lawyer">
                  <NavText>
                    {this.state.lang === "eng" ? "Register Lawyer" : "سجل محام"}
                  </NavText>
                </NavItem>
                <NavItem eventKey="register/reviewer">
                  <NavText>
                    {this.state.lang === "eng"
                      ? "Register Reviewer"
                      : "سجل مراجع"}
                  </NavText>
                </NavItem>
              </NavItem>

              <NavItem eventKey="createformtemplate">
                <NavIcon>
                  <FontAwesomeIcon
                    icon={faFileInvoice}
                    style={styles.iconStyle}
                  />{" "}
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng"
                    ? "Create Form Template"
                    : "إنشاء نموذج"}
                </NavText>
                <NavItem eventKey="createformtemplate/code">
                  <NavText>
                    {this.state.lang === "eng"
                      ? "Upload JSON File"
                      : "إرفع ملف جايسون"}
                  </NavText>
                </NavItem>
                <NavItem eventKey="createformtemplate/interactive">
                  <NavText>
                    {this.state.lang === "eng"
                      ? "Create Form Template"
                      : "إنشاء نموذج"}
                  </NavText>
                </NavItem>
              </NavItem>
            </SideNav.Nav>
          </SideNav>

          <div id="CreateFormJSON" style={styles.divStyleHide}>
            <CreateFormTemplate />
          </div>
          <div id="CreateFormInteractive" style={styles.divStyleHide}>
            <FormTemplate />
          </div>
          <div id="RegisterLawyer" style={styles.divStyleHideRegister}>
            <RegisterLawyer />
          </div>
          <div id="RegisterReviewer" style={styles.divStyleHideRegister}>
            <RegisterReviewer />
          </div>
          <div id="AllCases" style={styles.divStyleShow}>
            <CasesContainer />
          </div>
        </div>
      );
  }
}
