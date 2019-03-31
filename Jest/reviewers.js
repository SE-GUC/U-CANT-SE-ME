const axios = require('axios');

const reviewers = {
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
                return await axios.post('http://localhost:3000/api/investors', req)
        },
        createCase: async (req)=>{
                return await axios.post('http://localhost:3000/api/cases', req)
        },
        deleteInvestor: async (id)=>{
                return await axios.delete(`http://localhost:3000/api/investors/${id}`)
        },
        deleteCase: async (id)=>{
                return await axios.delete(`http://localhost:3000/api/cases/${id}`)
        },
        createReviewer: async(req)=>{
                return await axios.post("http://localhost:3000/api/reviewers/", req);
        },
        deleteReviewer: async id => {
                return await axios.delete(`http://localhost:3000/api/reviewers/${id}`);
        },
        default: async () => {
                return await axios.get('http://localhost:3000/api/reviewers/')
        },
        viewTasks: async (reviewerID) => {
                return await axios.get(`http://localhost:3000/api/reviewers/reviewerTasks/${reviewerID}`)
        },
        deleteLawyer: async (id) => {
                return await axios.delete(`http://localhost:3000/api/lawyers/${id}`)
        },
        createLawyer: async (req)=>{
                return await axios.post(`http://localhost:3000/api/lawyers/`, req)
        },
        getLastLawyer: async (id) =>{
            return await axios.get(`http://localhost:3000/api/reviewers/getCaseLastLawyer/${id}`)
        },
        addCommentAsReviewer: async(body,reviewerID,caseID) => {
        const updatedCase = await axios.put(`http://localhost:3000/api/reviewers/addCommentAsReviewer/${reviewerID}/${caseID}`,body);
        return updatedCase;
        }   
};
module.exports = reviewers;