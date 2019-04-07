import React from 'react'
import axios from 'axios';
const Joi = require("joi");
export default class RegisterReviewer extends React.Component {
    
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
        var form=document.getElementById("RegisterReviewer")
        const body={
            username: form.username.value,
            fullName: form.fullName.value,
            email: form.email.value,
            password: form.password.value,
        }

        Joi.validate({username:body.username}, {username: Joi.string().min(1).max(100).required()}, function (error, value) {
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

        Joi.validate({fullName:body.fullName}, {fullName: Joi.string().min(3).max(150).required()}, function (error, value) {
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

        Joi.validate({email:body.email}, {email: Joi.string().email().max(100).required()}, function (error, value) {
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

        Joi.validate({password:body.password}, {password: Joi.string().min(5).max(100).required()}, function (error, value) {
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
                const res=await axios.post("http://localhost:5000/api/admins/registerReviewer",body);
                this.setState({val:'Successfully Created!'})
            }
            catch(error)
            {
                this.state.usernameError='This username is already in use'
                this.setState({val:'Oops something went wrong!'})
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
              <h2>Register Reviewer</h2>
            <form id="RegisterReviewer">
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