const axios = require('axios')

const lawyers = {
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/lawyers/login', loginInfo)
    },
    registerLawyer: async (req) => {
        return axios.post('http://localhost:3000/api/admins/registerLawyer', req)
    },
    deleteLawyer: async (id) => {
        return axios.delete(`http://localhost:3000/api/lawyers/${id}`)
    }
}

module.exports = lawyers