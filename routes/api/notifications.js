// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const validator = require('../../validations/notificationValidations')
const idValidator = require("validator");
// Models
const Notification = require("../../models/Notification");
const Investor = require("../../models/Investor");
const Lawyer = require("../../models/Lawyer");
const Case = require("../../models/Case");
// Get all notifications
router.get('/', async (req,res) => {
  const notifications = await Notification.find()
  res.json({ data: notifications })
})

// Get notification by ID
router.get("/:id",async (req, res) => {
  const notificationID = req.params.id;
  
  if(idValidator.isMongoId(notificationID)){
    try{
      const notification = await Notification.findById(notificationID)
      if(notification)
        res.json({ data: notification})
      else
        res.json({msg:"Id Not Found"})
    }
    catch(error) {
       res.json({ error: "ErrorOcurred"});
    }

  }
  else{
    res.json({ error: "InvalidID"});
  }
  

  
});



// create a notification
router.post('/', async (req,res) => {
  try {
  
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const recipientID = req.body.recipientID;
    const caseID= req.body.caseID;
    if(!idValidator.isMongoId(recipientID) || !idValidator.isMongoId(caseID))
      res.json({error:"invalidIdformat"});
    else 
    {
      const tmpInvestor=await Investor.findById(recipientID);
      const tmpLawyer=await Lawyer.findById(recipientID);
      const tmpCase=await Case.findById(caseID);
      if((tmpInvestor || tmpLawyer) && tmpCase)
      {
        const newNotification = await Notification.create(req.body)
        res.json({msg:'Notification was created successfully', data: newNotification})
      }
      else{
        if(!tmpCase)
        res.json({msg:"CaseNotFound"});
        else
          res.json({msg:"RecipientNotFound"});
      }
     
    }
   
  }
  catch(error) {
    res.json({msg:"Error Ocurred"})
  }  
})




// Update a notification
router.put("/:id", async (req,res) => {
  const id = req.params.id;
 
  if(!idValidator.isMongoId(id))
    res.json({msg:"Invalid ID"});
  else
  {
    try {
      const isValidated = validator.updateValidation(req.body)
      if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      const caseID = req.body.caseID;
      const recipientID = req.body.recipientID;
      let ok=true;
      if(caseID)
      {
        if(!idValidator.isMongoId(caseID)){
          res.json({error:"invalidformat"})
          ok=false;
        }
        else 
        {
          const tmpCase=await Case.findById(caseID);
          if(!tmpCase){
            ok=false;
            res.json({msg:"CaseNotFound"});
          }
        }
      }
      if(recipientID && ok){
        if(idValidator.isMongoId(recipientID))
        {
          const tmpInvestor=await Investor.findById(recipientID);
          const tmpLawyer=await Lawyer.findById(recipientID);
          if(tmpInvestor || tmpLawyer)
          {
            const oldNotification = await Notification.findByIdAndUpdate(id,req.body)
      
            if(!oldNotification) return res.status(404).send({error: 'notification does not exist'})
            const newNotification =await Notification.findById(id)
           
            res.json({msg: 'Notification updated successfully',data: newNotification})
          }
          else{
            res.json({msg:"RecipientNotFound"});
          }
        }
        else{
          res.json({error:"invalidformat"})  
        }
      }
      else if(ok)
      {
           const oldNotification = await Notification.findByIdAndUpdate(id,req.body)
      
            if(!oldNotification) return res.status(404).send({error: 'notification does not exist'})
            const newNotification =await Notification.findById(id)
           
            res.json({msg: 'Notification updated successfully',data: newNotification})
      }
      
    }
    catch(error) {
      res.json({msg:"Error Ocurred"})
    }  
  }

 
})

// delete a notification
router.delete("/:id", async (req,res) => {
  const notificationID = req.params.id;
  if(!idValidator.isMongoId(notificationID))
    res.json({msg:"Invalid ID"});
  else
  {
    try {
   
      const deletedNotification = await Notification.findByIdAndRemove(notificationID)
      if(deletedNotification)
          res.json({msg:'Notification was deleted successfully', data: deletedNotification})
      else
        res.json({error:'notification does not exist'});
    }
    catch(error) {
      //  console.log("error")
       res.json({msg:"Error Ocurred"})
    }
  }
    
})

module.exports = router;