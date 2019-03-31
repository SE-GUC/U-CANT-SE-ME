const axios = require('axios')

const investors = {
    default: async () => {
        return await axios.get('http://localhost:3000/api/investors/')
    },
    registerInvestor: async (req) => {
        return await axios.post('http://localhost:3000/api/investors/register', req)
    },
    deleteInvestor: async(id) => {
        return await axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    login: async (loginInfo) => {
        return await axios.post('http://localhost:3000/api/investors/login', loginInfo)
    }
}

module.exports = investors
