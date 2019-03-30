const axios = require("axios");

const investors = {
  readAllInvestors: async () => {
    return axios.get("http://localhost:3000/api/investors");
  },
  readInvestor: async id => {
    return axios.get(`http://localhost:3000/api/investors/${id}`);
  },
  createInvestor: async body => {
    return axios.post("http://localhost:3000/api/investors", body);
  },
  updateInvestor: async (id, body) => {
    return axios.put(`http://localhost:3000/api/investors/${id}`, body);
  },
  deleteInvestor: async id => {
    return axios.delete(`http://localhost:3000/api/investors/${id}`);
  },
  login: async loginInfo => {
    return axios.post("http://localhost:3000/api/investors/login", loginInfo);
  }
};

module.exports = investors;
