const axios = require('axios')

const reviewers = {
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/reviewers/login', loginInfo)
    },
    registerReviewer: async (req) => {
        return axios.post('http://localhost:3000/api/admins/registerReviewer', req)
    },
    deleteReviewer: async (id) => {
        return axios.delete(`http://localhost:3000/api/reviewers/${id}`)
    }
}

module.exports = reviewers