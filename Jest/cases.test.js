
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
    const investor = {
        email:"shamsTesting11234wdf56efsfefdddve2ef54wfwf67834347656@gmail.com",
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
    const createdInvestor  = await cases.createInvestor(investor)
    const invId = createdInvestor.data._id
    const cas =  {
               form: {
                   companyType: 'SPC',
                   regulatedLaw: 'lll',
                   legalFormOfCompany: 'Moes31',
                   companyNameArabic: 'Fadis31372efeff4ef6578',
                   companyNameEnglish: 'Ronics313892ffef3efef47676976',
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
    const createdCase = await cases.createCase(cas)
    expect.assertions(1)
    let caseID = createdCase.data.data['_id']
    const caseByID = await cases.readCase(caseID)
    expect(caseID).toEqual(caseByID.data.data['_id'])
    await cases.deleteCase(createdCase.data.data['_id'])
    await cases.deleteInvestor(createdInvestor.data._id)
})

test('Creating a case', async () => {
    const investor = {
        email:"shamsTesting11234wdf56efsfefdddve2ef54wfwf67834347656@gmail.com",
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
    const createdInvestor  = await cases.createInvestor(investor)
    const invId = createdInvestor.data._id
    const cas =  {
               form: {
                   companyType: 'SPC',
                   regulatedLaw: 'lll',
                   legalFormOfCompany: 'Moes31',
                   companyNameArabic: 'Fadis31372efeff4ef6578',
                   companyNameEnglish: 'Ronics313892ffef3efef47676976',
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
    const createdCase = await cases.createCase(cas)
    const afterCreation = await cases.readCase(createdCase.data.data['_id'])
    caseID = createdCase.data.data['_id']
    expect(createdCase.data.data).toEqual(afterCreation.data.data)
    await cases.deleteInvestor(createdInvestor.data._id)
    await cases.deleteCase(caseID)
})

test('Update a case',async () => {
    const investor = {
        email:"shamsTebsting1u109yydtdfcdsifdve8s8y989r7u77779u798829y878900u90@gmail.com",
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
    const createdInvestor  = await cases.createInvestor(investor)
    const invId = createdInvestor.data._id
    const mycase =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes3',
            companyNameArabic: 'shamste6edsc9sfvfsn889du7tyi8289r7h8u87yy29721d1n879u687563434',
            companyNameEnglish: 'bardoteesdc8vf6s8fn79du8stih89r87y8u872y29y7n21d134u34389786543',
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
    const createdCase  = await cases.createCase(mycase)
    const cas =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes5',
            companyNameArabic: 'newtyes8scdvft2s9e8fh78di78799877r8888e2',
            companyNameEnglish: 'newtestsc8dv9fysh7e8fid27889787787r8e2',
            headOfficeGovernorate: 'Joes5',
            headOfficeCity: 'Mantas5',
            headOfficeAddress: 'Shamss5',
            phoneNumber: '123456789',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'WaitingForReviewer'
    }
    expect.assertions(1)
    await cases.updateCase(createdCase.data.data['_id'], cas)
    const afterUpdate = await cases.readCase(createdCase.data.data['_id'])
    expect(afterUpdate.data.data.form).toEqual(cas.form)
        && expect(afterUpdate.data.data.caseStatus).toEqual(cas.caseStatus) 
        && expect(afterUpdate.data.data.assignedLawyerId).toEqual(cas.assignedLawyerId)
        && expect(afterUpdate.data.data.assignedReviewerId).toEqual(cas.assignedReviewerId)
    await cases.deleteCase(createdCase.data.data['_id'])
    await cases.deleteInvestor(createdInvestor.data._id)
})

test('Delete a case', async () => {
    const investor = {
        email:"shamsTebsting1u1r09ydyfdtdfcdsifdve8s8y989r79y878900u90@gmail.com",
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
    const createdInvestor  = await cases.createInvestor(investor)
    const invId = createdInvestor.data._id
    const mycase =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'Moes3',
            companyNameArabic: 'shamsterst22f9087656187405547890',
            companyNameEnglish: 'bardoterst2f2098760610278957890',
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
    const createdCase  = await cases.createCase(mycase)
    caseID = createdCase.data.data['_id']
    expect.assertions(0)
    const findCase = await cases.readCase(caseID)
    await cases.deleteCase(caseID)
    expect.not.arrayContaining(findCase.data.data)
    await cases.deleteInvestor(createdInvestor.data._id)
})
