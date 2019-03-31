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