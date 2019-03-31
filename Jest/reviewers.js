const axios = require('axios');
const reviewers = {
        login: async (loginInfo) => {
            return axios.post('http://localhost:3000/api/reviewers/login', loginInfo)
        },
        registerReviewer: async (req) => {
            return axios.post('http://localhost:3000/api/admins/registerReviewer', req)
        },
        getAllCases: async () => {
                return await axios.get("http://localhost:3000/api/cases/")
        },
        getCase: async (id) => {
                return await axios.get(`http://localhost:3000/api/cases/${id}`)
        },
	      getWaitingForReviewersCase: async (id) => {
                return await axios.get(`http://localhost:3000/api/reviewers/getAllUnsignedCases/${id}`)
        },
	      getSpecificWaitingForReviewersCase: async (id,caseId) => {
                return await axios.get(`http://localhost:3000/api/reviewers/assignCase/${id}/${caseId}`)
        },
        createInvestor: async (req)=>{
                return axios.post('http://localhost:3000/api/investors', req)
        },
        createCase: async (req)=>{
                return axios.post('http://localhost:3000/api/cases', req)
        },
        deleteInvestor: async (id)=>{
                return axios.delete(`http://localhost:3000/api/investors/${id}`)
        },
        deleteCase: async (id)=>{
                return axios.delete(`http://localhost:3000/api/cases/${id}`)
        },
        createReviewer: async(req)=>{
                return axios.post("http://localhost:3000/api/reviewers/", req);
        },
        deleteReviewer: async id => {
                return axios.delete(`http://localhost:3000/api/reviewers/${id}`);
        },
        default: async () => {
                return axios.get('http://localhost:3000/api/reviewers/')
        },
        viewTasks: async (reviewerID) => {
                return axios.get(`http://localhost:3000/api/reviewers/reviewerTasks/${reviewerID}`)
        },
        deleteLawyer: async (id) => {
                return axios.delete(`http://localhost:3000/api/lawyers/${id}`)
        },
        createLawyer: async (req)=>{
                return axios.post(`http://localhost:3000/api/lawyers/`, req)
        }
        
};
module.exports = reviewers;
