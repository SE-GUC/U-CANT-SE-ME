const express = require('express');
const router = express.Router();

const Investor = require('../../models/Investor');

router.get('/', (req, res) => res.send('All Investors'));

module.exports = router;
