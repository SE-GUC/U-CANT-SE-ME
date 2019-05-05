import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import "../components/register.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { login } from "../globalState/actions/authActions.js";
import { Select, MenuItem, OutlinedInput, FormControl, InputLabel } from "@material-ui/core";

const Joi = require("joi");

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
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
      stage: 0,
      name: "",
      email: "",
      password: "",
      type: "Single",
      gender: "Male",
      nationality: "",
      methodOfIdentification: "passport",
      idNum: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      fax: "",
      lang: "",
      clicked: false,
      canceled: false
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
  async componentDidMount() {
    if (this.props.fromLoginPage) {
      await this.setState({ modalIsOpen: true });
    }
  }

  submit = async () => {
    await this.setState({ clicked: true });
    var valid = true;
    var body;
    const me = this;
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000); //can not be older than 120 years

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
          body.identificationNumber.length !== 14 &&
          body.methodOfIdentification === "NID"
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
        const req = {
          email: this.state.email,
          username: this.state.email,
          password: this.state.password
        };
        await login(req);
        this.setState({ valid: "Successfully Created!" });
      } catch {
        this.setState({ stage: 0 });
        await this.setState({ emailError: "This email is already in use" });
        this.setState({ valid: "Oops something went wrong!" });
      }
    }
    await this.setState({ clicked: false });
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
      methodOfIdentification: "passport",
      idNum: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      fax: ""
    });
    if (this.props.fromLoginPage) {
      this.setState({ canceled: true });
    }
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

  handleNationalityChange = eventTarget => {
    this.setState({ nationality: eventTarget.value });
  };

  render() {
    let nationalities = require("../data/nationalities.json");
    let nationalitiesArabic = [];
    let nationalitiesEnglish = [];
    let menuCounter = 1;
    for (let atr in nationalities) {
      nationalitiesEnglish.push(<MenuItem key={menuCounter} value={atr}> {atr} </MenuItem>);
      nationalitiesArabic.push(
        <MenuItem key={menuCounter++} value={atr}> {nationalities[atr]} </MenuItem>
      );
    }
    return this.state.canceled ? (
      <Redirect to="/" />
    ) : (
      <div>
        {this.props.fromLoginPage ? (
          <div />
        ) : (
          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            style={{
              boxShadow: "none",
              color: "#FFFFFF"
            }}
            aria-label="Delete"
            onClick={this.openModal}
          >
            {this.props.lang === "eng" ? "Register" : "افتح حسابًا"}
          </Fab>
        )}

        {this.state.stage === 0 ? (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Registration"
          >
            <h1 ref={subtitle => (this.subtitle = subtitle)} align="center">
              {this.props.lang === "eng" ? "Create an account" : "انشئ حساب"}
            </h1>
            <form id="InvestorRegister" className="login-form">
              <input
                id="fullName"
                type="text"
                onChange={this.changeName}
                value={this.state.name}
                className="form-control"
                placeholder={
                  this.props.lang === "eng" ? "Full Name" : "الاسم الكامل"
                }
              />
              <br />
              <label id="Error" className="text-danger">
                {this.state.fullNameError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.fullNameError
                  : this.state.fullNameError === "Full name is required"
                  ? "الإسم الكامل مطلوب"
                  : "اسم غير صالح"}
              </label>
              <br />
              <input
                id="email"
                type="text"
                onChange={this.changeEmail}
                value={this.state.email}
                className="form-control"
                placeholder={
                  this.props.lang === "eng" ? "Email" : "البريد الإلكتروني"
                }
              />
              <br />
              <label id="Error" className="text-danger">
                {this.state.emailError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.emailError
                  : this.state.emailError === "Invalid Email"
                  ? "بريد إلكتروني خاطئ"
                  : this.state.emailError === "Email is required"
                  ? "البريد الالكتروني مطلوب"
                  : "هذا البريد استخدم من قبل"}
              </label>
              <br />
              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.changePassword}
                placeholder={
                  this.props.lang === "eng" ? "Password" : "كلمه السر"
                }
                className="form-control"
              />
              <br />
              <label id="Error" className="text-danger">
                {this.state.passwordError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.passwordError
                  : this.state.passwordError === "Password is required"
                  ? "كلمة المرور مطلوبة"
                  : "كلمة المرور ضعيفة"}
              </label>
              <br />
              <Fab
                variant="extended"
                size="medium"
                color="secondary"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  color: "#FFFFFF",
                  float: "left",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.closeModal}
              >
                {this.props.lang === "eng" ? "Cancel" : "إلغاء"}
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  color: "#FFFFFF",
                  float: "right",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.nextStep}
              >
                {this.props.lang === "eng" ? "Next" : "التالى"}
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
              {this.props.lang === "eng" ? "Create an account" : "انشئ حساب"}
            </h2>
            <form className="login-form">
              {this.props.lang === "eng" ? "Type " : "نوع "}
              <select
                id="type"
                onChange={this.changeType}
                value={this.state.type}
                style={{ width: "100%" }}
              >
                <option value="Single">
                  {this.props.lang === "eng" ? "Single" : "فرد"}
                </option>
              </select>
              <br />
              <br />
              {this.props.lang === "eng" ? "Gender " : "جنس "}
              <select
                id="gender"
                onChange={this.changeGender}
                value={this.state.gender}
                style={{ width: "100%" }}
              >
                <option value="Male">
                  {this.props.lang === "eng" ? "Male" : "ذكر"}
                </option>
                <option value="Female">
                  {this.props.lang === "eng" ? "Female" : "أنثى"}
                </option>
              </select>
              <br />
              <br />
              <FormControl
                required
                variant="outlined"
                style={{ minWidth: "100%" }}
              >
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  {this.props.lang === "eng" ? "Nationality" : "جنسية"}
                </InputLabel>
                <Select
                  key={0}
                  value={this.state.nationality}
                  onChange={ev => this.handleNationalityChange(ev.target)}
                  input={
                    <OutlinedInput
                      label="Nationality"
                      labelWidth={70}
                      name="nationality"
                    />
                  }
                >
                  <MenuItem key = "0" value="">
                    <em>{this.props.lang === "eng" ? "Select your Nationality" : "اختر جنسيتك"}</em>
                  </MenuItem>
                  {this.props.lang === "eng" ? nationalitiesEnglish : nationalitiesArabic}
                </Select>
              </FormControl>
              <label id="Error" className="text-danger">
                {this.state.nationalityError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.nationalityError
                  : "الجنسية مطلوبة"}
              </label>
              <br />
              {this.props.lang === "eng"
                ? "Method Of Identification "
                : "طريقة تحديد الهوية "}
              <select
                id="methodOfIdentification"
                onChange={this.changeMetID}
                value={this.state.methodOfIdentification}
                style={{ width: "100%" }}
              >
                <option value="passport">
                  {this.props.lang === "eng" ? "Passport" : "جواز سفر"}
                </option>
                <option value="NID">
                  {this.props.lang === "eng" ? "National ID" : "الهوية الوطنية"}
                </option>
              </select>
              <br />
              <br />
              <input
                id="identificationNumber"
                type="text"
                onChange={this.changeID}
                value={this.state.idNum}
                className="form-control"
                placeholder={
                  this.props.lang === "eng"
                    ? "Identification Number"
                    : "رقم الهوية"
                }
              />
              <label id="Error" className="text-danger">
                {this.state.identificationNumberError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.identificationNumberError
                  : this.state.identificationNumberError ===
                    "Identification number is required"
                  ? "رقم الهوية مطلوب"
                  : "يجب أن يكون رقم التعريف 14 رقمًا"}
              </label>
              <br />
              {this.props.lang === "eng" ? "Date Of Birth " : "تاريخ الولادة"}
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                onChange={this.changeDate}
                value={this.state.dateOfBirth}
              />
              <br />
              <label id="Error" className="text-danger">
                {this.state.dateOfBirthError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.dateOfBirthError
                  : this.state.dateOfBirthError === "Invalid date of birth"
                  ? "تاريخ ميلاد غير صالح"
                  : "تاريخ الميلاد مطلوب"}
              </label>
              <br />
              <input
                id="residenceAddress"
                type="text"
                onChange={this.changeAdd}
                value={this.state.address}
                className="form-control"
                placeholder={
                  this.props.lang === "eng"
                    ? "Residence Address"
                    : "عنوان السكن"
                }
              />
              <label id="Error" className="text-danger">
                {this.state.residenceAddressError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.residenceAddressError
                  : "عنوان الإقامة مطلوب"}
              </label>
              <br />
              <input
                id="telephoneNumber"
                type="text"
                onChange={this.changePhone}
                value={this.state.phone}
                placeholder={
                  this.props.lang === "eng" ? "Telephone Number" : "رقم هاتف"
                }
                className="form-control"
              />
              <label id="Error" className="text-danger">
                {this.state.telephoneNumberError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.telephoneNumberError
                  : "رقم الهاتف غير صحيح"}
              </label>
              <br />
              <input
                id="fax"
                type="text"
                onChange={this.changeFax}
                value={this.state.fax}
                placeholder={this.props.lang === "eng" ? "Fax" : "فاكس"}
                className="form-control"
              />
              <label id="Error" className="text-danger">
                {this.state.faxError === ""
                  ? ""
                  : this.props.lang === "eng"
                  ? this.state.faxError
                  : "فاكس غير صالح"}
              </label>
              <br />
              <Fab
                variant="extended"
                size="medium"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  color: "#000000",
                  float: "left",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.previousStep}
              >
                {this.props.lang === "eng" ? "Back" : "الرجوع"}
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                color="secondary"
                style={{
                  boxShadow: "none",
                  marginTop: "6px",
                  color: "#FFFFFF",
                  float: "center",
                  width: 150
                }}
                aria-label="Delete"
                onClick={this.closeModal}
              >
                {this.props.lang === "eng" ? "Cancel" : "إلغاء"}
              </Fab>
              {!this.state.clicked ? (
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  style={{
                    boxShadow: "none",
                    marginTop: "6px",
                    color: "#FFFFFF",
                    float: "right",
                    width: 150
                  }}
                  aria-label="Delete"
                  onClick={this.submit}
                >
                  {this.props.lang === "eng" ? "Register" : "تسجيل"}
                </Fab>
              ) : (
                <CircularProgress
                  style={{ marginTop: "6px", float: "right" }}
                />
              )}
            </form>
            <label id="Success" className="text-danger">
              {this.state.valid === "Successfully Created!" ? (
                <Redirect to={{ pathname: "/profile" }} />
              ) : (
                // <Redirect to={{ pathname: "/profile" }} />
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
Modal.setAppElement(document.getElementById("root"));
export default RegisterModal;
