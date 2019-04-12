import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { types } from 'util';
import Managers from '../Managers';
import axios from 'axios';
const Joi = require("joi");
//const mongoose = require("mongoose");
// const Investor = require("../../../../models/Investor");

class LawyerFillForm extends Component {
  constructor() {
    super();
    this.state = {
        message : '',
        messageType:'',
        messageLaw: '',
        messageLegForm: '',
        messageNameAr: '',
        messageNameEng: '',
        messageGov: '',
        messageCity: '',
        messageAdd: '',
        messagePhone: '',
        messageFax: '',
        messageCur: '',
        messageCap: '',
        messageInv:'',
        companyType : '',
        regulatedLaw : '',
        legalFormOfCompany : '',
        companyNameArabic : '',
        companyNameEnglish : '',
        headOfficeGovernorate : '',
        headOfficeCity : '',
        headOfficeAddress : '',
        phoneNumber : '',
        fax : '',
        currencyUsedForCapital : '',
        capital : 0,
        creatorInvestorId : '',
        managers:[{ managerName: "" ,managerType: "", managerGender: "" , managerNationality: "" , 
        managerIdType: "" , managerIdNumber: "" , managerDateOfBirth: "" , managerResidenceAddress: "" , managerPositionInBoardOfDirectors: ""}]
    };
    this.addManager = this.addManager.bind(this);
    this.removeManager = this.removeManager.bind(this);
    this.updateManagerName = this.updateManagerName.bind(this);
    this.updateManagerType = this.updateManagerType.bind(this);
    this.updateManagerGender = this.updateManagerGender.bind(this);
    this.updateManagerNationality = this.updateManagerNationality.bind(this);
    this.updateManagerIDType = this.updateManagerIDType.bind(this);
    this.updateManagerIDNumber = this.updateManagerIDNumber.bind(this);
    this.updateManagerDateBirth = this.updateManagerDateBirth.bind(this);
    this.updateManagerAdrress = this.updateManagerAdrress.bind(this);
    this.updateManagerPosition = this.updateManagerPosition.bind(this);
}
    addManager(){
        let managersCopy = this.state.managers.slice();
        this.state.managers.push({ managerName: "" ,managerType: "", managerGender: "" , managerNationality: "" , 
        managerIdType: "" , managerIdNumber: "" , managerDateOfBirth: "" , managerResidenceAddress: "" , managerPositionInBoardOfDirectors: ""})
    }
    removeManager = idx =>{
       this.state.managers = this.state.managers.filter((s, sidx) => idx !== sidx)
    }
    updateManagerName = (idx,e) =>{
        this.state.managers[idx].managerName = e
    }
    updateManagerType = (idx,e) =>{
        this.state.managers[idx].managerType = e
    }
    updateManagerGender = (idx,e) =>{
        this.state.managers[idx].managerGender = e
    }
    updateManagerNationality = (idx,e) =>{
        this.state.managers[idx].managerNationality = e
    }
    updateManagerIDType = (idx,e) =>{
        this.state.managers[idx].managerIdType = e
    }
    updateManagerIDNumber = (idx,e) =>{
        this.state.managers[idx].managerIdNumber = e
    }
    updateManagerDateBirth = (idx,e) =>{
        this.state.managers[idx].managerDateOfBirth = e
    }
    updateManagerAdrress = (idx,e) =>{
        this.state.managers[idx].managerResidenceAddress = e
    }
    updateManagerPosition = (idx,e) =>{
        this.state.managers[idx].managerPositionInBoardOfDirectors = e
    }
    handleManagersChange(event){
        this.props.onChange(this.props.id)
    }
    changeType = e => {
        this.setState({companyType: e.target.value})
        let me =this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageType:'Company Type is required'})
                else
                    me.setState({messageType:'Invalid Comapny Type'});
            }
            else
                me.setState({messageLaw:''});
        });
    }
    changeLaw = e => {
        this.setState({regulatedLaw: e.target.value})
        let me =this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageLaw:'regulated law is required'})
                else
                    me.setState({messageLaw:'Invalid Regulated Law'});
            }
            else
                me.setState({messageLaw:''});
        });
    }
    changeLegalFormOfCompany = e => {
        this.setState({legalFormOfCompany: e.target.value})
        let me = this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageLegForm:'legalFormOfCompany is required'})
                else
                    me.setState({messageLegForm:'Invalid legalFormOfCompany'});
            }
            else
                me.setState({messageLegForm:''});
        });
    }
    changeCompanyNameArabic = e => {
        this.setState({companyNameArabic: e.target.value})
        let me = this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageNameAr:'Company name in arabic is required'})
                else
                    me.setState({messageNameAr:'Invalid company name in arabic'});
            }
            else
                me.setState({messageNameAr:''});
        });
    }
    changeCompanyNameEnglish = e => {
        this.setState({companyNameEnglish: e.target.value})
        let me = this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error && e.target.value!=='')
            {
                me.setState({messageNameEng:'Invalid company name in english'});
            }
            else
                me.setState({messageNameEng:''});
        });
    }
    changeHeadOfficeGovernorate = e => {
        this.setState({headOfficeGovernorate: e.target.value})
        let me = this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageGov:'headOfficeGovernorate is required'})
                else
                    me.setState({messageGov:'Invalid headOfficeGovernorate'});
            }
            else
                me.setState({messageGov:''});
        });
    }
    changeHeadOfficeCity = e => {
        this.setState({headOfficeCity: e.target.value})
        let me = this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageCity:'headOfficeCity is required'})
                else
                    me.setState({messageCity:'Invalid headOfficeCity'});
            }
            else
                me.setState({messageCity:''});
        });
    }
    changeHeadOfficeAddress = e => {
        this.setState({headOfficeAddress: e.target.value})
        let me = this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageAdd:'headOfficeAddress is required'})
                else
                    me.setState({messageAdd:'Invalid headOfficeAddress'});
            }
            else
                me.setState({messageAdd:''});
        });
    }
    changePhoneNumber = e => {
        this.setState({phoneNumber: e.target.value})
        let me = this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error && e.target.value !== '')
            {
                me.setState({messagePhone:'Invalid phoneNumber'});
            }
            else
                me.setState({messagePhone:''});
        });
    }
    changeFax = e => {
        this.setState({fax: e.target.value})
        let me = this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error && e.target.value !== '')
            {
                me.setState({messageFax:'Invalid fax'});
            }
            else
                me.setState({messageFax:''});
        });
    }
    changeCurrencyUsedForCapital = e => {
        this.setState({currencyUsedForCapital: e.target.value})
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageCur:'currencyUsedForCapital is required'})
                else
                    me.setState({messageCur:'Invalid currencyUsedForCapital'});
            }
            else
                me.setState({messageCur:''});
        });
    }
    changeCapital = e => {
        this.setState({capital: e.target.value})
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.number()}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageCap:'capital is required'})
                else
                    me.setState({messageCap:'Invalid capital'});
            }
            else
                me.setState({messageCap:''});
        });
    }
    changeCreatorInvestorId= e => {
        this.setState({creatorInvestorId: e.target.value})
        let me=this
        Joi.validate({x:e.target.value}, {x: Joi.string().min(3)}, function (error, value) {
            if(error)
            {
                if(e.target.value==='')
                    me.setState({messageInv:'Investor ID is required'})
                else
                    me.setState({messageInv:'Invalid investor ID'});
            }
            else
                me.setState({messageInv:''});
        });
    }
    handleSubmit = async e => {
        let valid = true
        let me = this
        let mycase 
        if(this.state.companyType!=='SPC'){
            mycase =  {
                form: {
                    companyType: this.state.companyType.toString(),
                    regulatedLaw: this.state.regulatedLaw.toString(),
                    legalFormOfCompany: this.state.legalFormOfCompany.toString(),
                    companyNameArabic: this.state.companyNameArabic.toString(),
                    companyNameEnglish: this.state.companyNameEnglish.toString(),
                    headOfficeGovernorate: this.state.headOfficeGovernorate.toString(),
                    headOfficeCity: this.state.headOfficeCity.toString(),
                    headOfficeAddress: this.state.headOfficeAddress.toString(),
                    phoneNumber: this.state.phoneNumber.toString(),
                    fax: this.state.fax.toString(),
                    currencyUsedForCapital: this.state.currencyUsedForCapital.toString(),
                    capital: this.state.capital.toString()
                },
                caseStatus: "WaitingForLawyer",
                creatorInvestorId: this.state.creatorInvestorId.toString(),
                managers: this.state.managers
            }
        }else{
            mycase =  {
                form: {
                    companyType: this.state.companyType,
                    regulatedLaw: this.state.regulatedLaw.toString(),
                    legalFormOfCompany: this.state.legalFormOfCompany.toString(),
                    companyNameArabic: this.state.companyNameArabic.toString(),
                    companyNameEnglish: this.state.companyNameEnglish.toString(),
                    headOfficeGovernorate: this.state.headOfficeGovernorate.toString(),
                    headOfficeCity: this.state.headOfficeCity.toString(),
                    headOfficeAddress: this.state.headOfficeAddress.toString(),
                    phoneNumber: this.state.phoneNumber.toString(),
                    fax: this.state.fax.toString(),
                    currencyUsedForCapital: this.state.currencyUsedForCapital.toString(),
                    capital: this.state.capital.toString()
                },
                caseStatus: "WaitingForLawyer",
                creatorInvestorId: this.state.creatorInvestorId.toString()
            }
            try{
                const cas = await axios.post('http://localhost:5000/api/lawyers/fillForm/5ca777485c74d20e80486f9c', mycase)
                this.setState({message: 'Successfully added'})
            }catch (e){
                this.setState({message: 'wrong input'})
                }
        }
        
    }

  render() {
    return (
      <div className="lawyerFillForm">
            <label>Company Type: </label>
            <select onChange={this.changeType}>
                <option value="" />
                <option value="SPC">SPC</option>
                <option value="SSC">SSC</option>
            </select>
            <label>{this.state.messageType}</label>
            <br/>
            <label>Regulated Law: </label>
            <input
                type="text"
                placeholder="regulatedLaw"
                value={this.state.name}
                onChange={this.changeLaw}
                />
            <label>{this.state.messageLaw}</label>
            <br/>
            <label>Legal Form Of Company: </label>
            <input
                type="text"
                placeholder="legalFormOfCompany"
                value={this.state.name}
                onChange={this.changeLegalFormOfCompany}
            />
            <label>{this.state.messageLegForm}</label>
            <br/>
            <label>Company Name In Arabic: </label>
             <input
                type="text"
                placeholder="companyNameArabic"
                value={this.state.name}
                onChange={this.changeCompanyNameArabic}
                />
            <label>{this.state.messageNameAr}</label>
            <br/>
            <label>Company Name In English: </label>
            <input
                type="text"
                placeholder="companyNameEnglish"
                value={this.state.name}
                onChange={this.changeCompanyNameEnglish}
                />
            <label>{this.state.messageNameEng}</label>
            <br/>
            <label>Head Office Governorate: </label>
            <input
                type="text"
                placeholder="headOfficeGovernorate"
                value={this.state.name}
                onChange={this.changeHeadOfficeGovernorate}
                />
            <label>{this.state.messageGov}</label>
            <br/>
            <label>Head Office City: </label>
            <input
                type="text"
                placeholder="headOfficeCity"
                value={this.state.name}
                onChange={this.changeHeadOfficeCity}
            />
            <label>{this.state.messageCity}</label>
            <br/>
            <label>Head Office Address: </label>
            <input
                type="text"
                placeholder="headOfficeAddress"
                value={this.state.name}
                onChange={this.changeHeadOfficeAddress}
            />
            <label>{this.state.messageAdd}</label>
            <br/>
            <label>Phone Number: </label>
            <input
                type="text"
                placeholder="phoneNumber"
                value={this.state.name}
                onChange={this.changePhoneNumber}
            />
            <label>{this.state.messagePhone}</label>
            <br/>
            <label>Fax: </label>
            <input
                type="text"
                placeholder="fax"
                value={this.state.name}
                onChange={this.changeFax}
            />
            <label>{this.state.messageFax}</label>
            <br/>
            <label>Currency Used For Capital: </label>
            <input
                type="text"
                placeholder="currencyUsedForCapital"
                value={this.state.name}
                onChange={this.changeCurrencyUsedForCapital}
            />
            <label>{this.state.messageCur}</label>
            <br/>
            <label>Capital: </label>
            <input
                type="number"
                placeholder="capital"
                value={this.state.name}
                onChange={this.changeCapital}
            />
            <label>{this.state.messageCap}</label>
            <br/>
            <label>Creator Investor Email: </label>
            <input
                type="text"
                placeholder="creatorInvestorId"
                value={this.state.name}
                onChange={this.changeCreatorInvestorId}
            />
            <label>{this.state.messageInv}</label>
            <br/>
            { (this.state.companyType==='SSC')?<Managers
                managers ={this.state.managers}
                addManager={this.addManager}
                removeManager={this.removeManager}
                updateManager={this.updateManager}
                updateManagerName = {this.updateManagerName}
                updateManagerType = {this.updateManagerType}
                updateManagerGender = {this.updateManagerGender}
                updateManagerNationality = {this.updateManagerNationality}
                updateManagerIDType = {this.updateManagerIDType}
                updateManagerIDNumber = {this.updateManagerIDNumber}
                updateManagerDateBirth = {this.updateManagerDateBirth}
                updateManagerAdrress = {this.updateManagerAdrress}
                updateManagerPosition = {this.updateManagerPosition}
            /> :<br />}
            
            <br/>
            <button onClick={this.handleSubmit}>Submit</button>
            <br/>
            <label>{this.state.message}</label>
      </div>
    );
  }
}

export default LawyerFillForm;
