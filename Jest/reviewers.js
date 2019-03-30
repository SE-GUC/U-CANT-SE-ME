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
    }
}

module.exports = router
module.exports = reviewers