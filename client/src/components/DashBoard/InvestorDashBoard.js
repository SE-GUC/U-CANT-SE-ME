import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import { Redirect } from 'react-router-dom'
export default class InvestorDashBoard extends Component {
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
            
            <NavItem eventKey="viewmycompanies">
              <NavIcon>
                <i className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>My Companies</NavText>
            </NavItem>
            
            <NavItem eventKey="createnewcompany">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>Creat Your Company</NavText>
              <NavItem eventKey="createnewcompany/fillform">
                <NavText>Fill The Form</NavText>
              </NavItem>
              <NavItem eventKey="createnewcompany/lawyer">
                <NavText>Ask A Lawyer</NavText>
              </NavItem>
            </NavItem>

            <NavItem eventKey="viewongoingcompanyrequests">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>On Going Requests</NavText>
              <NavItem eventKey="createnewcompany/all">
                <NavText>All Companies</NavText>
              </NavItem>
              <NavItem eventKey="createnewcompany/awaitingpayment">
                <NavText>Awaiting Payment</NavText>
              </NavItem>
              <NavItem eventKey="createnewcompany/needupdate">
                <NavText>Need Update</NavText>
              </NavItem>
              <NavItem eventKey="createnewcompany/pending">
                <NavText>Pending</NavText>
              </NavItem>
            </NavItem>

          </SideNav.Nav>
        </SideNav>
      </div>
    );
  }
}
