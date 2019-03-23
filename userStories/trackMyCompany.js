// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const mongoValidator = require("validator");

// Models
const Case = require("../models/Case.js");


router.get('/:id', async (req,res) => {
  
  if(!mongoValidator.isMongoId(req.params.id))
  return res.status(400).send({ err : "Invalid Investor Id" })

  const investor = await Investor.findById(req.params.id);
  if(!investor){
    res.json({error:"investor not found"});
    return;
  }

  const cases = await Case.find()

  const creatorInvestorId = req.params.id;
    flag = 0;
    message="";
    let result=[];
    for (let i = 0; i < cases.length; i++) {
     
      if (String(cases[i].creatorInvestorId) === creatorInvestorId){  
        // slash is added for now as delimiter so we can separate them in front end later  
        result.push({company:" Your company "+cases[i].companyNameEnglish+" is currently in phase "+cases[i].caseStatus+" "} ) 
        flag=1;
      }
    }

     if(flag==0){
       result.push({message:"You did not fill any establishment request yet."} )  
     }
          
    res.json({"tracking": result});
    //   res.json({"tracking": message});     
})
  

  module.exports = router;