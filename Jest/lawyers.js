const axios = require('axios')

const lawyers = {
    fillForm: async (id,body) => {
        return axios.post(`http://localhost:3000/api/lawyers/fillForm/${id}`, body)
    },
    getTheCase: async (id) => {
        return axios.get(`http://localhost:3000/api/cases/${id}`)
    }
}

module.exports = lawyers