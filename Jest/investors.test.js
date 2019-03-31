/**
 * @jest-environment node
 */

const investors = require('./investors')

test('As an investor I should be able to login', async() => {
    const loginInfo = {
        email: 'scrummaster@gmail.com',
        password: '12345678fea'
    }
    const loginResult = await investors.login(loginInfo)
    return expect(loginResult.data.length).toBeGreaterThan(0)
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
    expect(name).toEqual('DONTDELETE')
}) 