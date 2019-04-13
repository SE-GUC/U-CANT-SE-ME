const express = require("express");


const router = express.Router();

const externalEntityController = require("../../controllers/externalEntityController")
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

router.post('/create-pdf',externalEntityController.infoINPost);
router.get('/create-pdf/:id',externalEntityController.infoINGet);


module.exports = router;
