const cases = require('./cases')
//const Case = require("../models/Case");
let caseID = ''

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const nock = require('nock')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;


test('Get all cases', async() => {
    const allCases = await cases.default()
})

test('Get case by ID', async() => {
    expect.assertions(1)
    let caseID = "5c9ca5011a7edb51dd5eaabb"
    const caseByID = await cases.readCase(caseID)
    return expect(caseID).toEqual(caseByID.data.data['_id'])
})

test('Creating a case', async () => {
    const cas =  {
               form: {
                   companyType: 'SPC',
                   regulatedLaw: 'lll',
                   legalFormOfCompany: 'Moes3',
                   companyNameArabic: 'Fadis3',
                   companyNameEnglish: 'Ronics3',
                   headOfficeGovernorate: 'Joes3',
                   headOfficeCity: 'Mantas3',
                   headOfficeAddress: 'Shamss3',
                   phoneNumber: '123456789',
                   fax: '987654321',
                   currencyUsedForCapital: 'EGP',
                   capital: 100
               },
               caseStatus: 'WaitingForLawyer',
               assignedLawyerId:'5c967d106899e43278f67ed7',
               assignedReviewerId:'5c96a1a38d1519860454bf5a',
               creatorInvestorId: '5c9d6315bbbd0a30248a1ec7'
           }
    expect.assertions(1)
    const createdCase = await cases.createCase(cas)
    const afterCreation = await cases.readCase(createdCase.data.data['_id'])
    caseID = createdCase.data.data['_id']
    return expect(createdCase.data.data).toEqual(afterCreation.data.data)
})

test('Update a case',async () => {
    const cas =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes5',
            companyNameArabic: 'Fadis5',
            companyNameEnglish: 'Ronics5',
            headOfficeGovernorate: 'Joes5',
            headOfficeCity: 'Mantas5',
            headOfficeAddress: 'Shamss5',
            phoneNumber: '123456789',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'WaitingForReviewer',
        assignedLawyerId:'5c9d64e39cd8dd1364ab69d4',
        assignedReviewerId:'5c9d64e39cd8dd1364ab69d6'
    }
    expect.assertions(1)
    const updatedCase = await cases.updateCase(caseID, cas)
    const afterUpdate = await cases.readCase(caseID)
    return expect(afterUpdate.data.data.form).toEqual(cas.form) && expect(afterUpdate.data.data.caseStatus).toEqual(cas.caseStatus) && expect(afterUpdate.data.data.assignedLawyerId).toEqual(cas.assignedLawyerId) && expect(afterUpdate.data.data.assignedReviewerId).toEqual(cas.assignedReviewerId)
})

test('Delete a case', async () => {
    expect.assertions(0)
    const findCase = await cases.readCase(caseID)
    const deletedCase = await cases.deleteCase(caseID)
    return expect.not.arrayContaining(findCase.data.data)
})
