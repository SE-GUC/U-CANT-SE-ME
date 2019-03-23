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

module.exports = router;
