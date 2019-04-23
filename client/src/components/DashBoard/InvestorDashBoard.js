import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyCompanies from "../GetMyCompanies/MyCompanies";
import CaseSwitch from "../caseComponents/CaseSwitch";

import NavBarDashboard from '../NavBarDashboard'
import AwaitingPayment from '../InvestorDashboardRoutes/AwaitingPayment'
import NeedUpdate from '../InvestorDashboardRoutes/NeedUpdate'
import AllCases from "../InvestorDashboardRoutes/AllCases";
import Tooltip from '@material-ui/core/Tooltip';
// import "./DashBoard.css"
export default class InvestorDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardwidth: 0
    };
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
    document.getElementById("MyCompanies").style.marginLeft=`${width}px`;
    document.getElementById("FillForm").style.marginLeft=`${width}px`;
    document.getElementById("AllCompanies").style.marginLeft=`${width}px`;
    document.getElementById("AwaitingPayment").style.marginLeft=`${width}px`;
    document.getElementById("NeedUpdate").style.marginLeft=`${width}px`;
    document.getElementById("logo").style.marginLeft=`${width}px`;
  }
  async componentDidMount() {
    const width = document.getElementById("dashboard").clientWidth;
    await this.setState({ dashboardwidth: width });
  }
  handleSelect = selected => {
    console.log(selected);
    
    document.getElementById("MyCompanies").style.display="none";
    document.getElementById("FillForm").style.display="none";
    document.getElementById("AllCompanies").style.display="none";
    document.getElementById("AwaitingPayment").style.display="none";
    document.getElementById("NeedUpdate").style.display="none";

    if (selected === "viewmycompanies")
      document.getElementById("MyCompanies").style.display = null;

    if (selected === "createnewcompany")
      document.getElementById("FillForm").style.display = null;

    if (selected === "viewongoingcompanyrequests/all")
      document.getElementById("AllCompanies").style.display = null;

    if (selected === "viewongoingcompanyrequests/awaitingpayment")
      document.getElementById("AwaitingPayment").style.display = null;

    if (selected === "viewongoingcompanyrequests/needupdate")
        document.getElementById("NeedUpdate").style.display=null;



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
            onToggle={this.handleToggle}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="viewmycompanies">
              <NavItem eventKey="viewmycompanies">
                <NavIcon>
                  <a className="fas fa-building" style={styles.iconStyle} />
                </NavIcon>
                <NavText>My Companies</NavText>
              </NavItem>

              <NavItem eventKey="createnewcompany">
                <NavIcon>
                  <a className="far fa-building" style={styles.iconStyle} />
                </NavIcon>
                <NavText>Create Your Company</NavText>
              </NavItem>

              <NavItem eventKey="viewongoingcompanyrequests">
              <NavIcon>
                <a className="fas fa-shipping-fast" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View Ongoing Requests</NavText>
             
              <NavItem eventKey="viewongoingcompanyrequests/all">
                <NavText>All Companies</NavText>
              </NavItem>
              
              <NavItem eventKey="viewongoingcompanyrequests/awaitingpayment">
                <NavText>Awaiting Payment</NavText>
              </NavItem>
              
              <NavItem eventKey="viewongoingcompanyrequests/needupdate">
                <NavText>Need Update</NavText>
              </NavItem>
           
            </NavItem>

          </SideNav.Nav>
        </SideNav>
        <div id="MyCompanies" style={styles.divStyleShow} >
          <MyCompanies/>
        </div>
        <div id="FillForm" style={styles.divStyleHide} >
          {/* <InvestorFillForm/> */}
        </div>
        <div id="AllCompanies" style={styles.divStyleHide} >
        <AllCases/>
        </div>
        <div id="AwaitingPayment" style={styles.divStyleHide} >
        <AwaitingPayment/>
        </div>
        <div id="NeedUpdate" style={styles.divStyleHide} >
        <NeedUpdate/>
        </div>
        </Router>
      </div>
    );
  }
}