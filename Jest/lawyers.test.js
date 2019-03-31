/**
* @jest-environment node
*/
const mongoose = require("mongoose");
jest.setTimeout(50000)

const lawyers = require('./lawyers')
//const cases = require('./cases')
const Case = require("../models/Case");
let caseID = ''
const db = require("../config/keys").mongoURI;

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const nock = require('nock')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
ObjectId = require('mongodb').ObjectID;

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
