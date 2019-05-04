import React from "react";
import axios from "axios";
import parseJwt from "../helpers/decryptAuthToken";
import { Redirect } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import NavBarDashboard from "./NavBarDashboard";
import moment from "moment";
const Joi = require("joi");

export default class updateInvestorProfile extends React.Component {
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
      investorId: "",
      home: 0,
      lang: ""
    };
  }

  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try {
      await axios.get("../api/investors/auth");
    } catch (err) {
      alert("You are not allowed");
      this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
    const data = parseJwt(localStorage.jwtToken);
    await this.setState({ investorId: data.id });
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
  }

  submit = async () => {
    let valid = true;
    const me = this;
    me.setState({ fullNameError: "" });
    me.setState({ emailError: "" });
    me.setState({ passwordError: "" });
    me.setState({ nationalityError: "" });
    me.setState({ identificationNumberError: "" });
    me.setState({ dateOfBirthError: "" });
    me.setState({ residenceAddressError: "" });
    me.setState({ telephoneNumberError: "" });
    me.setState({ faxError: "" });
    me.setState({ valid: "" });

    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000); //can not be older than 120 years
    let form = document.getElementById("Investorupdate");
    const body = {};
    if (!(form.fullName.value === "")) {
      body.fullName = form.fullName.value;

      Joi.validate(
        { fullName: body.fullName },
        { fullName: Joi.string().min(3) },
        function(error) {
          if (error) {
            valid = false;
            me.setState({ fullNameError: "Invalid Full Name" });
          }
        }
      );
    }
    // if (!(form.email.value === "")) {
    //   body.email = form.email.value;

    //   Joi.validate(
    //     { email: body.email },
    //     { email: Joi.string().email() },
    //     function(error) {
    //       if (error) {
    //         valid = false;
    //         me.setState({ emailError: "Invalid Email" });
    //       }
    //     }
    //   );
    // }
    if (!(form.password.value === "")) {
      body.password = form.password.value;

      Joi.validate(
        { password: body.password },
        { password: Joi.string().min(8) },
        function(error) {
          if (error) {
            valid = false;
            me.setState({ passwordError: "Invalid Password" });
          }
        }
      );
    }

    // if (!(form.nationality.value === "")) {
    //   body.nationality = form.nationality.value;

    //   Joi.validate(
    //     { nationality: body.nationality },
    //     { nationality: Joi.string() },
    //     function(error) {
    //       if (error) {
    //         valid = false;
    //         me.setState({ nationalityError: "Invalid Nationality" });
    //       }
    //     }
    //   );
    // }
    // if (!(form.gender.value === "")) body.gender = form.gender.value;
    if (!(form.identificationNumber.value === "")) {
      body.identificationNumber = form.identificationNumber.value;

      Joi.validate(
        { identificationNumber: body.identificationNumber },
        { identificationNumber: Joi.string() },
        function(error) {
          if (error) {
            valid = false;
            me.setState({
              identificationNumberError: "Invalid Tdentification Number"
            });
          }
          if (form.methodOfIdentification.value === "") {
            valid = false;
            me.setState({
              identificationNumberError: "Choose Identification method"
            });
          } else {
            body.methodOfIdentification = form.methodOfIdentification.value;
          }
        }
      );
    }
    if (!(form.dateOfBirth.value === "")) {
      body.dateOfBirth = form.dateOfBirth.value;

      Joi.validate(
        { dateOfBirth: body.dateOfBirth },
        {
          dateOfBirth: Joi.date()
            .max(earliestBirthDate)
            .min(latestBirthDate)
        },
        function(error) {
          if (error) {
            valid = false;
            me.setState({ dateOfBirth: "Invalid Date Of Birth" });
          }
        }
      );
    }
    if (!(form.residenceAddress.value === "")) {
      body.residenceAddress = form.residenceAddress.value;

      Joi.validate(
        { residenceAddress: body.residenceAddress },
        { residenceAddress: Joi.string() },
        function(error) {
          if (error) {
            valid = false;
            me.setState({ residenceAddressError: "Invalid Residence Address" });
          }
        }
      );
    }
    if (!(form.telephoneNumber.value === "")) {
      body.telephoneNumber = form.telephoneNumber.value;

      Joi.validate(
        { telephoneNumber: body.telephoneNumber },
        {
          telephoneNumber: Joi.string()
            .trim()
            .regex(/^[0-9]{7,14}$/)
        },
        function(error) {
          if (error) {
            valid = false;
            me.setState({ telephoneNumberError: "Invalid Telephone Number" });
          }
        }
      );
    }
    if (!(form.fax.value === "")) {
      body.fax = form.fax.value;

      Joi.validate(
        { fax: body.fax },
        {
          fax: Joi.string()
            .trim()
            .regex(/^[0-9]{7,14}$/)
        },
        function(error) {
          if (error) {
            valid = false;
            me.setState({ faxError: "Invalid Fax" });
          }
        }
      );
    }
    if (valid) {
      const investorId = this.state.investorId;
      try {
        await axios.put(`api/investors/${investorId}`, body);
        await me.setState({ valid: "Successfully Updated!" });
      } catch {
        // this.state.emailError = "Make sure this email is not already in use";
        await me.setState({ valid: "Oops something went wrong!" });
      }
    } else {
      await me.setState({ valid: "" });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  formatTime(t) {
    return moment
      .utc(t.substring(0, 23))
      .format("YYYY-MM-DD")
      .toUpperCase();
  }
  render() {
    if (this.state.home === 0) return <div> </div>;
    if (this.state.home === 1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <div>
        <NavBarDashboard
          sumergiteColor="#3480E3"
          boxShadow="0px 3px 20px rgba(0, 0, 0, 0.16)"
          dashboard="lighter"
          profile="bold"
          homepage="lighter"
          electronicJournals="lighter"
          DASHBOARDD={true}
          PROFILEE={true}
          ProfileMargin="120px"
          HomePageMargin="0px"
        />
        <div>
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
                          ? "Update Your Profile!"
                          : "!حدث ملفك الشخصي"}
                      </h3>
                      <br />
                      <form className="login-form" id="Investorupdate">
                        <input
                          type="text"
                          name="fullName"
                          defaultValue={this.props.location.state.fullName}
                          placeholder={
                            this.state.lang === "eng"
                              ? "Full name"
                              : "اسمك الكامل"
                          }
                          className="form-control"
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.fullNameError === ""
                            ? ""
                            : this.state.lang === "eng"
                            ? "Invalid Full Name"
                            : "الاسم الكامل غير صحيح"}{" "}
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          defaultValue=""
                          className="form-control"
                          placeholder={
                            this.state.lang === "eng" ? "password" : "كلمه السر"
                          }
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.passwordError === ""
                            ? ""
                            : this.state.lang === "eng"
                            ? "Invalid Password"
                            : "كلمة السر مخالفة"}
                        </label>
                        <br />
                        {/* */}
                        <br />
                        <Select
                          id="methodOfIdentification"
                          name="methodOfIdentification"
                          // value={this.state.methodOfIdentification==="NID"?"NI":"passport"}
                          value = {this.props.location.state.methodOfIdentification}
                          onChange={this.handleChange}
                          style={{ width: "100%" }}
                        >
                          <MenuItem value={"passport"}>
                            {this.state.lang === "eng"
                              ? "Passport"
                              : "جواز السفر"}
                          </MenuItem>
                          <MenuItem value={"NID"}>
                            {this.state.lang === "eng"
                              ? "National ID"
                              : "الرقم القومي"}
                          </MenuItem>
                        </Select>
                        <br />
                        <br />
                        <br />
                        <input
                          name="identificationNumber"
                          className="form-control"
                          defaultValue={this.props.location.state.identificationNumber}
                          placeholder={
                            this.state.lang === "eng"
                              ? "Identification number"
                              : "رقم التعريف"
                          }
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.identificationNumberError === ""
                            ? ""
                            : this.state.lang === "eng"
                            ? "Invalid Identification Number"
                            : "رقم التعريف غير صالح"}
                        </label>
                        <br />
                        <input
                          name="dateOfBirth"
                          className="form-control"
                          type="date"
                          defaultValue={this.formatTime(this.props.location.state.dateOfBirth)}
                          placeholder={
                            this.state.lang === "eng"
                              ? "Date of birth"
                              : "تاريخ الميلاد"
                          }
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.dateOfBirthError === ""
                            ? ""
                            : this.state.lang === "eng"
                            ? "Invalid Date of Birth"
                            : "تاريخ الميلاد مخالف"}
                        </label>
                        <br />
                        <input
                          name="residenceAddress"
                          defaultValue={this.props.location.state.residenceAddress}
                          className="form-control"
                          placeholder={
                            this.state.lang === "eng"
                              ? "Current address"
                              : "عنوان الإقامة"
                          }
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.residenceAddressError === ""
                            ? ""
                            : this.state.lang === "eng"
                            ? "Invalid Residence Adress"
                            : ""}
                        </label>
                        <br />
                        <input
                          name="telephoneNumber"
                          className="form-control"
                          defaultValue={this.props.location.state.telephoneNumber}
                          placeholder={
                            this.state.lang === "eng" ? "telephone" : "الهاتف"
                          }
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.telephoneNumberError === ""
                            ? ""
                            : this.state.lang === "eng"
                            ? "Invalid Telephone Number"
                            : "رقم الهاتف غير صحيح"}
                        </label>
                        <br />
                        <input
                          name="fax"
                          className="form-control"
                          defaultValue={this.props.location.state.fax}
                          placeholder={
                            this.state.lang === "eng" ? "fax" : "الفاكس"
                          }
                        />
                        <br />
                        <label id="Error" className="text-danger">
                          {" "}
                          {this.state.faxError === ""
                            ? ""
                            : this.state.lang === "eng"
                            ? "Invalid Fax"
                            : "فاكس غير صحيح"}
                        </label>
                        <br />
                      </form>
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
                        onClick={this.submit}
                      >
                        {this.state.lang === "eng" ? "Update" : "حدث"}
                      </Fab>
                      <br />
                        <h6 style={{color:"black"}}>
                          {this.state.valid}
                        </h6>
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
