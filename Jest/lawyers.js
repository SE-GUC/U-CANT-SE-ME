const axios = require('axios');

const lawyers = {
  addCommentAsLawyer: async(body,lawyerID,caseID) => {
  const updatedCase = await axios.put(`http://localhost:3000/api/lawyers/addCommentAsLawyer/${lawyerID}/${caseID}`,body);
  return updatedCase;
  }
};

module.exports = lawyers;