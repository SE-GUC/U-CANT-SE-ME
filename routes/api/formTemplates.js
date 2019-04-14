// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const formTemplateController = require("../../controllers/formTemplateController");

//get all formTemplates
router.get("/", formTemplateController.getAllFormTemplates);

//get certain formTemplate
router.get("/:id", formTemplateController.getFormTemplate);

//create formTemplate
router.post("/", formTemplateController.createFormTemplate);

//update formTemplates
router.put("/:id", formTemplateController.updateFormTemplate);

//delete formTemplate
router.delete("/:id", formTemplateController.deleteFormTemplate);

module.exports = router;
