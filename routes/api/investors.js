const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const investorController = require("../../controllers/investorController");

//READ
router.get("/", investorController.getAllInvestors);

router.get("/:id", investorController.getInvestor);

//CREATE
router.post("/", investorController.createInvestor);

//UPDATE
router.put("/:id", investorController.updateInvestor);

//DELETE
router.delete("/:id", investorController.deleteInvestor);

module.exports = router;
