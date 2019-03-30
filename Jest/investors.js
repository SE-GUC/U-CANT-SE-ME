const axios = require('axios')

const investors = {
    readAllInvestors: async () => {
        return axios.get('http://localhost:3000/api/investors');
    },
    readInvestor: async (id) => {
        return axios.get(`http://localhost:3000/api/investors/${id}`);
    },
    createInvestor: async (body) => {
        return axios.post('http://localhost:3000/api/investors', body);
    },
    updateInvestor: async (id, body) => {
        return axios.put(`http://localhost:3000/api/investors/${id}`, body);
    },
    deleteInvestor: async (id) => {
        return axios.delete(`http://localhost:3000/api/investors/${id}`);
    },
    login: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/investors/login', loginInfo)
    }
}

async function httpRequest(method, urlSuffix, params = [], body = {}) {
    let url = "http://localhost:3000/api/" + urlSuffix + "/";
    for (let i = 0; i < params.length; i++) url += params[i] + "/";
    if (method === "GET") return await axios.get(url);
    else if (method === "POST") return await axios.post(url, body);
    else if (method === "PUT") return await axios.put(url, body);
    else if (method === "DELETE") return await axios.delete(url);
    return {};
  }

module.exports = investors
