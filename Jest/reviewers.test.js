/**
 * @jest-environment node
 */



const reviewers=require('./reviewers')

let investorId = ''
let caseId = ''
let registeredReviewer = ''

test('Create All Dependencies', async() => {
    jest.setTimeout(50000)
    const investor = {
        email:"zdargwdvwc@gmail.com",
        password:"vzxcwdvzrd",
        fullName:"mzxvwdvzecs",
        type:"aetb",
        gender:"Male",
        nationality:"Egyptian",
        methodOfIdentification:"National Card",
        identificationNumber:"12233344445555",
        dateOfBirth:"1990-12-17T22:00:00.000Z",
        residenceAddress:"13th Mogama3 el Tahrir wara masna3 el karasy",
        telephoneNumber:"00201009913457",
        fax:"1234567"
    }
    const createdInvestor  = await reviewers.createInvestor(investor)
    
    investorId = createdInvestor.data._id
    
    const Reviewer = 
    {
        username:"zxvcwdvwzxce",
        password:"zxvwdvwevzxv",
        fullName:"M2zxvdwvzxcvmo",
        email:"m5zvxsdvwdvzxv7e@noHomo.com"
    }
    registeredReviewer= await reviewers.createReviewer(Reviewer)
    
    const mycase =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'NonProfitMan',
            companyNameArabic: '2eczvzcvzxwczx2i',
            companyNameEnglish: 'mzxzxvzvsedzxzzby',
            headOfficeGovernorate: 'California',
            headOfficeCity: 'San Francisco',
            headOfficeAddress: '123st.',
            phoneNumber: '01007063067',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'AssignedToReviewer',
        creatorInvestorId: investorId,
        assignedReviewerId: registeredReviewer.data.data._id
    }
    const createdCase = await reviewers.createCase(mycase)
    
    caseId = createdCase.data.data._id
})

test('Viewing Tasks of Reviewer', async () => {
    jest.setTimeout(50000)
    let task = await reviewers.viewTasks(registeredReviewer.data.data._id)
    const returnedTaskOf_0_ID = task.data.Tasks[0]._id
    expect(returnedTaskOf_0_ID).toEqual(caseId)
    await reviewers.deleteInvestor(investorId)
    await reviewers.deleteCase(caseId)
    await reviewers.deleteReviewer(registeredReviewer.data.data._id)  
    
})
    
