/**
 * @jest-environment node
 */

const admins = require("./admins");
const encryption = require("../routes/api/utils/encryption");

test("Registering a Lawyer", async () => {
  jest.setTimeout(50000);
  const lawyer = {
    username: "Manta1453Letaw2",
    password: "pasHere",
    fullName: "JoHbete CenAAA",
    email: "mantb1a@gmail.com"
  };
  const registeredLawyer = await admins.registerLawyer(lawyer);
  await admins.deleteLawyer(registeredLawyer.data.data._id);
  encryption.comparePassword(
    lawyer.password,
    registeredLawyer.data.data.password,
    function(err, isMatch) {
      if (err) throw err;
      return expect(isMatch).toBeTruthy();
    }
  );
});

test("Registering a Reviewer", async () => {
  jest.setTimeout(50000);
  const Reviewer = {
    username: "MantaR3452t1tb79",
    password: "passworderong",
    fullName: "Mantaveomo",
    email: "manlsdvv1erb579@noHomo.com"
  };
  const registeredReviewer = await admins.registerReviewer(Reviewer);
  await admins.deleteReviewer(registeredReviewer.data.data._id);
  encryption.comparePassword(
    Reviewer.password,
    registeredReviewer.data.data.password,
    function(err, isMatch) {
      if (err) throw err;
      return expect(isMatch).toBeTruthy();
    }
  );
});
test("As an admin I should be able to login", async () => {
  const createAdmin = {
    username: "YahiaBadr3",
    fullName: "Yahia Hisham",
    password: "yaya1234"
  };
  const createdAdmin = await admins.createAdmin(createAdmin);
  const loginInfo = {
    username: "YahiaBadr3",
    password: "yaya1234"
  };
  const loginResult = await admins.loginAdmin(loginInfo);
  expect(loginResult.data.data.length).toBeGreaterThan(0);
  await admins.deleteAdmin(createdAdmin.data.data["_id"]);
});

test('get last lawyer worked on a case', async () => {
    expect.assertions(1)
    bodyLawyer = {
        "username": "4ahmefddfyvoedfvsdussesf9d8f6",
        "password": "4ahmefddeflvasdfdzzou6fd",
        "fullName": "6youssef mohamed joez",
        "email": "6youssefdf98f6fsfvdd@gmail.com"
    }
    const lawyer = await admins.createLawyer(bodyLawyer)
    const lawyerId = lawyer.data.data['_id']

    
    const bodyInvestor = {
        "email": "40ddysddafsbfdssdfdvcf@gmail.com",
        "password": "4161dsdf23ffsfsddsvf4df567y",
        "fullName": "416Afdhsdbcffs sdssvfIcdfbn Xyz",
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

    const createdInvestor = await admins.createInvestor(bodyInvestor);
    
   

    const body = {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "51sdvqdgsvfqdssmdcesdv",
            "companyNameArabic": "51qevsdqhgsdfecdcdsvfffdffsdedkddscsfdtsgdsdvqdvq",
            "companyNameEnglish": "51qdvhsddfsgdcqddddvdfdfseskcfdddfsstgddddvsssqdvqdv",
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

    const createdCase = await admins.createCase(body)

   const lastLawyer = await admins.getLastLawyer(createdCase.data.data._id);  
      

    await admins.deleteCase(createdCase.data.data._id)
    await admins.deleteLawyer(lawyerId)
    await admins.deleteInvestor(createdInvestor.data['_id'])    
    expect(lastLawyer.data).toEqual({ lawyerName: '6youssef mohamed joez' });
});
test('testing admin Get All Cases',async()=>{
    expect.assertions(1);
    let investorBody= {
      "email": "yehaihirokfcdscsdvncma@gmail.com",
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
    const investorCreated= await admins.createInvestor(investorBody);
    let form ={
          
      "form": {
          "companyType": "SPC",
          "regulatedLaw": "712",
          "legalFormOfCompany": "DON312321TDELETE",
          "companyNameArabic": "ahm1as1111112312ouwss,xzmcxz",
          "companyNameEnglish": "ah1m3123111sdeadyehia31123do112312ndo",
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
  
  const caseCreated= await admins.createCase(form);
   const allCases= await admins.getAllCasesAdmin();
   expect(allCases.data.data.length).not.toBe(0);
   await admins.deleteCase(caseCreated.data.data._id);
   await admins.deleteInvestor(investorCreated.data._id);
  });

  test('Creating admin', async () => {
    expect.assertions(2)
  
   const body = {
     "username": "koko0000rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr00000000000000zzsas",
     "fullName": "eppppp",
     "password": "ssssss44"
   }
  
   const  createdAdmin  = await admins.createAdmin(body)
   const  AdminAfterCreation  = await admins.readAdmin(createdAdmin.data.data['_id']);
   adminID=createdAdmin.data.data['_id']
     expect(createdAdmin.data.data.username).toBe(AdminAfterCreation.data.data.username);
     expect(createdAdmin.data.data.fullName).toBe(AdminAfterCreation.data.data.fullName);
  })
  
  test("Get all admins", async () => {
      expect.assertions(0);
  
      // data is the response object from the server
      const data=await admins.default();
  
     
    });
  
    test('Get admin by ID', async() => {
      expect.assertions(1)
  
      const adminByID = await admins.readAdmin(adminID)
      return expect(adminID).toMatch(adminByID.data.data['_id'])
  })
  
  
  test('update admin', async () => {
    expect.assertions(2)
  
    const body = {
      "username": "yoyoyoyoyoyooyoyoyoyoyoyooyoyoyoyoyo4",
      "fullName": "eppppp"
      
    }
  
    const expectedAdminByID = await admins.readAdmin(adminID)
    expectedAdminByID.data.data.fullName=body.fullName
    expectedAdminByID.data.data.username=body.username

  
    await admins.updateAdmin(adminID,body)
    const adminByIDAfterUpdate = await admins.readAdmin(adminID)
  
  
    expect(adminByIDAfterUpdate.data.data.username).toBe(expectedAdminByID.data.data.username);
    expect(adminByIDAfterUpdate.data.data.fullName).toBe(expectedAdminByID.data.data.fullName);
    
  })
  
  
  
  test('Delete admin', async () => {
    expect.assertions(1)
  
    const adminByID = await admins.readAdmin(adminID)
    await admins.deleteAdmin(adminID)
    const { data } = await admins.default();
    return expect(data).not.toContain(adminByID);
  
  })
  

