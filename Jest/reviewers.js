const axios = require('axios')

const reviewers = {
    default: async () => {
        return axios.get('http://localhost:3000/api/reviewers/')
    },
    viewTasks: async (reviewerID) => {
        return axios.get(`http://localhost:3000/api/reviewers/reviewerTasks/${reviewerID}`)
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

module.exports = reviewers