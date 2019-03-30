
/**
 * @jest-environment node
 */
const reviewers = require("./reviewers");


test("As a reviewer i should be able to see all unsigned cases", async () => {
  
  // expect.assertions(1);
  const reviewer = {
    email: "yaya_new80@gmail.com",//unique
    password: "yayayayayyaya",
    fullName: "mantaisreal",
    username: "yaya_new80"//unique
  };
  const createdReviewer = await reviewers.createReviewer(reviewer);
  const reviewerId = createdReviewer.data.data["_id"];
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
  await reviewers.deleteReviewer(reviewerId);
});

test("As a reviewer i should be able to select a specific case", async () =>{

  // expect.assertions(1);
  const reviewer = {
    email: "yaya_new21@gmail.com",//unique
    password: "yayayayayyaya",
    fullName: "mantaisreal",
    username: "yaya_new21"//unique
  };
  const createdReviewer = await reviewers.createReviewer(reviewer);
  const reviewerId = createdReviewer.data.data["_id"];

  //create new case
  const investor = {
    email:"yahiabashayakalb7@gmail.com",//unique
    password:"verystrongpassword",
    fullName:"randomnametest",
    type:"a",
    gender:"Male",
    nationality:"Egyptian",
    methodOfIdentification:"National Card",
    identificationNumber:"12233344445555",
    dateOfBirth:"1990-12-17T22:00:00.000Z",
    residenceAddress:"13th Mogama3 el Tahrir",
    telephoneNumber:"00201009913457",
    fax:"1234567"
}
const createdInvestor  = await reviewers.createInvestor(investor)
const mycase =  {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Moes3',
        companyNameArabic: 'yayaforbeauty13',//unique
        companyNameEnglish: 'yayaforbeuty14',//unique
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 100
    },
    caseStatus: 'WaitingForReviewer',
    creatorInvestorId: createdInvestor.data._id
}
  const createdCase  = await reviewers.createCase(mycase)
  const caseId = createdCase.data.data["_id"];

  const before = await reviewers.getCase(caseId);
  expect(before.data.data["_id"]).toEqual(caseId);
  expect(before.data.data["caseStatus"]).toEqual("WaitingForReviewer");
  const response = await reviewers.getSpecificWaitingForReviewersCase(reviewerId,caseId)
  expect(response.data["_id"]).toEqual(caseId);
  expect(response.data["caseStatus"]).toEqual("AssignedToReviewer");
  expect(response.data["assignedReviewerId"]).toEqual(reviewerId);
  const after = await reviewers.getCase(caseId);
  expect(after.data.data["_id"]).toEqual(caseId);
  expect(after.data.data["caseStatus"]).toEqual("AssignedToReviewer");
  expect(after.data.data["assignedReviewerId"]).toEqual(reviewerId);

  //delete case and investor
  await reviewers.deleteCase(createdCase.data.data._id);
  await reviewers.deleteInvestor(createdInvestor.data._id);
  await reviewers.deleteReviewer(reviewerId);

});