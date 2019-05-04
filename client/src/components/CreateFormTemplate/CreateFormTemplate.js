import React, { Component } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import CrossIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import { Fab } from "@material-ui/core";

class CreateFormTemplate extends Component {
  state = { code: ``, home: 0, success: false, loading: false, clicked: false };

  upload = async ev => {
    if (!this.state.loading) {
      await this.setState({
        success: false,
        loading: true,
        clicked: true
      });
    }
    let formTemplate = {};
    try {
      formTemplate = JSON.parse(this.state.code);
    } catch (error) {
      await this.setState({ success: false, loading: false });
      alert(`Error parsing the JSON file. Check the Syntax!`);
      return;
    }
    axios
      .post(`api/admins/createFormTemplate/`, formTemplate)
      .then(async res => {
        await this.setState({ success: true, loading: false });
        alert(`Form Template Created!`);
      })
      .catch(async error => {
        await this.setState({ success: false, loading: false });
        alert(
          `The Form Template doesn't match required conditions! \nError: ${
            typeof error.response.data === "string"
              ? error.response.data
              : error.response.data.error
          }`
        );
      });
  };

  render() {
    const { loading, success, clicked } = this.state;
    if (this.state.home === 0) return <div> </div>;
    if (this.state.home === 1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <div style={containerStyle}>
        <br />
        <br />
        <Editor
          placeholder="Type JSON code here… "
          value={this.state.code}
          onValueChange={async code => {
            this.setState({ code });
            await this.setState({
              clicked: false,
              success: false,
              loading: false
            });
          }}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            backgroundColor: "#fafafa",
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16
          }}
        />
        <br />
        <br />
        <div
          className="CircularIntegration-root-241"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
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
              onClick={this.upload}
            >
              {success && clicked ? (
                <CheckIcon />
              ) : !success && clicked && !loading ? (
                <CrossIcon />
              ) : (
                <Typography variant="body1" style={{ color: "#ffffff" }}>
                  Upload
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
        {/* <button onClick={this.upload} className="json_upload_button">
          Upload
        </button> */}
      </div>
    );
  }
  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try {
      await axios.get("../api/admins/auth");
    } catch (err) {
      alert("You are not allowed");
      this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
  }
}

const containerStyle = {
  background: "#fff",
  height: "auto",
  borderRadius: "20px",
  margin: "auto",
  width: "50%",
  padding: "10px"
};

export default CreateFormTemplate;
