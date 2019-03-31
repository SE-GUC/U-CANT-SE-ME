const axios = require('axios')

const admins = {
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/admins/login', loginInfo)
    },
    createAdmin: async (req) => {
        return axios.post('http://localhost:3000/api/admins/joi', req);
    },
    deleteAdmin: async (id) => {
        return axios.delete(`http://localhost:3000/api/admins/joi/${id}`);
    },
    default: async () => {
        return axios.get('http://localhost:3000/api/admins/')
    },
    registerLawyer: async (req) => {
        return axios.post('http://localhost:3000/api/admins/registerLawyer', req)
    },
    registerReviewer: async (req) => {
        return axios.post('http://localhost:3000/api/admins/registerReviewer', req)
    },
    deleteLawyer: async (id) => {
        return axios.delete(`http://localhost:3000/api/lawyers/${id}`)
    },
    deleteReviewer: async (id) => {
        return axios.delete(`http://localhost:3000/api/reviewers/${id}`)
    }
}

module.exports = admins