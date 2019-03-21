// Dependencies
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const validator = require('../../validations/caseValidations');

const Case = require("../../models/Case");
const Lawyer = require("../../models/Lawyer");
const Investor = require("../../models/Investor");
const Reviewer = require("../../models/Reviewer");

//get certain case
router.get("/:id",async (req, res) => {
  const caseID = req.params.id;
  const neededCase = await Case.findById(caseID)
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
    
    if(!investorID ) res.status(400).send({err : "No investor entered"})
    const inves = await Investor.findById(investorID)
    if(!inves) return res.status(400).send({err : "investor entered not found"})
    
    const clawyerID = req.body.creatorLawyerId
    if (clawyerID) {
      const lawyer = await Lawyer.findById(clawyerID)
      if(!lawyer) return res.status(400).send({err : "creator lawyer entered not found"})
    }
    
    const newLawyer = req.body.assignedLawyerId
    if (newLawyer)  {
      const lawyer2 = await Lawyer.findById(newLawyer)
      if(!lawyer2) return res.status(400).send({err : "lawyer entered not found"})
    }

    const newReviewer = req.body.assignedReviewerId
    if (newReviewer) {
      const reviewer = await Reviewer.findById(newReviewer)
      if(!reviewer) return res.status(400).send({err : "reviewer entered not found"})
    }
    
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
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
    const exist = await Case.findById(id)
    if(!exist) return res.status(400).send({err : "case entered not found"})

    const newLawyer = req.body.assignedLawyerId
    if (newLawyer)  {
      const lawyer2 = await Lawyer.findById(newLawyer)
      if(!lawyer2) return res.status(400).send({err : "lawyer entered not found"})
      const cas = await Case.update({_id: id}, { "$push": { "assignedLawyers": req.body.assignedLawyerId } })
      const cas6 = await Case.update({_id: id}, {"assignedLawyerId": newLawyer})
    }
    
    const newReviewer = req.body.assignedReviewerId
    if (newReviewer) {
      const reviewer = await Reviewer.findById(newReviewer)
      if(!reviewer) return res.status(400).send({err : "reviewer entered not found"})
      const cas2 = await Case.update({_id: id}, { "$push": { "assignedReviewers": req.body.assignedReviewerId } })
      const cas5 = await Case.update({_id: id}, {"assignedReviewerId": newReviewer })
    }
    
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
