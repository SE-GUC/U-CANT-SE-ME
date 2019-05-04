import React, { Component } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { BrowserRouter as Router } from "react-router-dom";
import MyCompanies from "../GetMyCompanies/MyCompanies";
import InvestorFillForm from "../dCaseComponents/FillForm";
import NavBarDashboard from "../NavBarDashboard";
import AwaitingPayment from "../InvestorDashboardRoutes/AwaitingPayment";
import NeedUpdate from "../InvestorDashboardRoutes/NeedUpdate";
import AllCases from "../InvestorDashboardRoutes/AllCases";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { faShippingFast } from "@fortawesome/free-solid-svg-icons";

export default class InvestorDashBoard extends Component {
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
    document.getElementById("MyCompanies").style.marginLeft = `${width}px`;
    document.getElementById("FillForm").style.marginLeft = `${width}px`;
    document.getElementById("AllCompanies").style.marginLeft = `${width}px`;
    document.getElementById("AwaitingPayment").style.marginLeft = `${width}px`;
    document.getElementById("NeedUpdate").style.marginLeft = `${width}px`;
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
    document.getElementById("MyCompanies").style.display = "none";
    document.getElementById("FillForm").style.display = "none";
    document.getElementById("AllCompanies").style.display = "none";
    document.getElementById("AwaitingPayment").style.display = "none";
    document.getElementById("NeedUpdate").style.display = "none";

    if (selected === "viewmycompanies")
      document.getElementById("MyCompanies").style.display = null;

    if (selected === "createnewcompany")
      document.getElementById("FillForm").style.display = null;

    if (selected === "viewongoingcompanyrequests/all")
      document.getElementById("AllCompanies").style.display = null;

    if (selected === "viewongoingcompanyrequests/awaitingpayment")
      document.getElementById("AwaitingPayment").style.display = null;

    if (selected === "viewongoingcompanyrequests/needupdate")
      document.getElementById("NeedUpdate").style.display = null;
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
        display: "flex",
        justifyContent: "center",
        paddingTop: "10vh"
      },
      divStyleHide: {
        display: "none",
        textAlign: "center",
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
          DASHBOARDD={true}
          PROFILEE={true}
          ProfileMargin="120px"
          HomePageMargin="0px"
          dashboardRedirect="/InvestorDashBoard"
          profileRedirect="/profile"
        />
        <Router>
          <SideNav
            id="dashboard"
            onSelect={this.handleSelect}
            style={styles.navStyle}
            onToggle={this.handleToggle}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="viewmycompanies">
              <NavItem eventKey="viewmycompanies">
                <NavIcon>
                  <FontAwesomeIcon icon={faBuilding} style={styles.iconStyle} />
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng" ? "My Companies" : "شركاتي"}
                </NavText>
              </NavItem>

              <NavItem eventKey="createnewcompany">
                <NavIcon>
                  <FontAwesomeIcon icon={faFileAlt} style={styles.iconStyle} />
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng"
                    ? "Create Your Company"
                    : "انشىء شركتك"}
                </NavText>
              </NavItem>

              <NavItem eventKey="viewongoingcompanyrequests">
                <NavIcon>
                  <FontAwesomeIcon
                    icon={faShippingFast}
                    style={styles.iconStyle}
                  />
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng"
                    ? "View Ongoing Requests"
                    : "أظهر العمليات الجارية"}
                </NavText>

                <NavItem eventKey="viewongoingcompanyrequests/all">
                  <NavText>
                    {this.state.lang === "eng"
                      ? "All Companies"
                      : "اظهر شركاتي"}
                  </NavText>
                </NavItem>

                <NavItem eventKey="viewongoingcompanyrequests/awaitingpayment">
                  <NavText>
                    {this.state.lang === "eng"
                      ? "Awaiting Payments"
                      : "اظهر العمليات النقدية المطالبة"}
                  </NavText>
                </NavItem>

                <NavItem eventKey="viewongoingcompanyrequests/needupdate">
                  <NavText>
                    {this.state.lang === "eng"
                      ? "Cases Awaiting Update"
                      : "العمليات التي بحاجة الى تعديل"}
                  </NavText>
                </NavItem>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
          <div id="MyCompanies" style={styles.divStyleShow}>
            <MyCompanies />
          </div>
          <div id="FillForm" style={styles.divStyleHide}>
            <InvestorFillForm />
          </div>
          <div id="AllCompanies" style={styles.divStyleHide}>
            <AllCases />
          </div>
          <div id="AwaitingPayment" style={styles.divStyleHide}>
            <AwaitingPayment />
          </div>
          <div id="NeedUpdate" style={styles.divStyleHide}>
            <NeedUpdate />
          </div>
        </Router>
      </div>
    );
  }
}
