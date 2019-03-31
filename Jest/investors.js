const axios = require('axios')

const investors = {
    login: async (loginInfo) => {
        return await axios.post('http://localhost:3000/api/investors/login', loginInfo)
    },
    trackMyCompany: async (id) =>{
        return await axios.get(`http://localhost:3000/api/investors/trackMyCompany/${id}`)
    },
    createCase: async (req) =>{
        return await axios.post('http://localhost:3000/api/cases/',req)
    },
    deleteCase: async (id) =>{
        return await axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    createInvestor: async (req) =>{
        return await axios.post('http://localhost:3000/api/investors/',req)
    },
    deleteInvestor: async (id) =>{
        return await axios.delete(`http://localhost:3000/api/investors/${id}`)
    }

}

module.exports = investors
