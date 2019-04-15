import React from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
const Joi = require("joi");
const mongoValidator = require("validator");
const serverURI = require("../config/keys").serverURI;

export default class InvestorUpdateCase extends React.Component {
    
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
        var form=document.getElementById("InvestorUpdate")
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
          const caseID='5ca62338fd83c24bf091758f'
          const InvestorID='5ca6229afd83c24bf091758e'
          if(!mongoValidator.isMongoId(InvestorID) || !mongoValidator.isMongoId(caseID)){
            valid=false;
            this.setState({err:'Invalid either InvestorID or CaseID'})
          }
          if(valid)
        {
            try
            {
              await axios.put(serverURI + `/investors/updateForm/${InvestorID}/${caseID}`,body)
              this.setState({val:'Successfully updated'})
            }
            catch
            {
              this.setState({companyNameArabicR: 'make sure arabic company name is unique'})
              this.setState({companyNameEnglishR: 'make sure english company name is unique'})
            }
        }
        else{
            this.setState({val:'something went wrong'})
        }
        
      }

    render() {
        return (
          <div>
              <br/>
              <h2>Update Case</h2>
            <form id="InvestorUpdate">
            {this.state.err}
            Company type: <select className="form-control" name="companyType"  >
          <option value="">Choose type</option>
          <option value="SPC">SPC</option>
          <option value="SSC">SSC</option>
        </select>
          <br/>
          Regulated law: <input type="text" name="regulatedLaw"/><br/>
          {this.state.regulatedLawR}<br/>
          <br/>
          Legal form of company: <input type="text" name="legalFormOfCompany"/><br/>
          {this.state.legalFormOfCompanyR}<br/>
          <br/>
          Company name in arabic: <input type="text" name="companyNameArabic"/><br/>
          {this.state.companyNameArabicR}<br/>
          <br/>
          Company name in english: <input type="text" name="companyNameEnglish"/><br/>
          {this.state.companyNameEnglishR}<br/>
          <br/>
          head office governorate: <input type="text" name="headOfficeGovernorate"/><br/>
          {this.state.headOfficeGovernorateR}<br/>
          <br/>
          head office city: <input type="text" name="headOfficeCity"/><br/>
          {this.state.headOfficeGovernorateR}<br/>
          <br/>
          head office address: <input type="text" name="headOfficeAddress"/><br/>
          {this.state.headOfficeAddressR}<br/>
          <br/>
          phone number: <input type="text" name="phoneNumber"/><br/>
          {this.state.phoneNumberR}<br/>
          <br/>
          fax: <input type="text" name="fax"/><br/>
          {this.state.faxR}<br/>
          <br/>
          currency used for capital: <input type="text" name="currencyUsedForCapital"/><br/>
          {this.state.currencyUsedForCapitalR}<br/>
          <br/>
          capital: <input type="text" name="capital"/><br/>
          {this.state.capitalR}<br/>
          <br/>
                </form>
                <button onClick={this.submit}>submit</button><br/>
                {this.state.val==='Successfully updated'? <Redirect to={{pathname: "/MyCompanies"}}/>:<div/>}
                {this.state.val}
                
          </div>
        );
      }
};
