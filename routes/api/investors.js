const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const investorController = require("../../controllers/investorController");

//READ
router.get("/", investorController.getAllInvestors);

router.get("/:id", investorController.getInvestor);

//CREATE
router.post("/", investorController.createInvestor);
router.post("/register", investorController.register);
//UPDATE
router.put("/:id", investorController.updateInvestor);

//DELETE
router.delete("/:id", investorController.deleteInvestor);

//As an investor I should be able to view the lawyer’s comments on my company establishment form,
//so that I know what should be changed or updated in my form.
router.get('/lawyerComments/:investorID/:caseID', investorController.viewLawyerComments);

//As an investor I should be able to update my company establishment form,
//so that I can change or correct its content.
router.put("/updateForm/:investorId/:caseId", investorController.updateForm);

router.get('/myCompanies/:investorID',investorController.getMyCompanies);

router.get('/trackMyCompany/:id', investorController.trackMyCompany);

// As an investor I should be able to view my fees
router.get('/viewMyFees/:id', investorController.viewMyFees);

//As an investor I should be able to pay the fees of my approved company establishment request.
router.post('/payFees/:investorId/:caseId', investorController.payFees);

// As an investor I should be able to fill a company establishment form
router.post("/fillForm/:investorId",investorController.fillForm);

// As an investor I should be able to log in to the external portal, 
// so that I can use the system’s facilities.

router.post('/login', investorController.login)

module.exports = router;
