import React from 'react'
import axios from 'axios';
import parseJwt from '../helpers/decryptAuthToken';
import {Redirect} from 'react-router-dom';
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
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import Paper from "@material-ui/core/Paper";
const Joi = require("joi");

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
            investorId:"",
            home:0
        }
    }

    async componentDidMount(){
      if (!localStorage.jwtToken) {
        alert("You must login!");
        this.setState({ home: 1 });
        return;
      }
      try{
          await axios.get('../api/investors/auth')
      }catch(err){
        alert("You are not allowed");
        this.setState({ home: 1 });
        return;
      }
      this.setState({ home: 2 });
        const data = parseJwt(localStorage.jwtToken)
      await this.setState({investorId:data.id})
    };

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
            const investorId=this.state.investorId;
            try
            {
                await axios.put(`api/investors/${investorId}`,body);
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
      const styles = {
        formControl: {
            margin: 0,
            width: 200,
            // backgroundColor:'red',
        },
        myDiv:{
          backgroundColor:'rgba(52,128,227,0.2)',
          // backgroundColor:'rgba(229,49,103)',
        },
        myButton:{
          color:'red',
        },
        paper:{
          backgroundColor:'rgb(228, 111, 146)',
          margin:'auto',
          width: '50%',
          fontFamily: "SF Pro Display",
          paddingTop: '10px',
          paddingBottom: '10px',
          boxShadow: '0 0 0 0.2rem rgba(229,49,103,.50)',
        }
    }

      if (this.state.home===0) return <div> </div>;
      if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        return (
          <div style={styles.myDiv}>
          <div>
            <form id="EditInvestorProfile">
            
            <FormControl required>
              <InputLabel>Full Name</InputLabel>
              <Input name="fullName" type="text" style={{ width: 200 }}/>
            </FormControl>
           
            {/* <br /> */}
            <label id="Error" class="text-danger">
              {" "}
              {this.state.fullNameError}
            </label>
            <br />

            
            <FormControl required>
              <InputLabel>Email</InputLabel>
              <Input name="email" type="text" style={{ width: 200 }}/>
            </FormControl>
            
            {/* <br /> */}
            <label id="Error" class="text-danger">
              {" "}
              {this.state.emailError}
            </label>

            <br />

            <FormControl required>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                name="password"
                type={this.state.showPassword ? "text" : "password"}
                style={{ width: 200 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <label id="Error" class="text-danger">
              {" "}
              {this.state.passwordError}
            </label>

            <br />

            <FormControl required style={styles.formControl}>
              <InputLabel htmlFor="age-required">Type</InputLabel>
              <Select id="type" >
                <MenuItem value={"fullTimeInvestor"}>Full Time Investor</MenuItem>
              </Select>
            </FormControl>

            <br />

            <FormControl required style={styles.formControl}>
              <InputLabel htmlFor="age-required">Type</InputLabel>
              <Select id="gender" >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>

            <br />
            

            <FormControl required>
              <InputLabel>Nationality</InputLabel>
              <Input name="nationality" type="text" style={{ width: 200 }}/>
            </FormControl>
            <br />
            <label id="Error" class="text-danger">
              {" "}
              {this.state.nationalityError}
            </label>

            <br />
            
            <FormControl required style={styles.formControl}>
              <InputLabel htmlFor="age-required">Method Of Identification</InputLabel>
              <Select id="methodOfIdentification" >
                <MenuItem value={"Passport"}>Passport</MenuItem>
                <MenuItem value={"National ID"}>National ID</MenuItem>
              </Select>
            </FormControl>

            <br />
            

            
            <FormControl required>
              <InputLabel>Identification Number</InputLabel>
              <Input name="identificationNumber" type="text" style={{ width: 200 }}/>
            </FormControl>
            <br />
            <label id="Error" class="text-danger">
              {" "}
            {this.state.identificationNumberError}<br/>
            </label>
            <br />



            
            <FormControl required>
              <InputLabel>Date Of Birth</InputLabel>
              <Input name="dateOfBirth" type="text" style={{ width: 200 }}/>
            </FormControl>
            <br />
            <label id="Error" class="text-danger">
              {" "}
              {this.state.dateOfBirthError}<br/>
            </label>
            <br />

            <FormControl required>
              <InputLabel>Residence Address</InputLabel>
              <Input name="residenceAddress" type="text" style={{ width: 200 }}/>
            </FormControl>
            <br />
            <label id="Error" class="text-danger">
              {" "}
              {this.state.residenceAddressError}<br/>
            </label>
            <br />
            


            <FormControl required>
              <InputLabel>Telephone Number</InputLabel>
              <Input name="telephoneNumber" type="text" style={{ width: 200 }}/>
            </FormControl>
            <br />
            <label id="Error" class="text-danger">
              {" "}
              {this.state.telephoneNumberError}<br/>
            </label>
            <br />


            <FormControl required>
              <InputLabel>Fax</InputLabel>
              <Input name="fax" type="text" style={{ width: 200 }}/>
            </FormControl>
            <br />
            <label id="Error" class="text-danger">
              {" "}
              {this.state.faxError}<br/>
            </label>
            <br />
            
            

            </form>

            <Button style={styles.myButton} size="small" color="primary">
            Save <EditIcon/>
          </Button>
            {this.state.valid}
            <br/>
            <br/>
            </div>
          </div>
          
        );
      }
}; 