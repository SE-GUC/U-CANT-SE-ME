import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from "axios";
import Button from '@material-ui/core/Button'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import {login} from '../../globalState/actions/authActions'
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      type: '',
      id: '',
      forgot: false
    };
  }
  handleSubmit = async () => {
    const type = this.state.type.toLowerCase()+"s";
    const body = {
      email: this.state.email,
      username: this.state.email,
      password: this.state.password,
      type:type
    };
    console.log(body);
    var res = {};
    try {
      if(this.state.type.toString()!==""){
        
        await login(body)
      }
      else{
        document.getElementById("Error_Type").style.display = "inline";
      }
      
      document.getElementById("Error").style.display = "none";
      document.getElementById("Error_Type").style.display = "none";
      
    } catch (error) {
      if(error.message === 'You Have To Select an Account Type'){
        document.getElementById('Error_Type').style.display = 'inline'
        document.getElementById('Error').style.display = 'none'
      }
      else{
        document.getElementById('Error_Type').style.display = 'none'
        document.getElementById('Error').style.display = 'inline'
      }
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  forgotClicked = () => {
    this.setState({forgot: true})
  }
  render() {
    const styles = {
      content: {
        display: "none"
      },
      label: {
        width: "30%",
        minWidth:"200px",
        margin:"auto"
      }
    };
    return (
      <div>
        <h1>Welcome to the Internal Portal Login!</h1>
      <label>Select Your Account Type</label>
        <br />
        <select className="form-control" id="type" style={styles.label} onChange={this.handleChange}>
          <option value="" />
          <option value="Admin">Admin</option>
          <option value="Reviewer">Reviewer</option>
          <option value="Lawyer">Lawyer</option>
        </select>
        <label id="Error_Type" style={styles.content} class="text-danger">
          You Have to Select an Account Type
        </label>
        <br />
        <FormControl>    
            <InputLabel>Email</InputLabel>
            <Input
                id="email"
                type='text'
                value={this.state.email}
                onChange={this.handleChange}
                
            />
        </FormControl>
        <br />
        <br />
        <FormControl>    
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
            />
        </FormControl>
        <br />
        <label id="Error" style={styles.content} class="text-danger"> Wrong Email or Password</label>
        <br />
      <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
            Login
      </Button>
      <br/>
      <div className="dropdown-divider"></div>
      {this.state.forgot? <Redirect to={{pathname: "/forgot"}}/>:<div/>}
      
          <Button variant="primary" size="large" onClick={this.forgotClicked}>
              Forgot password?
          </Button>
     </div>
    );
  }
}
