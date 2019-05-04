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
    admin: false,
    lang: ""
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
      if (type.toString() === "admin") this.setState({ admin: true });
      else this.setState({ admin: false });
    } catch {
      this.setState({ admin: false });
    }
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
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
              electronicJournals="lighter"
              DASHBOARDD={true}
              PROFILEE={true}
              ProfileMargin="120px"
              HomePageMargin="0px"
              admin={this.state.admin ? true : false}
            />
          )}
          <div className="createCompany">
            <p className="createCompanySpan">
              {this.state.lang === "eng"
                ? "Create your company"
                : "إنشىء شركتك في أقل من يوم"}
              <br />
              {this.state.lang === "eng" ? "in less than a day" : ""}
            </p>

            <p className="createComp">
              {this.state.lang === "eng"
                ? "Create your company in less than a day"
                : "إنشىء شركتك في أقل من يوم"}
              <br />
            </p>

            <div
              style={{ width: "100px", alignSelf: "left", marginLeft: "15vw" }}
            >
              <RegisterModal lang={this.state.lang} />
            </div>
          </div>
          <div className="arrow">
            <button id="buttonArrow" onClick={this.handleClick}>
              <svg
                className="Path_7_A1_Path_2"
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
        <div className="all">
          <div id="cc" />
          <div className="homePage2">
            <div className="homePage2Div1">
              <div className="homePageContainers">
                <h1 className="homePageHeader">
                  {this.state.lang === "eng"
                    ? "Forget about waiting in lines"
                    : "انسى الانتظار في طوابير"}
                </h1>
                <p className="homePagePar">
                  {this.state.lang === "eng"
                    ? "No more wasting days to create a company. Create your comapny with ease from home"
                    : "لا مزيد من إضاعة الأيام لإنشاء شركة. أنشئ شركتك بسهولة من المنزل"}
                  <br />
                  {this.state.lang === "eng"
                    ? "using our remote company establishment system."
                    : ".باستخدام نظامنا لتأسيس الشركات عن بعد"}
                </p>
                {/* <img className="rightImage"src="https://solink.com/img/blog/people-waiting-in-line.jpg" alt="Smiley face" ></img> */}
              </div>
            </div>
            <div className="homePage2Div2">
              <div className="homePageContainers">
                <h1 className="homePageHeader">
                  {this.state.lang === "eng"
                    ? "Track your company progress"
                    : "تابع تقدم شركتك"}
                </h1>
                <p className="homePagePar">
                  {this.state.lang === "eng"
                    ? "Why ask about the progress daily? Now you can view the state of your new company"
                    : "لماذا السؤال اليومي عن تقدم شركتك؟"}
                  <br />
                  {this.state.lang === "eng"
                    ? "from the comfort of your home."
                    : "!الآن يمكنك عرض حالة شركتك الجديدة من منزلك"}
                </p>
              </div>
            </div>
            <div className="homePage2Div1">
              <div className="homePageContainers">
                <h1 className="homePageHeader">
                  {this.state.lang === "eng"
                    ? "View the latest companies"
                    : "عرض أحدث الشركات"}
                </h1>
                <p className="homePagePar">
                  {this.state.lang === "eng"
                    ? "Want to know about your competitors? Check out all the latest companies established"
                    : "هل تريد أن تعرف عن منافسيك؟ تحقق من جميع الشركات المنشأة حديثآ"}
                  <br />
                  {this.state.lang === "eng"
                    ? "using our remote company establishment system."
                    : ".باستخدام نظامنا لتأسيس الشركات عن بعد"}
                  <br />
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
                  {this.state.lang === "eng" ? "View Journals" : "عرض المجلات"}
                </Fab>
              </div>
            </div>
            <div className="homePage2Div3">
              <div className="homePageContainers">
                <h1 className="homePageHeader2">
                  {this.state.lang === "eng"
                    ? "Start your next big thing"
                    : "ابدأ مشروعك الكبير القادم"}
                </h1>
                <p className="homePagePar2">
                  {this.state.lang === "eng"
                    ? "You are a click away from establishing your own company!"
                    : "أنت على بعد ضغطة واحدة من تأسيس شركتك الخاصة!"}
                </p>

                <RegisterModal lang={this.state.lang} />
              </div>
            </div>
            <div className="SumergiteCopyRight_A0_Text_16">
              <p className="sumergiteCopyRight">
                {this.state.lang === "eng" ? "Sumergite" : "سمرجايت"} &copy;
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
