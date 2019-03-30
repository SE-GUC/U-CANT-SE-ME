/**
 * @jest-environment node
 */
const reviewers = require('./reviewers');

const Case = require("../models/Case");
const Investor = require("../models/Investor");
const Reviewer = require("../models/Reviewer");

const db = require("../config/keys").mongoURI;
const mongoose = require("mongoose");

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

test('Add comment as a Reviewer with caseStatus = WaitingForReviewer & he is assigned to the case should add comment', async () => {
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(1);

//** CREATE INVESTOR **//
  const testInvestor = {
    email:"niss@gmhail.com",
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
  //const createdInvestor  = await Investor.create(testInvestor);
  const createdInvestor = await reviewers.createInvestor(testInvestor);

//** CREATE REVIEWER **//
  const testReviewer = {
    username:"Abdgsbfdc",
    password:"12312gg12g12",
    fullName:"Abfvgnggk",
    email:"A@ggdnfdk"
  }
  //const createdReviewer = await Reviewer.create(testReviewer);
  const createdReviewer = await reviewers.createReviewer(testReviewer);

//** CREATE CASE **//
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'gsghfhfgefe',
        companyNameEnglish: 'bssgfnghflsz',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 1000000
    },
    caseStatus: 'WaitingForLawyer',
    creatorInvestorId: createdInvestor.data._id,
    assignedReviewerId: createdReviewer.data.data._id
  }
  //const createdCase  = await Case.create(testCase);
  const createdCase = await reviewers.createCase(testCase);

//** Comment Body **//
  const body = {
    body: "test jest"
  }
  console.log(createdReviewer.data.data._id);
  console.log(createdInvestor.data._id);
  console.log(createdCase.data.data._id);
  await reviewers.addCommentAsReviewer(body, createdReviewer.data.data._id, createdCase.data.data._id);
  const actualCase = await Case.findOne(testCase);
  expect(actualCase.comments[comments.length-1].body).toEqual(body);
  await Case.deleteOne(testCase);
  await Investor.deleteOne(testInvestor);
});