/**
 * @jest-environment node
 */

const investors = require('./investors')
const encryption = require('../routes/api/utils/encryption')

let createdEmail = ''
let createdPassword = ''
let investorId = ''
let caseId = ''

test('Create All Dependencies', async() => {
    const investor = {
        email:"moe@moe.moe",
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
    createdInvestor  = await investors.registerInvestor(investor)
    createdEmail = createdInvestor.data.data.email
    createdPassword = investor.password
    investorId = createdInvestor.data.data._id
})    

test('Registering an investor', async () => {
    const investor = 
    {
        email:"moemoemoe5@faegmail.com",
        password:"12345678fea",
        fullName:"bala ibn bafeala abo",
        type:"cfea",
        gender:"Male",
        nationality:"Egyptian",
        methodOfIdentification:"National Card",
        identificationNumber:"12233344445555",
        dateOfBirth:"1990-12-17T22:00:00.000Z",
        residenceAddress:"13th Mogama3 el Tahrir",
        telephoneNumber:"00201009913457",
        fax:"1234567"
    }
    expect.assertions(0)
    const registeredInvestor = await investors.registerInvestor(investor)
    await investors.deleteInvestor(registeredInvestor.data.data._id)
    encryption.comparePassword(investor.password, registeredInvestor.data.data.password, function(err, isMatch){
        if(err)
            throw err
        return expect(isMatch).toBeTruthy()
    })
})

test('As an investor I should be able to login', async() => {
    const loginInfo = {
        email: createdEmail,
        password: createdPassword
    }
    const loginResult = await investors.login(loginInfo)
    return expect(loginResult.data.length).toBeGreaterThan(0)
}) 

test('Delete All Dependencies', async () => {
    await investors.deleteInvestor(investorId)
})

test('As an investor I should be view my fees', async() => {
    expect.assertions(3);
    let req=
        {
          
            "email": "notificatio3546nTest@gmail.com",
            "password": "$2a$10$Ja.2twjd0KSVVyULqh7HCeEtu0aJM9ej9LiK5kth3C0AKMBoREqxC",
            "fullName": "Notification Test",
            "type": "a",
            "gender": "Male",
            "nationality": "Egyptian",
            "methodOfIdentification": "National Card",
            "identificationNumber": "36987103512311",
            "dateOfBirth": "1990-12-14T13:13:13.000Z",
            "residenceAddress": "8165th 3emarat el Shamoosa",
            "telephoneNumber": "01091867182317",
            "fax": "1224567"
        }
    const investor= await investors.createInvestor(req);
    req=
        {
            "form": {
                "companyType": "SPC",
                "regulatedLaw": "72",
                "legalFormOfCompany": "DONTDELETE",
                "companyNameArabic": "DONTDE352LETE",
                "companyNameEnglish": "DONTD4536ELETE",
                "headOfficeGovernorate": "DONTDELETE",
                "headOfficeCity": "DONTDELETE",
                "headOfficeAddress": "DONTDELETE",
                "phoneNumber": "121212122121",
                "fax": "1234567",
                "currencyUsedForCapital": "DONTDELETE",
                "capital": 100
            },
            "caseStatus": "WaitingForLawyer",
            
            "creatorInvestorId": investor._id
            
        }
    const cas = await investors.createCase(req);
    let res= await investors.viewMyFees(investor._id);
    
    expect(res).toBe('you do not have any accepted company requests')
    req=
        {
            "form": {
                "companyType": "SPC",
                "regulatedLaw": "72",
                "legalFormOfCompany": "DONTDELETE",
                "headOfficeGovernorate": "DONTDELETE",
                "headOfficeCity": "DONTDELETE",
                "headOfficeAddress": "DONTDELETE",
                "phoneNumber": "121212122121",
                "fax": "1234567",
                "currencyUsedForCapital": "DONTDELETE",
                "capital": 100
            },
            "caseStatus": "Accepted"
        }
    await investors.changeStatus(cas._id,req);
    res= await investors.viewMyFees(investor._id);
    await investors.deleteCase(cas._id);
    await investors.deleteInvestor(investor._id);
    
    const name=res[0].companyName;
    const fees=res[0].fees;
    expect(fees).not.toBe(0);
    expect(name).toEqual('DONTD4536ELETE')
}) 

test('As an investor I should create casess', async()=>{
  expect.assertions(2);
    const investorInfo ={
        "email": "cxzcxzcxzcxzc@gmail.com",
        "password" : "12345678",
        "fullName" : "Abc Ibn Xyz",
        "type" : "a",
        "gender" : "Female",
        "nationality" : "Egyptian",
        "methodOfIdentification" : "National Card",
        "identificationNumber" : "12233344445555",
        "dateOfBirth" : "1990-12-17T22:00:00.000Z",
        "residenceAddress" : "13th Mogama3 el Tahrir",
        "telephoneNumber" : "00201009913457",
        "fax" : "1234567" };
    const createdInvestor = await investors.createInvestor(investorInfo);
    
    const caseInfo ={
        
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "72",
            "legalFormOfCompany": "DONTDELETE",
            "companyNameArabic": "dsdsadasdxc,xzmcxz",
            "companyNameEnglish": "sadsasacxzc",
            "headOfficeGovernorate": "DONTDELETE",
            "headOfficeCity": "DONTDELETE",
            "headOfficeAddress": "DONTDELETE",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "DONTDELETE",
            "capital": 100
        },
        "caseStatus": "WaitingForLawyer"
    };
    const invCreateCase = await investors.invCreateCase(createdInvestor._id,caseInfo);
    expect(invCreateCase.data.data.form.companyNameEnglish).toBe(caseInfo.form.companyNameEnglish);
    expect(invCreateCase.data.data.form.companyNameArabic).toBe(caseInfo.form.companyNameArabic);
    
    await investors.deleteCase(invCreateCase.data.data._id);
    await investors.deleteInvestor(createdInvestor._id);
    }); 
