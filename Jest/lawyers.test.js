/**
 * @jest-environment node
 */
const lawyers = require('./lawyers');

const Case = require("../models/Case");
const Investor = require("../models/Investor");
const Lawyer = require("../models/Lawyer");

const db = require("../config/keys").mongoURI;
const mongoose = require("mongoose");

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

test('Add comment as a Lawyer with caseStatus = WaitingForLawyer & he is assigned to the case should add comment', async () => {
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(1);

//** CREATE INVESTOR **//
  const testInvestor = {
    email:"addcommentlawyer_testjest111@gmail.com",
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

//** CREATE LAWYER **//
  const testLawyer = {
    username:"lawyertestjest11",
    password:"12312gg12g12",
    fullName:"Abfvgnggk",
    email:"lawyertestjest11@gmail.com"
  }
  const createdLawyer = await Lawyer.create(testLawyer);

//** CREATE CASE **//
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'companytestjest111',
        companyNameEnglish: 'compamyengtestjest111',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 1000000
    },
    caseStatus: 'WaitingForLawyer',
    creatorInvestorId: createdInvestor._id,
    assignedLawyerId: createdLawyer._id
  }
  const createdCase  = await Case.create(testCase);

//** Comment Body **//
  const req = {
    body: "test jest"
  }

  await lawyers.addCommentAsLawyer(req, createdLawyer._id, createdCase._id);
  const actualCase = await Case.findOne(testCase);
  expect(actualCase.comments[actualCase.comments.length-1].body).toEqual(req.body);
  await Case.deleteOne(testCase);
  await Investor.deleteOne(testInvestor);
  await Lawyer.deleteOne(testLawyer);
});

test('Add comment as a Lawyer with caseStatus = OnUpdate & he is assigned to the case should add comment', async () => {
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(1);

//** CREATE INVESTOR **//
  const testInvestor = {
    email:"addcommentlawyer_testjest11@gmail.com",
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

//** CREATE LAWYER **//
  const testLawyer = {
    username:"lawyertestjest111",
    password:"12312gg12g12",
    fullName:"Abfvgnggk",
    email:"lawyertestjest11@gmail.com"
  }
  const createdLawyer = await Lawyer.create(testLawyer);

//** CREATE CASE **//
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'companytestjest111',
        companyNameEnglish: 'compamyengtestjest111',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 1000000
    },
    caseStatus: 'OnUpdate',
    creatorInvestorId: createdInvestor._id,
    assignedLawyerId: createdLawyer._id
  }
  const createdCase  = await Case.create(testCase);

//** Comment Body **//
  const req = {
    body: "test jest"
  }

  await lawyers.addCommentAsLawyer(req, createdLawyer._id, createdCase._id);
  const actualCase = await Case.findOne(testCase);
  expect(actualCase.comments[actualCase.comments.length-1].body).toEqual(req.body);
  await Case.deleteOne(testCase);
  await Investor.deleteOne(testInvestor);
  await Lawyer.deleteOne(testLawyer);
});