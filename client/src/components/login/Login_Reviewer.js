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
      else 
        return alert("Select Account Type");
      document.getElementById("Error").style.display = "none";
      // console.log(res)
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
      }
    };
    return (
      <div className="Login">
        <label>Select Your Account Type</label>
        <br />
        <select id="type" onChange={this.handleChange}>
          <option value="" />
          <option value="Admin">Admin</option>
          <option value="Reviewer">Reviewer</option>
          <option value="Lawyer">Lawyer</option>
        </select>
        <br />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          id="email"
          placeholder="Your Email"
          onChange={this.handleChange}
        />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          id="password"
          placeholder="Your Password"
          onChange={this.handleChange}
        />
        <br />
        <br />
        <label id="Error" style={styles.content}>
          Worng Email or Password
        </label>
        <br />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    //   <form>
    //   <div class="form-group">
    //     <label for="exampleInputEmail1">Email address</label>
    //     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    //     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    //   </div>
    //   <div class="form-group">
    //     <label for="exampleInputPassword1">Password</label>
    //     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    //   </div>
    //   <div class="form-check">
    //     <input type="checkbox" class="form-check-input" id="exampleCheck1">
    //     <label class="form-check-label" for="exampleCheck1">Check me out</label>
    //   </div>
    //   <button type="submit" class="btn btn-primary">Submit</button>
    //  </form>
    );
  }
}
