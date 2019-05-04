import React from "react";
import axios from "axios";
import "../components/register.scss";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import CrossIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
const Joi = require("joi");

export default class RegisterLawyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullNameError: "",
      emailError: "",
      passwordError: "",
      usernameError: "",
      val: "",
      showPassword: false,
      passed: false,
      lang: "",
      success: false,
      loading: false,
      clicked: false
    };
  }
  componentDidMount = async () => {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
    try {
      await axios.get("api/admins/auth");
      this.setState({ passed: true });
    } catch (err) {
      this.setState({ passed: false });
    }
  };
  submit = async () => {
    if (!this.state.loading) {
      await this.setState({
        success: false,
        loading: true,
        clicked: true
      });
    }
    var valid = true;
    const me = this;
    var username = document.getElementById("username");
    var fullName = document.getElementById("fullName");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const body = {
      username: username.value,
      fullName: fullName.value,
      email: email.value,
      password: password.value
    };
    Joi.validate(
      { username: body.username },
      {
        username: Joi.string()
          .min(3)
          .required()
      },
      function(error, value) {
        if (error) {
          valid = false;
          if (value.username === "")
            me.setState({ usernameError: "User name is required" });
          else me.setState({ usernameError: "Invalid Name" });
        } else me.setState({ usernameError: "" });
      }
    );

    Joi.validate(
      { fullName: body.fullName },
      {
        fullName: Joi.string()
          .min(10)
          .required()
      },
      function(error, value) {
        if (error) {
          valid = false;
          if (value.fullName === "")
            me.setState({ fullNameError: "Full name is required" });
          else me.setState({ fullNameError: "Invalid Name" });
        } else me.setState({ fullNameError: "" });
      }
    );

    Joi.validate(
      { email: body.email },
      { email: Joi.string().required() },
      function(error, value) {
        if (error) {
          valid = false;
          if (value.email === "")
            me.setState({ emailError: "Email is required" });
          else me.setState({ emailError: "Invalid Email" });
        } else me.setState({ emailError: "" });
      }
    );

    Joi.validate(
      { password: body.password },
      {
        password: Joi.string()
          .min(4)
          .required()
      },
      function(error, value) {
        if (error) {
          valid = false;
          if (value.password === "")
            me.setState({ passwordError: "Password is required" });
          else me.setState({ passwordError: "Password is weak" });
        } else me.setState({ passwordError: "" });
      }
    );

    if (valid) {
      try {
        await axios.post("api/admins/registerLawyer", body);
        await this.setState({ success: true, loading: false });
        this.setState({ val: "Successfully Created!" });
      } catch {
        await this.setState({ success: false, loading: false });
        this.state.usernameError = "make sure the username is unique";
        this.state.emailError = "make sure the email is unique";
        this.setState({ val: "Username or Email are not unique" });
      }
    } else {
      await this.setState({ success: false, loading: false });
      this.setState({ val: "" });
    }
  };

  render() {
    const { loading, success, clicked } = this.state;
    if (!this.state.passed) return <h1>Unauthorized</h1>;
    else
      return (
        <div style={{ paddingTop: "0vh" }}>
          <div className="wrapper">
            <div className="page-header" style={{}}>
              <div className="filter" />
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-sm-6 mr-auto ml-auto">
                    <div
                      className="card card-register"
                      style={{
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
                      }}
                    >
                      <h3
                        className="title"
                        style={{
                          fontFamily:
                            "-apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "30px",
                          fontWeight: "bold",
                          color: "#223242"
                        }}
                      >
                        {this.state.lang === "eng"
                          ? "Register Lawyer"
                          : "سجل محام"}
                      </h3>
                      <form id="RegisterLawyer">
                        <input
                          id="username"
                          type="text"
                          placeholder={
                            this.state.lang === "eng"
                              ? "Username"
                              : "اسم المستخدم"
                          }
                          className="form-control"
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.usernameError}
                        </label>
                        <br />
                        <input
                          id="email"
                          type="text"
                          className="form-control"
                          placeholder={
                            this.state.lang === "eng"
                              ? "Email"
                              : "البريد الإلكتروني"
                          }
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.emailError}
                        </label>
                        <br />
                        <input
                          id="fullName"
                          type="text"
                          placeholder={
                            this.state.lang === "eng"
                              ? "Full Name"
                              : "الاسم الكامل"
                          }
                          className="form-control"
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.fullNameError}
                        </label>
                        <br />
                        <input
                          id="password"
                          type="password"
                          placeholder={
                            this.state.lang === "eng" ? "Password" : "كلمة السر"
                          }
                          className="form-control"
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.passwordError}
                        </label>
                      </form>
                      <div
                        key="divv"
                        className="CircularIntegration-root-241"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div
                          key="divvvv"
                          className="CircularIntegration-wrapper-242"
                          style={{
                            marginRight: "240px",
                            marginTop: "12px",
                            display: "block",
                            margin: "0 auto",
                            position: "relative"
                          }}
                        >
                          <Fab
                            color="primary"
                            className=""
                            style={
                              success && clicked && !loading
                                ? {
                                    backgroundColor: green[500],
                                    "&:hover": {
                                      backgroundColor: green[700]
                                    }
                                  }
                                : !success && clicked && !loading
                                ? {
                                    backgroundColor: red[500],
                                    "&:hover": {
                                      backgroundColor: red[700]
                                    }
                                  }
                                : {}
                            }
                            onClick={this.submit}
                          >
                            {success && clicked ? (
                              <CheckIcon />
                            ) : !success && clicked && !loading ? (
                              <CrossIcon />
                            ) : (
                              <Typography
                                variant="body1"
                                style={{ color: "#ffffff", fontSize: "10px" }}
                              >
                                {this.state.lang === "eng" ? "Register" : "سجل"}
                              </Typography>
                            )}
                          </Fab>
                          {loading && (
                            <CircularProgress
                              size={68}
                              className="CircularIntegration-fabProgress-909"
                              style={{
                                color: green[500],
                                position: "absolute",
                                top: -6,
                                left: -6,
                                zIndex: 1
                              }}
                            />
                          )}
                        </div>
                      </div>
                      {/* <div align="center">
                        <Fab
                          variant="extended"
                          size="medium"
                          style={{
                            boxShadow: "none",
                            marginTop: "6px",
                            backgroundColor: "#1ace98",
                            color: "#FFFFFF",
                            width: 150
                          }}
                          aria-label="Delete"
                          onClick={this.submit}
                        >
                          {this.state.lang === "eng" ? "Register" : "سجل"}
                        </Fab>
                      </div> */}
                      <br />
                      <br />
                      <label id="Success" className="text-danger">
                        {this.state.val}
                      </label>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
