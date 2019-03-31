const axios = require('axios')

const reviewers = {
    default: async () => {
        return axios.get('http://localhost:3000/api/reviewers/')
    },
    readReviewer: async (id) =>{
        return axios.get(`http://localhost:3000/api/reviewers/${id}`)
    },
    createReviewer: async (req)=>{
        return axios.post('http://localhost:3000/api/reviewers/', req)
    },
    deleteReviewer: async (id) => {
        return axios.delete(`http://localhost:3000/api/reviewers/${id}`)
    },
    updateReviewer: async (id,req) => {
        return axios.put(`http://localhost:3000/api/reviewers/${id}`,req)
    }

}

module.exports = reviewers