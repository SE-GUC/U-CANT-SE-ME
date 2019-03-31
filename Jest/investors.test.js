/**
 * @jest-environment node
 */

const investors = require('./investors')
let createdEmail = ''
let createdPassword = ''
let investorId = ''
let caseId = ''

test('Create All Dependencies', async() => {
    const investor = {
        email:"moe@moe.moe.com",
        password:"dontusethispassword",
        fullName:"MoeMoeMoe",
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
    createdInvestor  = await investors.createInvestor(investor)
    createdEmail = createdInvestor.data.email
    createdPassword = investor.password
    investorId = createdInvestor.data._id
    const mycase =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'ManNonProfitManTheMan',
            companyNameArabic: 'شركة مو التجاريةMoeManTheManMan',
            companyNameEnglish: 'Moe CompanyMoeeeTheMANNNMan',
            headOfficeGovernorate: 'California',
            headOfficeCity: 'San Francisco',
            headOfficeAddress: '123st.',
            phoneNumber: '01007063067',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'WaitingForLawyer',
        creatorInvestorId: investorId
    }
    const createdCase = await investors.createCase(mycase)
    caseId = createdCase.data.data._id 
    const updatedCase = {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'NonProfitManTheMan',
            headOfficeGovernorate: 'California',
            headOfficeCity: 'San Francisco',
            headOfficeAddress: '123st.',
            phoneNumber: '01007063067',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'WaitingForLawyer',
        comments:[
            {
                author:"Moe",
                body:"Good Company!"
                
            },
            {
                author:"MoeMan",
                body:"I second Moe"	
            }
        ]
    }
    await investors.updateCase(caseId, updatedCase)    
})    

test('Viewing Lawyers Comments On My Case', async() => {
    let comments = await investors.viewComments(investorId, caseId)
    return expect(comments.data.comments.length).toBeGreaterThan(0)
})


test('Delete All Dependencies', async () => {
    await investors.deleteInvestor(investorId)
    await investors.deleteCase(caseId)
})
