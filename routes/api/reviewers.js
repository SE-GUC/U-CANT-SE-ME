const express = require('express')
const router = express.Router()
const passport = require('passport')

// module Reviewer Controller
const reviewerController = require("../../controllers/reviewerController")
const caseController = require("../../controllers/caseController")
const reviewerAuth = passport.authenticate('reviewerAuth',{session: false});
const adminAuth = passport.authenticate('adminAuth',{session: false});
const admin_reviewerAuth = passport.authenticate(['adminAuth','reviewerAuth'],{session: false});
const allAuth = passport.authenticate(['adminAuth','lawyerAuth','reviewerAuth'],{session: false});

//authorization
router.get('/auth',reviewerAuth,(req,res)=>{res.json({msg:"Hello Reviewer!"})});

//Read
router.get("/", adminAuth, reviewerController.getAllReviewers);

router.get("/:id", allAuth,reviewerController.getReviewer);

//Create
// router.post('/', adminAuth,reviewerController.createReviewer);

//Update
router.put("/:id", admin_reviewerAuth, reviewerController.updateReviewer);

//Delete
router.delete("/:id", adminAuth, reviewerController.deleteReviewer);

//View due tasks
router.get('/reviewerTasks/:reviewerID', reviewerAuth, reviewerController.viewTasks);

//Accept or Reject Form
router.put('/updateCaseStatus/:caseId/:caseStatus', reviewerAuth, reviewerController.AcceptRejectForm);

router.get('/reviewer/getAllCases',reviewerAuth, reviewerController.GetAllCases);

// As a reviewer i should be able to see all unsigned cases
router.get("/getAllUnsignedCases/:id", reviewerAuth, reviewerController.getWaitingForReviewerCase);

router.get("/assignCase/:id/:caseId", reviewerAuth, reviewerController.getSpecificWaitingForReviewerCase);

//get last lawyer worked on case
router.get("/getCaseLastLawyer/:id", reviewerAuth, caseController.getCaseLastLawyer);

//Login
router.post('/login', reviewerController.loginReviewer)

//As a Reviewer i should be able to add a comment on a rejected company establishment-
//form, so that the lawyer is aware of the required changes in the form.
router.put("/addCommentAsReviewer/:reviewerID/:caseID", reviewerAuth, reviewerController.addCommentAsReviewer);

//as a reviewer i should be able to find my assigned cases sorted by id
router.get("/getMyCasesByid/:id", reviewerAuth, reviewerController.getMyCasesByid);

//as a reviewer i should be able to find my assigned cases sorted by date of creation
router.get("/getMyCasesByDate/:id", reviewerAuth, reviewerController.getMyCasesByDate);

router.post('/forgot', reviewerController.forgot)

router.post('/reset/:token', reviewerController.reset)


//As a reviewer i should be able to request change from the investor on his case
router.put('/requestUpdate/:caseId/:assignedReviewerId', reviewerAuth, reviewerController.requestUpdate);


module.exports = router;

