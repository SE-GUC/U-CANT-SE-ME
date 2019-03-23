// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const caseController = require("../../controllers/caseController");

//get all cases
router.get("/", caseController.getAllCases());

//get certain case
router.get("/:id", caseController.getCase());

//create case
router.post("/", caseController.createCase());

//delete case
router.delete("/:id", caseController.deleteCase());

//update
router.put("/update/:id", caseController.updateCase());

module.exports = router;
