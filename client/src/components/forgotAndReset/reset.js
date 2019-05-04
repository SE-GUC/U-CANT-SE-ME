import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

class ExternalLogin extends Component {
  state = {
    password: "",
    showPassword: false
  };
  handleSubmit = async () => {
    const req = {
      password: this.state.password
    };
    document.getElementById("Token").style.display = "none";
    try {
      await axios.post(
        `/api/${this.props.match.params.type}/reset/${
          this.props.match.params.token
        }`,
        req
      );
      document.getElementById("Success").style.display = "inline";
    } catch (error) {
      if (error.message === "Network Error")
        document.getElementById("Token").style.display = "inline";
      document.getElementById("Success").style.display = "none";
    }
    if (document.getElementById("Token").style.display === "none")
      document.getElementById("Success").style.display = "inline";
  };
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
        width: "35%",
        margin: "auto"
      }
    };
    return (
      <div style={{ paddingTop: "10vh" }}>
        <br />
        <br />
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
                        {this.state.lang === "eng"
                          ? "Forgot Password?"
                          : "هل نسيت كلمة المرور؟"}
                      </h3>
                      <form className="login-form" />
                      <br />
                      <FormControl>
                        <br />
                        <InputLabel htmlFor="adornment-password">
                          {this.state.lang === "eng"
                            ? "New Password"
                            : "كلمة المرور الجديدة"}
                        </InputLabel>
                        <Input
                          id="password"
                          type={this.state.showPassword ? "text" : "password"}
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </FormControl>
                      <br />
                      <label
                        id="Success"
                        style={styles.error}
                        className="text-success"
                      >
                        {this.state.lang === "eng"
                          ? "Password successfully reset."
                          : "إعادة تعيين كلمة المرور بنجاح"}
                      </label>
                      <label
                        id="Token"
                        style={styles.error}
                        className="text-danger"
                      >
                        {this.state.lang === "eng"
                          ? "Link has expired."
                          : "انتهت صلاحية الرابط"}
                      </label>
                      <br />
                      <br />
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
    );
  }
}

export default ExternalLogin;
