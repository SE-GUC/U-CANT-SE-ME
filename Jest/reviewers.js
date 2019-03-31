const axios = require('axios');

const reviewers = {
  addCommentAsReviewer: async(body,reviewerID,caseID) => {
  const updatedCase = await axios.put(`http://localhost:3000/api/reviewers/addCommentAsReviewer/${reviewerID}/${caseID}`,body);
  return updatedCase;
  }
};

module.exports = reviewers;