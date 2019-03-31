const axios = require("axios");

const lawyers = {
  getLawyers: async () => {
    let getAll = await axios.get("http://localhost:3000/api/lawyers");
    return getAll;
  },
  getOneLawyer: async id => {
    let getOne= await axios.get(`http://localhost:3000/api/lawyers/${id}`);
    return getOne;
  },
  createLawyer: async body => {
    let createOne = await axios.post("http://localhost:3000/api/lawyers/",body);
    return createOne;
  },
  deleteLawyer: async id => {
    let deleteOne = await axios.delete(`http://localhost:3000/api/lawyers/${id}`);
    return deleteOne;
  },
  updateLawyer: async (id, body) => {
    let updateOne =await axios.put(`http://localhost:3000/api/lawyers/${id}`,body);
    return updateOne;
  },
  getAllCases: async () => {
    return await axios.get("http://localhost:3000/api/cases/");
  },
  getCase: async id => {
    return await axios.get(`http://localhost:3000/api/cases/${id}`);
  },
  getWaitingForLawyerCase: async id => {
    return await axios.get(
      `http://localhost:3000/api/lawyers/getAllUnsignedCases/${id}`
    );
  },
  getSpecificWaitingForLawyerCase: async (id, caseId) => {
    return await axios.get(
      `http://localhost:3000/api/lawyers/assignCase/${id}/${caseId}`
    );
  },
  createInvestor: async req => {
    return await axios.post("http://localhost:3000/api/investors", req);
  },
  createCase: async req => {
    return await axios.post("http://localhost:3000/api/cases", req);
  },
  deleteInvestor: async id => {
    return await axios.delete(`http://localhost:3000/api/investors/${id}`);
  },
  deleteCase: async id => {
    return await axios.delete(`http://localhost:3000/api/cases/${id}`);
  },
  default: async () => {
        return await axios.get('http://localhost:3000/api/lawyers/')
  },
  viewTasks: async (lawyerID) => {
        return await axios.get(`http://localhost:3000/api/lawyers/lawyerTasks/${lawyerID}`)
  },
  deleteReviewer: async (id) => {
        return await axios.delete(`http://localhost:3000/api/reviewers/${id}`)
  },
  createReviewer: async (req)=>{
        return await axios.post(`http://localhost:3000/api/reviewers/`, req)
  },
  getLastLawyer: async (id) =>{
      return await axios.get(`http://localhost:3000/api/reviewers/getCaseLastLawyer/${id}`)
  }
};
module.exports = lawyers;