// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const validator = require('../../validations/adminValidations')
const mongoValidator = require("validator");

// Models
const Admin = require("../../models/Admin");

// Get certain admin
router.get("/:id",async (req, res) => {

  if(!mongoValidator.isMongoId(req.params.id))
  return res.status(400).send({ err : "Invalid Admin Id" })
  const admin = await Admin.findById(req.params.id);
  if (!admin) return res.status(404).send("Admin not Found");

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

    if(!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ err : "Invalid Admin Id" })
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send("Admin not Found");


    const id = req.params.id;
    if (!req.body.username) req.body.username = admin.username;

    if (!req.body.password) req.body.password = admin.password;
  
    if (!req.body.fullName) req.body.fullName = admin.fullName;

   
   
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    
    await Admin.findByIdAndUpdate(req.params.id, req.body);
  
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

    if(!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ err : "Invalid Admin Id" })
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send("Admin not Found");

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