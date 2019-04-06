import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Combobox from 'react-widgets/lib/Combobox'
import { types } from 'util';
import Managers from '../Managers';
import axios from 'axios';

class InvestorFillForm extends Component {
  constructor() {
    super();
    this.state = {
        message : '',
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
        this.setState({companyType: e})
    }
    changeLaw = e => {
        this.setState({regulatedLaw: e.target.value})
    }
    changeLegalFormOfCompany = e => {
        this.setState({legalFormOfCompany: e.target.value})
    }
    changeCompanyNameArabic = e => {
        this.setState({companyNameArabic: e.target.value})
    }
    changeCompanyNameEnglish = e => {
        this.setState({companyNameEnglish: e.target.value})
    }
    changeHeadOfficeGovernorate = e => {
        this.setState({headOfficeGovernorate: e.target.value})
    }
    changeHeadOfficeCity = e => {
        this.setState({headOfficeCity: e.target.value})
    }
    changeHeadOfficeAddress = e => {
        this.setState({headOfficeAddress: e.target.value})
    }
    changePhoneNumber = e => {
        this.setState({phoneNumber: e.target.value})
    }
    changeFax = e => {
        this.setState({fax: e.target.value})
    }
    changeCurrencyUsedForCapital = e => {
        this.setState({currencyUsedForCapital: e.target.value})
    }
    changeCapital = e => {
        this.setState({capital: e.target.value})
    }
    changeCreatorInvestorId= e => {
        this.setState({creatorInvestorId: e.target.value})
    }
    handleSubmit = async e => {
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
                creatorInvestorId: "5ca7a93fbac716049d1e3af8",
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
                creatorInvestorId: "5ca7a93fbac716049d1e3af8"
            }
        }
        try{
        const cas = await axios.post('http://localhost:5000/api/investors/fillForm/5ca7a93fbac716049d1e3af8', mycase)
        this.setState({message: 'Successfully added'})
    }catch{
        this.setState({message: 'wrong input'})
        }
    }
  render() {
    let types = ["SPC","SSC"]
    return (
      <div className="lawyerFillForm">
            <Combobox
                data={types}
                value={this.state.companyType}
                placeholder={'CompanyType'}
                onChange={this.changeType}
            />
            <br/>
            <input
                type="text"
                placeholder="regulatedLaw"
                value={this.state.name}
                onChange={this.changeLaw}
            />
            <br/>
            <input
                type="text"
                placeholder="legalFormOfCompany"
                value={this.state.name}
                onChange={this.changeLegalFormOfCompany}
            />
            <br/>
             <input
                type="text"
                placeholder="companyNameArabic"
                value={this.state.name}
                onChange={this.changeCompanyNameArabic}
            />
            <br/>
            <input
                type="text"
                placeholder="companyNameEnglish"
                value={this.state.name}
                onChange={this.changeCompanyNameEnglish}
            />
            <br/>
            <input
                type="text"
                placeholder="headOfficeGovernorate"
                value={this.state.name}
                onChange={this.changeHeadOfficeGovernorate}
            />
            <br/>
            <input
                type="text"
                placeholder="headOfficeCity"
                value={this.state.name}
                onChange={this.changeHeadOfficeCity}
            />
            <br/>
            <input
                type="text"
                placeholder="headOfficeAddress"
                value={this.state.name}
                onChange={this.changeHeadOfficeAddress}
            />
            <br/>
            <input
                type="text"
                placeholder="phoneNumber"
                value={this.state.name}
                onChange={this.changePhoneNumber}
            />
            <br/>
            <input
                type="text"
                placeholder="fax"
                value={this.state.name}
                onChange={this.changeFax}
            />
            <br/>
            <input
                type="text"
                placeholder="currencyUsedForCapital"
                value={this.state.name}
                onChange={this.changeCurrencyUsedForCapital}
            />
            <br/>
            <input
                type="number"
                placeholder="capital"
                value={this.state.name}
                onChange={this.changeCapital}
            />
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

export default InvestorFillForm;
