import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import { Redirect } from 'react-router-dom'
import RegisterLawyer from "../RegisterLawyer";
import RegisterReviewer from "../RegisterReviewer";
import CaseSwitch from "../caseComponents/CaseSwitch";
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
        document.getElementById("CreateForm").style.display="flex";

    if (selected === "register/lawyer")
        document.getElementById("RegisterLawyer").style.display="flex";

    if (selected === "register/reviewer")
        document.getElementById("RegisterReviewer").style.display="flex";

    if (selected === "viewallcases")
        document.getElementById("AllCases").style.display="flex";
  };
  render() {
    const styles = {
      iconStyle: {
        fontSize: "1.75em"
      },
      navStyle: {
        background: "#3d58db",
        zindex:"0"
      },
      divStyleShow:{
        display: ' inline',
        marginLeft:this.state.dashboardwidth,
        // background:"red",
        display: 'flex', 
        justifyContent: 'center'
      },
      divStyleHide:{
        display: 'none',
        textAlign: "center",
        marginLeft:this.state.dashboardwidth,
        // background:"red",
        justifyContent: 'center'
      }
    };
    return (
      <div>
        <SideNav id="dashboard" onSelect={this.handleSelect} style={styles.navStyle}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="register/lawyer">
            
            <NavItem eventKey="createformtemplate">
              <NavIcon>
                <i className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>Create Form Template</NavText>
            </NavItem>
            
            <NavItem eventKey="register">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>Register</NavText>
              <NavItem eventKey="register/lawyer">
                <NavText>Register Lawyer</NavText>
              </NavItem>
              <NavItem eventKey="register/reviewer">
                <NavText>Register Reviewer</NavText>
              </NavItem>
            </NavItem>

            <NavItem eventKey="viewallcases">
              <NavIcon>
                <i className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View All Cases</NavText>
            </NavItem>            

          </SideNav.Nav>
        </SideNav>

        <div id="CreateForm" style={styles.divStyleShow} >
        </div>
        <div id="RegisterLawyer" style={styles.divStyleHide} >
          <RegisterLawyer/>
        </div>
        <div id="RegisterReviewer" style={styles.divStyleHide} >
          <RegisterReviewer/>
        </div>
        <div id="AllCases" style={styles.divStyleHide} >
          {/* <CaseSwitch/> */}
        </div>

      </div>
    );
  }
}
