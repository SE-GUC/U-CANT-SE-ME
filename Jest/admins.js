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
    }
}

module.exports = admins