const axios = require("axios");
function createURL(urlSuffix, params = []) {
  let url = "http://localhost:3000/api/" + urlSuffix + "/";
  for (let i = 0; i < params.length; i++) url += params[i] + "/";
  return url;
}
const functions = {
  getLawyers: async () => {
    let getAll = await axios.get(createURL("lawyers"));
    return getAll;
  },
  getOneLawyer: async id => {
    let getOne = await axios.get(createURL("lawyers", [id]));
    return getOne;
  },
  createLawyer: async body => {
    let createOne = await axios.post(createURL("lawyers"), body);
    return createOne;
  },
  deleteLawyer: async id => {
    let deleteOne = await axios.delete(createURL("lawyers", [id]));
    return deleteOne;
  },
  updateLawyer: async (id, body) => {
    let updateOne = await axios.put(createURL("lawyers", [id]), body);
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
    return axios.post("http://localhost:3000/api/investors", req);
  },
  createCase: async req => {
    return axios.post("http://localhost:3000/api/cases", req);
  },
  deleteInvestor: async id => {
    return axios.delete(`http://localhost:3000/api/investors/${id}`);
  },
  deleteCase: async id => {
    return axios.delete(`http://localhost:3000/api/cases/${id}`);
  }
};
module.exports = functions;
