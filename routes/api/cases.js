// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport")
const caseController = require("../../controllers/caseController");

const allAuth = passport.authenticate(['adminAuth','lawyerAuth','reviewerAuth'],{session: false});
const admin_lawyerAuth = passport.authenticate(['adminAuth','lawyerAuth'],{session: false});
//get all cases
router.get("/",allAuth, caseController.getAllCases);

//get certain case
router.get("/:id", caseController.getCase);

//create case
router.post("/",admin_lawyerAuth, caseController.createCase);

//update
router.put("/:id", caseController.updateCase);

//delete case
router.delete("/:id", caseController.deleteCase);

module.exports = router;
