const mongoose = require("mongoose");
const validator = require("../validations/reviewerValidations");

var mongoValidator = require("validator");
const Reviewer = require("../models/Reviewer");
const reviewerGettingAllCasesAuthenticated=true;
const caseController = require("./caseController")

// module Case
const Case = require("../models/Case.js")

const reviewerAuthenticated = true

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

exports.GetAllCases = async function (req,res){
  try{
  if (reviewerGettingAllCasesAuthenticated){
  await caseController.getAllCases(req, res);
  }
  else{
   res.status(404).send({error:"something wrong happened check your identity"})
  }
}
catch{
  res.status(404).send({error:"something wrong happened check your identity"})
}
};

//as a reviewer i should be able to view all my due tasks 

//As a reviewer I should be able to accept or reject a company establishment form
exports.viewTasks = async function(req,res) {
  try{
    if(reviewerAuthenticated){
      let reviewerCases = await Case.where({"assignedReviewerId" : req.params.reviewerID ,"caseStatus" :"AssignedToReviewer" })

      if(reviewerCases!==undefined && reviewerCases.length > 0)
        res.json({Tasks: reviewerCases})
      else
        res.status(404).send({error: "Data Not Found"})           
    }
    else
      return res.status(403).send({error: "Forbidden." })
  }
  catch(error){
      res.json({msg: "An error has occured."})
  }
}
// Accept Reject Form
exports.AcceptRejectForm = async function(req, res) 
{
    if(reviewerAuthenticated)
    {
       if(!mongoValidator.isMongoId(req.params.caseId) || await Case.findById(req.params.caseId)===null)
            return res.status(400).send({ err : "Invalid case id" })
        if(req.params.caseStatus!=="OnUpdate" && req.params.caseStatus!=="WaitingForLawyer" && req.params.caseStatus!=="AssginedToLawyer" && req.params.caseStatus!=="WaitingForReviewer" && req.params.caseStatus!=="AssginedToReviewer" && req.params.caseStatus!=="Accepted" && req.params.caseStatus!="Rejected")
            return res.status(400).send({err: "Invalid new status"})
        try
        {
            await Case.findByIdAndUpdate(req.params.caseId,{"caseStatus":req.params.caseStatus})
            res.json(await Case.findById(req.params.caseId))
        }
        catch(error)
        {
            res.json({msg:"A fatal error has occured, could not update the case status."})
        }
    }
    else
        return res.status(403).send({error: "Forbidden." })
};
