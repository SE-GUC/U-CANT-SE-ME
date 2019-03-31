const express = require('express')
const router = express.Router()


// module Reviewer Controller
const reviewerController = require("../../controllers/reviewerController")
const caseController = require("../../controllers/caseController")


//Read
router.get("/", reviewerController.getAllReviewers);

router.get("/:id", reviewerController.getReviewer);

//Create
router.post('/', reviewerController.createReviewer);

//Update
router.put("/:id", reviewerController.updateReviewer);

//Delete
router.delete("/:id", reviewerController.deleteReviewer);

//View due tasks
router.get('/reviewerTasks/:reviewerID', reviewerController.viewTasks);

//Accept or Reject Form
router.put('/updateCaseStatus/:caseId/:caseStatus', reviewerController.AcceptRejectForm);

router.get('/reviewer/getAllCases',reviewerController.GetAllCases);

// As a reviewer i should be able to see all unsigned cases
router.get("/getAllUnsignedCases/:id", reviewerController.getWaitingForReviewerCase);

router.get("/assignCase/:id/:caseId", reviewerController.getSpecificWaitingForReviewerCase);

//get last lawyer worked on case
router.get("/getCaseLastLawyer/:id", caseController.getCaseLastLawyer);

//Login
router.post('/login', reviewerController.loginReviewer)

module.exports = router;

