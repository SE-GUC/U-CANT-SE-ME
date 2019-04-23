import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Redirect } from "react-router-dom";
import "../components/register.scss"
import Fab from "@material-ui/core/Fab";

const Joi = require("joi");
export default class RegisterReviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullNameError: "",
      emailError: "",
      passwordError: "",
      usernameError: "",
      val: "",
      showPassword: false,
      passed: false
    };
  }

  componentDidMount = async () => {
    //Rount for authorization
    try {
      await axios.get("api/admins/auth");
      this.setState({ passed: true });
    } catch (err) {
      this.setState({ passed: false });
    }
  };
  submit = async () => {
    var valid = true;
    const me = this;
    var username = document.getElementById("usernameRev");
    var fullName = document.getElementById("fullNameRev");
    var email = document.getElementById("emailRev");
    var password = document.getElementById("passwordRev");
    console.log(username)
    console.log(password)
    console.log(email)
    console.log(fullName)
    const body = {
      username: username.value,
      fullName: fullName.value,
      email: email.value,
      password: password.value
    };
    console.log(body)
    Joi.validate(
      { username: body.username },
      {
        username: Joi.string()
          .min(1)
          .max(100)
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
          .min(3)
          .max(150)
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
      {
        email: Joi.string()
          .email()
          .max(100)
          .required()
      },
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
          .min(5)
          .max(100)
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
        await axios.post("api/admins/registerReviewer", body);
        this.setState({ val: "Successfully Created!" });
      } catch (error) {
        this.state.usernameError = "This username is already in use";
        this.setState({ val: "Oops something went wrong!" });
      }
    } else {
      this.setState({ val: "" });
    }
  };

  render() {
    const styles = {
      error: {
        display: "none"
      },
      label: {
        width: "35%",
        margin: "auto"
      }
    };
    if (!this.state.passed) return <h1>Unauthorized</h1>;
    else
      return (
        <div style={{ paddingTop: "0vh" }}>
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
                        Register Reviewer
                      </h3>
                      <form id="RegisterReviewer">
                        <input
                          id="usernameRev"
                          type="text"
                          placeholder="Username"
                          class="form-control"
                        />
                        <br />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.usernameError}
                        </label>
                        <br />
                        <input
                          id="emailRev"
                          type="text"
                          class="form-control"
                          placeholder="Email"
                        />
                        <br />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.emailError}
                        </label>
                        <br />
                        <input
                          id="fullNameRev"
                          type="text"
                          placeholder="Full Name"
                          class="form-control"
                        />
                        <br />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.fullNameError}
                        </label>
                        <br />
                        <input
                          id="passwordRev"
                          type="password"
                          placeholder="Password"
                          class="form-control"
                        />
                        <br />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.passwordError}
                        </label>
                      </form>
                      <div align="center">
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
                          Register
                        </Fab>
                      </div>
                      <br />
                      <br />
                      <label id="Success" class="text-danger">
                        {(
                          this.state.val
                        )}
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
