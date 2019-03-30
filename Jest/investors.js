const axios = require('axios')

const investors = {
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/investors/login', loginInfo)
    },
    trackMyCompany: async (id) =>{
        return axios.get(`http://localhost:3000/api/investors/trackMyCompany/${id}`)
    },
    createCase: async (req) =>{
        return axios.post('http://localhost:3000/api/cases/',req)
    },
    deleteCase: async (id) =>{
        return axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    createInvestor: async (req) =>{
        return axios.post('http://localhost:3000/api/investors/',req)
    },
    deleteInvestor: async (id) =>{
        return axios.delete(`http://localhost:3000/api/investors/${id}`)
    }

}

module.exports = investors