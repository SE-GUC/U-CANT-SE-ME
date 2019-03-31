const axios = require('axios')

const reviewers = {
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/reviewers/login', loginInfo)
    }
}

module.exports = reviewers