import React from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { Redirect } from 'react-router-dom'
const { serverURI } = require("../config/keys");


const Joi = require("joi");
const mongoValidator = require("validator");
export default class lawyerUpdateCase extends React.Component {
    
    constructor(props) {
            super(props)
            this.state = {
              companyType: '',
              regulatedLaw: '',
              legalFormOfCompany: '',
              companyNameArabic: '',
              companyNameEnglish: '',
              headOfficeGovernorate: '',
              headOfficeCity: '',
              headOfficeAddress: '',
              phoneNumber: '',
              fax: '',
              currencyUsedForCapital: '',
              capital: ''     
        }
    }

    submit= async()=> {
        var valid=true;
        const me =this
        me.setState({regulatedLawR:''});
        me.setState({legalFormOfCompanyR:''});
        me.setState({companyNameArabicR:''});
        me.setState({companyNameEnglishR:''});
        me.setState({headOfficeGovernorateR:''});
        me.setState({headOfficeCityR:''});
        me.setState({headOfficeAddressR:''});
        me.setState({phoneNumberR:''});
        me.setState({faxR:''});
        me.setState({currencyUsedForCapitalR:''});
        me.setState({capitalR:''});
        var form=document.getElementById("lawyerUpdate")
        const body =  {
            form:{
             
            }
        }
        if(!(form.companyType.value===""))
          body.form.companyType=form.companyType.value
          if(!(form.regulatedLaw.value==="")){
            body.form.regulatedLaw=form.regulatedLaw.value

            Joi.validate({regulatedLaw:body.form.regulatedLaw}, {regulatedLaw: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({regulatedLawR:'Invalid regulated Law'});
              }    
          });
          }
          if(!(form.legalFormOfCompany.value==="")){
           body.form.legalFormOfCompany=form.legalFormOfCompany.value

            Joi.validate({legalFormOfCompany:body.form.legalFormOfCompany}, {legalFormOfCompany: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({legalFormOfCompanyR:'Invalid legal Form Of Company'});
              }    
          });
          }
          if(!(form.companyNameArabic.value==="")){
            body.form.companyNameArabic=form.companyNameArabic.value

            Joi.validate({companyNameArabic:body.form.companyNameArabic}, {companyNameArabic: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({companyNameArabicR:'Invalid company Name Arabic'});
              }    
          });
          }
          if(!(form.companyNameEnglish.value==="")){
            body.form.companyNameEnglish=form.companyNameEnglish.value

            Joi.validate({companyNameEnglish:body.form.companyNameEnglish}, {companyNameEnglish: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({companyNameEnglishR:'Invalid company Name English'});
              }    
          });
          }
          if(!(form.headOfficeGovernorate.value==="")){
            body.form.headOfficeGovernorate=form.headOfficeGovernorate.value

            Joi.validate({headOfficeGovernorate:body.form.headOfficeGovernorate}, {headOfficeGovernorate: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({headOfficeGovernorateR:'Invalid head Office Governorate'});
              }    
          });
          }
          if(!(form.headOfficeCity.value==="")){
            body.form.headOfficeCity=form.headOfficeCity.value

            Joi.validate({headOfficeCity:body.form.headOfficeCity}, {headOfficeCity: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({headOfficeCityR:'Invalid head Office City'});
              }    
          });
          }
          if(!(form.headOfficeAddress.value==="")){
            body.form.headOfficeAddress=form.headOfficeAddress.value

            Joi.validate({headOfficeAddress:body.form.headOfficeAddress}, {headOfficeAddress: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({headOfficeAddressR:'Invalid head Office Address'});
              }    
          });
          }
          if(!(form.phoneNumber.value==="")){
            body.form.phoneNumber=form.phoneNumber.value

            Joi.validate({phoneNumber:body.form.phoneNumber}, {phoneNumber: Joi.string().trim().regex(/^[0-9]{7,14}$/)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({phoneNumberR:'invalid Phone number'});
              }    
          });
          }
          if(!(form.fax.value==="")){
            body.form.fax=form.fax.value

            Joi.validate({fax:body.form.fax}, {fax: Joi.string().trim().regex(/^[0-9]{7,14}$/)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({faxR:'Invaid Fax'});
              }    
          });
          }
          if(!(form.currencyUsedForCapital.value==="")){
            body.form.currencyUsedForCapital=form.currencyUsedForCapital.value

            Joi.validate({currencyUsedForCapital:body.form.currencyUsedForCapital}, {currencyUsedForCapital: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({currencyUsedForCapitalR:'Invalid currency Used For Capital'});
              }    
          });
          }
          if(!(form.capital.value==="")){
            body.form.capital=form.capital.value
            
            Joi.validate({capital:body.form.capital}, {capital: Joi.number()}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({capitalR:'Invalid Capital'});
              }    
          });
          }
          const caseID='5ca8a6c06f7661e423afc714'

          const lawyerID='5ca76f5f00b48e09001936e7'
          if(!mongoValidator.isMongoId(lawyerID) || !mongoValidator.isMongoId(caseID)){
            valid=false;
            this.setState({err:'Invalid either lawyerID or CaseID'})
          }
          if(valid)
        {
            try
            {
              await axios.put(serverURI + `/lawyers/update/${lawyerID}/${caseID}`,body)
              this.setState({val:'Successfully updated'})
            }
            catch (error)
            {
              this.setState({companyNameArabicR: 'make sure arabic company name is unique'})
              this.setState({companyNameEnglishR: 'make sure english company name is unique'})
            }
        }
        else{
            this.setState({val:'something went wrong'})
        }
        
      }

      submitAndPDF= async()=> {
        var valid=true;
        const me =this
        me.setState({regulatedLawR:''});
        me.setState({legalFormOfCompanyR:''});
        me.setState({companyNameArabicR:''});
        me.setState({companyNameEnglishR:''});
        me.setState({headOfficeGovernorateR:''});
        me.setState({headOfficeCityR:''});
        me.setState({headOfficeAddressR:''});
        me.setState({phoneNumberR:''});
        me.setState({faxR:''});
        me.setState({currencyUsedForCapitalR:''});
        me.setState({capitalR:''});
        var form=document.getElementById("lawyerUpdate")
        const body =  {
            form:{
             
            }
        }
        if(!(form.companyType.value===""))
          body.form.companyType=form.companyType.value
          if(!(form.regulatedLaw.value==="")){
            body.form.regulatedLaw=form.regulatedLaw.value

            Joi.validate({regulatedLaw:body.form.regulatedLaw}, {regulatedLaw: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({regulatedLawR:'Invalid regulated Law'});
              }    
          });
          }
          if(!(form.legalFormOfCompany.value==="")){
           body.form.legalFormOfCompany=form.legalFormOfCompany.value

            Joi.validate({legalFormOfCompany:body.form.legalFormOfCompany}, {legalFormOfCompany: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({legalFormOfCompanyR:'Invalid legal Form Of Company'});
              }    
          });
          }
          if(!(form.companyNameArabic.value==="")){
            body.form.companyNameArabic=form.companyNameArabic.value

            Joi.validate({companyNameArabic:body.form.companyNameArabic}, {companyNameArabic: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({companyNameArabicR:'Invalid company Name Arabic'});
              }    
          });
          }
          if(!(form.companyNameEnglish.value==="")){
            body.form.companyNameEnglish=form.companyNameEnglish.value

            Joi.validate({companyNameEnglish:body.form.companyNameEnglish}, {companyNameEnglish: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({companyNameEnglishR:'Invalid company Name English'});
              }    
          });
          }
          if(!(form.headOfficeGovernorate.value==="")){
            body.form.headOfficeGovernorate=form.headOfficeGovernorate.value

            Joi.validate({headOfficeGovernorate:body.form.headOfficeGovernorate}, {headOfficeGovernorate: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({headOfficeGovernorateR:'Invalid head Office Governorate'});
              }    
          });
          }
          if(!(form.headOfficeCity.value==="")){
            body.form.headOfficeCity=form.headOfficeCity.value

            Joi.validate({headOfficeCity:body.form.headOfficeCity}, {headOfficeCity: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({headOfficeCityR:'Invalid head Office City'});
              }    
          });
          }
          if(!(form.headOfficeAddress.value==="")){
            body.form.headOfficeAddress=form.headOfficeAddress.value

            Joi.validate({headOfficeAddress:body.form.headOfficeAddress}, {headOfficeAddress: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({headOfficeAddressR:'Invalid head Office Address'});
              }    
          });
          }
          if(!(form.phoneNumber.value==="")){
            body.form.phoneNumber=form.phoneNumber.value

            Joi.validate({phoneNumber:body.form.phoneNumber}, {phoneNumber: Joi.string().trim().regex(/^[0-9]{7,14}$/)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({phoneNumberR:'invalid Phone number'});
              }    
          });
          }
          if(!(form.fax.value==="")){
            body.form.fax=form.fax.value

            Joi.validate({fax:body.form.fax}, {fax: Joi.string().trim().regex(/^[0-9]{7,14}$/)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({faxR:'Invaid Fax'});
              }    
          });
          }
          if(!(form.currencyUsedForCapital.value==="")){
            body.form.currencyUsedForCapital=form.currencyUsedForCapital.value

            Joi.validate({currencyUsedForCapital:body.form.currencyUsedForCapital}, {currencyUsedForCapital: Joi.string().min(2)}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({currencyUsedForCapitalR:'Invalid currency Used For Capital'});
              }    
          });
          }
          if(!(form.capital.value==="")){
            body.form.capital=form.capital.value
            
            Joi.validate({capital:body.form.capital}, {capital: Joi.number()}, function (error) {
              if(error)
              {
                  valid=false;
                  me.setState({capitalR:'Invalid Capital'});
              }    
          });
          }
          const caseID='5ca8a6c06f7661e423afc714'

          const lawyerID='5ca76f5f00b48e09001936e7'
          if(!mongoValidator.isMongoId(lawyerID) || !mongoValidator.isMongoId(caseID)){
            valid=false;
            this.setState({err:'Invalid either lawyerID or CaseID'})
          }
          if(valid)
        {
            try
            {
              await axios.put(serverURI + `/lawyers/update/${lawyerID}/${caseID}`,body)
              this.setState({val:'Successfully updated'})
            }
            catch
            {
              this.setState({companyNameArabicR: 'make sure arabic company name is unique'})
              this.setState({companyNameEnglishR: 'make sure english company name is unique'})
              this.setState({val:'make sure that you are the creator of this case,the case is in update status and these IDs exsist'})

            }
        }
        else{
            this.setState({val:'something went wrong'})
        }
        if(this.state.val==='Successfully updated'){
          const mycase = await axios.get(serverURI + `/cases/${caseID}`);
          console.log(mycase)
          if(mycase.data.data.form.companyType ==='SPC'){
            window.open(serverURI + `/lawyers/downloadDecision/${caseID}`,'_blank');
          }
          else{
            window.open(serverURI + `/lawyers/downloadContract/${caseID}`,'_blank');
          }
        }
      }
      

    render() {
      const styles = {
        label: {
          width: "30%",
          minWidth:"200px",
          margin:"auto"
        }
      }
        return (
          <div>
              <br/>
              <h2 class="text-center text-info">Update Case</h2>
            <form id="lawyerUpdate">
            {this.state.err}
            Company type 
            <br />
            <select className="form-control" name="companyType" style={styles.label} >
              <option value="">Choose type</option>
              <option value="SPC">SPC</option>
              <option value="SSC">SSC</option>
            </select>
          <br/>
          <FormControl>    
            <InputLabel>Regulated Law</InputLabel>
            <Input
                type='text'
                name="regulatedLaw"
                multiline
                />
          </FormControl>
          <br />
          {this.state.regulatedLawR}
          <br/>
          <FormControl>    
            <InputLabel>Legal Form Of Company</InputLabel>
            <Input
                type='text'
                name="legalFormOfCompany"
                multiline
            />
          </FormControl>
          <br />
          {this.state.legalFormOfCompanyR}
          <br/>
          <FormControl>    
            <InputLabel>Arabic Company Name</InputLabel>
            <Input
                type='text'
                name="companyNameArabic"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.companyNameArabicR}</label>
          <br/>
          <FormControl>    
            <InputLabel>English Company Name</InputLabel>
            <Input
                type='text'
                name="companyNameEnglish"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.companyNameEnglishR}</label>
          <br/>
          <FormControl>    
            <InputLabel>Head Office Governorate</InputLabel>
            <Input
                type='text'
                name="headOfficeGovernorate"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.headOfficeGovernorateR}</label>
          <br/>
          <FormControl>    
            <InputLabel>Head Office City</InputLabel>
            <Input
                type='text'
                name="headOfficeCity"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.headOfficeCityR}</label>
          <br/>
          <FormControl>    
            <InputLabel>Head Office Address</InputLabel>
            <Input
                type='text'
                name="headOfficeAddress"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.headOfficeAddressR}</label>
          <br/>
          <FormControl>    
            <InputLabel>Phone Number</InputLabel>
            <Input
                type='text'
                name="phoneNumber"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.phoneNumberR}</label>
          <br/>
          <FormControl>    
            <InputLabel>Fax Number</InputLabel>
            <Input
                type='text'
                name="fax"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.faxR}</label>
          <br/>
          <FormControl>    
            <InputLabel>Currency</InputLabel>
            <Input
                type='text'
                name="currencyUsedForCapital"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.currencyUsedForCapitalR}</label>
          <br/>
          <FormControl>    
            <InputLabel>Capital</InputLabel>
            <Input
                type='text'
                name="capital"
                multiline
            />
          </FormControl>
          <br />
          <label id="Error" class="text-danger">{this.state.capitalR}</label>
          <br/>
          <br/>
                </form>
                <Button variant="primary" size="large" onClick={this.submit}>
                  Submit
                </Button>
                <Button variant="primary" size="large" onClick={this.submitAndPDF}>Submit & download PDF</Button>
                {/* <button onClick={this.submit}>submit</button><br/> */}
                <br />
                <br />
                  {this.state.val==='Successfully updated' ?  <Redirect to={{pathname: "/LawyerViewCase"}}/>:<div/>}
                
                {this.state.val}

          </div>
        );
      }
};
