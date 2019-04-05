import React from 'react'
import axios from 'axios';
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
    render() {
        return (
          <div>
            <form id="InvestorRegister">
            Full Name: <input type="text" name="fullName"/><br/>
            {this.state.fullNameError}<br/>
            Email: <input type="text" name="email"/><br/>
            {this.state.emailError}<br/>
            Password: <input type="text" name="password"/><br/>
            {this.state.passwordError}<br/>
            Type:   <select id="type">
                        <option value="fullTimeInvestor">Full Time Investor</option>
                    </select><br/>

            Gender: <select id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select><br/>

            Nationality: <input type="text" name="nationality"/><br/>
            {this.state.nationalityError}<br/>
            Method Of Identification:   <select id="methodOfIdentification">
                                            <option value="Passport">Passport</option>
                                            <option value="National ID">National ID</option>
                                        </select><br/>

            Identification Number: <input type="text" name="identificationNumber"/><br/>
            {this.state.identificationNumberError}<br/>
            Date Of Birth: <input type="date" name="dateOfBirth"/><br/>
            {this.state.dateOfBirthError}<br/>
            Ressidence Address: <input type="text" name="residenceAddress"/><br/>
            {this.state.residenceAddressError}<br/>
            Telephone Number: <input type="text" name="telephoneNumber"/><br/>
            {this.state.telephoneNumberError}<br/>
            Fax: <input type="text" name="fax"/><br/>
            {this.state.faxError}<br/>
            </form>
            <button onClick={this.submit}>Regsiter</button><br/>
            {this.state.valid}
          </div>
        );
      }
};