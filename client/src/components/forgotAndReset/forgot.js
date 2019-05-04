import React, { Component } from "react";
import NavBarBlue from "../NavBarBlue";
import Fab from "@material-ui/core/Fab";

class ExternalLogin extends Component {
  state = {
    email: "",
    type: ""
  };
  handleSubmit = async () => {
    try {
      if (this.state.type.toString() === "")
        throw new Error("You Have To Select an Account Type");

      document.getElementById("Error").style.display = "none";
      document.getElementById("Error_Type").style.display = "none";
      document.getElementById("Success").style.display = "inline";
    } catch (error) {
      if (error.message === "You Have To Select an Account Type") {
        document.getElementById("Error_Type").style.display = "inline";
        document.getElementById("Error").style.display = "none";
      } else {
        document.getElementById("Error").style.display = "inline";
        document.getElementById("Error_Type").style.display = "none";
      }
    }
  };
  async componentDidMount() {
    if (localStorage.getItem("lang"))
      this.setState({ lang: localStorage.getItem("lang") });
    else this.setState({ lang: "eng" });
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const styles = {
      error: {
        display: "none"
      },
      label: {
        width: "100%",
        margin: "auto"
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
                        {this.state.lang === "eng" ? "Forgot Password?" : "هل نسيت كلمة المرور؟"}
                      </h3>
                      <form className="login-form">
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
                          {this.state.lang === "eng" ? "Select Your Account Type" : "اختر نوع حسابك"}
                        </h5>
                        <br />
                        <select
                          className="form-control"
                          id="type"
                          style={styles.label}
                          onChange={this.handleChange}
                        >
                          <option value=""/>
                          <option value="Investor">{this.state.lang === "eng" ? "Investor" : "مستثمر"}</option>
                          <option value="Reviewer">{this.state.lang === "eng" ? "Reviewer" : "مراجع"}</option>
                          <option value="Lawyer">{this.state.lang === "eng" ? "Lawyer" : "محام"}</option>
                        </select>
                        <br />
                        <label
                          id="Error_Type"
                          style={styles.error}
                          className="text-danger"
                        >
                          {this.state.lang === "eng" ? "You Have to Select an Account Type" : "يجب عليك تحديد نوع الحساب"}
                          
                        </label>
                        <br />
                        <h4
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
                          {this.state.lang === "eng" ? "Enter Your Email" : "أدخل بريدك الالكتروني"}
                        </h4>
                        <input
                          type="text"
                          id="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          className="form-control"
                          placeholder={this.state.lang === "eng" ? "email" :"البريد الالكتروني"}
                          autoComplete="username"
                        />

                        <br />
                        <label
                          id="Success"
                          style={styles.error}
                          className="text-success"
                        >
                          {this.state.lang === "eng" ? "Email has been successfully sent." : "تم إرسال البريد الإلكتروني بنجاح"}
                        </label>
                        <label
                          id="Error"
                          style={styles.error}
                          className="text-danger"
                        >
                          {this.state.lang === "eng" ? "Email does not exist" : "البريد الإلكتروني غير موجود"}
                        </label>
                      </form>
                      <br />

                      <div className="forgot">
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
                           {this.state.lang === "eng" ? "SUBMIT" : "تقديم النموذج"}
                        </Fab>
                      </div>
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

export default ExternalLogin;
