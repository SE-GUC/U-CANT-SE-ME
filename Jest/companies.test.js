/**
 * @jest-environment node
 */

const companies = require('./companies')

let companyID = ''

test('Get all companies', async() => {
    const allCompanies = await companies.default()
})

test('Get company by ID', async() => {
    expect.assertions(1)
    let companyID = "5c9cf046c94f0f3410928fc3"
    const companyByID = await companies.readCompany(companyID)
    return expect(companyID).toEqual(companyByID.data.data['_id'])
})

test('Creating a company', async () => {
    const company = {
        socialInsuranceNumber: 189319,
        investorID: '5c9cd88a482605e4c2d9c17e',
        companyName: 'Test33',
        companyType: 'SPC',
        dateOfCreation: '1998/12/12',
        caseID: '5c968d4f233b707e2a617bcb'
    }
    expect.assertions(1)
    const createdCompany = await companies.createCompany(company)
    const afterCreation = await companies.readCompany(createdCompany.data.data['_id'])
    companyID = createdCompany.data.data['_id']
    return expect(createdCompany.data.data).toEqual(afterCreation.data.data)
})

test('Delete a company', async () => {
    expect.assertions(0)
    const findCompany = await companies.readCompany(companyID)
    const deletedCompany = await companies.deleteCompany(companyID)
    return expect.not.arrayContaining(findCompany.data.data)
})