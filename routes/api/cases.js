// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const validator = require('../../validations/caseValidations')

const Case = require("../../models/Case");
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
//assignedReviewers
//assignedLawyers
//status

router.put("/update/:id", async (req,res) => {
  try {
    const id = req.params.id;
    const cas = await Case.findByIdAndUpdate(id)
    //if(!cas) return res.status(404).send({error: 'Case does not exist'})
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const updatedCase = await Case.updateOne(req.body)
    res.json({msg: 'Case updated successfully'})
  }catch(error) {
      // We will be handling the error later
      console.log(error)
  }   
})

module.exports = router;
