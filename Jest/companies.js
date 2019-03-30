const axios = require('axios')

const companies = {
    default: async () => {
        return axios.get('http://localhost:3000/api/companies/')
    },
    createCompany: async (req) => {
        return axios.post('http://localhost:3000/api/companies/', req)
    },
    readCompany: async (id) =>{
        return axios.get(`http://localhost:3000/api/companies/${id}`)
    },
    updateCompany: async (id, newName) => {
        return axios.put(`http://localhost:3000/api/companies/${id}`, newName)
    },
    deleteCompany: async (id) => {
        return axios.delete(`http://localhost:3000/api/companies/${id}`)
    }
}

module.exports = companies