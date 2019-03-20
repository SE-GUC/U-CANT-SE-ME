// Dependencies
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const validator=require('../../validations/lawyerValidations');

// module Lawyer
const Lawyer = require("../../models/Lawyer")
// const Case=require("../../models/case");

router.get('/', async (req,res) => {
  const lawyers = await Lawyer.find()
  res.json({data: lawyers})
});

router.get('/:id',async (req,res)=>{
  try{
    const id = req.params.id
    
     const lawyer = await Lawyer.findOne({'_id':id});
     if(!lawyer) return res.status(404).send({error: 'lawyer does not exist'})
     res.send(lawyer)

  }
  catch(error){
    res.status(404).send({error:'lawyer does not exist'})
    console.log(error)
  }
});



router.post('/', async (req,res) => {
  try {
  const isValidated = validator.createValidation(req.body)
   if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message })
      return;
  }
   const newLawyer = await Lawyer.create(req.body)
   res.json({msg:'Lawyer was created successfully', data: newLawyer})
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
      
  }  
});


router.put('/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({'_id':id});
    if(!lawyer){
      res.status(404).send({error:'lawyer does not exist'});
      return;
    }

  if (!req.body.email) req.body.email = lawyer.email;
  if (!req.body.password) req.body.password = lawyer.password;
  if (!req.body.fullName) req.body.fullName = lawyer.fullName;
  if (!req.body.userName) req.body.userName = lawyer.userName;
  const email=req.body.email;
  const password=req.body.password;
  const fullName=req.body.fullName;
  const userName=req.body.userName;
   
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
       res.status(400).send({ error: isValidated.error.details[0].message })
       return
    }   
   const lawyerss = await Lawyer.findByIdAndUpdate(id,{  email, password, fullName ,userName})
  
   res.json({msg: 'lawyer updated successfully'})
  }
  catch(error) {
    res.status(404).send({error:'lawyer does not exist'});
      // We will be handling the error later
      console.log(error)
  }  
});

router.delete('/:id', async (req,res) => {
  try {
   const id = req.params.id
   const lawyer =await Lawyer.findOne({'_id':id});
   if (!lawyer){
    res.status(404).send({error:'lawyer does not exist'});
    return;

   }
   const deletedLawyer = await Lawyer.findByIdAndRemove(id)
   res.json({msg:'lawyer was deleted successfully', data: deletedLawyer})
  }
  catch(error) {
      // We will be handling the error later
      res.status(404).send({error:'lawyer does not exist'})

      console.log(error)
  }  
});

// router.get('/:id/getAllCases', async (req,res)=>{
//     const cases= await Case.find()
//   res.json({data: cases});

//   });

module.exports = router;
