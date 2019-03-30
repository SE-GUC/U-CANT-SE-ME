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
    }
}

module.exports = router
module.exports = lawyers