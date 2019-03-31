const axios = require("axios");

const investors = {
  default: async () => {
    return await axios.get("http://localhost:3000/api/investors/");
  },
  registerInvestor: async req => {
    return await axios.post(
      "http://localhost:3000/api/investors/register",
      req
    );
  },
  viewComments: async (investorID, caseID) => {
    return await axios.get(
      `http://localhost:3000/api/investors/lawyerComments/${investorID}/${caseID}`
    );
  },
  readAllInvestors: async () => {
    return await axios.get("http://localhost:3000/api/investors");
  },
  readInvestor: async id => {
    return await axios.get(`http://localhost:3000/api/investors/${id}`);
  },
  createInvestor: async body => {
    return await axios.post("http://localhost:3000/api/investors", body);
  },
  updateInvestor: async (id, body) => {
    return await axios.put(`http://localhost:3000/api/investors/${id}`, body);
  },
  deleteInvestor: async id => {
    return await axios.delete(`http://localhost:3000/api/investors/${id}`);
  },
  login: async loginInfo => {
    return await axios.post(
      "http://localhost:3000/api/investors/login",
      loginInfo
    );
  },
  updateCase: async (id, req) => {
    return await axios.put(`http://localhost:3000/api/cases/update/${id}`, req);
  },
  viewMyFees: async id => {
    const ret = await axios.get(
      `http://localhost:3000/api/investors/viewMyFees/${id}`
    );
    return ret.data.response;
  },
  payFees: async (investorId, caseId) => {
    return axios.post(`http://localhost:3000/api/investors/payFees/${investorId}/${caseId}`);
  },
  createCase: async req => {
    const cas = await axios.post("http://localhost:3000/api/cases/", req);

    return cas.data.data;
  },

  deleteCase: async id => {
    return await axios.delete(`http://localhost:3000/api/cases/${id}`);
  },
  changeStatus: async (id, req) => {
    await axios.put(`http://localhost:3000/api/cases/update/${id}`, req);
  },
  getMyCompanies: async (investorID) => {
    return await axios.get(`http://localhost:3000/api/investors/myCompanies/${investorID}`);
  }, trackMyCompany: async (id) =>{
    return axios.get(`http://localhost:3000/api/investors/trackMyCompany/${id}`)
  },
  createCase2: async (req) =>{
    return axios.post('http://localhost:3000/api/cases/',req)
},
deleteCase2: async (id) =>{
    return axios.delete(`http://localhost:3000/api/cases/${id}`)
},
createInvestor2: async (req) =>{
    return axios.post('http://localhost:3000/api/investors/',req)
},
deleteInvestor2: async (id) =>{
    return axios.delete(`http://localhost:3000/api/investors/${id}`)
}

};

module.exports = investors;
