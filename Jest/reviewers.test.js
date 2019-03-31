/**
 * @jest-environment node
 */

const reviewers = require('./reviewers')

  

test('Creating reviewer', async () => {
  expect.assertions(1)
 
 const body = {
   "username": "john",
   "fullName": "john moriss",
   "password": "janjonn",
   "email":"johnmorii@gmail.com"
 }
 const  createdReviewer  = await reviewers.createReviewer(body)
 const  ReviewerAfterCreation  = await reviewers.readReviewer(createdReviewer.data.data['_id']);
 reviewerID=createdReviewer.data.data['_id']
  return expect(createdReviewer.data.data).toEqual(ReviewerAfterCreation.data.data);

})

test("Get all reviewers", async () => {
    expect.assertions(0);

    const data=await reviewers.default();
  
    console.log(data);
  });

  test('Get reviewer by ID', async() => {
    expect.assertions(1)
  
    const reviewerByID = await reviewers.readReviewer(reviewerID)
    return expect(reviewerID).toMatch(reviewerByID.data.data['_id'])
})


test('update reviewer', async () => {
  expect.assertions(1)

  const body = {
    "username": "ahmed",
    "fullName": "ahmed samy",
    "password": "ahmodddaa",
    "email":"hamadaa@gmail.com"
  }

  const expectedReviewerByID = await reviewers.readReviewer(reviewerID)
  expectedReviewerByID.data.data.fullName=body.fullName
  expectedReviewerByID.data.data.username=body.username
  expectedReviewerByID.data.data.password=body.password
  expectedReviewerByID.data.data.email=body.email
  await reviewers.updateReviewer(reviewerID,body)
  const reviewerByIDAfterUpdate = await reviewers.readReviewer(reviewerID)


  return expect(reviewerByIDAfterUpdate.data).toEqual(expectedReviewerByID.data);

})



test('Delete reviewer', async () => {
  expect.assertions(1)

  const reviewerByID = await reviewers.readReviewer(reviewerID)
  await reviewers.deleteReviewer(reviewerID)
  const { data } = await reviewers.default();
  return expect(data).not.toContain(reviewerByID);

})