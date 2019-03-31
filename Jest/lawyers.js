const axios = require('axios')
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const lawyers = {
    getMyCasesSortedById: async (id) => {
        return axios.get(`http://localhost:3000/api/lawyers/getMyCasesByid/${id}`)
    },
    getMyCasesSortedByDate: async (id) => {
        return axios.get(`http://localhost:3000/api/lawyers/getMyCasesByDate/${id}`)
    },
    createInvestor: async (body) => {
        return axios.post('http://localhost:3000/api/investors/', body)
    },
    deleteInvestor: async (id) => {
        return axios.delete(`http://localhost:3000/api/investors/${id}`)
    },
    createCase: async (req) => {
        return axios.post('http://localhost:3000/api/cases/', req)
    },
    readCase: async (id) =>{
        return axios.get(`http://localhost:3000/api/cases/${id}`)
    },
    deleteCase: async (id) => {
        return axios.delete(`http://localhost:3000/api/cases/${id}`)
    },
    createLawyer: async (body) => {
        return axios.post('http://localhost:3000/api/lawyers/', body)
    },
    deleteLawyer: async (id) => {
        return axios.delete(`http://localhost:3000/api/lawyers/${id}`)
    }
}

module.exports = router
module.exports = lawyers