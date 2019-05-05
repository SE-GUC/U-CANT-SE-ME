import React, { Component } from "react";
import "./NavBarBlue.css";
import { logout } from "../globalState/actions/authActions";
import parseJwt from "../helpers/decryptAuthToken";
import Language from "@material-ui/icons/Language";
import Fab from "@material-ui/core/Fab";
import { Redirect } from "react-router-dom";

export default class NavBarDashboard extends Component {
  state = {
    headerHeight: 0,
    screenHeight: 0,
    screenWidth: 0,
    type: "",
    lang: "",
    loggedin: false,
    dashboard: false,
    homepage: false,
    profile: false,
    electronicJournals: false,
    logout: false,
    currentScrollHeight:0,
    targetHeight:0
  };

  async componentWillUnmount() {
    await this.setState({
      dashboard: false,
      homepage: false,
      profile: false,
      electronicJournals: false,
      hero: false,
      logout: false
    });
  }

  async componentDidMount() {
    try {
      const type = parseJwt(localStorage.jwtToken).type;
      this.state.type = type;
      await this.setState({ loggedin: true });
    } catch {}
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
        backgroundColor: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold" ? "rgba(255, 255, 255," + opacity2 + ")" : "rgba(255, 255, 255," + opacity1 + ")",
        background:"transparent"
      },
      buttonColor: "red",
      SumergiteLabel: {
        color: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold" ? "#3480e3":"#FFF" ,
        float: "left",
        al: "left",
        fontSize: "28px",
        marginLeft: this.props.homepage==="bold"?"13vw":"1px",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "bold"
        // marginTop: "11px"
      },
      Header: {
        boxShadow: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold"? "0px 3px  20px rgba(0, 0, 0, 0.16)":"none",
        position: "fixed",
        backgroundColor: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold"? "rgba(255, 255, 255," + opacity2 + ")" : "rgba(255, 255, 255," + opacity1 + ")",
        // backgroundColor: "rgba(255, 255, 255," + opacity + ")",
        
      },
      Dashboard: {
        color: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold" ? "#000":"#FFF" ,
        fontWeight: this.props.dashboard, //either lighter or bold
        fontSize: "14px",
        marginRight: "-20px" //either 120px or 0px
        // marginTop: "10px"
      },
      HomePage: {
        color: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold" ? "#000":"#FFF" ,
        fontWeight: this.props.homepage, //either lighter or bold
        fontSize: "14px",
        marginRight: this.state.loggedin && !this.props.admin ? "-20px" : "0px" //either 120px or 0px
        // marginTop: "10px"
      },
      logout: {
        color: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold" ? "#000":"#FFF" ,
        marginRight: "-20px", //either 120px or 0px
        fontWeight: "lighter", //either lighter or bold
        fontSize: "14px"
        // marginTop: "10px"
      },
      Profile: {
        color: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold" ? "#000":"#FFF" ,
        fontWeight: this.props.profile, //either lighter or bold
        fontSize: "14px"
        // marginTop: "10px",
        // marginRight: this.props.ProfileMargin //either 120px or 0px
      },
      ElectronicJournals: {
        color: window.scrollY>=this.state.targetHeight || this.props.homepage!=="bold" ? "#000":"#FFF" ,
        fontWeight: this.props.electronicJournals,
        fontSize: "14px",
        marginRight: "-20px" //either 120px or 0px
        // marginTop: "50px"
      }
    };
    return (
      <div className="Header" id="Header" style={styles.Header} ref="Header">
        {this.state.homepage ? (
          <Redirect to="/" />
        ) : this.state.dashboard ? (
          <Redirect to={`/${this.state.type.toString()}Dashboard`} />
        ) : this.state.profile ? (
          <Redirect
            to={`${
              this.state.type.toString() === "investor"
                ? "/profile"
                : this.state.type.toString() === "reviewer"
                ? "/internalPortal/reviewer/profile"
                : this.state.type.toString() === "lawyer"
                ? "/internalPortal/lawyer/profile"
                : "/internalPortal/admin/profile"
            }`}
          />
        ) : this.state.electronicJournals ? (
          <Redirect to="/ElectronicJournals" />
        ) : this.state.logout ? (
          <Redirect to="/" />
        ) : (
          <div />
        )}
        <nav
          className="navbar navbar-expand-lg navbar-light bg-"
          id="navbarmob"
          style={styles.content}
        >
          <button
            id="logo"
            style={styles.SumergiteLabel}
            onClick={async () => {
              if (!this.state.homepage && window.location.pathname !== "/") {
                this.setState({ homepage: true });
              }
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
              {this.state.loggedin ? (
                <li className="nav-item mr-auto">
                  <button
                    className="button"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    onClick={async () => {
                      let redirectString =
                        "/" + this.state.type.toString() + "Dashboard";
                      if (
                        !this.state.dashboard &&
                        window.location.pathname !== redirectString
                      ) {
                        this.setState({ dashboard: true });
                      }
                      // let redirectString =
                      //   "/" + this.state.type.toString() + "Dashboard";
                      // window.location.href = redirectString;
                    }}
                  >
                    <span id="buttonHome" style={styles.Dashboard}>
                      {this.state.lang === "eng" ? "Dashboard" : "لوحة القيادة"}
                    </span>
                  </button>
                </li>
              ) : (
                <label />
              )}
              <li className="nav-item mr-auto">
                <button
                  className="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  onClick={async () => {
                    if (
                      !this.state.electronicJournals &&
                      window.location.pathname !== "/ElectronicJournals"
                    ) {
                      this.setState({ electronicJournals: true });
                    }
                    // window.location.href = "/ElectronicJournals";
                  }}
                >
                  <span id="buttonHome" style={styles.ElectronicJournals}>
                    {this.state.lang === "eng"
                      ? "Electronic Journals"
                      : "المجلات الإلكترونية"}
                  </span>
                </button>
              </li>
              <li className="nav-item mr-auto">
                <button
                  className="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  onClick={async () => {
                    if (
                      !this.state.homepage &&
                      window.location.pathname !== "/"
                    ) {
                      this.setState({ homepage: true });
                    }
                    // window.location.href = "/";
                  }}
                >
                  <span id="buttonHome" style={styles.HomePage}>
                    {this.state.lang === "eng" ? "Homepage" : "الصفحة الرئيسية"}
                  </span>
                </button>
              </li>
              {this.state.loggedin && this.state.type.toString()!=="admin" ? (
                <li className="nav-item mr-auto">
                  <button
                    className="button"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    onClick={async () => {
                      const type = this.state.type;
                      let profileString = "";
                      if (type.toString() === "investor") {
                        profileString = "/profile";
                      }
                      if (type.toString() === "reviewer") {
                        profileString = "/internalPortal/reviewer/profile";
                      }
                      if (type.toString() === "lawyer") {
                        profileString = "/internalPortal/lawyer/profile";
                      }
                      if (type.toString() === "admin") {
                        profileString = "/internalPortal/admin/profile";
                      }
                      // window.location.href = profileString;
                      if (
                        !this.state.profile &&
                        window.location.pathname !== profileString
                      ) {
                        this.setState({ profile: true });
                      }
                    }}
                  >
                    <span id="buttonHome" style={styles.Profile}>
                      {this.state.lang === "eng" ? "Profile" : "الملف الشخصي"}
                    </span>
                  </button>
                </li>
              ) : (
                <label />
              )}
              {this.state.type !== "" ? (
                <li className="nav-item mr-auto">
                  <button
                    className="button"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    onClick={async () => {
                      logout();
                      if (
                        !this.state.logout &&
                        window.location.pathname !== "/logout"
                      ) {
                        this.setState({ homepage: true });
                      }
                      if (window.location.pathname === "/")
                        window.location.reload();
                      // window.location.href = "/";
                    }}
                  >
                    <span id="buttonHome" style={styles.logout}>
                      {this.state.lang === "eng" ? "Logout" : "تسجيل الخروج"}
                    </span>
                  </button>
                </li>
              ) : (
                <div />
              )}
              <li className="nav-item mr-auto">
                <button
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                />
                <Fab
                  onClick={this.handleChangeLanguage}
                  style={{ color: "default", marginTop: "5px", float: "left" }}
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
