
/**
 * @jest-environment node
 */
const lawyers = require("./lawyers");

test("As a lawyer i should be able to see all unsigned cases", async () => {
  
  // expect.assertions(1);
  //create new lawyer
  const lawyer = {
    email: "yaya.gamed80@gmail.com",//unique
    password: "yayayayayyaya",
    fullName: "mantaisreal",
    username: "yayagamed80"//unique
  };
  
  const createdLawyer = await lawyers.createLawyer(lawyer);
  const lawyerId = createdLawyer.data.data["_id"];
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
  await lawyers.deleteLawyer(lawyerId);
});

test("As a lawyer i should be able to select a specific case", async () =>{

  // expect.assertions(1);
  //create new lawyer
  const lawyer = {
    email: "yaya_new80@gmail.com",//unique
    password: "yayayayayyaya",
    fullName: "mantaisreal",
    username: "yaya_new80"//unique
  };
  const createdLawyer = await lawyers.createLawyer(lawyer);
  const lawyerId = createdLawyer.data.data["_id"];
  //create new case
  const investor = {
    email:"yahiabashayakalb80@gmail.com",//unique
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
const createdInvestor  = await lawyers.createInvestor(investor)
const mycase =  {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Moes3',
        companyNameArabic: 'yayaforbeauty80',//unique
        companyNameEnglish: 'yayaforbeuty80',//unique
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 100
    },
    caseStatus: 'WaitingForLawyer',
    creatorInvestorId: createdInvestor.data._id
}
  const createdCase  = await lawyers.createCase(mycase)
  const caseId = createdCase.data.data["_id"];
  //testing it-self
  //case Before assigning
  const before = await lawyers.getCase(caseId);
  expect(before.data.data["_id"]).toEqual(caseId);
  expect(before.data.data["caseStatus"]).toEqual("WaitingForLawyer");
  
  const response = await lawyers.getSpecificWaitingForLawyerCase(lawyerId,caseId)
  expect(response.data["_id"]).toEqual(caseId);
  expect(response.data["caseStatus"]).toEqual("AssignedToLawyer");
  expect(response.data["assignedLawyerId"]).toEqual(lawyerId);
  // case After assigning
  const after = await lawyers.getCase(caseId);
  expect(after.data.data["_id"]).toEqual(caseId);
  expect(after.data.data["caseStatus"]).toEqual("AssignedToLawyer");
  expect(after.data.data["assignedLawyerId"]).toEqual(lawyerId);

  //delete case and investor
  await lawyers.deleteCase(createdCase.data.data._id);
  await lawyers.deleteInvestor(createdInvestor.data._id);
  await lawyers.deleteLawyer(lawyerId);
});




let createdEmail = ''
let createdPassword = ''
let investorId = ''
let caseId = ''
let registeredReviewer = ''

test('Create All Dependencies', async() => {
    jest.setTimeout(50000)
    const investor = {
        email:"Mw4tb4t4btvrvw@gmail.com",
        password:"vehaetb4b4tb3rfbdssword",
        fullName:"ma3vtb4tb4bt4tbcweeers",
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
    const createdInvestor  = await lawyers.createInvestor(investor) 
    investorId = createdInvestor.data._id
    
    const lawyer = 
    {
        username:"Mefgbr4bt4bfegb",
        password:"krefebtbceg",
        fullName:"Mbdefbebttbcweevymo",
        email:"m5g3tb3tbf77e@noHomo.com"
    }
    registeredLawyer= await lawyers.createLawyer(lawyer) 
    const mycase =  {
        form: {
            companyType: 'SPC',
            regulatedLaw: 'lll',
            legalFormOfCompany: 'NonProfitMan',
            companyNameArabic: 'ma0db3t3bt3tbetbi',
            companyNameEnglish: 'manb3tb3tbedvzadcbtbebeby',
            headOfficeGovernorate: 'California',
            headOfficeCity: 'San Francisco',
            headOfficeAddress: '123st.',
            phoneNumber: '01007063067',
            fax: '987654321',
            currencyUsedForCapital: 'EGP',
            capital: 100
        },
        caseStatus: 'AssignedToLawyer',
        creatorInvestorId: investorId,
        assignedLawyerId: registeredLawyer.data.data._id
    }

    const createdCase = await lawyers.createCase(mycase)  
    caseId = createdCase.data.data._id
})

test('Viewing Tasks of Reviewer', async () => {
    jest.setTimeout(50000)

    let task = await lawyers.viewTasks(registeredLawyer.data.data._id)  
    const returnedTaskOf_0_ID = task.data.Tasks[0]._id
    expect(returnedTaskOf_0_ID).toEqual(caseId)
    await lawyers.deleteInvestor(investorId)  
    await lawyers.deleteCase(caseId)  
    await lawyers.deleteLawyer(registeredLawyer.data.data._id)   

})
    
