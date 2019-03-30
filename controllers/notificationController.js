// Dependencies
const mongoose = require('mongoose')
const validator = require('../validations/notificationValidations')
const idValidator = require("validator");
const axios = require('axios')
const nodemailer = require('nodemailer');
// Models
const Notification = require("../models/Notification");
const Investor = require("../models/Investor");
const Reviewer = require("../models/Reviewer");
const Lawyer = require("../models/Lawyer");
const Case = require("../models/Case");
// Get all notifications
const caseController = require("./caseController");
exports.getAllNotifications = async function(req, res) {
    try {
      const notifications = await Notification.find();
      res.json({ data: notifications });
    } catch (error) {
      res.send({ error: "Oops something went wrong!" });
      console.log(error);
    }
  };
  // Get notification by ID

  exports.getNotificationById = async function(req, res) {
    const notificationID = req.params.id;
    if(idValidator.isMongoId(notificationID)){
      try{
        const notification = await Notification.findById(notificationID)
        if(notification)
          res.json({ data: notification})
        else
          res.json({msg:"Notification Not Found"})
      }
      catch(error) {
         res.json({ error: "ErrorOcurred"});
      }
  
    }
    else{
      res.json({ error: "InvalidID"});
    }
  };



// create a notification
exports.createNotification = async function(req, res) {
  
 
    try {
        const isValidated = validator.createValidation(req.body)
        
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const recipientId = req.body.recipientId;
        const caseID= req.body.caseID;
        if(!idValidator.isMongoId(recipientId) || !idValidator.isMongoId(caseID))
          res.json({error:"invalidIdformat"});
        else 
        {
          const tmpInvestor=await Investor.findById(recipientId);
          const tmpLawyer=await Lawyer.findById(recipientId);
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
  };


// delete a notification
exports.deleteNotification = async function(req, res) {

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
         console.log("error")
         res.json({msg:"Error Ocurred"})
      }
    }
};
exports.updateNotification = async function (req,res){
    const id = req.params.id;
 
    if(!idValidator.isMongoId(id))
      res.json({msg:"Invalid ID"});
    else
    {
      try {
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const caseID = req.body.caseID;
        const recipientId = req.body.recipientId;
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
        if(recipientId && ok){
          if(idValidator.isMongoId(recipientId))
          {
            const tmpInvestor=await Investor.findById(recipientId);
            const tmpLawyer=await Lawyer.findById(recipientId);
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
};
exports.sendNotification = async function(case1,req) {
  const recipientId=case1.creatorInvestorId;
  const investor= await Investor.findById(recipientId);
  const fees=caseController.calcFees(case1);
  const message = "Dear " + investor.fullName+" , your request for company "+case1.form.companyNameEnglish+" has been accepted and you are required to pay the fees " + fees;
  const email=investor.email;
 
  req={
    "recipientId":recipientId,
    "message":message,
    "emailOfRecipient":email,
    "caseID":case1._id
  }
  const notification = await axios.post('http://localhost:3000/api/notifications/', req)
  const reviewer=await Reviewer.findById(case1.assignedReviewerId);
 
  sendMail(notification.data.data,reviewer)
  return(notification);
 };
 function sendMail(notification,reviewer){
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sumergiteme@gmail.com',
      pass: 'U-CANT-SE-ME'
    }
  });
  
  var mailOptions = {
    from: 'sumergiteme@gmail.com',
    // from: reviewer.email,
    to: 'zeyad.khattab97@gmail.com',
    // to: notification.emailOfRecipient
    subject: 'Company Request Accepted',
    text: notification.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  
 });
}