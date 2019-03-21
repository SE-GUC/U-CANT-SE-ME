const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const validator = require('../../validations/reviewerValidations')

var q = require('validator')
const Reveiw = require('../../models/Reviewer');


router.get("/:id",async (req, res) => {
  var reviewerID = req.params.id;
  if(!(q.isMongoId(reviewerID)))
    return res.status(404).send({error: 'Invalid ID'})
  const neededReviewer = await Reviewer.findById(reviewerID)
  if(!neededReviewer)
    return res.status(404).send({error: 'Reviewer does not exist'})
    res.json({ data: neededReviewer})
});


router.get('/', async (req,res) => {
  const Reviewers = await Reviewer.find()
  res.json({ data: Reviewers })
});

router.post('/joi', async (req,res) => {
  try {
  
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
  
   const newReviewer = await Reviewer.create(req.body)
   res.json({msg:'Reviewer was created successfully', data: newReviewer})
  }
  catch(error) {
    return res.status(404).send({error: 'There is a user with this user name'})
  }  
});

router.put("/update/:id", async (req,res) => {
  const reviewerID = req.params.id;
  if(!(q.isMongoId(reviewerID)))
    return res.status(404).send({error: 'Invalid ID'})
  var reviewer = await Reviewer.findById(reviewerID)
  if(!reviewer) return res.status(404).send({error: 'Reviewer does not exist'})
  const oldPassword=req.body.oldPassword
  try {
    

    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    
    if(!oldPassword) return res.status(404).send({error: 'There is no verificaiton'})
    if(!(reviewer.password==oldPassword)){
      return res.status(404).send({error: 'password doesnot match'})
    }else{
      if(req.body.userName) var userName=req.body.userName
      else userName=reviewer.userName
      if(req.body.fullName) var fullName=req.body.fullName
      else fullName=reviewer.fullName
      if(req.body.password) var password=req.body.password
      else password=reviewer.password
      if(req.body.email) var email=req.body.email
      else email=reviewer.email
      reviewer = await Reviewer.findByIdAndUpdate(reviewerID,{ userName,fullName,password,email })
      res.json({msg: 'Reviewer updated successfully'})
    }
  
  
  }
  catch(error) {
      // We will be handling the error later
      return res.status(404).send({error: 'Reviewer does not exist'})
      //console.log(error)
  }  
});


router.delete("/joi/:id", async (req,res) => {
  try {
    const reviewerID = req.params.id;
    if(!(q.isMongoId(reviewerID)))
    return res.status(404).send({error: 'Invalid ID'})
   const deletedReviewer = await Reviewer.findByIdAndRemove(reviewerID)
   if(!deletedReviewer)
   return res.status(404).send({error: 'Reviewer does not exist'})
   res.json({msg:'Reviewer was deleted successfully', data: deletedReviewer})
  }
  catch(error) {
      // We will be handling the error later
      //console.log(error)
  }  
});
module.exports = router;