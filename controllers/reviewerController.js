const mongoose = require("mongoose");
const validator = require("../validations/reviewerValidations");

var mongoValidator = require("validator");
const Reviewer = require("../models/Reviewer");
const ReviewerAuthenticated=true;
//Read
exports.getAllReviewers = async function(req, res) {
  const Reviewers = await Reviewer.find();
  res.json({ data: Reviewers });
};

exports.getReviewer = async function(req, res) {
  var reviewerID = req.params.id;
  if (!mongoValidator.isMongoId(reviewerID))
    return res.status(404).send({ error: "Invalid ID" });
  const neededReviewer = await Reviewer.findById(reviewerID);
  if (!neededReviewer)
    return res.status(404).send({ error: "Reviewer does not exist" });
  res.json({ data: neededReviewer });
};

//Create
exports.createReviewer = async function(req, res) {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const newReviewer = await Reviewer.create(req.body);
    res.json({ msg: "Reviewer was created successfully", data: newReviewer });
  } catch (error) {
    return res
      .status(404)
      .send({ error: "There is a user with this user name" });
  }
};

//Update
exports.updateReviewer = async function(req, res) {
  const reviewerID = req.params.id;
  if (!mongoValidator.isMongoId(reviewerID))
    return res.status(404).send({ error: "Invalid ID" });
  var reviewer = await Reviewer.findById(reviewerID);
  if (!reviewer)
    return res.status(404).send({ error: "Reviewer does not exist" });
  const oldPassword = req.body.oldPassword;
  try {
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    if (!oldPassword)
      return res.status(404).send({ error: "There is no verificaiton" });
    if (!(reviewer.password == oldPassword)) {
      return res.status(404).send({ error: "password doesnot match" });
    } else {
      if (req.body.userName) var userName = req.body.userName;
      else userName = reviewer.userName;
      if (req.body.fullName) var fullName = req.body.fullName;
      else fullName = reviewer.fullName;
      if (req.body.password) var password = req.body.password;
      else password = reviewer.password;
      if (req.body.email) var email = req.body.email;
      else email = reviewer.email;
      reviewer = await Reviewer.findByIdAndUpdate(reviewerID, {
        userName,
        fullName,
        password,
        email
      });
      res.json({ msg: "Reviewer updated successfully" });
    }
  } catch (error) {
    // We will be handling the error later
    return res.status(404).send({ error: "Reviewer does not exist" });
    //console.log(error)
  }
};

//Delete
exports.deleteReviewer = async function(req, res) {
  try {
    const reviewerID = req.params.id;
    if (!mongoValidator.isMongoId(reviewerID))
      return res.status(404).send({ error: "Invalid ID" });
    const deletedReviewer = await Reviewer.findByIdAndRemove(reviewerID);
    if (!deletedReviewer)
      return res.status(404).send({ error: "Reviewer does not exist" });
    res.json({
      msg: "Reviewer was deleted successfully",
      data: deletedReviewer
    });
  } catch (error) {
    // We will be handling the error later
    //console.log(error)
  }
};

// As a reviewer i should be able to see all unsigned cases
exports.getWaitingForReviewerCase = async function(req, res) {
    try {
      if (ReviewerAuthenticated) {
        const reviewerExists = await Reviewer.findById(req.params.id);
        if (reviewerExists === null) return res.json("Reviewer Does Not Exist");
        const allcases = await Case.where("caseStatus", "WaitingForReviewer");
        res.json(allcases);
      } else res.status(403).send({ error: "Forbidden." });
    } catch (error) {
      res.json({ msg: "An error has occured." });
    }
  };
  
  //as a reviewer i should be able to assign myself an unsigned case
  exports.getSpecificWaitingForReviewerCase = async function(req, res) {
    try {
      if (ReviewerAuthenticated) {
        const reviewer = await Reviewer.findById(req.params.id);
        if (reviewer === null) return res.json("Reviewer Does Not Exist");
        const selectedCase = await Case.where("_id", req.params.caseId);
        if (selectedCase[0].caseStatus === "WaitingForReviewer") {
          selectedCase[0].caseStatus = "AssignedToReviewer";
          selectedCase[0].assignedReviewerId = req.params.id;
          selectedCase[0].previouslyAssignedReviewers.push(req.params.id);
          await Case.findByIdAndUpdate(req.params.caseId, selectedCase[0]);
          res.json(await Case.findById(req.params.caseId));
        } else res.status(403).send({ error: "Case is not supported." });
      } else res.status(403).send({ error: "Forbidden." });
    } catch (error) {
      res.json({ msg: "An error has occured." });
    }
  };

  