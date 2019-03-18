// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const validator = require('../../validations/adminValidations')

// Models
const Admin = require("../../models/Admin");

// Get certain admin
router.get("/:id",async (req, res) => {
  const adminID = req.params.id;
  const neededAdmin = await Admin.findById(adminID)
  res.json({ data: neededAdmin})
});


// Get all admins
router.get('/', async (req,res) => {
  const admins = await Admin.find()
  res.json({ data: admins })
})


// create admins
router.post('/joi', async (req,res) => {
  try {
  
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
  
   const newAdmin = await Admin.create(req.body)
   res.json({msg:'Admin was created successfully', data: newAdmin})
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
  }  
})




// Update admin
router.put("/update/:id", async (req,res) => {
  try {

    const id = req.params.id;
    const {  userName, fullName, password }  = req.body
   
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    
   const admin = await Admin.findByIdAndUpdate(id,{  userName, fullName, password })
   if(!admin) return res.status(404).send({error: 'admin does not exist'})
  
  
   res.json({msg: 'Admin updated successfully'})
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
  }  
})




router.delete("/joi/:id", async (req,res) => {
  try {
    const adminID = req.params.id;
   const deletedAdmin = await Admin.findByIdAndRemove(adminID)
   res.json({msg:'Admin was deleted successfully', data: deletedAdmin})
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
  }  
})

module.exports = router;
