// Dependencies
const express = require("express");
const router = express.Router();

// module Lawyer Controller
const lawyerController = require("../../controllers/lawyerController")
const caseController = require("../../controllers/caseController")


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

//get last lawyer worked on case
router.get("/getCaseLastLawyer/:id", caseController.getCaseLastLawyer);

//Login
router.post('/login', lawyerController.loginLawyer)

//As a lawyer i should be able to update a company establishment form made by my self.
router.put("/update/:id/:caseId",lawyerController.updateCompanyForm);

//as a lawyer i should be able to fill a form creating a new case
router.post('/fillForm/:id', lawyerController.fillForm);

// As a Lawyer i should be able to add a comment on a rejected company establishment form
// made by an investor, so that the investor is aware of the required changes in the form.
router.put("/addCommentAsLawyer/:lawyerID/:caseID", lawyerController.addCommentAsLawyer);
module.exports = router;
