const express = require("express");
const router = express.Router();
const passport = require("passport")

const adminAuth = passport.authenticate('adminAuth',{session: false});
const externalEntityController = require("../../controllers/externalEntityController");

// GET
router.get("/", adminAuth,externalEntityController.getAllExternalEntities);

// GET Specific External Entity
router.get("/:id", externalEntityController.getSpecificExternalEntity);

// POST
router.post("/", adminAuth,externalEntityController.createExternalEntity);

// PUT
router.put("/:id", externalEntityController.updateExternalEntity);

// DELETE
router.delete("/:id", externalEntityController.deleteExternalEntity);

// GENERATE SSC Company PDF
router.post("/create-SSCpdf", externalEntityController.postSSCPDF);

router.get("/create-SSCpdf/:id", externalEntityController.getSSCPDF);

//SPC
router.get("/pdf/:id", externalEntityController.generateSPCPdf);

module.exports = router;
