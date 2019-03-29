const axios = require('axios');
const functions = {
	getWaitingForLawyerCase: async () => {
        const response = await axios.get('http://localhost:3000/api/lawyers/getAllUnsignedCases/5c9645f36e2ef06af84adccf')
        return response
        },
        
};
module.exports = functions;