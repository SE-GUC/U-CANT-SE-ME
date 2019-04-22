const express = require("express");
const router = express.Router();
const passport = require("passport")

const companyController = require("../../controllers/companyController");
const adminAuth = passport.authenticate('adminAuth',{session: false});

//Get all Companies
router.get("/", companyController.getAllCompanies);

//Get specific Company
router.get("/:id", companyController.getCompany);

//Create a Company
router.post("/",adminAuth, companyController.createCompany);

//Update a Company
router.put("/:id", companyController.updateCompany);

//Delete a Company
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
