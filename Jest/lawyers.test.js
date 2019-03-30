/**
* @jest-environment node
*/

const lawyers = require('./lawyers')
//const cases = require('./cases')
const Case = require("../models/Case");
let caseID = ''

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const nock = require('nock')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
ObjectId = require('mongodb').ObjectID;

test('lawyer fill form', async() => {
    const cas =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes3',
            companyNameArabic: 'testestestestestestestest',
            companyNameEnglish: 'testestestestestestestestestestest',
            headOfficeGovernorate: 'Joes3',
            headOfficeCity: 'Mantas3',
            headOfficeAddress: 'Shamss3',
            phoneNumber: '123456789',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'WaitingForLawyer',
        assignedLawyerId:'5c9d62cabbbd0a30248a1ec3',
        assignedReviewerId:'5c9d0503f353963ea4632b42',
        creatorInvestorId: '5c9cff4caabdd207e4fddc7c'
    }
expect.assertions(1)
const createdCase = await lawyers.fillForm("5c9d62cabbbd0a30248a1ec3",cas)
const afterCreation = await lawyers.getTheCase(createdCase.data.data['_id'])
return expect(afterCreation.data.data.form).toEqual(cas.form) 
    && expect(afterCreation.data.data.caseStatus).toEqual(cas.caseStatus) 
    && expect(afterCreation.data.data.assignedLawyerId).toEqual(cas.assignedLawyerId) 
    && expect(afterCreation.data.data.assignedReviewerId).toEqual(cas.assignedReviewerId)
    && expect(afterCreation.data.data.creatorLawyerId).toEqual("5c9e163ad2578b259c90fa3f")
})