// Dependencies
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const validator = require('../../validations/caseValidations');
var q = require('validator');

const Case = require("../../models/Case");
const Lawyer = require("../../models/Lawyer");
const Investor = require("../../models/Investor");
const Reviewer = require("../../models/Reviewer");

//get certain case
router.get("/:id",async (req, res) => {
  const caseID = req.params.id;
  if(!(q.isMongoId(caseID)))return res.status(404).send({error: 'Invalid ID'})
  const neededCase = await Case.findById(caseID)
  if(!neededCase) return res.status(400).send({err : "case entered not found"})
  res.json({ data: neededCase})
});
//get all cases

router.get('/', async (req,res) => {
  const cases = await Case.find()
  res.json({ data: cases })
})

//create case

router.post('/joi', async (req,res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    const investorID = req.body.creatorInvestorId
    const companyName1 = req.body.companyNameArabic
    if(companyName1){
      const company1 = await Case.findOne({companyNameArabic: companyName1}, function(err,obj) {})
      if(company1) return res.status(400).send({err : "company name entered already existent"})
    }
    const companyName2 = req.body.companyNameEnglish
    if(companyName2){
      const company2 = await Case.findOne({companyNameEnglish: companyName2}, function(err,obj) {})
      if(company2) return res.status(400).send({err : "company name entered already existent"})
    }

    if(!investorID )return res.status(400).send({err : "No investor entered"})
    if(!(q.isMongoId(investorID)))return res.status(404).send({error: 'Invalid ID'})
    const inves = await Investor.findById(investorID)
    if(!inves) return res.status(400).send({err : "investor entered not found"})
    
    const clawyerID = req.body.creatorLawyerId
    if (clawyerID) {
      if(!(q.isMongoId(clawyerID)))return res.status(404).send({error: 'Invalid ID'})
      const lawyer = await Lawyer.findById(clawyerID)
      if(!lawyer) return res.status(400).send({err : "creator lawyer entered not found"})
    }
    
    const newLawyer = req.body.assignedLawyerId
    if (newLawyer)  {
      if(!(q.isMongoId(newLawyer)))return res.status(404).send({error: 'Invalid ID'})
      const lawyer2 = await Lawyer.findById(newLawyer)
      if(!lawyer2) return res.status(400).send({err : "lawyer entered not found"})
    }

    const newReviewer = req.body.assignedReviewerId
    if (newReviewer) {
      if(!(q.isMongoId(newReviewer)))return res.status(404).send({error: 'Invalid ID'})
      const reviewer = await Reviewer.findById(newReviewer)
      if(!reviewer) return res.status(400).send({err : "reviewer entered not found"})
    }
    
    const cap = req.body.capital
    const type = req.body.companyType
    if(cap){
      if(type){
        if(type === "SSC"){
          if(cap<50000 || cap.toString().length > 12){
            return res.status(400).send({err : "invalid capital"})
          }
        }
      }
    }
    if(cap){
      if(type){
        if(type === "SPC"){
          const checkInvestor = await Investor.findById(req.body.creatorInvestorId)
          if(checkInvestor){
            if(checkInvestor.nationality !== "Egyptian"){
              if(cap < 100000){
                return res.status(400).send({err : "invalid capital"})
              }
            }
          }
        }
      }
    }

    if(type){
      if(type === "SSC"){
        const checkCase = await Case.findOne({creatorInvestorId: investorID,'companyType' : "SSC"}, function(err,obj) {})
        if(checkCase){
          return res.status(400).send({err : "Investor entered has an existent SSC case"})
        } 
      }
    }

    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    if (req.body.Idtype ==="SSN") if(req.body.Idnumber.toString().length !== 14) return res.status(400).send({err : "Invalid SSN"})
    if (req.body.managerIdType ==="SSN") if(req.body.managerIdNumber.toString().length !== 14) return res.status(400).send({err : "Invalid SSN"})

    const newCase = await Case.create(req.body)
    res.json({msg:'Case was created successfully', data: newCase})
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
  }  
})


//delete case


router.delete("/joi/:id", async (req,res) => {
  try {
    const caseID = req.params.id;
    if(!(q.isMongoId(caseID)))return res.status(404).send({error: 'Invalid ID'})
    const neededCase = await Case.findById(caseID)
    if(!neededCase) return res.status(400).send({err : "case entered not found"})
    const deletedCase = await Case.findByIdAndRemove(caseID)
    res.json({msg:'Case was deleted successfully', data: deletedCase})
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
  }  
})

//update

router.put("/update/:id", async (req,res) => {
  try {
    const id = req.params.id
    if(!(q.isMongoId(id)))return res.status(404).send({error: 'Invalid ID'})
    const exist = await Case.findById(id)
    if(!exist) return res.status(400).send({err : "case entered not found"})

    const newLawyer = req.body.assignedLawyerId
    if (newLawyer)  {
      if(!(q.isMongoId(newLawyer)))return res.status(404).send({error: 'Invalid ID'})
      const lawyer2 = await Lawyer.findById(newLawyer)
      if(!lawyer2) return res.status(400).send({err : "lawyer entered not found"})
      const cas = await Case.update({_id: id}, { "$push": { "assignedLawyers": req.body.assignedLawyerId } })
      const cas6 = await Case.update({_id: id}, {"assignedLawyerId": newLawyer})
    }
    
    const newReviewer = req.body.assignedReviewerId
    if (newReviewer) {
      if(!(q.isMongoId(newReviewer)))return res.status(404).send({error: 'Invalid ID'})
      const reviewer = await Reviewer.findById(newReviewer)
      if(!reviewer) return res.status(400).send({err : "reviewer entered not found"})
      const cas2 = await Case.update({_id: id}, { "$push": { "assignedReviewers": req.body.assignedReviewerId } })
      const cas5 = await Case.update({_id: id}, {"assignedReviewerId": newReviewer })
    }
    
    const isValidated = validator.updateValidation(req.body)
    if(isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    const commentAuthor = req.body.author
    const commentBody = req.body.body
    const date = new Date()
    const comment = {"author": commentAuthor,"body": commentBody,"date": date}
    if(commentAuthor && commentBody) var cas3 = await Case.update({_id: id}, { "$push": { "comments": comment } })

    const cas4 = await Case.update({_id: id},{"caseStatus": req.body.caseStatus})
    res.json({msg: 'Case updated successfully'})
  }catch(error) {
      // We will be handling the error later
      console.log(error)
  }   
})

module.exports = router;
