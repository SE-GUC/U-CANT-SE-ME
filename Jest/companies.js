const axios = require('axios')

const companies = {
    default: async () => {
        return axios.get('http://localhost:3000/api/companies/')
    },
    createCompany: async (req) => {
        return axios.post('http://localhost:3000/api/companies/', req)
    },
    readCompany: async (id) =>{
        return axios.get(`http://localhost:3000/api/companies/${id}`)
    },
    updateCompany: async (id, newName) => {
        return axios.put(`http://localhost:3000/api/companies/${id}`, newName)
    },
    deleteCompany: async (id) => {
        return axios.delete(`http://localhost:3000/api/companies/${id}`)
    },
    createInvestor: async (req)=>{
        return axios.post('http://localhost:3000/api/investors', req)
    },
    deleteInvestor: async (id)=>{
        return axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    createCase: async (req)=>{
        return axios.post('http://localhost:3000/api/cases', req)
    },
    deleteCase: async (id)=>{
        return axios.delete(`http://localhost:3000/api/cases/${id}`)
    }
}

module.exports = companies