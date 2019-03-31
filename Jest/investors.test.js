/**
 * @jest-environment node
 */

const investors = require('./investors')
const encryption = require('../routes/api/utils/encryption')

const Case = require("../models/Case");
const Investor = require("../models/Investor");
const Company = require("../models/Company");

const db = require("../config/keys").mongoURI;
const mongoose = require("mongoose");

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

let createdEmail = ''
let createdPassword = ''
let investorId = ''
let caseId = ''

test('Create All Dependencies', async() => {
    const investor = {
        email:"moe@moe.moe",
        password:"dontusethispassword",
        fullName:"MoeMoeMoe",
        type:"CEO",
        gender:"Male",
        nationality:"Egyptian",
        methodOfIdentification:"National Card",
        identificationNumber:"12233344445555",
        dateOfBirth:"1997-12-15T22:00:00.000Z",
        residenceAddress:"Rehab City",
        telephoneNumber:"01007063067",
        fax:"123456789"
    }
    createdInvestor  = await investors.registerInvestor(investor)
    createdEmail = createdInvestor.data.data.email
    createdPassword = investor.password
    investorId = createdInvestor.data.data._id
})    

test('Registering an investor', async () => {
    const investor = 
    {
        email:"moemoemoe5@faegmail.com",
        password:"12345678fea",
        fullName:"bala ibn bafeala abo",
        type:"cfea",
        gender:"Male",
        nationality:"Egyptian",
        methodOfIdentification:"National Card",
        identificationNumber:"12233344445555",
        dateOfBirth:"1990-12-17T22:00:00.000Z",
        residenceAddress:"13th Mogama3 el Tahrir",
        telephoneNumber:"00201009913457",
        fax:"1234567"
    }
    expect.assertions(0)
    const registeredInvestor = await investors.registerInvestor(investor)
    await investors.deleteInvestor(registeredInvestor.data.data._id)
    encryption.comparePassword(investor.password, registeredInvestor.data.data.password, function(err, isMatch){
        if(err)
            throw err
        return expect(isMatch).toBeTruthy()
    })
})

test('As an investor I should be able to login', async() => {
    const loginInfo = {
        email: createdEmail,
        password: createdPassword
    }
    const loginResult = await investors.login(loginInfo)
    return expect(loginResult.data.length).toBeGreaterThan(0)
})

test('As an Investor viewing all my companies with 1 accepted & 1 pending should return 2 companies', async() => {
    mongoose
    .connect(db)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
  expect.assertions(1);

//** CREATE INVESTOR **//
  const testInvestor = {
    email:"investoremailj2est1111111@gmail.com",
    password:"verystrongpassword",
    fullName:"yolo",
    type:"f",
    gender:"Male",
    nationality:"Egyptian",
    methodOfIdentification:"National Card",
    identificationNumber:"55533355555555",
    dateOfBirth:"1990-12-17T22:00:00.000Z",
    residenceAddress:"13th Mogama3 el Tahrir",
    telephoneNumber:"00201009913457",
    fax:"1234567"
  }
  const createdInvestor  = await Investor.create(testInvestor);

//** CREATE CASE **//
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'companyjest11111111',
        companyNameEnglish: 'engname11111',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 1000000
    },
    caseStatus: 'Accepted',
    creatorInvestorId: createdInvestor._id
  }
  const createdCase = await Case.create(testCase);

  const testCase1 = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'companyjest22222222',
        companyNameEnglish: 'engname22222',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 1000000
    },
    caseStatus: 'WaitingForReviewer',
    creatorInvestorId: createdInvestor._id
  }
 const createdCase1 = await Case.create(testCase1);

//** CREATE TEST COMPANY **//
    const testCompany = {
        socialInsuranceNumber: "88888888888888",
        investorID: createdInvestor._id,
        companyName: "companyjest11111111",
        companyType: "SPC",
        caseID: createdCase._id,
        dateOfCreation: '1/1/2018'
    }
    await Company.create(testCompany);
    const testCompany1 = {
        socialInsuranceNumber: "88888888888888",
        investorID: createdInvestor._id,
        companyName: "companyjest22222222",
        companyType: "SPC",
        caseID: createdCase1._id,
        dateOfCreation: '1/1/2018'
    }
    await Company.create(testCompany1);
    const result = await investors.getMyCompanies(createdInvestor._id);
    expect(result.data.data.length).toEqual(2);
    await Company.deleteOne(testCompany);
    await Company.deleteOne(testCompany1);
    await Investor.deleteOne(testInvestor);
    await Case.deleteOne(testCase);
    await Case.deleteOne(testCase1);
}); 

test('Delete All Dependencies', async () => {
    await investors.deleteInvestor(investorId)
})

test('As an investor I should be view my fees', async() => {
    expect.assertions(3);
    let req=
        {
      
            "email": "notificatio3546nTest@gmail.com",
            "password": "$2a$10$Ja.2twjd0KSVVyULqh7HCeEtu0aJM9ej9LiK5kth3C0AKMBoREqxC",
            "fullName": "Notification Test",
            "type": "a",
            "gender": "Male",
            "nationality": "Egyptian",
            "methodOfIdentification": "National Card",
            "identificationNumber": "36987103512311",
            "dateOfBirth": "1990-12-14T13:13:13.000Z",
            "residenceAddress": "8165th 3emarat el Shamoosa",
            "telephoneNumber": "01091867182317",
            "fax": "1224567"
        }
    const investor= await investors.createInvestor(req);
    req=
        {
            "form": {
                "companyType": "SPC",
                "regulatedLaw": "72",
                "legalFormOfCompany": "DONTDELETE",
                "companyNameArabic": "DONTDE352LETE",
                "companyNameEnglish": "DONTD4536ELETE",
                "headOfficeGovernorate": "DONTDELETE",
                "headOfficeCity": "DONTDELETE",
                "headOfficeAddress": "DONTDELETE",
                "phoneNumber": "121212122121",
                "fax": "1234567",
                "currencyUsedForCapital": "DONTDELETE",
                "capital": 100
            },
            "caseStatus": "WaitingForLawyer",
            
            "creatorInvestorId": investor._id
            
        }
    const cas = await investors.createCase(req);
    let res= await investors.viewMyFees(investor._id);
    
    expect(res).toBe('you do not have any accepted company requests')
    req=
        {
            "form": {
                "companyType": "SPC",
                "regulatedLaw": "72",
                "legalFormOfCompany": "DONTDELETE",
                "headOfficeGovernorate": "DONTDELETE",
                "headOfficeCity": "DONTDELETE",
                "headOfficeAddress": "DONTDELETE",
                "phoneNumber": "121212122121",
                "fax": "1234567",
                "currencyUsedForCapital": "DONTDELETE",
                "capital": 100
            },
            "caseStatus": "Accepted"
        }
    await investors.changeStatus(cas._id,req);
    res= await investors.viewMyFees(investor._id);
    await investors.deleteCase(cas._id);
    await investors.deleteInvestor(investor._id);
    
    const name=res[0].companyName;
    const fees=res[0].fees;
    expect(fees).not.toBe(0);
    expect(name).toEqual('DONTD4536ELETE')
}) 