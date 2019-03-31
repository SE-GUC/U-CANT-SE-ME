const axios = require('axios')

const lawyers = {
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/lawyers/login', loginInfo)
    }
}

module.exports = lawyers