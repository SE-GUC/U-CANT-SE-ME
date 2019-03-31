/**
 * @jest-environment node
 */

const companies = require('./companies')
let createdInvestor = {}
let createdCase = {}
let companyID = ''
let caseId = ''
let investorId = ''


test('Create All Dependencies', async() => {
    const investor = {
        email:"moemoe@gmail.com",
        password:"dontusethispassword",
        fullName:"MoeAdelMoe",
        type:"CEO",
        gender:"Male",
        nationality:"Egyptian",
        methodOfIdentification:"National Card",
        identificationNumber:"12233344445555",
        dateOfBirth:"1997-12-15T22:00:00.000Z",
        residenceAddress:"Rehab City",
        telephoneNumber:"01007063067",
        fax:"123456789"
    }
    createdInvestor  = await companies.createInvestor(investor)
    investorId = createdInvestor.data._id
    const mycase =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'NonProfit',
            companyNameArabic: 'شركة مو التجاريةMoeMan',
            companyNameEnglish: 'Moe Company Man',
            headOfficeGovernorate: 'California',
            headOfficeCity: 'San Francisco',
            headOfficeAddress: '123st.',
            phoneNumber: '01007063067',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'WaitingForLawyer',
        creatorInvestorId: createdInvestor.data._id
    }
    createdCase  = await companies.createCase(mycase)
    caseId = createdCase.data.data._id
})    


test('Creating a company', async () => {
    const company = {
        socialInsuranceNumber: 189319,
        investorID: investorId,
        companyName: 'Moe Company',
        companyType: 'SPC',
        dateOfCreation: '1998/12/12',
        caseID: caseId
    }
    expect.assertions(1)
    const createdCompany = await companies.createCompany(company)
    const afterCreation = await companies.readCompany(createdCompany.data.data['_id'])
    companyID = createdCompany.data.data['_id']
    return expect(createdCompany.data.data).toEqual(afterCreation.data.data)
})

test('Get all companies', async() => {
    const allCompanies = await companies.default()
    return expect(allCompanies.data.data.length).toBeGreaterThan(0)
})

test('Get company by ID', async() => {
    expect.assertions(1)
    const companyByID = await companies.readCompany(companyID)
    return expect(companyID).toEqual(companyByID.data.data['_id'])
})

test('Update Company Name', async () =>{
    const name = { newCompanyName: 'MantaHabd' }
    await companies.updateCompany(companyID, name)
    const fetchCompany = await companies.readCompany(companyID)
    return expect(fetchCompany.data.data.companyName).toEqual(name.newCompanyName)
})

test('Delete a company', async () => {
    expect.assertions(0)
    const findCompany = await companies.readCompany(companyID)
    await companies.deleteCompany(companyID)
    return expect.not.arrayContaining(findCompany.data.data)
})

test('Delete All Dependencies', async () => {
    await companies.deleteCase(caseId)
    await companies.deleteInvestor(investorId)
})
