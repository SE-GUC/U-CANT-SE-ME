import React from 'react'
import axios from 'axios';
const Joi = require("joi");
export default class RegisterLawyer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            fullNameError:'',
            emailError:'',
            passwordError:'',
            usernameError:'',
            val:''
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

        Joi.validate({email:body.email}, {email: Joi.string().required(),}, function (error, value) {
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
                const res=await axios.post("http://localhost:5000/api/admins/registerLawyer",body);
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
    render() {
        return (
          <div>
              <br/>
              <h2>Register Lawyer</h2>
            <form id="RegisterLawyer">
                username: <input type="text" name="username"/><br/>
                {this.state.usernameError}<br/>
                Full Name: <input type="text" name="fullName"/><br/>
                {this.state.fullNameError}<br/>
                Email: <input type="text" name="email"/><br/>
                {this.state.emailError}<br/>
                Password: <input type="text" name="password"/><br/>
                {this.state.passwordError}<br/>
                </form>
                <button onClick={this.submit}>Regsiter</button><br/>
                {this.state.val}
          </div>
        );
      }
};