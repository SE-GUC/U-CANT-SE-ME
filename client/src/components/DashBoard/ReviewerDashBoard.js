import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import { Redirect } from 'react-router-dom'
export default class LawyerDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            caseSummary: false,
            caseSwitch: false,
            viewAllCases: false,
            registerLawyer: false,
            registerReviewer: false,
            createFormTemplate: false,
            home:0
        }
      }
    handleSelect = selected => {
    console.log(selected);
    if(selected === "viewmycompanies")
    {
        this.setState({registerLawyer: true})
    }else
    if (selected === "case/all") {

    }
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
        textAlign: "center"
        // marginLeft:"64px",
        // backgroundColor:"black"
      },
      divStyleHide:{
        display: 'none'
      }
    };
    return (
      <div>
          {
            this.state.caseSummary? <Redirect to={{pathname: "/CasesSummary"}}/>:
            this.state.caseSwitch? <Redirect to={{pathname: "/CaseSwitch"}}/>:
            this.state.viewAllCases? <Redirect to={{pathname: "/AdminViewAllCases"}}/>:
            this.state.registerLawyer? <Redirect to={{pathname: "/RegisterLawyer"}}/>:
            this.state.registerReviewer? <Redirect to={{pathname: "/RegisterReviewer"}}/>:
            this.state.createFormTemplate? <Redirect to={{pathname: "/CreateFormTemplate"}}/>:<div/>
        }
        <SideNav onSelect={this.handleSelect} style={styles.navStyle}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected={this.props.defaultSelected}>
            
            <NavItem eventKey="viewunasignedcases">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View Unasigned Cases</NavText>
            </NavItem>

            <NavItem eventKey="viewtasks">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View Tasks</NavText>
            </NavItem>

            <NavItem eventKey="viewallcases">
              <NavIcon>
                <i className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View All Cases</NavText>
            </NavItem>  
            
          </SideNav.Nav>
        </SideNav>
      </div>
    );
  }
}
