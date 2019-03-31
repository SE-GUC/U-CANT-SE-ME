/**
 * @jest-environment node
 */
const reviewers = require("./reviewers");


test("As a reviewer i should be able to see all unsigned cases", async () => {
  
  // expect.assertions(1);
  const reviewer = {
    email: "yaya_n536556ew80@gmail.com",//unique
    password: "yayayayayyaya",
    fullName: "mantaisreal",
    username: "ya3456435ya_new80"//unique
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
    email: "yaya_35354new21@gmail.com",//unique
    password: "yayayayayyaya",
    fullName: "mantaisreal",
    username: "ya445363ya_new21"//unique
  };
  const createdReviewer = await reviewers.createReviewer(reviewer);
  const reviewerId = createdReviewer.data.data["_id"];

  //create new case
  const investor = {
    email:"yahiaba345664shayakalb7@gmail.com",//unique
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
        companyNameArabic: 'yayaf54345orbeauty13',//unique
        companyNameEnglish: 'yayaf45665orbeuty14',//unique
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
let registeredReviewer = ''

test('Create All Dependencies', async() => {
    jest.setTimeout(50000)
    const investor = {
        email:"zdargwdvw3455454c@gmail.com",
        password:"vzxcwdvzrd",
        fullName:"mzxvwdvzecs",
        type:"aetb",
        gender:"Male",
        nationality:"Egyptian",
        methodOfIdentification:"National Card",
        identificationNumber:"12233344445555",
        dateOfBirth:"1990-12-17T22:00:00.000Z",
        residenceAddress:"13th Mogama3 el Tahrir wara masna3 el karasy",
        telephoneNumber:"00201009913457",
        fax:"1234567"
    }
    const createdInvestor  = await reviewers.createInvestor(investor)
    
    investorId = createdInvestor.data._id
    
    const Reviewer = 
    {
        username:"zxvcwd4565vwzxce",
        password:"zxvwdvwevzxv",
        fullName:"M2zxvdwvzxcvmo",
        email:"m5zvxsdvw4356dvzxv7e@noHomo.com"
    }
    registeredReviewer= await reviewers.createReviewer(Reviewer)
    
    const mycase =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'NonProfitMan',
            companyNameArabic: '2eczv4643zcvzxwczx2i',
            companyNameEnglish: 'mzxz4636xvzvsedzxzzby',
            headOfficeGovernorate: 'California',
            headOfficeCity: 'San Francisco',
            headOfficeAddress: '123st.',
            phoneNumber: '01007063067',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'AssignedToReviewer',
        creatorInvestorId: investorId,
        assignedReviewerId: registeredReviewer.data.data._id
    }
    const createdCase = await reviewers.createCase(mycase)
    
    caseId = createdCase.data.data._id
})

test('Viewing Tasks of Reviewer', async () => {
    jest.setTimeout(50000)
    let task = await reviewers.viewTasks(registeredReviewer.data.data._id)
    const returnedTaskOf_0_ID = task.data.Tasks[0]._id
    expect(returnedTaskOf_0_ID).toEqual(caseId)
    await reviewers.deleteInvestor(investorId)
    await reviewers.deleteCase(caseId)
    await reviewers.deleteReviewer(registeredReviewer.data.data._id)  
    
})

test('get last lawyer worked on a case', async () => {
  expect.assertions(1)
  bodyLawyer = {
      "username": "3ahmefdfyvofsdussesf9d8f6",
      "password": "3ahmefdeflvasfdzzou6fd",
      "fullName": "3youssef mohamed joez",
      "email": "3yousseff98f6fsfvdd@gmail.com"
  }
  const lawyer = await reviewers.createLawyer(bodyLawyer)
  const lawyerId = lawyer.data.data['_id']

  console.log(lawyer)
  const bodyInvestor = {
      "email": "30ddyafsbfdssdfdvcf@gmail.com",
      "password": "3161f23ffsfsddsvf4df567y",
      "fullName": "316Afhbcffs sdssvfIcdfbn Xyz",
      "type": "a",
      "gender": "Male",
      "nationality": "Egyptian",
      "methodOfIdentification": "National Card",
      "identificationNumber": "12233344445555",
      "dateOfBirth": "1990-12-17T22:00:00.000Z",
      "residenceAddress": "13th Mogama3 el Tahrir",
      "telephoneNumber": "00201009913457",
      "fax": "1234567"
  }

  const createdInvestor = await reviewers.createInvestor(bodyInvestor);
  
  
  console.log(lawyerId)
  console.log(createdInvestor.data['_id'])

  const body = {
      "form": {
          "companyType": "SPC",
          "regulatedLaw": "lll",
          "legalFormOfCompany": "41vqdgsvfqdssmcesdv",
          "companyNameArabic": "41qevqhgsdfeccdsvfffdffsdedkddscsfdtsgdsdvqdvq",
          "companyNameEnglish": "41qdvhdfsgdcqdddvdfdfseskcfdddfsstgddddvsssqdvqdv",
          "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
          "headOfficeCity": "asasdastgsdsdsdsdd",
          "headOfficeAddress": "qwdvqdvqwdvqwdv",
          "phoneNumber": "121212122121",
          "fax": "1234567",
          "currencyUsedForCapital": "qdvqedvqdvqdv",
          "capital": 100
      },
      "caseStatus": "Rejected",
      "assignedLawyerId": lawyerId,
      "creatorInvestorId": createdInvestor.data['_id']

  }

  const createdCase = await reviewers.createCase(body)

 const lastLawyer = await reviewers.getLastLawyer(createdCase.data.data._id);  
 console.log(lastLawyer.data)
    
//   console.log(createdCase.data.data._id)

  await reviewers.deleteCase(createdCase.data.data._id)
  await reviewers.deleteLawyer(lawyerId)
  await reviewers.deleteInvestor(createdInvestor.data['_id'])    
  expect(lastLawyer.data).toEqual({ lawyerName: '3youssef mohamed joez' });
})  
