const axios = require('axios')

const reviewers = {
    default: async () => {
        return axios.get('http://localhost:3000/api/reviewers')
    },
    changeStatus: async (caseID,status) => {
        return axios.put(`http://localhost:3000/api/reviewers/updateCaseStatus/${caseID}/${status}`)
    },
    createInvestor: async (req)=>{
        return axios.post('http://localhost:3000/api/investors', req)
    },
    createCase: async (req)=>{
        return axios.post('http://localhost:3000/api/cases', req)
    },
    deleteInvestor: async (id)=>{
        return axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    deleteCase: async (id)=>{
        return axios.delete(`http://localhost:3000/api/cases/${id}`)
    }
}

module.exports = reviewers
