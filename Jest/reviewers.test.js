/**
* @jest-environment node
*/
const mongoose = require("mongoose");
jest.setTimeout(50000)

const reviewers = require('./reviewers')
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

test ('reviewer get his cases sorted by id',async() =>{
    const reviewer = {
        username: "scrdssdsern",
        password: "xyzasdfghdfghhjhhbb",
        fullName: "johnhahbsfasfsa1 samir",
        email: "Moddssded2@gmail.com"
    }
    const createdReviewer = await reviewers.createReviewer(reviewer)
    const revId = await createdReviewer.data.data._id
    const investor = {
        email:"shamssssdTddvecdcsjgfgjstfi7656@gmail.com",
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
    const createdInvestor  = await reviewers.createInvestor(investor)
    const invId = await createdInvestor.data._id
    const mycase1 =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes31',
            companyNameArabic: 'Fadiscssdsc3de1dscfd3gsdrydtfyjg72ddefeff4ef6578',
            companyNameEnglish: 'Ronsisccdsddefdfcgydshdcs31389ddd2ffef3efef47676976',
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
        assignedReviewerId: revId
    }
    const mycase2 =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes31',
            companyNameArabic: 'Fa2discssdscd3e1dscf3gsdrydtfyjg72ddefeff4ef6578',
            companyNameEnglish: 'Ro2nsisccdsdefddfcgyshdcs31389ddd2ffef3efef47676976',
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
        assignedReviewerId: revId
    }
    const createdCase1 = await reviewers.createCase(mycase1)
    const createdCase2 = await reviewers.createCase(mycase2)
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
    expect.assertions(0)
    const hisCases = await reviewers.getMyCasesSortedById(revId)
    const hisActualCases = await Case.find({"assignedReviewerId": revId}).sort({_id: 1})
    for(let i =0 ; i<hisCases.length ; i++){
        expect(hisCases[i].data.data.form).toEqual(hisActualCases[i].data.data.form) 
        && expect(hisCases[i].data.data.caseStatus).toEqual(hisActualCases[i].data.data.caseStatus) 
        && expect(hisCases[i].data.data.assignedLawyerId).toEqual(hisActualCases[i].data.data.assignedLawyerId) 
        && expect(hisCases[i].data.data.assignedReviewerId).toEqual(hisActualCases[i].data.data.assignedReviewerId)
    }
    mongoose.disconnect(db)
    await reviewers.deleteCase(createdCase1.data.data['_id'])
    await reviewers.deleteCase(createdCase2.data.data['_id'])
    await reviewers.deleteInvestor(createdInvestor.data._id)
    await reviewers.deleteReviewer(createdReviewer.data.data._id)
    })
  
test ('reviewer get his cases sorted by date of creation',async() =>{
    const reviewer = {
        username: "scrdswxsern",
        password: "xyzasdfghdfghhjhhbb",
        fullName: "johnhahbsfasfsa1 samir",
        email: "Moddsxd2@gmail.com"
    }
    const createdReviewer = await reviewers.createReviewer(reviewer)
    const revId = await createdReviewer.data.data._id
    const investor = {
        email:"shaxmssssdTddvecdcsjwgfgjstfi7656@gmail.com",
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
    const createdInvestor  = await reviewers.createInvestor(investor)
    const invId = await createdInvestor.data._id
    const mycase1 =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes31',
            companyNameArabic: 'xxFadiscswsdsc3de1dscfd3gsdrydtfyjg72ddefeff4ef6578',
            companyNameEnglish: 'xxRonsiswccdsddefdfcgydshdcs31389ddd2ffef3efef47676976',
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
        assignedReviewerId: revId
    }
    const mycase2 =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes31',
            companyNameArabic: 'xFa2discsswdscd3e1dscf3gsdrydtfyjg72ddefeff4ef6578',
            companyNameEnglish: 'xRo2nsiscwcdsdefddfcgyshdcs31389ddd2ffef3efef47676976',
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
        assignedReviewerId: revId
    }
    const createdCase1 = await reviewers.createCase(mycase1)
    const createdCase2 = await reviewers.createCase(mycase2)
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
    expect.assertions(0)
    const hisCases = await reviewers.getMyCasesSortedById(revId)
    const hisActualCases = await Case.find({"assignedReviewerId": revId}).sort({caseCreationDate: 1})
    for(let i =0 ; i<hisCases.length ; i++){
        expect(hisCases[i].data.data.form).toEqual(hisActualCases[i].data.data.form) 
        && expect(hisCases[i].data.data.caseStatus).toEqual(hisActualCases[i].data.data.caseStatus) 
        && expect(hisCases[i].data.data.assignedLawyerId).toEqual(hisActualCases[i].data.data.assignedLawyerId) 
        && expect(hisCases[i].data.data.assignedReviewerId).toEqual(hisActualCases[i].data.data.assignedReviewerId)
    }
    mongoose.disconnect(db)
    await reviewers.deleteCase(createdCase1.data.data['_id'])
    await reviewers.deleteCase(createdCase2.data.data['_id'])
    await reviewers.deleteInvestor(createdInvestor.data._id)
    await reviewers.deleteReviewer(createdReviewer.data.data._id)
  })

