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
    createInvestor: async (req) =>{
        
    const investor=await axios.post('http://localhost:3000/api/investors/',req);
       
       return investor.data;
        

    },
    createCase: async (req) =>{
        
        const cas=await axios.post('http://localhost:3000/api/cases/',req);
       
        return cas.data.data;
        

    },
    deleteCase: async (id) => {
        return await axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    deleteInvestor: async (id) => {
        return await axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    changeStatus: async (id,req) => {
        
        await axios.put(`http://localhost:3000/api/cases/update/${id}`,req);
    }
}

module.exports = investors
