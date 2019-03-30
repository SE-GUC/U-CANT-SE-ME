const axios = require('axios')

const investors = {
    default: async () => {
        return axios.get('http://localhost:3000/api/investors/')
    },
    registerInvestor: async (req) => {
        return axios.post('http://localhost:3000/api/investors/register', req)
    },
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/investors/login', loginInfo)
    },
    deleteInvestor: async(id) => {
        return axios.delete(`http://localhost:3000/api/investors/${id}`)
    }
}

module.exports = investors
