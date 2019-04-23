import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import RegisterLawyer from "../RegisterLawyer";
import RegisterReviewer from "../RegisterReviewer";
import CasesContainer from "../dCaseComponents/CasesContainer";
import CreateFormTemplate from "../CreateFormTemplate/CreateFormTemplate";
import NavBarDashboard from "../NavBarDashboard";
import FormTemplate from "../CreateFormTemplate/FormTemplate"
import Tooltip from '@material-ui/core/Tooltip';
export default class InvestorDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardwidth: 0,
      lang: ""
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
    document.getElementById("CreateFormJSON").style.marginLeft=`${width}px`;
    document.getElementById("CreateFormInteractive").style.marginLeft=`${width}px`;
    document.getElementById("RegisterLawyer").style.marginLeft=`${width}px`;
    document.getElementById("RegisterReviewer").style.marginLeft=`${width}px`;
    document.getElementById("AllCases").style.marginLeft=`${width}px`;
    document.getElementById("logo").style.marginLeft=`${width}px`;
  }
  async componentDidMount() {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
    const width = document.getElementById("dashboard").clientWidth;
    await this.setState({ dashboardwidth: width });
  }
  handleSelect = selected => {

    document.getElementById("CreateForm").style.display = "none";
    document.getElementById("CreateFormJSON").style.display = "none";
    document.getElementById("CreateFormInteractive").style.display = "none";
    document.getElementById("RegisterLawyer").style.display = "none";
    document.getElementById("RegisterReviewer").style.display = "none";
    document.getElementById("AllCases").style.display = "none";

    if (selected === "createformtemplate")
      document.getElementById("CreateForm").style.display = null;


    if(selected === "createformtemplate/code")
        document.getElementById("CreateFormJSON").style.display=null;
    
        if(selected === "createformtemplate/interactive")
        document.getElementById("CreateFormInteractive").style.display=null;


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
        display: " inline",
        marginLeft: this.state.dashboardwidth,
        // background:"red",
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
      },
      divStyleHideRegister: {
        display: "none",
        // textAlign: "center",
        marginLeft: this.state.dashboardwidth,
        // background:"red",
        justifyContent: "center",
        // paddingTop:'-10px',
        justifyContent: "center"
        // paddingTop: "10vh"
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
                <a className="fas fa-briefcase" style={styles.iconStyle} />
              </NavIcon>
              <NavText>
                {this.state.lang === "eng"
                  ? "View All Cases"
                  : "أظهر جميع العمليات"}
              </NavText>
            </NavItem>
            
            <NavItem eventKey="register">
              <NavIcon>
                <a className="fas fa-user-tie" style={styles.iconStyle} />
              </NavIcon>
              <NavText>
                {this.state.lang === "eng" ? "Register" : "سجل موظف"}
              </NavText>
              <NavItem eventKey="register/lawyer">
                <NavText>
                  {this.state.lang === "eng" ? "Register Lawyer" : "سجل محامي"}
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
                <a className="fab fa-wpforms" style={styles.iconStyle} />
              </NavIcon>
              <NavText>
                {this.state.lang === "eng"
                  ? "Create Form Template"
                  : "إنشاء نموذج"}
              </NavText>
      </NavItem>
              <NavText>Create Form Template</NavText>
            <NavItem eventKey="createformtemplate/code">
                <NavText>Upload JSON File</NavText>
              </NavItem>
              <NavItem eventKey="createformtemplate/interactive">
                <NavText>Create Form Template</NavText>
              </NavItem>

          </SideNav.Nav>
        </SideNav>

        <div id="CreateFormJSON" style={styles.divStyleHide}>
          <CreateFormTemplate />
        </div>

        <div id="RegisterLawyer" style={styles.divStyleHideRegister}>
          <RegisterLawyer />

        <div id="CreateFormInteractive" style={styles.divStyleHide}>
          <FormTemplate />
        </div>
       

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
