/**
 * @jest-environment node
 */

const reviewer=require('./reviewers')

test('Change Status', async () => {
    const investor = {
    email:"shamsTesting2@gmail.com",
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
const createdInvestor  = await reviewer.createInvestor(investor)
const mycase =  {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Moes3',
        companyNameArabic: 'shamstest5',
        companyNameEnglish: 'bardotest5',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 100
    },
    caseStatus: 'WaitingForLawyer',
    creatorInvestorId: createdInvestor.data._id
}
const createdCase  = await reviewer.createCase(mycase)
//Start of tests
const caseID=createdCase.data.data._id
const caseOnUpdate=await reviewer.changeStatus(caseID,'OnUpdate')
expect(caseOnUpdate.data.caseStatus).toBe('OnUpdate')

const caseWaitingForLawyer=await reviewer.changeStatus(caseID,'WaitingForLawyer')
expect(caseWaitingForLawyer.data.caseStatus).toBe('WaitingForLawyer')

    const caseAssginedToLawyer=await reviewer.changeStatus(caseID,'AssginedToLawyer')
    expect(caseAssginedToLawyer.data.caseStatus).toBe('AssginedToLawyer')

    const caseWaitingForReviewer=await reviewer.changeStatus(caseID,'WaitingForReviewer')
    expect(caseWaitingForReviewer.data.caseStatus).toBe('WaitingForReviewer')

    const caseToReviewer=await reviewer.changeStatus(caseID,'AssginedToReviewer')
    expect(caseToReviewer.data.caseStatus).toBe('AssginedToReviewer')

    await reviewer.deleteCase(createdCase.data.data._id)
    await reviewer.deleteInvestor(createdInvestor.data._id)
})
