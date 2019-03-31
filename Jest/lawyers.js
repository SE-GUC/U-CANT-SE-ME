const axios = require('axios')

const lawyers = {
    default: async () => {
        return axios.get('http://localhost:3000/api/lawyers/')
    },
    viewTasks: async (lawyerID) => {
        return axios.get(`http://localhost:3000/api/lawyers/lawyerTasks/${lawyerID}`)
    },
    deleteLawyer: async (id) => {
        return axios.delete(`http://localhost:3000/api/lawyers/${id}`)
    },
    deleteReviewer: async (id) => {
        return axios.delete(`http://localhost:3000/api/reviewers/${id}`)
    },
    deleteCase: async (id)=>{
        return axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    deleteInvestor: async(id) => {
        return axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    createInvestor: async (req) => {
        return axios.post('http://localhost:3000/api/investors/', req)
    },
    createCase: async (req)=>{
        return axios.post('http://localhost:3000/api/cases', req)
    },
    createReviewer: async (req)=>{
        return axios.post(`http://localhost:3000/api/reviewers/`, req)
    },
    createLawyer: async (req)=>{
        return axios.post(`http://localhost:3000/api/lawyers/`, req)
    },
    
}

module.exports = lawyers