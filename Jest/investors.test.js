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
    const investor= await investors.createInvestor();
    const cas = await investors.createCase(investor._id);
    let res= await investors.viewMyFees(investor._id);
    
    expect(res).toBe('you do not have any accepted company requests')
    
    await investors.changeStatus(cas._id);
    res= await investors.viewMyFees(investor._id);
    await investors.deleteCase(cas._id);
    await investors.deleteInvestor(investor._id);
    
    const name=res[0].companyName;
    const fees=res[0].fees;
    expect(fees).not.toBe(0);
    expect(name).toEqual('DONTD4536ELETE')
}) 