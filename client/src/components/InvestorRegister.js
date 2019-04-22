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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Redirect } from 'react-router-dom'
import NavBarBlue from './NavBarBlue'
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
            type: '',
            gender: '',
            methodOfIdentification: '',
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
        this.setState({type: body.type})
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
                await axios.post("api/investors/register",body);
                this.setState({valid:'Successfully Created!'})                
            }
            catch(error)
            {   
                console.log('error', error)
                this.state.emailError='This email is already in use'
                this.setState({valid:'Oops something went wrong!'})
            }
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const styles = {
            formControl: {
                margin: 0,
                width: 200
            }
        }
        return (
            <div> 
                <NavBarBlue sumergiteColor= '#3480E3' backgroundColor='#FFFFFF' boxShadow='0px 3px 20px rgba(0, 0, 0, 0.16)'/>
          <div style={{paddingTop: '10vh'}}>
                <br />
                <form id="InvestorRegister">
                    <FormControl required>    
                        <InputLabel>Full Name</InputLabel>
                        <Input
                            id="fullName"
                            type='text'
                            style={{ width: 200 }}
                        />
                    </FormControl>
                    <br />
                    <label id="Error" className="text-danger"> {this.state.fullNameError}</label>
                    <br/> 
                    <FormControl required>    
                        <InputLabel>Email</InputLabel>
                        <Input
                            id="email"
                            type='text'
                            style={{ width: 200 }}
                        />
                    </FormControl>
                    <br />
                    <label id="Error" className="text-danger"> {this.state.emailError}</label>
                    <br/> 
                    <FormControl required>    
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                style={{ width: 200 }}
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
                    <FormControl required style={styles.formControl}>
                        <InputLabel htmlFor="age-required">Type</InputLabel>
                            <Select
                                value={this.state.type}
                                onChange={this.handleChange}
                                name="type"
                                id="type"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"fullTimeInvestor"}>Full Time Investor</MenuItem>
                            </Select>
                    </FormControl>
                    <br />
                    <FormControl required style={styles.formControl}>
                        <InputLabel htmlFor="age-required">Gender</InputLabel>
                            <Select
                                value={this.state.gender}
                                onChange={this.handleChange}
                                name="gender"
                                id="gender"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            </Select>
                    </FormControl>
                    <br />
                    <FormControl required>    
                        <InputLabel>Nationality</InputLabel>
                            <Input
                                id="nationality"
                                type='text'
                                style={{ width: 200 }}
                            />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.nationalityError}</label>
                    <br/>  
                    <FormControl required style={styles.formControl}>
                        <InputLabel htmlFor="age-required">Method of Identification</InputLabel>
                            <Select
                                value={this.state.methodOfIdentification}
                                onChange={this.handleChange}
                                name="methodOfIdentification"
                                id="methodOfIdentification"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"passport"}>Passport</MenuItem>
                            <MenuItem value={"NID"}>National ID</MenuItem>
                            </Select>
                    </FormControl>
                    <br />
                    <FormControl required>    
                        <InputLabel>Identification Number</InputLabel>
                            <Input
                                id="identificationNumber"
                                type='text'
                                style={{ width: 200 }}
                            />
                    </FormControl>
                    <br />
                    <label id="Error" class="text-danger"> {this.state.identificationNumberError}</label>
                    <br/> 
                    Date Of Birth: <input type="date" name="dateOfBirth"/><br/>
                    <label id="Error" class="text-danger"> {this.state.dateOfBirthError}</label>
                    <br/>             
                    <FormControl required>    
                        <InputLabel>Residence Address</InputLabel>
                            <Input
                                id="residenceAddress"
                                type='text'
                                style={{ width: 200 }}
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
                                style={{ width: 200 }}
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
                                style={{ width: 200 }}
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
                    {this.state.valid==="Successfully Created!" ?  <Redirect to={{pathname: "/MyCompanies"}}/>:<div/>}
                </label>
                <br />
          </div>
          </div>
        );
      }
};