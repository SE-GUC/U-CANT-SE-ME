const axios = require('axios')

const investors = {
    default: async () => {
        return await axios.get('http://localhost:3000/api/investors/')
    },
    registerInvestor: async (req) => {
        return await axios.post('http://localhost:3000/api/investors/register', req)
    },
    viewComments: async (investorID, caseID) => {
        return await axios.get(`http://localhost:3000/api/investors/lawyerComments/${investorID}/${caseID}`)
    },
    login: async (loginInfo) => {
        return await axios.post('http://localhost:3000/api/investors/login', loginInfo)
    },
    updateCase: async (id, req) => {
        return await axios.put(`http://localhost:3000/api/cases/update/${id}`, req)
    },
    viewMyFees: async (id) => {
       const ret= await axios.get(`http://localhost:3000/api/investors/viewMyFees/${id}`)
       return ret.data.response;
    },
    createInvestor: async () =>{
        let req=
        {
          
            "email": "notificatio3546nTest@gmail.com",
            "password": "$2a$10$Ja.2twjd0KSVVyULqh7HCeEtu0aJM9ej9LiK5kth3C0AKMBoREqxC",
            "fullName": "Notification Test",
            "type": "a",
            "gender": "Male",
            "nationality": "Egyptian",
            "methodOfIdentification": "National Card",
            "identificationNumber": "36987103512311",
            "dateOfBirth": "1990-12-14T13:13:13.000Z",
            "residenceAddress": "8165th 3emarat el Shamoosa",
            "telephoneNumber": "01091867182317",
            "fax": "1224567"
        }
        const investor=await axios.post('http://localhost:3000/api/investors/',req);
       
       return investor.data;
        

    },
    createCase: async (id) =>{
        let req=
        {
            "form": {
                "companyType": "SPC",
                "regulatedLaw": "72",
                "legalFormOfCompany": "DONTDELETE",
                "companyNameArabic": "DONTDE352LETE",
                "companyNameEnglish": "DONTD4536ELETE",
                "headOfficeGovernorate": "DONTDELETE",
                "headOfficeCity": "DONTDELETE",
                "headOfficeAddress": "DONTDELETE",
                "phoneNumber": "121212122121",
                "fax": "1234567",
                "currencyUsedForCapital": "DONTDELETE",
                "capital": 100
            },
            "caseStatus": "WaitingForLawyer",
            
            "creatorInvestorId": id
            
        }
        const cas=await axios.post('http://localhost:3000/api/cases/',req);
       
        return cas.data.data;
        

    },
    deleteCase: async (id) => {
        return await axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    deleteInvestor: async (id) => {
        return await axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    changeStatus: async (id) => {
        let req=
        {
            "form": {
                "companyType": "SPC",
                "regulatedLaw": "72",
                "legalFormOfCompany": "DONTDELETE",
                "headOfficeGovernorate": "DONTDELETE",
                "headOfficeCity": "DONTDELETE",
                "headOfficeAddress": "DONTDELETE",
                "phoneNumber": "121212122121",
                "fax": "1234567",
                "currencyUsedForCapital": "DONTDELETE",
                "capital": 100
            },
            "caseStatus": "Accepted"
        }
        await axios.put(`http://localhost:3000/api/cases/update/${id}`,req);
    }
}

module.exports = investors
