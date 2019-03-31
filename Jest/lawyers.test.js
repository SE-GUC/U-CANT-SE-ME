/**
 * @jest-environment node
 */

const lawyer=require('./lawyers')

test('Change Status', async () => {
    const investor = {
    email:"shamsTesting23452345234@gmail.com",
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
const createdInvestor  = await lawyer.createInvestor(investor)
const mycase =  {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Moes3',
        companyNameArabic: 'shamstest256457',
        companyNameEnglish: 'bardotest23452',
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
    const createdCase  = await lawyer.createCase(mycase)

    //Start of tests
    const caseID=createdCase.data.data._id
    const caseOnUpdate=await lawyer.changeStatus(caseID,'OnUpdate')
    expect(caseOnUpdate.data.caseStatus).toBe('OnUpdate')

    const caseWaitingForLawyer=await lawyer.changeStatus(caseID,'WaitingForLawyer')
    expect(caseWaitingForLawyer.data.caseStatus).toBe('WaitingForLawyer')

    const caseAssginedToLawyer=await lawyer.changeStatus(caseID,'AssginedToLawyer')
    expect(caseAssginedToLawyer.data.caseStatus).toBe('AssginedToLawyer')

    const caseWaitingForReviewer=await lawyer.changeStatus(caseID,'WaitingForReviewer')
    expect(caseWaitingForReviewer.data.caseStatus).toBe('WaitingForReviewer')

    const caseToReviewer=await lawyer.changeStatus(caseID,'AssginedToReviewer')
    expect(caseToReviewer.data.caseStatus).toBe('AssginedToReviewer')

    await lawyer.deleteCase(createdCase.data.data._id)
    await lawyer.deleteInvestor(createdInvestor.data._id)
})
