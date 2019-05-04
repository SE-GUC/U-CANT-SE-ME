import React from "react";
import "../components/register.scss";
import RegisterModal from "./RegisterModal";

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
      showPassword: false,
      clicked: false,
      lang: ""
    };
  }
  componentDidMount() {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
  }
  render() {
    return <RegisterModal lang={this.state.lang} fromLoginPage={true} />;
  }
}
