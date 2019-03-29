
/**
 * @jest-environment node
 */
const reviewers = require("./reviewers");

const reviewerId = "5c9d6315bbbd0a30248a1ec8";
const caseIdReviewer = "5c9d415306cedf10f482402f";

test("As a reviewer i should be able to see all unsigned cases", async () => {
  
  // expect.assertions(1);
  const allcases = await reviewers.getAllCases();
  const cases =[];
  for(i = 0; i < allcases.data.data.length ;i++)
  {
    if(allcases.data.data[i]["caseStatus"] == "WaitingForReviewer")
    {
      cases.push(allcases.data.data[i]);
    }
  }
  const response = await reviewers.getWaitingForReviewersCase(reviewerId)
  for(i = 0; i<cases.length ; i++)
  {
    expect(response.data[i]["_id"]).toEqual(cases[i]["_id"]);

  }
});

// check the caseIdReviewer before runing that it is WaitingForReviewer or it exists
test("As a lawyer i should be able to select a specific case", async () =>{

  // expect.assertions(1);
  const before = await reviewers.getCase(caseIdReviewer);
  expect(before.data.data["_id"]).toEqual(caseIdReviewer);
  expect(before.data.data["caseStatus"]).toEqual("WaitingForReviewer");
  const response = await reviewers.getSpecificWaitingForReviewersCase(reviewerId,caseIdReviewer)
  expect(response.data["_id"]).toEqual(caseIdReviewer);
  expect(response.data["caseStatus"]).toEqual("AssignedToReviewer");
  expect(response.data["assignedReviewerId"]).toEqual(reviewerId);
  const after = await reviewers.getCase(caseIdReviewer);
  expect(after.data.data["_id"]).toEqual(caseIdReviewer);
  expect(after.data.data["caseStatus"]).toEqual("AssignedToReviewer");
  expect(after.data.data["assignedReviewerId"]).toEqual(reviewerId);
});