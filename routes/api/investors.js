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

//As an investor I should be able to view the lawyer’s comments on my company establishment form, 
//so that I know what should be changed or updated in my form.
router.get('/lawyerComments/:investorID/:caseID', investorController.viewLawyerComments);
router.get('/myCompanies/:investorID',investorController.getMyCompanies);

module.exports = router;
