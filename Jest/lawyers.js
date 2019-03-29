const axios = require('axios');
const functions = {
        getAllCases: async () => {
                return await axios.get("http://localhost:3000/api/cases/")
        },
        getCase: async (id) => {
                return await axios.get(`http://localhost:3000/api/cases/${id}`)
        },
        getWaitingForLawyerCase: async (id) => {
                return await axios.get(`http://localhost:3000/api/lawyers/getAllUnsignedCases/${id}`)
        },
	    getSpecificWaitingForLawyerCase: async (id,caseId) => {
                return await axios.get(`http://localhost:3000/api/lawyers/assignCase/${id}/${caseId}`)
        }
};
module.exports = functions;