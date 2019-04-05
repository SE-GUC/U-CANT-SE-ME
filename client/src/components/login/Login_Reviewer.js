import React, { Component } from "react";
import axios from "axios";
// import { Button, FormGroup, FormControl } from "react-bootstrap";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      type: "",
      id: ""
    };
  }
  handleSubmit = async () => {
    const body = {
      email: this.state.email,
      password: this.state.password
    };
    const bodyAdmin = {
      username: this.state.email,
      password: this.state.password
    };
    const type = this.state.type;
    var res = {};
    try {
      if (type === "Admin")
        res = await axios.post("http://localhost:5000/api/admins/login",bodyAdmin);
      else if (type === "Reviewer")
        res = await axios.post("http://localhost:5000/api/reviewers/login",body);
      else if (type === "Lawyer")
        res = await axios.post("http://localhost:5000/api/lawyers/login", body);
      else{
        document.getElementById("Error_Type").style.display = "inline";
        return alert("Select Account Type");
      }
      document.getElementById("Error").style.display = "none";
      document.getElementById("Error_Type").style.display = "none";
      if (type === "Lawyer")
        this.setState({
          id: res.data._id
        });
      else
        this.setState({
          id: res.data.data._id
        });
      console.log(this.state);
      alert("Welcome! You have logged in!");
    } catch (err) {
      document.getElementById("Error").style.display = "inline";
      document.getElementById("Error_Type").style.display = "none";
      alert("Worng Email or Password");
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const styles = {
      content: {
        display: "none",
        color: "red",
        fontWeight: "bold"
      },
      label: {
        width: "30%",
        minWidth:"200px",
        margin:"auto"
      }
    };
    return (
      <div>
      <label>Select Your Account Type</label>
        <br />
        <select className="form-control" id="type" style={styles.label} onChange={this.handleChange}>
          <option value="" />
          <option value="Admin">Admin</option>
          <option value="Reviewer">Reviewer</option>
          <option value="Lawyer">Lawyer</option>
        </select>
        <label id="Error_Type" style={styles.content}>
          You Have to Select an Account Type
        </label>
        <br />
      <div className="form-group">
        <label>Email address</label>
        <input style={styles.label} onChange={this.handleChange} type="text" className="form-control" id="email" placeholder="Enter email"/>
        <small id="emailHelp" className="form-text text-muted">SUMERGITE will never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input style={styles.label} onChange={this.handleChange} type="password" className="form-control" id="password" placeholder="Password"/>
      </div>
      <label id="Error" style={styles.content}>
           Worng Email or Password
      </label>
      <br/>
      <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
     <div className="dropdown-divider"></div>
  <a className="dropdown-item" href="#">New around here? Sign up</a>
  <a className="dropdown-item" href="#">Forgot password?</a>
     </div>
    );
  }
}
