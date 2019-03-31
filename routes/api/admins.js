// Dependencies
// Dependencies
const express = require("express");
const router = express.Router();

// module Lawyer Controller
const adminController = require("../../controllers/adminController");

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

router.post('/login', adminController.login)

//Register Lawyer
router.post('/registerLawyer', adminController.registerLawyer)

//Register Reviewer
router.post('/registerReviewer', adminController.registerReviewer);

module.exports = router;

