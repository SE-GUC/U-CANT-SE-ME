/**
 * @jest-environment node
 */

const investors = require('./investors')
const encryption = require('../routes/api/utils/encryption')

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
