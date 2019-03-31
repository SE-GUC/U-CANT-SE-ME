/**
* @jest-environment node
*/

const lawyers = require('./lawyers')
//const cases = require('./cases')
const Case = require("../models/Case");
const Lawyer = require("../models/Lawyer");
let caseID = ''

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const nock = require('nock')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
ObjectId = require('mongodb').ObjectID;

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