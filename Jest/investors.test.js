/**
 * @jest-environment node
 */

const investors = require('./investors')

test('As an investor I should be able to login', async() => {
    const loginInfo = {
        email: 'scrummaster@gmail.com',
        password: '12345678fea'
    }
    const loginResult = await investors.login(loginInfo)
    return expect(loginResult.data.length).toBeGreaterThan(0)
})


test('trackMyCompany WaitingForLawyer status', async () => {
    expect.assertions(1)
  
    const bodyInvestor= {
      "email": "6ddasbdfc@gmail.com",
      "password" : "6123ffds4f5678",
      "fullName" : "6Abcf ssIcfbn Xyz",
      "type" : "a",
      "gender" : "Male",
      "nationality" : "Egyptian",
      "methodOfIdentification" : "National Card",
      "identificationNumber" : "12233344445555",
      "dateOfBirth" : "1990-12-17T22:00:00.000Z",
      "residenceAddress" : "13th Mogama3 el Tahrir",
      "telephoneNumber" : "00201009913457",
      "fax" : "1234567" 
      }
    
    const createdInvesotr = await investors.createInvestor(bodyInvestor);   
  
   const body= {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "vqdgvfqdssmcesdv",
            "companyNameArabic": "qevqhgfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "qdvhfgdqdddddsekcfdddsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
            "headOfficeCity": "asasdastgsdsdsdsdd",
            "headOfficeAddress": "qwdvqdvqwdvqwdv",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "qdvqedvqdvqdv",
            "capital": 100
        },
        "caseStatus": "WaitingForLawyer",
        
        "creatorInvestorId": createdInvesotr.data['_id']
        
    }

    const createdCase = await investors.createCase(body);    
    const createdCaseId = createdCase.data.data['_id']
    const createdCaseStatus = createdCase.data.data['caseStatus']
    const trackMyCompanyResult = await investors.trackMyCompany(createdInvesotr.data['_id']);  

 
     await investors.deleteInvestor(createdInvesotr.data['_id']);    
     await investors.deleteCase(createdCase.data.data._id);  

     expect(trackMyCompanyResult.data).toEqual({ tracking: [ { company: ' Your company undefined is currently in phase WaitingForLawyer ' } ] });
  


  })


  test('trackMyCompany OnUpdate status', async () => {
    expect.assertions(1)
  
    const bodyInvestor= {
      "email": "6ddasbdfc@gmail.com",
      "password" : "6123ffds4f5678",
      "fullName" : "6Abcf ssIcfbn Xyz",
      "type" : "a",
      "gender" : "Male",
      "nationality" : "Egyptian",
      "methodOfIdentification" : "National Card",
      "identificationNumber" : "12233344445555",
      "dateOfBirth" : "1990-12-17T22:00:00.000Z",
      "residenceAddress" : "13th Mogama3 el Tahrir",
      "telephoneNumber" : "00201009913457",
      "fax" : "1234567" 
      }
    
    const createdInvesotr = await investors.createInvestor(bodyInvestor);   
  
   const body= {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "vqdgvfqdssmcesdv",
            "companyNameArabic": "qevqhgfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "qdvhfgdqdddddsekcfdddsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
            "headOfficeCity": "asasdastgsdsdsdsdd",
            "headOfficeAddress": "qwdvqdvqwdvqwdv",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "qdvqedvqdvqdv",
            "capital": 100
        },
        "caseStatus": "OnUpdate",
        
        "creatorInvestorId": createdInvesotr.data['_id']
        
    }

    const createdCase = await investors.createCase(body);    
    const createdCaseId = createdCase.data.data['_id']
    const createdCaseStatus = createdCase.data.data['caseStatus']
    const trackMyCompanyResult = await investors.trackMyCompany(createdInvesotr.data['_id']);  

 
     await investors.deleteInvestor(createdInvesotr.data['_id']);    
     await investors.deleteCase(createdCase.data.data._id);  

     expect(trackMyCompanyResult.data).toEqual({ tracking: [ { company: ' Your company undefined is currently in phase OnUpdate ' } ] });
  


  })

  test('trackMyCompany AssignedToLawyer status', async () => {
    expect.assertions(1)
  
    const bodyInvestor= {
      "email": "6ddasbdfc@gmail.com",
      "password" : "6123ffds4f5678",
      "fullName" : "6Abcf ssIcfbn Xyz",
      "type" : "a",
      "gender" : "Male",
      "nationality" : "Egyptian",
      "methodOfIdentification" : "National Card",
      "identificationNumber" : "12233344445555",
      "dateOfBirth" : "1990-12-17T22:00:00.000Z",
      "residenceAddress" : "13th Mogama3 el Tahrir",
      "telephoneNumber" : "00201009913457",
      "fax" : "1234567" 
      }
    
    const createdInvesotr = await investors.createInvestor(bodyInvestor);   
  
   const body= {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "vqdgvfqdssmcesdv",
            "companyNameArabic": "qevqhgfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "qdvhfgdqdddddsekcfdddsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
            "headOfficeCity": "asasdastgsdsdsdsdd",
            "headOfficeAddress": "qwdvqdvqwdvqwdv",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "qdvqedvqdvqdv",
            "capital": 100
        },
        "caseStatus": "AssignedToLawyer",
        
        "creatorInvestorId": createdInvesotr.data['_id']
        
    }

    const createdCase = await investors.createCase(body);    
    const createdCaseId = createdCase.data.data['_id']
    const createdCaseStatus = createdCase.data.data['caseStatus']
    const trackMyCompanyResult = await investors.trackMyCompany(createdInvesotr.data['_id']);  

 
     await investors.deleteInvestor(createdInvesotr.data['_id']);    
     await investors.deleteCase(createdCase.data.data._id);  

     expect(trackMyCompanyResult.data).toEqual({ tracking: [ { company: ' Your company undefined is currently in phase AssignedToLawyer ' } ] });
  


  })


  test('trackMyCompany WaitingForReviewer status', async () => {
    expect.assertions(1)
  
    const bodyInvestor= {
      "email": "6ddasbdfc@gmail.com",
      "password" : "6123ffds4f5678",
      "fullName" : "6Abcf ssIcfbn Xyz",
      "type" : "a",
      "gender" : "Male",
      "nationality" : "Egyptian",
      "methodOfIdentification" : "National Card",
      "identificationNumber" : "12233344445555",
      "dateOfBirth" : "1990-12-17T22:00:00.000Z",
      "residenceAddress" : "13th Mogama3 el Tahrir",
      "telephoneNumber" : "00201009913457",
      "fax" : "1234567" 
      }
    
    const createdInvesotr = await investors.createInvestor(bodyInvestor);   
  
   const body= {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "vqdgvfqdssmcesdv",
            "companyNameArabic": "qevqhgfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "qdvhfgdqdddddsekcfdddsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
            "headOfficeCity": "asasdastgsdsdsdsdd",
            "headOfficeAddress": "qwdvqdvqwdvqwdv",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "qdvqedvqdvqdv",
            "capital": 100
        },
        "caseStatus": "WaitingForReviewer",
        
        "creatorInvestorId": createdInvesotr.data['_id']
        
    }

    const createdCase = await investors.createCase(body);    
    const createdCaseId = createdCase.data.data['_id']
    const createdCaseStatus = createdCase.data.data['caseStatus']
    const trackMyCompanyResult = await investors.trackMyCompany(createdInvesotr.data['_id']);  

 
     await investors.deleteInvestor(createdInvesotr.data['_id']);    
     await investors.deleteCase(createdCase.data.data._id);  

     expect(trackMyCompanyResult.data).toEqual({ tracking: [ { company: ' Your company undefined is currently in phase WaitingForReviewer ' } ] });
  


  })

  test('trackMyCompany AssignedToReviewer status', async () => {
    expect.assertions(1)
  
    const bodyInvestor= {
      "email": "6ddasbdfc@gmail.com",
      "password" : "6123ffds4f5678",
      "fullName" : "6Abcf ssIcfbn Xyz",
      "type" : "a",
      "gender" : "Male",
      "nationality" : "Egyptian",
      "methodOfIdentification" : "National Card",
      "identificationNumber" : "12233344445555",
      "dateOfBirth" : "1990-12-17T22:00:00.000Z",
      "residenceAddress" : "13th Mogama3 el Tahrir",
      "telephoneNumber" : "00201009913457",
      "fax" : "1234567" 
      }
    
    const createdInvesotr = await investors.createInvestor(bodyInvestor);   
  
   const body= {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "vqdgvfqdssmcesdv",
            "companyNameArabic": "qevqhgfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "qdvhfgdqdddddsekcfdddsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
            "headOfficeCity": "asasdastgsdsdsdsdd",
            "headOfficeAddress": "qwdvqdvqwdvqwdv",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "qdvqedvqdvqdv",
            "capital": 100
        },
        "caseStatus": "AssignedToReviewer",
        
        "creatorInvestorId": createdInvesotr.data['_id']
        
    }

    const createdCase = await investors.createCase(body);    
    const createdCaseId = createdCase.data.data['_id']
    const createdCaseStatus = createdCase.data.data['caseStatus']
    const trackMyCompanyResult = await investors.trackMyCompany(createdInvesotr.data['_id']);  

 
     await investors.deleteInvestor(createdInvesotr.data['_id']);    
     await investors.deleteCase(createdCase.data.data._id);  

     expect(trackMyCompanyResult.data).toEqual({ tracking: [ { company: ' Your company undefined is currently in phase AssignedToReviewer ' } ] });
  


  })

  test('trackMyCompany Rejected status', async () => {
    expect.assertions(1)
  
    const bodyInvestor= {
      "email": "6ddasbdfc@gmail.com",
      "password" : "6123ffds4f5678",
      "fullName" : "6Abcf ssIcfbn Xyz",
      "type" : "a",
      "gender" : "Male",
      "nationality" : "Egyptian",
      "methodOfIdentification" : "National Card",
      "identificationNumber" : "12233344445555",
      "dateOfBirth" : "1990-12-17T22:00:00.000Z",
      "residenceAddress" : "13th Mogama3 el Tahrir",
      "telephoneNumber" : "00201009913457",
      "fax" : "1234567" 
      }
    
    const createdInvesotr = await investors.createInvestor(bodyInvestor);   
  
   const body= {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "vqdgvfqdssmcesdv",
            "companyNameArabic": "qevqhgfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "qdvhfgdqdddddsekcfdddsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
            "headOfficeCity": "asasdastgsdsdsdsdd",
            "headOfficeAddress": "qwdvqdvqwdvqwdv",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "qdvqedvqdvqdv",
            "capital": 100
        },
        "caseStatus": "Rejected",
        
        "creatorInvestorId": createdInvesotr.data['_id']
        
    }

    const createdCase = await investors.createCase(body);    
    const createdCaseId = createdCase.data.data['_id']
    const createdCaseStatus = createdCase.data.data['caseStatus']
    const trackMyCompanyResult = await investors.trackMyCompany(createdInvesotr.data['_id']);  


 
     await investors.deleteInvestor(createdInvesotr.data['_id']);    
     await investors.deleteCase(createdCase.data.data._id);  

     expect(trackMyCompanyResult.data).toEqual({ tracking: [ { company: ' Your company undefined is currently in phase Rejected ' } ] });
  


  })

  test('trackMyCompany Accepted status', async () => {
    expect.assertions(1)
  
    const bodyInvestor= {
      "email": "6ddasbdfc@gmail.com",
      "password" : "6123ffds4f5678",
      "fullName" : "6Abcf ssIcfbn Xyz",
      "type" : "a",
      "gender" : "Male",
      "nationality" : "Egyptian",
      "methodOfIdentification" : "National Card",
      "identificationNumber" : "12233344445555",
      "dateOfBirth" : "1990-12-17T22:00:00.000Z",
      "residenceAddress" : "13th Mogama3 el Tahrir",
      "telephoneNumber" : "00201009913457",
      "fax" : "1234567" 
      }
    
    const createdInvesotr = await investors.createInvestor(bodyInvestor);   
  
   const body= {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "vqdgvfqdssmcesdv",
            "companyNameArabic": "qevqhgfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "qdvhfgdqdddddsekcfdddsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
            "headOfficeCity": "asasdastgsdsdsdsdd",
            "headOfficeAddress": "qwdvqdvqwdvqwdv",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "qdvqedvqdvqdv",
            "capital": 100
        },
        "caseStatus": "Accepted",
        
        "creatorInvestorId": createdInvesotr.data['_id']
        
    }

    const createdCase = await investors.createCase(body);    
    const createdCaseId = createdCase.data.data['_id']
    const createdCaseStatus = createdCase.data.data['caseStatus']
    const trackMyCompanyResult = await investors.trackMyCompany(createdInvesotr.data['_id']);  
   

 
     await investors.deleteInvestor(createdInvesotr.data['_id']);    
     await investors.deleteCase(createdCase.data.data._id);  

     expect(trackMyCompanyResult.data).toEqual({ tracking: [ { company: ' Your company undefined is currently in phase Accepted ' } ] });
  


  })
