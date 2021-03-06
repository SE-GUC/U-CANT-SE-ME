
/**
* @jest-environment node
*/
const mongoose = require("mongoose");
jest.setTimeout(50000)

const reviewers = require('./reviewers')
//const cases = require('./cases')
const Case = require("../models/Case");
const Investor = require("../models/Investor");
const Reviewer = require("../models/Reviewer");
let caseID = ''
const db = require("../config/keys").mongoURI;

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const nock = require('nock')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
ObjectId = require('mongodb').ObjectID;

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


  await reviewers.deleteCase(createdCase.data.data._id)
  await reviewers.deleteLawyer(lawyerId)
  await reviewers.deleteInvestor(createdInvestor.data['_id'])    
  expect(lastLawyer.data).toEqual({ lawyerName: '3youssef mohamed joez' });
})  
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


  });

  test('Get reviewer by ID', async() => {
    expect.assertions(1)

    const reviewerByID = await reviewers.readReviewer(reviewerID)
    return expect(reviewerID).toMatch(reviewerByID.data.data['_id'])
})


test('update reviewer', async () => {
  expect.assertions(1)

  const body = {
    "username": "ahmedd",
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

});
test('testing reviewer Get All Cases',async()=>{
  expect.assertions(1);
  let investorBody= {
    "email": "yehaihiahia23joenjoe1hiahiaha@gmail.com",
    "password" : "12345678",
    "fullName" : "Abc Ibn Xyz",
    "type" : "a",
    "gender" : "Female",
    "nationality" : "Egyptian",
    "methodOfIdentification" : "National Card",
    "identificationNumber" : "12233344445555",
    "dateOfBirth" : "1990-12-17T22:00:00.000Z",
    "residenceAddress" : "13th Mogama3 el Tahrir",
    "telephoneNumber" : "00201009913457",
    "fax" : "1234567" 
  };
  const investorCreated= await reviewers.createInvestor(investorBody);
  let form ={
        
    "form": {
        "companyType": "SPC",
        "regulatedLaw": "712",
        "legalFormOfCompany": "DON312321TDELETE",
        "companyNameArabic": "ahm1ass21djoeasdas3e3213123dy3yehia1112312ouwss,xzmcxz",
        "companyNameEnglish": "ah1m3123joedasdasdasdeadyehia31123do112312ndo",
        "headOfficeGovernorate": "DONTDELETE",
        "headOfficeCity": "DONTDELETE",
        "headOfficeAddress": "DONT312312DELETE",
        "phoneNumber": "121212122121",
        "fax": "1234567",
        "currencyUsedForCapital": "DO3123NTDELETE",
        "capital": 100
    },
    "caseStatus": "WaitingForLawyer",
      "creatorInvestorId": investorCreated.data._id
};

const caseCreated= await reviewers.createCase(form);
 const allCases= await reviewers.getAllCasesReviewer();
 expect(allCases.data.data.length).not.toBe(0);
 await reviewers.deleteCase(caseCreated.data.data._id);
 await reviewers.deleteInvestor(investorCreated.data._id);
});
test('Change Status', async () => {
    const investor = {
    email:"shamsTesting21231@gmail.com",
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
        companyNameArabic: 'shamstest3453565',
        companyNameEnglish: 'bardotest50647',
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
const createdCase  = await reviewers.createCase(mycase)
//Start of tests
const caseID=createdCase.data.data._id

const caseAccepted=await reviewers.changeStatus(caseID,'Accepted')
expect(caseAccepted.data.caseStatus).toBe('Accepted')

const caseRejected=await reviewers.changeStatus(caseID,'Rejected')
expect(caseRejected.data.caseStatus).toBe('Rejected')
    
const caseOnUpdate=await reviewers.changeStatus(caseID,'OnUpdate')
expect(caseOnUpdate.data.caseStatus).toBe('OnUpdate')

const caseWaitingForLawyer=await reviewers.changeStatus(caseID,'WaitingForLawyer')
expect(caseWaitingForLawyer.data.caseStatus).toBe('WaitingForLawyer')

const caseAssginedToLawyer=await reviewers.changeStatus(caseID,'AssginedToLawyer')
expect(caseAssginedToLawyer.data.caseStatus).toBe('AssginedToLawyer')

const caseWaitingForReviewer=await reviewers.changeStatus(caseID,'WaitingForReviewer')
expect(caseWaitingForReviewer.data.caseStatus).toBe('WaitingForReviewer')

const caseToReviewer=await reviewers.changeStatus(caseID,'AssginedToReviewer')
expect(caseToReviewer.data.caseStatus).toBe('AssginedToReviewer')
    
try{
       const caseTest=await reviewers.changeStatus(caseID,'habd')
   }catch(err)
   {

   }
const caseTest=await reviewers.getCase(caseID)
expect(caseTest.data.caseStatus).not.toBe('habd')

await reviewers.deleteCase(createdCase.data.data._id)
await reviewers.deleteInvestor(createdInvestor.data._id)
})


test("As a reviewer I should be able to login", async () => {
  const createReviewer = {
    email:"yahia2@reviewer.com",
    username: "YahiaBadr3",
    fullName: "Yahia Hisham",
    password: "yaya1234"
  };
  const createdReviewer = await reviewers.registerReviewer(createReviewer);
  const loginInfo = {
    email:"yahia2@reviewer.com",
    password: "yaya1234"
  };
  const loginResult = await reviewers.loginReviewer(loginInfo);
  expect(loginResult.data.data.length).toBeGreaterThan(0);
  await reviewers.deleteReviewer(createdReviewer.data.data["_id"]);
});

test('Add comment as a Reviewer with caseStatus = WaitingForReviewer & he is assigned to the case should add comment', async () => {
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(1);

//** CREATE INVESTOR **//
  const testInvestor = {
    email:"addcommentreviewer_testjest@ghail.com",
    password:"verystrongpassword",
    fullName:"yolo",
    type:"f",
    gender:"Male",
    nationality:"Egyptian",
    methodOfIdentification:"National Card",
    identificationNumber:"55533355555555",
    dateOfBirth:"1990-12-17T22:00:00.000Z",
    residenceAddress:"13th Mogama3 el Tahrir",
    telephoneNumber:"00201009913457",
    fax:"1234567"
  }
  const createdInvestor  = await Investor.create(testInvestor);

//** CREATE REVIEWER **//
  const testReviewer = {
    username:"reviewertestjest",
    password:"12312gg12g12",
    fullName:"Abfvgnggk",
    email:"reviewertestjest@gmail.com"
  }
  const createdReviewer = await Reviewer.create(testReviewer);

//** CREATE CASE **//
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'companytestjest',
        companyNameEnglish: 'compamyengtestjest',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 1000000
    },
    caseStatus: 'WaitingForReviewer',
    creatorInvestorId: createdInvestor._id,
    assignedReviewerId: createdReviewer._id
  }
  const createdCase  = await Case.create(testCase);

//** Comment Body **//
  const req = {
    body: "test jest"
  }

  await reviewers.addCommentAsReviewer(req, createdReviewer._id, createdCase._id);
  const actualCase = await Case.findOne(testCase);
  expect(actualCase.comments[actualCase.comments.length-1].body).toEqual(req.body);
  await Case.deleteOne(testCase);
  await Investor.deleteOne(testInvestor);
  await Reviewer.deleteOne(testReviewer);
});

test('Add comment as a Reviewer with caseStatus = Rejected & he is assigned to the case should add comment', async () => {
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(1);

//** CREATE INVESTOR **//
  const testInvestor = {
    email:"addcommentreviewer_testjest@ghail.com",
    password:"verystrongpassword",
    fullName:"yolo",
    type:"f",
    gender:"Male",
    nationality:"Egyptian",
    methodOfIdentification:"National Card",
    identificationNumber:"55533355555555",
    dateOfBirth:"1990-12-17T22:00:00.000Z",
    residenceAddress:"13th Mogama3 el Tahrir",
    telephoneNumber:"00201009913457",
    fax:"1234567"
  }
  const createdInvestor  = await Investor.create(testInvestor);

//** CREATE REVIEWER **//
  const testReviewer = {
    username:"reviewertestjest",
    password:"12312gg12g12",
    fullName:"Abfvgnggk",
    email:"reviewertestjest@gmail.com"
  }
  const createdReviewer = await Reviewer.create(testReviewer);

//** CREATE CASE **//
  const testCase = {
    form: {
        companyType: 'SPC',
        regulatedLaw: 'lll',
        legalFormOfCompany: 'Mojes3',
        companyNameArabic: 'companytestjest',
        companyNameEnglish: 'compamyengtestjest',
        headOfficeGovernorate: 'Joes3',
        headOfficeCity: 'Mantas3',
        headOfficeAddress: 'Shamss3',
        phoneNumber: '123456789',
        fax: '987654321',
        currencyUsedForCapital: 'EGP',
        capital: 1000000
    },
    caseStatus: 'Rejected',
    creatorInvestorId: createdInvestor._id,
    assignedReviewerId: createdReviewer._id
  }
  const createdCase  = await Case.create(testCase);

//** Comment Body **//
  const req = {
    body: "test jest"
  }

  await reviewers.addCommentAsReviewer(req, createdReviewer._id, createdCase._id);
  const actualCase = await Case.findOne(testCase);
  expect(actualCase.comments[actualCase.comments.length-1].body).toEqual(req.body);
  await Case.deleteOne(testCase);
  await Investor.deleteOne(testInvestor);
  await Reviewer.deleteOne(testReviewer);
});

test ('reviewer get his cases sorted by id',async() =>{
  const reviewer = {
      username: "scfrddssdsern",
      password: "xyzasdfghdfghhjhhbb",
      fullName: "johnhahbsfasfsa1 samir",
      email: "Moddsfdsded2@gmail.com"
  }
  const createdReviewer = await reviewers.createReviewer(reviewer)
  const revId = await createdReviewer.data.data._id
  const investor = {
      email:"shamssfssddTddvecdcsjgfgjstfi7656@gmail.com",
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
  const invId = await createdInvestor.data._id
  const mycase1 =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'Fadiscdsfsdsc3de1dscfd3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'Ronsidsfccdsddefdfcgydshdcs31389ddd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId,
      assignedReviewerId: revId
  }
  const mycase2 =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'Fa2discsfdsdscd3e1dscf3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'Ro2nsisdccfdsdefddfcgyshdcs31389ddd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId,
      assignedReviewerId: revId
  }
  const createdCase1 = await reviewers.createCase(mycase1)
  const createdCase2 = await reviewers.createCase(mycase2)
mongoose
.connect(db)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
  expect.assertions(0)
  const hisCases = await reviewers.getMyCasesSortedById(revId)
  const hisActualCases = await Case.find({"assignedReviewerId": revId}).sort({_id: 1})
  for(let i =0 ; i<hisCases.length ; i++){
      expect(hisCases[i].data.data.form).toEqual(hisActualCases[i].data.data.form) 
      && expect(hisCases[i].data.data.caseStatus).toEqual(hisActualCases[i].data.data.caseStatus) 
      && expect(hisCases[i].data.data.assignedLawyerId).toEqual(hisActualCases[i].data.data.assignedLawyerId) 
      && expect(hisCases[i].data.data.assignedReviewerId).toEqual(hisActualCases[i].data.data.assignedReviewerId)
  }
  mongoose.disconnect(db)
  await reviewers.deleteCase(createdCase1.data.data['_id'])
  await reviewers.deleteCase(createdCase2.data.data['_id'])
  await reviewers.deleteInvestor(createdInvestor.data._id)
  await reviewers.deleteReviewer(createdReviewer.data.data._id)
  })

test ('reviewer get his cases sorted by date of creation',async() =>{
  const reviewer = {
      username: "scrdswxsern",
      password: "xyzasdfghdfghhjhhbb",
      fullName: "johnhahbsfasfsa1 samir",
      email: "Moddsxd2@gmail.com"
  }
  const createdReviewer = await reviewers.createReviewer(reviewer)
  const revId = await createdReviewer.data.data._id
  const investor = {
      email:"shaxmssssdTddvecdcsjwgfgjstfi7656@gmail.com",
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
  const invId = await createdInvestor.data._id
  const mycase1 =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'xxFadiscswsdsc3de1dscfd3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'xxRonsiswccdsddefdfcgydshdcs31389ddd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId,
      assignedReviewerId: revId
  }
  const mycase2 =  {
      form: {
          companyType: 'SPC',
          regulatedLaw: 'lll',
          legalFormOfCompany: 'Moes31',
          companyNameArabic: 'xFa2discsswdscd3e1dscf3gsdrydtfyjg72ddefeff4ef6578',
          companyNameEnglish: 'xRo2nsiscwcdsdefddfcgyshdcs31389ddd2ffef3efef47676976',
          headOfficeGovernorate: 'Joes3',
          headOfficeCity: 'Mantas3',
          headOfficeAddress: 'Shamss3',
          phoneNumber: '123456789',
          fax: '987654321',
          currencyUsedForCapital: 'EGP',
          capital: 100
      },
      caseStatus: 'WaitingForLawyer',
      creatorInvestorId: invId,
      assignedReviewerId: revId
  }
  const createdCase1 = await reviewers.createCase(mycase1)
  const createdCase2 = await reviewers.createCase(mycase2)
mongoose
.connect(db)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
  expect.assertions(0)
  const hisCases = await reviewers.getMyCasesSortedById(revId)
  const hisActualCases = await Case.find({"assignedReviewerId": revId}).sort({caseCreationDate: 1})
  for(let i =0 ; i<hisCases.length ; i++){
      expect(hisCases[i].data.data.form).toEqual(hisActualCases[i].data.data.form) 
      && expect(hisCases[i].data.data.caseStatus).toEqual(hisActualCases[i].data.data.caseStatus) 
      && expect(hisCases[i].data.data.assignedLawyerId).toEqual(hisActualCases[i].data.data.assignedLawyerId) 
      && expect(hisCases[i].data.data.assignedReviewerId).toEqual(hisActualCases[i].data.data.assignedReviewerId)
  }
  mongoose.disconnect(db)
  await reviewers.deleteCase(createdCase1.data.data['_id'])
  await reviewers.deleteCase(createdCase2.data.data['_id'])
  await reviewers.deleteInvestor(createdInvestor.data._id)
  await reviewers.deleteReviewer(createdReviewer.data.data._id)
})