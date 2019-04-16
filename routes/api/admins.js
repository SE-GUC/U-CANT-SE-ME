// Dependencies
// Dependencies
const express = require("express");
const router = express.Router();

// module Lawyer Controller
const adminController = require("../../controllers/adminController");
const caseController = require("../../controllers/caseController");
const formTemplateController = require("../../controllers/formTemplateController");

//Read
router.get("/", adminController.getAllAdmins);

router.get("/:id", adminController.getAdmin);

//Create
router.post("/", adminController.createAdmin);

//Update
router.put("/:id", adminController.updateAdmin);

//Delete
router.delete("/:id", adminController.deleteAdmin);

//Get all Cases
router.get("/admin/getAllCases", adminController.getAllCases);

//get last lawyer worked on case
router.get("/getCaseLastLawyer/:id", caseController.getCaseLastLawyer);

//Register Lawyer
router.post("/registerLawyer", adminController.registerLawyer);

//Register Reviewer
router.post("/registerReviewer", adminController.registerReviewer);

//Login
router.post("/login", adminController.loginAdmin);

//Create FormTemplate
router.post("/createFormTemplate", formTemplateController.createFormTemplate);

module.exports = router;
