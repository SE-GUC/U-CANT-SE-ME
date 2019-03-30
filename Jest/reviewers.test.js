const reviewers = require('./reviewers');
const investors = require('./investors');

const Reviewer = require("../models/Reviewer");
const Case = require("../models/Case");

const db = require("../config/keys").mongoURI;
const mongoose = require("mongoose");

const testInvestor = {
  email:"nigabytee@gmail.com",
  password:"verystrongpassword",
  fullName:"yolo",
  type:"f",
  gender:"Male",
  nationality:"Egyptian",
  methodOfIdentification:"National Card",
  identificationNumber:"55533355455555",
  dateOfBirth:"1990-12-17T22:00:00.000Z",
  residenceAddress:"13th Mogama3 el Tahrir",
  telephoneNumber:"00201009913457",
  fax:"1234567"
}
const createdInvestor  = await lawyers.createInvestor(testInvestor);
const testCase = {
  form: {
      companyType: 'SPC',
      regulatedLaw: 'lll',
      legalFormOfCompany: 'Moes3',
      companyNameArabic: 'create the casee',
      companyNameEnglish: 'baleezz',
      headOfficeGovernorate: 'Joes3',
      headOfficeCity: 'Mantas3',
      headOfficeAddress: 'Shamss3',
      phoneNumber: '123456789',
      fax: '987654321',
      currencyUsedForCapital: 'EGP',
      capital: 100
  },
  caseStatus: 'WaitingForReviewer',
  creatorInvestorId: createdInvestor.data._id
}
const createdCase  = await lawyer.createCase(testCase);

// await lawyer.deleteCase(createdCase.data.data._id)
// await lawyer.deleteInvestor(createdInvestor.data._id)

test('Add comment as a Reviewer with caseStatus = WaitingForReviewer', async () => {
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(1);

  const body = {
    body: "test jest"
  }

  await reviewers.addCommentAsReviewer(body,REVIEWERIDD_OF_CRUD_JEST,createdCase.data._id);
  const actualCase = await Case.findOne(testCase);
  expect(actualCase.comments[comments.length-1].body).toEqual(body);
});