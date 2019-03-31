/**
 * @jest-environment node
 */

const reviewers = require('./reviewers')

test('As an investor I should be able to login', async() => {
    const loginInfo ;
    const loginResult = await reviewers.login(loginInfo)
    return expect(loginResult.data.length).toBeGreaterThan(0)
})  