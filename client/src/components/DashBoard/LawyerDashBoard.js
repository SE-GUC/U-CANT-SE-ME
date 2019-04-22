import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import { Redirect } from 'react-router-dom'
import LawyerViewTasks from "../caseComponents/LawyerViewTasks";
import LawyerViewCase from "../caseComponents/LawyerViewCase";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CaseSwitch from "../caseComponents/CaseSwitch";
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
    document.getElementById("FormRequest").style.display="none";
    document.getElementById("UnassignedCases").style.display="none";
    document.getElementById("Tasks").style.display="none";
    document.getElementById("AllCases").style.display="none";

    if(selected === "formrequest")
        document.getElementById("FormRequest").style.display="flex";

    if (selected === "viewunasignedcases")
        document.getElementById("UnassignedCases").style.display="flex";

    if (selected === "viewtasks")
        document.getElementById("Tasks").style.display="flex";

    if (selected === "viewallcases")
        document.getElementById("AllCases").style.display="flex";
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
        display: ' inline',
        marginLeft:this.state.dashboardwidth,
        background:"red",
        // display: 'flex', 
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
          <SideNav.Nav defaultSelected="viewtasks">
            
          <NavItem eventKey="viewtasks">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View Tasks</NavText>
            </NavItem>

            <NavItem eventKey="viewunasignedcases">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View Unasigned Cases</NavText>
            </NavItem>

            <NavItem eventKey="viewallcases">
              <NavIcon>
                <i className="fa fa-home" style={styles.iconStyle} />
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
        <div id="Tasks" style={styles.divStyleHide} >
        <Router>
          <LawyerViewTasks/>
          </Router>
        </div>
        <div id="AllCases" style={styles.divStyleHide} >
        <Router>
          <CaseSwitch/>
          </Router>
        </div>

      </div>
    );
  }
}
