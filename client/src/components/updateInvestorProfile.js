import React from 'react'
import axios from 'axios';
const Joi = require("joi");

const serverURI = require("../config/keys").serverURI;

export default class updateInvestorProfile extends React.Component {
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
        me.setState({fullNameError:''});
        me.setState({emailError:''});
        me.setState({passwordError:''});
        me.setState({nationalityError:''});
        me.setState({identificationNumberError:''});
        me.setState({dateOfBirthError:''});
        me.setState({residenceAddressError:''});
        me.setState({telephoneNumberError:''});
        me.setState({faxError:''});
        me.setState({valid:''});

        const now = Date.now();
        const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
        const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000); //can not be older than 120 years
        var form=document.getElementById("Investorupdate")
        const body={

        }
        if(!(form.fullName.value==="")){
            body.fullName=form.fullName.value

            Joi.validate({fullName:body.fullName}, {fullName: Joi.string().min(3)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({fullNameError:'Invalid Full Name'});
              }    
          });
          }
          if(!(form.email.value==="")){
            body.email=form.email.value

            Joi.validate({email:body.email}, {email: Joi.string().email()}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({emailError:'Invalid Email'});
              }    
          });
          }
          if(!(form.password.value==="")){
            body.password=form.password.value

            Joi.validate({password:body.password}, {password: Joi.string().min(8)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({passwordError:'Invalid Password'});
              }    
          });
          }

            if(!(form.nationality.value==="")){
              body.nationality=form.nationality.value

            Joi.validate({nationality:body.nationality}, {nationality: Joi.string()}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({nationalityError:'Invalid Nationality'});
              }    
          });
          }
          if(!(form.gender.value===""))
            body.gender=form.gender.value
            if(!(form.type.value===""))
            body.type=form.type.value
            if(!(form.identificationNumber.value==="")){
              body.identificationNumber=form.identificationNumber.value

            Joi.validate({identificationNumber:body.identificationNumber}, {identificationNumber: Joi.string()}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({identificationNumberError:'Invalid Tdentification Number'});
              }
              if(form.methodOfIdentification.value===""){
                valid=false;
                me.setState({identificationNumberError:'Choose Identification method'});
              }else{
                body.methodOfIdentification=form.methodOfIdentification.value
              }
          });
          }
          if(!(form.dateOfBirth.value==="")){
            body.dateOfBirth=form.dateOfBirth.value

            Joi.validate({dateOfBirth:body.dateOfBirth}, {dateOfBirth:Joi.date().max(earliestBirthDate).min(latestBirthDate)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({dateOfBirth:'Invalid Date Of Birth'});
              }    
          });
          }
          if(!(form.residenceAddress.value==="")){
            body.residenceAddress=form.residenceAddress.value

            Joi.validate({residenceAddress:body.residenceAddress}, {residenceAddress: Joi.string()}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({residenceAddressError:'Invalid Residence Address'});
              }    
          });
          }
          if(!(form.telephoneNumber.value==="")){
            body.telephoneNumber=form.telephoneNumber.value

            Joi.validate({telephoneNumber:body.telephoneNumber}, {telephoneNumber: Joi.string().trim().regex(/^[0-9]{7,14}$/)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({telephoneNumberError:'Invalid Telephone Number'});
              }    
          });
          }
          if(!(form.fax.value==="")){
            body.fax=form.fax.value

            Joi.validate({fax:body.fullName}, {fax: Joi.string().trim().regex(/^[0-9]{7,14}$/)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({faxError:'Invalid Fax'});
              }    
          });
          }
        if(valid)
        {
            const investorID='5ca7594f3f074a35383a61a3';
            try
            {
                await axios.put(serverURI + `/investors/${investorID}`,body);
                this.setState({valid:'Successfully Updated!'})
            }
            catch
            {
                this.state.emailError='Make sure this email is not already in use'
                this.setState({valid:'Oops something went wrong!'})
            }
        }else{
          this.setState({valid:'Oops something went wrong!'})
        }
    };
    render() {
        return (
          <div>

            <form id="Investorupdate">
            <br/>
            <h1>Update Profile</h1>
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
            <button onClick={this.submit}>Update</button><br/>
            {this.state.valid}
            <br/>
            <br/>
          </div>
        );
      }
}; 