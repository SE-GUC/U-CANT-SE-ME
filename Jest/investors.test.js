/**
 * @jest-environment node
 */

const investors = require('./investors')

// test('As an investor I should be able to login', async() => {
//     const loginInfo = {
//       email: 'scrummaster@gmail.com',
//       password: '12345678fea'
//     }
//     const loginResult = await investors.login(loginInfo)
//     return expect(loginResult.data.length).toBeGreaterThan(0)
// })


test('trackMyCompany WaitingForLawyer status', async () => {
    expect.assertions(1)
  
    const bodyInvestor= {
      "email": "16ddasfbdfecweed@gmail.com",
      "password" : "1612de3ffedssd4f5678",
      "fullName" : "16Abcedf essIcsdfbn Xyz",
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
            "legalFormOfCompany": "vqdegesdvfqdssmcesdv",
            "companyNameArabic": "1qevqehegfsdedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "1qdveehfgdqsddddddsekcfdddsstgddddvsssqdvqdv",
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
      "email": "26ddasbdsdfeeck@gmail.com",
      "password" : "26123fesedfds4f5678k",
      "fullName" : "26Abcf eessdsIcfbn Xyzk",
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
            "legalFormOfCompany": "v2sdeedqdgvfqdssmcesdv",
            "companyNameArabic": "2qevqedsdhgfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "2qdvehdfsdgdqdddddsekcfdddsstgddddvsssqdvqdv",
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
      "email": "36ddasbdfdecsd@gmail.com",
      "password" : "3612d3effds4fsd5678",
      "fullName" : "36Abdcfe ssIcfbsdn Xyz",
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
            "legalFormOfCompany": "3vqedsdgvfqdssmcesdv",
            "companyNameArabic": "3eqevqhgsdfedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "3qedvhfgdqsddddddsekcfdddsstgddddvsssqdvqdv",
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
      "email": "4e6ddasbsddfc@gmail.com",
      "password" : "4e6123sdffds4f5678",
      "fullName" : "46eAbcf sdsssIcfbn Xyz",
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
            "legalFormOfCompany": "4vqdgsdvfqdssmcesdv",
            "companyNameArabic": "4qevqehgfsdedsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "4qdvhefgdqsddddddsekcfdddsstgddddvsssqdvqdv",
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
      "email": "56ddassdbdefc@gmail.com",
      "password" : "5612sed3ffds4f5678",
      "fullName" : "56Abcfsed ssIcfbn Xyz",
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
            "legalFormOfCompany": "5vqdgevfqdssdsmcesdv",
            "companyNameArabic": "5qevqhgefedsfdsdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "5qdvhfgedqdddddsdsekcfdddsstgddddvsssqdvqdv",
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
      "email": "76ddasbdsdef3c@gmail.com",
      "password" : "76123fsed3fds4f5678",
      "fullName" : "76Abcf ses3dsIcfbn Xyz",
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
            "legalFormOfCompany": "7veqdgvs3dfqdssmcesdv",
            "companyNameArabic": "7qeveqhgfe3sddsfdfdedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "7qdvehfgdq3dsdddddsekcfdddsstgddddvsssqdvqdv",
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
      "email": "86ddasbseddfc@gmail.com",
      "password" : "86123esdffds4f5678",
      "fullName" : "86Abcfe sdssIcfbn Xyz",
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
            "legalFormOfCompany": "vqdgevfqdsssdmcesdv",
            "companyNameArabic": "9qevqhgefedsfdfsddedkddscsdtsgdsdvqdvq",
            "companyNameEnglish": "9qdvhfgedqdddddssdekcfdddsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "9qdvsfqdmvqsdvtgqdv",
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
