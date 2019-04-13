const express = require("express");
const router = express.Router();
const externalEntityController = require("../../controllers/externalEntityController")
const LawyerController = require("../../controllers/LawyerController")
// GET
router.get("/", externalEntityController.getAllExternalEntities);

// GET Specific External Entity
router.get("/:id", externalEntityController.getSpecificExternalEntity);

// POST
router.post("/", externalEntityController.createExternalEntity);

// PUT
router.put("/:id", externalEntityController.updateExternalEntity);

// DELETE
router.delete("/:id",externalEntityController.deleteExternalEntity);

// This route should called whenever a lawyer fills a form or alternatively
// the generateSPCPdf function should be callled
router.get("/pdf/:id", externalEntityController.generateSPCPdf);



module.exports = router;
