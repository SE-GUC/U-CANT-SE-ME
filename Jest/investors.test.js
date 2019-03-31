/**
 * @jest-environment node
 */

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

const investors = require("./investors");
const encryption = require("../routes/api/utils/encryption");

//READ
test("Get all investors test", async () => {
  expect.assertions(1);

  //data is the rresponse object from the server
  const res = await investors.readAllInvestors();

  expect(res.status).toBe(200);
});

//CREATE
test("Create an investor initial test", async () => {
  expect.assertions(2);

  //The body of the request
  const body = {
    email: "CreatedHossam1@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  const res = await investors.createInvestor(body);

  const allInvestors = await investors.readAllInvestors();

  await investors.deleteInvestor(res.data._id);

  expect(allInvestors.data).toContainEqual(res.data);

  delete res.data._id;
  delete res.data.__v;

  expect(res.data).toEqual(body);
});

//CREATE
test("Create an investor invalid data test", async () => {
  expect.assertions(1);

  //The body of the request
  const body = {
    email: "CreatedHossam3@gmail.com",
    password: "213",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1231"
  };
  try {
    await investors.createInvestor(body);
    expect(0).toBe(1); //If no status 400 test must fail
  } catch (err) {}
  expect(0).toBe(0); //Else test passes
});

//READ
test("Get an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  const body = {
    email: "readInvestorTest4@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  const res = await investors.createInvestor(body);

  const createdInvestor = await investors.readInvestor(res.data._id);

  await investors.deleteInvestor(res.data._id);

  expect(res.data).toEqual(createdInvestor.data);
});

//READ
test("Get an investor that doesn't exist test", async () => {
  expect.assertions(1);

  try {
    await investors.readInvestor(123);
    expect(0).toBe(1); //If no status 404 or 400 test must fail
  } catch (err) {}
  expect(0).toBe(0); //Else test passes
});

// UPDATE
test("Update an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  let body = {
    email: "hossamelUpdated1@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  //Create the Investor
  let res = await investors.createInvestor(body);

  let createdInvestor = res.data;

  createdInvestor.fullName = "Updated Name";
  createdInvestor.fax = "71234234";

  body = {
    fullName: "Updated Name",
    fax: "71234234"
  };

  //Update the newly created investor and get it
  await investors.updateInvestor(createdInvestor._id, body);

  const { data } = await investors.readInvestor(createdInvestor._id);

  //Delete the newly created investor
  await investors.deleteInvestor(createdInvestor._id);

  //Check if it was updated
  expect(data).toEqual(createdInvestor);
});

//UPDATE
test("Update an investor with invalid data test", async () => {
  expect.assertions(1);

  let body = {
    email: "hossamelUpdated2@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  let res = await investors.createInvestor(body);
  let createdInvestor = res.data;

  body = {
    fullName: "Updated Name",
    fax: "1231"
  };

  try {
    await investors.updateInvestor(123, body);
    await investors.deleteInvestor(createdInvestor._id);
    expect(0).toBe(1); //If no status 400 test must fail
  } catch (err) {}
  await investors.deleteInvestor(createdInvestor._id);
  expect(0).toBe(0); //Else test passes
});

//UPDATE
test("Update an investor that doesn't exist test", async () => {
  expect.assertions(1);

  let body = {
    email: "hossamelUpdated3@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  try {
    await investors.updateInvestor(123, body);
    expect(0).toBe(1); //If no status 404 or 400 test must fail
  } catch (err) {}
  expect(0).toBe(0); //Else test passes
});

//DELETE
test("Delete an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  let body = {
    email: "hossamEldeleted1@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  let res = await investors.createInvestor(body);

  let createdInvestor = res.data;

  await investors.deleteInvestor(createdInvestor._id);

  const { data } = await investors.readAllInvestors();

  expect(data).not.toContain(createdInvestor);
});

//DELETE
test("Delete an investor that doesn't exist test", async () => {
  expect.assertions(1);
  try {
    await investors.readInvestor(123);
    expect(0).toBe(1); //If no status 404 or 400 test must fail
  } catch (err) {}
  expect(0).toBe(0); //Else test passes
});

let createdEmail = "";
let createdPassword = "";
let investorId = "";
let caseId = "";

test("Create All Dependencies", async () => {
  const investor = {
    email: "moe@moe.moe",
    password: "dontusethispassword",
    fullName: "MoeMoeMoe",
    type: "CEO",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1997-12-15T22:00:00.000Z",
    residenceAddress: "Rehab City",
    telephoneNumber: "01007063067",
    fax: "123456789"
  };
  createdInvestor = await investors.registerInvestor(investor);
  createdEmail = createdInvestor.data.data.email;
  createdPassword = investor.password;
  investorId = createdInvestor.data.data._id;
});

test("Registering an investor", async () => {
  const investor = {
    email: "moemoemoe5@faegmail.com",
    password: "12345678fea",
    fullName: "bala ibn bafeala abo",
    type: "cfea",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  expect.assertions(0);
  const registeredInvestor = await investors.registerInvestor(investor);
  await investors.deleteInvestor(registeredInvestor.data.data._id);
  encryption.comparePassword(
    investor.password,
    registeredInvestor.data.data.password,
    function(err, isMatch) {
      if (err) throw err;
      return expect(isMatch).toBeTruthy();
    }
  );
});

test("As an investor I should be able to login", async () => {
  const loginInfo = {
    email: createdEmail,
    password: createdPassword
  };
  const loginResult = await investors.login(loginInfo);
  return expect(loginResult.data.length).toBeGreaterThan(0);
});

test("Delete All Dependencies", async () => {
  await investors.deleteInvestor(investorId);
});

test("As an investor I should be view my fees", async () => {
  expect.assertions(3);
  let req = {
    email: "notificatio3546nTest@gmail.com",
    password: "$2a$10$Ja.2twjd0KSVVyULqh7HCeEtu0aJM9ej9LiK5kth3C0AKMBoREqxC",
    fullName: "Notification Test",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "36987103512311",
    dateOfBirth: "1990-12-14T13:13:13.000Z",
    residenceAddress: "8165th 3emarat el Shamoosa",
    telephoneNumber: "01091867182317",
    fax: "1224567"
  };
  const investor = await investors.createInvestor(req);
  req = {
    form: {
      companyType: "SPC",
      regulatedLaw: "72",
      legalFormOfCompany: "DONTDELETE",
      companyNameArabic: "DONTDE352LETE",
      companyNameEnglish: "DONTD4536ELETE",
      headOfficeGovernorate: "DONTDELETE",
      headOfficeCity: "DONTDELETE",
      headOfficeAddress: "DONTDELETE",
      phoneNumber: "121212122121",
      fax: "1234567",
      currencyUsedForCapital: "DONTDELETE",
      capital: 100
    },
    caseStatus: "WaitingForLawyer",

    creatorInvestorId: investor.data._id
  };
  const cas = await investors.createCase(req);
  let res = await investors.viewMyFees(investor.data._id);

  expect(res).toBe("you do not have any accepted company requests");
  req = {
    form: {
      companyType: "SPC",
      regulatedLaw: "72",
      legalFormOfCompany: "DONTDELETE",
      headOfficeGovernorate: "DONTDELETE",
      headOfficeCity: "DONTDELETE",
      headOfficeAddress: "DONTDELETE",
      phoneNumber: "121212122121",
      fax: "1234567",
      currencyUsedForCapital: "DONTDELETE",
      capital: 100
    },
    caseStatus: "Accepted"
  };
  await investors.changeStatus(cas._id, req);
  res = await investors.viewMyFees(investor.data._id);
  await investors.deleteCase(cas._id);
  await investors.deleteInvestor(investor.data._id);

  const name = res[0].companyName;
  const fees = res[0].fees;
  expect(fees).not.toBe(0);
  expect(name).toEqual("DONTD4536ELETE");
});

//Pay Fees
test("Investor Paying Fees success test", async () => {
  expect.assertions(1);
  const payingInvestorData = {
    email: "richman@gmail.com",
    password: "verystrongpassword",
    fullName: "Thary 3arabi",
    type: "Single",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  let InvestorRes = await investors.createInvestor(payingInvestorData);
  const payingInvestor = InvestorRes.data;

  const acceptedCaseData = {
    form: {
      companyType: "SPC",
      regulatedLaw: "72",
      legalFormOfCompany: "The good Legal Form",
      headOfficeGovernorate: "Cairo",
      headOfficeCity: "Cairo",
      headOfficeAddress: "Share3 Rl Thawra",
      phoneNumber: "121212122121",
      fax: "1234567",
      currencyUsedForCapital: "EGP",
      capital: 100,
      companyNameArabic: "The Arabic Name",
      companyNameEnglish: "The English Name"
    },
    caseStatus: "Accepted",
    creatorLawyerId: null,
    creatorInvestorId: payingInvestor._id
  };

  let caseRes = await httpRequest("POST", "cases", [], acceptedCaseData);

  const acceptedCase = caseRes.data;

  try {
    await investors.payFees(payingInvestor._id, acceptedCase.data._id);
    await investors.deleteInvestor(payingInvestor._id);
    await httpRequest("DELETE", "cases", [acceptedCase.data._id]);
  } catch (err) {
    await investors.deleteInvestor(payingInvestor._id);
    await httpRequest("DELETE", "cases", [acceptedCase.data._id]);
    expect(0).toBe(1); //If error test fails
  }

  expect(0).toBe(0); //Else test passes
});

//Pay Fees
test("Investor Paying Fees not Accepted Company test", async () => {
  expect.assertions(1);

  const payingInvestorData = {
    email: "richman2@gmail.com",
    password: "verystrongpassword",
    fullName: "Thary 3arabi",
    type: "Single",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  let InvestorRes = await investors.createInvestor(payingInvestorData);
  const payingInvestor = InvestorRes.data;

  const acceptedCaseData = {
    form: {
      companyType: "SPC",
      regulatedLaw: "72",
      legalFormOfCompany: "The good Legal Form",
      headOfficeGovernorate: "Cairo",
      headOfficeCity: "Cairo",
      headOfficeAddress: "Share3 Rl Thawra",
      phoneNumber: "121212122121",
      fax: "1234567",
      currencyUsedForCapital: "EGP",
      capital: 100,
      companyNameArabic: "The Arabic Name 2",
      companyNameEnglish: "The English Name 2"
    },
    caseStatus: "Rejected",
    creatorLawyerId: null,
    creatorInvestorId: payingInvestor._id
  };

  let caseRes = await httpRequest("POST", "cases", [], acceptedCaseData);

  const acceptedCase = caseRes.data;

  try {
    await investors.payFees(payingInvestor._id, acceptedCase.data._id);
    await investors.deleteInvestor(payingInvestor._id);
    await httpRequest("DELETE", "cases", [acceptedCase.data._id]);
    expect(0).toBe(1); //If no Error test fails
  } catch (err) {
    await investors.deleteInvestor(payingInvestor._id);
    await httpRequest("DELETE", "cases", [acceptedCase.data._id]);
    expect(0).toBe(0); //If error test Passes
  }
});

//Pay Fees
test("Investor Paying Fees Not Owner of the Company", async () => {
  expect.assertions(1);

  const caseOwnerInvestorData = {
    email: "realrichman@gmail.com",
    password: "verystrongpassword",
    fullName: "Thary 3arabi",
    type: "Single",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  let ownerRes = await investors.createInvestor(caseOwnerInvestorData);
  const ownerInvestor = ownerRes.data;

  const payingInvestorData = {
    email: "richman3@gmail.com",
    password: "verystrongpassword",
    fullName: "Thary 3arabi",
    type: "Single",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  let InvestorRes = await investors.createInvestor(payingInvestorData);
  const payingInvestor = InvestorRes.data;

  const acceptedCaseData = {
    form: {
      companyType: "SPC",
      regulatedLaw: "72",
      legalFormOfCompany: "The good Legal Form",
      headOfficeGovernorate: "Cairo",
      headOfficeCity: "Cairo",
      headOfficeAddress: "Share3 Rl Thawra",
      phoneNumber: "121212122121",
      fax: "1234567",
      currencyUsedForCapital: "EGP",
      capital: 100,
      companyNameArabic: "The Arabic Name 3",
      companyNameEnglish: "The English Name 3"
    },
    caseStatus: "Accepted",
    creatorLawyerId: null,
    creatorInvestorId: ownerInvestor._id
  };

  let caseRes = await httpRequest("POST", "cases", [], acceptedCaseData);

  const acceptedCase = caseRes.data;

  try {
    await investors.payFees(payingInvestor._id, acceptedCase.data._id);
    await investors.deleteInvestor(ownerInvestor._id);
    await investors.deleteInvestor(payingInvestor._id);
    await httpRequest("DELETE", "cases", [acceptedCase.data._id]);
    expect(0).toBe(1); //If no Error test fails
  } catch (err) {
    await investors.deleteInvestor(ownerInvestor._id);
    await investors.deleteInvestor(payingInvestor._id);
    await httpRequest("DELETE", "cases", [acceptedCase.data._id]);
    expect(0).toBe(0); //If error test Passes
  }
});
//
//Pay Fees
test("Investor Paying Fees invalid case ID", async () => {
  expect.assertions(1);

  const payingInvestorData = {
    email: "richman4@gmail.com",
    password: "verystrongpassword",
    fullName: "Thary 3arabi",
    type: "Single",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  let InvestorRes = await investors.createInvestor(payingInvestorData);
  const payingInvestor = InvestorRes.data;

  try {
    await investors.payFees(payingInvestor._id, "123123123");
    await investors.deleteInvestor(payingInvestor._id);
    expect(0).toBe(1); //If no Error test fails
  } catch (err) {
    await investors.deleteInvestor(payingInvestor._id);
    expect(0).toBe(0); //If error test Passes
  }
});

//Pay Fees
test("Investor Paying Fees invalid investor ID", async () => {
  expect.assertions(1);

  const payingInvestorData = {
    email: "richman5@gmail.com",
    password: "verystrongpassword",
    fullName: "Thary 3arabi",
    type: "Single",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  let InvestorRes = await investors.createInvestor(payingInvestorData);
  const payingInvestor = InvestorRes.data;

  const acceptedCaseData = {
    form: {
      companyType: "SPC",
      regulatedLaw: "72",
      legalFormOfCompany: "The good Legal Form",
      headOfficeGovernorate: "Cairo",
      headOfficeCity: "Cairo",
      headOfficeAddress: "Share3 Rl Thawra",
      phoneNumber: "121212122121",
      fax: "1234567",
      currencyUsedForCapital: "EGP",
      capital: 100,
      companyNameArabic: "The Arabic Name 2",
      companyNameEnglish: "The English Name 2"
    },
    caseStatus: "Rejected",
    creatorLawyerId: null,
    creatorInvestorId: payingInvestor._id
  };

  let caseRes = await httpRequest("POST", "cases", [], acceptedCaseData);

  const acceptedCase = caseRes.data;

  try {
    await investors.payFees("12345", acceptedCase.data._id);
    await investors.deleteInvestor(payingInvestor._id);
    await httpRequest("DELETE", "cases", [acceptedCase.data._id]);
    expect(0).toBe(1); //If no Error test fails
  } catch (err) {
    await investors.deleteInvestor(payingInvestor._id);
    await httpRequest("DELETE", "cases", [acceptedCase.data._id]);
    expect(0).toBe(0); //If error test Passes
  }
});

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
test('As an investor I should create cases', async()=>{
  expect.assertions(2);
 console.log("her1")
    const investorInfo ={
        "email": "ddddddddddddd@gmail.com",
        "password" : "12345678",
        "fullName" : "Abc Ibn Xyz",
        "type" : "a",
        "gender" : "Female",
        "nationality" : "Egyptian",
        "methodOfIdentification" : "National Card",
        "identificationNumber" : "12233344445555",
        "dateOfBirth" : "1990-12-17T22:00:00.000Z",
        "residenceAddress" : "13th Mogama3 el Tahrir",
        "telephoneNumber" : "00201009913457",
        "fax" : "1234567" };
        console.log("her2")
    const createdInvestor = await investors.createInvestor(investorInfo);
    console.log("her3")
    const caseInfo ={

        "form": {
            "companyType": "SPC",
            "regulatedLaw": "72",
            "legalFormOfCompany": "DONTDELETE",
            "companyNameArabic": "dsdsadaddsddddxc,xzmcxz",
            "companyNameEnglish": "ddddddddddddddddddddddd",
            "headOfficeGovernorate": "DONTDELETE",
            "headOfficeCity": "DONTDELETE",
            "headOfficeAddress": "DONTDELETE",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "DONTDELETE",
            "capital": 100
        },
        "caseStatus": "WaitingForLawyer",
        "creatorInvestorId": createdInvestor.data._id
    }
    console.log(createdInvestor.data._id)
    console.log("-----------------")
    console.log(createdInvestor._id)
    const invCreateCase = await investors.invCreateCase(createdInvestor.data._id,caseInfo);
    console.log("her5")
    expect(invCreateCase.data.data.form.companyNameEnglish).toBe(caseInfo.form.companyNameEnglish);
    console.log("her6")
    expect(invCreateCase.data.data.form.companyNameArabic).toBe(caseInfo.form.companyNameArabic);
    console.log("her7")
    await investors.deleteCase(invCreateCase.data.data._id);
    await investors.deleteInvestor(createdInvestor.data._id);
    }); 


/**
 * @param method The HTTP method used
 * @param urlSuffix The suffix of url e.g investors, cases, etc...
 * @param params  The parameters of the request URL given in order.
 * @param body The body of the HTTP request.
 * @return Returns the complete URL for the request.
 */

async function httpRequest(method, urlSuffix, params = [], body = {}) {
  let url = "http://localhost:3000/api/" + urlSuffix + "/";
  for (let i = 0; i < params.length; i++) url += params[i] + "/";
  if (method === "GET") return await axios.get(url);
  else if (method === "POST") return await axios.post(url, body);
  else if (method === "PUT") return await axios.put(url, body);
  else if (method === "DELETE") return await axios.delete(url);
  return {};
}

test('trackMyCompany', async () => {
  expect.assertions(1)

  const bodyInvestor= {
    "email": "16ddasdsfbsddfecwaseed@gmail.com",
    "password" : "161ssddas2de3ffedssd4f5678",
    "fullName" : "16Abcsdasdsedf essIcsdfbn Xyz",
    "type" : "a",
    "gender" : "Male",
    "nationality" : "Egyptian",
    "methodOfIdentification" : "National Card",
    "identificationNumber" : "12233344445555",
    "dateOfBirth" : "1990-12-17T22:00:00.000Z",
    "residenceAddress" : "13th Mogama3 el Tahrir",
    "telephoneNumber" : "00201009913457",
    "fax" : "1234567" 
    }
  
  const createdInvesotr = await investors.createInvestor2(bodyInvestor);   

 const body= {
      "form": {
          "companyType": "SPC",
          "regulatedLaw": "lll",
          "legalFormOfCompany": "vqdasegesdsdvfqdssmcesdsdv",
          "companyNameArabic": "1qevqeashegfssddedsfsddfdedkddscsdtsgdsdvqdvq",
          "companyNameEnglish": "1qdveehasfgdqssdddddddssdekcfdddsstgddddvsssqdvqdv",
          "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
          "headOfficeCity": "asasdastgsdsdsdsdd",
          "headOfficeAddress": "qwdvqdvqwdvqwdv",
          "phoneNumber": "121212122121",
          "fax": "1234567",
          "currencyUsedForCapital": "qdvqedvqdvqdv",
          "capital": 100
      },
      "caseStatus": "WaitingForLawyer",
      
      "creatorInvestorId": createdInvesotr.data['_id']
      
  }
  
  const createdCase = await investors.createCase2(body);    
  
  const createdCaseId = createdCase.data.data['_id']
  const createdCaseStatus = createdCase.data.data['caseStatus']
  const trackMyCompanyResult = await investors.trackMyCompany(createdInvesotr.data['_id']);  


  await investors.deleteInvestor2(createdInvesotr.data['_id']);    
 
  await investors.deleteCase2(createdCase.data.data._id);  
 
  return expect(trackMyCompanyResult.data).toEqual({ tracking: [ { company: ' Your company undefined is currently in phase WaitingForLawyer ' } ] });
  


})

