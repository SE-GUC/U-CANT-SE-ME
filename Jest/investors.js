const axios = require('axios')

const investors = {
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/investors/login', loginInfo)
    },
    getMyCompanies: async (investorID) => {
        return await axios.get(`http://localhost:3000/api/investors/myCompanies/${investorID}`);
    }
}

module.exports = investors