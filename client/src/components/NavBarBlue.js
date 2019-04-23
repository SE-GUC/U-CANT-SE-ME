import React, { Component } from "react";
import "./NavBarBlue.css";
import Fab from "@material-ui/core/Fab";
import { Redirect } from "react-router-dom";
import RegisterModal from "./RegisterModal";
export default class NavBarBlue extends Component {
  state = {
    headerHeight: 0,
    screenHeight: 0,
    screenWidth: 0,
    login: false,
    register: false,
    hero: false
  };
  render() {
    const opacity = 1 - Math.min(10 / this.state.currentScrollHeight, 1);
    const styles = {
      content: {
        backgroundColor: this.props.backgroundColor //either #3480E3 or #FFFFFF
      },
      buttonColor: "red",
      SumergiteLabel: {
        color: this.props.sumergiteColor, //either #3480E3 or #FFFFFF
        fontSize: "28px",
        marginLeft: "200px",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "bold",
        marginTop: "11px"
      },
      Header: {
        boxShadow: this.props.boxShadow //either none or '0px 3px 20px rgba(0, 0, 0, 0.16)'
      },
      Login: {
        color: this.props.loginColor //either don't pass or #FFFFFF
      }
    };
    if (this.state.login) {
      this.setState({ login: false });
      this.setState({ register: false });
      this.setState({ hero: false });
      return <Redirect to="/Login" />;
    }
    if (this.state.register) {
      this.setState({ login: false });
      this.setState({ register: false });
      this.setState({ hero: false });
      return <Redirect to="/InvestorRegister" />;
    }
    if (this.state.hero) {
      this.setState({ login: false });
      this.setState({ register: false });
      this.setState({ hero: false });
      return <Redirect to="/" />;
    }
    return (
      //navbar navbar-default navbar-alt
      //navbar navbar-expand-lg navbar-dark bg-dark
      <div className="Header" id="Header" style={styles.Header} ref="Header">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-"
          id="navbarmob"
          style={styles.content}
        >
          <label>
            <button
              style={styles.SumergiteLabel}
              onClick={() => {
                this.setState({ hero: true });
              }}
            >
              Sumergite
            </button>
          </label>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-auto">
                <button
                  // className="nav-link ml-auto"
                  className="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  onClick={() => {
                    this.setState({ login: true });
                  }}
                  // disableRipple = {true}
                >
                  <span id="buttonHome" style={styles.Login}>
                    Login
                  </span>
                </button>
              </li>
              <li className="nav-item mr-auto">
                {this.props.popUpRegister ? (
                  <Fab
                    variant="extended"
                    size="medium"
                    style={{
                      boxShadow: "none",
                      marginRight: "240px",
                      marginTop: "6px",
                      backgroundColor: "#E53167",
                      color: "#FFFFFF"
                    }}
                    aria-label="Delete"
                    onClick={() => {
                      this.setState({ register: true });
                    }}
                  >
                    Register
                  </Fab>
                ) : (
                  <RegisterModal buttonText="Register" />
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
