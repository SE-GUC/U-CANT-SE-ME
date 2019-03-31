const axios = require('axios')

const investors = {
    default: async () => {
        return await axios.get('http://localhost:3000/api/investors/')
    },
    registerInvestor: async (req) => {
        return await axios.post('http://localhost:3000/api/investors/register', req)
    },
    createInvestor: async(req) => {
        return await axios.post('http://localhost:3000/api/investors', req)
    },
    viewComments: async (investorID, caseID) => {
        return await axios.get(`http://localhost:3000/api/investors/lawyerComments/${investorID}/${caseID}`)
    },
    deleteInvestor: async(id) => {
        return await axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    updateInvestor: async (id, body) => {
      return await axios.put(`http://localhost:3000/api/investors/${id}`, body);
    },
    createCase: async (req)=>{
        return await axios.post('http://localhost:3000/api/cases', req)
    },
    login: async loginInfo => {
      return await axios.post('http://localhost:3000/api/investors/login', loginInfo);
    },
    deleteCase: async (id)=>{
        return await axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    readAllInvestors: async () => {
      return await axios.get("http://localhost:3000/api/investors");
    },
    readInvestor: async id => {
      return await axios.get(`http://localhost:3000/api/investors/${id}`);
    },
    viewMyFees: async id => {
      const ret = await axios.get(`http://localhost:3000/api/investors/viewMyFees/${id}`);
      return ret.data.response;
    },
    payFees: async (investorId, caseId) => {
      return axios.post(`http://localhost:3000/api/investors/payFees/${investorId}/${caseId}`);
    },
    changeStatus: async (id, req) => {
      await axios.put(`http://localhost:3000/api/cases/update/${id}`, req);
    },
    updateCase: async (id, req) => {
        return await axios.put(`http://localhost:3000/api/cases/update/${id}`, req)
    }
}

module.exports = investors
