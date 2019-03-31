// Dependencies
const mongoose = require("mongoose");
const validator = require("../validations/lawyerValidations");
const mongoValidator = require("validator");
// module Lawyer
const Lawyer = require("../models/Lawyer");
const caseController = require("./caseController")
const LawyerGettingAllCasesAuthenticated=true;

// module Case
const Case = require("../models/Case.js")

const lawyerAuthenticated = true

//Read
exports.getAllLawyers = async function(req, res) {
  const lawyers = await Lawyer.find();
  res.json({ data: lawyers });
};

exports.getLawyer = async function(req, res) {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({ _id: id });
    if (!lawyer)
      return res.status(404).send({ error: "lawyer does not exist" });
    res.send(lawyer);
  } catch (error) {
    res.status(404).send({ error: "lawyer does not exist" });
    console.log(error);
  }
};

//Create
exports.createLawyer = async function(req, res) {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message });
      return;
    }
    const newLawyer = await Lawyer.create(req.body);
    res.json({ msg: "Lawyer was created successfully", data: newLawyer });
  } catch (error) {
    res.status(400).send({ error: "Oops something went wrong" });
    console.log(error);
  }
};

//Update
exports.updateLawyer = async function(req, res) {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({ _id: id });
    if (!lawyer) {
      res.status(404).send({ error: "lawyer does not exist" });
      return;
    }
    if (!req.body.email) req.body.email = lawyer.email;
    if (!req.body.password) req.body.password = lawyer.password;
    if (!req.body.fullName) req.body.fullName = lawyer.fullName;
    if (!req.body.username) req.body.username = lawyer.username;
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const username = req.body.username;

    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message });
      return;
    }
    const lawyerss = await Lawyer.findByIdAndUpdate(id, {
      email,
      password,
      fullName,
      username
    });
    res.json({ msg: "lawyer updated successfully" });
  } catch (error) {
    res.status(404).send({ error: "lawyer does not exist" });
    console.log(error);
  }
};

//Create
exports.deleteLawyer = async function(req, res) {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({ _id: id });
    if (!lawyer) {
      res.status(404).send({ error: "lawyer does not exist" });
      return;
    }
    const deletedLawyer = await Lawyer.findByIdAndRemove(id);
    res.json({ msg: "lawyer was deleted successfully", data: deletedLawyer });
  } catch (error) {
    res.status(404).send({ error: "lawyer does not exist" });
    console.log(error);
  }
};

//as a lawyer i should be able to fill a company creation form
exports.fillForm = async function(req, res) {
  const lawyerId = req.params.id;
  req.body.creatorLawyerId = lawyerId;
  req.body.caseStatus = "WaitingForReviewer";
  req.body.assignedLawyerId = req.params.id;
  await caseController.createCase(req, res);
};

exports.GetAllCases = async function (req,res){
  if (LawyerGettingAllCasesAuthenticated){
  await caseController.getAllCases(req, res);
  }
  else{
   res.status(404).send({error:"something wrong happened check your identity"})
  }
};
//as a lawyer i should be able to view all my due tasks 
exports.viewTasks = async function(req,res) {
  try{
    if(lawyerAuthenticated){
      let lawyerCases = await Case.where({"assignedLawyerId" : req.params.lawyerID ,"caseStatus" :"AssignedToLawyer" })
      

      if(lawyerCases!==undefined && lawyerCases.length > 0 )
        res.json({Tasks: lawyerCases})
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
//As a lawyer I should be able to accept or reject a company establishment form made by an investor
exports.AcceptRejectForm = async function(req, res)
{ 
    if(lawyerAuthenticated)
    {
        if(!mongoValidator.isMongoId(req.params.caseId) || await Case.findById(req.params.caseId)===null)
            return res.status(400).send({ err : "Invalid case id" })
        if(req.params.caseStatus!=="OnUpdate" && req.params.caseStatus!=="WaitingForLawyer" && req.params.caseStatus!=="AssginedToLawyer" && req.params.caseStatus!=="WaitingForReviewer" && req.params.caseStatus!=="AssginedToReviewer")
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
}

// As a lawyer i should be able to see all unsigned cases
exports.getWaitingForLawyerCase = async function(req, res) {
  try{
      if(lawyerAuthenticated){
          let lawyer = await Lawyer.findById(req.params.id)
          if(lawyer===null)
              return res.json("Lawyer Does Not Exist")
          let allcases = await Case.where("caseStatus","WaitingForLawyer");
          res.json(allcases);
      }
      else
          res.status(403).send({error: "Forbidden." })
  }
  catch(error){
      res.json({msg: "An error has occured."})
  }
}

exports.getSpecificWaitingForLawyerCase = async function(req, res) {
  try{
      if(lawyerAuthenticated){
          let lawyer = await Lawyer.findById(req.params.id)
          if(lawyer === null)
              return res.json("Lawyer Does Not Exist")
          let selectedCase = await Case.where("_id",req.params.caseId);
          if(selectedCase[0].caseStatus === "WaitingForLawyer" ){   
              selectedCase[0].caseStatus = "AssignedToLawyer";
              selectedCase[0].assignedLawyerId = req.params.id;
              selectedCase[0].previouslyAssignedLawyers.push(req.params.id);
              await Case.findByIdAndUpdate(req.params.caseId,selectedCase[0])
              res.json(await Case.findById(req.params.caseId));
          }
          else
              res.status(403).send({error: "Case is not supported." }) 
      }
      else
          res.status(403).send({error: "Forbidden." })
  }
  catch(error){
      res.json({msg: "An error has occured."})
  }
}

// As a Lawyer i should be able to add a comment on a rejected company establishment form
// made by an investor, so that the investor is aware of the required changes in the form.
exports.addCommentAsLawyer = async function(req,res){
  try{
    if (!mongoose.Types.ObjectId.isValid(req.params.lawyerID) || !mongoose.Types.ObjectId.isValid(req.params.caseID))
      return res.status(400).send({ error: "Incorrect Mongo ID" });
    const checkLawyer = await Lawyer.find({ _id: req.params.lawyerID });
    const checkCase = await Case.find({ _id: req.params.caseID });
    if (checkLawyer.length === 0)
      return res.status(404).send("Lawyer not Found");
    if (checkCase.length === 0)
      return res.status(404).send("Case not Found");
    if(lawyerAuthenticated){
      if(checkCase[0].assignedLawyerId+""!==req.params.lawyerID+"")
        return res.status(403).send({error: "Only assigned Lawyers to this Case can comment on it" });
      if(checkCase[0].caseStatus !== "OnUpdate" && checkCase[0].caseStatus !== "WaitingForLawyer")
        return res.status(403).send({error: "Access Denied: This Case is currently Locked for you." });
      if(req.body.body === undefined || req.body.body.length===0)
        return res.status(403).send({error: "You can't add empty Comment" });
      checkCase[0].comments.push({author: checkLawyer[0].fullName, body: req.body.body});
      await Case.findByIdAndUpdate(req.params.caseID, {"comments":checkCase[0].comments});
      return res.json({data: checkCase});
    }
    else
      return res.status(403).send({error: "Forbidden." });
  }
  catch{
    res.json({msg: "An error has occured."})
  }
}