const axios = require('axios')

const investors = {
    viewComments: async (investorID, caseID) => {
        return axios.get(`http://localhost:3000/api/investors/lawyerComments/${investorID}/${caseID}`)
    }
}

module.exports = investors