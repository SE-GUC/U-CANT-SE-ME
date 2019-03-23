// Dependencies
const mongoose = require("mongoose");
const validator = require("../validations/lawyerValidations");

// module Lawyer
const Lawyer = require("../models/Lawyer");

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

// As a lawyer i should be able to see all unsigned cases
exports.getWaitingForLawyerCase = async function(req, res) {
  try{
      if(lawyerAuthenticated){
          let lawyerAuthenticated = await Lawyer.findById(req.params.lawyerID)
          if(lawyerAuthenticated===null)
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
};

exports.getSpecificWaitingForLawyerCase = async function(req, res) {
  try{
      if(lawyerAuthenticated){
          let lawyer = await Lawyer.findById(req.params.lawyerID)
          if(lawyer === null)
              return res.json("Lawyer Does Not Exist")
          let selectedCase = await Case.where("_id",req.params.caseID);
          if(selectedCase[0].caseStatus === "WaitingForLawyer" ){   
              selectedCase[0].caseStatus = "AssignedToLawyer";
              selectedCase[0].assignedLawyerId = req.params.lawyerID;
              selectedCase[0].assignedLawyers.push(req.params.lawyerID);
              await Case.findByIdAndUpdate(req.params.caseID,selectedCase[0])
              res.json(await Case.findById(req.params.caseID));
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
};

