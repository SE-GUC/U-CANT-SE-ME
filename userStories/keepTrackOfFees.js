// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const idValidator = require("validator");
// Models
const Case = require("../models/Case");
const Investor = require("../models/Investor");
router.get('/:id', async (req,res) => {
  const id=req.params.id;
  if(!idValidator.isMongoId(id)){
      res.json({error:"invalid ID format"});
      return;
  }
  const investor = await Investor.findById(id);
  if(!investor){
    res.json({error:"investor not found"});
    return;
  }
  const cases = await Case.find()
  const creatorInvestorId = req.params.id;
  message="";
    for (let i = 0; i < cases.length; i++) {
    
      if (String(cases[i].creatorInvestorId) === creatorInvestorId && cases[i].caseStatus === "Accepted"){  
          message+="Your company "+cases[i].companyNameEnglish+" has fees ??"+"\n";
          flag=1;
      }
    }

     if(message==="")
           message="You did not fill any establishment request yet.";
    res.json({"response": message});     
})
  

  module.exports = router;