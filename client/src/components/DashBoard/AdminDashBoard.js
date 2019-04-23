import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CaseSwitch from "../caseComponents/CaseSwitch";
import RegisterLawyer from "../RegisterLawyer";
import RegisterReviewer from "../RegisterReviewer";
import CasesContainer from "../dCaseComponents/CasesContainer";
import CreateFormTemplate from "../CreateFormTemplate/CreateFormTemplate";
import NavBarDashboard from '../NavBarDashboard'
export default class InvestorDashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        dashboardwidth:0
    }
  }
async componentDidMount(){
  const width = document.getElementById("dashboard").clientWidth
  await this.setState({dashboardwidth:width});
}
    handleSelect = selected => {
    console.log(selected);
    document.getElementById("CreateForm").style.display="none";
    document.getElementById("RegisterLawyer").style.display="none";
    document.getElementById("RegisterReviewer").style.display="none";
    document.getElementById("AllCases").style.display="none";

    if(selected === "createformtemplate")
        document.getElementById("CreateForm").style.display=null;

    if (selected === "register/lawyer")
        document.getElementById("RegisterLawyer").style.display=null;

    if (selected === "register/reviewer")
        document.getElementById("RegisterReviewer").style.display=null;

    if (selected === "viewallcases")
        document.getElementById("AllCases").style.display=null;
  };
  render() {
    const styles = {
      iconStyle: {
        fontSize: "1.75em"
      },
      navStyle: {
        background: "#3480E3",
        position:"fixed",
        boxShadow: "5px 0px 20px rgba(0, 0, 0, 0.16)",
      },
      divStyleShow:{
        display: ' inline',
        marginLeft:this.state.dashboardwidth,
        // background:"red",
        display: 'flex', 
        justifyContent: 'center',
        paddingTop:'10vh'
      },
      divStyleHide:{
        display: 'none',
        textAlign: "center",
        marginLeft:this.state.dashboardwidth,
        // background:"red",
        justifyContent: 'center',
        paddingTop:'10vh'
      },
      divStyleHideRegister:{
        display: 'none',
        // textAlign: "center",
        marginLeft:this.state.dashboardwidth,
        // background:"red",
        justifyContent: 'center',
        // paddingTop:'10vh'
      }
    };
    return (
      <div>
         <NavBarDashboard sumergiteColor= '#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' dashboard='lighter' profile='bold' homepage='lighter' DASHBOARD={true} PROFILE={true} ProfileMargin='120px' HomePageMargin='0px' dashboardRedirect='/AdminDashBoard' profileRedirect="/internalPortal/admin/profile"/> 
        <SideNav id="dashboard" onSelect={this.handleSelect} style={styles.navStyle}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="viewallcases">
            
          <NavItem eventKey="viewallcases">
              <NavIcon>
                <a className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View All Cases</NavText>
            </NavItem>

            <NavItem eventKey="register">
              <NavIcon>
                <a className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>Register</NavText>
              <NavItem eventKey="register/lawyer">
                <NavText>Register Lawyer</NavText>
              </NavItem>
              <NavItem eventKey="register/reviewer">
                <NavText>Register Reviewer</NavText>
              </NavItem>
            </NavItem>

            <NavItem eventKey="createformtemplate">
              <NavIcon>
                <a className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>Create Form Template</NavText>
            </NavItem>

          </SideNav.Nav>
        </SideNav>

        <div id="CreateForm" style={styles.divStyleHide} >
        <CreateFormTemplate/>
        </div>
        <div id="RegisterLawyer" style={styles.divStyleHideRegister} >
          <RegisterLawyer/>
        </div>
        <div id="RegisterReviewer" style={styles.divStyleHideRegister} >
          <RegisterReviewer/>
        </div>
        <div id="AllCases" style={styles.divStyleShow} >
          <CasesContainer/>
        </div>

      </div>
    );
  }
}
