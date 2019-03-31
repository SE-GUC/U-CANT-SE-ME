// Dependencies
// Dependencies
const express = require("express");
const router = express.Router();

// module Lawyer Controller
const adminController = require("../../controllers/adminController");
const caseController = require("../../controllers/caseController")


//Read
router.get('/',adminController.getAllAdmins);

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

module.exports = router;
