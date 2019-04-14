import React from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Redirect } from 'react-router-dom'
const Joi = require("joi");
const { serverURI } = require("../config/keys");

export default class RegisterLawyer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            fullNameError:'',
            emailError:'',
            passwordError:'',
            usernameError:'',
            val:'',
            showPassword: false
        }
    }

    submit= async()=> {
        var valid=true;
        const me =this
        var form=document.getElementById("RegisterLawyer")
        const body={
            username: form.username.value,
            fullName: form.fullName.value,
            email: form.email.value,
            password: form.password.value,
        }

        Joi.validate({username:body.username}, {username: Joi.string().min(10).required()}, function (error, value) {
            if(error)
            {
                valid=false;
                if(value.username==='')
                    me.setState({usernameError:'Full name is required'})
                else
                    me.setState({usernameError:'Invalid Name'});
            }
            else
                me.setState({usernameError:''});
        });

        Joi.validate({fullName:body.fullName}, {fullName: Joi.string().min(10).required()}, function (error, value) {
            if(error)
            {
                valid=false;
                if(value.fullName==='')
                    me.setState({fullNameError:'Full name is required'})
                else
                    me.setState({fullNameError:'Invalid Name'});
            }
            else
                me.setState({fullNameError:''});
        });

        Joi.validate({email:body.email}, {email: Joi.string().required()}, function (error, value) {
            if(error)
            {
                valid=false;
                if(value.email==='')
                    me.setState({emailError:'Email is required'})
                else
                    me.setState({emailError:'Invalid Email'});
            }    
            else
                me.setState({emailError:''});
        });

        Joi.validate({password:body.password}, {password: Joi.string().min(4).required()}, function (error, value) {
            if(error)
            {
                valid=false;
                if(value.password==='')
                    me.setState({passwordError:'Password is required'});
                else
                    me.setState({passwordError:'Password is weak'});
            }    
            else
                me.setState({passwordError:''});
        });

        if(valid)
        {
            try
            {
                await axios.post(serverURI + "/admins/registerLawyer",body);
                this.setState({val:'Successfully Created!'})
            }
            catch
            {
                this.state.usernameError='make sure the username is unique'
                this.state.emailError='make sure the email is unique'
                this.setState({val:'Username or Email are not unique'})
            }
        }
        else{
            this.setState({val:''})
        }
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    }

    render() {
        return (
          <div>
              <br/>
              <h3 class="text-center text-info">Register</h3>
            <form id="RegisterLawyer">
                    <FormControl>    
                        <InputLabel>Username</InputLabel>
                        <Input
                            id="username"
                            type='text'
                        />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.usernameError}</label>
                    <br/> 
                    <FormControl>    
                        <InputLabel>Email</InputLabel>
                        <Input
                            id="email"
                            type='text'
                        />
                    </FormControl>
                    <br/> 
                    <label id="Error" class="text-danger"> {this.state.emailError}</label>
                    <br />
                    <FormControl>    
                        <InputLabel>Full Name</InputLabel>
                        <Input
                            id="fullName"
                            type='text'
                        />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.fullNameError}</label>
                    <br/> 
                    <FormControl>    
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="password"
                                type={this.state.showPassword ? 'text' : 'password'}
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
                    <label id="Error" class="text-danger"> {this.state.passwordError}</label>
                </form>
                <Button variant="outlined" color="primary" onClick={this.submit}>
                    Register
                </Button>
                <br />
                <br />
                <label id="Success" class="text-danger">
                    {this.state.val==="Successfully Created!"? <Redirect to={{pathname: "/LawyerViewTasks"}}/>:this.state.val}
                </label>
                <br />
          </div>
        );
      }
};