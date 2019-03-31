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
    createCase: async (req)=>{
        return await axios.post('http://localhost:3000/api/cases', req)
    },
    deleteCase: async (id)=>{
        return await axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    updateCase: async (id, req) => {
        return await axios.put(`http://localhost:3000/api/cases/update/${id}`, req)
    }
}

module.exports = investors
