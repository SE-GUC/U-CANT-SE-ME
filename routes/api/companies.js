const express = require("express");
const router = express.Router();

const companyController = require("../../controllers/companyController");

//Get all Companies
router.get("/", companyController.getAllCompanies);

//Get specific Company
router.get("/:id", companyController.getCompany);

//Create a Company
router.post("/", companyController.createCompany);

//Update a Company
router.put("/:id", companyController.updateCompany);

//Delete a Company
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
