const axios = require('axios')
const Case = require("../models/Case");
const Investor = require("../models/Investor");
const notifications = {
    getAll: async () => {
        return axios.get('http://localhost:3000/api/notifications/')
    },
    createNotification: async (req) => {
        return axios.post('http://localhost:3000/api/notifications/', req)
    },
    readNotification: async (id) =>{
        return axios.get(`http://localhost:3000/api/notifications/${id}`)
    },
    updateNotification: async (id, body) => {
        return axios.put(`http://localhost:3000/api/notifications/${id}`, body)
    },
    deleteNotification: async (id) => {
        return axios.delete(`http://localhost:3000/api/notifications/${id}`)
    },
    createInvestor: async () =>{
        let req=
        {
          
            "email": "notificationTest@gmail.com",
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
                "companyNameArabic": "DONTDELETE",
                "companyNameEnglish": "DONTDELETE",
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
        return axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    deleteInvestor: async (id) => {
        return axios.delete(`http://localhost:3000/api/investors/${id}`)
    }
    
}

module.exports = notifications