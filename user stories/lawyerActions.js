// as a lawyer i should be able to fill an establishment form,so that i establish a new company
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const validator = require('../../validations/caseValidations');

const Case = require("../../models/Case");
const Lawyer = require("../../models/Lawyer");
const Investor = require("../../models/Investor");
const Reviewer = require("../../models/Reviewer");

router.post('/joi/createCase/:lawyerId', async (req,res) => {
  try {
    const isValidated = validator.createValidation(req.body)

    const investorID = req.body.creatorInvestorId
    if(!investorID ) res.status(400).send({err : "No investor entered"})
    const inves = await Investor.findById(investorID)
    if(!inves) return res.status(400).send({err : "investor entered not found"})
    
    const clawyerID = req.params.lawyerId
    if (!clawyerID) return res.status(400).send({err : "creator lawyer was not entered"})
    const lawyer = await Lawyer.findById(clawyerID)
    if(!lawyer) return res.status(400).send({err : "creator lawyer was not found"})

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
    const cas4 = await Case.update({_id: newCase._id},{"creatorLawyerId": clawyerID})
    res.json({msg:'Case was created successfully', data: newCase})
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
  }  
})
module.exports = router