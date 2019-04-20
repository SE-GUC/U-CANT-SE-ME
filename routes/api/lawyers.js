// Dependencies
const express = require("express");
const router = express.Router();
const passport = require('passport')
// module Lawyer Controller
const lawyerController = require("../../controllers/lawyerController")
const caseController = require("../../controllers/caseController")
const externalEntityController = require("../../controllers/externalEntityController")

const adminAuth = passport.authenticate('adminAuth',{session: false});
const lawyerAuth = passport.authenticate('lawyerAuth',{session: false});
const allAuth = passport.authenticate(['adminAuth','lawyerAuth','reviewerAuth'],{session: false});
const admin_lawyerAuth = passport.authenticate(['adminAuth','lawyerAuth'],{session: false});

//authorization
router.get('/auth',lawyerAuth, (req,res)=>{res.json({msg:"Hello Lawyer!"})});

//Read
router.get('/', adminAuth, lawyerController.getAllLawyers);

router.get('/:id', lawyerController.getLawyer);

//Create
// router.post('/', lawyerController.createLawyer);

//Update
router.put('/:id', admin_lawyerAuth, lawyerController.updateLawyer);

//Delete
router.delete('/:id', adminAuth, lawyerController.deleteLawyer);

router.get('/lawyer/getAllCases', lawyerAuth, lawyerController.getAllCases);

//View due tasks
router.get('/lawyerTasks/:lawyerId', lawyerAuth, lawyerController.viewTasks);

//Accept or Reject Form
router.put('/updateCaseStatus/:caseId/:caseStatus', lawyerAuth, lawyerController.acceptRejectForm);

// As a lawyer i should be able to see all unsigned cases
router.get("/getAllUnsignedCases/:id", lawyerAuth, lawyerController.getWaitingForLawyerCase);

router.get("/assignCase/:id/:caseId", lawyerAuth, lawyerController.getSpecificWaitingForLawyerCase);

//get last lawyer worked on case
router.get("/getCaseLastLawyer/:id", lawyerAuth, caseController.getCaseLastLawyer);

//Login
router.post('/login', lawyerController.loginLawyer)

//As a lawyer i should be able to update a company establishment form made by my self.
router.put("/update/:id/:caseId", lawyerAuth, lawyerController.updateCompanyForm);

// As a Lawyer i should be able to add a comment on a rejected company establishment form
// made by an investor, so that the investor is aware of the required changes in the form.
router.put("/addCommentAsLawyer/:lawyerId/:caseId", lawyerAuth, lawyerController.addCommentAsLawyer);

// as a lawyer i should be able to fill a company creation form
router.post("/fillForm/:id", lawyerAuth, lawyerController.fillForm);

//as a lawyer i should be able to find my assigned cases sorted by id
router.get("/getMyCasesByid/:id", lawyerAuth, lawyerController.getMyCasesByid);

//as a lawyer i should be able to find my assigned cases sorted by date of creation
router.get("/getMyCasesByDate/:id", lawyerAuth, lawyerController.getMyCasesByDate);

router.post('/forgot', lawyerController.forgot)

router.post('/reset/:token', lawyerController.reset)

router.get('/downloadContract/:id', lawyerAuth, externalEntityController.getSSCPDF);
router.get('/viewContract/:id', lawyerAuth, externalEntityController.viewSSCPDF);


//As a lawyer i should be able to request change from the investor on his case
router.put('/requestUpdate/:caseId/:assignedLawyerId', lawyerAuth, lawyerController.requestUpdate);

//As a lawyer i should update my case status after a reviewer requested a change
router.put('/resumeWorkOnCase/:caseId/:assignedLawyerId', lawyerAuth, lawyerController.resumeWorkOnCase);
// As a lawyer I should be able to view the generated decision/form for some case
router.get('/viewDecision/:id', lawyerAuth, externalEntityController.viewSPCHtml)
// As a lawyer, I should be able to download the pdf for a decision
router.get('/downloadDecision/:id',lawyerAuth, externalEntityController.generateSPCPdf)
module.exports = router;
