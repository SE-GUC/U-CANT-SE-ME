/**
* @jest-environment node
*/

const lawyers = require('./lawyers')
//const cases = require('./cases')
const Case = require("../models/Case");
const Lawyer = require("../models/Lawyer");
const Investor = require("../models/Investor");
let caseID = ''

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const nock = require('nock')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
ObjectId = require('mongodb').ObjectID;
const mongoose = require("mongoose");
jest.setTimeout(50000)
const db = require("../config/keys").mongoURI;

test("As a lawyer i should be able to see all unsigned cases", async () => {
  // expect.assertions(1);
  //create new lawyer
  const lawyer = {
    email: "yaya.gamed465580@gmail.com", //unique
    password: "yayayayayyaya",
    fullName: "mantaisreal",
    username: "yaya565656gamed80" //unique
  };

  const createdLawyer = await lawyers.createLawyer(lawyer);
  const lawyerId = createdLawyer.data.data["_id"];
  const allcases = await lawyers.getAllCases();
  const cases = [];
  for (i = 0; i < allcases.data.data.length; i++) {
    if (allcases.data.data[i]["caseStatus"] == "WaitingForLawyer") {
      cases.push(allcases.data.data[i]);
    }
  }
  const response = await lawyers.getWaitingForLawyerCase(lawyerId);
  for (i = 0; i < cases.length; i++) {
    expect(response.data[i]["_id"]).toEqual(cases[i]["_id"]);
  }
  await lawyers.deleteLawyer(lawyerId);
});

test("As a lawyer i should be able to select a specific case", async () => {
  // expect.assertions(1);
  //create new lawyer
  const lawyer = {
    email: "yaya45345657_new80@gmail.com", //unique
    password: "yayayayayyaya",
    fullName: "mantaisreal",
    username: "yaya4556763_new80" //unique
  };
  const createdLawyer = await lawyers.createLawyer(lawyer);
  const lawyerId = createdLawyer.data.data["_id"];
  //create new case
  const investor = {
    email: "yahiabasha4545345yakalb80@gmail.com", //unique
    password: "verystrongpassword",
    fullName: "randomnametest",
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
  const createdInvestor = await lawyers.createInvestor(investor);
  const mycase = {
    form: {
      companyType: "SPC",
      regulatedLaw: "lll",
      legalFormOfCompany: "Moes3",
      companyNameArabic: "yayafo3545rbeauty80", //unique
      companyNameEnglish: "yayaf4567orbeuty80", //unique
      headOfficeGovernorate: "Joes3",
      headOfficeCity: "Mantas3",
      headOfficeAddress: "Shamss3",
      phoneNumber: "123456789",
      fax: "987654321",
      currencyUsedForCapital: "EGP",
      capital: 100
    },
    caseStatus: "WaitingForLawyer",
    creatorInvestorId: createdInvestor.data._id
  };
  const createdCase = await lawyers.createCase(mycase);
  const caseId = createdCase.data.data["_id"];
  //testing it-self
  //case Before assigning
  const before = await lawyers.getCase(caseId);
  expect(before.data.data["_id"]).toEqual(caseId);
  expect(before.data.data["caseStatus"]).toEqual("WaitingForLawyer");

  const response = await lawyers.getSpecificWaitingForLawyerCase(
    lawyerId,
    caseId
  );
  expect(response.data["_id"]).toEqual(caseId);
  expect(response.data["caseStatus"]).toEqual("AssignedToLawyer");
  expect(response.data["assignedLawyerId"]).toEqual(lawyerId);
  // case After assigning
  const after = await lawyers.getCase(caseId);
  expect(after.data.data["_id"]).toEqual(caseId);
  expect(after.data.data["caseStatus"]).toEqual("AssignedToLawyer");
  expect(after.data.data["assignedLawyerId"]).toEqual(lawyerId);

  //delete case and investor
  await lawyers.deleteCase(createdCase.data.data._id);
  await lawyers.deleteInvestor(createdInvestor.data._id);
  await lawyers.deleteLawyer(lawyerId);
});

let createdEmail = "";
let createdPassword = "";
let investorId = "";
let caseId = "";
let registeredReviewer = "";

test("Create All Dependencies", async () => {
  jest.setTimeout(50000);
  const investor = {
    email: "Mw4tb4t4b456578tvrvw@gmail.com",
    password: "vehaetb4b4tb3rfbdssword",
    fullName: "ma3vtb4tb4bt4tbcweeers",
    type: "aetb",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir wara masna3 el karasy",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  const createdInvestor = await lawyers.createInvestor(investor);
  investorId = createdInvestor.data._id;

  const lawyer = {
    username: "Mefgbr4bt445567bfegb",
    password: "krefebtbceg",
    fullName: "Mbdefbebttbcweevymo",
    email: "m5g3tb3t4556574bf77e@noHomo.com"
  };
  registeredLawyer = await lawyers.createLawyer(lawyer);
  const mycase = {
    form: {
      companyType: "SPC",
      regulatedLaw: "lll",
      legalFormOfCompany: "NonProfitMan",
      companyNameArabic: "ma0db3t4563bt3tbetbi",
      companyNameEnglish: "ma436nb3tb3tbedvzadcbtbebeby",
      headOfficeGovernorate: "California",
      headOfficeCity: "San Francisco",
      headOfficeAddress: "123st.",
      phoneNumber: "01007063067",
      fax: "987654321",
      currencyUsedForCapital: "EGP",
      capital: 100
    },
    caseStatus: "AssignedToLawyer",
    creatorInvestorId: investorId,
    assignedLawyerId: registeredLawyer.data.data._id
  };

  const createdCase = await lawyers.createCase(mycase);
  caseId = createdCase.data.data._id;
});

test("Viewing Tasks of Reviewer", async () => {
  jest.setTimeout(50000);

  let task = await lawyers.viewTasks(registeredLawyer.data.data._id);
  const returnedTaskOf_0_ID = task.data.Tasks[0]._id;
  expect(returnedTaskOf_0_ID).toEqual(caseId);
  await lawyers.deleteInvestor(investorId);
  await lawyers.deleteCase(caseId);
  await lawyers.deleteLawyer(registeredLawyer.data.data._id);
});

test("get last lawyer worked on a case", async () => {
  expect.assertions(1);
  bodyLawyer = {
    username: "3ahmefefdfyvosdfsdussesf9d8f6",
    password: "3ahmefefdeflvassdfdzzou6fd",
    fullName: "7youssef mohamed joez",
    email: "7yousseff98f6fsfvdd@gmail.com"
  };
  const lawyer = await lawyers.createLawyer(bodyLawyer);
  const lawyerId = lawyer.data.data["_id"];

  const bodyInvestor = {
    email: "30ddyafsbfdsdssdfdvcf@gmail.com",
    password: "3161f23ffssdfsddsvf4df567y",
    fullName: "316Afhbcffs sdsdssvfIcdfbn Xyz",
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

  const createdInvestor = await lawyers.createInvestor(bodyInvestor);


  const body = {
    form: {
      companyType: "SPC",
      regulatedLaw: "lll",
      legalFormOfCompany: "41vqdgsvsdfqdssmcesdv",
      companyNameArabic: "41qevqhgsdfsdedfccdsvfffdffsdedkddscsfdtsgdsdvqdvq",
      companyNameEnglish:
        "41qdvhdfsdfgsddcqdddvdfdfseskcfdddfsstgddddvsssqdvqdv",
      headOfficeGovernorate: "qdvsfqdmvqsdvtgqdv",
      headOfficeCity: "asasdastgsdsddsdsdd",
      headOfficeAddress: "qwdvqdvqwdvqwdv",
      phoneNumber: "121212122121",
      fax: "1234567",
      currencyUsedForCapital: "qdvqedvqdvqdv",
      capital: 100
    },
    caseStatus: "Rejected",
    assignedLawyerId: lawyerId,
    creatorInvestorId: createdInvestor.data["_id"]
  };

  const createdCase = await lawyers.createCase(body);

  const lastLawyer = await lawyers.getLastLawyer(createdCase.data.data._id);
 

  await lawyers.deleteCase(createdCase.data.data._id);
  await lawyers.deleteLawyer(lawyerId);
  await lawyers.deleteInvestor(createdInvestor.data["_id"]);
  expect(lastLawyer.data).toEqual({ lawyerName: "7youssef mohamed joez" });
});

test("create a lawyer", async () => {
  expect.assertions(5);
  let body = {
    email: "fares@gmail.com0",
    password: "fareswa7dbs0",
    fullName: "faresdiaaaelnile0",
    username: "fareo0870"
  };

  const createLawyer = await lawyers.createLawyer(body);
  const getAllLawyers = await lawyers.getLawyers();
  const info = createLawyer.data.data;

  expect(info.fullName).toBe(body.fullName);
  expect(info.password).toBe(body.password);
  expect(info.username).toBe(body.username);
  expect(info.email).toBe(body.email);
  expect(getAllLawyers.data.data).toContainEqual(info);
  await lawyers.deleteLawyer(info._id);
});

test("delete a lawyer ", async () => {
  jest.setTimeout(10000);
  expect.assertions(2);
  let body = {
    email: "fares@gmail.com1",
    password: "fareswa7dbs1",
    fullName: "faresdiaaaelnile1",
    username: "fareo0871"
  };
  const createLawyer = await lawyers.createLawyer(body);
  const info = createLawyer.data.data;
  const getLawyersAfterCreate = await lawyers.getLawyers();
  expect(getLawyersAfterCreate.data.data).toContainEqual(info);
  const deleteLawyer = await lawyers.deleteLawyer(info._id);
  const getLawyerAfterDelete = await lawyers.getLawyers();
  expect(getLawyerAfterDelete.data.data).not.toContainEqual(info);
});

test("testing updateLawyer", async () => {
  expect.assertions(2);
  let body = {
    email: "fares@gmail.com2",
    password: "fareswa7dbs2",
    fullName: "faresdiaaaelnile2",
    username: "fareo0872"
  };
  const newLawyer = await lawyers.createLawyer(body);
  const id = newLawyer.data.data._id;
  let bodyForUpdate = {
    email: "bsdob132dosb72od@1gg7120",
    password: "bobob732ob2ob.1c7o0ms12s"
  };
  const updateLawyer = await lawyers.updateLawyer(id, bodyForUpdate);
  const getLawyerAfterUpdate = await lawyers.getOneLawyer(id);
  expect(String(getLawyerAfterUpdate.data.email)).toBe(bodyForUpdate.email);
  expect(getLawyerAfterUpdate.data.password).not.toBe(
    newLawyer.data.data.password
  );
  const deleteLawyer = await lawyers.deleteLawyer(id);
});

test("testing get One Lawyer ", async () => {
  expect.assertions(5);
  let body = {
    email: "fares@gmail.com3",
    password: "fareswa7dbs3",
    fullName: "faresdiaaaelnile3",
    username: "fareo0873"
  };

  const createLawyer = await lawyers.createLawyer(body);
  const id = createLawyer.data.data._id;
  const getLawyerAfterCreate = await lawyers.getOneLawyer(id);
  const g = { _id: id, __v: 0 };
  var obj = Object.assign(body, g);
  expect(getLawyerAfterCreate.data).toEqual(obj);
  expect(getLawyerAfterCreate.data.email).toBe(body.email);
  expect(getLawyerAfterCreate.data.password).toBe(body.password);
  expect(getLawyerAfterCreate.data.fullName).toBe(String(body.fullName));
  expect(getLawyerAfterCreate.data.username).toBe(String(body.username));
  const deletedLawyer = await lawyers.deleteLawyer(id);
});

test("testing getAllLawyers", async () => {
  expect.assertions(2);
  let body = {
    email: "fares@gmail.com4",
    password: "fareswa7dbs4",
    fullName: "faresdiaaaelnile4",
    username: "fareo0874"
  };
  const createLawyer = await lawyers.createLawyer(body);
  const getAllLawyers = await lawyers.getLawyers();
  expect(getAllLawyers.data.data).toContainEqual(createLawyer.data.data);
  expect(getAllLawyers.data.data.length).not.toBe(0);
  await lawyers.deleteLawyer(createLawyer.data.data._id);
});
test('testing lawyer Get All Cases',async()=>{
  expect.assertions(1);
  let investorBody= {
    "email": "yehaihiahiahiahdasd211122iaha@gmail.com",
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
    "fax" : "1234567" 
  };
  const investorCreated= await lawyers.createInvestor(investorBody);
  let form ={
        
    "form": {
        "companyType": "SPC",
        "regulatedLaw": "712",
        "legalFormOfCompany": "DON312321TDELETE",
        "companyNameArabic": "ahm1ass213e3213123dy321323yehia1112312ouwss,xzmcxz",
        "companyNameEnglish": "ah1m3123eadyehia3111321231223do112312ndo",
        "headOfficeGovernorate": "DONTDELETE",
        "headOfficeCity": "DONTDELETE",
        "headOfficeAddress": "DONT312312DELETE",
        "phoneNumber": "121212122121",
        "fax": "1234567",
        "currencyUsedForCapital": "DO3123NTDELETE",
        "capital": 100
    },
    "caseStatus": "WaitingForLawyer",
      "creatorInvestorId": investorCreated.data._id
};

const caseCreated= await lawyers.createCase(form);
 const allCases= await lawyers.getAllCasesLawyer();

 expect(allCases.data.data.length).not.toBe(0);
 await lawyers.deleteCase(caseCreated.data.data._id);
 await lawyers.deleteInvestor(investorCreated.data._id);
});

test('Change Status', async () => {
    const investor = {
    email:"shamsTesting23452345234@gmail.com",
    password:"verystrongpassword",
    fullName:"randomnametest",
    type:"a",
    gender:"Male",
    nationality:"Egyptian",
    methodOfIdentification:"National Card",
    identificationNumber:"12233344445555",
    dateOfBirth:"1990-12-17T22:00:00.000Z",
    residenceAddress:"13th Mogama3 el Tahrir",
    telephoneNumber:"00201009913457",
    fax:"1234567"
}
const createdInvestor  = await lawyers.createInvestor(investor)
const mycase =  {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Moes3',
        companyNameArabic: 'shamstest256457',
        companyNameEnglish: 'bardotest23452',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 100
    },
    caseStatus: 'WaitingForLawyer',
    creatorInvestorId: createdInvestor.data._id
}
    const createdCase  = await lawyers.createCase(mycase)

    //Start of tests
    const caseID=createdCase.data.data._id
    const caseOnUpdate=await lawyers.changeStatus(caseID,'OnUpdate')
    expect(caseOnUpdate.data.caseStatus).toBe('OnUpdate')

    const caseWaitingForLawyer=await lawyers.changeStatus(caseID,'WaitingForLawyer')
    expect(caseWaitingForLawyer.data.caseStatus).toBe('WaitingForLawyer')

    const caseAssginedToLawyer=await lawyers.changeStatus(caseID,'AssginedToLawyer')
    expect(caseAssginedToLawyer.data.caseStatus).toBe('AssginedToLawyer')

    const caseWaitingForReviewer=await lawyers.changeStatus(caseID,'WaitingForReviewer')
    expect(caseWaitingForReviewer.data.caseStatus).toBe('WaitingForReviewer')

    const caseToReviewer=await lawyers.changeStatus(caseID,'AssginedToReviewer')
    expect(caseToReviewer.data.caseStatus).toBe('AssginedToReviewer')
    
    try{
        const caseTest=await lawyers.changeStatus(caseID,'habd')
    }catch(err)
    {
       
    }
    const caseTest=await lawyers.getCase(caseID)
    expect(caseTest.data.caseStatus).not.toBe('habd')
    
    await lawyers.deleteCase(createdCase.data.data._id)
    await lawyers.deleteInvestor(createdInvestor.data._id)
})

test('Add comment as a Lawyer with caseStatus = WaitingForLawyer & he is assigned to the case should add comment', async () => {
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(1);

//** CREATE INVESTOR **//
  const testInvestor = {
    email:"addcommentlawyer_testjsest111@gmail.com",
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
    username:"lawyertestjsest11",
    password:"12312gg12g12",
    fullName:"Abfvgnggk",
    email:"lawyertestjesst11@gmail.com"
  }
  const createdLawyer = await Lawyer.create(testLawyer);

//** CREATE CASE **//
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'companytestjsest111',
        companyNameEnglish: 'compamyengtesstjest111',
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
    email:"addcommentlawyer_testjessst11@gmail.com",
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
    username:"lawyertessstjest111",
    password:"12312gg12g12",
    fullName:"Abfvgnggk",
    email:"lawyertestjessst11@gmail.com"
  }
  const createdLawyer = await Lawyer.create(testLawyer);

//** CREATE CASE **//
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'companytssestjest111',
        companyNameEnglish: 'compamyessngtestjest111',
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

test ('lawyer get his cases sorted by id',async() =>{
  const lawyer = {
      username: "scrscssern",
      password: "xyzasdfghdfghhjhhbb",
      fullName: "johnhahbsfasfsa1 samir",
      email: "Modscsed2@gmail.com"
  }
  const createdLawyer = await lawyers.createLawyer(lawyer)
  const lawId = await createdLawyer.data.data._id
  const investor = {
      email:"shamssscsTddvecdcsjgfgjstfi7656@gmail.com",
      password:"verystrongpassword",
      fullName:"randomnametest",
      type:"a",
      gender:"Male",
      nationality:"Egyptian",
      methodOfIdentification:"National Card",
      identificationNumber:"12233344445555",
      dateOfBirth:"1990-12-17T22:00:00.000Z",
      residenceAddress:"13th Mogama3 el Tahrir",
      telephoneNumber:"00201009913457",
      fax:"1234567"
  }
  const createdInvestor  = await lawyers.createInvestor(investor)
  const invId = await createdInvestor.data._id
  const mycase1 =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'Fadiscfssdsc3e1dscf3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'Ronsifsccdsdefdfcgyshdcs31389ddd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId,
      assignedLawyerId: lawId
  }
  const mycase2 =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'Fa2difscssdsc3e1dscf3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'Ro2nsfisccdsdefdfcgyshdcs31389ddd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId,
      assignedLawyerId: lawId
  }
  const createdCase1 = await lawyers.createCase(mycase1)
  const createdCase2 = await lawyers.createCase(mycase2)
mongoose
.connect(db)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
  expect.assertions(0)
  const hisCases = await lawyers.getMyCasesSortedById(lawId)
  const hisActualCases = await Case.find({"assignedLawyerId": lawId}).sort({_id: 1})
  for(let i =0 ; i<hisCases.length ; i++){
      expect(hisCases[i].data.data.form).toEqual(hisActualCases[i].data.data.form) 
      && expect(hisCases[i].data.data.caseStatus).toEqual(hisActualCases[i].data.data.caseStatus) 
      && expect(hisCases[i].data.data.assignedLawyerId).toEqual(hisActualCases[i].data.data.assignedLawyerId) 
      && expect(hisCases[i].data.data.assignedReviewerId).toEqual(hisActualCases[i].data.data.assignedReviewerId)
      && expect(hisCases[i].data.data.creatorassignedLawyerId).toEqual(lawId) 
  }
  mongoose.disconnect(db)
  await lawyers.deleteCase(createdCase1.data.data['_id'])
  await lawyers.deleteCase(createdCase2.data.data['_id'])
  await lawyers.deleteInvestor(createdInvestor.data._id)
  await lawyers.deleteLawyer(createdLawyer.data.data._id)
  })

test ('lawyer get his cases sorted by date of creation',async() =>{
  const lawyer = {
      username: "scrddsssern",
      password: "xyzasdfghdfghhjhhbb",
      fullName: "johnhahbsfasfsa1 samir",
      email: "Modddssed2@gmail.com"
  }
  const createdLawyer = await lawyers.createLawyer(lawyer)
  const lawId = await createdLawyer.data.data._id
  const investor = {
      email:"shamssdssdTddvecdcsjgfgjstfi7656@gmail.com",
      password:"verystrongpassword",
      fullName:"randomnametest",
      type:"a",
      gender:"Male",
      nationality:"Egyptian",
      methodOfIdentification:"National Card",
      identificationNumber:"12233344445555",
      dateOfBirth:"1990-12-17T22:00:00.000Z",
      residenceAddress:"13th Mogama3 el Tahrir",
      telephoneNumber:"00201009913457",
      fax:"1234567"
  }
  const createdInvestor  = await lawyers.createInvestor(investor)
  const invId = await createdInvestor.data._id
  const mycase1 =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'Fadiscssdsdc3de1dscfd3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'Ronsisccddsddefdfcgydshdcs31389ddd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId,
      assignedLawyerId: lawId
  }
  const mycase2 =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'Fa2discssdscd3e1dsdcf3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'Ro2nsisccdsdefddfcgyshdcs31d389ddd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId,
      assignedLawyerId: lawId
  }
  const createdCase1 = await lawyers.createCase(mycase1)
  const createdCase2 = await lawyers.createCase(mycase2)
mongoose
.connect(db)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
expect.assertions(0)
const hisCases = await lawyers.getMyCasesSortedByDate(lawId)
const hisActualCases = await Case.find({"assignedLawyerId": lawId}).sort({caseCreationDate: 1})
for(let i =0 ; i<hisCases.length ; i++){
    expect(hisCases[i].data.data.form).toEqual(hisActualCases[i].data.data.form) 
    && expect(hisCases[i].data.data.caseStatus).toEqual(hisActualCases[i].data.data.caseStatus) 
    && expect(hisCases[i].data.data.assignedLawyerId).toEqual(hisActualCases[i].data.data.assignedLawyerId) 
    && expect(hisCases[i].data.data.assignedReviewerId).toEqual(hisActualCases[i].data.data.assignedReviewerId)
    && expect(hisCases[i].data.data.creatorassignedLawyerId).toEqual(lawId) 
}
mongoose.disconnect(db)
await lawyers.deleteCase(createdCase1.data.data['_id'])
await lawyers.deleteCase(createdCase2.data.data['_id'])
await lawyers.deleteInvestor(createdInvestor.data._id)
await lawyers.deleteLawyer(createdLawyer.data.data._id)
})


test('lawyer fill form', async() => {
  const lawyer = {
      username: "scrsssssdserrrn",
      password: "xyzasdfghdfghhjhhbb",
      fullName: "johnhahbsfasfsa1 samir",
      email: "Modsxsssssced2@gmail.com"
  }
  const createdLawyer = await lawyers.createLawyer(lawyer)
  const lawId = await createdLawyer.data.data._id
  const investor = {
      email:"shamssssTdssdvssecdcsjgfgjstfi7656@gmail.com",
      password:"verystrongpassword",
      fullName:"randomnametest",
      type:"a",
      gender:"Male",
      nationality:"Egyptian",
      methodOfIdentification:"National Card",
      identificationNumber:"12233344445555",
      dateOfBirth:"1990-12-17T22:00:00.000Z",
      residenceAddress:"13th Mogama3 el Tahrir",
      telephoneNumber:"00201009913457",
      fax:"1234567"
  }
  const createdInvestor  = await lawyers.createInvestor(investor)
  const invId = await createdInvestor.data._id
  const mycase =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'Fadiscssssdsc3fd1dscf3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'Ronsisssccdsdfdfcgyshdcs31389dhgdd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId
  }
expect.assertions(1)
const createdCase = await lawyers.fillForm(lawId,mycase)
const afterCreation = await lawyers.getTheCase(createdCase.data.data['_id'])
  expect(afterCreation.data.data.form).toEqual(mycase.form) 
  && expect(afterCreation.data.data.caseStatus).toEqual(mycase.caseStatus) 
  && expect(afterCreation.data.data.assignedLawyerId).toEqual(mycase.assignedLawyerId) 
  && expect(afterCreation.data.data.assignedReviewerId).toEqual(mycase.assignedReviewerId)
  && expect(afterCreation.data.data.creatorLawyerId).toEqual(lawId)
await lawyers.deleteCase(createdCase.data.data['_id'])
await lawyers.deleteInvestor(invId)
await lawyers.deleteLawyer(lawId)
})