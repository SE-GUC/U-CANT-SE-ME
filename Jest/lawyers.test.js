/**
 * @jest-environment node
 */



const lawyers=require('./lawyers')     

let createdEmail = ''
let createdPassword = ''
let investorId = ''
let caseId = ''
let registeredReviewer = ''

test('Create All Dependencies', async() => {
    jest.setTimeout(50000)
    const investor = {
        email:"Mw4tb4t4btvrvw@gmail.com",
        password:"vehaetb4b4tb3rfbdssword",
        fullName:"ma3vtb4tb4bt4tbcweeers",
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
    const createdInvestor  = await lawyers.createInvestor(investor) 
    investorId = createdInvestor.data._id
    
    const lawyer = 
    {
        username:"Mefgbr4bt4bfegb",
        password:"krefebtbceg",
        fullName:"Mbdefbebttbcweevymo",
        email:"m5g3tb3tbf77e@noHomo.com"
    }
    registeredLawyer= await lawyers.createLawyer(lawyer) 
    const mycase =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'NonProfitMan',
            companyNameArabic: 'ma0db3t3bt3tbetbi',
            companyNameEnglish: 'manb3tb3tbedvzadcbtbebeby',
            headOfficeGovernorate: 'California',
            headOfficeCity: 'San Francisco',
            headOfficeAddress: '123st.',
            phoneNumber: '01007063067',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'AssignedToLawyer',
        creatorInvestorId: investorId,
        assignedLawyerId: registeredLawyer.data.data._id
    }

    const createdCase = await lawyers.createCase(mycase)  
    caseId = createdCase.data.data._id
})

test('Viewing Tasks of Reviewer', async () => {
    jest.setTimeout(50000)

    let task = await lawyers.viewTasks(registeredLawyer.data.data._id)  
    const returnedTaskOf_0_ID = task.data.Tasks[0]._id
    expect(returnedTaskOf_0_ID).toEqual(caseId)
    await lawyers.deleteInvestor(investorId)  
    await lawyers.deleteCase(caseId)  
    await lawyers.deleteLawyer(registeredLawyer.data.data._id)   

})
    
