/**
 * @jest-environment node
 */

const investors = require('./investors')

test('Viewing Lawyers Comments On My Case', async() => {
    let investorID = '5c963bb0c034386789b371b6'
    let caseID = '5c9ca5011a7edb51dd5eaabb'
    let comments = await investors.viewComments(investorID, caseID)
    return expect(comments.data.comments.length).toBeGreaterThan(0)
})
