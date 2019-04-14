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
const Joi = require("joi");

export default class InvestorRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullNameError:'',
            emailError:'',
            passwordError:'',
            nationalityError:'',
            identificationNumberError:'',
            dateOfBirthError:'',
            residenceAddressError:'',
            telephoneNumberError:'',
            faxError:'',
            valid:'',
            showPassword: false
        }
    }
    submit= async()=> {
        var valid=true;
        const me =this
        const now = Date.now();
        const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
        const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000); //can not be older than 120 years
        var form=document.getElementById("InvestorRegister")
        const body={
            fullName: form.fullName.value,
            email: form.email.value,
            password: form.password.value,
            type: form.type.value,
            gender: form.gender.value,
            nationality: form.nationality.value,
            methodOfIdentification: form.methodOfIdentification.value,
            identificationNumber: form.identificationNumber.value,
            dateOfBirth: form.dateOfBirth.value,
            residenceAddress: form.residenceAddress.value,
            telephoneNumber: form.telephoneNumber.value,
            fax: form.fax.value
        }
        console.log('body', body)
        Joi.validate({fullName:body.fullName}, {fullName: Joi.string().min(3)}, function (error, value) {
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
        Joi.validate({email:body.email}, {email: Joi.string().email()}, function (error, value) {
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
        Joi.validate({password:body.password}, {password: Joi.string().min(8)}, function (error, value) {
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
        Joi.validate({nationality:body.nationality}, {nationality: Joi.string()}, function (error, value) {
            if(error)
            {
                valid=false;
                me.setState({nationalityError:'Nationality is required'});
            }
            else
                me.setState({nationalityError:''});
        });
        Joi.validate({identificationNumber:body.identificationNumber}, {identificationNumber: Joi.string()}, function (error, value) {
            if(body.nationality==='Egyptian' && body.identificationNumber.length !== 14)
            {
                valid=false;
                me.setState({identificationNumberError:'Identification number must be 14 digits'});
            }
            else if(error)
            {
                valid=false;
                me.setState({identificationNumberError:'Identification number is required'});
            }
            else
                me.setState({identificationNumberError:''});
        });
        Joi.validate({dateOfBirth:body.dateOfBirth}, {dateOfBirth: Joi.date().max(earliestBirthDate).required().min(latestBirthDate)}, function (error, value) {
            if(error)
            {
                valid=false;
                if(value.dateOfBirth==='')
                    me.setState({dateOfBirthError:'Date of birth is required'});
                else
                    me.setState({dateOfBirthError:'Invalid date of birth'});
            }
            else
                me.setState({dateOfBirthError:''});
        });
        Joi.validate({residenceAddress:body.residenceAddress}, {residenceAddress: Joi.string()}, function (error, value) {
            if(error)
            {
                valid=false;
                me.setState({residenceAddressError:'Residence Address is required'});
            }
            else
                me.setState({residenceAddressError:''});
        });
        Joi.validate({telephoneNumber:body.telephoneNumber}, {telephoneNumber: Joi.string().trim().regex(/^[0-9]{7,14}$/)}, function (error, value) {
            if(value.telephoneNumber!=='' && error)
            {
                valid=false;
                me.setState({telephoneNumberError:'Invalid Telephone number'});
            }
            else
                me.setState({telephoneNumberError:''});
        });
        Joi.validate({fax:body.fax}, {fax: Joi.string().trim().regex(/^[0-9]{7,10}$/)}, function (error, value) {
            if(value.fax!=='' && error)
            {
                valid=false
                me.setState({faxError:'Invalid Fax'});
            }
            else
                me.setState({faxError:''});
        });
        if(valid)
        {
            try
            {
                const res=await axios.post("http://localhost:5000/api/investors/register",body);
                this.setState({valid:'Successfully Created!'})
            }
            catch
            {
                this.state.emailError='This email is already in use'
                this.setState({valid:'Oops something went wrong!'})
            }
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    }

    render() {
        return (
          <div>
                <br />
                <form id="InvestorRegister">
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
                        <InputLabel>Email</InputLabel>
                        <Input
                            id="email"
                            type='text'
                        />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.emailError}</label>
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
                    <br/> 
                    Type:   <select id="type">
                                <option value="fullTimeInvestor">Full Time Investor</option>
                            </select><br/>
                    Gender: <select id="gender">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select><br/>
                    <FormControl>    
                        <InputLabel>Nationality</InputLabel>
                            <Input
                                id="nationality"
                                type='text'
                            />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.nationalityError}</label>
                    <br/> 
                    Method Of Identification:   <select id="methodOfIdentification">
                                                    <option value="Passport">Passport</option>
                                                    <option value="National ID">National ID</option>
                                                </select><br/>

                    <FormControl>    
                        <InputLabel>Identification Number</InputLabel>
                            <Input
                                id="identificationNumber"
                                type='text'
                            />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.identificationNumberError}</label>
                    <br/> 
                    Date Of Birth: <input type="date" name="dateOfBirth"/><br/>
                    <label id="Error" class="text-danger"> {this.state.dateOfBirthError}</label>
                    <br/>             
                    <FormControl>    
                        <InputLabel>Residence Address</InputLabel>
                            <Input
                                id="residenceAddress"
                                type='text'
                            />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.residenceAddressError}</label>
                    <br/>
                    <FormControl>    
                        <InputLabel>Telephone Number</InputLabel>
                            <Input
                                id="telephoneNumber"
                                type='text'
                            />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.telephoneNumberError}</label>
                    <br/> 
                    <FormControl>    
                        <InputLabel>Fax</InputLabel>
                            <Input
                                id="fax"
                                type='text'
                            />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.faxError}</label>
                    <br/> 
                </form>
                <br />
                <Button variant="outlined" color="primary" onClick={this.submit}>
                    Register
                </Button>
                <br />
                <label id="Success" class="text-danger">
                    {this.state.valid}
                </label>
                <br />
          </div>
        );
      }
};