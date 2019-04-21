import React, { Component } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import axios from "axios";
import { Redirect } from 'react-router-dom'

class CreateFormTemplate extends Component {
  state = { code: `` , home:0 };

  upload = ev => {
    let formTemplate = {};
    try {
      formTemplate = JSON.parse(this.state.code);
    } catch (error) {
      alert(`Error parsing the JSON file. Check the Syntax!`);
      return;
    }
    axios
      .post(
        `api/admins/createFormTemplate/`,
        formTemplate
      )
      .then(res => {
        alert(`Form Template Created!`);
      })
      .catch(error => {
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
    if (this.state.home===0) return <div> </div>;
    if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
    return (
      <div style={containerStyle}>
        <br />
        <br />
        <Editor
          placeholder="Type JSON code here… "
          value={this.state.code}
          onValueChange={code => this.setState({ code })}
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
        <button onClick={this.upload} className="json_upload_button">
          Upload
        </button>
      </div>
    );
  }
  async componentDidMount(){
    if (!localStorage.jwtToken) {
      alert("You must login!");
      this.setState({ home: 1 });
      return;
    }
    try{
        await axios.get('../api/admins/auth')
    }catch(err){
      alert("You are not allowed");
      this.setState({ home: 1 });
      return;
    }
    this.setState({ home: 2 });
  };
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
