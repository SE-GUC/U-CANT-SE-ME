// Dependencies
const express = require("express");
const router = express.Router();

// module Lawyer Controller
const lawyerController = require("../../controllers/lawyerController")


//Read
router.get('/', lawyerController.getAllLawyers);

router.get('/:id', lawyerController.getLawyer);

//Create
router.post('/', lawyerController.createLawyer);

//Update
router.put('/:id', lawyerController.updateLawyer);

//Delete
router.delete('/:id', lawyerController.deleteLawyer);

// As a lawyer i should be able to see all unsigned cases
router.get("/getAllUnsignedCases/:id", lawyerController.getWaitingForLawyerCase);

router.get("/assignCase/:id/:caseId", lawyerController.getSpecificWaitingForLawyerCase);


module.exports = router;
