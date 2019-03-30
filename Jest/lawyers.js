const axios = require('axios');

const functions = {
  addCommentAsLawyer: async(body,lawyerID,caseID) => {
  const updatedCase = await axios.put(`http://localhost:3000/api/lawyers/addCommentAsLawyer/${lawyerID}/${caseID}`,body);
  return updatedCase;
  }
};

module.exports = functions;