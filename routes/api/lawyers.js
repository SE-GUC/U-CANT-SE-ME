// Dependencies
const express = require("express");
const router = express.Router();

// module Lawyer Controller
const lawyerController = require("../../controllers/lawyerController")
const caseController = require("../../controllers/caseController")
const externalEntityController = require("../../controllers/externalEntityController")

//Read
router.get('/', lawyerController.getAllLawyers);

router.get('/:id', lawyerController.getLawyer);

//Create
router.post('/', lawyerController.createLawyer);

//Update
router.put('/:id', lawyerController.updateLawyer);

//Delete
router.delete('/:id', lawyerController.deleteLawyer);

router.get('/lawyer/getAllCases',lawyerController.getAllCases);

//View due tasks
router.get('/lawyerTasks/:lawyerId', lawyerController.viewTasks);

//Accept or Reject Form
router.put('/updateCaseStatus/:caseId/:caseStatus', lawyerController.acceptRejectForm);

// As a lawyer i should be able to see all unsigned cases
router.get("/getAllUnsignedCases/:id", lawyerController.getWaitingForLawyerCase);

router.get("/assignCase/:id/:caseId", lawyerController.getSpecificWaitingForLawyerCase);

//get last lawyer worked on case
router.get("/getCaseLastLawyer/:id", caseController.getCaseLastLawyer);

//Login
router.post('/login', lawyerController.loginLawyer)

//As a lawyer i should be able to update a company establishment form made by my self.
router.put("/update/:id/:caseId",lawyerController.updateCompanyForm);

// As a Lawyer i should be able to add a comment on a rejected company establishment form
// made by an investor, so that the investor is aware of the required changes in the form.
router.put("/addCommentAsLawyer/:lawyerId/:caseId", lawyerController.addCommentAsLawyer);

// as a lawyer i should be able to fill a company creation form
router.post("/fillForm/:id",lawyerController.fillForm);

//as a lawyer i should be able to find my assigned cases sorted by id
router.get("/getMyCasesByid/:id",lawyerController.getMyCasesByid);

//as a lawyer i should be able to find my assigned cases sorted by date of creation
router.get("/getMyCasesByDate/:id",lawyerController.getMyCasesByDate);

router.post('/forgot', lawyerController.forgot)

router.post('/reset/:token', lawyerController.reset)


















router.get('/downloadContract/:id',externalEntityController.getSSCPDF);
router.get('/viewContract/:id',externalEntityController.viewSSCPDF);


//As a lawyer i should be able to request change from the investor on his case
router.put('/requestUpdate/:caseId/:assignedLawyerId', lawyerController.requestUpdate);

//As a lawyer i should update my case status after a reviewer requested a change
router.put('/resumeWorkOnCase/:caseId/:assignedLawyerId', lawyerController.resumeWorkOnCase);
// As a lawyer I should be able to view the generated decision/form for some case
router.get('/viewDecision/:id',externalEntityController.viewSPCHtml)
// As a lawyer, I should be able to download the pdf for a decision
router.get('/downloadDecision/:id',externalEntityController.generateSPCPdf)
module.exports = router;
