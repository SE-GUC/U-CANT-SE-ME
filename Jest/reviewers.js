const axios = require('axios')
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const reviewers = {
    getMyCasesSortedById: async (id) => {
        return axios.get(`http://localhost:3000/api/reviewers/getMyCasesByid/${id}`)
    },
    getMyCasesSortedByDate: async (id) => {
        return axios.get(`http://localhost:3000/api/reviewers/getMyCasesByDate/${id}`)
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
    createReviewer: async (body) => {
        return axios.post('http://localhost:3000/api/reviewers/', body)
    },
    deleteReviewer: async (id) => {
        return axios.delete(`http://localhost:3000/api/reviewers/${id}`)
    }
}

module.exports = router
module.exports = reviewers