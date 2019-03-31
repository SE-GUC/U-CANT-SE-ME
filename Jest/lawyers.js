const axios = require('axios')

const lawyers = {
    default: async () => {
        return await axios.get('http://localhost:3000/api/lawyers/')
    },
    changeStatus: async (caseID,status) => {
        return await axios.put(`http://localhost:3000/api/lawyers/updateCaseStatus/${caseID}/${status}`)
    },
    createInvestor: async (req)=>{
        return await axios.post('http://localhost:3000/api/investors', req)
    },
    createCase: async (req)=>{
        return await axios.post('http://localhost:3000/api/cases', req)
    },
    deleteInvestor: async (id)=>{
        return await axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    deleteCase: async (id)=>{
        return await axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    getCase: async (caseID)=>{
        return await axios.get(`http://localhost:3000/api/cases/${caseID}`)
    }
}

module.exports = lawyers
