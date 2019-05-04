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

export default class AdminDashBoard extends Component {
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
                <FontAwesomeIcon icon={faBriefcase} style={styles.iconStyle} />
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
