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

router.get('/lawyer/getAllCases',lawyerController.GetAllCases);

//View due tasks
router.get('/lawyerTasks/:lawyerID', lawyerController.viewTasks);

//Accept or Reject Form
router.put('/updateCaseStatus/:caseId/:caseStatus', lawyerController.AcceptRejectForm);

// As a lawyer i should be able to see all unsigned cases
router.get("/getAllUnsignedCases/:id", lawyerController.getWaitingForLawyerCase);

router.get("/assignCase/:id/:caseId", lawyerController.getSpecificWaitingForLawyerCase);

//as a lawyer i should be able to fill a form creating a new case
router.post('/fillForm/:id', lawyerController.fillForm);

module.exports = router;
