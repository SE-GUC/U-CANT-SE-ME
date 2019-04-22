import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
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
import Fab from "@material-ui/core/Fab";
import "../components/register.scss";
import {login} from '../globalState/actions/authActions.js'
const Joi = require("joi");

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class RegisterModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      modalIsOpen: false,
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
      showPassword: false,
      stage: 0,
      name: "",
      email: "",
      password: "",
      type: "Full Time Investor",
      gender: "Male",
      nationality: "",
      methodOfIdentification: "",
      idNum: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      fax: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeNat = this.changeNat.bind(this);
    this.changeMetID = this.changeMetID.bind(this);
    this.changeID = this.changeID.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeAdd = this.changeAdd.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.changeFax = this.changeFax.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  submit = async () => {
    var valid = true;
    var body;
    const me = this;
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000); //can not be older than 120 years
    var form = document.getElementById("InvestorRegister");

    if (me.state.fax === "" && me.state.phone === "") {
      body = {
        fullName: me.state.name,
        email: me.state.email,
        password: me.state.password,
        type: me.state.type,
        gender: me.state.gender,
        nationality: me.state.nationality,
        methodOfIdentification: me.state.methodOfIdentification,
        identificationNumber: me.state.idNum,
        dateOfBirth: me.state.dateOfBirth,
        residenceAddress: me.state.address
      };
    } else {
      if (me.state.fax !== "" && me.state.phone === "") {
        body = {
          fullName: me.state.name,
          email: me.state.email,
          password: me.state.password,
          type: me.state.type,
          gender: me.state.gender,
          nationality: me.state.nationality,
          methodOfIdentification: me.state.methodOfIdentification,
          identificationNumber: me.state.idNum,
          dateOfBirth: me.state.dateOfBirth,
          residenceAddress: me.state.address,
          fax: me.state.fax
        };
      } else {
        if (me.state.fax === "" && me.state.phone !== "") {
          body = {
            fullName: me.state.name,
            email: me.state.email,
            password: me.state.password,
            type: me.state.type,
            gender: me.state.gender,
            nationality: me.state.nationality,
            methodOfIdentification: me.state.methodOfIdentification,
            identificationNumber: me.state.idNum,
            dateOfBirth: me.state.dateOfBirth,
            residenceAddress: me.state.address,
            telephoneNumber: me.state.phone
          };
        } else {
          body = {
            fullName: me.state.name,
            email: me.state.email,
            password: me.state.password,
            type: me.state.type,
            gender: me.state.gender,
            nationality: me.state.nationality,
            methodOfIdentification: me.state.methodOfIdentification,
            identificationNumber: me.state.idNum,
            dateOfBirth: me.state.dateOfBirth,
            residenceAddress: me.state.address,
            telephoneNumber: me.state.phone,
            fax: me.state.fax
          };
        }
      }
    }

    console.log("body", body);
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
        await axios.post("api/investors/register", body);
        this.setState({ modalIsOpen: false });
        const req = {
          email: this.state.email,
          username: this.state.email,
          password: this.state.password
        };
        console.log(req);
        const res = await login(req);
        console.log(res);
        this.setState({ valid: "Successfully Created!" });
      } catch {
        this.setState({ stage: 0 });
        this.state.emailError = "This email is already in use";
        this.setState({ valid: "Oops something went wrong!" });
      }
    }
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#223242";
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
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
      showPassword: false,
      stage: 0,
      name: "",
      email: "",
      password: "",
      type: "Full Time Investor",
      gender: "Male",
      nationality: "",
      methodOfIdentification: "",
      idNum: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      fax: ""
    });
  }

  nextStep() {
    var me = this;
    var valid = true;
    Joi.validate(
      { fullName: me.state.name },
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
      { email: me.state.email },
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
      { password: me.state.password },
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
    if (valid) {
      this.setState({ stage: 1 });
    }
  }

  previousStep() {
    this.setState({ stage: 0 });
  }

  changeName(e) {
    this.setState({ name: e.target.value });
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  changeType(e) {
    this.setState({ type: e.target.value });
  }

  changeGender(e) {
    this.setState({ gender: e.target.value });
  }

  changeNat(e) {
    this.setState({ nationality: e.target.value });
  }

  changeMetID(e) {
    this.setState({ methodOfIdentification: e.target.value });
  }

  changeID(e) {
    this.setState({ idNum: e.target.value });
  }

  changeDate(e) {
    this.setState({ dateOfBirth: e.target.value });
  }

  changeAdd(e) {
    this.setState({ address: e.target.value });
  }

  changePhone(e) {
    this.setState({ phone: e.target.value });
  }

  changeFax(e) {
    this.setState({ fax: e.target.value });
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    return (
      <div>
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          style={{
            boxShadow: "none",
            marginTop: "6px",
            backgroundColor: "#E53167",
            color: "#FFFFFF"
          }}
          aria-label="Delete"
          onClick={this.openModal}
        >
          Register
        </Fab>

        {this.state.stage === 0 ? (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Registration"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)} align="center">
              Create an account
            </h2>
            <form id="InvestorRegister" class="login-form">
              <input
                id="fullName"
                type="text"
                onChange={this.changeName}
                value={this.state.name}
                class="form-control"
                placeholder="Full Name"
              />
              <br />
              <label id="Error" class="text-danger">
                {" "}
                {this.state.fullNameError}
              </label>
              <br />
              <input
                id="email"
                type="text"
                onChange={this.changeEmail}
                value={this.state.email}
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
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.changePassword}
                placeholder="Password"
                class="form-control"
              />
              <br />
              <label id="Error" class="text-danger">
                {" "}
                {this.state.passwordError}
              </label>
              <br />
              <Fab
                variant="extended"
                size="medium"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  backgroundColor: "#E53167",
                  color: "#FFFFFF",
                  float: "left",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.closeModal}
              >
                Cancel
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  backgroundColor: "#1ace98",
                  color: "#FFFFFF",
                  float: "right",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.nextStep}
              >
                Next
              </Fab>
            </form>
          </Modal>
        ) : (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Registration"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)} align="center">
              Create an account
            </h2>
            <form class="login-form">
              Type{" "}
              <select
                id="type"
                onChange={this.changeType}
                value={this.state.type}
                style={{ width: "100%" }}
              >
                <option value="fullTimeInvestor">Full Time Investor</option>
              </select>
              <br />
              <br />
              Gender{" "}
              <select
                id="gender"
                onChange={this.changeGender}
                value={this.state.gender}
                style={{ width: "100%" }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <br />
              <br />
              <input
                placeholder="Nationality"
                id="nationality"
                type="text"
                onChange={this.changeNat}
                value={this.state.nationality}
                class="form-control"
              />
              <label id="Error" class="text-danger">
                {" "}
                {this.state.nationalityError}
              </label>
              <br />
              Method Of Identification{" "}
              <select
                id="methodOfIdentification"
                onChange={this.changeMetID}
                value={this.state.methodOfIdentification}
                style={{ width: "100%" }}
              >
                <option value="passport">Passport</option>
                <option value="NID">National ID</option>
              </select>
              <br />
              <br />
              <input
                id="identificationNumber"
                type="text"
                onChange={this.changeID}
                value={this.state.idNum}
                class="form-control"
                placeholder="Identification Number"
              />
              <label id="Error" class="text-danger">
                {" "}
                {this.state.identificationNumberError}
              </label>
              <br />
              Date Of Birth{" "}
              <input
                type="date"
                name="dateOfBirth"
                class="form-control"
                onChange={this.changeDate}
                value={this.state.dateOfBirth}
              />
              <br />
              <label id="Error" class="text-danger">
                {" "}
                {this.state.dateOfBirthError}
              </label>
              <br />
              <input
                id="residenceAddress"
                type="text"
                onChange={this.changeAdd}
                value={this.state.address}
                class="form-control"
                placeholder="Residence Address"
              />
              <label id="Error" class="text-danger">
                {" "}
                {this.state.residenceAddressError}
              </label>
              <br />
              <input
                id="telephoneNumber"
                type="text"
                onChange={this.changePhone}
                value={this.state.phone}
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
                onChange={this.changeFax}
                value={this.state.fax}
                placeholder="Fax"
                class="form-control"
              />
              <label id="Error" class="text-danger">
                {" "}
                {this.state.faxError}
              </label>
              <br />
              <Fab
                variant="extended"
                size="medium"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  backgroundColor: "#525051",
                  color: "#FFFFFF",
                  float: "left",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.previousStep}
              >
                Back
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  backgroundColor: "#E53167",
                  color: "#FFFFFF",
                  float: "center",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.closeModal}
              >
                Cancel
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  backgroundColor: "#1ace98",
                  color: "#FFFFFF",
                  float: "right",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.submit}
              >
                Register
              </Fab>
            </form>
            <label id="Success" class="text-danger">
              {this.state.valid === "Successfully Created!" ? (
                <Redirect to={{ pathname: "/MyCompanies" }} />
              ) : (
                <div />
              )}
            </label>
            <br />
          </Modal>
        )}
      </div>
    );
  }
}

//ReactDOM.render(<RegisterModal />,);
export default RegisterModal;
