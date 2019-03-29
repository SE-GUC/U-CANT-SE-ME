
/**
 * @jest-environment node
 */
const lawyers = require("./lawyers");

const lawyerId = "5c9645f36e2ef06af84adccf";
const caseIdLawyer = "5c9c9c7bdaf8f52ea01e768e";
test("As a lawyer i should be able to see all unsigned cases", async () => {
  
  // expect.assertions(1);
  const allcases = await lawyers.getAllCases();
  const cases =[];
  for(i = 0; i < allcases.data.data.length ;i++)
  {
    if(allcases.data.data[i]["caseStatus"] == "WaitingForLawyer")
    {
      cases.push(allcases.data.data[i]);
    }
  }
  const response = await lawyers.getWaitingForLawyerCase(lawyerId)
  for(i = 0; i<cases.length ; i++)
  {
    expect(response.data[i]["_id"]).toEqual(cases[i]["_id"]);

  }
});

// check the caseIdLawyer before runing that it is WaitingForLawyer or it exists
test("As a lawyer i should be able to select a specific case", async () =>{

  // expect.assertions(1);
  const before = await lawyers.getCase(caseIdLawyer);
  expect(before.data.data["_id"]).toEqual(caseIdLawyer);
  expect(before.data.data["caseStatus"]).toEqual("WaitingForLawyer");
  const response = await lawyers.getSpecificWaitingForLawyerCase(lawyerId,caseIdLawyer)
  expect(response.data["_id"]).toEqual(caseIdLawyer);
  expect(response.data["caseStatus"]).toEqual("AssignedToLawyer");
  expect(response.data["assignedLawyerId"]).toEqual(lawyerId);
  const after = await lawyers.getCase(caseIdLawyer);
  expect(after.data.data["_id"]).toEqual(caseIdLawyer);
  expect(after.data.data["caseStatus"]).toEqual("AssignedToLawyer");
  expect(after.data.data["assignedLawyerId"]).toEqual(lawyerId);
});