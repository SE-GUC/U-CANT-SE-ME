
const axios = require('axios')

const cases = {
    default: async () => {
        return axios.get('http://localhost:3000/api/cases/')
    },
    createCase: async (req) => {
        return axios.post('http://localhost:3000/api/cases/', req)
    },
    readCase: async (id) =>{
        return axios.get(`http://localhost:3000/api/cases/${id}`)
    },
    updateCase: async (id, body) => {
        return axios.put(`http://localhost:3000/api/cases/update/${id}`, body)
    },
    deleteCase: async (id) => {
        return axios.delete(`http://localhost:3000/api/cases/${id}`)
    }
}

module.exports = cases