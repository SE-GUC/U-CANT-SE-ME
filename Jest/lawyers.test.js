/**
 * @jest-environment node
 */

const lawyers = require('./lawyers')

test('As a lawyer I should be able to login', async() => {
    // const loginInfo ;
    const loginResult = await lawyers.login(loginInfo)
    return expect(loginResult.data.length).toBeGreaterThan(0)
})  