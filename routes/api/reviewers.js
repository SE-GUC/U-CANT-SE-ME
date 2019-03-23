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

// As a reviewer i should be able to see all unsigned cases
router.get("/getAllUnsignedCases/:id", reviewerController.getWaitingForReviewerCase);

router.get("/assignCase/:id/:caseId", reviewerController.getSpecificWaitingForReviewerCase);

module.exports = router;