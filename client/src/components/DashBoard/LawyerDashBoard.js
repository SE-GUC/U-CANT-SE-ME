import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import { Redirect } from 'react-router-dom'
import LawyerViewTasks from "../caseComponents/LawyerViewTasks";
import LawyerViewCase from "../caseComponents/LawyerViewCase";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CaseSwitch from "../caseComponents/CaseSwitch";
import CasesContainer from "../dCaseComponents/CasesContainer";
import { red } from "@material-ui/core/colors";
export default class LawyerDashBoard extends Component {
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
    document.getElementById("UnassignedCases").style.display="none";
    document.getElementById("Tasks").style.display="none";
    document.getElementById("AllCases").style.display="none";

    if (selected === "viewunasignedcases")
      document.getElementById("UnassignedCases").style.display=null;

    if (selected === "viewtasks")
      document.getElementById("Tasks").style.display=null;

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
        zindex:"0",
        position:"fixed"
      },
      divStyleShow:{
        marginLeft:this.state.dashboardwidth,
      },
      divStyleHide:{
        display: 'none',
        marginLeft:this.state.dashboardwidth,
      }
    };
    return (
      <div>
        <SideNav id="dashboard" onSelect={this.handleSelect} style={styles.navStyle}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="viewtasks">
            
          <NavItem eventKey="viewtasks">
              <NavIcon>
                <a className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View Tasks</NavText>
            </NavItem>

            <NavItem eventKey="viewunasignedcases">
              <NavIcon>
                <a className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View Unasigned Cases</NavText>
            </NavItem>

            <NavItem eventKey="viewallcases">
              <NavIcon>
                <a className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View All Cases</NavText>
            </NavItem>  

          </SideNav.Nav>
        </SideNav>

        <div id="UnassignedCases" style={styles.divStyleHide} >
        <Router>
          <LawyerViewCase/>
          </Router>
        </div>
        <div id="Tasks" style={styles.divStyleShow} >
        <Router>
          <LawyerViewTasks/>
          </Router>
        </div>
        <div id="AllCases" style={styles.divStyleHide} >
          <CasesContainer/>
        </div>

      </div>
    );
  }
}
