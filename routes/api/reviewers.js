const express = require('express')
const router = express.Router()


// module Reviewer Controller
const reviewerController = require("../../controllers/reviewerController")

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

//As a Reviewer i should be able to add a comment on a rejected company establishment-
//form, so that the lawyer is aware of the required changes in the form.
router.put("/addCommentAsReviewer/:reviewerID/:caseID", reviewerController.addCommentAsReviewer);

module.exports = router;

