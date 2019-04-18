const express = require("express");
const router = express.Router();

const externalEntityController = require("../../controllers/externalEntityController");

// GET
router.get("/", externalEntityController.getAllExternalEntities);

// GET Specific External Entity
router.get("/:id", externalEntityController.getSpecificExternalEntity);

// POST
router.post("/", externalEntityController.createExternalEntity);

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
