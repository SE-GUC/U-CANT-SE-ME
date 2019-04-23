import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../components/register.scss";
import Fab from "@material-ui/core/Fab";
import { login } from "../globalState/actions/authActions.js";
import NavBarBlue from "./NavBarBlue";

const Joi = require("joi");
export default class InvestorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullNameError: "",
      emailError: "",
      passwordError: "",
      nationalityError: "",
      identificationNumberError: "",
      dateOfBirthError: "",
      residenceAddressError: "",
      telephoneNumberError: "",
      faxError: "",
      valid: "",
      type: "",
      gender: "",
      methodOfIdentification: "",
      showPassword: false
    };
  }
  submit = async () => {
    var valid = true;
    var body;
    const me = this;
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000); //can not be older than 120 years
    var form = document.getElementById("InvestorRegister");
    if (form.fax.value === "" && form.telephoneNumber.value === "") {
      body = {
        fullName: form.fullName.value,
        email: form.email.value,
        password: form.password.value,
        type: form.type.value,
        gender: form.gender.value,
        nationality: form.nationality.value,
        methodOfIdentification: form.methodOfIdentification.value,
        identificationNumber: form.identificationNumber.value,
        dateOfBirth: form.dateOfBirth.value,
        residenceAddress: form.residenceAddress.value
      };
    } else {
      if (form.fax.value !== "" && form.telephoneNumber.value === "") {
        body = {
          fullName: form.fullName.value,
          email: form.email.value,
          password: form.password.value,
          type: form.type.value,
          gender: form.gender.value,
          nationality: form.nationality.value,
          methodOfIdentification: form.methodOfIdentification.value,
          identificationNumber: form.identificationNumber.value,
          dateOfBirth: form.dateOfBirth.value,
          residenceAddress: form.residenceAddress.value,
          fax: form.fax.value
        };
      } else {
        if (form.fax.value === "" && form.telephoneNumber.value !== "") {
          body = {
            fullName: form.fullName.value,
            email: form.email.value,
            password: form.password.value,
            type: form.type.value,
            gender: form.gender.value,
            nationality: form.nationality.value,
            methodOfIdentification: form.methodOfIdentification.value,
            identificationNumber: form.identificationNumber.value,
            dateOfBirth: form.dateOfBirth.value,
            residenceAddress: form.residenceAddress.value,
            telephoneNumber: form.telephoneNumber.value
          };
        } else {
          body = {
            fullName: form.fullName.value,
            email: form.email.value,
            password: form.password.value,
            type: form.type.value,
            gender: form.gender.value,
            nationality: form.nationality.value,
            methodOfIdentification: form.methodOfIdentification.value,
            identificationNumber: form.identificationNumber.value,
            dateOfBirth: form.dateOfBirth.value,
            residenceAddress: form.residenceAddress.value,
            telephoneNumber: form.telephoneNumber.value,
            fax: form.fax.value
          };
        }
      }

      this.setState({ type: body.type });
      Joi.validate(
        { fullName: body.fullName },
        { fullName: Joi.string().min(3) },
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
        { email: Joi.string().email() },
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
        { password: Joi.string().min(8) },
        function(error, value) {
          if (error) {
            valid = false;
            if (value.password === "")
              me.setState({ passwordError: "Password is required" });
            else me.setState({ passwordError: "Password is weak" });
          } else me.setState({ passwordError: "" });
        }
      );
      Joi.validate(
        { nationality: body.nationality },
        { nationality: Joi.string() },
        function(error, value) {
          if (error) {
            valid = false;
            me.setState({ nationalityError: "Nationality is required" });
          } else me.setState({ nationalityError: "" });
        }
      );
      Joi.validate(
        { identificationNumber: body.identificationNumber },
        { identificationNumber: Joi.string() },
        function(error, value) {
          if (
            body.nationality === "Egyptian" &&
            body.identificationNumber.length !== 14
          ) {
            valid = false;
            me.setState({
              identificationNumberError:
                "Identification number must be 14 digits"
            });
          } else if (error) {
            valid = false;
            me.setState({
              identificationNumberError: "Identification number is required"
            });
          } else me.setState({ identificationNumberError: "" });
        }
      );
      Joi.validate(
        { dateOfBirth: body.dateOfBirth },
        {
          dateOfBirth: Joi.date()
            .max(earliestBirthDate)
            .required()
            .min(latestBirthDate)
        },
        function(error, value) {
          if (error) {
            valid = false;
            if (value.dateOfBirth === "")
              me.setState({ dateOfBirthError: "Date of birth is required" });
            else me.setState({ dateOfBirthError: "Invalid date of birth" });
          } else me.setState({ dateOfBirthError: "" });
        }
      );
      Joi.validate(
        { residenceAddress: body.residenceAddress },
        { residenceAddress: Joi.string() },
        function(error, value) {
          if (error) {
            valid = false;
            me.setState({
              residenceAddressError: "Residence Address is required"
            });
          } else me.setState({ residenceAddressError: "" });
        }
      );
      Joi.validate(
        { telephoneNumber: body.telephoneNumber },
        {
          telephoneNumber: Joi.string()
            .trim()
            .regex(/^[0-9]{7,14}$/)
        },
        function(error, value) {
          if (value.telephoneNumber !== "" && error) {
            valid = false;
            me.setState({ telephoneNumberError: "Invalid Telephone number" });
          } else me.setState({ telephoneNumberError: "" });
        }
      );
      Joi.validate(
        { fax: body.fax },
        {
          fax: Joi.string()
            .trim()
            .regex(/^[0-9]{7,10}$/)
        },
        function(error, value) {
          if (value.fax !== "" && error) {
            valid = false;
            me.setState({ faxError: "Invalid Fax" });
          } else me.setState({ faxError: "" });
        }
      );
      if (valid) {
        try {
          await axios.post("api/investors/register", body);
          this.setState({ valid: "Successfully Created!" });
        } catch (error) {
          this.state.emailError = "This email is already in use";
          this.setState({ valid: "Oops something went wrong!" });
        }
      }
    }

    this.setState({ type: body.type });
    Joi.validate(
      { fullName: body.fullName },
      { fullName: Joi.string().min(3) },
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
      { email: Joi.string().email() },
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
      { password: Joi.string().min(8) },
      function(error, value) {
        if (error) {
          valid = false;
          if (value.password === "")
            me.setState({ passwordError: "Password is required" });
          else me.setState({ passwordError: "Password is weak" });
        } else me.setState({ passwordError: "" });
      }
    );
    Joi.validate(
      { nationality: body.nationality },
      { nationality: Joi.string() },
      function(error, value) {
        if (error) {
          valid = false;
          me.setState({ nationalityError: "Nationality is required" });
        } else me.setState({ nationalityError: "" });
      }
    );
    Joi.validate(
      { identificationNumber: body.identificationNumber },
      { identificationNumber: Joi.string() },
      function(error, value) {
        if (
          body.nationality === "Egyptian" &&
          body.identificationNumber.length !== 14
        ) {
          valid = false;
          me.setState({
            identificationNumberError: "Identification number must be 14 digits"
          });
        } else if (error) {
          valid = false;
          me.setState({
            identificationNumberError: "Identification number is required"
          });
        } else me.setState({ identificationNumberError: "" });
      }
    );
    Joi.validate(
      { dateOfBirth: body.dateOfBirth },
      {
        dateOfBirth: Joi.date()
          .max(earliestBirthDate)
          .required()
          .min(latestBirthDate)
      },
      function(error, value) {
        if (error) {
          valid = false;
          if (value.dateOfBirth === "")
            me.setState({ dateOfBirthError: "Date of birth is required" });
          else me.setState({ dateOfBirthError: "Invalid date of birth" });
        } else me.setState({ dateOfBirthError: "" });
      }
    );
    Joi.validate(
      { residenceAddress: body.residenceAddress },
      { residenceAddress: Joi.string() },
      function(error, value) {
        if (error) {
          valid = false;
          me.setState({
            residenceAddressError: "Residence Address is required"
          });
        } else me.setState({ residenceAddressError: "" });
      }
    );
    Joi.validate(
      { telephoneNumber: body.telephoneNumber },
      {
        telephoneNumber: Joi.string()
          .trim()
          .regex(/^[0-9]{7,14}$/)
      },
      function(error, value) {
        if (value.telephoneNumber !== "" && error) {
          valid = false;
          me.setState({ telephoneNumberError: "Invalid Telephone number" });
        } else me.setState({ telephoneNumberError: "" });
      }
    );
    Joi.validate(
      { fax: body.fax },
      {
        fax: Joi.string()
          .trim()
          .regex(/^[0-9]{7,10}$/)
      },
      function(error, value) {
        if (value.fax !== "" && error) {
          valid = false;
          me.setState({ faxError: "Invalid Fax" });
        } else me.setState({ faxError: "" });
      }
    );
    if (valid) {
      try {
        const inv = await axios.post("api/investors/register", body);
        const req = {
          email: body.email,
          username: body.email,
          password: body.password
        };
        const res = await login(req);
        this.setState({ valid: "Successfully Created!" });
      } catch (error) {
        console.log("error", error);
        this.state.emailError = "This email is already in use";
        this.setState({ valid: "Oops something went wrong!" });
      }
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    const styles = {
      formControl: {
        margin: 0,
        width: 200
      }
    };
    return (
      <div>
        <NavBarBlue
          sumergiteColor="#3480E3"
          backgroundColor="#FFFFFF"
          boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
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
                      <h2 align="center" style={{ color: "#223242" }}>
                        Create an account
                      </h2>
                      <br />
                      <form id="InvestorRegister" class="login-form">
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Full Name"
                          class="form-control"
                        />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.fullNameError}
                        </label>
                        <br />
                        <input
                          id="email"
                          type="text"
                          placeholder="Email"
                          class="form-control"
                        />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.emailError}
                        </label>
                        <br />
                        <input
                          id="password"
                          type="password"
                          placeholder="password"
                          class="form-control"
                        />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.passwordError}
                        </label>
                        <br />
                        <div align="left">
                          <label style={{ color: "#223242" }}>Type </label>
                        </div>
                        <select
                          value={this.state.methodOfIdentification}
                          class="form-control"
                          value={this.state.type}
                          onChange={this.handleChange}
                          name="type"
                          id="type"
                        >
                          <option value={"fullTimeInvestor"}>
                            Full Time Investor
                          </option>
                        </select>
                        <br />
                        <div align="left">
                          <label style={{ color: "#223242" }}>Gender </label>
                        </div>
                        <select
                          value={this.state.gender}
                          onChange={this.handleChange}
                          name="gender"
                          id="gender"
                          class="form-control"
                        >
                          <option value={"Male"}>Male</option>
                          <option value={"Female"}>Female</option>
                        </select>
                        <br />
                        <input
                          id="nationality"
                          type="text"
                          placeholder="Nationality"
                          class="form-control"
                        />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.nationalityError}
                        </label>
                        <br />
                        <div align="left">
                          <label style={{ color: "#223242" }}>
                            Method Of Identification{" "}
                          </label>
                        </div>
                        <select
                          value={this.state.methodOfIdentification}
                          onChange={this.handleChange}
                          name="methodOfIdentification"
                          id="methodOfIdentification"
                          class="form-control"
                        >
                          <option value={"passport"}>Passport</option>
                          <option value={"NID"}>National ID</option>
                        </select>
                        <br />
                        <input
                          id="identificationNumber"
                          type="text"
                          class="form-control"
                          placeholder="Identification Number"
                        />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.identificationNumberError}
                        </label>
                        <div align="left">
                          <label style={{ color: "#223242" }}>
                            Birth Date{" "}
                          </label>
                        </div>
                        <input
                          type="date"
                          name="dateOfBirth"
                          class="form-control"
                          placeholder="Date Of Birth"
                        />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.dateOfBirthError}
                        </label>
                        <br />
                        <input
                          id="residenceAddress"
                          type="text"
                          placeholder="Residence Address"
                          class="form-control"
                        />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.residenceAddressError}
                        </label>
                        <br />
                        <input
                          id="telephoneNumber"
                          type="text"
                          placeholder="Telephone Number"
                          class="form-control"
                        />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.telephoneNumberError}
                        </label>
                        <br />
                        <input
                          id="fax"
                          type="text"
                          placeholder="Fax"
                          class="form-control"
                        />
                        <label id="Error" class="text-danger">
                          {" "}
                          {this.state.faxError}
                        </label>
                        <br />
                      </form>
                      <br />
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
                      <label id="Success" class="text-danger">
                        {this.state.valid === "Successfully Created!" ? (
                          <Redirect to={{ pathname: "/investorDashBoard" }} />
                        ) : (
                          <div />
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
      </div>
    );
  }
}
