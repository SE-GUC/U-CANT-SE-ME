/**
 * @jest-environment node
 */

const investors = require('./investors')

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

test('As an investor I should be able to login', async() => {
    const loginInfo = {
        email: 'scrummaster@gmail.com',
        password: '12345678fea'
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