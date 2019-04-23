import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyCompanies from "../GetMyCompanies/MyCompanies";
import CaseSwitch from "../caseComponents/CaseSwitch";
import InvestorFillForm from "../InvestorFillForm/InvestorFillForm";
import NavBarDashboard from "../NavBarDashboard";
import AwaitingPayment from "../InvestorDashboardRoutes/AwaitingPayment";
import NeedUpdate from "../InvestorDashboardRoutes/NeedUpdate";
import AllCases from "../InvestorDashboardRoutes/AllCases";

// import "./DashBoard.css"
export default class InvestorDashBoard extends Component {
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
    document.getElementById("MyCompanies").style.display = "none";
    document.getElementById("FillForm").style.display = "none";
    document.getElementById("AllCompanies").style.display = "none";
    document.getElementById("AwaitingPayment").style.display = "none";
    document.getElementById("NeedUpdate").style.display = "none";
    document.getElementById("MyCompanies").style.display = "none";
    document.getElementById("FillForm").style.display = "none";
    document.getElementById("AllCompanies").style.display = "none";
    document.getElementById("AwaitingPayment").style.display = "none";
    document.getElementById("NeedUpdate").style.display = "none";

    if (selected === "viewmycompanies")
      document.getElementById("MyCompanies").style.display = "flex";

    if (selected === "createnewcompany")
      document.getElementById("FillForm").style.display = "flex";

    if (selected === "viewongoingcompanyrequests/all")
      document.getElementById("AllCompanies").style.display = "flex";

    if (selected === "viewongoingcompanyrequests/awaitingpayment")
      document.getElementById("AwaitingPayment").style.display = "flex";

    if (selected === "viewongoingcompanyrequests/needupdate")
      document.getElementById("NeedUpdate").style.display = "flex";
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
        // background: "red",
        display: "flex",
        justifyContent: "center",
        paddingTop: "10vh"
      },
      divStyleHide: {
        display: "none",
        textAlign: "center",
        marginLeft: this.state.dashboardwidth,
        // background:"red",
        justifyContent: "center",
        paddingTop: "10vh"
      }
    };
    //font-style:SF Pro Display
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
          dashboardRedirect="/InvestorDashBoard"
          profileRedirect="/profile"
        />
        <Router>
          <SideNav
            id="dashboard"
            onSelect={this.handleSelect}
            style={styles.navStyle}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="viewmycompanies">
              <NavItem eventKey="viewmycompanies">
                <NavIcon>
                  <a className="fa fa-home" style={styles.iconStyle} />
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng" ? "My Companies" : "شركاتي"}
                </NavText>
              </NavItem>

              <NavItem eventKey="createnewcompany">
                <NavIcon>
                  <a className="fa fa-home" style={styles.iconStyle} />
                </NavIcon>
                <NavText>
                  {this.state.lang === "eng"
                    ? "Create Your Company"
                    : "انشىء شركتك"}
                </NavText>
              </NavItem>

              <NavItem eventKey="viewongoingcompanyrequests">
                <NavIcon>
                  <a className="fa fa-list-alt" style={styles.iconStyle} />
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
                    {this.state.eng === "eng"
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
