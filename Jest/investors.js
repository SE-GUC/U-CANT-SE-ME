const axios = require('axios')

const investors = {
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/investors/login', loginInfo)
    }
}

module.exports = investors