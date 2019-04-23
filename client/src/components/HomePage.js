import React, { Component } from "react";
import "./heroPage.css";
import NavBarBlue from "./NavBarBlue";
import NavBarDashboard from "./NavBarDashboard";
import Fab from "@material-ui/core/Fab";
import RegisterModal from "./RegisterModal";
import { Redirect } from "react-router-dom";
import parseJwt from "../helpers/decryptAuthToken";

export default class HomePage extends Component {
  state = {
    navColor: "#FFF",
    sumergiteColor: "#0F80ED",
    loginColor: "#0F80ED",
    journals: false,
    loggedIn: false,
    admin: false
  };
  handleClick = () => {
    var devID =
      document.getElementById("cc").getBoundingClientRect().top +
      window.scrollY;
    window.scrollBy({ top: devID, behavior: "smooth" });
    this.setState({ navColor: "#0F80ED" });
    this.setState({ sumergiteColor: "#FFF" });
    this.setState({ loginColor: "#FFF" });
  };
  async componentDidMount() {
    try {
      const id = await parseJwt(localStorage.jwtToken).id;
      if (id) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    } catch {
      this.setState({ loggedIn: false });
    }
    try {
      const type = await parseJwt(localStorage.jwtToken).type;
      if (type.toString() === 'admin') this.setState({ admin: true });
      else this.setState({ admin: false });
    } catch {
      this.setState({ admin: false });
    }
  }
  render() {
    if (this.state.journals) {
      return <Redirect to="/ElectronicJournals" />;
    }
    return (
      <div className="HeroAndHome">
        <div className="hero">
          {this.state.loggedIn === false ? (
            <NavBarBlue
              sumergiteColor={this.state.sumergiteColor}
              backgroundColor={this.state.navColor}
              loginColor={this.state.loginColor}
            />
          ) : (
            <NavBarDashboard
              sumergiteColor="#3480E3"
              boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
              dashboard="lighter"
              profile="lighter"
              homepage="bold"
              DASHBOARD={true}
              PROFILE={true}
              ProfileMargin="120px"
              HomePageMargin="0px"
              admin={this.state.admin? true: false}
            />
          )}
          <div className="createCompany">
            <p className="createCompanySpan">
              {" "}
              Create your company
              <br />
              in less than a day
            </p>

            <p className="createComp">
              Create your company in less than a day
              <br />
            </p>

            <label
              style={{
                alignSelf: "center",
                boxShadow: "none",
                marginTop: "15px",
                backgroundColor: "#0F80ED",
                color: "#FFFFFF",
                fontFamily: "SF Pro Display",
                marginBottom: "10px ",
                marginLeft: "14vw"
              }}
            >
              <RegisterModal buttonText=" Start Now" />
            </label>
          </div>
          <div className="arrow">
            <button id="buttonArrow" onClick={this.handleClick}>
              <svg
                class="Path_7_A1_Path_2"
                viewBox="8.719 12.382 59.679 33.831"
              >
                <path
                  id="Path_7_A1_Path_2"
                  d="M 61.59608840942383 13.55010986328125 L 38.55812454223633 36.60403823852539 L 15.5201530456543 13.55010986328125 C 13.96456623077393 11.99258518218994 11.44176864624023 11.99258518218994 9.885747909545898 13.54968070983887 C 8.329729080200195 15.10677909851074 8.329733848571777 17.63132476806641 9.885747909545898 19.18841934204102 L 35.72918319702148 45.04890060424805 C 36.47779846191406 45.80119323730469 37.49721908569336 46.22072982788086 38.55812454223633 46.21315383911133 C 39.61861038208008 46.21848678588867 40.63718795776367 45.79928970336914 41.3870735168457 45.04889297485352 L 67.23007965087891 19.1879940032959 C 68.78652191162109 17.63132476806641 68.78652191162109 15.10677909851074 67.23049163818359 13.54968738555908 C 65.67447662353516 11.99259185791016 63.15168762207031 11.99258804321289 61.59566116333008 13.54968070983887 Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div classNameid="all">
          <div id="cc">
            {/* <NavBarBlue sumergiteColor= '#FFF' backgroundColor='#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)'/> */}
            {/* <NavBarBlue sumergiteColor= '#3480E3' backgroundColor='#FFFFFF' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)'/> */}
          </div>
          <div className="homePage2">
            <div className="homePage2Div1">
              <div className="homePageContainers">
                <h1 className="homePageHeader">
                  Forget about waiting in lines
                </h1>
                <p className="homePagePar">
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  <br />
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Ut enim ad minim veniam,
                  <br />
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo.
                </p>
              </div>
            </div>
            <div className="homePage2Div2">
              <div className="homePageContainers">
                <h1 className="homePageHeader">Track your company progress</h1>
                <p className="homePagePar">
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
                  <br />
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Ut enim ad minim veniam, <br />
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo.
                </p>
              </div>
            </div>
            <div className="homePage2Div1">
              <div className="homePageContainers">
                <h1 className="homePageHeader">View the latest companies</h1>
                <p className="homePagePar">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
                  <br />
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Ut enim ad minim veniam, <br />
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo.
                </p>
                <Fab
                  variant="extended"
                  size="large"
                  style={{
                    boxShadow: "none",
                    marginTop: "6px",
                    backgroundColor: "#E53167",
                    color: "#FFFFFF",
                    float: "left",
                    marginLeft: "10vw"
                  }}
                  aria-label="Delete"
                  onClick={() => {
                    this.setState({ journals: true });
                  }}
                >
                  View Journals
                </Fab>
              </div>
            </div>
            <div className="homePage2Div3">
              <div className="homePageContainers">
                <h1 className="homePageHeader2">Start your next big thing</h1>
                <p className="homePagePar2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
                  <br />
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Ut enim ad minim veniam, <br />
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo.
                </p>
                <label
                  style={{
                    alignSelf: "center",
                    boxShadow: "none",
                    marginTop: "15px",
                    backgroundColor: "#F5F6F7",
                    color: "#FFFFFF",
                    fontFamily: "SF Pro Display",
                    marginBottom: "10px ",
                    marginLeft: "14vw"
                  }}
                >
                  <RegisterModal buttonText=" Get Started" />
                </label>
              </div>
            </div>
            <div className="SumergiteCopyRight_A0_Text_16">
              <p className="sumergiteCopyRight">Sumergite &copy;</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
