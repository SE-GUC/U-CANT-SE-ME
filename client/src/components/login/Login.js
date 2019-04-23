import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import { login } from "../../globalState/actions/authActions";
import "./login.scss";
import NavBarBlue from "../NavBarBlue";
import NavBarDashboard from "../NavBarDashboard";
import parseJwt from "../../helpers/decryptAuthToken";
class Login extends Component {
  state = {
    email: "",
    password: "",
    id: "",
    showPassword: false,
    forgot: false,
    signUp: false,
    res: "",
    loggedIn: false,
    lang: ""
  };
  async componentDidMount() {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
  }
  handleSubmit = async () => {
    const req = {
      email: this.state.email,
      username: this.state.email,
      password: this.state.password
    };
    try {
      const res = await login(req);
      this.setState({ res: res });
    } catch (error) {
      document.getElementById("Error").style.display = "inline";
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  async componentDidMount() {
    try {
      const id = await parseJwt(localStorage.jwtToken).id;
      if (id) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    } catch {
      this.setState({ loggedIn: false });
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }
    const styles = {
      error: {
        display: "none"
      },
      label: {
        width: "35%",
        margin: "auto"
      }
    };
    return (
      <div>
        {/* <NavBarDashboard sumergiteColor= '#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' dashboard='bold' profile='lighter' homepage='lighter' DASHBOARD={true} PROFILE={true} ProfileMargin='120px' HomePageMargin='0px'/>  */}
        {/* <NavBarDashboard sumergiteColor= '#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' dashboard='bold' profile='lighter' homepage='lighter' DASHBOARD={false} PROFILE={false} HomePageMargin='120px'/>  */}
        {/* <NavBarDashboard sumergiteColor= '#3480E3' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)' dashboard='bold' profile='lighter' homepage='lighter' DASHBOARD={false} PROFILE={false} HomePageMargin='120px' LeftButton={true}/>  */}
        {/* <NavBarBlue sumergiteColor= '#FFFFFF' backgroundColor='#3480E3' loginColor='#FFFFFF'/> */}
        <NavBarBlue
          sumergiteColor="#3480E3"
          backgroundColor="#FFFFFF"
          boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
          popUpRegister={true}
        />
        <div style={{ paddingTop: "10vh" }}>
          <div class="wrapper">
            <div
              class="page-header"
              style={{
                backgroundImage: "url('../assets/img/login-image.jpg')"
              }}
            >
              <div class="filter" />
              <div class="container">
                <div class="row">
                  <div class="col-lg-4 col-sm-6 mr-auto ml-auto">
                    <div
                      class="card card-register"
                      style={{
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
                      }}
                    >
                      <h3
                        class="title"
                        style={{
                          fontFamily:
                            "-apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "30px",
                          fontWeight: "bold",
                          color: "#223242"
                        }}
                      >
                        {this.state.lang === "eng"
                          ? "Welcome Back!"
                          : "مرحبا بعودتك"}
                      </h3>
                      <h5
                        style={{
                          marginTop: "5px",
                          fontFamily:
                            "-apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "14px",
                          fontWeight: "lighter",
                          color: "#222529",
                          textAlign: "center"
                        }}
                      >
                        {this.state.lang === "eng"
                          ? "Login back to your dashboard"
                          : "تسجيل الدخول مرة أخرى إلى لوحة القيادة الخاصة بك"}
                      </h5>
                      <form class="login-form">
                        <input
                          type="text"
                          id="email"
                          onChange={this.handleChange}
                          class="form-control"
                          placeholder={
                            this.state.lang === "eng"
                              ? "email or username"
                              : "البريد الإلكتروني أو اسم المستخدم"
                          }
                          autocomplete="username"
                        />
                        <br />
                        <input
                          type="password"
                          id="password"
                          onChange={this.handleChange}
                          class="form-control"
                          placeholder={
                            this.state.lang === "eng" ? "password" : "كلمة السر"
                          }
                          autocomplete="current-password"
                        />
                        <br />
                        <label
                          id="Error"
                          style={styles.error}
                          class="text-danger"
                        >
                          {" "}
                          {this.state.lang === "eng"
                            ? "Wrong Email or Password"
                            : "البريد الإلكتروني أو كلمة المرور خاطئة"}
                        </label>
                        <br />
                        <Fab
                          variant="extended"
                          size="large"
                          color="secondary"
                          style={{
                            color: "#FFFFFF",
                            height: "31px",
                            width: "107px",
                            fontSize: "13px",
                            boxShadow: "none",
                            marginRight: "240px",
                            marginTop: "6px",
                            display: "block",
                            margin: "0 auto"
                          }}
                          aria-label="Delete"
                          onClick={this.handleSubmit}
                        >
                          {this.state.lang === "eng" ? "Login" : "تسجيل الدخول"}
                        </Fab>
                      </form>
                      <br />
                      <div class="forgot">
                        <Button
                          variant="primary"
                          style={{
                            fontFamily:
                              "-apple-system, BlinkMacSystemFont, sans-serif",
                            color: "#E53167",
                            fontSize: "11px",
                            fontWeight: "bold"
                          }}
                          size="small"
                          onClick={() => {
                            this.setState({ forgot: true });
                          }}
                        >
                          {this.state.lang === "eng"
                            ? "Forgot password?"
                            : "هل نسيت كلمة المرور؟"}{" "}
                        </Button>
                      </div>
                      <br />
                      <br />
                      <div
                        style={{
                          textAlign: "left",
                          color: "black",
                          fontFamily:
                            "-apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "11px"
                        }}
                      >
                        {this.state.lang === "eng"
                          ? "Don't have an account?"
                          : ""}
                        <a
                          class="btn btn-link btn-info"
                          style={{
                            textAlign: "left",
                            color: "black",
                            fontFamily:
                              "-apple-system, BlinkMacSystemFont, sans-serif",
                            fontSize: "11px",
                            marginTop: "-1px",
                            outline: "none",
                            border: "none"
                          }}
                          onClick={() => {
                            this.setState({ register: true });
                          }}
                        >
                          {this.state.lang === "eng"
                            ? "Forgot password?"
                            : "افتح حسابًا في سمرجايت"}
                        </a>
                      </div>
                    </div>
                    {this.state.res.toString() === "investor" ? (
                      <Redirect to={{ pathname: "/profile" }} />
                    ) : this.state.res.toString() === "lawyer" ? (
                      <Redirect
                        to={{ pathname: "/internalPortal/lawyer/profile" }}
                      />
                    ) : this.state.res.toString() === "reviewer" ? (
                      <Redirect
                        to={{ pathname: "/internalPortal/reviewer/profile" }}
                      />
                    ) : this.state.res.toString() === "admin" ? (
                      <Redirect to={{ pathname: "/AdminDashBoard" }} />
                    ) : (
                      <label />
                    )}
                  </div>
                  {this.state.forgot === true ? (
                    <Redirect to={{ pathname: "/forgot" }} />
                  ) : this.state.register === true ? (
                    <Redirect to={{ pathname: "/InvestorRegister" }} />
                  ) : (
                    <label />
                  ) //to be set to unified registration page
                  }
                </div>
              </div>
            </div>
            {this.state.res.toString() === "investor" ? (
              <Redirect to={{ pathname: "/investorDashboard" }} />
            ) : this.state.res.toString() === "lawyer" ? (
              <Redirect to={{ pathname: "/lawyerDashboard" }} />
            ) : this.state.res.toString() === "reviewer" ? (
              <Redirect to={{ pathname: "/reviewerDashboard" }} />
            ) : this.state.res.toString() === "admin" ? (
              <Redirect to={{ pathname: "/adminDashboard" }} />
            ) : (
              <label />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
