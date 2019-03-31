/**
 * @jest-environment node
 */

const reviewers = require('./reviewers')

test('As an investor I should be able to login', async() => {
    const Reviewer = 
    {
        username:"yahya123451",
        password:"passworderong",
        fullName:"Mantaveomo",
        email:"yahay123451@noHomo.com"
    }
    const registeredReviewer= await reviewers.registerReviewer(Reviewer)
    const loginInfo = 
    {
        email:"yahay123451@noHomo.com",
        password:"passworderong"
    }
    const loginResult = await reviewers.login(loginInfo)
    expect(loginResult.data.data.length).toBeGreaterThan(0)
    await reviewers.deleteReviewer(registeredReviewer.data.data._id)
})  