const axios = require('axios')

const notifications = {
    getAll: async () => {
        return axios.get('http://localhost:3000/api/notifications/')
    },
    createNotification: async (req) => {
        return axios.post('http://localhost:3000/api/notifications/', req)
    },
    readNotification: async (id) =>{
        return axios.get(`http://localhost:3000/api/notifications/${id}`)
    },
    updateNotification: async (id, body) => {
        return axios.put(`http://localhost:3000/api/notifications/${id}`, body)
    },
    deleteNotification: async (id) => {
        return axios.delete(`http://localhost:3000/api/notifications/${id}`)
    }
}

module.exports = notifications