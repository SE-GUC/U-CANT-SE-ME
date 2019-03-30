const axios = require('axios');

const functions = {
  addCommentAsReviewer: async(body,reviewerID,caseID) => {
  const updatedCase = await axios.put(`http://localhost:3000/api/reviewers/addCommentAsReviewer/${reviewerID}/${caseID}`,body);
  return updatedCase;
  },
  createInvestor: async (body) => {
    return await axios.post('http://localhost:3000/api/investors/', body)
  },
  deleteInvestor: async (id) => {
    return await axios.delete(`http://localhost:3000/api/investors/${id}`)
  },
  createCase: async (req) => {
    return await axios.post('http://localhost:3000/api/cases/', req)
  },
  createReviewer: async (req) => {
    return await axios.post('http://localhost:3000/api/reviewers/', req)
  }
};

module.exports = functions;