const axios = require('axios')

const admins = {
    default: async () => {
        return await axios.get('http://localhost:3000/api/admins/')
    },
    registerLawyer: async (req) => {
        return await axios.post('http://localhost:3000/api/admins/registerLawyer', req)
    },
    registerReviewer: async (req) => {
        return await axios.post('http://localhost:3000/api/admins/registerReviewer', req)
    },
    deleteLawyer: async (id) => {
        return await axios.delete(`http://localhost:3000/api/lawyers/${id}`)
    },
    deleteReviewer: async (id) => {
        return await axios.delete(`http://localhost:3000/api/reviewers/${id}`)
    },
    loginAdmin: async (loginInfo) => {
        return axios.post('http://localhost:3000/api/admins/login', loginInfo)
    },
    createAdmin: async (req) => {
        return axios.post('http://localhost:3000/api/admins/joi', req);
    },
    deleteAdmin: async (id) => {
        return axios.delete(`http://localhost:3000/api/admins/joi/${id}`);
    },
    createLawyer: async (req) =>{
        return await axios.post('http://localhost:3000/api/lawyers/',req)
    },
    createCase: async (req) =>{
        return await axios.post('http://localhost:3000/api/cases/',req)
    },
    deleteCase: async (id) =>{
        return await axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    createInvestor: async (req) =>{
        return await axios.post('http://localhost:3000/api/investors/',req)
    },
    deleteInvestor: async (id) =>{
        return await axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    getLastLawyer: async (id) =>{
        return await axios.get(`http://localhost:3000/api/reviewers/getCaseLastLawyer/${id}`)
    },
    getAllCasesAdmin : async()=>{
        let allCases= await axios.get("http://localhost:3000/api/admins/admin/getAllCases");
        return allCases;
       }
}

module.exports = admins