/**
 * @jest-environment node
 */

const companies = require('./companies')

let companyID = ''

test('Get all companies', async() => {
    const allCompanies = await companies.default()
})


test('Creating a company', async () => {
    const company = {
        socialInsuranceNumber: 189319,
        investorID: '5c9d0eb6af006b31fca33641',
        companyName: 'Test39',
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

test('Get company by ID', async() => {
    expect.assertions(1)
    const companyByID = await companies.readCompany(companyID)
    return expect(companyID).toEqual(companyByID.data.data['_id'])
})

test('Update Company Name', async () =>{
    const name = { newCompanyName: 'MantaHabd' }
    const testFound = await companies.readCompany(companyID)
    const updatedCompany = await companies.updateCompany(companyID, name)
    const fetchCompany = await companies.readCompany(companyID)
    return expect(fetchCompany.data.data.companyName).toEqual(name.newCompanyName)
})

test('Delete a company', async () => {
    expect.assertions(0)
    const findCompany = await companies.readCompany(companyID)
    const deletedCompany = await companies.deleteCompany(companyID)
    return expect.not.arrayContaining(findCompany.data.data)
})