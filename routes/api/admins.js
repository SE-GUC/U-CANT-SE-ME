// Dependencies
// Dependencies
const express = require("express");
const router = express.Router();
const passport = require('passport')
// module Lawyer Controller
const adminController = require("../../controllers/adminController");
const caseController = require("../../controllers/caseController")
const formTemplateController = require("../../controllers/formTemplateController");

//Read
router.get('/',passport.authenticate('jwt',{session: false}),adminController.getAllAdmins);

router.get("/:id", adminController.getAdmin);

//Create
router.post('/joi', adminController.createAdmin);

//Update
router.put("/update/:id", adminController.updateAdmin);

//Delete
router.delete("/joi/:id", adminController.deleteAdmin);

router.get('/admin/getAllCases',adminController.GetAllCases);

//get last lawyer worked on case
router.get("/getCaseLastLawyer/:id", caseController.getCaseLastLawyer);

//Register Lawyer
router.post('/registerLawyer', adminController.registerLawyer)

//Register Reviewer
router.post('/registerReviewer', adminController.registerReviewer);

//Login
router.post('/login', adminController.loginAdmin)

//Create FormTemplate
router.post('/createFormTemplate', formTemplateController.createFormTemplate)

module.exports = router;
