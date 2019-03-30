/**
 * @jest-environment node
 */ 
const lawyers = require('./lawyers');

const Case = require("../models/Case");
const Investor = require("../models/Investor");

const db = require("../config/keys").mongoURI;
const mongoose = require("mongoose");

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

// const testInvestor = {
//   email:"nigabyte@gmail.com",
//   password:"verystrongpassword",
//   fullName:"yolo",
//   type:"f",
//   gender:"Male",
//   nationality:"Egyptian",
//   methodOfIdentification:"National Card",
//   identificationNumber:"55533355555555",
//   dateOfBirth:"1990-12-17T22:00:00.000Z",
//   residenceAddress:"13th Mogama3 el Tahrir",
//   telephoneNumber:"00201009913457",
//   fax:"1234567"
// }
// const createdInvestor  = await Investor.create(testInvestor);
// const testCase = {
//   form: {
//       companyType: 'SPC',
//       regulatedLaw: 'lll',
//       legalFormOfCompany: 'Moes3',
//       companyNameArabic: 'create the case',
//       companyNameEnglish: 'baleez',
//       headOfficeGovernorate: 'Joes3',
//       headOfficeCity: 'Mantas3',
//       headOfficeAddress: 'Shamss3',
//       phoneNumber: '123456789',
//       fax: '987654321',
//       currencyUsedForCapital: 'EGP',
//       capital: 100
//   },
//   caseStatus: 'WaitingForLawyer',
//   creatorInvestorId: createdInvestor.data._id
// }
// const createdCase  = await Case.create(testCase);

// await lawyer.deleteCase(createdCase.data.data._id)
// await lawyer.deleteInvestor(createdInvestor.data._id)

test('Add comment as a Lawyer with caseStatus = WaitingForLawyer & he is assigned to the case', async () => {
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(1);

  const testInvestor = {
    email:"nigabyte1111111@gmail.com",
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
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Moes3',
        companyNameArabic: 'crea1te thg11133ve case',
        companyNameEnglish: 'balvf111111vaeez',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 100
    },
    caseStatus: 'WaitingForLawyer',
    creatorInvestorId: createdInvestor._id
  }
  const createdCase  = await Case.create(testCase);

  const body = {
    body: "test jest"
  }

  const ID = "5c9d0f81af006b31fca3364d";
  await lawyers.addCommentAsLawyer(body,ID,createdCase._id);
  const actualCase = await Case.findOne(testCase);
  expect(actualCase.comments[comments.length-1].body).toEqual(body);
  await Case.deleteOne(testCase);
  await Investor.deleteOne(testInvestor);
});