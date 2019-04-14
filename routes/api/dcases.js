// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const caseController = require("../../controllers/dcaseController");

//get all cases
router.get("/", caseController.getAllCases);

//get certain case
router.get("/:id", caseController.getCase);

//create case
router.post("/", caseController.createCase);

//update
router.put("/:id", caseController.updateCase);

//delete case
router.delete("/:id", caseController.deleteCase);

module.exports = router;
