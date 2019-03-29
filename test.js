
/**
 * @jest-environment node
 */
const lawyerController = require("./controllers/lawyerController");
const fn = require("./fn");
const mongoose = require("mongoose");
const Case = require("./models/Case.js")
test('adds 1 + 2 to be 3', () => {
    expect(1+2).toBe(3);
  });
const req = {"_id": "5c9645f36e2ef06af84adccf"};
const cases = [
  {
    "form": {
        "companyType": "SPC",
        "regulatedLaw": "lll",
        "legalFormOfCompany": "vqdvqdv",
        "companyNameArabic": "unique",
        "companyNameEnglish": "name",
        "headOfficeGovernorate": "qdvqdvqdvqdv",
        "headOfficeCity": "qwdvqdvqdvqdv",
        "headOfficeAddress": "qwdvqdvqwdvqwdv",
        "phoneNumber": "121212122121",
        "fax": "1234567",
        "currencyUsedForCapital": "qdvqedvqdvqdv",
        "capital": 100
    },
    "caseStatus": "WaitingForLawyer",
    "creatorLawyerId": null,
    "assignedLawyerId": null,
    "assignedReviewerId": null,
    "previouslyAssignedLawyers": [],
    "previouslyAssignedReviewers": [],
    "_id": "5c96a6a93c9d69408cdbd6fc",
    "creatorInvestorId": "5c963bb0c034386789b371b6",
    "caseCreationDate": "2019-03-23T21:35:37.287Z",
    "comments": [],
    "managers": [],
    "__v": 0
},{
  "form": {
      "companyType": "SPC",
      "regulatedLaw": "lll",
      "legalFormOfCompany": "vqdvqdv",
      "companyNameArabic": "qevqhedsddddddsdvqdvq",
      "companyNameEnglish": "qdvhqdddldddddddvsssqdvqdv",
      "headOfficeGovernorate": "qdvqdvqdvqdv",
      "headOfficeCity": "qwdvqdvqdvqdv",
      "headOfficeAddress": "qwdvqdvqwdvqwdv",
      "phoneNumber": "121212122121",
      "fax": "1234567",
      "currencyUsedForCapital": "qdvqedvqdvqdv",
      "capital": 100
  },
  "caseStatus": "WaitingForLawyer",
  "creatorLawyerId": "5c9645f36e2ef06af84adccf",
  "assignedLawyerId": null,
  "assignedReviewerId": null,
  "previouslyAssignedLawyers": [],
  "previouslyAssignedReviewers": [],
  "_id": "5c9c9c43daf8f52ea01e768d",
  "creatorInvestorId": "5c963bb0c034386789b371b6",
  "caseCreationDate": "2019-03-28T10:04:51.893Z",
  "comments": [],
  "managers": [],
  "__v": 0
},
{
  "form": {
      "companyType": "SPC",
      "regulatedLaw": "lll",
      "legalFormOfCompany": "vqdvqdv",
      "companyNameArabic": "qevqhedsdddddcdsdvqdvq",
      "companyNameEnglish": "qdvhqdddldcddddddvsssqdvqdv",
      "headOfficeGovernorate": "qdvqdvqdvqdv",
      "headOfficeCity": "qwdvqdvqdvqdv",
      "headOfficeAddress": "qwdvqdvqwdvqwdv",
      "phoneNumber": "121212122121",
      "fax": "1234567",
      "currencyUsedForCapital": "qdvqedvqdvqdv",
      "capital": 100
  },
  "caseStatus": "WaitingForLawyer",
  "creatorLawyerId": null,
  "assignedLawyerId": "5c9645f36e2ef06af84adccf",
  "assignedReviewerId": null,
  "previouslyAssignedLawyers": [],
  "previouslyAssignedReviewers": [],
  "_id": "5c9c9c7bdaf8f52ea01e768e",
  "creatorInvestorId": "5c963bb0c034386789b371b6",
  "caseCreationDate": "2019-03-28T10:05:47.211Z",
  "comments": [],
  "managers": [],
  "__v": 0
},{
  "form": {
      "companyType": "SPC",
      "regulatedLaw": "lll",
      "legalFormOfCompany": "vqdvqdv",
      "companyNameArabic": "qevqhwdesddddddsdvqdvq",
      "companyNameEnglish": "qdvhqddwdwdddddddddvsssqdvqdv",
      "headOfficeGovernorate": "qdvqdvqdvqdv",
      "headOfficeCity": "qwdvqdvqdvqdv",
      "headOfficeAddress": "qwdvqdvqwdvqwdv",
      "phoneNumber": "121212122121",
      "fax": "1234567",
      "currencyUsedForCapital": "qdvqedvqdvqdv",
      "capital": 100
  },
  "caseStatus": "WaitingForLawyer",
  "creatorLawyerId": null,
  "assignedLawyerId": null,
  "assignedReviewerId": null,
  "previouslyAssignedLawyers": [],
  "previouslyAssignedReviewers": [],
  "_id": "5c9ca2f5996fa14e2df79a8d",
  "creatorInvestorId": "5c963bb0c034386789b371b6",
  "caseCreationDate": "2019-03-28T10:33:25.949Z",
  "comments": [],
  "managers": [],
  "__v": 0
},
{
  "form": {
      "companyType": "SPC",
      "regulatedLaw": "lll",
      "legalFormOfCompany": "vqdvqdv",
      "companyNameArabic": "qevqhwd3evesddddddsdvqdvq",
      "companyNameEnglish": "qdvhqd3v3fvdwdwdddddddddvsssqdvqdv",
      "headOfficeGovernorate": "qdvqdvqdvqdv",
      "headOfficeCity": "qwdvqdvqdvqdv",
      "headOfficeAddress": "qwdvqdvqwdvqwdv",
      "phoneNumber": "121212122121",
      "fax": "1234567",
      "currencyUsedForCapital": "qdvqedvqdvqdv",
      "capital": 100
  },
  "caseStatus": "WaitingForLawyer",
  "creatorLawyerId": null,
  "assignedLawyerId": null,
  "assignedReviewerId": null,
  "previouslyAssignedLawyers": [],
  "previouslyAssignedReviewers": [],
  "_id": "5c9ca357996fa14e2df79a8e",
  "creatorInvestorId": "5c963bb0c034386789b371b6",
  "caseCreationDate": "2019-03-28T10:35:03.412Z",
  "comments": [],
  "managers": [],
  "__v": 0
},
{
  "form": {
      "companyType": "SPC",
      "regulatedLaw": "lll",
      "legalFormOfCompany": "vqdvqdv",
      "companyNameArabic": "qevqhwd3evewdcsddddddsdvqdvq",
      "companyNameEnglish": "qdvhqd3v3fvwdcdwdwdddddddddvsssqdvqdv",
      "headOfficeGovernorate": "qdvqdvqdvqdv",
      "headOfficeCity": "qwdvqdvqdvqdv",
      "headOfficeAddress": "qwdvqdvqwdvqwdv",
      "phoneNumber": "121212122121",
      "fax": "1234567",
      "currencyUsedForCapital": "qdvqedvqdvqdv",
      "capital": 100
  },
  "caseStatus": "WaitingForLawyer",
  "creatorLawyerId": null,
  "assignedLawyerId": "5c967d106899e43278f67ed7",
  "assignedReviewerId": null,
  "previouslyAssignedLawyers": [],
  "previouslyAssignedReviewers": [],
  "_id": "5c9ca3a5996fa14e2df79a8f",
  "creatorInvestorId": "5c963bb0c034386789b371b6",
  "caseCreationDate": "2019-03-28T10:36:21.799Z",
  "comments": [],
  "managers": [],
  "__v": 0
},
{
  "form": {
      "companyType": "SPC",
      "regulatedLaw": "lll",
      "legalFormOfCompany": "vqdvqdv",
      "companyNameArabic": "qevqhwd3evewdcsdddddwvddsdvqdvq",
      "companyNameEnglish": "qdvhqd3v3fvwdcdwdwwdvdddddddddvsssqdvqdv",
      "headOfficeGovernorate": "qdvqdvqdvqdv",
      "headOfficeCity": "qwdvqdvqdvqdv",
      "headOfficeAddress": "qwdvqdvqwdvqwdv",
      "phoneNumber": "121212122121",
      "fax": "1234567",
      "currencyUsedForCapital": "qdvqedvqdvqdv",
      "capital": 100
  },
  "caseStatus": "WaitingForLawyer",
  "creatorLawyerId": null,
  "assignedLawyerId": "5c967d106899e43278f67ed7",
  "assignedReviewerId": "5c96a1a38d1519860454bf5a",
  "previouslyAssignedLawyers": [],
  "previouslyAssignedReviewers": [],
  "_id": "5c9ca4ef1a7edb51dd5eaaba",
  "creatorInvestorId": "5c963bb0c034386789b371b6",
  "caseCreationDate": "2019-03-28T10:41:51.042Z",
  "comments": [],
  "managers": [],
  "__v": 0
},
{
  "form": {
      "companyType": "SPC",
      "regulatedLaw": "lll",
      "legalFormOfCompany": "vqdvqdv",
      "companyNameArabic": "qevqhwd3evewdcsddddrfberbfdwvddsdvqdvq",
      "companyNameEnglish": "qdvhqd3v3fvwdcdwdwerbferbfwdvdddddddddvsssqdvqdv",
      "headOfficeGovernorate": "qdvqdvqdvqdv",
      "headOfficeCity": "qwdvqdvqdvqdv",
      "headOfficeAddress": "qwdvqdvqwdvqwdv",
      "phoneNumber": "121212122121",
      "fax": "1234567",
      "currencyUsedForCapital": "qdvqedvqdvqdv",
      "capital": 100
  },
  "caseStatus": "WaitingForLawyer",
  "creatorLawyerId": null,
  "assignedLawyerId": "5c967d106899e43278f67ed7",
  "assignedReviewerId": "5c96a1a38d1519860454bf5a",
  "previouslyAssignedLawyers": [],
  "previouslyAssignedReviewers": [],
  "_id": "5c9ca5011a7edb51dd5eaabb",
  "creatorInvestorId": "5c963bb0c034386789b371b6",
  "caseCreationDate": "2019-03-28T10:42:09.998Z",
  "comments": [
      {
          "date": "2019-03-28T13:32:29.183Z",
          "_id": "5c9ccd07311e4cc47837e75a",
          "author": "johnyyyy cena"
      },
      {
          "date": "2019-03-28T13:32:29.183Z",
          "_id": "5c9ccd12311e4cc47837e75c",
          "author": "johnyyyy cena"
      }
  ],
  "managers": [],
  "__v": 0
}
];

test("As a lawyer i should be able to see all unsigned cases", async () => {

  // expect.assertions(1);
  // jest.setTimeout(30000);
  const response = await fn.getWaitingForLawyerCase()
  // let allcases = await Case.where("caseStatus","WaitingForLawyer");
  expect(response.data).toEqual(cases)
  // console.log(response.data.data)
  // console.log("-----------------------------------------")
 // console.log(cases)
});