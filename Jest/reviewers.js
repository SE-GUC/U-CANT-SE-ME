const axios = require('axios')

const reviewers = {
    default: async () => {
        return await axios.get('http://localhost:3000/api/reviewers/')
    },
    readReviewer: async (id) =>{
        return await axios.get(`http://localhost:3000/api/reviewers/${id}`)
    },
    createReviewer: async (req)=>{
        return await axios.post('http://localhost:3000/api/reviewers/', req)
    },
    deleteReviewer: async (id) => {
        return await axios.delete(`http://localhost:3000/api/reviewers/${id}`)
    },
    updateReviewer: async (id,req) => {
        return await axios.put(`http://localhost:3000/api/reviewers/${id}`,req)
    }

}

module.exports = reviewers
