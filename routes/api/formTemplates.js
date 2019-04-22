// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport")

const formTemplateController = require("../../controllers/formTemplateController");
const adminAuth = passport.authenticate('adminAuth',{session: false});

//get all formTemplates
router.get("/",adminAuth, formTemplateController.getAllFormTemplates);

//get certain formTemplate
router.get("/:id", formTemplateController.getFormTemplate);

//create formTemplate
router.post("/", adminAuth,formTemplateController.createFormTemplate);

//update formTemplates
router.put("/:id", formTemplateController.updateFormTemplate);

//delete formTemplate
router.delete("/:id", formTemplateController.deleteFormTemplate);

module.exports = router;
