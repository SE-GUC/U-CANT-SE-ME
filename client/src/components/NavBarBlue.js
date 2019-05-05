import React, { Component } from "react";
import "./NavBarBlue.css";
import Fab from "@material-ui/core/Fab";
import RegisterModal from "./RegisterModal";
import Language from "@material-ui/icons/Language";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default class NavBarBlue extends Component {
  async componentDidMount() {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
    window.onscroll =()=>{
      const newScrollHeight = Math.ceil(window.scrollY / 50) *50;
      if (this.state.currentScrollHeight !== newScrollHeight){
          this.setState({currentScrollHeight: newScrollHeight})
      }
    }
    await this.setState({targetHeight:this.props.first-document.getElementById("Header").getClientRects()[0].y})
    console.log("target "+this.state.targetHeight)
  }
  state = {
    headerHeight: 0,
    screenHeight: 0,
    screenWidth: 0,
    lang: "",
    currentScrollHeight:0,
    targetHeight:0,
    login: false,
    register: false,
    hero: false
  };
  async componentWillUnmount() {
    await this.setState({
      login: false,
      register: false,
      hero: false
    });
  }
  handleChangeLanguage = () => {
    if (this.state.lang === "eng") {
      localStorage.setItem("lang", "ar");
      this.setState(state => ({ lang: "ar" }));
    } else {
      localStorage.setItem("lang", "eng");
      this.setState(state => ({ lang: "eng" }));
    }
    window.location.reload();
  };
  render() {
    const opacity1 = 0;
    const opacity2 = 1;
    const styles = {
      content: {
        backgroundColor: window.scrollY>=this.state.targetHeight? "rgba(255, 255, 255," + opacity2 + ")" : "rgba(255, 255, 255," + opacity1 + ")",
        background:"transparent"
      },
      buttonColor: "red",
      SumergiteLabel: {
        color: window.scrollY>=this.state.targetHeight? "#3480e3":"#FFF" ,
        float: "left",
        al: "left",
        fontSize: "28px",
        marginLeft: "13vw",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "bold"
        // marginTop: "11px"
      },
      Header: {
        // boxShadow: this.props.boxShadow,
        position: "fixed",
        backgroundColor: window.scrollY>=this.state.targetHeight ? "rgba(255, 255, 255," + opacity2 + ")" : "rgba(255, 255, 255," + opacity1 + ")",
        // backgroundColor: "rgba(255, 255, 255," + opacity + ")",
        
      },
      Login: {
        color: window.scrollY>=this.state.targetHeight? "#3480e3":"#FFF" ,
        fontSize: "18px"
      }
    };

    return (
      <div className="Header" id="Header" style={styles.Header} ref="Header">
        {this.state.login ? (
          <Redirect to="/Login" />
        ) : this.state.register ? (
          <Redirect to="/InvestorRegister" />
        ) : this.state.hero ? (
          <Redirect to="/" />
        ) : (
          <div />
        )}
        <nav
          className="navbar navbar-expand-lg navbar-light bg-"
          id="navbarmob"
          style={styles.content}
        >
          {/* <Link id="logo" style={styles.SumergiteLabel} to={{ pathname: "/" }}>
            {this.state.lang === "eng" ? "Sumergite" : "سمرجايت"}
          </Link> */}
          <button
            id="logo"
            style={styles.SumergiteLabel}
            onClick={async () => {
              if (!this.state.hero && window.location.pathname !== "/") {
                this.setState({ hero: true });
              }
              // window.location.href = "/";
            }}
          >
            {this.state.lang === "eng" ? "Sumergite" : "سمرجايت"}
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-auto">
                {/* <Link to={{ pathname: "/Login" }}>
                  <span id="buttonHome" style={styles.Login}>
                    {this.state.lang === "eng" ? "Login" : "تسجيل الدخول"}
                  </span>
                </Link> */}
                <button
                  className="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  onClick={() => {
                    if (
                      !this.state.login &&
                      window.location.pathname !== "/Login"
                    ) {
                      this.setState({ login: true });
                    }
                    // window.location.href = "/Login";
                  }}
                >
                  <span id="buttonHome" style={styles.Login}>
                    {this.state.lang === "eng" ? "Login" : "تسجيل الدخول"}
                  </span>
                </button>
              </li>
              <li className="nav-item mr-auto">
                {this.props.popUpRegister ? (
                  // <Link
                  //   style={{
                  //     boxShadow: "none",
                  //     backgroundColor: "#E53167",
                  //     color: "#FFFFFF",
                  //     marginTop: "7px"
                  //   }}
                  //   to={{ pathname: "/InvestorRegister" }}
                  // >
                  //   Register
                  // </Link>
                  <Fab
                    variant="extended"
                    size="medium"
                    style={{
                      boxShadow: "none",
                      backgroundColor: "#E53167",
                      color: "#FFFFFF",
                      marginTop: "7px"
                    }}
                    aria-label="Delete"
                    onClick={() => {
                      if (
                        !this.state.register &&
                        window.location.pathname !== "/InvestorRegister"
                      ) {
                        this.setState({ register: true });
                      }
                      // window.location.href = "/InvestorRegister";
                    }}
                  >
                    {this.state.lang === "eng" ? "Register" : "تسجيل"}
                  </Fab>
                ) : (
                  <div
                    style={{
                      marginTop: "7px"
                    }}
                  >
                    <RegisterModal lang={this.state.lang} />
                  </div>
                )}
               
              </li>
              <li className="nav-item mr-auto">
                <Fab
                  onClick={this.handleChangeLanguage}
                  style={{
                    marginLeft: "1vw",
                    color: "default",
                    marginTop: "7px"
                  }}
                  size="small"
                >
                  <Language />
                </Fab>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
