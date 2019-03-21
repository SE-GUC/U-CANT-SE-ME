// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const validator = require('../../validations/notificationValidations')

// Models
const Notification = require("../../models/Notification");

// Get all notifications
router.get('/', async (req,res) => {
  const notifications = await Notification.find()
  res.json({ data: notifications })
})

// Get notification by ID
router.get("/:id",async (req, res) => {
  const notificationID = req.params.id;
  
  try{
    const notification = await Notification.findById(notificationID)
    res.json({ data: notification})
  }
  catch(error) {
    // We will be handling the error later
    res.json({ error: "InvalidID"});
   
}  

  
});



// create a notification
router.post('/', async (req,res) => {
  try {
  
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newNotification = await Notification.create(req.body)
    res.json({msg:'Notification was created successfully', data: newNotification})
  }
  catch(error) {
      console.log(error)
  }  
})




// Update a notification
router.put("/:id", async (req,res) => {
  try {

    const id = req.params.id;
    
   
    const isValidated = validator.updateValidation(req.body)
    console.log(isValidated.error)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    
   const oldNotification = await Notification.findByIdAndUpdate(id,req.body)
  
   if(!oldNotification) return res.status(404).send({error: 'notification does not exist'})
   const newNotification =await Notification.findById(id)
  
   res.json({msg: 'Notification updated successfully',data: newNotification})
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
  }  
})

// delete a notification
router.delete("/:id", async (req,res) => {
  try {
    const notificationID = req.params.id;
    const deletedNotification = await Notification.findByIdAndRemove(notificationID)
    res.json({msg:'Notification was deleted successfully', data: deletedNotification})
  }
  catch(error) {
     console.log(error)
     res.json({msg:"Error Ocurred"})
  }  
})

module.exports = router;